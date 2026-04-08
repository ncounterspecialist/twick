import { renderVideo } from "@twick/renderer";
import chromium from "@sparticuz/chromium";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

chromium.setHeadlessMode = true;
ffmpeg.setFfmpegPath(ffmpegPath);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_EMOJI_ASSET_DIRS = [
  process.env.TWICK_EMOJI_ASSETS_DIR,
  "/var/task/emoji",
  path.resolve(__dirname, "../node_modules/twemoji/assets/72x72"),
].filter(Boolean);

const toCodePointString = (emoji) =>
  Array.from(emoji || "")
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join("-");

const inferEmojiFileName = ({ src, emoji }) => {
  if (typeof src === "string" && src.includes("/")) {
    try {
      const parsed = new URL(src);
      const fileName = parsed.pathname.split("/").pop();
      if (fileName?.endsWith(".png")) return fileName;
    } catch {
      const rawFileName = src.split("/").pop();
      if (rawFileName?.endsWith(".png")) return rawFileName;
    }
  }
  if (typeof emoji === "string" && emoji.trim()) {
    const codepoint = toCodePointString(emoji);
    if (codepoint) return `${codepoint}.png`;
  }
  return null;
};

const getDataUriForEmoji = ({ src, emoji }) => {
  const fileName = inferEmojiFileName({ src, emoji });
  if (!fileName) return null;

  for (const dir of DEFAULT_EMOJI_ASSET_DIRS) {
    const filePath = path.join(dir, fileName);
    if (fs.existsSync(filePath)) {
      const bytes = fs.readFileSync(filePath);
      return `data:image/png;base64,${bytes.toString("base64")}`;
    }
  }
  return null;
};

const withLocalEmojiAssets = (variables) => {
  if (!variables?.input?.tracks?.length) return variables;
  const cloned = structuredClone(variables);
  for (const track of cloned.input.tracks) {
    for (const element of track?.elements || []) {
      if (element?.type !== "emoji") continue;
      const dataUri = getDataUriForEmoji({
        src: element?.props?.src,
        emoji: element?.props?.emoji,
      });
      if (dataUri) {
        element.props = {
          ...(element.props || {}),
          src: dataUri,
        };
      }
    }
  }
  return cloned;
};

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

    const variablesWithEmojiAssets = withLocalEmojiAssets(variables);

    const result = await renderVideo({
      projectFile: "@twick/visualizer/dist/project.js",
      variables: variablesWithEmojiAssets,
      settings: mergedSettings,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export { renderTwickVideo };
