[@twick/video-editor](../README.md) / [Exports](../modules.md) / BaseMediaManager

# Class: BaseMediaManager

## Hierarchy

- **`BaseMediaManager`**

  ↳ [`BrowserMediaManager`](BrowserMediaManager.md)

## Table of contents

### Constructors

- [constructor](BaseMediaManager.md#constructor)

### Methods

- [addItem](BaseMediaManager.md#additem)
- [addItems](BaseMediaManager.md#additems)
- [deleteItem](BaseMediaManager.md#deleteitem)
- [deleteItems](BaseMediaManager.md#deleteitems)
- [getItem](BaseMediaManager.md#getitem)
- [getItems](BaseMediaManager.md#getitems)
- [getTotalCount](BaseMediaManager.md#gettotalcount)
- [search](BaseMediaManager.md#search)
- [updateItem](BaseMediaManager.md#updateitem)
- [updateItems](BaseMediaManager.md#updateitems)

## Constructors

### constructor

• **new BaseMediaManager**(): [`BaseMediaManager`](BaseMediaManager.md)

#### Returns

[`BaseMediaManager`](BaseMediaManager.md)

## Methods

### addItem

▸ **addItem**(`item`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `Omit`\<[`MediaItem`](../modules.md#mediaitem), ``"id"``\> |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:6](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L6)

___

### addItems

▸ **addItems**(`items`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Omit`\<[`MediaItem`](../modules.md#mediaitem), ``"id"``\>[] |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L7)

___

### deleteItem

▸ **deleteItem**(`id`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:12](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L12)

___

### deleteItems

▸ **deleteItems**(`ids`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L13)

___

### getItem

▸ **getItem**(`id`): `Promise`\<`undefined` \| [`MediaItem`](../modules.md#mediaitem)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`undefined` \| [`MediaItem`](../modules.md#mediaitem)\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:8](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L8)

___

### getItems

▸ **getItems**(`options?`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`PaginationOptions`](../modules.md#paginationoptions) |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L9)

___

### getTotalCount

▸ **getTotalCount**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:15](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L15)

___

### search

▸ **search**(`options`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SearchOptions`](../modules.md#searchoptions) |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:14](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L14)

___

### updateItem

▸ **updateItem**(`id`, `updates`): `Promise`\<`undefined` \| [`MediaItem`](../modules.md#mediaitem)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `updates` | `Partial`\<[`MediaItem`](../modules.md#mediaitem)\> |

#### Returns

`Promise`\<`undefined` \| [`MediaItem`](../modules.md#mediaitem)\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:10](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L10)

___

### updateItems

▸ **updateItems**(`updates`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `updates` | \{ `id`: `string` ; `updates`: `Partial`\<[`MediaItem`](../modules.md#mediaitem)\>  }[] |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L11)
