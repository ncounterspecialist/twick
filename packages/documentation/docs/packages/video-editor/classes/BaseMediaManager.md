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
- [getItem](BaseMediaManager.md#getitem)
- [getItems](BaseMediaManager.md#getitems)
- [updateItem](BaseMediaManager.md#updateitem)
- [updateItems](BaseMediaManager.md#updateitems)
- [deleteItem](BaseMediaManager.md#deleteitem)
- [deleteItems](BaseMediaManager.md#deleteitems)
- [search](BaseMediaManager.md#search)
- [getTotalCount](BaseMediaManager.md#gettotalcount)

## Constructors

### constructor

• **new BaseMediaManager**(): [`BaseMediaManager`](BaseMediaManager.md)

#### Returns

[`BaseMediaManager`](BaseMediaManager.md)

## Methods

### addItem

▸ **addItem**(`item`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `Omit`\<[`MediaItem`](../interfaces/MediaItem.md), ``"id"``\> |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:6](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L6)

___

### addItems

▸ **addItems**(`items`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Omit`\<[`MediaItem`](../interfaces/MediaItem.md), ``"id"``\>[] |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:7](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L7)

___

### getItem

▸ **getItem**(`id`): `Promise`\<`undefined` \| [`MediaItem`](../interfaces/MediaItem.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`undefined` \| [`MediaItem`](../interfaces/MediaItem.md)\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:8](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L8)

___

### getItems

▸ **getItems**(`options?`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`PaginationOptions`](../interfaces/PaginationOptions.md) |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:9](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L9)

___

### updateItem

▸ **updateItem**(`id`, `updates`): `Promise`\<`undefined` \| [`MediaItem`](../interfaces/MediaItem.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `updates` | `Partial`\<[`MediaItem`](../interfaces/MediaItem.md)\> |

#### Returns

`Promise`\<`undefined` \| [`MediaItem`](../interfaces/MediaItem.md)\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:10](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L10)

___

### updateItems

▸ **updateItems**(`updates`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `updates` | \{ `id`: `string` ; `updates`: `Partial`\<[`MediaItem`](../interfaces/MediaItem.md)\>  }[] |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:11](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L11)

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

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:12](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L12)

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

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:13](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L13)

___

### search

▸ **search**(`options`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SearchOptions`](../interfaces/SearchOptions.md) |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:14](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L14)

___

### getTotalCount

▸ **getTotalCount**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/base-media-manager.ts:15](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/helpers/media-manager/base-media-manager.ts#L15)
