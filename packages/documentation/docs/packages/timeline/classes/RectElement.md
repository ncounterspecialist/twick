# Class: RectElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`RectElement`**

## Table of contents

### Constructors

- [constructor](RectElement.md#constructor)

### Methods

- [getId](RectElement.md#getid)
- [getType](RectElement.md#gettype)
- [getStart](RectElement.md#getstart)
- [getEnd](RectElement.md#getend)
- [getDuration](RectElement.md#getduration)
- [getTrackId](RectElement.md#gettrackid)
- [getProps](RectElement.md#getprops)
- [getName](RectElement.md#getname)
- [getAnimation](RectElement.md#getanimation)
- [getPosition](RectElement.md#getposition)
- [getRotation](RectElement.md#getrotation)
- [getOpacity](RectElement.md#getopacity)
- [setId](RectElement.md#setid)
- [setType](RectElement.md#settype)
- [setStart](RectElement.md#setstart)
- [setEnd](RectElement.md#setend)
- [setTrackId](RectElement.md#settrackid)
- [setName](RectElement.md#setname)
- [setAnimation](RectElement.md#setanimation)
- [setPosition](RectElement.md#setposition)
- [setRotation](RectElement.md#setrotation)
- [setOpacity](RectElement.md#setopacity)
- [setProps](RectElement.md#setprops)
- [getFill](RectElement.md#getfill)
- [setFill](RectElement.md#setfill)
- [getSize](RectElement.md#getsize)
- [getCornerRadius](RectElement.md#getcornerradius)
- [getStrokeColor](RectElement.md#getstrokecolor)
- [getLineWidth](RectElement.md#getlinewidth)
- [setSize](RectElement.md#setsize)
- [setCornerRadius](RectElement.md#setcornerradius)
- [setStrokeColor](RectElement.md#setstrokecolor)
- [setLineWidth](RectElement.md#setlinewidth)
- [accept](RectElement.md#accept)

## Constructors

### constructor

• **new RectElement**(`fill`, `size`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fill` | `string` |
| `size` | [`Size`](../interfaces/Size.md) |

#### Returns

[`RectElement`](RectElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[core/elements/rect.element.ts:9](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L9)

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

### getProps

▸ **getProps**(): `Record`\<`string`, `any`\>

#### Returns

`Record`\<`string`, `any`\>

#### Inherited from

[TrackElement](TrackElement.md).[getProps](TrackElement.md#getprops)

#### Defined in

[core/elements/base.element.ts:53](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L53)

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

[core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L80)

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

[core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L85)

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

[core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L90)

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

[core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L95)

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

[core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L100)

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

[core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L105)

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

[core/elements/base.element.ts:110](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L110)

___

### setPosition

▸ **setPosition**(`position`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../interfaces/Position.md) |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[core/elements/base.element.ts:115](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L115)

___

### setRotation

▸ **setRotation**(`rotation`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setRotation](TrackElement.md#setrotation)

#### Defined in

[core/elements/base.element.ts:121](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L121)

___

### setOpacity

▸ **setOpacity**(`opacity`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

[`RectElement`](RectElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setOpacity](TrackElement.md#setopacity)

#### Defined in

[core/elements/base.element.ts:126](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L126)

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

[core/elements/base.element.ts:131](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L131)

___

### getFill

▸ **getFill**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/rect.element.ts:21](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L21)

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

[core/elements/rect.element.ts:25](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L25)

___

### getSize

▸ **getSize**(): [`Size`](../interfaces/Size.md)

#### Returns

[`Size`](../interfaces/Size.md)

#### Defined in

[core/elements/rect.element.ts:30](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L30)

___

### getCornerRadius

▸ **getCornerRadius**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/rect.element.ts:34](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L34)

___

### getStrokeColor

▸ **getStrokeColor**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/rect.element.ts:38](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L38)

___

### getLineWidth

▸ **getLineWidth**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/rect.element.ts:42](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L42)

___

### setSize

▸ **setSize**(`size`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`Size`](../interfaces/Size.md) |

#### Returns

[`RectElement`](RectElement.md)

#### Defined in

[core/elements/rect.element.ts:46](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L46)

___

### setCornerRadius

▸ **setCornerRadius**(`cornerRadius`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cornerRadius` | `number` |

#### Returns

[`RectElement`](RectElement.md)

#### Defined in

[core/elements/rect.element.ts:52](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L52)

___

### setStrokeColor

▸ **setStrokeColor**(`strokeColor`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `strokeColor` | `string` |

#### Returns

[`RectElement`](RectElement.md)

#### Defined in

[core/elements/rect.element.ts:57](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L57)

___

### setLineWidth

▸ **setLineWidth**(`lineWidth`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lineWidth` | `number` |

#### Returns

[`RectElement`](RectElement.md)

#### Defined in

[core/elements/rect.element.ts:62](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L62)

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

[core/elements/rect.element.ts:67](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/rect.element.ts#L67)
