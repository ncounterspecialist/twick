[@twick/browser-render](../README.md) / [Exports](../modules.md) / UseBrowserRendererReturn

# Interface: UseBrowserRendererReturn

## Table of contents

### Properties

- [download](UseBrowserRendererReturn.md#download)
- [error](UseBrowserRendererReturn.md#error)
- [isRendering](UseBrowserRendererReturn.md#isrendering)
- [progress](UseBrowserRendererReturn.md#progress)
- [render](UseBrowserRendererReturn.md#render)
- [reset](UseBrowserRendererReturn.md#reset)
- [videoBlob](UseBrowserRendererReturn.md#videoblob)

## Properties

### download

• **download**: (`filename?`: `string`) => `void`

Download the rendered video

#### Type declaration

▸ (`filename?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `filename?` | `string` |

##### Returns

`void`

#### Defined in

[hooks/use-browser-renderer.ts:54](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/hooks/use-browser-renderer.ts#L54)

___

### error

• **error**: ``null`` \| `Error`

Error if rendering failed

#### Defined in

[hooks/use-browser-renderer.ts:50](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/hooks/use-browser-renderer.ts#L50)

___

### isRendering

• **isRendering**: `boolean`

Whether rendering is in progress

#### Defined in

[hooks/use-browser-renderer.ts:48](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/hooks/use-browser-renderer.ts#L48)

___

### progress

• **progress**: `number`

Current rendering progress (0-1)

#### Defined in

[hooks/use-browser-renderer.ts:46](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/hooks/use-browser-renderer.ts#L46)

___

### render

• **render**: (`variables`: \{ `[key: string]`: `any`; `input`: `any` ; `playerId?`: `string`  }) => `Promise`\<``null`` \| `Blob`\>

Start rendering the video

#### Type declaration

▸ (`variables`): `Promise`\<``null`` \| `Blob`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `Object` |
| `variables.input` | `any` |
| `variables.playerId?` | `string` |

##### Returns

`Promise`\<``null`` \| `Blob`\>

#### Defined in

[hooks/use-browser-renderer.ts:44](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/hooks/use-browser-renderer.ts#L44)

___

### reset

• **reset**: () => `void`

Reset the renderer state

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[hooks/use-browser-renderer.ts:56](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/hooks/use-browser-renderer.ts#L56)

___

### videoBlob

• **videoBlob**: ``null`` \| `Blob`

The rendered video blob (available after rendering completes)

#### Defined in

[hooks/use-browser-renderer.ts:52](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/browser-render/src/hooks/use-browser-renderer.ts#L52)
