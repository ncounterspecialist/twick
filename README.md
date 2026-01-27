# Twick - React Video Editor SDK with AI Caption Generation

**The leading open-source React Video Editor Library featuring AI caption generation, timeline editing, canvas tools, and MP4 export for building custom video applications.**

Twick is a comprehensive **React Video Editor SDK** that empowers developers to build professional video editing experiences with **AI-powered caption generation**, real-time timeline editing, and serverless video rendering. This **video editor SDK** combines React-based canvas tools, AI subtitle generation using Google Vertex AI (Gemini), and cloud-native MP4 export—all in TypeScript. Whether you're building a video SaaS, content creation platform, or automated video pipeline, Twick provides the **React video editor library** components you need to ship fast.

**Key Features:** AI caption generation • React timeline editor • Canvas-based video editing • Serverless MP4 export • Open-source video SDK

[![CI](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml/badge.svg)](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml)
[![Deploy Documentation](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml/badge.svg?branch=main)](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml)

![Active Developers](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fdev-count&query=result&label=Active%20Developers&color=blue) ![Total Video Exported](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fvideo-count&query=result&label=Total%20Exported%20Video&color=green)

## Support Twick

Twick is built and maintained as an open-source project.

If this React video editor SDK helped you ship faster, avoid reinventing timelines, or save at least one late night wrestling with video logic, you can support its continued development here:

<a href="https://buymeacoffee.com/coffeewithtwick">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="180">
</a>

Your support helps fund new features, better documentation, performance improvements, and long-term maintenance. 
Caffeine has a surprisingly high impact on open source velocity.

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

### Video Rendering & Export

- **@twick/browser-render** — Browser-native video rendering using WebCodecs API  
  *Why it exists: Client-side video export for short videos without server infrastructure. Perfect for demos and prototyping*

- **@twick/render-server** — Node.js video rendering server with Puppeteer and FFmpeg  
  *Why it exists: Production-grade video processing for long videos with full audio support. Ideal for server-side automation*

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

## Video Export Options

Twick provides **two rendering approaches** for exporting videos: **Browser Rendering** for quick, client-side exports and **Server Rendering** for production-grade, high-performance video processing.

### Browser Rendering (`@twick/browser-render`)

**Best for:** Short videos, client-side exports, prototyping, and demos

Client-side video rendering using WebCodecs API. Videos are rendered directly in the user's browser without server infrastructure.

#### When to Use Browser Rendering

**Recommended for:**
- Videos under 30 seconds
- Client-side video preview/export
- Prototyping and development
- Simple video compositions
- No server infrastructure available

**Not recommended for:**
- Videos longer than 1 minute
- Production video processing at scale
- Complex animations with many elements
- Audio synchronization requirements
- Server-side video generation pipelines

#### Installation

```bash
npm install @twick/browser-render
# or
pnpm add @twick/browser-render
```

#### React Hook Example

```tsx
import { useBrowserRenderer, type BrowserRenderConfig } from "@twick/browser-render";
import { TwickStudio, LivePlayerProvider, TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/studio";
import "@twick/studio/dist/studio.css";
import { useState } from "react";

export default function VideoEditor() {
  const { render, progress, isRendering, error, reset } = useBrowserRenderer({
    width: 720,
    height: 1280,
    includeAudio: true,
    autoDownload: true,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const onExportVideo = async (project, videoSettings) => {
    try {
      const variables = {
        input: {
          ...project,
          properties: {
            width: videoSettings.resolution.width || 720,
            height: videoSettings.resolution.height || 1280,
            fps: videoSettings.fps || 30,
          },
        },
      } as BrowserRenderConfig['variables'];
      
      const videoBlob = await render(variables);
      
      if (videoBlob) {
        setShowSuccess(true);
        return { status: true, message: "Video exported successfully!" };
      }
    } catch (err) {
      return { status: false, message: err.message };
    }
  }

  return (
    <LivePlayerProvider>
      <TimelineProvider initialData={INITIAL_TIMELINE_DATA} contextId="studio">
        <TwickStudio 
          studioConfig={{
            exportVideo: onExportVideo,
            videoProps: { width: 720, height: 1280 }
          }} 
        />
        
        {/* Progress Overlay */}
        {isRendering && (
          <div className="rendering-overlay">
            <div>Rendering... {Math.round(progress * 100)}%</div>
            <progress value={progress} max={1} />
          </div>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="error-message">
            {error.message}
            <button onClick={reset}>Close</button>
          </div>
        )}
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

#### Browser Rendering Limitations

- **Browser Support**: Requires WebCodecs API (Chrome 94+, Edge 94+, not available in Firefox/Safari)
- **Audio**: Experimental audio support (audio is extracted but not muxed into final video)
- **Performance**: Limited by browser resources and user's device capabilities
- **Memory**: Large videos may cause browser memory issues
- **Reliability**: Browser tabs can be closed, interrupting rendering

**Full Documentation:** See [`@twick/browser-render` README](./packages/browser-render/README.md)

---

### Server Rendering (`@twick/render-server`)

**Best for:** Production video exports, long videos, server-side processing, and scalable video pipelines

Node.js-based video rendering using Puppeteer and FFmpeg. Provides production-grade video processing with full audio support.

#### When to Use Server Rendering

**Recommended for:**
- Videos longer than 30 seconds
- Production video processing
- Complex video compositions with many elements
- Full audio synchronization and mixing
- Automated video generation pipelines
- Server-side video processing at scale
- Reliable, high-performance rendering

#### Installation

```bash
npm install @twick/render-server
# or
pnpm add @twick/render-server
```

#### Quick Start: Scaffold a Server

The easiest way to get started is to scaffold a complete Express server:

```bash
npx @twick/render-server init
cd twick-render-server
npm install
npm run dev  # Development mode
```

This creates a production-ready server with:
- POST `/api/render-video` endpoint for video rendering
- GET `/download/:filename` endpoint with rate limiting
- Express server with security middleware
- TypeScript support

#### Programmatic Usage (ESM)

```typescript
import { renderTwickVideo } from "@twick/render-server";

