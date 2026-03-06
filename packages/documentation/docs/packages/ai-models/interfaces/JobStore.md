[@twick/ai-models](../README.md) / [Exports](../modules.md) / JobStore

# Interface: JobStore

## Implemented by

- [`InMemoryJobStore`](../classes/InMemoryJobStore.md)

## Table of contents

### Methods

- [create](JobStore.md#create)
- [get](JobStore.md#get)
- [listByStatus](JobStore.md#listbystatus)
- [update](JobStore.md#update)

## Methods

### create

▸ **create**(`job`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | [`GenerationJob`](GenerationJob.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

job-store.ts:4

___

### get

▸ **get**(`jobId`): `Promise`\<``null`` \| [`GenerationJob`](GenerationJob.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |

#### Returns

`Promise`\<``null`` \| [`GenerationJob`](GenerationJob.md)\>

#### Defined in

job-store.ts:6

___

### listByStatus

▸ **listByStatus**(`status`): `Promise`\<[`GenerationJob`](GenerationJob.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | [`JobStatus`](../modules.md#jobstatus) |

#### Returns

`Promise`\<[`GenerationJob`](GenerationJob.md)[]\>

#### Defined in

job-store.ts:7

___

### update

▸ **update**(`job`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | [`GenerationJob`](GenerationJob.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

job-store.ts:5
