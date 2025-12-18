import { transcribeVideoUrl } from "./transcriber.js";

/**
 * Get video duration in seconds
 * @param {string} videoUrl file path or remote URL
 * @returns {Promise<number>}
 */

export const createProject = async (params) => {
  const { videoSize, videoUrl, language, languageFont } = params;

  try {
    const { subtitles, duration } = await transcribeVideoUrl({
      videoUrl,
      language,
      languageFont,
    });

    if (!subtitles.length) {
      throw new Error("No subtitles found");
    }

    return {
      properties: {
        width: videoSize.width || 720,
        height: videoSize.height || 1280,
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
                width: videoSize.width || 720,
                height: videoSize.height || 1280,
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
  } catch (error) {
    console.error("Error building project for", videoUrl, error);
    throw error;
  }
};
