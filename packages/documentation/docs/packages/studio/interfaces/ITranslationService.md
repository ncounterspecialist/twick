[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / ITranslationService

# Interface: ITranslationService

## Table of contents

### Properties

- [getAvailableModels](ITranslationService.md#getavailablemodels)
- [getRequestStatus](ITranslationService.md#getrequeststatus)
- [translateCaptions](ITranslationService.md#translatecaptions)

## Properties

### getAvailableModels

• `Optional` **getAvailableModels**: () => `ModelInfo`[]

#### Type declaration

▸ (): `ModelInfo`[]

##### Returns

`ModelInfo`[]

#### Defined in

[studio/src/types/generation.ts:81](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L81)

___

### getRequestStatus

• **getRequestStatus**: (`reqId`: `string`) => `Promise`\<`IGenerationPollingResponse`\>

#### Type declaration

▸ (`reqId`): `Promise`\<`IGenerationPollingResponse`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `reqId` | `string` |

##### Returns

`Promise`\<`IGenerationPollingResponse`\>

#### Defined in

[studio/src/types/generation.ts:80](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L80)

___

### translateCaptions

• **translateCaptions**: (`params`: `TranslateCaptionsParams`) => `Promise`\<`string`\>

#### Type declaration

▸ (`params`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `TranslateCaptionsParams` |

##### Returns

`Promise`\<`string`\>

#### Defined in

[studio/src/types/generation.ts:79](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L79)
