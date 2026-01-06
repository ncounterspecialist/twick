# Twick

**A modern, open-source video editing & rendering toolkit for the web.**

Build programmable video editing experiences with React, deploy serverless video processing with AI, and export to MP4—all in TypeScript. Twick combines React-based canvas editing, serverless cloud functions, and AI-powered transcription to give developers the tools they need to build video products.

[![CI](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml/badge.svg)](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml)
[![Deploy Documentation](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml/badge.svg?branch=main)](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml)

![Active Developers](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fdev-count&query=result&label=Active%20Developers&color=blue) ![Total Video Exported](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fvideo-count&query=result&label=Total%20Exported%20Video&color=green)

## Who Is This For?

**Twick is built for:**

- **React / Frontend Engineers** building video editing UIs and timeline-based editors
- **AI Engineers** creating video pipelines with automated transcription and subtitle generation
- **Indie Founders** shipping video products without building video infrastructure from scratch
- **Platform / Infrastructure Teams** deploying serverless video processing at scale

**Not for:** Non-technical creators looking for a ready-made video editing SaaS. Twick is a developer toolkit, not an end-user application.

## Architecture Overview

Twick is organized as a modular monorepo with clear separation of concerns:

- **React-based canvas & timeline packages** (`@twick/canvas`, `@twick/timeline`, `@twick/studio`) — Build video editing UIs with Fabric.js and React
- **Serverless cloud functions** (`@twick/cloud-export-video`, `@twick/cloud-subtitle-video`, `@twick/cloud-transcript`) — AWS Lambda containers with ffmpeg and Chromium for video rendering
- **AI subtitle pipeline** — Google Vertex AI (Gemini) integration for automated transcription and caption generation
- **MCP agent integration** (`@twick/mcp-agent`) — Claude Desktop integration for AI-assisted video editing workflows

## Packages

### Core Packages

- **@twick/media-utils** — Core utilities for media handling and manipulation  
  *Why it exists: Foundation layer for all media operations (file operations, metadata extraction, dimension calculations)*

- **@twick/canvas** — React-based canvas library for video and image editing  
  *Why it exists: Provides Fabric.js-based visual editing interface with React hooks for element manipulation*

- **@twick/timeline** — Timeline management and editing capabilities  
  *Why it exists: Handles track management, element operations, and undo/redo functionality for timeline-based editing*

- **@twick/live-player** — React component for video playback and control  
  *Why it exists: Synchronizes video playback with timeline state and provides player controls*

- **@twick/visualizer** — Video visualization and animation toolkit  
  *Why it exists: Renders video compositions with animated effects and transitions*

- **@twick/video-editor** — React-based video editor component  
  *Why it exists: High-level component that orchestrates canvas, timeline, and player for complete editing experience*

- **@twick/studio** — Professional video editing interface  
  *Why it exists: Production-ready UI with media management, text tools, timeline controls, and project management*

- **@twick/examples** — Example implementations and usage demonstrations  
  *Why it exists: Reference implementations showing how to integrate Twick packages*

### Cloud Functions

- **@twick/cloud-transcript** — Transcribe audio/video to JSON captions using Google GenAI (Vertex AI) with Gemini models  
  *Why it exists: Extract text from video content with precise timestamps for subtitle generation*

- **@twick/cloud-subtitle-video** — Generate complete subtitle video projects from video URLs  
  *Why it exists: Automatically transcribe audio, create timed subtitle tracks, and export project JSONs—ideal for programmatic subtitle generation*

- **@twick/cloud-export-video** — Export Twick video projects to MP4 format  
  *Why it exists: Serverless video rendering with Chromium and ffmpeg in AWS Lambda containers—no server management required*

All cloud functions run as AWS Lambda container images. See individual package READMEs in `packages/cloud-functions/` for deployment instructions.

### Agents

- **@twick/mcp-agent** — MCP (Model Context Protocol) server for Claude Desktop  
  *Why it exists: Enables AI assistants to transcribe videos and create subtitle projects directly from Claude Desktop with seamless Twick Studio integration*

## Try It

**Twick Studio Demo** — Experience the full video editing interface in your browser: [Live Demo](https://development.d1vtsw7m0lx01h.amplifyapp.com/)

**Auto-generate Subtitles** — Paste a video URL and get AI-generated subtitles with timed tracks: [Subtitle Generator](https://development.d1vtsw7m0lx01h.amplifyapp.com/subtitles)

**Cloud Export to MP4** — Export video projects to MP4 using serverless rendering (available in Twick Studio demo)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ncounterspecialist/twick.git
cd twick
```

2. Install dependencies:
```bash
pnpm install
```

3. Build all packages:
```bash
pnpm build
```

4. Run the demo:
```bash
pnpm preview
```

Open http://localhost:4173 in your browser to see the video editor in action.

## Integration

Install Twick Studio (includes all dependencies automatically):

```bash
npm install --save @twick/studio
# or
pnpm add @twick/studio
```

Add Twick Studio to your React app:

```tsx
import { LivePlayerProvider } from "@twick/live-player";
import { TwickStudio } from "@twick/studio";
import { TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/timeline";
import "@twick/studio/dist/studio.css";

export default function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
        contextId={"studio-demo"}
      >
        <TwickStudio 
          studioConfig={{
            videoProps: {
              width: 720,
              height: 1280,
            },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

## Development

Each package can be developed independently:

```bash
# Build a specific package
pnpm build:media-utils

# Run development server
pnpm dev
```

For detailed development guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Documentation

- **[Twick API Documentation](https://ncounterspecialist.github.io/twick)** — Comprehensive API reference for all packages
- **[Twick Demo Guide](https://ncounterspecialist.github.io/twick/docs/in-action)** — Step-by-step tutorials and interactive examples
- **[Troubleshooting Guide](./TROUBLESHOOTING.md)** — Common issues and solutions
- **[Style Guide](./STYLE_GUIDE.md)** — Coding standards and best practices

## Community

Join our Discord community to chat with developers, discuss issues, and stay updated: [Join Discord](https://discord.gg/DQ4f9TyGW8)

## License

This project is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK or developer tool

For resale or SaaS redistribution, please [contact us](mailto:contact@kifferai.com).

For full license terms, see [LICENSE.md](./LICENSE.md).
