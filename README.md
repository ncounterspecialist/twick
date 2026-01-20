# Twick - React Video Editor SDK with AI Caption Generation

**The leading open-source React Video Editor Library featuring AI caption generation, timeline editing, canvas tools, and MP4 export for building custom video applications.**

Twick is a comprehensive **React Video Editor SDK** that empowers developers to build professional video editing experiences with **AI-powered caption generation**, real-time timeline editing, and serverless video rendering. This **video editor SDK** combines React-based canvas tools, AI subtitle generation using Google Vertex AI (Gemini), and cloud-native MP4 export—all in TypeScript. Whether you're building a video SaaS, content creation platform, or automated video pipeline, Twick provides the **React video editor library** components you need to ship fast.

**Key Features:** AI caption generation • React timeline editor • Canvas-based video editing • Serverless MP4 export • Open-source video SDK

[![CI](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml/badge.svg)](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml)
[![Deploy Documentation](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml/badge.svg?branch=main)](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml)

![Active Developers](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fdev-count&query=result&label=Active%20Developers&color=blue) ![Total Video Exported](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fvideo-count&query=result&label=Total%20Exported%20Video&color=green)

## React Video Editor SDK - Who Is This For?

**This React video editor library is built for:**

- **React / Frontend Engineers** building video editing UIs and timeline-based editors
- **AI Engineers** creating video pipelines with automated transcription and subtitle generation
- **Indie Founders** shipping video products without building video infrastructure from scratch
- **Platform / Infrastructure Teams** deploying serverless video processing at scale

**Not for:** Non-technical creators looking for a ready-made video editing SaaS. Twick is a developer toolkit, not an end-user application.

## Video Editor SDK Architecture

Twick's **React video editor SDK** is organized as a modular monorepo with clear separation of concerns:

- **React Canvas & Timeline Editor** (`@twick/canvas`, `@twick/timeline`, `@twick/studio`) — Build video editing UIs with Fabric.js and React timeline components
- **Serverless Video Export** (`@twick/cloud-export-video`, `@twick/cloud-subtitle-video`, `@twick/cloud-transcript`) — AWS Lambda containers with ffmpeg and Chromium for MP4 video rendering
- **AI Caption Generation Pipeline** — Google Vertex AI (Gemini) integration for automated video transcription and AI-powered subtitle generation
- **MCP Agent Integration** (`@twick/mcp-agent`) — Claude Desktop integration for AI-assisted video editing workflows

## React Video Editor Library Packages

### Core React Video Editor Components

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

### AI Caption Generation & Cloud Video Export

- **@twick/cloud-transcript** — **AI Caption Generation**: Transcribe audio/video to JSON captions using Google GenAI (Vertex AI) with Gemini models  
  *Why it exists: Extract text from video content with precise timestamps for AI-powered subtitle generation*

- **@twick/cloud-subtitle-video** — **Automated Subtitle Generation**: Generate complete subtitle video projects from video URLs  
  *Why it exists: Automatically transcribe audio, create timed subtitle tracks, and export project JSONs—ideal for programmatic AI caption generation*

- **@twick/cloud-export-video** — **Serverless MP4 Export**: Export Twick video projects to MP4 format  
  *Why it exists: Serverless video rendering with Chromium and ffmpeg in AWS Lambda containers—no server management required for MP4 export*

All cloud functions run as AWS Lambda container images for scalable video processing. See individual package READMEs in `packages/cloud-functions/` for deployment instructions.

### Agents

- **@twick/mcp-agent** — MCP (Model Context Protocol) server for Claude Desktop  
  *Why it exists: Enables AI assistants to transcribe videos and create subtitle projects directly from Claude Desktop with seamless Twick Studio integration*

## Try the React Video Editor SDK Live

