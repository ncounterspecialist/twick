import { extractAudioBufferFromAudioUrl, extractAudioBufferFromVideo } from "./audio.utils.js";
import { transcribeLong, transcribeShort } from "./transcriber.js";

/**
 * Creates a complete caption video project from a video URL.
 * Downloads video, extracts audio, transcribes it using Google Speech-to-Text,
 * and builds a Twick project JSON structure.
 * 
 * @param {Object} params - Project creation parameters
 * @param {string} params.videoUrl - Publicly accessible HTTP(S) URL to the video file
 * @param {Object} [params.videoSize] - Video dimensions {width, height} (defaults to 720x1280)
 * @param {string} [params.language="english"] - Transcription language code
 * @param {string} [params.languageFont="english"] - Font/script for captions
 * @returns {Promise<Object>} Twick project JSON structure
 * @throws {Error} If video processing, transcription, or project building fails
 */
export const transcribe = async (params) => {
  const { videoSize, videoUrl, audioUrl, language, languageFont } = params;

  const { audioBuffer, duration } = audioUrl
    ? await extractAudioBufferFromAudioUrl(audioUrl)
    : await extractAudioBufferFromVideo(videoUrl);
  let captions = [];
  if (!duration) {
    throw new Error("Failed to get duration of video");
  } else if (!audioBuffer) {
    throw new Error("Failed to get audio buffer from video");
  } else if (duration > 6) {
    captions = await transcribeLong({ audioBuffer, language });
  } else {
    captions = await transcribeShort({ audioBuffer, language });
  }
  if (!captions.length) {
    throw new Error("No captions found");
  }

  console.log("Transcription successful");

  return ({
    captions,
    duration,
    audioUrl,
    videoUrl,
    videoSize,
    language,
    languageFont,
  });
};  