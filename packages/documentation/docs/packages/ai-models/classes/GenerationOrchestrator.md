[@twick/ai-models](../README.md) / [Exports](../modules.md) / GenerationOrchestrator

# Class: GenerationOrchestrator

## Table of contents

### Constructors

- [constructor](GenerationOrchestrator.md#constructor)

### Methods

- [createJob](GenerationOrchestrator.md#createjob)
- [dispatch](GenerationOrchestrator.md#dispatch)
- [getJob](GenerationOrchestrator.md#getjob)
- [waitForCompletion](GenerationOrchestrator.md#waitforcompletion)

## Constructors

### constructor

• **new GenerationOrchestrator**(`registry`, `jobStore?`, `options?`): [`GenerationOrchestrator`](GenerationOrchestrator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`ProviderRegistry`](ProviderRegistry.md) |
| `jobStore` | [`JobStore`](../interfaces/JobStore.md) |
| `options` | `OrchestratorOptions` |

#### Returns

[`GenerationOrchestrator`](GenerationOrchestrator.md)

#### Defined in

orchestrator.ts:30

## Methods

### createJob

▸ **createJob**(`input`): `Promise`\<[`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`CreateJobInput`](../interfaces/CreateJobInput.md) |

#### Returns

`Promise`\<[`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Defined in

orchestrator.ts:41

___

### dispatch

▸ **dispatch**(`jobId`): `Promise`\<[`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |

#### Returns

`Promise`\<[`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Defined in

orchestrator.ts:61

___

### getJob

▸ **getJob**(`jobId`): `Promise`\<``null`` \| [`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |

#### Returns

`Promise`\<``null`` \| [`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Defined in

orchestrator.ts:134

___

### waitForCompletion

▸ **waitForCompletion**(`jobId`, `options?`): `Promise`\<[`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |
| `options` | [`WaitForCompletionOptions`](../interfaces/WaitForCompletionOptions.md) |

#### Returns

`Promise`\<[`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Defined in

orchestrator.ts:94
