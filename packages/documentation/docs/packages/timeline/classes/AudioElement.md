[@twick/timeline](../README.md) / [Exports](../modules.md) / AudioElement

# Class: AudioElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`AudioElement`**

## Table of contents

### Constructors

- [constructor](AudioElement.md#constructor)

### Properties

- [animation](AudioElement.md#animation)
- [e](AudioElement.md#e)
- [id](AudioElement.md#id)
- [mediaDuration](AudioElement.md#mediaduration)
- [name](AudioElement.md#name)
- [props](AudioElement.md#props)
- [s](AudioElement.md#s)
- [trackId](AudioElement.md#trackid)
- [type](AudioElement.md#type)

### Methods

- [accept](AudioElement.md#accept)
- [getAnimation](AudioElement.md#getanimation)
- [getDuration](AudioElement.md#getduration)
- [getEnd](AudioElement.md#getend)
- [getEndAt](AudioElement.md#getendat)
- [getId](AudioElement.md#getid)
- [getMediaDuration](AudioElement.md#getmediaduration)
- [getName](AudioElement.md#getname)
- [getPlaybackRate](AudioElement.md#getplaybackrate)
- [getPosition](AudioElement.md#getposition)
- [getProps](AudioElement.md#getprops)
- [getSrc](AudioElement.md#getsrc)
- [getStart](AudioElement.md#getstart)
- [getStartAt](AudioElement.md#getstartat)
- [getTrackId](AudioElement.md#gettrackid)
- [getType](AudioElement.md#gettype)
- [getVolume](AudioElement.md#getvolume)
- [setAnimation](AudioElement.md#setanimation)
- [setEnd](AudioElement.md#setend)
- [setId](AudioElement.md#setid)
- [setLoop](AudioElement.md#setloop)
- [setMediaDuration](AudioElement.md#setmediaduration)
- [setName](AudioElement.md#setname)
- [setPlaybackRate](AudioElement.md#setplaybackrate)
- [setPosition](AudioElement.md#setposition)
- [setProps](AudioElement.md#setprops)
- [setSrc](AudioElement.md#setsrc)
- [setStart](AudioElement.md#setstart)
- [setStartAt](AudioElement.md#setstartat)
- [setTrackId](AudioElement.md#settrackid)
- [setType](AudioElement.md#settype)
- [setVolume](AudioElement.md#setvolume)
- [updateAudioMeta](AudioElement.md#updateaudiometa)

## Constructors

### constructor

• **new AudioElement**(`src`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L11)

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

### mediaDuration

• `Protected` **mediaDuration**: `number`

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:8](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L8)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[name](TrackElement.md#name)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:12](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L12)

___

### props

• `Protected` **props**: [`AudioProps`](../modules.md#audioprops)

#### Overrides

[TrackElement](TrackElement.md).[props](TrackElement.md#props)

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L9)

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

[packages/timeline/src/core/elements/audio.element.ts:89](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L89)

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

### getEndAt

▸ **getEndAt**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:30](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L30)

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

[packages/timeline/src/core/elements/audio.element.ts:22](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L22)

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

### getPlaybackRate

▸ **getPlaybackRate**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:38](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L38)

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

### getSrc

▸ **getSrc**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:34](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L34)

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

[packages/timeline/src/core/elements/audio.element.ts:26](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L26)

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

[packages/timeline/src/core/elements/audio.element.ts:42](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L42)

___

### setAnimation

▸ **setAnimation**(`animation?`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `animation?` | [`ElementAnimation`](ElementAnimation.md) |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setAnimation](TrackElement.md#setanimation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L100)

___

### setEnd

▸ **setEnd**(`e`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `number` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setEnd](TrackElement.md#setend)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L85)

___

### setId

▸ **setId**(`id`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setId](TrackElement.md#setid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L70)

___

### setLoop

▸ **setLoop**(`loop`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `loop` | `boolean` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:66](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L66)

___

### setMediaDuration

▸ **setMediaDuration**(`mediaDuration`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mediaDuration` | `number` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:56](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L56)

___

### setName

▸ **setName**(`name`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setName](TrackElement.md#setname)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L95)

___

### setPlaybackRate

▸ **setPlaybackRate**(`playbackRate`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `playbackRate` | `number` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:76](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L76)

___

### setPosition

▸ **setPosition**(`position`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../modules.md#position) |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L105)

___

### setProps

▸ **setProps**(`props`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`\<`any`, ``"src"``\> |

#### Returns

[`AudioElement`](AudioElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setProps](TrackElement.md#setprops)

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:81](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L81)

___

### setSrc

▸ **setSrc**(`src`): `Promise`\<[`AudioElement`](AudioElement.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |

#### Returns

`Promise`\<[`AudioElement`](AudioElement.md)\>

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:50](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L50)

___

### setStart

▸ **setStart**(`s`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `number` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setStart](TrackElement.md#setstart)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L80)

___

### setStartAt

▸ **setStartAt**(`time`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:71](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L71)

___

### setTrackId

▸ **setTrackId**(`trackId`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackId` | `string` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setTrackId](TrackElement.md#settrackid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L90)

___

### setType

▸ **setType**(`type`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setType](TrackElement.md#settype)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L75)

___

### setVolume

▸ **setVolume**(`volume`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `volume` | `number` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:61](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L61)

___

### updateAudioMeta

▸ **updateAudioMeta**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/timeline/src/core/elements/audio.element.ts:46](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/audio.element.ts#L46)
