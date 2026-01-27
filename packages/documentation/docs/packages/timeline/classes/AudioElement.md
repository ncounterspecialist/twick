# Class: AudioElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`AudioElement`**

## Table of contents

### Constructors

- [constructor](AudioElement.md#constructor)

### Methods

- [getMediaDuration](AudioElement.md#getmediaduration)
- [getStartAt](AudioElement.md#getstartat)
- [getEndAt](AudioElement.md#getendat)
- [getSrc](AudioElement.md#getsrc)
- [getPlaybackRate](AudioElement.md#getplaybackrate)
- [getVolume](AudioElement.md#getvolume)
- [updateAudioMeta](AudioElement.md#updateaudiometa)
- [setSrc](AudioElement.md#setsrc)
- [setMediaDuration](AudioElement.md#setmediaduration)
- [setVolume](AudioElement.md#setvolume)
- [setLoop](AudioElement.md#setloop)
- [setStartAt](AudioElement.md#setstartat)
- [setPlaybackRate](AudioElement.md#setplaybackrate)
- [setProps](AudioElement.md#setprops)
- [accept](AudioElement.md#accept)
- [getId](AudioElement.md#getid)
- [getType](AudioElement.md#gettype)
- [getStart](AudioElement.md#getstart)
- [getEnd](AudioElement.md#getend)
- [getDuration](AudioElement.md#getduration)
- [getTrackId](AudioElement.md#gettrackid)
- [getProps](AudioElement.md#getprops)
- [getName](AudioElement.md#getname)
- [getAnimation](AudioElement.md#getanimation)
- [getPosition](AudioElement.md#getposition)
- [getRotation](AudioElement.md#getrotation)
- [getOpacity](AudioElement.md#getopacity)
- [setId](AudioElement.md#setid)
- [setType](AudioElement.md#settype)
- [setStart](AudioElement.md#setstart)
- [setEnd](AudioElement.md#setend)
- [setTrackId](AudioElement.md#settrackid)
- [setName](AudioElement.md#setname)
- [setAnimation](AudioElement.md#setanimation)
- [setPosition](AudioElement.md#setposition)
- [setRotation](AudioElement.md#setrotation)
- [setOpacity](AudioElement.md#setopacity)

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

[core/elements/audio.element.ts:11](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L11)

## Methods

### getMediaDuration

▸ **getMediaDuration**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/audio.element.ts:22](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L22)

___

### getStartAt

▸ **getStartAt**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/audio.element.ts:26](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L26)

___

### getEndAt

▸ **getEndAt**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/audio.element.ts:30](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L30)

___

### getSrc

▸ **getSrc**(): `string`

#### Returns

`string`

#### Defined in

[core/elements/audio.element.ts:34](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L34)

___

### getPlaybackRate

▸ **getPlaybackRate**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/audio.element.ts:38](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L38)

___

### getVolume

▸ **getVolume**(): `number`

#### Returns

`number`

#### Defined in

[core/elements/audio.element.ts:42](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L42)

___

### updateAudioMeta

▸ **updateAudioMeta**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[core/elements/audio.element.ts:46](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L46)

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

[core/elements/audio.element.ts:50](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L50)

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

[core/elements/audio.element.ts:56](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L56)

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

[core/elements/audio.element.ts:61](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L61)

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

[core/elements/audio.element.ts:66](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L66)

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

[core/elements/audio.element.ts:71](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L71)

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

[core/elements/audio.element.ts:76](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L76)

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

[core/elements/audio.element.ts:81](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L81)

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

[core/elements/audio.element.ts:89](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/audio.element.ts#L89)

___

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

[core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L80)

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

[core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L85)

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

[core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L90)

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

[core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L95)

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

[core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L100)

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

[core/elements/base.element.ts:105](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L105)

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

[core/elements/base.element.ts:110](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L110)

___

### setPosition

▸ **setPosition**(`position`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../interfaces/Position.md) |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[core/elements/base.element.ts:115](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L115)

___

### setRotation

▸ **setRotation**(`rotation`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setRotation](TrackElement.md#setrotation)

#### Defined in

[core/elements/base.element.ts:121](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L121)

___

### setOpacity

▸ **setOpacity**(`opacity`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

[`AudioElement`](AudioElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setOpacity](TrackElement.md#setopacity)

#### Defined in

[core/elements/base.element.ts:126](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/elements/base.element.ts#L126)
