# @twick/canvas

A React-based canvas library built with Fabric.js for video and image manipulation.

## Requirements

- Browser environment with Canvas and Video support
- React 18 or higher
- Fabric.js 6.6.2 or higher

## Installation

```bash
pnpm install @twick/canvas
```

## Usage

### Basic Canvas Setup

```tsx
import { useTwickCanvas } from '@twick/canvas';
import { useRef, useEffect } from 'react';

function CustomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { twickCanvas, buildCanvas, addElementToCanvas } = useTwickCanvas({
    onCanvasReady: (canvas) => {
      console.log("Canvas ready", canvas);
    },
    onCanvasOperation: (operation, data) => {
      console.log("Canvas operation", operation, data);
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvasSize = {
      width: container?.clientWidth,
      height: container?.clientHeight,
    };
    
    buildCanvas({
      videoSize: {
        width: 720,
        height: 1280,
      },
      canvasSize,
      canvasRef: canvasRef.current,
    });
  }, []);

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}
```

### Adding Elements

```tsx
// Add an image
const imageElement = {
  type: "image",
  id: "image-1",
  frame: {
    size: [400, 300],
  },
  props: {
    src: "https://example.com/image.jpg",
  }
};

addElementToCanvas({ element: imageElement, index: 0 });

// Add text
const textElement = {
  type: "text",
  id: "text-1",
  props: {
    x: 100,
    y: 100,
    text: "Hello World",
    fontSize: 64,
    fill: "#FFFFFF",
  }
};

addElementToCanvas({ element: textElement, index: 1 });
```

## API Reference

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