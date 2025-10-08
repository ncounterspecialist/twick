# @twick/video-editor

A React component for video editing and timeline management with advanced features.

## Overview

This package provides a comprehensive video editing interface with timeline management, multi-track support, and real-time preview capabilities. It integrates seamlessly with other Twick packages to create a complete video editing solution.

## Features

- Video preview with custom controls
- Timeline-based editing interface
- Multi-track timeline support
- Customizable video dimensions
- Drag-and-drop timeline reordering
- High-performance video rendering
- Real-time project updates
- Advanced timeline manipulation
- Professional editing tools

## Requirements

- React 18 or higher
- Browser environment with HTML5 Video support

## Installation

```bash
npm install @twick/video-editor
# or
pnpm add @twick/video-editor
```

## Quick Start

```tsx
import { VideoEditor } from '@twick/video-editor';
import { LivePlayerProvider } from '@twick/live-player';
import { TimelineProvider } from '@twick/timeline';

function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={{
          timeline: [],
          version: 0,
        }}
      >
        <VideoEditor
          leftPanel={null}
          rightPanel={null}
          editorConfig={{
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

## Key Features

### Video Preview
- Real-time video playback with custom controls
- Frame-accurate timeline scrubbing
- Multiple preview quality options
- Responsive video display

### Timeline Management
- Multi-track timeline interface
- Drag-and-drop element reordering
- Visual timeline representation
- Time-based element positioning

### Editing Tools
- Text overlay capabilities
- Image and video element support
- Audio track management
- Effect and transition tools

### Performance
- Optimized rendering pipeline
- Efficient memory management
- Smooth playback performance
- Real-time updates

## API Reference

### Components

- `VideoEditor`: Main video editor component

### Props

- `leftPanel`: Custom left panel component
- `rightPanel`: Custom right panel component
- `bottomPanel`: Custom bottom panel component
- `editorConfig`: Editor configuration object
- `defaultPlayControls`: Whether to show default playback controls

### Configuration Options

#### `editorConfig`

```typescript
interface VideoEditorConfig {
  videoProps: {
    width: number;
    height: number;
    backgroundColor?: string;
  };
  playerProps?: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
  };
  canvasMode?: boolean;
  timelineTickConfigs?: TimelineTickConfig[];
  timelineZoomConfig?: TimelineZoomConfig;
  elementColors?: ElementColors;
}
```

#### Timeline Tick Configuration

Customize timeline tick marks for different duration ranges:

```typescript
interface TimelineTickConfig {
  durationThreshold: number; // Applies when duration < threshold
  majorInterval: number;      // Major tick interval in seconds
  minorTicks: number;         // Number of minor ticks between majors
}
```

**Example:**
```tsx
timelineTickConfigs: [
  { durationThreshold: 30, majorInterval: 5, minorTicks: 5 },    // < 30s
  { durationThreshold: 300, majorInterval: 30, minorTicks: 6 },  // < 5min
  { durationThreshold: 3600, majorInterval: 300, minorTicks: 5 } // < 1hr
]
```

#### Zoom Configuration

Customize timeline zoom behavior:

```typescript
interface TimelineZoomConfig {
  min: number;     // Minimum zoom level
  max: number;     // Maximum zoom level
  step: number;    // Zoom step increment/decrement
  default: number; // Default zoom level
}
```

**Example:**
```tsx
timelineZoomConfig: {
  min: 0.5,     // 50% minimum zoom
  max: 3.0,     // 300% maximum zoom
  step: 0.25,   // 25% zoom steps
  default: 1.5  // 150% default zoom
}
```

#### Element Colors

Customize timeline element colors:

```typescript
interface ElementColors {
  video: string;
  audio: string;
  image: string;
  text: string;
  caption: string;
  fragment: string;
}
```

**Example:**
```tsx
elementColors: {
  video: "#8B5FBF",
  audio: "#3D8B8B",
  image: "#D4956C",
  text: "#A78EC8",
  caption: "#9B8ACE",
  fragment: "#1A1A1A"
}
```

### Default Constants

The package exports default configurations that can be used or customized:

```tsx
import { 
  DEFAULT_TIMELINE_TICK_CONFIGS,
  DEFAULT_TIMELINE_ZOOM_CONFIG,
  DEFAULT_ELEMENT_COLORS
} from '@twick/video-editor';

// Use defaults
<VideoEditor
  editorConfig={{
    videoProps: { width: 1920, height: 1080 },
    timelineTickConfigs: DEFAULT_TIMELINE_TICK_CONFIGS,
    timelineZoomConfig: DEFAULT_TIMELINE_ZOOM_CONFIG,
    elementColors: DEFAULT_ELEMENT_COLORS
  }}
/>

// Or customize based on defaults
const customColors = {
  ...DEFAULT_ELEMENT_COLORS,
  video: "#FF0000",  // Custom red for video
  audio: "#00FF00"   // Custom green for audio
};
```

### Types

- `VideoEditorProps`: Props interface for VideoEditor
- `VideoEditorConfig`: Editor configuration interface
- `TimelineTickConfig`: Timeline tick configuration interface
- `TimelineZoomConfig`: Zoom configuration interface
- `ElementColors`: Element colors interface

For complete API documentation, refer to the generated documentation.

## Browser Support

This package requires a browser environment with support for:
- HTML5 Video and Audio
- Canvas API
- Drag and Drop API
- Modern JavaScript features (ES2020+)

## Documentation

For complete documentation, refer to the project documentation site.

## License

This package is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK

For commercial licensing inquiries, contact: contact@kifferai.com

For full license terms, see the main LICENSE.md file in the project root.
