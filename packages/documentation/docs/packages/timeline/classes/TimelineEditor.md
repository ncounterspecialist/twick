[@twick/timeline](../README.md) / [Exports](../modules.md) / TimelineEditor

# Class: TimelineEditor

TimelineEditor

This class provides an interface to execute all timeline operations
using a direct, class-based approach with track-based management.
It also handles undo/redo operations internally.

## Table of contents

### Constructors

- [constructor](TimelineEditor.md#constructor)

### Properties

- [context](TimelineEditor.md#context)
- [totalDuration](TimelineEditor.md#totalduration)

### Methods

- [addElementToTrack](TimelineEditor.md#addelementtotrack)
- [addTrack](TimelineEditor.md#addtrack)
- [cloneElement](TimelineEditor.md#cloneelement)
- [getContext](TimelineEditor.md#getcontext)
- [getLatestVersion](TimelineEditor.md#getlatestversion)
- [getTimelineData](TimelineEditor.md#gettimelinedata)
- [getTrackById](TimelineEditor.md#gettrackbyid)
- [getTrackByName](TimelineEditor.md#gettrackbyname)
- [getVideoAudio](TimelineEditor.md#getvideoaudio)
- [loadProject](TimelineEditor.md#loadproject)
- [pauseVideo](TimelineEditor.md#pausevideo)
- [redo](TimelineEditor.md#redo)
- [refresh](TimelineEditor.md#refresh)
- [removeElement](TimelineEditor.md#removeelement)
- [removeTrack](TimelineEditor.md#removetrack)
- [removeTrackById](TimelineEditor.md#removetrackbyid)
- [reorderTracks](TimelineEditor.md#reordertracks)
- [resetHistory](TimelineEditor.md#resethistory)
- [setTimelineData](TimelineEditor.md#settimelinedata)
- [splitElement](TimelineEditor.md#splitelement)
- [undo](TimelineEditor.md#undo)
- [updateElement](TimelineEditor.md#updateelement)
- [updateHistory](TimelineEditor.md#updatehistory)

## Constructors

### constructor

• **new TimelineEditor**(`context`): [`TimelineEditor`](TimelineEditor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `TimelineOperationContext` |

#### Returns

[`TimelineEditor`](TimelineEditor.md)

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:45](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L45)

## Properties

### context

• `Private` **context**: `TimelineOperationContext`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:42](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L42)

___

### totalDuration

• `Private` **totalDuration**: `number` = `0`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:43](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L43)

## Methods

### addElementToTrack

▸ **addElementToTrack**(`track`, `element`): `Promise`\<`boolean`\>

Add an element to a specific track using the visitor pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `track` | [`Track`](Track.md) | The track to add the element to |
| `element` | [`TrackElement`](TrackElement.md) | The element to add |

#### Returns

`Promise`\<`boolean`\>

`Promise<boolean>` true if element was added successfully

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:143](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L143)

___

### addTrack

▸ **addTrack**(`name`): [`Track`](Track.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Track`](Track.md)

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:94](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L94)

___

### cloneElement

▸ **cloneElement**(`element`): ``null`` \| [`TrackElement`](TrackElement.md)

Clone an element using the visitor pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to clone |

#### Returns

``null`` \| [`TrackElement`](TrackElement.md)

TrackElement | null - the cloned element or null if cloning failed

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:272](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L272)

___

### getContext

▸ **getContext**(): `TimelineOperationContext`

#### Returns

`TimelineOperationContext`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:51](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L51)

___

### getLatestVersion

▸ **getLatestVersion**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:69](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L69)

___

### getTimelineData

▸ **getTimelineData**(): ``null`` \| `TimelineTrackData`

#### Returns

``null`` \| `TimelineTrackData`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:64](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L64)

___

### getTrackById

▸ **getTrackById**(`id`): ``null`` \| [`Track`](Track.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

``null`` \| [`Track`](Track.md)

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:103](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L103)

___

### getTrackByName

▸ **getTrackByName**(`name`): ``null`` \| [`Track`](Track.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

``null`` \| [`Track`](Track.md)

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:109](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L109)

___

### getVideoAudio

▸ **getVideoAudio**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:398](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L398)

___

### loadProject

▸ **loadProject**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `tracks` | [`TrackJSON`](../modules.md#trackjson)[] |
| › `version` | `number` |

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:377](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L377)

___

### pauseVideo

▸ **pauseVideo**(): `void`

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:55](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L55)

___

### redo

▸ **redo**(): `void`

Trigger redo operation and update timeline data

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:327](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L327)

___

### refresh

▸ **refresh**(): `void`

Refresh the timeline data

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:130](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L130)

___

### removeElement

▸ **removeElement**(`element`): `boolean`

Remove an element from a specific track using the visitor pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to remove |

#### Returns

`boolean`

boolean true if element was removed successfully

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:173](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L173)

___

### removeTrack

▸ **removeTrack**(`track`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `track` | [`Track`](Track.md) |

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:121](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L121)

___

### removeTrackById

▸ **removeTrackById**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:115](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L115)

___

### reorderTracks

▸ **reorderTracks**(`tracks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracks` | [`Track`](Track.md)[] |

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:281](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L281)

___

### resetHistory

▸ **resetHistory**(): `void`

Reset history and clear timeline data

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:355](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L355)

___

### setTimelineData

▸ **setTimelineData**(`tracks`, `version?`): `TimelineTrackData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracks` | [`Track`](Track.md)[] |
| `version?` | `number` |

#### Returns

`TimelineTrackData`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L75)

___

### splitElement

▸ **splitElement**(`element`, `splitTime`): `Promise`\<[`SplitResult`](../interfaces/SplitResult.md)\>

Split an element at a specific time point using the visitor pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to split |
| `splitTime` | `number` | The time point to split at |

#### Returns

`Promise`\<[`SplitResult`](../interfaces/SplitResult.md)\>

SplitResult with first element, second element, and success status

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:234](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L234)

___

### undo

▸ **undo**(): `void`

Trigger undo operation and update timeline data

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:299](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L299)

___

### updateElement

▸ **updateElement**(`element`): `boolean`

Update an element in a specific track using the visitor pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The updated element |

#### Returns

`boolean`

boolean true if element was updated successfully

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:203](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L203)

___

### updateHistory

▸ **updateHistory**(`timelineTrackData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timelineTrackData` | `TimelineTrackData` |

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/editor/timeline.editor.ts:285](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/editor/timeline.editor.ts#L285)
