[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / IImageGenerationService

# Interface: IImageGenerationService

## Table of contents

### Properties

- [generateImage](IImageGenerationService.md#generateimage)
- [getAvailableModels](IImageGenerationService.md#getavailablemodels)
- [getRequestStatus](IImageGenerationService.md#getrequeststatus)

## Properties

### generateImage

• **generateImage**: (`params`: [`GenerateImageParams`](GenerateImageParams.md)) => `Promise`\<`string`\>

Submit image generation job; returns requestId for polling

#### Type declaration

▸ (`params`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GenerateImageParams`](GenerateImageParams.md) |

##### Returns

`Promise`\<`string`\>

#### Defined in

[studio/src/types/generation.ts:41](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L41)

___

### getAvailableModels

• `Optional` **getAvailableModels**: () => `ModelInfo`[]

Available image models

#### Type declaration

▸ (): `ModelInfo`[]

##### Returns

`ModelInfo`[]

#### Defined in

[studio/src/types/generation.ts:45](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L45)

___

### getRequestStatus

• **getRequestStatus**: (`reqId`: `string`) => `Promise`\<`IGenerationPollingResponse`\>

Poll status of generation job

#### Type declaration

▸ (`reqId`): `Promise`\<`IGenerationPollingResponse`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `reqId` | `string` |

##### Returns

`Promise`\<`IGenerationPollingResponse`\>

#### Defined in

[studio/src/types/generation.ts:43](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L43)
