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

### Quality levels

The `settings.quality` flag controls the internal render resolution (supersampling), not the final video width/height:

- `'low'` (or omitted): `resolutionScale = 1` (base project resolution)
- `'medium'`: `resolutionScale ≈ 1.5` (higher internal resolution, sharper output)
- `'high'`: `resolutionScale = 2` (2× internal resolution for maximum sharpness)

Higher quality levels produce noticeably sharper text and images at the same output size, but increase render time and memory usage.

## Custom Project

```typescript
import myProject from './my-project';

const videoBlob = await renderTwickVideoInBrowser({
  projectFile: myProject,  // Must be an imported Project object
  variables: { input: {...} }
});
```

**Note**: String paths only work in Node.js. In the browser, you must import and pass the Project object directly.

## No extra scripts required

**CRA, Vite, and Next.js**: Install `@twick/browser-render` and use it. No postinstall, copy scripts, or patches are required.

This package uses **`@twick/ffmpeg-web`** (a wrapper around `@ffmpeg/ffmpeg`) so that dynamic imports work correctly with webpack, Next.js, CRA, and Vite—no consumer-level patches needed.

- **Video encoding**: mp4-wasm is loaded from your app’s public paths first, then from CDN (jsdelivr) if not found.
- **Audio muxing**: FFmpeg core is loaded via `@twick/ffmpeg-web` from same-origin paths (e.g. `/ffmpeg/`) if present, otherwise from CDN. Works with webpack (CRA, Next.js) and Vite out of the box.

### Optional: offline or custom assets

To avoid CDN and serve everything from your app, copy assets into your public directory:

```bash
node node_modules/@twick/browser-render/scripts/copy-public-assets.js
```

Or add to `package.json`:

```json
{
  "scripts": {
    "prestart": "node node_modules/@twick/browser-render/scripts/copy-public-assets.js",
    "prebuild": "node node_modules/@twick/browser-render/scripts/copy-public-assets.js",
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

The script copies FFmpeg core files (from `@twick/ffmpeg-web`), `mp4-wasm.wasm`, and `audio-worker.js` to your `public/` directory. If assets cannot be loaded (e.g. offline), the renderer falls back to video-only; for Vite you can use `twickBrowserRenderPlugin()` (see `@twick/browser-render/vite-plugin-ffmpeg`).

#### Manual setup (same-origin only)

If you prefer to serve FFmpeg and WASM from your app only (no CDN), ensure these are available:

- **FFmpeg**: `/ffmpeg/ffmpeg-core.js` and `/ffmpeg/ffmpeg-core.wasm` (e.g. via the copy script or Vite plugin above).
- **mp4-wasm**: `mp4-wasm.wasm` in your `public/` root (or path your app serves it from).

The muxer loads FFmpeg from `${window.location.origin}/ffmpeg` when present. If FFmpeg cannot be loaded, the renderer returns a video-only file and (optionally) downloads `audio.wav` separately when `downloadAudioSeparately` is true. For Vite, use `twickBrowserRenderPlugin()` to copy these files automatically; see `@twick/browser-render/vite-plugin-ffmpeg`.

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

