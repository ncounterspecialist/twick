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

[browser-renderer.ts:348](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/browser-renderer.ts#L348)

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

[browser-renderer.ts:356](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/browser-renderer.ts#L356)

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

[browser-renderer.ts:350](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/browser-renderer.ts#L350)
