[@twick/browser-render](../README.md) / [Exports](../modules.md) / BrowserRenderConfig

# Interface: BrowserRenderConfig

Browser rendering configuration

## Table of contents

### Properties

- [projectFile](BrowserRenderConfig.md#projectfile)
- [settings](BrowserRenderConfig.md#settings)
- [variables](BrowserRenderConfig.md#variables)

## Properties

### projectFile

• `Optional` **projectFile**: `Project`

Custom Project object
If not provided, defaults to @twick/visualizer project

Note: Must be an imported Project object, not a string path.
String paths only work in Node.js environments (server renderer).

Example:
```typescript
import myProject from './my-custom-project';

await renderTwickVideoInBrowser({
  projectFile: myProject,
  variables: { input: {...} }
});
```

#### Defined in

[browser-renderer.ts:193](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/browser-renderer.ts#L193)

___

### settings

• `Optional` **settings**: `Object`

Render settings

#### Type declaration

| Name | Type |
| :------ | :------ |
| `downloadAudioSeparately?` | `boolean` |
| `fps?` | `number` |
| `height?` | `number` |
| `includeAudio?` | `boolean` |
| `onAudioReady?` | (`audioBlob`: `Blob`) => `void` |
| `onComplete?` | (`videoBlob`: `Blob`) => `void` |
| `onError?` | (`error`: `Error`) => `void` |
| `onProgress?` | (`progress`: `number`) => `void` |
| `quality?` | ``"medium"`` \| ``"high"`` \| ``"low"`` |
| `range?` | [`number`, `number`] |
| `width?` | `number` |

#### Defined in

[browser-renderer.ts:201](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/browser-renderer.ts#L201)

___

### variables

• **variables**: `Object`

Input variables containing project configuration

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `input` | `any` |
| `playerId?` | `string` |

#### Defined in

[browser-renderer.ts:195](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/browser-renderer.ts#L195)
