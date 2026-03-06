[@twick/ai-models](../README.md) / [Exports](../modules.md) / ProviderRegistry

# Class: ProviderRegistry

## Table of contents

### Constructors

- [constructor](ProviderRegistry.md#constructor)

### Methods

- [getAdapter](ProviderRegistry.md#getadapter)
- [getProviderConfig](ProviderRegistry.md#getproviderconfig)
- [hasAdapter](ProviderRegistry.md#hasadapter)
- [listProviders](ProviderRegistry.md#listproviders)
- [registerAdapter](ProviderRegistry.md#registeradapter)
- [setProviderConfig](ProviderRegistry.md#setproviderconfig)

## Constructors

### constructor

• **new ProviderRegistry**(): [`ProviderRegistry`](ProviderRegistry.md)

#### Returns

[`ProviderRegistry`](ProviderRegistry.md)

## Methods

### getAdapter

▸ **getAdapter**(`provider`): [`ProviderAdapter`](../interfaces/ProviderAdapter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`AIModelProvider`](../modules.md#aimodelprovider) |

#### Returns

[`ProviderAdapter`](../interfaces/ProviderAdapter.md)

#### Defined in

provider-registry.ts:18

___

### getProviderConfig

▸ **getProviderConfig**(`provider`): [`ProviderConfig`](../interfaces/ProviderConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`AIModelProvider`](../modules.md#aimodelprovider) |

#### Returns

[`ProviderConfig`](../interfaces/ProviderConfig.md)

#### Defined in

provider-registry.ts:26

___

### hasAdapter

▸ **hasAdapter**(`provider`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`AIModelProvider`](../modules.md#aimodelprovider) |

#### Returns

`boolean`

#### Defined in

provider-registry.ts:30

___

### listProviders

▸ **listProviders**(): [`AIModelProvider`](../modules.md#aimodelprovider)[]

#### Returns

[`AIModelProvider`](../modules.md#aimodelprovider)[]

#### Defined in

provider-registry.ts:34

___

### registerAdapter

▸ **registerAdapter**(`adapter`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapter` | [`ProviderAdapter`](../interfaces/ProviderAdapter.md) |

#### Returns

`void`

#### Defined in

provider-registry.ts:10

___

### setProviderConfig

▸ **setProviderConfig**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ProviderConfig`](../interfaces/ProviderConfig.md) |

#### Returns

`void`

#### Defined in

provider-registry.ts:14
