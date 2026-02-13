[@twick/browser-render](../README.md) / [Exports](../modules.md) / UseBrowserRendererOptions

# Interface: UseBrowserRendererOptions

## Table of contents

### Properties

- [autoDownload](UseBrowserRendererOptions.md#autodownload)
- [downloadAudioSeparately](UseBrowserRendererOptions.md#downloadaudioseparately)
- [downloadFilename](UseBrowserRendererOptions.md#downloadfilename)
- [fps](UseBrowserRendererOptions.md#fps)
- [height](UseBrowserRendererOptions.md#height)
- [includeAudio](UseBrowserRendererOptions.md#includeaudio)
- [onAudioReady](UseBrowserRendererOptions.md#onaudioready)
- [projectFile](UseBrowserRendererOptions.md#projectfile)
- [quality](UseBrowserRendererOptions.md#quality)
- [range](UseBrowserRendererOptions.md#range)
- [width](UseBrowserRendererOptions.md#width)

## Properties

### autoDownload

• `Optional` **autoDownload**: `boolean`

Automatically download the video when rendering completes

#### Defined in

[hooks/use-browser-renderer.ts:37](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L37)

___

### downloadAudioSeparately

• `Optional` **downloadAudioSeparately**: `boolean`

Download audio separately as WAV file

#### Defined in

[hooks/use-browser-renderer.ts:33](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L33)

___

### downloadFilename

• `Optional` **downloadFilename**: `string`

Default filename for downloads

#### Defined in

[hooks/use-browser-renderer.ts:39](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L39)

___

### fps

• `Optional` **fps**: `number`

Frames per second

#### Defined in

[hooks/use-browser-renderer.ts:25](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L25)

___

### height

• `Optional` **height**: `number`

Video height in pixels

#### Defined in

[hooks/use-browser-renderer.ts:23](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L23)

___

### includeAudio

• `Optional` **includeAudio**: `boolean`

Include audio in rendered video (experimental)

#### Defined in

[hooks/use-browser-renderer.ts:31](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L31)

___

### onAudioReady

• `Optional` **onAudioReady**: (`audioBlob`: `Blob`) => `void`

Callback when audio is ready

#### Type declaration

▸ (`audioBlob`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `audioBlob` | `Blob` |

##### Returns

`void`

#### Defined in

[hooks/use-browser-renderer.ts:35](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L35)

___

### projectFile

• `Optional` **projectFile**: `any`

Custom Project object
If not provided, defaults to @twick/visualizer project

Note: Must be an imported Project object, not a string path.
String paths only work in Node.js (server renderer).

Example:
```typescript
import myProject from './my-custom-project';
useBrowserRenderer({ projectFile: myProject })
```

#### Defined in

[hooks/use-browser-renderer.ts:19](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L19)

___

### quality

• `Optional` **quality**: ``"medium"`` \| ``"high"`` \| ``"low"``

Render quality

#### Defined in

[hooks/use-browser-renderer.ts:27](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L27)

___

### range

• `Optional` **range**: [`number`, `number`]

Time range to render [start, end] in seconds

#### Defined in

[hooks/use-browser-renderer.ts:29](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L29)

___

### width

• `Optional` **width**: `number`

Video width in pixels

#### Defined in

[hooks/use-browser-renderer.ts:21](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/hooks/use-browser-renderer.ts#L21)
