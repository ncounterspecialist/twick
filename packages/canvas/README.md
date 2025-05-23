# @twick/canvas

A React-based canvas library built with Fabric.js for video and image manipulation.

## Requirements

- Browser environment with Canvas and Video support
- React 18 or higher
- Fabric.js 6.6.2 or higher

## Installation

```bash
npm install @twick/canvas
```

## Usage

### Basic Video Canvas

```tsx
import { CanvasContainer } from '@twick/canvas';

function App() {
  return (
    <CanvasContainer
      videoUrl="https://example.com/video.mp4"
      width={800}
      height={600}
      onCanvasReady={(canvas) => {
        // Access canvas instance
      }}
    />
  );
}
```

### Custom Hook

```tsx
import { useTwickCanvas } from '@twick/canvas';

function CustomCanvas() {
  const { canvas, video, isPlaying, play, pause, seek } = useTwickCanvas(
    canvasRef,
    videoUrl
  );

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={isPlaying ? pause : play}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
```

### Adding Elements

```tsx
import { 
  addImageElement, 
  addVideoElement, 
  addTextElement, 
  addCaptionElement 
} from '@twick/canvas';

// Add an image
await addImageElement({
  src: 'image.jpg',
  x: 100,
  y: 100,
  width: 200,
  height: 150
});

// Add text
addTextElement({
  text: 'Hello World',
  x: 50,
  y: 50,
  fontSize: 24,
  fill: 'white'
});

// Add caption
addCaptionElement({
  text: 'Video Caption',
  x: 0,
  y: 0,
  font: {
    family: 'Arial',
    size: 32
  }
});
```

## API Reference

### Components

- `CanvasContainer`: Main component for video/image canvas
- `CanvasContainerProps`: Props interface for CanvasContainer

### Hooks

- `useTwickCanvas`: Custom hook for canvas manipulation

### Helpers

- `createCanvas`: Create a new Fabric.js canvas instance
- `reorderElementsByZIndex`: Reorder canvas elements by z-index
- `getCurrentFrameEffect`: Get current frame effect
- `convertToCanvasPosition`: Convert video coordinates to canvas coordinates
- `convertToVideoPosition`: Convert canvas coordinates to video coordinates

### Types

- `CanvasProps`: Canvas configuration props
- `CanvasMetadata`: Canvas metadata interface
- `FrameEffect`: Frame effect interface
- `CanvasElement`: Canvas element interface
- `CanvasElementProps`: Canvas element props interface
- `CaptionProps`: Caption configuration props

## Browser Support

This library requires a browser environment with support for:
- HTML5 Canvas
- HTML5 Video
- Modern JavaScript features (ES2020+)

The library will throw appropriate errors if used in an unsupported environment.

## License

Apache-2.0 