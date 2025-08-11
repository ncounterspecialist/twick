import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import renderTwickVideo from "./renderer.js";

const PORT = process.env.PORT || 3001;
const BASE_PATH = `http://localhost:${PORT}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodeApp: import("express").Express = express();

nodeApp.use(cors());
nodeApp.use(express.json());

// Serve static files from output directory
nodeApp.use("/output", express.static(path.join(__dirname, "../output")));

nodeApp.post("/api/render-video", async (req, res) => {
  const { variables, settings } = req.body;

  try {
    const outputPath = await renderTwickVideo(variables, settings);
    res.json({
      success: true,
      downloadUrl: `${BASE_PATH}/download/${path.basename(outputPath)}`,
    });
  } catch (error) {
    console.error("Render error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

nodeApp.get("/download/:filepath", (req, res) => {
  const filePath = path.join(__dirname, "../output", req.params.filepath);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({
        success: false,
        error: "File not found",
      });
    }
  });
});

// Health check endpoint
nodeApp.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Export the app for programmatic usage
export default nodeApp;

// Start the server
nodeApp.listen(PORT, () => {
  console.log(`Render server running on port ${PORT}`);
  console.log(`Health check: ${BASE_PATH}/health`);
  console.log(`API endpoint: ${BASE_PATH}/api/render-video`);
});
