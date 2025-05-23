# @twick/canvas

A React-based canvas library built with Fabric.js for video and image manipulation.

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
  getImageElement, 
  getVideoElement, 
  getTextElement, 
  getCaptionElement 
} from '@twick/canvas';

// Add an image
const imageElement = getImageElement({
  src: 'image.jpg',
  x: 100,
  y: 100,
  width: 200,
  height: 150
});

// Add text
const textElement = getTextElement({
  text: 'Hello World',
  x: 50,
  y: 50,
  fontSize: 24,
  fill: 'white'
});

// Add caption
const captionElement = getCaptionElement({
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

## License

Apache-2.0 