const videoPath = await renderTwickVideo(
  {
    input: {
      properties: { 
        width: 1920, 
        height: 1080,
        fps: 30 
      },
      tracks: [
        {
          id: "track-1",
          type: "element",
          elements: [
            {
              id: "text-1",
              type: "text",
              s: 0,
              e: 5,
              props: {
                text: "Hello World",
                fill: "#FFFFFF"
              }
            }
          ]
        }
      ]
    }
  },
  {
    outFile: "output.mp4",
    quality: "high",
    outDir: "./videos"
  }
);

console.log("Video rendered:", videoPath);
```

#### Integrate with TwickStudio

```tsx
import { TwickStudio, LivePlayerProvider, TimelineProvider } from "@twick/studio";

export default function VideoEditor() {
  const onExportVideo = async (project, videoSettings) => {
    try {
      // Send to your server endpoint
      const response = await fetch("http://localhost:3001/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variables: {
            input: {
              ...project,
              properties: {
                width: videoSettings.resolution.width,
                height: videoSettings.resolution.height,
                fps: videoSettings.fps
              }
            }
          },
          settings: {
            outFile: `video-${Date.now()}.mp4`,
            quality: "high"
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Video is ready for download
        window.open(result.downloadUrl, '_blank');
        return { status: true, message: "Video exported successfully!" };
      }
    } catch (err) {
      return { status: false, message: err.message };
    }
  }

  return (
    <LivePlayerProvider>
      <TimelineProvider contextId="studio">
        <TwickStudio 
          studioConfig={{
            exportVideo: onExportVideo,
            videoProps: { width: 1920, height: 1080 }
          }} 
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

#### Server Requirements

- **Node.js**: Version 20 or higher
- **FFmpeg**: Required for audio/video processing
- **Operating System**: Linux or macOS (Windows not supported)
- **Memory**: Minimum 2GB RAM, 4GB+ recommended for HD videos

**Full Documentation:** See [`@twick/render-server` README](./packages/render-server/README.md)

---

### Comparison: Browser vs Server Rendering

| Feature | Browser Rendering | Server Rendering |
|---------|------------------|------------------|
| **Setup Complexity** | Simple (npm install) | Requires Node.js server |
| **Infrastructure** | None required | Server/hosting needed |
| **Video Length** | < 30 seconds recommended | Unlimited |
| **Performance** | Limited by browser | High performance |
| **Audio Support** | Experimental | Full support |
| **Reliability** | Can be interrupted | Robust & reliable |
| **Use Case** | Quick exports, demos | Production, automation |
| **Browser Support** | Chrome/Edge only | N/A (server-side) |
| **Cost** | Free (client-side) | Server hosting costs |
| **Scalability** | Limited | Horizontally scalable |

### Recommendations

**For Development & Prototyping:**  
Start with `@twick/browser-render` for quick feedback and testing.

**For Production:**  
Use `@twick/render-server` for reliable, high-quality video exports.

**Hybrid Approach:**  
Use browser rendering for preview/demos and server rendering for final exports.

---

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
