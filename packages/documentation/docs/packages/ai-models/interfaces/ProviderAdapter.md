[@twick/ai-models](../README.md) / [Exports](../modules.md) / ProviderAdapter

# Interface: ProviderAdapter

## Table of contents

### Properties

- [provider](ProviderAdapter.md#provider)
- [supportedTypes](ProviderAdapter.md#supportedtypes)

### Methods

- [cancelJob](ProviderAdapter.md#canceljob)
- [getJobStatus](ProviderAdapter.md#getjobstatus)
- [startJob](ProviderAdapter.md#startjob)

## Properties

### provider

• `Readonly` **provider**: [`AIModelProvider`](../modules.md#aimodelprovider)

#### Defined in

provider-adapter.ts:11

___

### supportedTypes

• `Readonly` **supportedTypes**: readonly [`GenerationType`](../modules.md#generationtype)[]

#### Defined in

provider-adapter.ts:12

## Methods

### cancelJob

▸ **cancelJob**(`providerJobId`, `config`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerJobId` | `string` |
| `config` | [`ProviderConfig`](ProviderConfig.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

provider-adapter.ts:21

___

### getJobStatus

▸ **getJobStatus**(`providerJobId`, `config`): `Promise`\<[`ProviderJobStatusResponse`](ProviderJobStatusResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerJobId` | `string` |
| `config` | [`ProviderConfig`](ProviderConfig.md) |

#### Returns

`Promise`\<[`ProviderJobStatusResponse`](ProviderJobStatusResponse.md)\>

#### Defined in

provider-adapter.ts:17

___

### startJob

▸ **startJob**(`request`, `config`): `Promise`\<[`ProviderStartJobResponse`](ProviderStartJobResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`ProviderStartJobRequest`](ProviderStartJobRequest.md) |
| `config` | [`ProviderConfig`](ProviderConfig.md) |

#### Returns

`Promise`\<[`ProviderStartJobResponse`](ProviderStartJobResponse.md)\>

#### Defined in

provider-adapter.ts:13
