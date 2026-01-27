[@twick/browser-render](README.md) / Exports

# @twick/browser-render

## Table of contents

### References

- [default](modules.md#default)

### Interfaces

- [BrowserRenderConfig](interfaces/BrowserRenderConfig.md)
- [UseBrowserRendererOptions](interfaces/UseBrowserRendererOptions.md)
- [UseBrowserRendererReturn](interfaces/UseBrowserRendererReturn.md)

### Functions

- [downloadVideoBlob](modules.md#downloadvideoblob)
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

[browser-renderer.ts:473](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/browser-renderer.ts#L473)

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

[browser-renderer.ts:268](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/browser-renderer.ts#L268)

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

[hooks/use-browser-renderer.ts:117](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/hooks/use-browser-renderer.ts#L117)
