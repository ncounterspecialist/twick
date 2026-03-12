import { extractAudioBufferFromAudioUrl, extractAudioBufferFromVideo } from "./audio.utils.js";
import { transcribeLong, transcribeShort } from "./transcriber.js";
import { normalizeCaptionEntries } from "@twick/ai-models";

/**
 * Creates a complete caption video project from a video URL.
 * Downloads video, extracts audio, transcribes it using Google Speech-to-Text,
 * and builds a Twick project JSON structure.
 * 
 * @param {Object} params - Project creation parameters
 * @param {string} params.videoUrl - Publicly accessible HTTP(S) URL to the video file
 * @param {Object} [params.videoSize] - Video dimensions {width, height} (defaults to 720x1280)
 * @param {string} [params.language="english"] - Transcription language code. If omitted and
 * autoDetectLanguage is true, the underlying STT engine will attempt to detect among the
 * supported LANGUAGE_CODE entries.
 * @param {string} [params.languageFont="english"] - Font/script for captions
 * @param {boolean} [params.autoDetectLanguage=false] - When true and language is omitted,
 * allow auto language detection instead of forcing a specific code.
 * @returns {Promise<Object>} Twick project JSON structure
 * @throws {Error} If video processing, transcription, or project building fails
 */
export const transcribe = async (params) => {
  const {
    videoSize,
    videoUrl,
    audioUrl,
    language,
    languageFont,
    autoDetectLanguage,
  } = params;

  const { audioBuffer, duration } = audioUrl
    ? await extractAudioBufferFromAudioUrl(audioUrl)
    : await extractAudioBufferFromVideo(videoUrl);
  let captions = [];
  if (!duration) {
    throw new Error("Failed to get duration of video");
  } else if (!audioBuffer) {
    throw new Error("Failed to get audio buffer from video");
  } else if (duration > 6) {
    captions = await transcribeLong({
      audioBuffer,
      // If auto-detect is requested and no explicit language is provided,
      // pass through an undefined language so the transcriber can fall
      // back to trying all known language codes.
      language: autoDetectLanguage && !language ? undefined : language,
    });
  } else {
    captions = await transcribeShort({
      audioBuffer,
      language: autoDetectLanguage && !language ? undefined : language,
    });
  }
  if (!captions.length) {
    throw new Error("No captions found");
  }

  const normalizedCaptions = normalizeCaptionEntries(captions).map((segment) => ({
    t: segment.text,
    s: segment.startMs,
    e: segment.endMs,
    ...(segment.wordStartMs ? { w: segment.wordStartMs } : {}),
  }));

  console.log("Transcription successful");

  return ({
    captions: normalizedCaptions,
    duration,
    audioUrl,
    videoUrl,
    videoSize,
    language,
    languageFont,
  });
};  