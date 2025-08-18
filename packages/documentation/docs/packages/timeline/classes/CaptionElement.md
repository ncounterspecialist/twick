[@twick/timeline](../README.md) / [Exports](../modules.md) / CaptionElement

# Class: CaptionElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`CaptionElement`**

## Table of contents

### Constructors

- [constructor](CaptionElement.md#constructor)

### Properties

- [animation](CaptionElement.md#animation)
- [e](CaptionElement.md#e)
- [id](CaptionElement.md#id)
- [name](CaptionElement.md#name)
- [props](CaptionElement.md#props)
- [s](CaptionElement.md#s)
- [t](CaptionElement.md#t)
- [trackId](CaptionElement.md#trackid)
- [type](CaptionElement.md#type)

### Methods

- [accept](CaptionElement.md#accept)
- [getAnimation](CaptionElement.md#getanimation)
- [getDuration](CaptionElement.md#getduration)
- [getEnd](CaptionElement.md#getend)
- [getId](CaptionElement.md#getid)
- [getName](CaptionElement.md#getname)
- [getPosition](CaptionElement.md#getposition)
- [getProps](CaptionElement.md#getprops)
- [getStart](CaptionElement.md#getstart)
- [getText](CaptionElement.md#gettext)
- [getTrackId](CaptionElement.md#gettrackid)
- [getType](CaptionElement.md#gettype)
- [setAnimation](CaptionElement.md#setanimation)
- [setEnd](CaptionElement.md#setend)
- [setId](CaptionElement.md#setid)
- [setName](CaptionElement.md#setname)
- [setPosition](CaptionElement.md#setposition)
- [setProps](CaptionElement.md#setprops)
- [setStart](CaptionElement.md#setstart)
- [setText](CaptionElement.md#settext)
- [setTrackId](CaptionElement.md#settrackid)
- [setType](CaptionElement.md#settype)

## Constructors

### constructor

• **new CaptionElement**(`t`, `start`, `end`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `string` |
| `start` | `number` |
| `end` | `number` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[packages/timeline/src/core/elements/caption.element.ts:8](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/caption.element.ts#L8)

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

• `Protected` **props**: `Record`\<`string`, `any`\>

#### Inherited from

[TrackElement](TrackElement.md).[props](TrackElement.md#props)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:14](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L14)

___

### s

• `Protected` **s**: `number`

#### Inherited from

[TrackElement](TrackElement.md).[s](TrackElement.md#s)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L9)

___

### t

• `Protected` **t**: `string`

#### Defined in

[packages/timeline/src/core/elements/caption.element.ts:6](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/caption.element.ts#L6)

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

[packages/timeline/src/core/elements/caption.element.ts:24](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/caption.element.ts#L24)

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

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/caption.element.ts:15](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/caption.element.ts#L15)

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

▸ **setAnimation**(`animation?`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `animation?` | [`ElementAnimation`](ElementAnimation.md) |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setAnimation](TrackElement.md#setanimation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L100)

___

### setEnd

▸ **setEnd**(`e`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `number` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setEnd](TrackElement.md#setend)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L85)

___

### setId

▸ **setId**(`id`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setId](TrackElement.md#setid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L70)

___

### setName

▸ **setName**(`name`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setName](TrackElement.md#setname)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L95)

___

### setPosition

▸ **setPosition**(`position`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../modules.md#position) |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L105)

___

### setProps

▸ **setProps**(`props`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Record`\<`string`, `any`\> |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setProps](TrackElement.md#setprops)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:111](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L111)

___

### setStart

▸ **setStart**(`s`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `number` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setStart](TrackElement.md#setstart)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L80)

___

### setText

▸ **setText**(`t`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `string` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Defined in

[packages/timeline/src/core/elements/caption.element.ts:19](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/caption.element.ts#L19)

___

### setTrackId

▸ **setTrackId**(`trackId`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackId` | `string` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setTrackId](TrackElement.md#settrackid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L90)

___

### setType

▸ **setType**(`type`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setType](TrackElement.md#settype)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L75)
