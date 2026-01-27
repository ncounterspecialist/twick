# Class: ImageElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`ImageElement`**

## Table of contents

### Constructors

- [constructor](ImageElement.md#constructor)

### Methods

- [getId](ImageElement.md#getid)
- [getType](ImageElement.md#gettype)
- [getStart](ImageElement.md#getstart)
- [getEnd](ImageElement.md#getend)
- [getDuration](ImageElement.md#getduration)
- [getTrackId](ImageElement.md#gettrackid)
- [getProps](ImageElement.md#getprops)
- [getName](ImageElement.md#getname)
- [getAnimation](ImageElement.md#getanimation)
- [getOpacity](ImageElement.md#getopacity)
- [setId](ImageElement.md#setid)
- [setType](ImageElement.md#settype)
- [setStart](ImageElement.md#setstart)
- [setEnd](ImageElement.md#setend)
- [setTrackId](ImageElement.md#settrackid)
- [setName](ImageElement.md#setname)
- [setAnimation](ImageElement.md#setanimation)
- [setOpacity](ImageElement.md#setopacity)
- [getParentSize](ImageElement.md#getparentsize)
- [getFrame](ImageElement.md#getframe)
- [getFrameEffects](ImageElement.md#getframeeffects)
- [getBackgroundColor](ImageElement.md#getbackgroundcolor)
- [getObjectFit](ImageElement.md#getobjectfit)
- [getRotation](ImageElement.md#getrotation)
- [setRotation](ImageElement.md#setrotation)
- [getPosition](ImageElement.md#getposition)
- [updateImageMeta](ImageElement.md#updateimagemeta)
- [setPosition](ImageElement.md#setposition)
- [setSrc](ImageElement.md#setsrc)
- [setObjectFit](ImageElement.md#setobjectfit)
- [setFrame](ImageElement.md#setframe)
- [setParentSize](ImageElement.md#setparentsize)
- [setMediaFilter](ImageElement.md#setmediafilter)
- [setBackgroundColor](ImageElement.md#setbackgroundcolor)
- [setProps](ImageElement.md#setprops)
- [setFrameEffects](ImageElement.md#setframeeffects)
- [addFrameEffect](ImageElement.md#addframeeffect)
- [accept](ImageElement.md#accept)

### Properties

- [frameEffects](ImageElement.md#frameeffects)
- [frame](ImageElement.md#frame)

## Constructors

### constructor

• **new ImageElement**(`src`, `parentSize`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `parentSize` | [`Size`](../interfaces/Size.md) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[core/elements/image.element.ts:16](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L16)

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

▸ **setId**(`id`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setId](TrackElement.md#setid)

#### Defined in

[core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L80)

___

### setType

▸ **setType**(`type`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setType](TrackElement.md#settype)

#### Defined in

[core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L85)

___

### setStart

▸ **setStart**(`s`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `number` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setStart](TrackElement.md#setstart)

#### Defined in

[core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L90)

___

### setEnd

▸ **setEnd**(`e`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `number` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setEnd](TrackElement.md#setend)

#### Defined in

[core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L95)

___

### setTrackId

▸ **setTrackId**(`trackId`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackId` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setTrackId](TrackElement.md#settrackid)

#### Defined in

[core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L100)

___

### setName

▸ **setName**(`name`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setName](TrackElement.md#setname)

#### Defined in

[core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L105)

___

### setAnimation

▸ **setAnimation**(`animation?`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `animation?` | [`ElementAnimation`](ElementAnimation.md) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setAnimation](TrackElement.md#setanimation)

#### Defined in

[core/elements/base.element.ts:110](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L110)

___

### setOpacity

▸ **setOpacity**(`opacity`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setOpacity](TrackElement.md#setopacity)

#### Defined in

[core/elements/base.element.ts:126](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L126)

___

### getParentSize

▸ **getParentSize**(): [`Size`](../interfaces/Size.md)

#### Returns

[`Size`](../interfaces/Size.md)

#### Defined in

[core/elements/image.element.ts:31](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L31)

___

### getFrame

▸ **getFrame**(): [`Frame`](../interfaces/Frame.md)

#### Returns

[`Frame`](../interfaces/Frame.md)

#### Defined in

[core/elements/image.element.ts:35](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L35)

___

### getFrameEffects

▸ **getFrameEffects**(): `undefined` \| [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Returns

`undefined` \| [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Defined in

[core/elements/image.element.ts:39](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L39)

___

### getBackgroundColor

▸ **getBackgroundColor**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/image.element.ts:43](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L43)

___

### getObjectFit

▸ **getObjectFit**(): [`ObjectFit`](../modules.md#objectfit)

#### Returns

[`ObjectFit`](../modules.md#objectfit)

#### Defined in

[core/elements/image.element.ts:47](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L47)

___

### getRotation

▸ **getRotation**(): `number`

#### Returns

`number`

#### Overrides

[TrackElement](TrackElement.md).[getRotation](TrackElement.md#getrotation)

#### Defined in

[core/elements/image.element.ts:51](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L51)

___

### setRotation

▸ **setRotation**(`rotation`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setRotation](TrackElement.md#setrotation)

#### Defined in

[core/elements/image.element.ts:55](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L55)

___

### getPosition

▸ **getPosition**(): [`Position`](../interfaces/Position.md)

#### Returns

[`Position`](../interfaces/Position.md)

#### Overrides

[TrackElement](TrackElement.md).[getPosition](TrackElement.md#getposition)

#### Defined in

[core/elements/image.element.ts:60](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L60)

___

### updateImageMeta

▸ **updateImageMeta**(`updateFrame?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `updateFrame` | `boolean` | `true` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[core/elements/image.element.ts:67](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L67)

___

### setPosition

▸ **setPosition**(`position`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../interfaces/Position.md) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[core/elements/image.element.ts:82](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L82)

___

### setSrc

▸ **setSrc**(`src`): `Promise`\<[`ImageElement`](ImageElement.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |

#### Returns

`Promise`\<[`ImageElement`](ImageElement.md)\>

#### Defined in

[core/elements/image.element.ts:88](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L88)

___

### setObjectFit

▸ **setObjectFit**(`objectFit`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `objectFit` | [`ObjectFit`](../modules.md#objectfit) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[core/elements/image.element.ts:94](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L94)

___

### setFrame

▸ **setFrame**(`frame`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | [`Frame`](../interfaces/Frame.md) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[core/elements/image.element.ts:99](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L99)

___

### setParentSize

▸ **setParentSize**(`parentSize`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentSize` | [`Size`](../interfaces/Size.md) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[core/elements/image.element.ts:105](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L105)

___

### setMediaFilter

▸ **setMediaFilter**(`mediaFilter`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mediaFilter` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[core/elements/image.element.ts:110](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L110)

___

### setBackgroundColor

▸ **setBackgroundColor**(`backgroundColor`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `backgroundColor` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[core/elements/image.element.ts:115](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L115)

___

### setProps

▸ **setProps**(`props`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`\<`any`, ``"src"``\> |

#### Returns

[`ImageElement`](ImageElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setProps](TrackElement.md#setprops)

#### Defined in

[core/elements/image.element.ts:120](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L120)

___

### setFrameEffects

▸ **setFrameEffects**(`frameEffects?`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frameEffects?` | [`ElementFrameEffect`](ElementFrameEffect.md)[] |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[core/elements/image.element.ts:125](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L125)

___

### addFrameEffect

▸ **addFrameEffect**(`frameEffect`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frameEffect` | [`ElementFrameEffect`](ElementFrameEffect.md) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[core/elements/image.element.ts:130](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L130)

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

[core/elements/image.element.ts:135](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L135)

## Properties

### frameEffects

• `Optional` **frameEffects**: [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Defined in

[core/elements/image.element.ts:12](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L12)

___

### frame

• **frame**: [`Frame`](../interfaces/Frame.md)

#### Defined in

[core/elements/image.element.ts:13](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/image.element.ts#L13)
