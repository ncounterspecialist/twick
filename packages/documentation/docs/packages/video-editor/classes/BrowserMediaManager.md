[@twick/video-editor](../README.md) / [Exports](../modules.md) / BrowserMediaManager

# Class: BrowserMediaManager

## Hierarchy

- [`BaseMediaManager`](BaseMediaManager.md)

  ↳ **`BrowserMediaManager`**

## Table of contents

### Constructors

- [constructor](BrowserMediaManager.md#constructor)

### Properties

- [db](BrowserMediaManager.md#db)
- [dbName](BrowserMediaManager.md#dbname)
- [storeName](BrowserMediaManager.md#storename)

### Methods

- [addItem](BrowserMediaManager.md#additem)
- [addItems](BrowserMediaManager.md#additems)
- [convertArrayBufferToBlob](BrowserMediaManager.md#convertarraybuffertoblob)
- [deleteItem](BrowserMediaManager.md#deleteitem)
- [deleteItems](BrowserMediaManager.md#deleteitems)
- [getItem](BrowserMediaManager.md#getitem)
- [getItems](BrowserMediaManager.md#getitems)
- [getStore](BrowserMediaManager.md#getstore)
- [getTotalCount](BrowserMediaManager.md#gettotalcount)
- [initDB](BrowserMediaManager.md#initdb)
- [search](BrowserMediaManager.md#search)
- [updateItem](BrowserMediaManager.md#updateitem)
- [updateItems](BrowserMediaManager.md#updateitems)

## Constructors

### constructor

• **new BrowserMediaManager**(): [`BrowserMediaManager`](BrowserMediaManager.md)

#### Returns

[`BrowserMediaManager`](BrowserMediaManager.md)

#### Inherited from

[BaseMediaManager](BaseMediaManager.md).[constructor](BaseMediaManager.md#constructor)

## Properties

### db

• `Private` **db**: ``null`` \| `IDBDatabase` = `null`

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L7)

___

### dbName

• `Private` **dbName**: `string` = `'mediaStore'`

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:5](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L5)

___

### storeName

• `Private` **storeName**: `string` = `'mediaItems'`

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:6](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L6)

## Methods

### addItem

▸ **addItem**(`item`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `Omit`\<[`MediaItem`](../modules.md#mediaitem), ``"id"``\> |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[addItem](BaseMediaManager.md#additem)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:41](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L41)

___

### addItems

▸ **addItems**(`items`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Omit`\<[`MediaItem`](../modules.md#mediaitem), ``"id"``\>[] |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[addItems](BaseMediaManager.md#additems)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:56](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L56)

___

### convertArrayBufferToBlob

▸ **convertArrayBufferToBlob**(`arrayBuffer`, `type`): `Promise`\<`Blob`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrayBuffer` | `ArrayBuffer` |
| `type` | `string` |

#### Returns

`Promise`\<`Blob`\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:37](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L37)

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

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:161](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L161)

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

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:170](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L170)

___

### getItem

▸ **getItem**(`id`): `Promise`\<`undefined` \| [`MediaItem`](../modules.md#mediaitem)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`undefined` \| [`MediaItem`](../modules.md#mediaitem)\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[getItem](BaseMediaManager.md#getitem)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:76](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L76)

___

### getItems

▸ **getItems**(`options?`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`PaginationOptions`](../modules.md#paginationoptions) |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[getItems](BaseMediaManager.md#getitems)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:92](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L92)

___

### getStore

▸ **getStore**(`mode?`): `Promise`\<`IDBObjectStore`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mode` | `IDBTransactionMode` | `'readonly'` |

#### Returns

`Promise`\<`IDBObjectStore`\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:31](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L31)

___

### getTotalCount

▸ **getTotalCount**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[getTotalCount](BaseMediaManager.md#gettotalcount)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:210](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L210)

___

### initDB

▸ **initDB**(): `Promise`\<`IDBDatabase`\>

#### Returns

`Promise`\<`IDBDatabase`\>

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L9)

___

### search

▸ **search**(`options`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SearchOptions`](../modules.md#searchoptions) |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[search](BaseMediaManager.md#search)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:179](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L179)

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

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[updateItem](BaseMediaManager.md#updateitem)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:125](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L125)

___

### updateItems

▸ **updateItems**(`updates`): `Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `updates` | \{ `id`: `string` ; `updates`: `Partial`\<[`MediaItem`](../modules.md#mediaitem)\>  }[] |

#### Returns

`Promise`\<[`MediaItem`](../modules.md#mediaitem)[]\>

#### Overrides

[BaseMediaManager](BaseMediaManager.md).[updateItems](BaseMediaManager.md#updateitems)

#### Defined in

[packages/video-editor/src/helpers/media-manager/browser-media-manager.ts:139](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/media-manager/browser-media-manager.ts#L139)
