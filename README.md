# Twick – React Video Editor SDK with AI Caption Generation

**Twick** is an open-source **React Video Editor Library & SDK** featuring AI caption generation, timeline editing, canvas tools, and MP4 export for building custom video applications.

Twick enables developers to build professional video editing experiences with **AI-powered caption generation**, real-time timeline editing, and serverless video rendering. It combines React-based canvas tools, AI caption generation using Google Vertex AI (Gemini), and cloud-native MP4 export—all in TypeScript. Whether you're building a video SaaS, content creation platform, or automated video pipeline, Twick provides the React video editor components you need to ship fast.

**Key features:** 
- AI caption generation
- React timeline editor
- Canvas-based video editing
- Client-side rendering
- Serverless MP4 export
- Open-source video SDK


[![CI](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml/badge.svg)](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml)
[![Deploy Documentation](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml/badge.svg?branch=main)](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml)

![Active Developers](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fdev-count&query=result&label=Active%20Developers&color=blue)
![Total Video Exported](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdevelopment.d1vtsw7m0lx01h.amplifyapp.com%2Fapi%2Fanalytics%2Fvideo-count&query=result&label=Total%20Exported%20Video&color=green)

---

## Connect with the Twick team

The fastest way to reach the maintainers, ask implementation questions, discuss ideas, and share feedback:

<a href="https://discord.gg/DQ4f9TyGW8">
  <img src="https://img.shields.io/badge/Join_Twick_Discord-Community-5865F2?style=for-the-badge&logo=discord&logoColor=white" width="220" alt="Join the Twick Discord">
</a>

We actively monitor Discord for:

- **Integration help** (React, Next.js, Node, cloud functions)
- **Bug reports and troubleshooting**
- **Feature requests and roadmap feedback**

---

## What is Twick?

Twick is a modular **React video editor library** and cloud toolchain that helps you:

- Build **timeline-based editors** with React
- Add **AI captions and transcripts** to any video
- Render MP4s using **browser WebCodecs** or **server-side FFmpeg**
- Integrate video editing into SaaS products, internal tools, or automation pipelines

---

## Who is this for?

- **React / Frontend engineers** building video editing or timeline UIs  
- **AI / ML teams** adding transcription, captioning, or video automation  
- **Product / Indie founders** shipping video products without building video infra from scratch  
- **Platform teams** standardizing video processing across services  

**Not a fit:** non-technical creators looking for a ready-made consumer editor. Twick is a developer SDK.

---

## Live demos

**Twick Studio (full editor UI)** — Professional React-based video editor with timeline, canvas, and export.

<a href="https://development.d1vtsw7m0lx01h.amplifyapp.com">
  <img src="https://img.shields.io/badge/Twick_Studio-Live_Demo-61DAFB?style=for-the-badge&logoColor=black" width="220" alt="Open Twick Studio">
</a>


**AI Caption Generator** — Paste a video URL, get AI-generated captions and timed tracks.

<a href="https://development.d1vtsw7m0lx01h.amplifyapp.com/subtitles">
  <img src="https://img.shields.io/badge/Generate_AI_Caption-Live_Demo-8B5CF6?style=for-the-badge&logoColor=white" width="240" alt="Generate AI Caption with Twick">
</a>

---

## Key packages

- **`@twick/studio`** – All-in-one, production-ready React video editor UI  
- **`@twick/canvas`** – Fabric.js-based canvas tools for video/image editing  
- **`@twick/timeline`** – Timeline model, tracks, operations, and undo/redo  
- **`@twick/live-player`** – Video playback synchronized with timeline state  
- **`@twick/browser-render`** – WebCodecs-based browser MP4 rendering (uses `@twick/ffmpeg-web` for audio muxing)  
- **`@twick/ffmpeg-web`** – FFmpeg.wasm wrapper for webpack, Next.js, CRA, and Vite (used by `@twick/browser-render`)  
- **`@twick/render-server`** – Node + Puppeteer + FFmpeg rendering server  
- **`@twick/cloud-transcript`** – AI transcription to JSON captions 
- **`@twick/cloud-caption-video`** – Fully automated caption project generation from a video URL  
- **`@twick/cloud-export-video`** – Serverless MP4 export via AWS Lambda containers  
- **`@twick/mcp-agent`** – MCP agent for Claude Desktop + Twick Studio workflows  

See the full documentation for detailed APIs and examples.

---

## Quick start – Monorepo

