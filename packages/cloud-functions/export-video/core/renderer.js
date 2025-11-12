import { renderVideo } from "@twick/renderer";
import chromium from "@sparticuz/chromium";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";

chromium.setHeadlessMode = true;
ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Renders a Twick video with the provided variables and settings.
 * Processes project variables, merges settings with defaults, and
 * generates a video file using the Twick renderer.
 *
 * @param {Object} variables - Project variables containing input configuration
 * @param {Object} settings - Optional render settings to override defaults
 * @returns {Promise<string>} Promise resolving to the path of the rendered video file
 *
 * @example
 * ```js
 * const videoPath = await renderTwickVideo(
 *   { input: { properties: { width: 1920, height: 1080 } } },
 *   { outFile: "my-video.mp4" }
 * );
 * // videoPath = "./output/my-video.mp4"
 * ```
 */
const renderTwickVideo = async (variables, settings) => {
  try {
    // Merge user settings with defaults
    const mergedSettings = {
      logProgress: true,
      viteBasePort: 5173,
      outDir: "/tmp/output",
      viteConfig: { cacheDir: "/tmp/.vite" },
      projectSettings: {
        exporter: {
          name: "@twick/core/wasm",
        },
        size: {
          x: variables.input.properties.width,
          y: variables.input.properties.height,
        },
      },
      puppeteer: {
        headless: chromium.headless,
        executablePath: await chromium.executablePath(),
        args: chromium.args.filter(
          (arg) =>
            !arg.startsWith("--single-process") &&
            !arg.startsWith("--use-gl=angle") &&
            !arg.startsWith("--use-angle=swiftshader") &&
            !arg.startsWith("--disable-features=")
        ),
      },
      ...settings, // Allow user settings to override defaults
    };

    const result = await renderVideo({
      projectFile: "@twick/visualizer/dist/project.js",
      variables: variables,
      settings: mergedSettings,
    });

    console.log("renderVideo Executed:");
    console.log("Render result:", result);

    return result;
  } catch (error) {
    console.error("Render error:", error);
    throw error;
  }
};

export default renderTwickVideo;
