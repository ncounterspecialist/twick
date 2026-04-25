[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / IVideoGenerationService

# Interface: IVideoGenerationService

## Table of contents

### Properties

- [generateVideo](IVideoGenerationService.md#generatevideo)
- [getAvailableModels](IVideoGenerationService.md#getavailablemodels)
- [getRequestStatus](IVideoGenerationService.md#getrequeststatus)

## Properties

### generateVideo

• **generateVideo**: (`params`: [`GenerateVideoParams`](GenerateVideoParams.md)) => `Promise`\<`string`\>

Submit video generation job; returns requestId for polling

#### Type declaration

▸ (`params`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GenerateVideoParams`](GenerateVideoParams.md) |

##### Returns

`Promise`\<`string`\>

#### Defined in

[studio/src/types/generation.ts:50](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L50)

___

### getAvailableModels

• `Optional` **getAvailableModels**: () => `ModelInfo`[]

Available video models

#### Type declaration

▸ (): `ModelInfo`[]

##### Returns

`ModelInfo`[]

#### Defined in

[studio/src/types/generation.ts:54](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L54)

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

[studio/src/types/generation.ts:52](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L52)
