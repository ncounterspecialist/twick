[@twick/timeline](../README.md) / [Exports](../modules.md) / RectElement

# Class: RectElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`RectElement`**

## Table of contents

### Constructors

- [constructor](RectElement.md#constructor)

### Properties

- [animation](RectElement.md#animation)
- [e](RectElement.md#e)
- [id](RectElement.md#id)
- [name](RectElement.md#name)
- [props](RectElement.md#props)
- [s](RectElement.md#s)
- [trackId](RectElement.md#trackid)
- [type](RectElement.md#type)

### Methods

- [accept](RectElement.md#accept)
- [getAnimation](RectElement.md#getanimation)
- [getDuration](RectElement.md#getduration)
- [getEnd](RectElement.md#getend)
- [getId](RectElement.md#getid)
- [getName](RectElement.md#getname)
- [getPosition](RectElement.md#getposition)
- [getProps](RectElement.md#getprops)
- [getStart](RectElement.md#getstart)
- [getTrackId](RectElement.md#gettrackid)
- [getType](RectElement.md#gettype)
- [setAnimation](RectElement.md#setanimation)
- [setEnd](RectElement.md#setend)
- [setFill](RectElement.md#setfill)
- [setId](RectElement.md#setid)
- [setName](RectElement.md#setname)
- [setPosition](RectElement.md#setposition)
- [setProps](RectElement.md#setprops)
- [setSize](RectElement.md#setsize)
- [setStart](RectElement.md#setstart)
- [setTrackId](RectElement.md#settrackid)
- [setType](RectElement.md#settype)

## Constructors

### constructor

• **new RectElement**(`fill`, `size`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fill` | `string` |
| `size` | [`Size`](../modules.md#size) |

#### Returns

[`RectElement`](RectElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[packages/timeline/src/core/elements/rect.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/rect.element.ts#L9)

## Properties

### animation

• `Protected` `Optional` **animation**: [`ElementAnimation`](ElementAnimation.md)

#### Inherited from

[TrackElement](TrackElement.md).[animation](TrackElement.md#animation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L13)

___

### e

• `Protected` **e**: `number`

#### Inherited from

[TrackElement](TrackElement.md).[e](TrackElement.md#e)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:10](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L10)

___

### id

• `Protected` **id**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[id](TrackElement.md#id)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L7)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[name](TrackElement.md#name)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:12](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L12)

___

### props

• `Protected` **props**: [`RectProps`](../modules.md#rectprops)

#### Overrides

[TrackElement](TrackElement.md).[props](TrackElement.md#props)

#### Defined in

[packages/timeline/src/core/elements/rect.element.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/rect.element.ts#L7)

___

### s

• `Protected` **s**: `number`

#### Inherited from

[TrackElement](TrackElement.md).[s](TrackElement.md#s)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L9)

___

### trackId

• `Protected` **trackId**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[trackId](TrackElement.md#trackid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L11)

___

### type

• `Protected` **type**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[type](TrackElement.md#type)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:8](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L8)

## Methods

### accept

▸ **accept**\<`T`\>(`visitor`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `visitor` | [`ElementVisitor`](../interfaces/ElementVisitor.md)\<`T`\> |

#### Returns

`T`

#### Overrides

[TrackElement](TrackElement.md).[accept](TrackElement.md#accept)

#### Defined in

[packages/timeline/src/core/elements/rect.element.ts:29](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/rect.element.ts#L29)

___

### getAnimation

▸ **getAnimation**(): `undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Returns

`undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Inherited from

[TrackElement](TrackElement.md).[getAnimation](TrackElement.md#getanimation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:59](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L59)

___

### getDuration

▸ **getDuration**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getDuration](TrackElement.md#getduration)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:43](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L43)

___

### getEnd

▸ **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getEnd](TrackElement.md#getend)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:39](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L39)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getId](TrackElement.md#getid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:27](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L27)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getName](TrackElement.md#getname)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:55](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L55)

___

### getPosition

▸ **getPosition**(): [`Position`](../modules.md#position)

#### Returns

[`Position`](../modules.md#position)

#### Inherited from

[TrackElement](TrackElement.md).[getPosition](TrackElement.md#getposition)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:63](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L63)

___

### getProps

▸ **getProps**(): `Record`\<`string`, `any`\>

#### Returns

`Record`\<`string`, `any`\>

#### Inherited from

[TrackElement](TrackElement.md).[getProps](TrackElement.md#getprops)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:51](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L51)

___

### getStart

▸ **getStart**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getStart](TrackElement.md#getstart)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:35](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L35)

___

### getTrackId

▸ **getTrackId**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getTrackId](TrackElement.md#gettrackid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:47](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L47)

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getType](TrackElement.md#gettype)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:31](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L31)

___

### setAnimation

▸ **setAnimation**(`animation?`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `animation?` | [`ElementAnimation`](ElementAnimation.md) |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setAnimation](TrackElement.md#setanimation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L100)

___

### setEnd

▸ **setEnd**(`e`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `number` |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setEnd](TrackElement.md#setend)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L85)

___

### setFill

▸ **setFill**(`fill`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fill` | `string` |

#### Returns

[`RectElement`](RectElement.md)

#### Defined in

[packages/timeline/src/core/elements/rect.element.ts:18](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/rect.element.ts#L18)

___

### setId

▸ **setId**(`id`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setId](TrackElement.md#setid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L70)

___

### setName

▸ **setName**(`name`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setName](TrackElement.md#setname)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L95)

___

### setPosition

▸ **setPosition**(`position`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../modules.md#position) |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L105)

___

### setProps

▸ **setProps**(`props`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Record`\<`string`, `any`\> |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setProps](TrackElement.md#setprops)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:111](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L111)

___

### setSize

▸ **setSize**(`size`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`Size`](../modules.md#size) |

#### Returns

[`RectElement`](RectElement.md)

#### Defined in

[packages/timeline/src/core/elements/rect.element.ts:23](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/rect.element.ts#L23)

___

### setStart

▸ **setStart**(`s`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `number` |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setStart](TrackElement.md#setstart)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L80)

___

### setTrackId

▸ **setTrackId**(`trackId`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackId` | `string` |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setTrackId](TrackElement.md#settrackid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L90)

___

### setType

▸ **setType**(`type`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setType](TrackElement.md#settype)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L75)
