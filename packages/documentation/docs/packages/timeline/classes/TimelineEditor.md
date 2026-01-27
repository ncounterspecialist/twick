# Class: TimelineEditor

TimelineEditor

This class provides an interface to execute all timeline operations
using a direct, class-based approach with track-based management.
It also handles undo/redo operations internally.

## Table of contents

### Constructors

- [constructor](TimelineEditor.md#constructor)

### Methods

- [getContext](TimelineEditor.md#getcontext)
- [pauseVideo](TimelineEditor.md#pausevideo)
- [getTimelineData](TimelineEditor.md#gettimelinedata)
- [getLatestVersion](TimelineEditor.md#getlatestversion)
- [addTrack](TimelineEditor.md#addtrack)
- [getTrackById](TimelineEditor.md#gettrackbyid)
- [getTrackByName](TimelineEditor.md#gettrackbyname)
- [getSubtiltesTrack](TimelineEditor.md#getsubtiltestrack)
- [removeTrackById](TimelineEditor.md#removetrackbyid)
- [removeTrack](TimelineEditor.md#removetrack)
- [refresh](TimelineEditor.md#refresh)
- [addElementToTrack](TimelineEditor.md#addelementtotrack)
- [removeElement](TimelineEditor.md#removeelement)
- [updateElement](TimelineEditor.md#updateelement)
- [splitElement](TimelineEditor.md#splitelement)
- [cloneElement](TimelineEditor.md#cloneelement)
- [reorderTracks](TimelineEditor.md#reordertracks)
- [updateHistory](TimelineEditor.md#updatehistory)
- [undo](TimelineEditor.md#undo)
- [redo](TimelineEditor.md#redo)
- [resetHistory](TimelineEditor.md#resethistory)
- [loadProject](TimelineEditor.md#loadproject)
- [getVideoAudio](TimelineEditor.md#getvideoaudio)

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

[core/editor/timeline.editor.ts:46](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L46)

## Methods

### getContext

▸ **getContext**(): `TimelineOperationContext`

#### Returns

`TimelineOperationContext`

#### Defined in

[core/editor/timeline.editor.ts:52](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L52)

___

### pauseVideo

▸ **pauseVideo**(): `void`

#### Returns

`void`

#### Defined in

[core/editor/timeline.editor.ts:56](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L56)

___

### getTimelineData

▸ **getTimelineData**(): ``null`` \| `TimelineTrackData`

#### Returns

``null`` \| `TimelineTrackData`

#### Defined in

[core/editor/timeline.editor.ts:65](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L65)

___

### getLatestVersion

▸ **getLatestVersion**(): `number`

#### Returns

`number`

#### Defined in

[core/editor/timeline.editor.ts:70](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L70)

___

### addTrack

▸ **addTrack**(`name`, `type?`): [`Track`](Track.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `type` | `string` | `"element"` |

#### Returns

[`Track`](Track.md)

#### Defined in

[core/editor/timeline.editor.ts:106](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L106)

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

[core/editor/timeline.editor.ts:115](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L115)

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

[core/editor/timeline.editor.ts:121](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L121)

___

### getSubtiltesTrack

▸ **getSubtiltesTrack**(): ``null`` \| [`Track`](Track.md)

#### Returns

``null`` \| [`Track`](Track.md)

#### Defined in

[core/editor/timeline.editor.ts:127](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L127)

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

[core/editor/timeline.editor.ts:133](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L133)

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

[core/editor/timeline.editor.ts:139](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L139)

___

### refresh

▸ **refresh**(): `void`

Refresh the timeline data

#### Returns

`void`

#### Defined in

[core/editor/timeline.editor.ts:148](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L148)

___

### addElementToTrack

▸ **addElementToTrack**(`track`, `element`): `Promise`\<`boolean`\>

Add an element to a specific track using the visitor pattern.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `track` | [`Track`](Track.md) | The track to add the element to. |
| `element` | [`TrackElement`](TrackElement.md) | The element to add. |

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` if the element was added successfully, otherwise `false`.

#### Defined in

[core/editor/timeline.editor.ts:161](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L161)

___

### removeElement

▸ **removeElement**(`element`): `boolean`

Remove an element from a specific track using the visitor pattern.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to remove. |

#### Returns

`boolean`

`true` if the element was removed successfully, otherwise `false`.

#### Defined in

[core/editor/timeline.editor.ts:197](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L197)

___

### updateElement

▸ **updateElement**(`element`): [`TrackElement`](TrackElement.md)

Update an element in a specific track using the visitor pattern.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The updated element. |

#### Returns

[`TrackElement`](TrackElement.md)

The updated `TrackElement`.

#### Defined in

[core/editor/timeline.editor.ts:227](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L227)

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

[core/editor/timeline.editor.ts:258](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L258)

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

[core/editor/timeline.editor.ts:299](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L299)

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

[core/editor/timeline.editor.ts:308](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L308)

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

[core/editor/timeline.editor.ts:312](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L312)

___

### undo

▸ **undo**(): `void`

Trigger undo operation and update timeline data

#### Returns

`void`

#### Defined in

[core/editor/timeline.editor.ts:326](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L326)

___

### redo

▸ **redo**(): `void`

Trigger redo operation and update timeline data

#### Returns

`void`

#### Defined in

[core/editor/timeline.editor.ts:354](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L354)

___

### resetHistory

▸ **resetHistory**(): `void`

Reset history and clear timeline data

#### Returns

`void`

#### Defined in

[core/editor/timeline.editor.ts:382](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L382)

___

### loadProject

▸ **loadProject**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `tracks` | [`TrackJSON`](../interfaces/TrackJSON.md)[] |
| › `version` | `number` |

#### Returns

`void`

#### Defined in

[core/editor/timeline.editor.ts:404](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L404)

___

### getVideoAudio

▸ **getVideoAudio**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[core/editor/timeline.editor.ts:425](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/editor/timeline.editor.ts#L425)
