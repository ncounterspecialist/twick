# Class: CaptionElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`CaptionElement`**

## Table of contents

### Constructors

- [constructor](CaptionElement.md#constructor)

### Methods

- [getId](CaptionElement.md#getid)
- [getType](CaptionElement.md#gettype)
- [getStart](CaptionElement.md#getstart)
- [getEnd](CaptionElement.md#getend)
- [getDuration](CaptionElement.md#getduration)
- [getTrackId](CaptionElement.md#gettrackid)
- [getProps](CaptionElement.md#getprops)
- [getName](CaptionElement.md#getname)
- [getAnimation](CaptionElement.md#getanimation)
- [getPosition](CaptionElement.md#getposition)
- [getRotation](CaptionElement.md#getrotation)
- [getOpacity](CaptionElement.md#getopacity)
- [setId](CaptionElement.md#setid)
- [setType](CaptionElement.md#settype)
- [setStart](CaptionElement.md#setstart)
- [setEnd](CaptionElement.md#setend)
- [setTrackId](CaptionElement.md#settrackid)
- [setName](CaptionElement.md#setname)
- [setAnimation](CaptionElement.md#setanimation)
- [setPosition](CaptionElement.md#setposition)
- [setRotation](CaptionElement.md#setrotation)
- [setOpacity](CaptionElement.md#setopacity)
- [setProps](CaptionElement.md#setprops)
- [getText](CaptionElement.md#gettext)
- [setText](CaptionElement.md#settext)
- [accept](CaptionElement.md#accept)

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

[core/elements/caption.element.ts:8](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/caption.element.ts#L8)

## Methods

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getId](TrackElement.md#getid)

#### Defined in

[core/elements/base.element.ts:29](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L29)

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getType](TrackElement.md#gettype)

#### Defined in

[core/elements/base.element.ts:33](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L33)

___

### getStart

▸ **getStart**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getStart](TrackElement.md#getstart)

#### Defined in

[core/elements/base.element.ts:37](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L37)

___

### getEnd

▸ **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getEnd](TrackElement.md#getend)

#### Defined in

[core/elements/base.element.ts:41](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L41)

___

### getDuration

▸ **getDuration**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getDuration](TrackElement.md#getduration)

#### Defined in

[core/elements/base.element.ts:45](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L45)

___

### getTrackId

▸ **getTrackId**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getTrackId](TrackElement.md#gettrackid)

#### Defined in

[core/elements/base.element.ts:49](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L49)

___

### getProps

▸ **getProps**(): `Record`\<`string`, `any`\>

#### Returns

`Record`\<`string`, `any`\>

#### Inherited from

[TrackElement](TrackElement.md).[getProps](TrackElement.md#getprops)

#### Defined in

[core/elements/base.element.ts:53](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L53)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getName](TrackElement.md#getname)

#### Defined in

[core/elements/base.element.ts:57](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L57)

___

### getAnimation

▸ **getAnimation**(): `undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Returns

`undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Inherited from

[TrackElement](TrackElement.md).[getAnimation](TrackElement.md#getanimation)

#### Defined in

[core/elements/base.element.ts:61](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L61)

___

### getPosition

▸ **getPosition**(): [`Position`](../interfaces/Position.md)

#### Returns

[`Position`](../interfaces/Position.md)

#### Inherited from

[TrackElement](TrackElement.md).[getPosition](TrackElement.md#getposition)

#### Defined in

[core/elements/base.element.ts:65](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L65)

___

### getRotation

▸ **getRotation**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getRotation](TrackElement.md#getrotation)

#### Defined in

[core/elements/base.element.ts:72](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L72)

___

### getOpacity

▸ **getOpacity**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getOpacity](TrackElement.md#getopacity)

#### Defined in

[core/elements/base.element.ts:76](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L76)

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

[core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L80)

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

[core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L85)

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

[core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L90)

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

[core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L95)

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

[core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L100)

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

[core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L105)

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

[core/elements/base.element.ts:110](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L110)

___

### setPosition

▸ **setPosition**(`position`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../interfaces/Position.md) |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[core/elements/base.element.ts:115](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L115)

___

### setRotation

▸ **setRotation**(`rotation`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setRotation](TrackElement.md#setrotation)

#### Defined in

[core/elements/base.element.ts:121](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L121)

___

### setOpacity

▸ **setOpacity**(`opacity`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setOpacity](TrackElement.md#setopacity)

#### Defined in

[core/elements/base.element.ts:126](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L126)

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

[core/elements/base.element.ts:131](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L131)

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/caption.element.ts:15](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/caption.element.ts#L15)

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

[core/elements/caption.element.ts:19](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/caption.element.ts#L19)

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

[core/elements/caption.element.ts:24](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/caption.element.ts#L24)
