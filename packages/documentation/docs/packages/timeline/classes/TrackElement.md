[@twick/timeline](../README.md) / [Exports](../modules.md) / TrackElement

# Class: TrackElement

## Hierarchy

- **`TrackElement`**

  ↳ [`CaptionElement`](CaptionElement.md)

  ↳ [`RectElement`](RectElement.md)

  ↳ [`TextElement`](TextElement.md)

  ↳ [`ImageElement`](ImageElement.md)

  ↳ [`IconElement`](IconElement.md)

  ↳ [`AudioElement`](AudioElement.md)

  ↳ [`CircleElement`](CircleElement.md)

  ↳ [`VideoElement`](VideoElement.md)

## Table of contents

### Constructors

- [constructor](TrackElement.md#constructor)

### Properties

- [animation](TrackElement.md#animation)
- [e](TrackElement.md#e)
- [id](TrackElement.md#id)
- [name](TrackElement.md#name)
- [props](TrackElement.md#props)
- [s](TrackElement.md#s)
- [trackId](TrackElement.md#trackid)
- [type](TrackElement.md#type)

### Methods

- [accept](TrackElement.md#accept)
- [getAnimation](TrackElement.md#getanimation)
- [getDuration](TrackElement.md#getduration)
- [getEnd](TrackElement.md#getend)
- [getId](TrackElement.md#getid)
- [getName](TrackElement.md#getname)
- [getPosition](TrackElement.md#getposition)
- [getProps](TrackElement.md#getprops)
- [getStart](TrackElement.md#getstart)
- [getTrackId](TrackElement.md#gettrackid)
- [getType](TrackElement.md#gettype)
- [setAnimation](TrackElement.md#setanimation)
- [setEnd](TrackElement.md#setend)
- [setId](TrackElement.md#setid)
- [setName](TrackElement.md#setname)
- [setPosition](TrackElement.md#setposition)
- [setProps](TrackElement.md#setprops)
- [setStart](TrackElement.md#setstart)
- [setTrackId](TrackElement.md#settrackid)
- [setType](TrackElement.md#settype)

## Constructors

### constructor

• **new TrackElement**(`type`, `id?`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `id?` | `string` |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:16](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L16)

## Properties

### animation

• `Protected` `Optional` **animation**: [`ElementAnimation`](ElementAnimation.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L13)

___

### e

• `Protected` **e**: `number`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:10](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L10)

___

### id

• `Protected` **id**: `string`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L7)

___

### name

• `Protected` **name**: `string`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:12](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L12)

___

### props

• `Protected` **props**: `Record`\<`string`, `any`\>

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:14](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L14)

___

### s

• `Protected` **s**: `number`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L9)

___

### trackId

• `Protected` **trackId**: `string`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L11)

___

### type

• `Protected` **type**: `string`

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

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:25](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L25)

___

### getAnimation

▸ **getAnimation**(): `undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Returns

`undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:59](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L59)

___

### getDuration

▸ **getDuration**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:43](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L43)

___

### getEnd

▸ **getEnd**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:39](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L39)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:27](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L27)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:55](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L55)

___

### getPosition

▸ **getPosition**(): [`Position`](../modules.md#position)

#### Returns

[`Position`](../modules.md#position)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:63](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L63)

___

### getProps

▸ **getProps**(): `Record`\<`string`, `any`\>

#### Returns

`Record`\<`string`, `any`\>

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:51](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L51)

___

### getStart

▸ **getStart**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:35](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L35)

___

### getTrackId

▸ **getTrackId**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:47](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L47)

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:31](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L31)

___

### setAnimation

▸ **setAnimation**(`animation?`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `animation?` | [`ElementAnimation`](ElementAnimation.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L100)

___

### setEnd

▸ **setEnd**(`e`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `number` |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L85)

___

### setId

▸ **setId**(`id`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L70)

___

### setName

▸ **setName**(`name`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L95)

___

### setPosition

▸ **setPosition**(`position`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../modules.md#position) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L105)

___

### setProps

▸ **setProps**(`props`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Record`\<`string`, `any`\> |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:111](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L111)

___

### setStart

▸ **setStart**(`s`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `number` |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L80)

___

### setTrackId

▸ **setTrackId**(`trackId`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackId` | `string` |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L90)

___

### setType

▸ **setType**(`type`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L75)
