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

### Methods

- [accept](TrackElement.md#accept)
- [getId](TrackElement.md#getid)
- [getType](TrackElement.md#gettype)
- [getStart](TrackElement.md#getstart)
- [getEnd](TrackElement.md#getend)
- [getDuration](TrackElement.md#getduration)
- [getTrackId](TrackElement.md#gettrackid)
- [getProps](TrackElement.md#getprops)
- [getName](TrackElement.md#getname)
- [getAnimation](TrackElement.md#getanimation)
- [getPosition](TrackElement.md#getposition)
- [getRotation](TrackElement.md#getrotation)
- [getOpacity](TrackElement.md#getopacity)
- [setId](TrackElement.md#setid)
- [setType](TrackElement.md#settype)
- [setStart](TrackElement.md#setstart)
- [setEnd](TrackElement.md#setend)
- [setTrackId](TrackElement.md#settrackid)
- [setName](TrackElement.md#setname)
- [setAnimation](TrackElement.md#setanimation)
- [setPosition](TrackElement.md#setposition)
- [setRotation](TrackElement.md#setrotation)
- [setOpacity](TrackElement.md#setopacity)
- [setProps](TrackElement.md#setprops)

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

[core/elements/base.element.ts:16](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L16)

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

[core/elements/base.element.ts:27](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L27)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/base.element.ts:29](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L29)

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/base.element.ts:33](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L33)

___

### getStart

▸ **getStart**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/base.element.ts:37](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L37)

___

### getEnd

▸ **getEnd**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/base.element.ts:41](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L41)

___

### getDuration

▸ **getDuration**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/base.element.ts:45](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L45)

___

### getTrackId

▸ **getTrackId**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/base.element.ts:49](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L49)

___

### getProps

▸ **getProps**(): `Record`\<`string`, `any`\>

#### Returns

`Record`\<`string`, `any`\>

#### Defined in

[core/elements/base.element.ts:53](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L53)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/base.element.ts:57](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L57)

___

### getAnimation

▸ **getAnimation**(): `undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Returns

`undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Defined in

[core/elements/base.element.ts:61](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L61)

___

### getPosition

▸ **getPosition**(): [`Position`](../interfaces/Position.md)

#### Returns

[`Position`](../interfaces/Position.md)

#### Defined in

[core/elements/base.element.ts:65](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L65)

___

### getRotation

▸ **getRotation**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/base.element.ts:72](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L72)

___

### getOpacity

▸ **getOpacity**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/base.element.ts:76](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L76)

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

[core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L80)

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

[core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L85)

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

[core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L90)

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

[core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L95)

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

[core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L100)

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

[core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L105)

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

[core/elements/base.element.ts:110](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L110)

___

### setPosition

▸ **setPosition**(`position`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../interfaces/Position.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[core/elements/base.element.ts:115](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L115)

___

### setRotation

▸ **setRotation**(`rotation`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[core/elements/base.element.ts:121](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L121)

___

### setOpacity

▸ **setOpacity**(`opacity`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[core/elements/base.element.ts:126](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L126)

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

[core/elements/base.element.ts:131](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L131)
