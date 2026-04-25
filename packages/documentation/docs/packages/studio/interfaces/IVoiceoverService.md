[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / IVoiceoverService

# Interface: IVoiceoverService

## Table of contents

### Properties

- [generateVoiceover](IVoiceoverService.md#generatevoiceover)
- [getAvailableModels](IVoiceoverService.md#getavailablemodels)
- [getRequestStatus](IVoiceoverService.md#getrequeststatus)

## Properties

### generateVoiceover

• **generateVoiceover**: (`params`: `GenerateVoiceoverParams`) => `Promise`\<`string`\>

#### Type declaration

▸ (`params`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GenerateVoiceoverParams` |

##### Returns

`Promise`\<`string`\>

#### Defined in

[studio/src/types/generation.ts:66](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L66)

___

### getAvailableModels

• `Optional` **getAvailableModels**: () => `ModelInfo`[]

#### Type declaration

▸ (): `ModelInfo`[]

##### Returns

`ModelInfo`[]

#### Defined in

[studio/src/types/generation.ts:68](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L68)

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

[studio/src/types/generation.ts:67](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L67)
