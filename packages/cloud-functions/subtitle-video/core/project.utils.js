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

    return {
      properties: {
        width: videoSize?.width || 720,
        height: videoSize?.height || 1280,
      },
      tracks: [
        {
          id: "video",
          type: "video",
          elements: [
            {
              id: "video",
              type: "video",
              s: 0,
              e: duration,
              props: {
                src: videoUrl,
                width: videoSize?.width || 720,
                height: videoSize?.height || 1280,
              },
            },
          ],
        },
        {
          id: "subtitle",
          type: "caption",
          props: {
            capStyle: "highlight_bg",
            font: {
              size: 50,
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
            id: `subtitle-${index}`,
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
