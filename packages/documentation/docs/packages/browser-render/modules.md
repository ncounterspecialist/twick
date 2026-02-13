[@twick/browser-render](README.md) / Exports

# @twick/browser-render

## Table of contents

### References

- [default](modules.md#default)

### Interfaces

- [BrowserRenderConfig](interfaces/BrowserRenderConfig.md)
- [NormalizeVideoOptions](interfaces/NormalizeVideoOptions.md)
- [NormalizeVideoResult](interfaces/NormalizeVideoResult.md)
- [UseBrowserRendererOptions](interfaces/UseBrowserRendererOptions.md)
- [UseBrowserRendererReturn](interfaces/UseBrowserRendererReturn.md)

### Functions

- [downloadVideoBlob](modules.md#downloadvideoblob)
- [normalizeVideoBlob](modules.md#normalizevideoblob)
- [renderTwickVideoInBrowser](modules.md#rendertwickvideoinbrowser)
- [useBrowserRenderer](modules.md#usebrowserrenderer)

## References

### default

Renames and re-exports [renderTwickVideoInBrowser](modules.md#rendertwickvideoinbrowser)

## Functions

### downloadVideoBlob

▸ **downloadVideoBlob**(`videoBlob`, `filename?`): `void`

Helper function to download a video blob as a file

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `videoBlob` | `Blob` | `undefined` | The video blob to download |
| `filename` | `string` | `'video.mp4'` | The desired filename (default: 'video.mp4') |

#### Returns

`void`

**`Example`**

```js
const blob = await renderTwickVideoInBrowser(projectData);
downloadVideoBlob(blob, 'my-video.mp4');
```

#### Defined in

[browser-renderer.ts:736](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/browser-renderer.ts#L736)

___

### normalizeVideoBlob

▸ **normalizeVideoBlob**(`input`, `options?`): `Promise`\<[`NormalizeVideoResult`](interfaces/NormalizeVideoResult.md)\>

Normalize a video Blob into a browser- and WebCodecs-friendly MP4.

Typical usage:
- Call this after file upload (e.g. from an <input type="file" />)
- Upload the returned Blob to your storage (S3, etc.)
- Use that URL in your Twick project instead of the raw source

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Blob` |
| `options` | [`NormalizeVideoOptions`](interfaces/NormalizeVideoOptions.md) |

#### Returns

`Promise`\<[`NormalizeVideoResult`](interfaces/NormalizeVideoResult.md)\>

#### Defined in

[audio/video-normalizer.ts:56](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/audio/video-normalizer.ts#L56)

___

### renderTwickVideoInBrowser

▸ **renderTwickVideoInBrowser**(`config`): `Promise`\<`Blob`\>

Renders a Twick video directly in the browser without requiring a server.
Uses WebCodecs API for encoding video frames into MP4 format.

This function uses the same signature as the server renderer for consistency.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`BrowserRenderConfig`](interfaces/BrowserRenderConfig.md) | Configuration object containing variables and settings |

#### Returns

`Promise`\<`Blob`\>

Promise resolving to a Blob containing the rendered video

**`Example`**

```js
import { renderTwickVideoInBrowser } from '@twick/browser-render';

// Using default visualizer project
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
    quality: 'high',
    onProgress: (progress) => console.log(`Rendering: ${progress * 100}%`),
  }
});

// Using custom project
import myProject from './my-custom-project';
const videoBlob = await renderTwickVideoInBrowser({
  projectFile: myProject, // Must be an imported Project object
  variables: { input: {...} },
  settings: {...}
});

// Download the video
const url = URL.createObjectURL(videoBlob);
const a = document.createElement('a');
a.href = url;
a.download = 'video.mp4';
a.click();
URL.revokeObjectURL(url);
```

#### Defined in

[browser-renderer.ts:423](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/browser-renderer.ts#L423)

___

### useBrowserRenderer

▸ **useBrowserRenderer**(`options?`): [`UseBrowserRendererReturn`](interfaces/UseBrowserRendererReturn.md)

React hook for rendering Twick videos in the browser

Uses the same pattern as the server renderer for consistency.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`UseBrowserRendererOptions`](interfaces/UseBrowserRendererOptions.md) | Rendering options |

#### Returns

[`UseBrowserRendererReturn`](interfaces/UseBrowserRendererReturn.md)

Renderer state and control functions

**`Example`**

```tsx
import { useBrowserRenderer } from '@twick/browser-render';

// Using default visualizer project
function MyComponent() {
  const { render, progress, isRendering, videoBlob, download } = useBrowserRenderer({
    width: 1920,
    height: 1080,
    fps: 30,
    autoDownload: true,
  });

  const handleRender = async () => {
    await render({
      input: {
        properties: { width: 1920, height: 1080, fps: 30 },
        tracks: [
          // Your tracks configuration
        ]
      }
    });
  };

  return (
    <div>
      <button onClick={handleRender} disabled={isRendering}>
        {isRendering ? `Rendering... ${(progress * 100).toFixed(0)}%` : 'Render Video'}
      </button>
      {videoBlob && !autoDownload && (
        <button onClick={() => download('my-video.mp4')}>Download</button>
      )}
    </div>
  );
}

// Using custom project (must import it first)
import myProject from './my-project';

function CustomProjectComponent() {
  const { render } = useBrowserRenderer({
    projectFile: myProject, // Pass the imported project object
    width: 1920,
    height: 1080,
  });
  
  // ... rest of component
}
```

#### Defined in

[hooks/use-browser-renderer.ts:117](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L117)
