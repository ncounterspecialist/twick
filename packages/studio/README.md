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

**Note:** All required dependencies (`@twick/timeline`, `@twick/live-player`, `@twick/video-editor`, `@twick/canvas`, `@twick/media-utils`) are automatically installed with `@twick/studio`.

## Quick Start

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
- **SubtitlesPanel**: Subtitle and caption management
- **CirclePanel**: Circle shape creation and editing
- **RectPanel**: Rectangle shape creation and editing
- **IconPanel**: Icon library with search and customization

### Hooks

- **useStudioManager**: Hook for managing studio state, selected tools, and element manipulation

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
