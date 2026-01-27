[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / StudioConfig

# Interface: StudioConfig

## Hierarchy

- `VideoEditorConfig`

  ↳ **`StudioConfig`**

## Table of contents

### Properties

- [exportVideo](StudioConfig.md#exportvideo)
- [loadProject](StudioConfig.md#loadproject)
- [saveProject](StudioConfig.md#saveproject)
- [subtitleGenerationService](StudioConfig.md#subtitlegenerationservice)

## Properties

### exportVideo

• `Optional` **exportVideo**: (`project`: `ProjectJSON`, `videoSettings`: [`VideoSettings`](VideoSettings.md)) => `Promise`\<[`Result`](Result.md)\>

#### Type declaration

▸ (`project`, `videoSettings`): `Promise`\<[`Result`](Result.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `project` | `ProjectJSON` |
| `videoSettings` | [`VideoSettings`](VideoSettings.md) |

##### Returns

`Promise`\<[`Result`](Result.md)\>

#### Defined in

[studio/src/types/index.ts:106](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L106)

___

### loadProject

• `Optional` **loadProject**: () => `Promise`\<`ProjectJSON`\>

#### Type declaration

▸ (): `Promise`\<`ProjectJSON`\>

##### Returns

`Promise`\<`ProjectJSON`\>

#### Defined in

[studio/src/types/index.ts:100](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L100)

___

### saveProject

• `Optional` **saveProject**: (`project`: `ProjectJSON`, `fileName`: `string`) => `Promise`\<[`Result`](Result.md)\>

#### Type declaration

▸ (`project`, `fileName`): `Promise`\<[`Result`](Result.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `project` | `ProjectJSON` |
| `fileName` | `string` |

##### Returns

`Promise`\<[`Result`](Result.md)\>

#### Defined in

[studio/src/types/index.ts:99](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L99)

___

### subtitleGenerationService

• `Optional` **subtitleGenerationService**: [`ISubtitleGenerationService`](ISubtitleGenerationService.md)

Subtitle generation service for polling-based async subtitle generation
Implement this in your application code to provide API endpoints

#### Defined in

[studio/src/types/index.ts:105](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L105)
