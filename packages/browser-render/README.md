# @twick/browser-render

Browser-native video rendering for Twick using WebCodecs API.

## Installation

```bash
npm install @twick/browser-render
```

## Usage

### Basic Example

```typescript
import { renderTwickVideoInBrowser } from '@twick/browser-render';

const videoBlob = await renderTwickVideoInBrowser({
  variables: {
    input: {
      properties: { width: 1920, height: 1080, fps: 30 },
      tracks: [
        // Your tracks configuration
      ]
    }
  },
  settings: {
    width: 1920,
    height: 1080,
    fps: 30,
    onProgress: (progress) => console.log(`${(progress * 100).toFixed(0)}%`)
  }
});

// Download the video
const url = URL.createObjectURL(videoBlob);
const a = document.createElement('a');
a.href = url;
a.download = 'video.mp4';
a.click();
```

### React Hook

```tsx
import { useBrowserRenderer } from '@twick/browser-render';

function VideoRenderer() {
  const { render, progress, isRendering, videoBlob, download } = useBrowserRenderer({
    width: 1920,
    height: 1080,
    fps: 30,
    autoDownload: false
  });

  const handleRender = async () => {
    await render({
      input: {
        properties: { width: 1920, height: 1080, fps: 30 },
        tracks: [/* ... */]
      }
    });
  };

  return (
    <div>
      <button onClick={handleRender} disabled={isRendering}>
        Render Video
      </button>
      {isRendering && <progress value={progress} max={1} />}
      {videoBlob && <button onClick={download}>Download</button>}
    </div>
  );
}
```

## Configuration

### BrowserRenderConfig

```typescript
{
  projectFile?: Project;     // Optional custom project (defaults to @twick/visualizer)
  variables: {
    input: any;              // Required: project input data
    playerId?: string;
    [key: string]: any;
  };
  settings?: {
    width?: number;          // Video width (default: 1920)
    height?: number;         // Video height (default: 1080)
    fps?: number;            // Frames per second (default: 30)
    quality?: 'low' | 'medium' | 'high';
    range?: [number, number]; // [start, end] in seconds
    onProgress?: (progress: number) => void;
    onComplete?: (videoBlob: Blob) => void;
    onError?: (error: Error) => void;
  };
}
```

## Custom Project

```typescript
import myProject from './my-project';

const videoBlob = await renderTwickVideoInBrowser({
  projectFile: myProject,  // Must be an imported Project object
  variables: { input: {...} }
});
```

**Note**: String paths only work in Node.js. In the browser, you must import and pass the Project object directly.

## WASM Setup

Copy the WASM file to your public directory:

```bash
cp node_modules/mp4-wasm/dist/mp4-wasm.wasm public/
```

Or configure Vite to serve it:

```typescript
// vite.config.ts
export default defineConfig({
  assetsInclude: ['**/*.wasm']
});
```

## Limitations

- **Audio**: Audio processing is not yet implemented. Only video encoding is supported.
- **Browser Support**: Requires WebCodecs API (Chrome 94+, Edge 94+)

## API Comparison

This package follows the same API as the server renderer (`@twick/renderer`):

| Feature | Server | Browser |
|---------|--------|---------|
| Duration Calculation | `renderer.getNumberOfFrames()` | ✅ Same |
| Playback State | `PlaybackState.Rendering` | ✅ Same |
| Frame Progression | `playback.progress()` | ✅ Same |
| Variables Assignment | `project.variables = {...}` | ✅ Same |
| Audio Support | ✅ FFmpeg | ❌ Not yet |

## License

MIT
