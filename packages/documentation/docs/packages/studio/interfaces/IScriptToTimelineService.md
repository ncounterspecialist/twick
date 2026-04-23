[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / IScriptToTimelineService

# Interface: IScriptToTimelineService

## Table of contents

### Properties

- [generateTimelineFromScript](IScriptToTimelineService.md#generatetimelinefromscript)
- [getAvailableModels](IScriptToTimelineService.md#getavailablemodels)
- [getRequestStatus](IScriptToTimelineService.md#getrequeststatus)

## Properties

### generateTimelineFromScript

• **generateTimelineFromScript**: (`params`: `ScriptToTimelineParams`) => `Promise`\<`string`\>

#### Type declaration

▸ (`params`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `ScriptToTimelineParams` |

##### Returns

`Promise`\<`string`\>

#### Defined in

[studio/src/types/generation.ts:91](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L91)

___

### getAvailableModels

• `Optional` **getAvailableModels**: () => `ModelInfo`[]

#### Type declaration

▸ (): `ModelInfo`[]

##### Returns

`ModelInfo`[]

#### Defined in

[studio/src/types/generation.ts:93](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L93)

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

[studio/src/types/generation.ts:92](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/generation.ts#L92)
