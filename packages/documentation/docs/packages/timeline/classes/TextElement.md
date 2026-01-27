# Class: TextElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`TextElement`**

## Table of contents

### Constructors

- [constructor](TextElement.md#constructor)

### Methods

- [getId](TextElement.md#getid)
- [getType](TextElement.md#gettype)
- [getStart](TextElement.md#getstart)
- [getEnd](TextElement.md#getend)
- [getDuration](TextElement.md#getduration)
- [getTrackId](TextElement.md#gettrackid)
- [getName](TextElement.md#getname)
- [getAnimation](TextElement.md#getanimation)
- [getPosition](TextElement.md#getposition)
- [getRotation](TextElement.md#getrotation)
- [getOpacity](TextElement.md#getopacity)
- [setId](TextElement.md#setid)
- [setType](TextElement.md#settype)
- [setStart](TextElement.md#setstart)
- [setEnd](TextElement.md#setend)
- [setTrackId](TextElement.md#settrackid)
- [setName](TextElement.md#setname)
- [setAnimation](TextElement.md#setanimation)
- [setPosition](TextElement.md#setposition)
- [setOpacity](TextElement.md#setopacity)
- [getTextEffect](TextElement.md#gettexteffect)
- [getText](TextElement.md#gettext)
- [getStrokeColor](TextElement.md#getstrokecolor)
- [getLineWidth](TextElement.md#getlinewidth)
- [getProps](TextElement.md#getprops)
- [setText](TextElement.md#settext)
- [setFill](TextElement.md#setfill)
- [setRotation](TextElement.md#setrotation)
- [setFontSize](TextElement.md#setfontsize)
- [setFontFamily](TextElement.md#setfontfamily)
- [setFontWeight](TextElement.md#setfontweight)
- [setFontStyle](TextElement.md#setfontstyle)
- [setTextEffect](TextElement.md#settexteffect)
- [setTextAlign](TextElement.md#settextalign)
- [setStrokeColor](TextElement.md#setstrokecolor)
- [setLineWidth](TextElement.md#setlinewidth)
- [setProps](TextElement.md#setprops)
- [accept](TextElement.md#accept)

## Constructors

### constructor

• **new TextElement**(`text`, `props?`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `props?` | `Omit`\<[`TextProps`](../interfaces/TextProps.md), ``"text"``\> |

#### Returns

[`TextElement`](TextElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[core/elements/text.element.ts:11](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L11)

## Methods

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getId](TrackElement.md#getid)

#### Defined in

[core/elements/base.element.ts:29](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L29)

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getType](TrackElement.md#gettype)

#### Defined in

[core/elements/base.element.ts:33](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L33)

___

### getStart

▸ **getStart**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getStart](TrackElement.md#getstart)

#### Defined in

[core/elements/base.element.ts:37](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L37)

___

### getEnd

▸ **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getEnd](TrackElement.md#getend)

#### Defined in

[core/elements/base.element.ts:41](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L41)

___

### getDuration

▸ **getDuration**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getDuration](TrackElement.md#getduration)

#### Defined in

[core/elements/base.element.ts:45](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L45)

___

### getTrackId

▸ **getTrackId**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getTrackId](TrackElement.md#gettrackid)

#### Defined in

[core/elements/base.element.ts:49](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L49)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getName](TrackElement.md#getname)

#### Defined in

[core/elements/base.element.ts:57](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L57)

___

### getAnimation

▸ **getAnimation**(): `undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Returns

`undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Inherited from

[TrackElement](TrackElement.md).[getAnimation](TrackElement.md#getanimation)

#### Defined in

[core/elements/base.element.ts:61](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L61)

___

### getPosition

▸ **getPosition**(): [`Position`](../interfaces/Position.md)

#### Returns

[`Position`](../interfaces/Position.md)

#### Inherited from

[TrackElement](TrackElement.md).[getPosition](TrackElement.md#getposition)

#### Defined in

[core/elements/base.element.ts:65](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L65)

___

### getRotation

▸ **getRotation**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getRotation](TrackElement.md#getrotation)

#### Defined in

[core/elements/base.element.ts:72](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L72)

___

### getOpacity

▸ **getOpacity**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getOpacity](TrackElement.md#getopacity)

#### Defined in

[core/elements/base.element.ts:76](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L76)

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

[core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L80)

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

[core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L85)

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

[core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L90)

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

[core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L95)

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

[core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L100)

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

[core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L105)

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

[core/elements/base.element.ts:110](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L110)

___

### setPosition

▸ **setPosition**(`position`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../interfaces/Position.md) |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[core/elements/base.element.ts:115](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L115)

___

### setOpacity

▸ **setOpacity**(`opacity`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

[`TextElement`](TextElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setOpacity](TrackElement.md#setopacity)

#### Defined in

[core/elements/base.element.ts:126](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L126)

___

### getTextEffect

▸ **getTextEffect**(): `undefined` \| [`ElementTextEffect`](ElementTextEffect.md)

#### Returns

`undefined` \| [`ElementTextEffect`](ElementTextEffect.md)

#### Defined in

[core/elements/text.element.ts:20](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L20)

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/text.element.ts:24](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L24)

___

### getStrokeColor

▸ **getStrokeColor**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[core/elements/text.element.ts:28](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L28)

___

### getLineWidth

▸ **getLineWidth**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[core/elements/text.element.ts:32](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L32)

___

### getProps

▸ **getProps**(): [`TextProps`](../interfaces/TextProps.md)

#### Returns

[`TextProps`](../interfaces/TextProps.md)

#### Overrides

[TrackElement](TrackElement.md).[getProps](TrackElement.md#getprops)

#### Defined in

[core/elements/text.element.ts:36](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L36)

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

[core/elements/text.element.ts:40](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L40)

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

[core/elements/text.element.ts:45](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L45)

___

### setRotation

▸ **setRotation**(`rotation`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

[`TextElement`](TextElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setRotation](TrackElement.md#setrotation)

#### Defined in

[core/elements/text.element.ts:50](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L50)

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

[core/elements/text.element.ts:55](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L55)

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

[core/elements/text.element.ts:60](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L60)

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

[core/elements/text.element.ts:65](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L65)

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

[core/elements/text.element.ts:70](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L70)

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

[core/elements/text.element.ts:75](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L75)

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

[core/elements/text.element.ts:80](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L80)

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

[core/elements/text.element.ts:85](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L85)

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

[core/elements/text.element.ts:90](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L90)

___

### setProps

▸ **setProps**(`props`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TextProps`](../interfaces/TextProps.md) |

#### Returns

[`TextElement`](TextElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setProps](TrackElement.md#setprops)

#### Defined in

[core/elements/text.element.ts:95](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L95)

___

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

[core/elements/text.element.ts:100](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/text.element.ts#L100)
