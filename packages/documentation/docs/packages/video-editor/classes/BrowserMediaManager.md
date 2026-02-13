# Class: BrowserMediaManager

## Hierarchy

- [`BaseMediaManager`](BaseMediaManager.md)

  ↳ **`BrowserMediaManager`**

## Table of contents

### Constructors

- [constructor](BrowserMediaManager.md#constructor)

### Methods

- [addItem](BrowserMediaManager.md#additem)
- [addItems](BrowserMediaManager.md#additems)
- [getItem](BrowserMediaManager.md#getitem)
- [getItems](BrowserMediaManager.md#getitems)
- [updateItem](BrowserMediaManager.md#updateitem)
- [updateItems](BrowserMediaManager.md#updateitems)
- [deleteItem](BrowserMediaManager.md#deleteitem)
- [deleteItems](BrowserMediaManager.md#deleteitems)
- [search](BrowserMediaManager.md#search)
- [getTotalCount](BrowserMediaManager.md#gettotalcount)

## Constructors

### constructor

• **new BrowserMediaManager**(): [`BrowserMediaManager`](BrowserMediaManager.md)

#### Returns

[`BrowserMediaManager`](BrowserMediaManager.md)

#### Inherited from

[BaseMediaManager](BaseMediaManager.md).[constructor](BaseMediaManager.md#constructor)

## Methods

### addItem

▸ **addItem**(`item`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `Omit`\<[`MediaItem`](../interfaces/MediaItem.md), ``"id"``\> |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[addItem](BaseMediaManager.md#additem)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:41](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L41)

___

### addItems

▸ **addItems**(`items`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Omit`\<[`MediaItem`](../interfaces/MediaItem.md), ``"id"``\>[] |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[addItems](BaseMediaManager.md#additems)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:56](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L56)

___

### getItem

▸ **getItem**(`id`): `Promise`\<`undefined` \| [`MediaItem`](../interfaces/MediaItem.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`undefined` \| [`MediaItem`](../interfaces/MediaItem.md)\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[getItem](BaseMediaManager.md#getitem)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:76](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L76)

___

### getItems

▸ **getItems**(`options?`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`PaginationOptions`](../interfaces/PaginationOptions.md) |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[getItems](BaseMediaManager.md#getitems)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:92](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L92)

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

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[updateItem](BaseMediaManager.md#updateitem)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:125](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L125)

___

### updateItems

▸ **updateItems**(`updates`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `updates` | \{ `id`: `string` ; `updates`: `Partial`\<[`MediaItem`](../interfaces/MediaItem.md)\>  }[] |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[updateItems](BaseMediaManager.md#updateitems)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:139](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L139)

___

### deleteItem

▸ **deleteItem**(`id`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[deleteItem](BaseMediaManager.md#deleteitem)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:161](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L161)

___

### deleteItems

▸ **deleteItems**(`ids`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[deleteItems](BaseMediaManager.md#deleteitems)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:170](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L170)

___

### search

▸ **search**(`options`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SearchOptions`](../interfaces/SearchOptions.md) |

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)[]\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[search](BaseMediaManager.md#search)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:179](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L179)

___

### getTotalCount

▸ **getTotalCount**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[getTotalCount](BaseMediaManager.md#gettotalcount)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:210](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L210)
