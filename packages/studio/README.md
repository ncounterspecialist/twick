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

## Installation

```bash
pnpm add @twick/studio
```

## Quick Start

```tsx
import { StudioProvider, VideoEditor } from '@twick/studio';

function App() {
  return (
    <StudioProvider>
      <VideoEditor />
    </StudioProvider>
  );
}
```

## Components

### VideoEditor

The main editor component that combines all editing features.

```tsx
<VideoEditor
  config={{
    canvas: {
      width: 1920,
      height: 1080
    }
  }}
/>
```

### ElementPanel

Panel for managing different types of elements:
- Videos
- Images
- Audio
- Text
- Icons
- Shapes
- Subtitles

```tsx
<ElementPanel
  addElement={handleAddElement}
/>
```

### TextPanel

Advanced text editing with features:
- Font selection
- Size control
- Color picker
- Shadow effects
- Stroke settings

### IconPanel

Icon library with features:
- Search functionality
- Category filtering
- Color customization
- Size adjustment

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
