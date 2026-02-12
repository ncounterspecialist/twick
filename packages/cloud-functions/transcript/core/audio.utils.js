import fs from "fs";
import { join } from "path";
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
 * Audio encoding configuration for different formats.
 * Currently supports FLAC format optimized for Google Speech-to-Text API.
 * @type {Object<string, Object>}
 */
export const AUDIO_CONFIG = {
  "FLAC": {
    "codec": "flac",
    "encoding": "FLAC",
    "sampleRate": 16000,
    "channelCount": 1,
    "extension": "flac",
    "contentType": "audio/flac",
  },
}

/**
 * Extracts audio from a video URL and converts it to a format suitable for transcription.
 * Downloads the video, extracts audio using ffmpeg, and returns the audio buffer and duration.
 * 
 * @param {string} videoUrl - Publicly accessible HTTP(S) URL to the video file
 * @param {string} [format="FLAC"] - Audio output format (currently only "FLAC" supported)
 * @returns {Promise<Object>} Object containing audioBuffer (Buffer) and duration (number in seconds)
 * @throws {Error} If video download, extraction, or processing fails
 */
export const extractAudioBufferFromVideo = async (videoUrl, format = "FLAC") => {
    const videoResponse = await fetch(videoUrl);
    if (!videoResponse.ok) {
      throw new Error(`Failed to download video: ${videoResponse.status} ${videoResponse.statusText}`);
    }
    const tmpBase = await mkdtemp(join(tmpdir(), 'mcp-'));
    const inputPath = join(tmpBase, 'input_video');
    // Change extension to .flac
    const outputPath = join(tmpBase, `output_audio.${format}`); 
  
    if (!videoResponse.body) {
      await rm(tmpBase, { recursive: true, force: true });
      throw new Error("Video response has no body");
    }
    const videoStream = Readable.fromWeb(videoResponse.body);
    const fileWriteStream = fs.createWriteStream(inputPath);
    await pipelineAsync(videoStream, fileWriteStream);
  
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
      console.warn('Failed to get duration using ffprobe');
    }
  
    try {
      await execFileAsync(ffmpegPath, [
        '-y',
        '-i', inputPath,
        '-vn',             // Strip video
        '-ac', '1',         // Mono channel (Required for STT)
        '-ar', AUDIO_CONFIG[format].sampleRate,     // 16kHz is ideal for Chirp
        '-c:a', AUDIO_CONFIG[format].codec,     // Use FLAC codec
        outputPath
      ]);
    } catch (err) {
      await rm(tmpBase, { recursive: true, force: true });
      const stderr = err?.stderr?.toString?.().trim?.() || "";
      throw new Error(`ffmpeg extraction failed: ${stderr}`);
    }
  
    // Use the promise-based readFile for consistency
    const audioBuffer = await readFile(outputPath);
    await rm(tmpBase, { recursive: true, force: true });
    return { audioBuffer, duration };
};

/**
 * Downloads audio from a URL, converts it to the specified format, and returns the buffer.
 * Uses ffmpeg to transcode the audio (e.g. to FLAC for Speech-to-Text).
 *
 * @param {string} audioUrl - Publicly accessible HTTP(S) URL to the audio file
 * @param {string} [format="FLAC"] - Audio output format (must be key in AUDIO_CONFIG)
 * @returns {Promise<Object>} Object containing audioBuffer (Buffer) and duration (number in seconds)
 * @throws {Error} If download, conversion, or processing fails
 */
export const extractAudioBufferFromAudioUrl = async (audioUrl, format = "FLAC") => {
  const config = AUDIO_CONFIG[format];
  if (!config) {
    throw new Error(`Unsupported audio format: ${format}`);
  }

  const audioResponse = await fetch(audioUrl);
  if (!audioResponse.ok) {
    throw new Error(`Failed to download audio: ${audioResponse.status} ${audioResponse.statusText}`);
  }

  const tmpBase = await mkdtemp(join(tmpdir(), 'audio-'));
  const inputPath = join(tmpBase, 'input_audio');
  const outputPath = join(tmpBase, `output_audio.${config.extension}`);

  if (!audioResponse.body) {
    await rm(tmpBase, { recursive: true, force: true });
    throw new Error("Audio response has no body");
  }
  const audioStream = Readable.fromWeb(audioResponse.body);
  const fileWriteStream = fs.createWriteStream(inputPath);
  await pipelineAsync(audioStream, fileWriteStream);

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
    console.warn('Failed to get duration using ffprobe');
  }

  try {
    await execFileAsync(ffmpegPath, [
      '-y',
      '-i', inputPath,
      '-ac', '1',
      '-ar', config.sampleRate,
      '-c:a', config.codec,
      outputPath
    ]);
  } catch (err) {
    await rm(tmpBase, { recursive: true, force: true });
    const stderr = err?.stderr?.toString?.().trim?.() || "";
    throw new Error(`ffmpeg conversion failed: ${stderr}`);
  }

  const audioBuffer = await readFile(outputPath);
  await rm(tmpBase, { recursive: true, force: true });
  return { audioBuffer, duration };
};