# Twick

A comprehensive video editing toolkit built with modern web technologies.

## Style Guide

This project follows a comprehensive style guide for naming conventions and code style across all packages. Please refer to [STYLE_GUIDE.md](./STYLE_GUIDE.md) for detailed standards.

## Overview

Twick is a monorepo containing multiple packages for video editing functionality:

[![CI](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml/badge.svg)](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml)
[![Deploy Documentation](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml/badge.svg?branch=main)](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml)

This repository contains a collection of packages for video and image manipulation, built with modern web technologies.

### Usage Statistics

Track the growth of Twick's community and platform usage:

![Active Developers](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fdev-count&query=result&label=Active%20Developers&color=blue) ![Total Video Exported](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fvideo-count&query=result&label=Total%20Exported%20Video&color=green)

## Packages

### Core Packages

- **@twick/media-utils**: Core utilities for media handling and manipulation
- **@twick/canvas**: React-based canvas library for video and image editing
- **@twick/visualizer**: Video visualization and animation toolkit
- **@twick/live-player**: React component for video playback and control
- **@twick/timeline**: Timeline management and editing capabilities
- **@twick/video-editor**: React based video editor
- **@twick/examples**: Example implementations and usage demonstrations

### Cloud Functions

Twick provides serverless cloud functions for AI-powered video processing:

- **@twick/cloud-transcript**: Transcribe audio/video to generate JSON captions using Google GenAI (Vertex AI) with Gemini models. Perfect for extracting text from video content with precise timestamps.

- **@twick/cloud-subtitle-video**: Generate complete subtitle video projects from video URLs. Automatically transcribes audio, creates subtitle tracks with proper timing, and optionally exports project JSONs to S3. Ideal for creating subtitled videos programmatically.

- **@twick/cloud-export-video**: Export Twick video projects to MP4 format. Includes a core renderer and AWS Lambda container templates for serverless video rendering with Chromium and ffmpeg.

All cloud functions are designed to run as AWS Lambda container images and can be easily deployed to your infrastructure. See individual package READMEs for deployment instructions.

### Agents

- **@twick/mcp-agent**: MCP (Model Context Protocol) server for Claude Desktop that generates video captions using Google Vertex AI. Enables AI assistants to transcribe videos and create subtitle projects directly from Claude Desktop, with seamless integration to Twick Studio.

For detailed API documentation and module information, refer to [docs/modules.md](./docs/modules.md).

## Try it

Experience Twick Studio in your browser with our live demo: [Twick Studio](https://development.d1vtsw7m0lx01h.amplifyapp.com/)

### AI-Powered Subtitle Generation

Create subtitle videos automatically using AI! Simply paste a public video URL and our system will:
- Transcribe the audio using Google GenAI (Vertex AI)
- Generate timed subtitle tracks
- Create a complete Twick Studio project ready for editing

Try it now: [Auto-generate Subtitles](https://development.d1vtsw7m0lx01h.amplifyapp.com/subtitles)

## Cloud Functions & AI Features

Twick's cloud functions and agents enable powerful AI-driven video processing capabilities:

### Use Cases

**Automated Subtitle Generation**
- Process video content at scale with serverless functions
- Generate accurate, timed subtitles for accessibility and localization
- Integrate into your workflow via API calls or Lambda functions
- Support multiple languages and fonts for global content

**AI-Assisted Video Editing**
- Use the MCP agent with Claude Desktop to generate subtitles through natural language
- Seamlessly create Twick Studio projects from video URLs
- Export projects directly to your Twick Studio instance

**Serverless Video Processing**
- Deploy transcription and rendering functions as AWS Lambda containers
- Scale automatically based on demand
- Process videos without managing infrastructure
- Export videos programmatically from Twick projects

### Benefits

- **Scalable**: Serverless architecture handles any volume of requests
- **Cost-Effective**: Pay only for what you use with AWS Lambda
- **Accurate**: Powered by Google's Gemini models for high-quality transcription
- **Integrated**: Works seamlessly with Twick Studio and your existing workflows
- **Flexible**: Deploy to your own infrastructure or use as npm packages

For detailed setup and deployment instructions, see the individual package READMEs in `packages/cloud-functions/` and `packages/agents/`.

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

## Development

Each package can be developed independently:

```bash
# Build a specific package
pnpm build:media-utils
```

## Examples

### Running the Demo

```bash
pnpm preview
```

Open http://localhost:4173 in your browser to see the video editor in action.

For detailed examples and tutorials, see the [Twick Demo guide](https://ncounterspecialist.github.io/twick/docs/in-action).

## Preview

Watch how to create a video project step-by-step with Twick Studio:

[Twick Studio](https://youtu.be/2M6vtOHZnEI)

See how simple it is to integrate Twick into your existing application:

[Twick SDK Integration](https://youtu.be/EizgeoxwJsk)

## Integration

### Video Editor Integration

1. Install Dependencies 

```bash
npm install --save @twick/canvas @twick/live-player @twick/timeline @twick/video-editor @twick/studio
```

2. Add Twick Studio component with LivePlayer and Timeline Context as shown

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

## Documentation

- **Twick Documentation**: [Twick API Documentation](https://ncounterspecialist.github.io/twick) – Comprehensive documentation and API reference for all Twick packages.
- **Style Guide**: [Style Guide](./STYLE_GUIDE.md) – Guidelines for coding standards and best practices.
- **Demo Guide**: [Twick Demo Guide](https://ncounterspecialist.github.io/twick/docs/in-action) – Step-by-step tutorials and interactive examples.

## Community

Join our Discord community to:
- Chat with other developers
- Discuss issues and feature requests
- Get help and share your experiences
- Stay updated with the latest developments

[Join our Discord Server](https://discord.gg/DQ4f9TyGW8)

## License

This project is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK or developer tool

For resale, or SaaS redistribution please [contact us](mailto:contact@kifferai.com).

For full license terms, see [LICENSE.md](LICENSE.md). 