Clone and run the demos locally. Two example apps are included:

**Vite (recommended)** – `packages/examples`  
Uses the `@twick/browser-render` Vite plugin so FFmpeg and WASM assets are copied to `public/` automatically.

```bash
git clone https://github.com/ncounterspecialist/twick.git
cd twick

pnpm install
pnpm build
pnpm --filter=@twick/examples preview
```

Then open `http://localhost:4173` (or the port shown) in your browser.

**Create React App** – `packages/examples-cra`  
Uses a copy script before `start`/`build` so the same assets are available without Vite.

```bash
pnpm install
pnpm --filter=@twick/examples-cra build
pnpm --filter=@twick/examples-cra start
```

Both run smoothly with no manual copying of FFmpeg or WASM files.

**Running the examples**

| App | Path | Command to run |
|-----|------|----------------|
| Vite | `packages/examples` | `pnpm --filter=@twick/examples dev` or `pnpm --filter=@twick/examples preview` (after build) |
| Create React App | `packages/examples-cra` | `pnpm --filter=@twick/examples-cra start` (prestart copies assets automatically) |

The Vite examples use `twickBrowserRenderPlugin()` in `vite.config.ts`; the CRA examples use `prestart`/`prebuild` to run `@twick/browser-render/scripts/copy-public-assets.js`. In both cases, FFmpeg and WASM files are handled for you.

---

## Quick start – Use Twick Studio in your app

Install the main editor studio package (it pulls in the required timeline and player dependencies):

```bash
npm install --save @twick/studio
# or
pnpm add @twick/studio
```

Minimal integration:

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
        contextId="studio-demo"
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

For Next.js or more advanced setups, refer to the docs.

---

## Video export options

Twick supports **two primary export paths**:

- **Browser rendering (`@twick/browser-render`)**  
  - Client-side export using WebCodecs API for video encoding + FFmpeg.wasm for audio/video muxing  
  - Best for short clips, previews, prototypes, and environments without backend infra  

- **Server rendering (`@twick/render-server`)**  
  - Node-based rendering with Puppeteer + FFmpeg  
  - Best for production workloads, long videos, and full audio support  

High-level guidance:

- **Development / prototyping:** start with `@twick/browser-render`  
- **Production:** use `@twick/render-server` (or `@twick/cloud-export-video` on AWS Lambda)  

See the individual package READMEs for full examples and configuration.

---

### Example – Browser rendering with `@twick/browser-render`

**Installation**

```bash
npm install @twick/browser-render
# or
pnpm add @twick/browser-render
```