**React Video Editor Demo** — Experience the full React video editing interface with timeline and canvas tools in your browser: [Live Demo](https://development.d1vtsw7m0lx01h.amplifyapp.com/)  
*Interactive demo showcasing the React video editor SDK with timeline editing, canvas tools, and real-time preview*

**AI Caption Generation Demo** — Paste a video URL and get AI-generated subtitles with timed tracks using Gemini AI: [AI Subtitle Generator](https://development.d1vtsw7m0lx01h.amplifyapp.com/subtitles)  
*Automated video transcription and AI caption generation powered by Google Vertex AI (Gemini)*

**Serverless MP4 Export** — Export video projects to MP4 using serverless cloud rendering (available in Twick Studio demo)  
*Cloud-based video rendering with ffmpeg and Chromium in AWS Lambda for scalable MP4 export*

## Getting Started with the React Video Editor Library

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

## React Video Editor SDK Integration

Install the **React Video Editor SDK** - Twick Studio (includes all timeline, canvas, and video editing dependencies automatically):

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

## React Video Editor SDK Documentation

📚 **[Complete Documentation & API Reference](https://ncounterspecialist.github.io/twick)** — Full React video editor SDK documentation with API references, tutorials, and integration guides

- **[React Video Editor API Documentation](https://ncounterspecialist.github.io/twick)** — Comprehensive API reference for all React video editor components, timeline editor, canvas tools, and AI caption generation packages
- **[Video Editor SDK Demo Guide](https://ncounterspecialist.github.io/twick/docs/in-action)** — Step-by-step tutorials, interactive examples, and integration guides for the React video editor library
- **[AI Caption Generation Guide](https://ncounterspecialist.github.io/twick)** — Learn how to implement AI-powered subtitle generation and video transcription
- **[Troubleshooting Guide](./TROUBLESHOOTING.md)** — Common issues and solutions for React video editor integration
- **[Style Guide](./STYLE_GUIDE.md)** — Coding standards and best practices for Twick SDK development

## Community

Join our Discord community to chat with developers, discuss issues, and stay updated: [Join Discord](https://discord.gg/DQ4f9TyGW8)

## License

This **React Video Editor SDK** is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK or developer tool

For resale or SaaS redistribution of this video editor library, please [contact us](mailto:contact@kifferai.com).

For full license terms, see [LICENSE.md](./LICENSE.md).

---

## Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Twick - React Video Editor SDK",
  "description": "Open-source React Video Editor Library with AI Caption Generation, Timeline Editing, Canvas Tools & MP4 Export for building custom video applications",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web, Linux, macOS, Windows",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "keywords": "React Video Editor, Video Editor SDK, AI Caption Generation, React Video Editor Library, Timeline Editor, Canvas Video Editing, MP4 Export, Video Editing Library, React Canvas, Serverless Video Rendering, AI Subtitle Generation, Video Transcription, Open Source Video Editor",
  "softwareVersion": "0.15.0",
  "url": "https://github.com/ncounterspecialist/twick",
  "codeRepository": "https://github.com/ncounterspecialist/twick",
  "programmingLanguage": "TypeScript, JavaScript, React",
  "author": {
    "@type": "Organization",
    "name": "Twick"
  },
  "license": "https://github.com/ncounterspecialist/twick/blob/main/LICENSE.md",
  "documentation": "https://ncounterspecialist.github.io/twick",
  "downloadUrl": "https://www.npmjs.com/package/@twick/studio",
  "softwareHelp": "https://ncounterspecialist.github.io/twick/docs/in-action",
  "featureList": [
    "React Video Editor SDK",
    "AI Caption Generation with Google Vertex AI (Gemini)",
    "Timeline-based video editing",
    "Canvas tools for video manipulation",
    "Serverless MP4 export with AWS Lambda",
    "Real-time video preview",
    "Automated subtitle generation",
    "Video transcription API",
    "React components for video editing",
    "Open-source video editor library"
  ],
  "screenshot": "https://development.d1vtsw7m0lx01h.amplifyapp.com",
  "discussionUrl": "https://discord.gg/DQ4f9TyGW8"
}
```

---

**Built for developers shipping video products.** Star ⭐ this repo to follow updates on the leading React video editor SDK with AI caption generation.
