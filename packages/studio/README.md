## Twick Studio

`@twick/studio` is a high‑level React package that composes the core Twick building blocks (timeline, canvas, live‑player, video‑editor) into a ready‑to‑use editor UI.

### Media panels & asset management

Studio exposes three main media panels:

- `Video` (`video-panel-container.tsx` / `video-panel.tsx`)
- `Audio` (`audio-panel-container.tsx` / `audio-panel.tsx`)
- `Image` (`image-panel-container.tsx` / `image-panel.tsx`)

Each panel has two tabs:

- **My assets** – user uploads and URL imports, stored in the browser via `BrowserMediaManager` (IndexedDB).
- **Public** – stock media from providers (Pexels, Unsplash, Pixabay, etc.) backed by the `twick-web` asset API.

All media items resolved by the panels are passed into the timeline by URL; the timeline/canvas only needs a playable/renderable `url` (plus optional metadata like duration, width/height).

### Configuring public asset providers

To enable and configure public providers used by Studio:

1. Set the provider API keys for `twick-web`:

   ```bash
   # Pexels
   PEXELS_API_KEY=your_pexels_api_key

   # Unsplash
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key

   # Pixabay
   PIXABAY_API_KEY=your_pixabay_api_key
   ```

2. Restart the `twick-web` app so environment changes are picked up:

   ```bash
   cd twick-web
   pnpm dev            # or next start in production
   ```

3. Open Studio and switch a media panel to the **Public** tab:
   - Studio will call `twick-web`’s `/api/assets/providers/config` and `/api/assets/search` routes.
   - Only providers whose env vars are configured and whose `getConfig().enabled` flag is `true` will appear.

For a deeper explanation of the asset model (`MediaItem` / `MediaAsset`), the `AssetLibrary` abstraction, and how to add or customize providers, see the root‑level `ASSET_MANAGER.md`.

# @twick/studio

The main video editing interface for Twick, providing a professional-grade editing experience in the browser.

## Features

- **Modern Interface**: Clean, intuitive dark theme design
- **Media Management**: Integrated video, audio, and image library
- **Text Tools**: Advanced text editing with multiple fonts and styles
- **Timeline Control**: Precise timeline-based editing
- **Element Library**: Rich set of editing elements (shapes, icons, etc.)
- **Audio Support**: Audio track management and editing
- **Effects**: Visual effects and transitions
- **Project Management**: Save, load, and export video projects

## Installation

```bash
npm install @twick/studio
# or
pnpm add @twick/studio
```

**Note:** All required dependencies are automatically installed with `@twick/studio`:
- `@twick/timeline` - Timeline management
- `@twick/live-player` - Video player components
- `@twick/video-editor` - Video editor component
- `@twick/canvas` - Canvas utilities
- `@twick/media-utils` - Media processing utilities
- `@twick/visualizer` - Visual rendering
- `@twick/core` - Core functionality
- `@twick/player-react` - React player components

You can import all components and providers directly from `@twick/studio` - no need to import from individual packages! This simplifies your imports and ensures all dependencies are properly versioned together.

## Quick Start

```tsx
// Import everything you need from @twick/studio
import { 
  TwickStudio,
  LivePlayerProvider,
  TimelineProvider,
  INITIAL_TIMELINE_DATA
} from "@twick/studio";
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
            // Optional: Customize timeline tick marks
            timelineTickConfigs: [
              { durationThreshold: 30, majorInterval: 5, minorTicks: 5 },
              { durationThreshold: 300, majorInterval: 30, minorTicks: 6 }
            ],
            // Optional: Customize zoom behavior
            timelineZoomConfig: {
              min: 0.5, max: 2.0, step: 0.25, default: 1.0
            },
            // Optional: Customize element colors
            elementColors: {
              video: "#8B5FBF",
              audio: "#3D8B8B",
              image: "#D4956C",
              text: "#A78EC8",
              caption: "#9B8ACE",
              fragment: "#1A1A1A"
            }
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

### Alternative: Import from Individual Packages

You can also import from individual packages if you prefer:

```tsx
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/timeline";
import { TwickStudio } from "@twick/studio";
```

## Components

### TwickStudio

The main studio component that provides a complete video editing interface.

```tsx
<TwickStudio 
  studioConfig={{
    videoProps: {
      width: 1920,
      height: 1080
    },
    // Optional: Customize timeline tick marks
    timelineTickConfigs: [
      { durationThreshold: 30, majorInterval: 5, minorTicks: 5 },
      { durationThreshold: 300, majorInterval: 30, minorTicks: 6 }
    ],
    // Optional: Customize zoom behavior
    timelineZoomConfig: {
      min: 0.5, max: 2.0, step: 0.25, default: 1.0
    },
    // Optional: Customize element colors
    elementColors: {
      video: "#8B5FBF",
      audio: "#3D8B8B",
      image: "#D4956C",
      text: "#A78EC8",
      caption: "#9B8ACE",
      fragment: "#1A1A1A"
    },
    saveProject: async (project, fileName) => {
      // Custom save logic
      return { status: true, message: "Project saved" };
    },
    loadProject: async () => {
      // Custom load logic
      return projectData;
    },
    exportVideo: async (project, videoSettings) => {
      // Custom export logic
      return { status: true, message: "Video exported" };
    }
  }}
