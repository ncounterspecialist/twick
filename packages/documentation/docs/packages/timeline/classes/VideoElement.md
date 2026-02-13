# Class: VideoElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`VideoElement`**

## Table of contents

### Constructors

- [constructor](VideoElement.md#constructor)

### Methods

- [getId](VideoElement.md#getid)
- [getType](VideoElement.md#gettype)
- [getStart](VideoElement.md#getstart)
- [getEnd](VideoElement.md#getend)
- [getDuration](VideoElement.md#getduration)
- [getTrackId](VideoElement.md#gettrackid)
- [getProps](VideoElement.md#getprops)
- [getName](VideoElement.md#getname)
- [getAnimation](VideoElement.md#getanimation)
- [getOpacity](VideoElement.md#getopacity)
- [setId](VideoElement.md#setid)
- [setType](VideoElement.md#settype)
- [setStart](VideoElement.md#setstart)
- [setEnd](VideoElement.md#setend)
- [setTrackId](VideoElement.md#settrackid)
- [setName](VideoElement.md#setname)
- [setAnimation](VideoElement.md#setanimation)
- [setOpacity](VideoElement.md#setopacity)
- [getParentSize](VideoElement.md#getparentsize)
- [getFrame](VideoElement.md#getframe)
- [getFrameEffects](VideoElement.md#getframeeffects)
- [getBackgroundColor](VideoElement.md#getbackgroundcolor)
- [getObjectFit](VideoElement.md#getobjectfit)
- [getMediaDuration](VideoElement.md#getmediaduration)
- [getStartAt](VideoElement.md#getstartat)
- [getEndAt](VideoElement.md#getendat)
- [getSrc](VideoElement.md#getsrc)
- [getPlaybackRate](VideoElement.md#getplaybackrate)
- [getVolume](VideoElement.md#getvolume)
- [getRotation](VideoElement.md#getrotation)
- [setRotation](VideoElement.md#setrotation)
- [getPosition](VideoElement.md#getposition)
- [updateVideoMeta](VideoElement.md#updatevideometa)
- [setPosition](VideoElement.md#setposition)
- [setSrc](VideoElement.md#setsrc)
- [setMediaDuration](VideoElement.md#setmediaduration)
- [setParentSize](VideoElement.md#setparentsize)
- [setObjectFit](VideoElement.md#setobjectfit)
- [setFrame](VideoElement.md#setframe)
- [setPlaybackRate](VideoElement.md#setplaybackrate)
- [setStartAt](VideoElement.md#setstartat)
- [setMediaFilter](VideoElement.md#setmediafilter)
- [setVolume](VideoElement.md#setvolume)
- [setBackgroundColor](VideoElement.md#setbackgroundcolor)
- [setProps](VideoElement.md#setprops)
- [setFrameEffects](VideoElement.md#setframeeffects)
- [addFrameEffect](VideoElement.md#addframeeffect)
- [accept](VideoElement.md#accept)

## Constructors

### constructor

• **new VideoElement**(`src`, `parentSize`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `parentSize` | [`Size`](../interfaces/Size.md) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[core/elements/video.element.ts:18](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L18)

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

▸ **setId**(`id`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setId](TrackElement.md#setid)

#### Defined in

[core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L80)

___

### setType

▸ **setType**(`type`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setType](TrackElement.md#settype)

#### Defined in

[core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L85)

___

### setStart

▸ **setStart**(`s`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `number` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setStart](TrackElement.md#setstart)

#### Defined in

[core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L90)

___

### setEnd

▸ **setEnd**(`e`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `number` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setEnd](TrackElement.md#setend)

#### Defined in

[core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L95)

___

### setTrackId

▸ **setTrackId**(`trackId`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackId` | `string` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setTrackId](TrackElement.md#settrackid)

#### Defined in

[core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L100)

___

### setName

▸ **setName**(`name`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setName](TrackElement.md#setname)

#### Defined in

[core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L105)

___

### setAnimation

▸ **setAnimation**(`animation?`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `animation?` | [`ElementAnimation`](ElementAnimation.md) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setAnimation](TrackElement.md#setanimation)

#### Defined in

[core/elements/base.element.ts:110](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L110)

___

### setOpacity

▸ **setOpacity**(`opacity`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setOpacity](TrackElement.md#setopacity)

#### Defined in

[core/elements/base.element.ts:126](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/base.element.ts#L126)

___

### getParentSize

▸ **getParentSize**(): [`Size`](../interfaces/Size.md)

#### Returns

[`Size`](../interfaces/Size.md)

#### Defined in

[core/elements/video.element.ts:32](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L32)

___

### getFrame

▸ **getFrame**(): [`Frame`](../interfaces/Frame.md)

#### Returns

[`Frame`](../interfaces/Frame.md)

#### Defined in

[core/elements/video.element.ts:36](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L36)

___

### getFrameEffects

▸ **getFrameEffects**(): `undefined` \| [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Returns

`undefined` \| [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Defined in

[core/elements/video.element.ts:40](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L40)

___

### getBackgroundColor

▸ **getBackgroundColor**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/video.element.ts:44](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L44)

___

### getObjectFit

▸ **getObjectFit**(): [`ObjectFit`](../modules.md#objectfit)

#### Returns

[`ObjectFit`](../modules.md#objectfit)

#### Defined in

[core/elements/video.element.ts:48](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L48)

___

### getMediaDuration

▸ **getMediaDuration**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/video.element.ts:52](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L52)

___

### getStartAt

▸ **getStartAt**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/video.element.ts:56](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L56)

___

### getEndAt

▸ **getEndAt**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/video.element.ts:60](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L60)

___

### getSrc

▸ **getSrc**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/video.element.ts:64](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L64)

___

### getPlaybackRate

▸ **getPlaybackRate**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/video.element.ts:68](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L68)

___

### getVolume

▸ **getVolume**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/video.element.ts:72](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L72)

___

### getRotation

▸ **getRotation**(): `number`

#### Returns

`number`

#### Overrides

[TrackElement](TrackElement.md).[getRotation](TrackElement.md#getrotation)

#### Defined in

[core/elements/video.element.ts:76](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L76)

___

### setRotation

▸ **setRotation**(`rotation`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setRotation](TrackElement.md#setrotation)

#### Defined in

[core/elements/video.element.ts:80](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L80)

___

### getPosition

▸ **getPosition**(): [`Position`](../interfaces/Position.md)

#### Returns

[`Position`](../interfaces/Position.md)

#### Overrides

[TrackElement](TrackElement.md).[getPosition](TrackElement.md#getposition)

#### Defined in

[core/elements/video.element.ts:85](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L85)

___

### updateVideoMeta

▸ **updateVideoMeta**(`updateFrame?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `updateFrame` | `boolean` | `true` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[core/elements/video.element.ts:93](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L93)

___

### setPosition

▸ **setPosition**(`position`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../interfaces/Position.md) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[core/elements/video.element.ts:110](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L110)

___

### setSrc

▸ **setSrc**(`src`): `Promise`\<[`VideoElement`](VideoElement.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |

#### Returns

`Promise`\<[`VideoElement`](VideoElement.md)\>

#### Defined in

[core/elements/video.element.ts:116](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L116)

___

### setMediaDuration

▸ **setMediaDuration**(`mediaDuration`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mediaDuration` | `number` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:122](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L122)

___

### setParentSize

▸ **setParentSize**(`parentSize`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentSize` | [`Size`](../interfaces/Size.md) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:127](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L127)

___

### setObjectFit

▸ **setObjectFit**(`objectFit`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `objectFit` | [`ObjectFit`](../modules.md#objectfit) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:132](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L132)

___

### setFrame

▸ **setFrame**(`frame`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | [`Frame`](../interfaces/Frame.md) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:137](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L137)

___

### setPlaybackRate

▸ **setPlaybackRate**(`playbackRate`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `playbackRate` | `number` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:142](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L142)

___

### setStartAt

▸ **setStartAt**(`time`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:147](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L147)

___

### setMediaFilter

▸ **setMediaFilter**(`mediaFilter`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mediaFilter` | `string` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:152](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L152)

___

### setVolume

▸ **setVolume**(`volume`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `volume` | `number` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:157](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L157)

___

### setBackgroundColor

▸ **setBackgroundColor**(`backgroundColor`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `backgroundColor` | `string` |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:162](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L162)

___

### setProps

▸ **setProps**(`props`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`\<`any`, ``"src"``\> |

#### Returns

[`VideoElement`](VideoElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setProps](TrackElement.md#setprops)

#### Defined in

[core/elements/video.element.ts:167](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L167)

___

### setFrameEffects

▸ **setFrameEffects**(`frameEffects?`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frameEffects?` | [`ElementFrameEffect`](ElementFrameEffect.md)[] |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:175](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L175)

___

### addFrameEffect

▸ **addFrameEffect**(`frameEffect`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frameEffect` | [`ElementFrameEffect`](ElementFrameEffect.md) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/elements/video.element.ts:180](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L180)

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

[core/elements/video.element.ts:185](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/elements/video.element.ts#L185)
