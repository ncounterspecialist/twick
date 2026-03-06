[@twick/ai-models](../README.md) / [Exports](../modules.md) / InMemoryJobStore

# Class: InMemoryJobStore

## Implements

- [`JobStore`](../interfaces/JobStore.md)

## Table of contents

### Constructors

- [constructor](InMemoryJobStore.md#constructor)

### Methods

- [create](InMemoryJobStore.md#create)
- [get](InMemoryJobStore.md#get)
- [listByStatus](InMemoryJobStore.md#listbystatus)
- [update](InMemoryJobStore.md#update)

## Constructors

### constructor

• **new InMemoryJobStore**(): [`InMemoryJobStore`](InMemoryJobStore.md)

#### Returns

[`InMemoryJobStore`](InMemoryJobStore.md)

## Methods

### create

▸ **create**(`job`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | [`GenerationJob`](../interfaces/GenerationJob.md) |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[JobStore](../interfaces/JobStore.md).[create](../interfaces/JobStore.md#create)

#### Defined in

job-store.ts:13

___

### get

▸ **get**(`jobId`): `Promise`\<``null`` \| [`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |

#### Returns

`Promise`\<``null`` \| [`GenerationJob`](../interfaces/GenerationJob.md)\>

#### Implementation of

[JobStore](../interfaces/JobStore.md).[get](../interfaces/JobStore.md#get)

#### Defined in

job-store.ts:21

___

### listByStatus

▸ **listByStatus**(`status`): `Promise`\<[`GenerationJob`](../interfaces/GenerationJob.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | [`JobStatus`](../modules.md#jobstatus) |

#### Returns

`Promise`\<[`GenerationJob`](../interfaces/GenerationJob.md)[]\>

#### Implementation of

[JobStore](../interfaces/JobStore.md).[listByStatus](../interfaces/JobStore.md#listbystatus)

#### Defined in

job-store.ts:25

___

### update

▸ **update**(`job`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | [`GenerationJob`](../interfaces/GenerationJob.md) |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[JobStore](../interfaces/JobStore.md).[update](../interfaces/JobStore.md#update)

#### Defined in

job-store.ts:17
