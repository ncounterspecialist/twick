import { GoogleGenAI } from "@google/genai";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import fs from "fs";
import path, { join } from "path";
import { mkdtemp, readFile, rm } from "fs/promises";
import { tmpdir } from "os";
import { execFile } from "child_process";
import { promisify } from "util";
import { Readable, pipeline } from "stream";

// These packages provide prebuilt ffmpeg/ffprobe binaries. Types are not bundled,
// so we import them as `any` to keep TypeScript satisfied.
import ffmpeg from "@ffmpeg-installer/ffmpeg";
import ffprobe from "@ffprobe-installer/ffprobe";


const execFileAsync = promisify(execFile);
const pipelineAsync = promisify(pipeline);
const ffmpegPath = ffmpeg.path;
const ffprobePath = ffprobe.path;

/**
 * Read a required environment variable, optionally falling back to a default.
 * Throws if neither value is available, making configuration errors obvious.
 *
 * @param {string} name - Environment variable to read.
 * @param {string | undefined} defaultValue - Optional fallback value.
 * @returns {string} The resolved value.
 * @throws {Error} If no value is found.
 */
const ensureEnv = (name, defaultValue) => {
  const value = process.env[name] ?? defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

/**
 * Ensure GOOGLE_APPLICATION_CREDENTIALS points to a JSON key file.
 *
 * In AWS Lambda, the raw service-account JSON is expected to live in
 * AWS Secrets Manager. When GCP_SERVICE_ACCOUNT_SECRET_NAME is present, the
 * secret is fetched, written to `/tmp/gcp-sa-key.json`, and the environment
 * variable is updated to point at that file to avoid stale Lambda values.
 *
 * @returns {Promise<void>} Resolves once credentials are ready.
 * @throws {Error} When the secret cannot be read or written.
 */
const ensureGoogleCredentialsFromSecret = async () => {
  const secretName = process.env.GCP_SERVICE_ACCOUNT_SECRET_NAME;
  if (!secretName) {
    console.log(
      "No secret name configured, skipping Google credentials initialization"
    );
    return;
  }

  try {
    const client = new SecretsManagerClient({
      region: process.env.AWS_REGION || "ap-south-1",
    });

    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
    const secret = response.SecretString;
    const credPath = path.join("/tmp", "gcp-sa-key.json");
    fs.writeFileSync(credPath, secret, { encoding: "utf8" });
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;
    console.log(
      `Wrote Google service account credentials to ${credPath} from Secrets Manager`
    );
  } catch (error) {
    console.error(
      `Failed to initialize Google credentials from secret ::`,
      error
    );
    throw error;
  }
};

/**
 * Initialize a Google GenAI client configured for Vertex AI.
 * Ensures credentials, project, and location are available before instantiating.
 *
 * @returns {Promise<GoogleGenAI>} Configured GenAI client instance.
 * @throws {Error} When required environment variables are missing.
 */
const createGenAIClient = async () => {
  await ensureGoogleCredentialsFromSecret();
  const project = ensureEnv("GOOGLE_CLOUD_PROJECT");
  const location = ensureEnv("GOOGLE_CLOUD_LOCATION", "global");
  const client = new GoogleGenAI({
    vertexai: true,
    project: project,
    location: location,
  });

  return client;
};

const extractAudioBufferFromVideo = async (videoUrl) => {
  const videoResponse = await fetch(videoUrl);
  if (!videoResponse.ok) {
    throw new Error(`Failed to download video: ${videoResponse.status} ${videoResponse.statusText}`);
  }
  const tmpBase = await mkdtemp(join(tmpdir(), 'mcp-'));
  const inputPath = join(tmpBase, 'input_video');
  const outputPath = join(tmpBase, 'output_audio.mp3');

  // Stream the video response directly to disk to avoid holding the full video in memory
  if (!videoResponse.body) {
    await rm(tmpBase, { recursive: true, force: true });
    throw new Error("Video response has no body");
  }
  const videoStream = Readable.fromWeb(videoResponse.body);
  const fileWriteStream = fs.createWriteStream(inputPath);
  await pipelineAsync(videoStream, fileWriteStream);

  // Get duration using bundled ffprobe
  let duration = 0;
  try {
    const { stdout } = await execFileAsync(ffprobePath, [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      inputPath
    ]);
    duration = parseFloat(stdout.toString().trim()) || 0;
  } catch (err) {
    console.warn('Failed to get duration using ffprobe, duration will be 0');
  }

  try {
    await execFileAsync(ffmpegPath, [
      '-y',
      '-i', inputPath,
      '-vn',
      '-acodec', 'libmp3lame',
      '-q:a', '2',
      outputPath
    ]);
  } catch (err) {
    await rm(tmpBase, { recursive: true, force: true });
    const stderr = err?.stderr?.toString?.().trim?.() || "";
    const msg = stderr || (err instanceof Error ? err.message : String(err));
    throw new Error(`ffmpeg execution failed: ${msg}`);
  }

  const audioBuffer = await readFile(outputPath);
  await rm(tmpBase, { recursive: true, force: true });
  return { audioBuffer, duration };
};


/**
 * Build the captioning prompt passed to the Gemini model.
 *
 * @param {number} duration - Audio duration in seconds.
 * @param {string} language - Human-readable target language.
 * @param {string} languageFont - Desired script/font name.
 * @returns {string} Instruction prompt for the model.
 */
const buildPrompt = (duration, language, languageFont) => {
  // Convert duration from seconds to milliseconds for the prompt
  const durationMs = Math.round(duration * 1000);

  return `You are a professional subtitle and transcription engine.

## INPUT
- Audio duration: ${durationMs} milliseconds
- Target language: ${language}
- Subtitle font script: ${languageFont}

## OBJECTIVE
Transcribe the audio into clear, readable subtitles.

If the spoken audio is NOT in ${language}, translate it into ${language} before generating subtitles.

## SUBTITLE SEGMENTATION RULES
- Split speech into short, natural phrases.
- Each subtitle phrase MUST contain a maximum of 4 words.
- Do NOT split words across phrases.
- Avoid breaking phrases mid-sentence unless required by timing constraints.

## TIMING RULES (STRICT — MUST FOLLOW)
- All timestamps are in **milliseconds**.
- Each subtitle object MUST include:
  - 's': start timestamp
  - 'e': end timestamp
- Duration of each phrase = 'e - s'
- Minimum phrase duration: **100 ms**
- 'e' MUST be greater than 's'
- 'e' MUST be **less than or equal to ${durationMs}**
- Subtitles MUST be sequential:
  - 's' of the next phrase MUST be **greater than or equal to** the previous 'e'
  - NO overlapping timestamps
- Prefer aligning timestamps with natural speech pauses.

## TEXT RULES
- 't' MUST be written using ${languageFont} characters.
- No emojis.
- No punctuation-only subtitles.
- Normalize casing according to the target language's writing system.
- Remove filler sounds (e.g., “um”, “uh”) unless semantically important.

## OUTPUT FORMAT (CRITICAL)
Return ONLY a valid JSON array.
- No markdown
- No code blocks
- No explanations
- No additional text
- Output MUST start with '[' and end with ']'

## OUTPUT SCHEMA
[
  {
    "t": "Subtitle text",
    "s": 0,
    "e": 1200
  }
]
`.trim();
};

/**
 * Transcribe an audio URL to JSON subtitles using Google GenAI (Vertex AI),
 * mirroring the Python implementation in `playground/vertex/transcript.py`.
 *
 * @param {Object} params
 * @param {string} params.videoUrl - Publicly reachable video URL.
 * @param {string} [params.language="english"] - Target transcription language (human-readable).
 * @param {string} [params.languageFont="english"] - Target font/script for subtitles.
 * @returns {Promise<{ subtitles: Array<{t: string, s: number, e: number}> }>} Subtitles array with text, start time, and end time.
 * @throws {Error} When audioUrl is missing or downstream calls fail.
 */
export const transcribeVideoUrl = async (params) => {
  const {
    videoUrl,
    language = "english",
    languageFont = "english",
  } = params || {};

  if (!videoUrl) {
    throw new Error("Missing required parameter: videoUrl");
  }

  const { audioBuffer, duration } = await extractAudioBufferFromVideo(videoUrl);
  if (!duration) {
    throw new Error("Failed to get duration of video");
  }

  const prompt = buildPrompt(duration, language, languageFont);

  const client = await createGenAIClient();
  const modelName = process.env.GOOGLE_VERTEX_MODEL || "gemini-2.5-flash-lite";

  const generationConfig = {
    maxOutputTokens: 65535,
    temperature: 1,
    topP: 0.95,
    thinkingConfig: {
      thinkingBudget: 0,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "OFF",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "OFF",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "OFF",
      },
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "OFF",
      },
    ],
  };

  const req = {
    model: modelName,
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              data: audioBuffer.toString("base64"),
              mimeType: "audio/mpeg",
            },
          },
          { text: prompt },
        ],
      },
    ],
    config: generationConfig,
  };

  const response = await client.models.generateContent(req);

  let textPart = response.text || "";

  // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
  textPart = textPart
    .replace(/^```json\s*/i, "") // Remove opening ```json
    .replace(/^```\s*/i, "") // Remove opening ```
    .replace(/\s*```$/i, "") // Remove closing ```
    .trim();


  let subtitles = [];
  try {
    // Try to find JSON array in the text (in case there's extra text)
    const jsonMatch = textPart.match(/\[[\s\S]*\]/);
    const jsonText = jsonMatch ? jsonMatch[0] : textPart;

    subtitles = JSON.parse(jsonText);
    if (!Array.isArray(subtitles)) {
      throw new Error("Parsed subtitles are not an array");
    }
  } catch (err) {
    console.warn(
      "Failed to parse model output as JSON subtitles, returning raw text",
      err
    );
    console.warn("Raw response text:", textPart.substring(0, 500));
    subtitles = [];
  }

  return {
    subtitles,
    duration,
    videoUrl
  };
};
