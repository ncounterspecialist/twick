[@twick/timeline](../README.md) / [Exports](../modules.md) / VideoElement

# Class: VideoElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`VideoElement`**

## Table of contents

### Constructors

- [constructor](VideoElement.md#constructor)

### Properties

- [animation](VideoElement.md#animation)
- [backgroundColor](VideoElement.md#backgroundcolor)
- [baseSize](VideoElement.md#basesize)
- [e](VideoElement.md#e)
- [frame](VideoElement.md#frame)
- [frameEffects](VideoElement.md#frameeffects)
- [id](VideoElement.md#id)
- [mediaDuration](VideoElement.md#mediaduration)
- [name](VideoElement.md#name)
- [objectFit](VideoElement.md#objectfit)
- [parentSize](VideoElement.md#parentsize)
- [props](VideoElement.md#props)
- [s](VideoElement.md#s)
- [trackId](VideoElement.md#trackid)
- [type](VideoElement.md#type)

### Methods

- [accept](VideoElement.md#accept)
- [addFrameEffect](VideoElement.md#addframeeffect)
- [getAnimation](VideoElement.md#getanimation)
- [getBackgroundColor](VideoElement.md#getbackgroundcolor)
- [getDuration](VideoElement.md#getduration)
- [getEnd](VideoElement.md#getend)
- [getEndAt](VideoElement.md#getendat)
- [getFrame](VideoElement.md#getframe)
- [getFrameEffects](VideoElement.md#getframeeffects)
- [getId](VideoElement.md#getid)
- [getMediaDuration](VideoElement.md#getmediaduration)
- [getName](VideoElement.md#getname)
- [getObjectFit](VideoElement.md#getobjectfit)
- [getParentSize](VideoElement.md#getparentsize)
- [getPlaybackRate](VideoElement.md#getplaybackrate)
- [getPosition](VideoElement.md#getposition)
- [getProps](VideoElement.md#getprops)
- [getSrc](VideoElement.md#getsrc)
- [getStart](VideoElement.md#getstart)
- [getStartAt](VideoElement.md#getstartat)
- [getTrackId](VideoElement.md#gettrackid)
- [getType](VideoElement.md#gettype)
- [getVolume](VideoElement.md#getvolume)
- [setAnimation](VideoElement.md#setanimation)
- [setBackgroundColor](VideoElement.md#setbackgroundcolor)
- [setEnd](VideoElement.md#setend)
- [setFrame](VideoElement.md#setframe)
- [setFrameEffects](VideoElement.md#setframeeffects)
- [setId](VideoElement.md#setid)
- [setMediaDuration](VideoElement.md#setmediaduration)
- [setMediaFilter](VideoElement.md#setmediafilter)
- [setName](VideoElement.md#setname)
- [setObjectFit](VideoElement.md#setobjectfit)
- [setParentSize](VideoElement.md#setparentsize)
- [setPlaybackRate](VideoElement.md#setplaybackrate)
- [setPosition](VideoElement.md#setposition)
- [setProps](VideoElement.md#setprops)
- [setSrc](VideoElement.md#setsrc)
- [setStart](VideoElement.md#setstart)
- [setStartAt](VideoElement.md#setstartat)
- [setTrackId](VideoElement.md#settrackid)
- [setType](VideoElement.md#settype)
- [setVolume](VideoElement.md#setvolume)
- [updateVideoMeta](VideoElement.md#updatevideometa)

## Constructors

### constructor

• **new VideoElement**(`src`, `parentSize`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `parentSize` | [`Size`](../modules.md#size) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:18](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L18)

## Properties

### animation

• `Protected` `Optional` **animation**: [`ElementAnimation`](ElementAnimation.md)

#### Inherited from

[TrackElement](TrackElement.md).[animation](TrackElement.md#animation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L13)

___

### backgroundColor

• `Protected` **backgroundColor**: `string`

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:12](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L12)

___

### baseSize

• `Protected` **baseSize**: [`Size`](../modules.md#size)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L9)

___

### e

• `Protected` **e**: `number`

#### Inherited from

[TrackElement](TrackElement.md).[e](TrackElement.md#e)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:10](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L10)

___

### frame

• `Protected` **frame**: [`Frame`](../modules.md#frame)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:15](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L15)

___

### frameEffects

• `Protected` `Optional` **frameEffects**: [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:14](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L14)

___

### id

• `Protected` **id**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[id](TrackElement.md#id)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L7)

___

### mediaDuration

• `Protected` **mediaDuration**: `number`

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:10](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L10)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[name](TrackElement.md#name)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:12](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L12)

___

### objectFit

• `Protected` **objectFit**: [`ObjectFit`](../modules.md#objectfit)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L13)

___

### parentSize

• `Protected` **parentSize**: [`Size`](../modules.md#size)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L11)

___

### props

• `Protected` **props**: [`VideoProps`](../modules.md#videoprops)

#### Overrides

[TrackElement](TrackElement.md).[props](TrackElement.md#props)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:16](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L16)

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

[packages/timeline/src/core/elements/video.element.ts:176](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L176)

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

[packages/timeline/src/core/elements/video.element.ts:171](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L171)

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

### getBackgroundColor

▸ **getBackgroundColor**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:44](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L44)

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

### getEndAt

▸ **getEndAt**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:60](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L60)

___

### getFrame

▸ **getFrame**(): [`Frame`](../modules.md#frame)

#### Returns

[`Frame`](../modules.md#frame)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:36](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L36)

___

### getFrameEffects

▸ **getFrameEffects**(): `undefined` \| [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Returns

`undefined` \| [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:40](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L40)

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

### getMediaDuration

▸ **getMediaDuration**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:52](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L52)

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

### getObjectFit

▸ **getObjectFit**(): [`ObjectFit`](../modules.md#objectfit)

#### Returns

[`ObjectFit`](../modules.md#objectfit)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:48](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L48)

___

### getParentSize

▸ **getParentSize**(): [`Size`](../modules.md#size)

#### Returns

[`Size`](../modules.md#size)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:32](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L32)

___

### getPlaybackRate

▸ **getPlaybackRate**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:68](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L68)

___

### getPosition

▸ **getPosition**(): [`Position`](../modules.md#position)

#### Returns

[`Position`](../modules.md#position)

#### Overrides

[TrackElement](TrackElement.md).[getPosition](TrackElement.md#getposition)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:76](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L76)

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

### getSrc

▸ **getSrc**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:64](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L64)

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

### getStartAt

▸ **getStartAt**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:56](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L56)

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

### getVolume

▸ **getVolume**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:72](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L72)

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

[packages/timeline/src/core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L100)

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

[packages/timeline/src/core/elements/video.element.ts:153](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L153)

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

[packages/timeline/src/core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L85)

___

### setFrame

▸ **setFrame**(`frame`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | [`Frame`](../modules.md#frame) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:128](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L128)

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

[packages/timeline/src/core/elements/video.element.ts:166](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L166)

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

[packages/timeline/src/core/elements/base.element.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L70)

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

[packages/timeline/src/core/elements/video.element.ts:113](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L113)

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

[packages/timeline/src/core/elements/video.element.ts:143](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L143)

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

[packages/timeline/src/core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L95)

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

[packages/timeline/src/core/elements/video.element.ts:123](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L123)

___

### setParentSize

▸ **setParentSize**(`parentSize`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentSize` | [`Size`](../modules.md#size) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:118](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L118)

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

[packages/timeline/src/core/elements/video.element.ts:133](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L133)

___

### setPosition

▸ **setPosition**(`position`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../modules.md#position) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[packages/timeline/src/core/elements/video.element.ts:101](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L101)

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

[packages/timeline/src/core/elements/video.element.ts:158](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L158)

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

[packages/timeline/src/core/elements/video.element.ts:107](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L107)

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

[packages/timeline/src/core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L80)

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

[packages/timeline/src/core/elements/video.element.ts:138](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L138)

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

[packages/timeline/src/core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L90)

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

[packages/timeline/src/core/elements/base.element.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L75)

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

[packages/timeline/src/core/elements/video.element.ts:148](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L148)

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

[packages/timeline/src/core/elements/video.element.ts:84](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/video.element.ts#L84)
