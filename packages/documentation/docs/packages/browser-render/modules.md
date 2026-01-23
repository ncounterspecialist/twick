[@twick/browser-render](README.md) / Exports

# @twick/browser-render

## Table of contents

### Functions

- [renderTwickVideoInBrowser](modules.md#rendertwickvideoinbrowser)
- [downloadVideoBlob](modules.md#downloadvideoblob)

### Hooks

- [useBrowserRenderer](modules.md#usebrowserrenderer)

### Type Aliases

- [BrowserRenderConfig](modules.md#browserrenderconfig)
- [UseBrowserRendererOptions](modules.md#usebrowserrendereroptions)
- [UseBrowserRendererReturn](modules.md#usebrowserrendererreturn)

---

## Functions

### renderTwickVideoInBrowser

```typescript
function renderTwickVideoInBrowser(config: BrowserRenderConfig): Promise<Blob>
```

Renders a Twick video in the browser using WebCodecs API.

**Parameters:**

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `config` | `BrowserRenderConfig` | Configuration object for rendering |

**Returns:** `Promise<Blob>`

A promise that resolves to a Blob containing the rendered video.

---

### downloadVideoBlob

```typescript
function downloadVideoBlob(blob: Blob, filename?: string): void
```

Downloads a video blob as a file.

**Parameters:**

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `blob` | `Blob` | The video blob to download |
| `filename?` | `string` | Optional filename (default: "video.mp4") |

**Returns:** `void`

---

## Hooks

### useBrowserRenderer

```typescript
function useBrowserRenderer(options: UseBrowserRendererOptions): UseBrowserRendererReturn
```

React hook for browser-based video rendering.

**Parameters:**

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `options` | `UseBrowserRendererOptions` | Hook configuration options |

**Returns:** `UseBrowserRendererReturn`

An object containing render function, progress state, and video blob.

---

## Type Aliases

### BrowserRenderConfig

```typescript
type BrowserRenderConfig = {
  projectFile?: Project;
  variables: {
    input: any;
    playerId?: string;
    [key: string]: any;
  };
  settings?: {
    width?: number;
    height?: number;
    fps?: number;
    quality?: 'low' | 'medium' | 'high';
    range?: [number, number];
    onProgress?: (progress: number) => void;
    onComplete?: (videoBlob: Blob) => void;
    onError?: (error: Error) => void;
  };
}
```

Configuration for browser video rendering.

---

### UseBrowserRendererOptions

```typescript
type UseBrowserRendererOptions = {
  width?: number;
  height?: number;
  fps?: number;
  autoDownload?: boolean;
}
```

Options for the useBrowserRenderer hook.

---

### UseBrowserRendererReturn

```typescript
type UseBrowserRendererReturn = {
  render: (config: BrowserRenderConfig) => Promise<void>;
  progress: number;
  isRendering: boolean;
  videoBlob: Blob | null;
  download: () => void;
}
```

Return type for the useBrowserRenderer hook.
