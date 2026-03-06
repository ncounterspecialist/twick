import { buildCaptionProject } from "@twick/workflow";

/**
 * Legacy compatibility wrapper.
 * New project assembly logic should use @twick/workflow directly.
 */
/**
 * Builds a Twick caption video project JSON structure from transcription results.
 * 
 * @param {Object} params - Project parameters
 * @param {Array<Object>} params.captions - Array of caption objects with {t, s, e} properties
 * @param {number} params.duration - Video duration in seconds
 * @param {string} params.videoUrl - Source video URL
 * @param {Object} [params.videoSize] - Video dimensions {width, height}
 * @returns {Object} Twick project JSON structure with properties, tracks, and version
 */
export const buildProject = (params) => {
  const { captions, duration, videoUrl, videoSize } = params;
  return buildCaptionProject({
    captions,
    durationSec: duration,
    videoUrl,
    videoSize,
  });
};
