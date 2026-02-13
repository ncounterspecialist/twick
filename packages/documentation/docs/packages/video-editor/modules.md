# @twick/video-editor - v0.15.0

## Table of contents

### Interfaces

- [PlayerControlsProps](interfaces/PlayerControlsProps.md)
- [TimelineTickConfig](interfaces/TimelineTickConfig.md)
- [TimelineZoomConfig](interfaces/TimelineZoomConfig.md)
- [VideoEditorConfig](interfaces/VideoEditorConfig.md)
- [VideoEditorProps](interfaces/VideoEditorProps.md)
- [Animation](interfaces/Animation.md)
- [TextEffect](interfaces/TextEffect.md)
- [MediaItem](interfaces/MediaItem.md)
- [PaginationOptions](interfaces/PaginationOptions.md)
- [SearchOptions](interfaces/SearchOptions.md)
- [ElementColors](interfaces/ElementColors.md)

### Classes

- [BaseMediaManager](classes/BaseMediaManager.md)
- [BrowserMediaManager](classes/BrowserMediaManager.md)

### Functions

- [getAnimationGif](modules.md#getanimationgif)
- [PlayerControls](modules.md#playercontrols)
- [TimelineManager](modules.md#timelinemanager)
- [default](modules.md#default)
- [setElementColors](modules.md#setelementcolors)
- [useEditorManager](modules.md#useeditormanager)
- [usePlayerControl](modules.md#useplayercontrol)
- [useTimelineControl](modules.md#usetimelinecontrol)

### Variables

- [animationGifs](modules.md#animationgifs)
- [ANIMATIONS](modules.md#animations)
- [INITIAL\_TIMELINE\_DATA](modules.md#initial_timeline_data)
- [MIN\_DURATION](modules.md#min_duration)
- [DRAG\_TYPE](modules.md#drag_type)
- [DEFAULT\_TIMELINE\_ZOOM](modules.md#default_timeline_zoom)
- [DEFAULT\_TIMELINE\_ZOOM\_CONFIG](modules.md#default_timeline_zoom_config)
- [DEFAULT\_TIMELINE\_TICK\_CONFIGS](modules.md#default_timeline_tick_configs)
- [DEFAULT\_ELEMENT\_COLORS](modules.md#default_element_colors)
- [AVAILABLE\_TEXT\_FONTS](modules.md#available_text_fonts)
- [TEXT\_EFFECTS](modules.md#text_effects)

## Functions

### getAnimationGif

▸ **getAnimationGif**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[packages/video-editor/src/assets/index.ts:33](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/assets/index.ts#L33)

___

### PlayerControls

▸ **PlayerControls**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`PlayerControlsProps`](interfaces/PlayerControlsProps.md) |

#### Returns

`ReactNode` \| `Promise`\<`ReactNode`\>

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:74](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L74)

___

### TimelineManager

▸ **TimelineManager**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `trackZoom` | `number` |
| › `timelineTickConfigs?` | [`TimelineTickConfig`](interfaces/TimelineTickConfig.md)[] |
| › `elementColors?` | [`ElementColors`](interfaces/ElementColors.md) |

#### Returns

`Element`

#### Defined in

[packages/video-editor/src/components/timeline/timeline-manager.tsx:7](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/timeline/timeline-manager.tsx#L7)

___

### default

▸ **default**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

VideoEditor is the main component for the Twick video editing interface.
Provides a complete video editing environment with timeline management,
player controls, and customizable panels for media, properties, and effects.

The editor consists of:
- Left panel: Media library and assets
- Center: Video player and preview
- Right panel: Properties and settings
- Bottom: Timeline and track management
- Controls: Playback controls and timeline zoom

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`VideoEditorProps`](interfaces/VideoEditorProps.md) | VideoEditor configuration and custom panels |

#### Returns

`ReactNode` \| `Promise`\<`ReactNode`\>

Complete video editing interface

**`Example`**

```jsx
import VideoEditor from '@twick/video-editor';

function MyVideoEditor() {
  return (
    <VideoEditor
      leftPanel={<MediaLibrary />}
      rightPanel={<PropertiesPanel />}
      bottomPanel={<EffectsPanel />}
      editorConfig={{
        videoProps: { width: 1920, height: 1080 },
        canvasMode: true
      }}
      defaultPlayControls={true}
    />
  );
}
```

**`Example`**

```jsx
// Minimal configuration
<VideoEditor
  editorConfig={{
    videoProps: { width: 1280, height: 720 }
  }}
/>
```

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:185](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L185)

___

### setElementColors

▸ **setElementColors**(`colors`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `colors` | `Partial`\<[`ElementColors`](interfaces/ElementColors.md)\> |

#### Returns

`void`

#### Defined in

[packages/video-editor/src/helpers/editor.utils.ts:6](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/editor.utils.ts#L6)

___

### useEditorManager

▸ **useEditorManager**(): `Object`

Custom hook for managing video editor operations.
Provides functionality to add and update timeline elements with automatic
collision detection and error handling. Integrates with live player context
to position elements at the current playback time.

#### Returns

`Object`

Object containing editor management functions

| Name | Type |
| :------ | :------ |
| `addElement` | (`element`: `TrackElement`) => `Promise`\<`void`\> |
| `updateElement` | (`element`: `TrackElement`) => `void` |

**`Example`**

```tsx
const { addElement, updateElement } = useEditorManager();

// Add a new element at current playback time
await addElement(newElement);

// Update an existing element
updateElement(modifiedElement);
```

#### Defined in

[packages/video-editor/src/hooks/use-editor-manager.tsx:31](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/hooks/use-editor-manager.tsx#L31)

___

### usePlayerControl

▸ **usePlayerControl**(): `Object`

Custom hook to manage player control state and playback.
Handles play/pause toggling and synchronization with timeline context
for video editor playback control.

#### Returns

`Object`

Object containing player control functions

| Name | Type |
| :------ | :------ |
| `togglePlayback` | () => `void` |

**`Example`**

```js
const { togglePlayback } = usePlayerControl();

// Toggle between play and pause states
togglePlayback();
```

#### Defined in

[packages/video-editor/src/hooks/use-player-control.tsx:23](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/hooks/use-player-control.tsx#L23)

___

### useTimelineControl

▸ **useTimelineControl**(): `Object`

Custom hook to manage timeline control operations.
Provides functions for deleting items, splitting elements,
and handling undo/redo operations in the video editor.

#### Returns

`Object`

Object containing timeline control functions

| Name | Type |
| :------ | :------ |
| `splitElement` | (`element`: `TrackElement`, `currentTime`: `number`) => `void` |
| `deleteItem` | (`item`: `Track` \| `TrackElement`) => `void` |
| `handleUndo` | () => `void` |
| `handleRedo` | () => `void` |

**`Example`**

```js
const { deleteItem, splitElement, handleUndo, handleRedo } = useTimelineControl();

// Delete a track or element
deleteItem(trackOrElement);

// Split an element at current time
splitElement(element, 5.5);
```

#### Defined in

[packages/video-editor/src/hooks/use-timeline-control.tsx:25](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/hooks/use-timeline-control.tsx#L25)

## Variables

### animationGifs

• `Const` **animationGifs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fade` | `string` |
| `blur` | `string` |
| `breathe-in` | `string` |
| `breathe-out` | `string` |
| `rise-down` | `string` |
| `rise-up` | `string` |
| `succession` | `string` |

#### Defined in

[packages/video-editor/src/assets/index.ts:11](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/assets/index.ts#L11)

___

### ANIMATIONS

• `Const` **ANIMATIONS**: [`Animation`](interfaces/Animation.md)[]

Collection of available animations for video editor elements.
Provides predefined animation configurations with sample previews
that can be applied to timeline elements.

**`Example`**

```js
import { ANIMATIONS } from '@twick/video-editor';

// Get all available animations
const allAnimations = ANIMATIONS;

// Find a specific animation
const fadeAnimation = ANIMATIONS.find(anim => anim.name === 'fade');

// Get animation sample
const sampleGif = fadeAnimation.getSample();

// Apply animation to element
element.setAnimation(fadeAnimation);
```

**`Example`**

```js
// Use animation with custom settings
const riseAnimation = ANIMATIONS.find(anim => anim.name === 'rise');
const customRise = {
  ...riseAnimation,
  direction: 'down',
  interval: 2
};

element.setAnimation(customRise);
```

#### Defined in

[packages/video-editor/src/helpers/animation-manager.tsx:39](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/animation-manager.tsx#L39)

___

### INITIAL\_TIMELINE\_DATA

• `Const` **INITIAL\_TIMELINE\_DATA**: `Object`

Initial timeline data structure for new video editor projects.
Provides a default timeline with a sample text element to get started.

**`Example`**

```js
import { INITIAL_TIMELINE_DATA } from '@twick/video-editor';

// Use as starting point for new projects
const newProject = {
  ...INITIAL_TIMELINE_DATA,
  tracks: [...INITIAL_TIMELINE_DATA.tracks, newTrack]
};
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `tracks` | \{ `type`: `string` = "element"; `id`: `string` = "t-sample"; `name`: `string` = "sample"; `elements`: \{ `id`: `string` = "e-sample"; `trackId`: `string` = "t-sample"; `name`: `string` = "sample"; `type`: `string` = "text"; `s`: `number` = 0; `e`: `number` = 5; `props`: \{ `text`: `string` = "Twick Video Editor"; `fill`: `string` = "#FFFFFF" }  }[]  }[] |
| `version` | `number` |

#### Defined in

[packages/video-editor/src/helpers/constants.ts:19](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/constants.ts#L19)

___

### MIN\_DURATION

• `Const` **MIN\_DURATION**: ``0.1``

Minimum duration for timeline elements in seconds.
Used to prevent elements from having zero or negative duration.

**`Example`**

```js
import { MIN_DURATION } from '@twick/video-editor';

const elementDuration = Math.max(duration, MIN_DURATION);
// Ensures element has at least 0.1 seconds duration
```

#### Defined in

[packages/video-editor/src/helpers/constants.ts:56](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/constants.ts#L56)

___

### DRAG\_TYPE

• `Const` **DRAG\_TYPE**: `Object`

Drag operation types for timeline interactions.
Defines the different phases of drag operations on timeline elements.

**`Example`**

```js
import { DRAG_TYPE } from '@twick/video-editor';

function handleDrag(type) {
  switch (type) {
    case DRAG_TYPE.START:
      // Handle drag start
      break;
    case DRAG_TYPE.MOVE:
      // Handle drag move
      break;
    case DRAG_TYPE.END:
      // Handle drag end
      break;
  }
}
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `START` | ``"start"`` | Drag operation is starting |
| `MOVE` | ``"move"`` | Drag operation is in progress |
| `END` | ``"end"`` | Drag operation has ended |

#### Defined in

[packages/video-editor/src/helpers/constants.ts:81](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/constants.ts#L81)

___

### DEFAULT\_TIMELINE\_ZOOM

• `Const` **DEFAULT\_TIMELINE\_ZOOM**: ``1.5``

Default zoom level for timeline view.
Controls the initial magnification of the timeline interface.

**`Example`**

```js
import { DEFAULT_TIMELINE_ZOOM } from '@twick/video-editor';

const [zoom, setZoom] = useState(DEFAULT_TIMELINE_ZOOM);
// Timeline starts with 1.5x zoom
```

#### Defined in

[packages/video-editor/src/helpers/constants.ts:102](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/constants.ts#L102)

___

### DEFAULT\_TIMELINE\_ZOOM\_CONFIG

• `Const` **DEFAULT\_TIMELINE\_ZOOM\_CONFIG**: `Object`

Default timeline zoom configuration including min, max, step, and default values.
Controls the zoom behavior and constraints for the timeline view.

**`Example`**

```js
import { DEFAULT_TIMELINE_ZOOM_CONFIG } from '@twick/video-editor';

// Use default zoom configuration
<VideoEditor
  editorConfig={{
    videoProps: { width: 1920, height: 1080 },
    timelineZoomConfig: DEFAULT_TIMELINE_ZOOM_CONFIG
  }}
/>
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | `number` | Minimum zoom level (10%) |
| `max` | `number` | Maximum zoom level (300%) |
| `step` | `number` | Zoom step increment/decrement (10%) |
| `default` | `number` | Default zoom level (150%) |

#### Defined in

[packages/video-editor/src/helpers/constants.ts:121](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/constants.ts#L121)

___

### DEFAULT\_TIMELINE\_TICK\_CONFIGS

• `Const` **DEFAULT\_TIMELINE\_TICK\_CONFIGS**: [`TimelineTickConfig`](interfaces/TimelineTickConfig.md)[]

Default timeline tick configurations for different duration ranges.
Defines major tick intervals and number of minor ticks between majors
to provide optimal timeline readability at various durations.

Each configuration applies when the duration is less than the specified threshold.
Configurations are ordered by duration threshold ascending.

**`Example`**

```js
import { DEFAULT_TIMELINE_TICK_CONFIGS } from '@twick/video-editor';

// Use default configurations
<VideoEditor
  editorConfig={{
    videoProps: { width: 1920, height: 1080 },
    timelineTickConfigs: DEFAULT_TIMELINE_TICK_CONFIGS
  }}
/>
```

#### Defined in

[packages/video-editor/src/helpers/constants.ts:153](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/constants.ts#L153)

___

### DEFAULT\_ELEMENT\_COLORS

• `Const` **DEFAULT\_ELEMENT\_COLORS**: [`ElementColors`](interfaces/ElementColors.md)

Default color scheme for different element types in the timeline.
Provides consistent visual distinction between various timeline elements.

**`Example`**

```js
import { DEFAULT_ELEMENT_COLORS } from '@twick/video-editor';

const videoColor = DEFAULT_ELEMENT_COLORS.video; // "#4B2E83"
const textColor = DEFAULT_ELEMENT_COLORS.text;   // "#375A7F"

// Apply colors to timeline elements
element.style.backgroundColor = DEFAULT_ELEMENT_COLORS[element.type];
```

#### Defined in

[packages/video-editor/src/helpers/constants.ts:216](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/constants.ts#L216)

___

### AVAILABLE\_TEXT\_FONTS

• `Const` **AVAILABLE\_TEXT\_FONTS**: `Object`

Available text fonts for video editor text elements.
Includes Google Fonts, display fonts, and custom CDN fonts.

**`Example`**

```js
import { AVAILABLE_TEXT_FONTS } from '@twick/video-editor';

// Use Google Fonts
const googleFont = AVAILABLE_TEXT_FONTS.ROBOTO; // "Roboto"

// Use decorative fonts
const decorativeFont = AVAILABLE_TEXT_FONTS.BANGERS; // "Bangers"

// Apply font to text element
textElement.style.fontFamily = AVAILABLE_TEXT_FONTS.POPPINS;
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `RUBIK` | ``"Rubik"`` | Modern sans-serif font |
| `MULISH` | ``"Mulish"`` | Clean and readable font |
| `LUCKIEST_GUY` | ``"Luckiest Guy"`` | Bold display font |
| `PLAYFAIR_DISPLAY` | ``"Playfair Display"`` | Elegant serif font |
| `ROBOTO` | ``"Roboto"`` | Classic sans-serif font |
| `POPPINS` | ``"Poppins"`` | Modern geometric font |
| `BANGERS` | ``"Bangers"`` | Comic-style display font |
| `BIRTHSTONE` | ``"Birthstone"`` | Handwritten-style font |
| `CORINTHIA` | ``"Corinthia"`` | Elegant script font |
| `IMPERIAL_SCRIPT` | ``"Imperial Script"`` | Formal script font |
| `KUMAR_ONE_OUTLINE` | ``"Kumar One Outline"`` | Bold outline font |
| `LONDRI_OUTLINE` | ``"Londrina Outline"`` | Light outline font |
| `MARCK_SCRIPT` | ``"Marck Script"`` | Casual script font |
| `MONTSERRAT` | ``"Montserrat"`` | Modern sans-serif font |
| `PATTAYA` | ``"Pattaya"`` | Stylish display font |
| `PERALTA` | ``"Peralta"`` | Unique display font |
| `IMPACT` | ``"Impact"`` | Bold impact font |
| `LUMANOSIMO` | ``"Lumanosimo"`` | Handwritten-style font |
| `KAPAKANA` | ``"Kapakana"`` | Custom display font |
| `HANDYRUSH` | ``"HandyRush"`` | Handwritten font |
| `DASHER` | ``"Dasher"`` | Decorative font |
| `BRITTANY_SIGNATURE` | ``"Brittany Signature"`` | Signature-style font |

#### Defined in

[packages/video-editor/src/helpers/constants.ts:264](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/constants.ts#L264)

___

### TEXT\_EFFECTS

• `Const` **TEXT\_EFFECTS**: [`TextEffect`](interfaces/TextEffect.md)[]

Collection of available text effects for video editor text elements.
Provides predefined text animation configurations that can be applied
to text elements in the timeline.

**`Example`**

```js
import { TEXT_EFFECTS } from '@twick/video-editor';

// Get all available text effects
const allTextEffects = TEXT_EFFECTS;

// Find a specific text effect
const typewriterEffect = TEXT_EFFECTS.find(effect => effect.name === 'typewriter');

// Apply text effect to element
textElement.setTextEffect(typewriterEffect);
```

**`Example`**

```js
// Use text effect with custom settings
const elasticEffect = TEXT_EFFECTS.find(effect => effect.name === 'elastic');
const customElastic = {
  ...elasticEffect,
  delay: 0.5,
  bufferTime: 0.2
};

textElement.setTextEffect(customElastic);
```

#### Defined in

[packages/video-editor/src/helpers/text-effects-manager.tsx:35](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/text-effects-manager.tsx#L35)