/>
```

### StudioConfig

Configuration options for the studio:

```tsx
interface StudioConfig {
  videoProps?: {
    width: number;
    height: number;
  };
  // Timeline tick configuration
  timelineTickConfigs?: TimelineTickConfig[];
  // Zoom configuration
  timelineZoomConfig?: TimelineZoomConfig;
  // Element colors
  elementColors?: ElementColors;
  // Project management callbacks
  saveProject?: (project: ProjectJSON, fileName: string) => Promise<Result>;
  loadProject?: () => Promise<ProjectJSON>;
  exportVideo?: (project: ProjectJSON, videoSettings: VideoSettings) => Promise<Result>;
  // Generative AI (optional; enables generate-media toolbar)
  imageGenerationService?: IImageGenerationService;
  videoGenerationService?: IVideoGenerationService;
}

interface TimelineTickConfig {
  durationThreshold: number; // Applies when duration < threshold
  majorInterval: number;      // Major tick interval in seconds
  minorTicks: number;         // Number of minor ticks between majors
}

interface TimelineZoomConfig {
  min: number;     // Minimum zoom level
  max: number;     // Maximum zoom level
  step: number;    // Zoom step increment/decrement
  default: number; // Default zoom level
}

interface ElementColors {
  video: string;
  audio: string;
  image: string;
  text: string;
  caption: string;
  fragment: string;
}
```

### Individual Panels

The studio includes specialized panels for different element types:

- **AudioPanel**: Audio management and library
- **VideoPanel**: Video management and library  
- **ImagePanel**: Image management and library
- **TextPanel**: Text editing with advanced styling
- **CaptionsPanel**: Caption and caption management
- **CirclePanel**: Circle shape creation and editing
- **RectPanel**: Rectangle shape creation and editing
- **IconPanel**: Icon library with search and customization

### Generative AI Services

Implement `IImageGenerationService` and/or `IVideoGenerationService` to enable the generate-media tool (toolbar icon Wand2):

```ts
interface IImageGenerationService {
  generateImage: (params: GenerateImageParams) => Promise<string>; // returns requestId
  getRequestStatus: (reqId: string) => Promise<IGenerationPollingResponse>;
  getAvailableModels?: () => ModelInfo[];
}

interface IVideoGenerationService {
  generateVideo: (params: GenerateVideoParams) => Promise<string>;
  getRequestStatus: (reqId: string) => Promise<IGenerationPollingResponse>;
  getAvailableModels?: () => ModelInfo[];
}
```

Types (`GenerateImageParams`, `GenerateVideoParams`, `IGenerationPollingResponse`, `ModelInfo`) come from `@twick/ai-models`. Pass your implementation via `studioConfig.imageGenerationService` and `studioConfig.videoGenerationService`. If neither is provided, the generate-media tool is hidden.

### Hooks

- **useStudioManager**: Hook for managing studio state, selected tools, and element manipulation
- **useGenerateCaptions**: Hook for caption generation and polling
- **useGenerateImage**: Hook for image generation (returns `generateImage`, `addImageToTimeline`, `isGenerating`, `error`)
- **useGenerateVideo**: Hook for video generation (returns `generateVideo`, `addVideoToTimeline`, `isGenerating`, `error`)

### Re-exported Components

For convenience, `@twick/studio` re-exports commonly used components from other packages:

- **VideoEditor**: Main video editor component (from `@twick/video-editor`)
- **LivePlayer**, **LivePlayerProvider**: Player components (from `@twick/live-player`)
- **TimelineProvider**, **INITIAL_TIMELINE_DATA**: Timeline components (from `@twick/timeline`)

You can import these directly from `@twick/studio`:

```tsx
import { 
  VideoEditor,
  LivePlayer,
  LivePlayerProvider,
  TimelineProvider,
  INITIAL_TIMELINE_DATA
} from "@twick/studio";
```

## Development

### Running Locally

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Building

```bash
pnpm build
```

## Browser Support

Requires modern browsers with support for:
- WebGL
- Canvas API
- Web Audio API
- Modern JavaScript (ES2020+)

## License

This package is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK

For commercial licensing inquiries, contact: contact@kifferai.com

For full license terms, see the main LICENSE.md file in the project root.
