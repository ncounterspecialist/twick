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
  const { render, progress, isRendering, videoBlob, download, error, reset } =
    useBrowserRenderer({
      width: 720,
      height: 1280,
      fps: 30,
      includeAudio: true,   // enable audio rendering + FFmpeg mux
      autoDownload: true,   // auto-download final MP4
    });

  const handleRender = async () => {
    await render({
      input: {
        properties: { width: 720, height: 1280, fps: 30 },
        tracks: [/* ... */],
      },
    });
  };

  return (
    <div>
      <button onClick={handleRender} disabled={isRendering}>
        Render Video
      </button>
      {isRendering && <progress value={progress} max={1} />}
      {videoBlob && <button onClick={download}>Download</button>}
      {error && (
        <div>
          <p>{error.message}</p>
          <button onClick={reset}>Clear error</button>
        </div>
      )}
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
    includeAudio?: boolean;  // Enable audio rendering and muxing (default: false)
    downloadAudioSeparately?: boolean; // Also download audio.wav when muxing fails
    onAudioReady?: (audioBlob: Blob) => void; // Callback when raw audio is ready
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

## WASM and public assets

The package ships `public/` with `mp4-wasm.wasm` and `audio-worker.js`. Copy them into your app's public directory so they are served:

```bash
cp node_modules/@twick/browser-render/public/mp4-wasm.wasm public/
cp node_modules/@twick/browser-render/public/audio-worker.js public/
```

Alternatively, configure your bundler (e.g. Vite) to serve WASM:

```typescript
// vite.config.ts
export default defineConfig({
  assetsInclude: ['**/*.wasm']
});
```

### FFmpeg audio/video muxing (optional)

When `settings.includeAudio` is enabled, `@twick/browser-render` will render audio in the browser and (by default) try to mux it into the final MP4 using `@ffmpeg/ffmpeg`.  
To match the setup used in `@twick/examples`, you should:

1. Install the FFmpeg packages:

```bash
npm install @ffmpeg/ffmpeg @ffmpeg/util @ffmpeg/core
```

2. Expose the FFmpeg core files from your app’s `public` folder so they are available at:

```text
/public/ffmpeg/ffmpeg-core.js
/public/ffmpeg/ffmpeg-core.wasm
```

For example, you can copy them from `node_modules/@ffmpeg/core/dist`:

```bash
mkdir -p public/ffmpeg
cp node_modules/@ffmpeg/core/dist/ffmpeg-core.js public/ffmpeg/
cp node_modules/@ffmpeg/core/dist/ffmpeg-core.wasm public/ffmpeg/
```

In the browser, the muxer loads these files from `${window.location.origin}/ffmpeg`, so the URLs must match that structure.  
If FFmpeg cannot be loaded, the renderer will fall back to returning a video-only file and (optionally) downloading `audio.wav` separately when `downloadAudioSeparately` is true.

## Limitations

- **Audio**: Audio rendering and FFmpeg-based muxing run entirely in the browser and are still considered experimental. If FFmpeg assets are not available, only video will be muxed and audio may be downloaded as a separate file.
- **Browser Support**: Requires WebCodecs API (Chrome 94+, Edge 94+)

## License

This package is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK

For commercial licensing inquiries, contact: contact@kifferai.com

For full license terms, see the main LICENSE.md file in the project root.

