import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { transcribeVideoUrl } from "./transcriber.js";
import {
  processSubtitlesToProject,
  returnProjectAsFile,
  returnProjectAsTwickStudioLink,
} from "./utils.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import dotenv from "dotenv";

// Get project root (go up from dist/ to project root)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, "..");

// Load .env.local from project root, not cwd
dotenv.config({ path: resolve(PROJECT_ROOT, ".env.local") });

// Initialize MCP server
const server = new Server(
  {
    name: "twick-mcp-agent",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Advertise tools so MCP clients can discover them
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate-subtitles",
        description:
          "Generate subtitles for an video URL using an external service",
        inputSchema: {
          type: "object",
          properties: {
            videoUrl: {
              type: "string",
              description: "Publicly accessible media URL (video)",
            },
            language: {
              type: "string",
              description: "Language for transcription (default: english)",
            },
            language_font: {
              type: "string",
              description: "Language font (default: english)",
            },
          },
          required: ["videoUrl"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (request.params.name === "generate-subtitles") {
      const { videoUrl, language, language_font } = request.params
        .arguments as {
        videoUrl: string;
        language?: string;
        language_font?: string;
      };

      if (!videoUrl || typeof videoUrl !== "string") {
        throw new Error("Invalid or missing videoUrl");
      }

      const data = await transcribeVideoUrl({
        videoUrl,
        language: language ?? "english",
        languageFont: language_font ?? "english",
      });

      const project = await processSubtitlesToProject({
        subtitles: data.subtitles,
        videoUrl: data.videoUrl,
        duration: data.duration,
        videoSize: { width: 720, height: 1280 },
      });

      if (process.env.UPLOAD_API_URL && process.env.TWICK_STUDIO_URL) {
        return await returnProjectAsTwickStudioLink(project);
      } else {
        return returnProjectAsFile(project);
      }
    } else {
      throw new Error(`Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    console.error(error); 
    throw error;
  }
});

// Start the server with stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