**React hook usage with Twick Studio**

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
      } as BrowserRenderConfig["variables"];

      const videoBlob = await render(variables);

      if (videoBlob) {
        setShowSuccess(true);
        return { status: true, message: "Video exported successfully!" };
      }
    } catch (err: any) {
      return { status: false, message: err.message };
    }
  };

  return (
    <LivePlayerProvider>
      <TimelineProvider initialData={INITIAL_TIMELINE_DATA} contextId="studio">
        <TwickStudio
          studioConfig={{
            exportVideo: onExportVideo,
            videoProps: { width: 720, height: 1280 },
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

**Public assets (FFmpeg, WASM) – run smoothly**

Browser rendering uses **`@twick/ffmpeg-web`** for FFmpeg-based audio muxing. FFmpeg core and mp4-wasm are loaded from your app’s same-origin paths first, then from CDN if not found, so you often don’t need to copy anything:

- **Vite** – Add the plugin to copy assets on dev/build (recommended for offline or custom paths):
  ```ts
  // vite.config.ts
  import { twickBrowserRenderPlugin } from '@twick/browser-render/vite-plugin-ffmpeg';
  export default defineConfig({ plugins: [twickBrowserRenderPlugin(), /* ... */] });
  ```
- **Create React App or other bundlers** – Optional: run the copy script before `start`/`build` to serve assets from your app instead of CDN:
  ```json
  "prestart": "node node_modules/@twick/browser-render/scripts/copy-public-assets.js",
  "prebuild": "node node_modules/@twick/browser-render/scripts/copy-public-assets.js"
  ```

See the `@twick/browser-render` README for manual setup and troubleshooting.

**Limitations (summary)**

- Requires WebCodecs (Chrome / Edge; not Firefox / Safari)  
- Audio/video muxing uses FFmpeg.wasm via `@twick/ffmpeg-web` (same-origin or CDN; plugin or copy script optional for offline)  
- Limited by client device resources and memory  
- Long or complex renders are better handled on the server  

For full details, see the `@twick/browser-render` README.

---

### Example – Server rendering with `@twick/render-server`

**Installation**

```bash
npm install @twick/render-server
# or
pnpm add @twick/render-server
```

**Quick start – scaffold a server**

```bash
npx @twick/render-server init
cd twick-render-server
npm install
npm run dev
```

This creates an Express server with:

- `POST /api/render-video` – render Twick projects to MP4  
- `GET /download/:filename` – download rendered videos (with rate limiting)  

**Programmatic usage**

```ts
import { renderTwickVideo } from "@twick/render-server";

const videoPath = await renderTwickVideo(
  {
    input: {
      properties: {
        width: 1920,
        height: 1080,
        fps: 30,
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
                fill: "#FFFFFF",
              },
            },
          ],
        },
      ],
    },
  },
  {
    outFile: "output.mp4",
    quality: "high",
    outDir: "./videos",
  }
);

console.log("Video rendered:", videoPath);
```

**Integrate server export with Twick Studio**

```tsx
import { TwickStudio, LivePlayerProvider, TimelineProvider } from "@twick/studio";

export default function VideoEditor() {
  const onExportVideo = async (project, videoSettings) => {
    try {
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
                fps: videoSettings.fps,
              },
            },
          },
          settings: {
            outFile: `video-${Date.now()}.mp4`,
            quality: "high",
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        window.open(result.downloadUrl, "_blank");
        return { status: true, message: "Video exported successfully!" };
      }
    } catch (err: any) {
      return { status: false, message: err.message };
    }
  };

  return (
    <LivePlayerProvider>
      <TimelineProvider contextId="studio">
        <TwickStudio
          studioConfig={{
            exportVideo: onExportVideo,
            videoProps: { width: 1920, height: 1080 },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

**Server requirements (summary)**

- Node.js 20+  
- FFmpeg installed  
- Linux or macOS (Windows not supported)  
- 2 GB RAM minimum (4 GB+ recommended for HD)  

For full details, see the `@twick/render-server` README.

---

## Documentation

- **Main docs & API reference:**  

  [Twick Documentation](https://ncounterspecialist.github.io/twick)

- **In-action guides and examples:** 

  [Twick in Action](https://ncounterspecialist.github.io/twick/docs/intro)

- **Troubleshooting:**

  [Troubleshooting Documentation](https://github.com/ncounterspecialist/twick/blob/main/TROUBLESHOOTING.md)   

---

## Community & support

- **Discord (primary support channel)** – talk directly to the maintainers, share ideas, and get real-time help:  
  **[Join the Twick Discord](https://discord.gg/DQ4f9TyGW8)**

- **GitHub Issues** – bug reports, feature requests, and roadmap discussion.

If you are evaluating Twick for a production product and need architectural guidance, please start in Discord – we’re happy to discuss design options and trade-offs.

---

## Development

Each package can be developed independently:

```bash
# Build a specific package
pnpm build:media-utils

# Run development server
pnpm dev
```

For detailed contribution guidelines, see [Contribution Guide](https://github.com/ncounterspecialist/twick/blob/main/CONTRIBUTING.md)

---

## License

This **React Video Editor SDK** is licensed under the **Sustainable Use License (SUL) v1.0**.

- Free for commercial and non-commercial application use  
- Can be modified and self-hosted  
- Cannot be sold, rebranded, or redistributed as a standalone SDK or developer tool  

For resale or SaaS redistribution of this library, please contact `contact@kifferai.com`.  
Full terms: see [License](https://github.com/ncounterspecialist/twick/blob/main/LICENSE.md).

---

## Schema.org structured data

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
  "keywords": "React Video Editor, Video Editor SDK, AI Caption Generation, React Video Editor Library, Timeline Editor, Canvas Video Editing, MP4 Export, Video Editing Library, React Canvas, Serverless Video Rendering, AI Caption Generation, Video Transcription, Open Source Video Editor",
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
    "Automated caption generation",
    "Video transcription API",
    "React components for video editing",
    "Open-source video editor library"
  ],
  "screenshot": "https://development.d1vtsw7m0lx01h.amplifyapp.com",
  "discussionUrl": "https://discord.gg/DQ4f9TyGW8"
}
```

---

**Built for developers shipping video products.** Star this repo to follow updates on the Twick React video editor SDK with AI caption generation.
