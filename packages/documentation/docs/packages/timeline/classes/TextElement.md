[@twick/timeline](../README.md) / [Exports](../modules.md) / TextElement

# Class: TextElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`TextElement`**

## Table of contents

### Constructors

- [constructor](TextElement.md#constructor)

### Properties

- [animation](TextElement.md#animation)
- [e](TextElement.md#e)
- [id](TextElement.md#id)
- [name](TextElement.md#name)
- [props](TextElement.md#props)
- [s](TextElement.md#s)
- [textEffect](TextElement.md#texteffect)
- [trackId](TextElement.md#trackid)
- [type](TextElement.md#type)

### Methods

- [accept](TextElement.md#accept)
- [getAnimation](TextElement.md#getanimation)
- [getDuration](TextElement.md#getduration)
- [getEnd](TextElement.md#getend)
- [getId](TextElement.md#getid)
- [getLineWidth](TextElement.md#getlinewidth)
- [getName](TextElement.md#getname)
- [getPosition](TextElement.md#getposition)
- [getProps](TextElement.md#getprops)
- [getStart](TextElement.md#getstart)
- [getStrokeColor](TextElement.md#getstrokecolor)
- [getText](TextElement.md#gettext)
- [getTextEffect](TextElement.md#gettexteffect)
- [getTrackId](TextElement.md#gettrackid)
- [getType](TextElement.md#gettype)
- [setAnimation](TextElement.md#setanimation)
- [setEnd](TextElement.md#setend)
- [setFill](TextElement.md#setfill)
- [setFontFamily](TextElement.md#setfontfamily)
- [setFontSize](TextElement.md#setfontsize)
- [setFontStyle](TextElement.md#setfontstyle)
- [setFontWeight](TextElement.md#setfontweight)
- [setId](TextElement.md#setid)
- [setLineWidth](TextElement.md#setlinewidth)
- [setName](TextElement.md#setname)
- [setPosition](TextElement.md#setposition)
- [setProps](TextElement.md#setprops)
- [setRotation](TextElement.md#setrotation)
- [setStart](TextElement.md#setstart)
- [setStrokeColor](TextElement.md#setstrokecolor)
- [setText](TextElement.md#settext)
- [setTextAlign](TextElement.md#settextalign)
- [setTextEffect](TextElement.md#settexteffect)
- [setTrackId](TextElement.md#settrackid)
- [setType](TextElement.md#settype)

## Constructors

### constructor

• **new TextElement**(`text`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

[`TextElement`](TextElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L11)

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

• `Protected` **props**: [`TextProps`](../modules.md#textprops)

#### Overrides

[TrackElement](TrackElement.md).[props](TrackElement.md#props)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L9)

___

### s

• `Protected` **s**: `number`

#### Inherited from

[TrackElement](TrackElement.md).[s](TrackElement.md#s)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L9)

___

### textEffect

• `Protected` `Optional` **textEffect**: [`ElementTextEffect`](ElementTextEffect.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:8](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L8)

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

[packages/timeline/src/core/elements/text.element.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L90)

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

### getLineWidth

▸ **getLineWidth**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:31](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L31)

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

### getStrokeColor

▸ **getStrokeColor**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:27](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L27)

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:23](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L23)

___

### getTextEffect

▸ **getTextEffect**(): `undefined` \| [`ElementTextEffect`](ElementTextEffect.md)

#### Returns

`undefined` \| [`ElementTextEffect`](ElementTextEffect.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:19](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L19)

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

▸ **setAnimation**(`animation?`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `animation?` | [`ElementAnimation`](ElementAnimation.md) |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setAnimation](TrackElement.md#setanimation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L100)

___

### setEnd

▸ **setEnd**(`e`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `number` |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setEnd](TrackElement.md#setend)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L85)

___

### setFill

▸ **setFill**(`fill`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fill` | `string` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:40](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L40)

___

### setFontFamily

▸ **setFontFamily**(`fontFamily`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fontFamily` | `string` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:55](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L55)

___

### setFontSize

▸ **setFontSize**(`fontSize`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fontSize` | `number` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:50](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L50)

___

### setFontStyle

▸ **setFontStyle**(`fontStyle`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fontStyle` | ``"normal"`` \| ``"italic"`` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:65](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L65)

___

### setFontWeight

▸ **setFontWeight**(`fontWeight`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fontWeight` | `number` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:60](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L60)

___

### setId

▸ **setId**(`id`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setId](TrackElement.md#setid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L70)

___

### setLineWidth

▸ **setLineWidth**(`lineWidth`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lineWidth` | `number` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L85)

___

### setName

▸ **setName**(`name`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setName](TrackElement.md#setname)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L95)

___

### setPosition

▸ **setPosition**(`position`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../modules.md#position) |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L105)

___

### setProps

▸ **setProps**(`props`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Record`\<`string`, `any`\> |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setProps](TrackElement.md#setprops)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:111](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L111)

___

### setRotation

▸ **setRotation**(`rotation`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:45](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L45)

___

### setStart

▸ **setStart**(`s`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `number` |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setStart](TrackElement.md#setstart)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L80)

___

### setStrokeColor

▸ **setStrokeColor**(`stroke`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stroke` | `string` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:80](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L80)

___

### setText

▸ **setText**(`text`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:35](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L35)

___

### setTextAlign

▸ **setTextAlign**(`textAlign`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `textAlign` | [`TextAlign`](../modules.md#textalign) |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L75)

___

### setTextEffect

▸ **setTextEffect**(`textEffect?`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `textEffect?` | [`ElementTextEffect`](ElementTextEffect.md) |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/elements/text.element.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/text.element.ts#L70)

___

### setTrackId

▸ **setTrackId**(`trackId`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackId` | `string` |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setTrackId](TrackElement.md#settrackid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L90)

___

### setType

▸ **setType**(`type`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setType](TrackElement.md#settype)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L75)
