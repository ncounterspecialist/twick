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
- `editorConfig`: Editor configuration object
- `videoProps`: Video properties configuration

### Types

- `VideoEditorProps`: Props interface for VideoEditor
- `EditorConfig`: Editor configuration interface
- `VideoProps`: Video properties interface

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
