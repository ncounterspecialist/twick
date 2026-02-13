# @twick/timeline - v0.15.0

## Table of contents

### Interfaces

- [TimelineProviderProps](interfaces/TimelineProviderProps.md)
- [SplitResult](interfaces/SplitResult.md)
- [ElementVisitor](interfaces/ElementVisitor.md)
- [Position](interfaces/Position.md)
- [Size](interfaces/Size.md)
- [Frame](interfaces/Frame.md)
- [ElementJSON](interfaces/ElementJSON.md)
- [TrackJSON](interfaces/TrackJSON.md)
- [ProjectJSON](interfaces/ProjectJSON.md)
- [BaseMediaProps](interfaces/BaseMediaProps.md)
- [VideoProps](interfaces/VideoProps.md)
- [AudioProps](interfaces/AudioProps.md)
- [ImageProps](interfaces/ImageProps.md)
- [TextProps](interfaces/TextProps.md)
- [RectProps](interfaces/RectProps.md)
- [CircleProps](interfaces/CircleProps.md)
- [IconProps](interfaces/IconProps.md)
- [TextEffect](interfaces/TextEffect.md)
- [FrameEffectProps](interfaces/FrameEffectProps.md)
- [FrameEffect](interfaces/FrameEffect.md)
- [Animation](interfaces/Animation.md)

### Classes

- [ElementAnimation](classes/ElementAnimation.md)
- [ElementFrameEffect](classes/ElementFrameEffect.md)
- [ElementTextEffect](classes/ElementTextEffect.md)
- [TimelineEditor](classes/TimelineEditor.md)
- [AudioElement](classes/AudioElement.md)
- [TrackElement](classes/TrackElement.md)
- [CaptionElement](classes/CaptionElement.md)
- [CircleElement](classes/CircleElement.md)
- [IconElement](classes/IconElement.md)
- [ImageElement](classes/ImageElement.md)
- [RectElement](classes/RectElement.md)
- [TextElement](classes/TextElement.md)
- [VideoElement](classes/VideoElement.md)
- [Track](classes/Track.md)
- [ElementAdder](classes/ElementAdder.md)
- [ElementCloner](classes/ElementCloner.md)
- [ElementDeserializer](classes/ElementDeserializer.md)
- [ElementRemover](classes/ElementRemover.md)
- [ElementSerializer](classes/ElementSerializer.md)
- [ElementSplitter](classes/ElementSplitter.md)
- [ElementUpdater](classes/ElementUpdater.md)
- [ValidationError](classes/ValidationError.md)
- [ElementValidator](classes/ElementValidator.md)

### Functions

