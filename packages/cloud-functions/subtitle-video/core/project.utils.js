/**
 * Generates a short UUID for element and track identification.
 * Creates a 12-character unique identifier using a simplified
 * UUID generation algorithm.
 *
 * @returns A 12-character unique identifier string
 * 
 * @example
 * ```js
 * const id = generateShortUuid();
 * // id = "a1b2c3d4e5f6"
 * ```
 */
const generateShortUuid = () => {
  return "xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
/**
 * Builds a Twick subtitle video project JSON structure from transcription results.
 * 
 * @param {Object} params - Project parameters
 * @param {Array<Object>} params.subtitles - Array of subtitle objects with {t, s, e} properties
 * @param {number} params.duration - Video duration in seconds
 * @param {string} params.videoUrl - Source video URL
 * @param {Object} [params.videoSize] - Video dimensions {width, height}
 * @returns {Object} Twick project JSON structure with properties, tracks, and version
 */
export const buildProject = (params) => {
  const { subtitles, duration, videoUrl, videoSize } = params;

  const videoTrackId = `t-${generateShortUuid()}`;
  const captionTrackId = `t-${generateShortUuid()}`;

    return {
      properties: {
        width: videoSize?.width || 720,
        height: videoSize?.height || 1280,
      },
      tracks: [
        {
          id: videoTrackId,
          type: "video",
          elements: [
            {
              id: `e-${generateShortUuid()}`,
              type: "video",
              s: 0,
              e: duration,
              props: {
                src: videoUrl,
              },
              frame: {
                size: [videoSize?.width || 720, videoSize?.height || 1280],
              },
            },
          ],
        },
        {
          id: captionTrackId,
          type: "caption",
          props: {
            capStyle: "highlight_bg",
            font: {
              size: 46,
              weight: 700,
              family: "Bangers",
            },
            colors: {
              text: "#ffffff",
              highlight: "#ff4081",
              bgColor: "#444444",
            },
            lineWidth: 0.35,
            stroke: "#000000",
            fontWeight: 700,
            shadowOffset: [-3, 3],
            shadowColor: "#000000",
            x: 0,
            y: 200,
            applyToAll: true,
          },
          elements: subtitles.map((subtitle, index) => ({
            id: `e-${generateShortUuid()}`,
            trackId: captionTrackId,
            type: "caption",
            s: subtitle.s / 1000,
            e: subtitle.e / 1000,
            t: subtitle.t,
          })),
        },
      ],
      version: 1,
    };
};
