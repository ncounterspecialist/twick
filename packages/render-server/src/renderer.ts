import { renderVideo } from "@twick/renderer";

/**
 * Renders a Twick video with the provided variables and settings.
 * Processes project variables, merges settings with defaults, and
 * generates a video file using the Twick renderer.
 *
 * @param variables - Project variables containing input configuration
 * @param settings - Optional render settings to override defaults
 * @returns Promise resolving to the path of the rendered video file
 * 
 * @example
 * ```js
 * const videoPath = await renderTwickVideo(
 *   { input: { properties: { width: 1920, height: 1080 } } },
 *   { quality: "high", outFile: "my-video.mp4" }
 * );
 * // videoPath = "./output/my-video.mp4"
 * ```
 */
const renderTwickVideo = async (variables: any, settings: any) => {
  try {
    const { input } = variables;
    const { properties } = input;
    // Merge user settings with defaults
    const mergedSettings = {
      logProgress: true,
      outDir: "./output",
      outFile: properties.reqesutId ?? `video-${Date.now()}` + ".mp4",
      quality: "medium",
      projectSettings: {
        exporter: {
          name: "@twick/core/wasm",
        },
        size: {
          x: properties.width,
          y: properties.height,
        },
      },
      ...settings, // Allow user settings to override defaults
    };

    const file = await renderVideo({
      projectFile: "@twick/visualizer/dist/project.js",
      variables: variables,
      settings: mergedSettings,
    });
    console.log("Successfully rendered: ", file);
    return file;
  } catch (error) {
    console.error("Render error:", error);
    throw error;
  }
};

export default renderTwickVideo;
