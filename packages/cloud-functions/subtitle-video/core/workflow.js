import { extractAudioBufferFromVideo } from "./audio.utils.js";
import { uploadFile } from "./gc.utils.js";
import { buildProject } from "./project.utils.js";
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
export const createCaptionProject = async (params) => {
  const { videoSize, videoUrl, language, languageFont } = params;

  const { audioBuffer, duration } = await extractAudioBufferFromVideo(videoUrl);
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
  const project = buildProject({
    captions,
    duration,
    videoUrl,
    videoSize,
    language,
    languageFont,
  });

  console.log("Project built successfully");
  return project;
};  

/**
 * Exports a Twick project JSON to Google Cloud Storage and returns a public URL.
 * Uploads the project to GCS and generates a signed URL valid for 1 hour.
 * 
 * @param {Object} project - Twick project JSON object
 * @returns {Promise<string>} Signed URL to the exported project JSON file
 * @throws {Error} If upload to GCS fails
 */
export const exportProject = async (project) => {
    const projectData = JSON.stringify(project);
    console.log("Project:", projectData);
    const exportedProjectUrl = await uploadFile({
      data: projectData,
      folder: "projects",
      fileName: `project-${Date.now()}.json`,
      contentType: "application/json",
      isPublic: true,
    });
    console.log("Project exported successfully");
    console.log("Project exported to:", exportedProjectUrl);
    return exportedProjectUrl;
};