- [TimelineProvider](modules.md#timelineprovider)
- [useTimelineContext](modules.md#usetimelinecontext)
- [getDecimalNumber](modules.md#getdecimalnumber)
- [getTotalDuration](modules.md#gettotalduration)
- [generateShortUuid](modules.md#generateshortuuid)
- [getCurrentElements](modules.md#getcurrentelements)
- [canSplitElement](modules.md#cansplitelement)
- [isElementId](modules.md#iselementid)
- [isTrackId](modules.md#istrackid)
- [extractVideoAudio](modules.md#extractvideoaudio)

### Type Aliases

- [TimelineContextType](modules.md#timelinecontexttype)
- [ObjectFit](modules.md#objectfit)
- [TextAlign](modules.md#textalign)

### Variables

- [VALIDATION\_ERROR\_CODE](modules.md#validation_error_code)
- [INITIAL\_TIMELINE\_DATA](modules.md#initial_timeline_data)
- [PLAYER\_STATE](modules.md#player_state)
- [CAPTION\_STYLE](modules.md#caption_style)
- [CAPTION\_STYLE\_OPTIONS](modules.md#caption_style_options)
- [CAPTION\_FONT](modules.md#caption_font)
- [CAPTION\_COLOR](modules.md#caption_color)
- [WORDS\_PER\_PHRASE](modules.md#words_per_phrase)
- [TIMELINE\_ACTION](modules.md#timeline_action)
- [TIMELINE\_ELEMENT\_TYPE](modules.md#timeline_element_type)
- [PROCESS\_STATE](modules.md#process_state)

## Functions

### TimelineProvider

▸ **TimelineProvider**(`props`): `Element`

Provider component for the Timeline context.
Wraps the timeline functionality with PostHog analytics and undo/redo support.
Manages the global state for timeline instances including tracks, elements,
playback state, and history management.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`TimelineProviderProps`](interfaces/TimelineProviderProps.md) | Timeline provider configuration |

#### Returns

`Element`

Context provider with timeline state management

**`Example`**

```jsx
<TimelineProvider
  contextId="my-timeline"
  initialData={{ tracks: [], version: 1 }}
  undoRedoPersistenceKey="timeline-state"
>
  <YourApp />
</TimelineProvider>
```

**`Example`**

Disable analytics:
```jsx
<TimelineProvider
  contextId="my-timeline"
  analytics={{ enabled: false }}
>
  <YourApp />
</TimelineProvider>
```

#### Defined in

[context/timeline-context.tsx:307](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L307)

___

### useTimelineContext

▸ **useTimelineContext**(): [`TimelineContextType`](modules.md#timelinecontexttype)

Hook to access the Timeline context.
Provides access to timeline state, editor instance, and timeline management functions.
Must be used within a TimelineProvider component.

#### Returns

[`TimelineContextType`](modules.md#timelinecontexttype)

TimelineContextType object with all timeline state and controls

**`Throws`**

Error if used outside of TimelineProvider

**`Example`**

```js
const {
  editor,
  selectedItem,
  totalDuration,
  canUndo,
  canRedo,
  setSelectedItem,
  setTimelineAction
} = useTimelineContext();

// Access the timeline editor
const tracks = editor.getTracks();

// Check if undo is available
if (canUndo) {
  editor.undo();
}

// Set timeline action
setTimelineAction(TIMELINE_ACTION.SET_PLAYER_STATE, { playing: true });
```

#### Defined in

[context/timeline-context.tsx:407](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L407)

___

### getDecimalNumber

▸ **getDecimalNumber**(`num`, `precision?`): `number`

Rounds a number to a specified decimal precision.
Useful for ensuring consistent decimal places in timeline calculations.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `num` | `number` | `undefined` | The number to round |
| `precision` | `number` | `3` | The number of decimal places to round to |

#### Returns

`number`

The rounded number

**`Example`**

```js
const rounded = getDecimalNumber(3.14159, 2);
// rounded = 3.14
```

#### Defined in

[utils/timeline.utils.ts:21](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/timeline.utils.ts#L21)

___

### getTotalDuration

▸ **getTotalDuration**(`tracks`): `number`

Calculates the total duration of all tracks in a timeline.
Finds the maximum end time across all elements in all tracks
to determine the overall timeline duration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tracks` | [`TrackJSON`](interfaces/TrackJSON.md)[] | Array of track data containing elements |

#### Returns

`number`

The total duration in seconds

**`Example`**

```js
const duration = getTotalDuration(tracks);
// duration = 120.5 (2 minutes and 0.5 seconds)
```

#### Defined in

[utils/timeline.utils.ts:39](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/timeline.utils.ts#L39)

___

### generateShortUuid

▸ **generateShortUuid**(): `string`

Generates a short UUID for element and track identification.
Creates a 12-character unique identifier using a simplified
UUID generation algorithm.

#### Returns

`string`

A 12-character unique identifier string

**`Example`**

```js
const id = generateShortUuid();
// id = "a1b2c3d4e5f6"
```

#### Defined in

[utils/timeline.utils.ts:66](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/timeline.utils.ts#L66)

___

### getCurrentElements

▸ **getCurrentElements**(`currentTime`, `tracks`): `Readonly`\<[`TrackElement`](classes/TrackElement.md)\>[]

Gets all elements that are currently active at the specified time.
Searches through all tracks to find elements whose time range
includes the current playback time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currentTime` | `number` | The current playback time in seconds |
| `tracks` | [`Track`](classes/Track.md)[] | Array of track objects to search through |

#### Returns

`Readonly`\<[`TrackElement`](classes/TrackElement.md)\>[]

Array of elements currently active at the specified time

**`Example`**

```js
const activeElements = getCurrentElements(5.5, tracks);
// Returns all elements active at 5.5 seconds
```

#### Defined in

[utils/timeline.utils.ts:89](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/timeline.utils.ts#L89)

___

### canSplitElement

▸ **canSplitElement**(`element`, `currentTime`): `boolean`

Checks if an element can be split at the specified time.
Determines if the current time falls within the element's
start and end time range.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](classes/TrackElement.md) | The element to check for splitting |
| `currentTime` | `number` | The time at which to check if splitting is possible |

#### Returns

`boolean`

True if the element can be split at the specified time

**`Example`**

```js
const canSplit = canSplitElement(videoElement, 10.5);
// canSplit = true if element spans across 10.5 seconds
```

#### Defined in

[utils/timeline.utils.ts:128](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/timeline.utils.ts#L128)

___

### isElementId

▸ **isElementId**(`id`): `boolean`

Checks if an ID represents an element.
Validates if the ID follows the element naming convention.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID to check |

#### Returns

`boolean`

True if the ID represents an element

**`Example`**

```js
const isElement = isElementId("e-abc123");
// isElement = true
```

#### Defined in

[utils/timeline.utils.ts:145](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/timeline.utils.ts#L145)

___

### isTrackId

▸ **isTrackId**(`id`): `boolean`

Checks if an ID represents a track.
Validates if the ID follows the track naming convention.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID to check |

#### Returns

`boolean`

True if the ID represents a track

**`Example`**

```js
const isTrack = isTrackId("t-xyz789");
// isTrack = true
```

#### Defined in

[utils/timeline.utils.ts:160](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/timeline.utils.ts#L160)

___

### extractVideoAudio

▸ **extractVideoAudio**(`tracks`, `duration`): `Promise`\<`any`\>

Extracts and stitches audio from video elements across all tracks.
Processes all video elements in the timeline, extracts their audio segments,
and combines them into a single audio file with proper timing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tracks` | [`Track`](classes/Track.md)[] | Array of track objects containing video elements |
| `duration` | `number` | The total duration of the output audio |

#### Returns

`Promise`\<`any`\>

Promise resolving to a Blob URL of the combined audio

**`Example`**

```js
const audioUrl = await extractVideoAudio(tracks, 120);
// audioUrl = "blob:http://localhost:3000/abc123"
```

#### Defined in

[utils/timeline.utils.ts:177](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/timeline.utils.ts#L177)

## Type Aliases

### TimelineContextType

Ƭ **TimelineContextType**: `Object`

Type definition for the Timeline context.
Contains all the state and functions needed to manage a timeline instance.
Provides access to the timeline editor, selected items, undo/redo functionality,
and timeline actions.

**`Example`**

```js
const {
  editor,
  selectedItem,
  totalDuration,
  canUndo,
  canRedo,
  setSelectedItem,
  setTimelineAction
} = useTimelineContext();
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contextId` | `string` | Unique identifier for this timeline context |
| `editor` | [`TimelineEditor`](classes/TimelineEditor.md) | The timeline editor instance for this context |
| `selectedItem` | [`Track`](classes/Track.md) \| [`TrackElement`](classes/TrackElement.md) \| ``null`` | Currently selected track or element |
| `changeLog` | `number` | Change counter for tracking modifications |
| `timelineAction` | \{ `type`: `string` ; `payload`: `any`  } | Current timeline action being performed |
| `timelineAction.type` | `string` | - |
| `timelineAction.payload` | `any` | - |
| `videoResolution` | [`Size`](interfaces/Size.md) | Resolution of the video |
| `totalDuration` | `number` | Total duration of the timeline in seconds |
| `present` | [`ProjectJSON`](interfaces/ProjectJSON.md) \| ``null`` | Current project state |
| `canUndo` | `boolean` | Whether undo operation is available |
| `canRedo` | `boolean` | Whether redo operation is available |
| `setSelectedItem` | (`item`: [`Track`](classes/Track.md) \| [`TrackElement`](classes/TrackElement.md) \| ``null``) => `void` | - |
| `setTimelineAction` | (`type`: `string`, `payload`: `any`) => `void` | - |
| `setVideoResolution` | (`size`: [`Size`](interfaces/Size.md)) => `void` | - |

#### Defined in

[context/timeline-context.tsx:45](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L45)

___

### ObjectFit

Ƭ **ObjectFit**: ``"contain"`` \| ``"cover"`` \| ``"fill"`` \| ``"none"`` \| ``"scale-down"``

#### Defined in

[types.ts:160](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/types.ts#L160)

___

### TextAlign

Ƭ **TextAlign**: ``"left"`` \| ``"center"`` \| ``"right"`` \| ``"justify"``

#### Defined in

[types.ts:161](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/types.ts#L161)

## Variables

### VALIDATION\_ERROR\_CODE

• `Const` **VALIDATION\_ERROR\_CODE**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ELEMENT_NOT_FOUND` | `string` |
| `ELEMENT_NOT_ADDED` | `string` |
| `ELEMENT_NOT_UPDATED` | `string` |
| `ELEMENT_NOT_REMOVED` | `string` |
| `COLLISION_ERROR` | `string` |
| `INVALID_TIMING` | `string` |

#### Defined in

[core/visitor/element-validator.ts:11](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-validator.ts#L11)

___

### INITIAL\_TIMELINE\_DATA

• `Const` **INITIAL\_TIMELINE\_DATA**: `Object`

Initial timeline data structure for new video editor projects.
Provides a default timeline with a sample text element to get started.

**`Example`**

```js
import { INITIAL_TIMELINE_DATA } from '@twick/timeline';

// Use as starting point for new projects
const newProject = {
  ...INITIAL_TIMELINE_DATA,
  tracks: [...INITIAL_TIMELINE_DATA.tracks, newTrack]
};
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `tracks` | \{ `type`: `string` = "element"; `id`: `string` = "t-sample"; `name`: `string` = "sample"; `elements`: \{ `id`: `string` = "e-sample"; `trackId`: `string` = "t-sample"; `name`: `string` = "sample"; `type`: `string` = "text"; `s`: `number` = 0; `e`: `number` = 5; `props`: \{ `text`: `string` = "Twick SDK"; `fill`: `string` = "#FFFFFF" }  }[]  }[] |
| `version` | `number` |

#### Defined in

[utils/constants.ts:16](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L16)

___

### PLAYER\_STATE

• `Const` **PLAYER\_STATE**: `Object`

Player state constants for timeline playback control.
Defines the different states that a timeline player can be in during playback.

**`Example`**

```js
import { PLAYER_STATE } from '@twick/timeline';

if (playerState === PLAYER_STATE.PLAYING) {
  console.log('Timeline is currently playing');
}
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `REFRESH` | ``"Refresh"`` | Player is refreshing/reloading content |
| `PLAYING` | ``"Playing"`` | Player is actively playing content |
| `PAUSED` | ``"Paused"`` | Player is paused |

#### Defined in

[utils/constants.ts:54](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L54)

___

### CAPTION\_STYLE

• `Const` **CAPTION\_STYLE**: `Object`

Caption styling options for text elements.
Defines different visual styles for caption text rendering.

**`Example`**

```js
import { CAPTION_STYLE } from '@twick/timeline';

const captionElement = new CaptionElement({
  style: CAPTION_STYLE.WORD_BY_WORD
});
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `WORD_BG_HIGHLIGHT` | ``"highlight_bg"`` | Highlights background of each word |
| `WORD_BY_WORD` | ``"word_by_word"`` | Animates text word by word |
| `WORD_BY_WORD_WITH_BG` | ``"word_by_word_with_bg"`` | Animates text word by word with background highlighting |

#### Defined in

[utils/constants.ts:76](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L76)

___

### CAPTION\_STYLE\_OPTIONS

• `Const` **CAPTION\_STYLE\_OPTIONS**: `Object`

Human-readable options for caption styles.
Provides user-friendly labels for caption style selection.

**`Example`**

```js
import { CAPTION_STYLE_OPTIONS } from '@twick/timeline';

const options = Object.values(CAPTION_STYLE_OPTIONS);
// Returns array of style options with labels
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `highlight_bg` | \{ `label`: ``"Highlight Background"`` = "Highlight Background"; `value`: ``"highlight_bg"`` = CAPTION\_STYLE.WORD\_BG\_HIGHLIGHT } |
| `highlight_bg.label` | ``"Highlight Background"`` |
| `highlight_bg.value` | ``"highlight_bg"`` |
| `word_by_word` | \{ `label`: ``"Word by Word"`` = "Word by Word"; `value`: ``"word_by_word"`` = CAPTION\_STYLE.WORD\_BY\_WORD } |
| `word_by_word.label` | ``"Word by Word"`` |
| `word_by_word.value` | ``"word_by_word"`` |
| `word_by_word_with_bg` | \{ `label`: ``"Word with Background"`` = "Word with Background"; `value`: ``"word_by_word_with_bg"`` = CAPTION\_STYLE.WORD\_BY\_WORD\_WITH\_BG } |
| `word_by_word_with_bg.label` | ``"Word with Background"`` |
| `word_by_word_with_bg.value` | ``"word_by_word_with_bg"`` |

#### Defined in

[utils/constants.ts:97](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L97)

___

### CAPTION\_FONT

• `Const` **CAPTION\_FONT**: `Object`

Default font settings for caption elements.
Defines the standard typography configuration for captions.

**`Example`**

```js
import { CAPTION_FONT } from '@twick/timeline';

const fontSize = CAPTION_FONT.size; // 40
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | ``40`` | Font size in pixels |

#### Defined in

[utils/constants.ts:123](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L123)

___

### CAPTION\_COLOR

• `Const` **CAPTION\_COLOR**: `Object`

Default color scheme for caption elements.
Defines the standard color palette for caption text and backgrounds.

**`Example`**

```js
import { CAPTION_COLOR } from '@twick/timeline';

const textColor = CAPTION_COLOR.text; // "#ffffff"
const highlightColor = CAPTION_COLOR.highlight; // "#ff4081"
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | ``"#ffffff"`` | Text color in hex format |
| `highlight` | ``"#ff4081"`` | Highlight color in hex format |
| `bgColor` | ``"#8C52FF"`` | Background color in hex format |

#### Defined in

[utils/constants.ts:140](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L140)

___

### WORDS\_PER\_PHRASE

• `Const` **WORDS\_PER\_PHRASE**: ``4``

Number of words to display per phrase in caption animations.
Controls the chunking of text for word-by-word animations.

**`Example`**

```js
import { WORDS_PER_PHRASE } from '@twick/timeline';

const phraseLength = WORDS_PER_PHRASE; // 4
```

#### Defined in

[utils/constants.ts:160](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L160)

___

### TIMELINE\_ACTION

• `Const` **TIMELINE\_ACTION**: `Object`

Timeline action types for state management.
Defines the different actions that can be performed on the timeline.

**`Example`**

```js
import { TIMELINE_ACTION } from '@twick/timeline';

if (action.type === TIMELINE_ACTION.SET_PLAYER_STATE) {
  // Handle player state change
}
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `NONE` | ``"none"`` | No action being performed |
| `SET_PLAYER_STATE` | ``"setPlayerState"`` | Setting the player state (play/pause) |
| `UPDATE_PLAYER_DATA` | ``"updatePlayerData"`` | Updating player data |
| `ON_PLAYER_UPDATED` | ``"onPlayerUpdated"`` | Player has been updated |

#### Defined in

[utils/constants.ts:175](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L175)

___

### TIMELINE\_ELEMENT\_TYPE

• `Const` **TIMELINE\_ELEMENT\_TYPE**: `Object`

Element type constants for timeline elements.
Defines the different types of elements that can be added to timeline tracks.

**`Example`**

```js
import { TIMELINE_ELEMENT_TYPE } from '@twick/timeline';

if (element.type === TIMELINE_ELEMENT_TYPE.VIDEO) {
  // Handle video element
}
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `VIDEO` | ``"video"`` | Video element type |
| `CAPTION` | ``"caption"`` | Caption element type |
| `IMAGE` | ``"image"`` | Image element type |
| `AUDIO` | ``"audio"`` | Audio element type |
| `TEXT` | ``"text"`` | Text element type |
| `RECT` | ``"rect"`` | Rectangle element type |
| `CIRCLE` | ``"circle"`` | Circle element type |
| `ICON` | ``"icon"`` | Icon element type |

#### Defined in

[utils/constants.ts:199](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L199)

___

### PROCESS\_STATE

• `Const` **PROCESS\_STATE**: `Object`

Process state constants for async operations.
Defines the different states of background processing operations.

**`Example`**

```js
import { PROCESS_STATE } from '@twick/timeline';

if (processState === PROCESS_STATE.PROCESSING) {
  // Show loading indicator
}
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `IDLE` | ``"Idle"`` | Process is idle |
| `PROCESSING` | ``"Processing"`` | Process is currently running |
| `COMPLETED` | ``"Completed"`` | Process has completed successfully |
| `FAILED` | ``"Failed"`` | Process has failed |

#### Defined in

[utils/constants.ts:231](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/utils/constants.ts#L231)
