import { renderVideo } from "@twick/renderer";

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
