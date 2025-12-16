import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";


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

/**
 * Download audio bytes for a URL using Node 18+ global fetch.
 *
 * @param {string} audioUrl - Public URL to download.
 * @returns {Promise<Buffer>} Resolves with the audio bytes.
 * @throws {Error} When the URL cannot be fetched.
 */
const fetchAudioBytes = async (audioUrl) => {
  const response = await fetch(audioUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to download audio from URL "${audioUrl}": ${response.status} ${response.statusText}`
    );
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

/**
 * Build the captioning prompt passed to the Gemini model.
 *
 * @param {string} language - Human-readable target language.
 * @param {string} languageFont - Desired script/font name.
 * @returns {string} Instruction prompt for the model.
 */
const buildPrompt = (language, languageFont) => {
  return `
##TASKS
- Transcribe the audio into ${language}.
- Break subtitles into phrases with a maximum of 4 words per segment.
- Each phrase must have precise start (s) and end (e) timestamps in milliseconds, where its duration is calculated as e - s.
- Timestamps of consecutive phrases must not overlap. The end time of one phrase should be equal to or less than the start time of the next.
- End Timestamp ('e') should be less than the audio duration.
- Each phrase should have a minimum duration of 500 milliseconds.
- If the audio is in a different language, translate it into ${language} before transcription.
- The final caption text (t) should be written in ${languageFont} fonts for accurate visual representation.

Ensure precise phrase segmentation according to the word limit, accurate millisecond timestamps adhering to the duration and overlap constraints, and translation to ${language} if necessary, resulting in readable subtitles.

IMPORTANT: Return ONLY a valid JSON array with no markdown, no code fences, no explanations, no additional text. Start directly with [ and end with ].

Format:
[
  {
    "t": "Example phrase 1",
    "s": 0,
    "e": 1500
  }
]
`.trim();
};

/**
 * Transcribe an audio URL to JSON subtitles using Google GenAI (Vertex AI),
 * mirroring the Python implementation in `playground/vertex/transcript.py`.
 *
 * @param {Object} params
 * @param {string} params.audioUrl - Publicly reachable audio URL.
 * @param {string} [params.language="english"] - Target transcription language (human-readable).
 * @param {string} [params.languageFont="english"] - Target font/script for subtitles.
 * @returns {Promise<{ subtitles: Array<{t: string, s: number, e: number}> }>}
 * @throws {Error} When audioUrl is missing or downstream calls fail.
 */
export const transcribeAudioUrl = async (params) => {
  const {
    audioUrl,
    language = "english",
    languageFont = "english",
  } = params || {};

  if (!audioUrl) {
    throw new Error("Missing required parameter: audioUrl");
  }

  const audioBytes = await fetchAudioBytes(audioUrl);
  const prompt = buildPrompt(language, languageFont);

  const client = await createGenAIClient();
  const modelName = process.env.GOOGLE_VERTEX_MODEL || "gemini-2.5-flash-lite";

  console.log("Starting Google GenAI transcription", client, {
    model: modelName,
    language,
    languageFont,
    audioUrl,
  });

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
              data: audioBytes.toString("base64"),
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
    subtitles
  };
};

export default transcribeAudioUrl;
