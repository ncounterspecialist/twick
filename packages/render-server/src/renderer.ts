import { renderVideo } from "@twick/renderer";

// Simple in-process concurrency control for render jobs.
// This helps avoid overloading a single server instance.
let activeRenders = 0;
const renderQueue: Array<() => void> = [];

const getMaxConcurrentRenders = () => {
  const fromEnv = process.env.TWICK_MAX_CONCURRENT_RENDERS;
  const parsed = fromEnv ? parseInt(fromEnv, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2;
};

async function withRenderSlot<T>(fn: () => Promise<T>): Promise<T> {
  const maxConcurrent = getMaxConcurrentRenders();

  if (activeRenders >= maxConcurrent) {
    await new Promise<void>((resolve) => {
      renderQueue.push(resolve);
    });
  }

  activeRenders++;
  try {
    return await fn();
  } finally {
    activeRenders--;
    const next = renderQueue.shift();
    if (next) {
      next();
    }
  }
}

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
  const start = Date.now();
  try {
    const { input } = variables;
    const { properties } = input;

    // Basic safety limits (can be overridden via env)
    const maxWidth =
      parseInt(process.env.TWICK_MAX_RENDER_WIDTH ?? "3840", 10) || 3840;
    const maxHeight =
      parseInt(process.env.TWICK_MAX_RENDER_HEIGHT ?? "2160", 10) || 2160;
    const maxFps =
      parseInt(process.env.TWICK_MAX_RENDER_FPS ?? "60", 10) || 60;

    const width = Math.min(properties.width, maxWidth);
    const height = Math.min(properties.height, maxHeight);
    const fps = Math.min(properties.fps ?? 30, maxFps);

    // Merge user settings with defaults
    const mergedSettings = {
      logProgress: true,
      outDir: "./output",
      outFile: properties.reqesutId ?? `video-${Date.now()}` + ".mp4",
      quality: "medium",
      projectSettings: {
        exporter: {
          name: "@twick/core/wasm-effects",
        },
        size: {
          x: width,
          y: height,
        },
        fps,
      },
      ...settings, // Allow user settings to override defaults
    };

    const result = await withRenderSlot(async () => {
      const file = await renderVideo({
        projectFile: "@twick/visualizer/dist/project.js",
        variables,
        settings: mergedSettings,
      });
      return file;
    });

    const elapsedMs = Date.now() - start;
    console.log(
      `[RenderServer] Render completed in ${elapsedMs}ms (active=${activeRenders}) ->`,
      result,
    );
    return result;
  } catch (error) {
    const elapsedMs = Date.now() - start;
    console.error(
      `[RenderServer] Render error after ${elapsedMs}ms (active=${activeRenders}):`,
      error,
    );
    throw error;
  }
};

export default renderTwickVideo;
