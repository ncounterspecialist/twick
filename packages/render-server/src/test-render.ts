/**
 * Test file for rendering a video with an example project
 * 
 * This script demonstrates how to use the renderTwickVideo function
 * to create a video from a Twick project configuration.
 * 
 * Run with: tsx src/test-render.ts
 */

import { renderTwickVideo } from "./index.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Example project configuration
 * This creates a simple video with:
 * - A colored background rectangle
 * - Animated text elements
 * - Audio track
 */
const exampleProject = {
  input: {
    properties: {
      width: 1920,
      height: 1080,
      fps: 30,
    },
    tracks: [
      {
        id: "t-background",
        type: "element",
        name: "background",
        elements: [
          {
            id: "e-bg-1",
            trackId: "t-background",
            type: "rect",
            s: 0,
            e: 10,
            props: {
              width: 1920,
              height: 1080,
              fill: "#1a1a2e",
            },
          },
        ],
      },
      {
        id: "t-text",
        type: "element",
        name: "text",
        elements: [
          {
            id: "e-text-1",
            trackId: "t-text",
            type: "text",
            s: 1,
            e: 4,
            t: "Welcome to Twick!",
            props: {
              fill: "#ffffff",
              fontSize: 72,
              fontFamily: "Arial",
              fontWeight: "bold",
              x: 0,
              y: -200,
            },
            animation: {
              name: "fade",
              animate: "enter",
              duration: 1,
            },
            textEffect: {
              name: "typewriter",
              duration: 2,
            },
          },
          {
            id: "e-text-2",
            trackId: "t-text",
            type: "text",
            s: 4,
            e: 7,
            t: "Create Amazing Videos",
            props: {
              fill: "#4ecdc4",
              fontSize: 64,
              fontFamily: "Arial",
              fontWeight: "bold",
              x: 0,
              y: 0,
            },
            animation: {
              name: "rise",
              animate: "enter",
              duration: 1,
            },
          },
          {
            id: "e-text-3",
            trackId: "t-text",
            type: "text",
            s: 7,
            e: 10,
            t: "Programmatically!",
            props: {
              fill: "#ffd700",
              fontSize: 80,
              fontFamily: "Arial",
              fontWeight: "bold",
              x: 0,
              y: 200,
            },
            animation: {
              name: "fade",
              animate: "enter",
              duration: 1,
            },
          },
        ],
      },
      {
        id: "t-shapes",
        type: "element",
        name: "shapes",
        elements: [
          {
            id: "e-circle-1",
            trackId: "t-shapes",
            type: "circle",
            s: 2,
            e: 8,
            props: {
              width: 200,
              height: 200,
              fill: "#ff6b6b",
              x: -400,
              y: 0,
            },
            animation: {
              name: "fade",
              animate: "enter",
              duration: 1,
            },
          },
          {
            id: "e-rect-1",
            trackId: "t-shapes",
            type: "rect",
            s: 5,
            e: 10,
            props: {
              width: 300,
              height: 150,
              fill: "#4ecdc4",
              x: 400,
              y: 0,
            },
            animation: {
              name: "rise",
              animate: "enter",
              duration: 1,
            },
          },
        ],
      },
    ],
    version: 1,
  },
};

/**
 * Render settings
 */
const renderSettings = {
  outFile: `test-video-${Date.now()}.mp4`,
  outDir: join(__dirname, "../output"),
  quality: "medium",
  logProgress: true,
};

/**
 * Main test function
 */
async function testVideoRender() {
  console.log("🎬 Starting video render test...\n");
  console.log("📋 Project Configuration:");
  console.log(`   Resolution: ${exampleProject.input.properties.width}x${exampleProject.input.properties.height}`);
  console.log(`   FPS: ${exampleProject.input.properties.fps}`);
  console.log(`   Tracks: ${exampleProject.input.tracks.length}`);
  console.log(`   Total Elements: ${exampleProject.input.tracks.reduce((sum, track) => sum + track.elements.length, 0)}\n`);

  try {
    console.log("🔄 Rendering video...");
    const startTime = Date.now();

    const outputPath = await renderTwickVideo(exampleProject, renderSettings);

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log("\n✅ Video rendered successfully!");
    console.log(`📁 Output file: ${outputPath}`);
    console.log(`⏱️  Render time: ${duration}s`);
    console.log(`\n🎉 Test completed successfully!`);

    return outputPath;
  } catch (error) {
    console.error("\n❌ Render failed:");
    console.error(error);
    if (error instanceof Error) {
      console.error(`   Error: ${error.message}`);
      if (error.stack) {
        console.error(`   Stack: ${error.stack}`);
      }
    }
    process.exit(1);
  }
}

// Run the test
testVideoRender().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
