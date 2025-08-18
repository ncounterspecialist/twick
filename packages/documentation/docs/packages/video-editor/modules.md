[@twick/video-editor](README.md) / Exports

# @twick/video-editor

## Table of contents

### Classes

- [BaseMediaManager](classes/BaseMediaManager.md)
- [BrowserMediaManager](classes/BrowserMediaManager.md)

### Type Aliases

- [Animation](modules.md#animation)
- [MediaItem](modules.md#mediaitem)
- [PaginationOptions](modules.md#paginationoptions)
- [SearchOptions](modules.md#searchoptions)

### Variables

- [ANIMATIONS](modules.md#animations)
- [AVAILABLE\_TEXT\_FONTS](modules.md#available_text_fonts)
- [DEFAULT\_ELEMENT\_COLORS](modules.md#default_element_colors)
- [DEFAULT\_TIMELINE\_ZOOM](modules.md#default_timeline_zoom)
- [DRAG\_TYPE](modules.md#drag_type)
- [INITIAL\_TIMELINE\_DATA](modules.md#initial_timeline_data)
- [MIN\_DURATION](modules.md#min_duration)
- [TEXT\_EFFECTS](modules.md#text_effects)
- [animationGifs](modules.md#animationgifs)

### Functions

- [PlayerControls](modules.md#playercontrols)
- [TimelineManager](modules.md#timelinemanager)
- [default](modules.md#default)
- [getAnimationGif](modules.md#getanimationgif)
- [usePlayerControl](modules.md#useplayercontrol)
- [useTimelineControl](modules.md#usetimelinecontrol)

## Type Aliases

### Animation

Ƭ **Animation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `animate?` | ``"enter"`` \| ``"exit"`` \| ``"both"`` |
| `direction?` | ``"up"`` \| ``"down"`` \| ``"left"`` \| ``"right"`` \| ``"center"`` |
| `getSample` | (`animation?`: [`Animation`](modules.md#animation)) => `string` |
| `interval?` | `number` |
| `mode?` | ``"in"`` \| ``"out"`` |
| `name` | `string` |
| `options?` | \{ `animate?`: `string`[] ; `direction?`: `string`[] ; `mode?`: `string`[]  } |
| `options.animate?` | `string`[] |
| `options.direction?` | `string`[] |
| `options.mode?` | `string`[] |

#### Defined in

[packages/video-editor/src/helpers/types.ts:27](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/types.ts#L27)

___

### MediaItem

Ƭ **MediaItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `arrayBuffer?` | `ArrayBuffer` |
| `id` | `string` |
| `metadata?` | `Record`\<`string`, `any`\> |
| `thumbnail?` | `string` |
| `type` | ``"image"`` \| ``"video"`` \| ``"audio"`` |
| `url` | `string` |

#### Defined in

[packages/video-editor/src/helpers/types.ts:1](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/types.ts#L1)

___

### PaginationOptions

Ƭ **PaginationOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `limit` | `number` |
| `page` | `number` |

#### Defined in

[packages/video-editor/src/helpers/types.ts:10](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/types.ts#L10)

___

### SearchOptions

Ƭ **SearchOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `metadata?` | `Record`\<`string`, `any`\> |
| `query` | `string` |
| `type?` | ``"image"`` \| ``"video"`` \| ``"audio"`` |

#### Defined in

[packages/video-editor/src/helpers/types.ts:15](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/types.ts#L15)

## Variables

### ANIMATIONS

• `Const` **ANIMATIONS**: [`Animation`](modules.md#animation)[]

#### Defined in

[packages/video-editor/src/helpers/animation-manager.tsx:4](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/animation-manager.tsx#L4)

___

### AVAILABLE\_TEXT\_FONTS

• `Const` **AVAILABLE\_TEXT\_FONTS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BANGERS` | `string` |
| `BIRTHSTONE` | `string` |
| `BRITTANY_SIGNATURE` | `string` |
| `CORINTHIA` | `string` |
| `DASHER` | `string` |
| `HANDYRUSH` | `string` |
| `IMPACT` | `string` |
| `IMPERIAL_SCRIPT` | `string` |
| `KAPAKANA` | `string` |
| `KUMAR_ONE_OUTLINE` | `string` |
| `LONDRI_OUTLINE` | `string` |
| `LUCKIEST_GUY` | `string` |
| `LUMANOSIMO` | `string` |
| `MARCK_SCRIPT` | `string` |
| `MONTSERRAT` | `string` |
| `MULISH` | `string` |
| `PATTAYA` | `string` |
| `PERALTA` | `string` |
| `PLAYFAIR_DISPLAY` | `string` |
| `POPPINS` | `string` |
| `ROBOTO` | `string` |
| `RUBIK` | `string` |

#### Defined in

[packages/video-editor/src/helpers/constants.ts:53](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/constants.ts#L53)

___

### DEFAULT\_ELEMENT\_COLORS

• `Const` **DEFAULT\_ELEMENT\_COLORS**: `ElementColors`

#### Defined in

[packages/video-editor/src/helpers/constants.ts:38](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/constants.ts#L38)

___

### DEFAULT\_TIMELINE\_ZOOM

• `Const` **DEFAULT\_TIMELINE\_ZOOM**: ``1.5``

#### Defined in

[packages/video-editor/src/helpers/constants.ts:36](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/constants.ts#L36)

___

### DRAG\_TYPE

• `Const` **DRAG\_TYPE**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `END` | `string` |
| `MOVE` | `string` |
| `START` | `string` |

#### Defined in

[packages/video-editor/src/helpers/constants.ts:30](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/constants.ts#L30)

___

### INITIAL\_TIMELINE\_DATA

• `Const` **INITIAL\_TIMELINE\_DATA**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `tracks` | \{ `elements`: \{ `e`: `number` = 5; `id`: `string` = "e-sample"; `name`: `string` = "sample"; `props`: \{ `fill`: `string` = "#FFFFFF"; `text`: `string` = "Twick Video Editor" } ; `s`: `number` = 0; `trackId`: `string` = "t-sample"; `type`: `string` = "text" }[] ; `id`: `string` = "t-sample"; `name`: `string` = "sample"; `type`: `string` = "element" }[] |
| `version` | `number` |

#### Defined in

[packages/video-editor/src/helpers/constants.ts:3](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/constants.ts#L3)

___

### MIN\_DURATION

• `Const` **MIN\_DURATION**: ``0.1``

#### Defined in

[packages/video-editor/src/helpers/constants.ts:28](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/constants.ts#L28)

___

### TEXT\_EFFECTS

• `Const` **TEXT\_EFFECTS**: `TextEffect`[]

#### Defined in

[packages/video-editor/src/helpers/text-effects-manager.tsx:3](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/helpers/text-effects-manager.tsx#L3)

___

### animationGifs

• `Const` **animationGifs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blur` | `string` |
| `breathe-in` | `string` |
| `breathe-out` | `string` |
| `fade` | `string` |
| `rise-down` | `string` |
| `rise-up` | `string` |
| `succession` | `string` |

#### Defined in

[packages/video-editor/src/assets/index.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/assets/index.ts#L11)

## Functions

### PlayerControls

▸ **PlayerControls**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `PlayerControlsProps` | - |
| `deprecatedLegacyContext?` | `any` | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:23](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/components/controls/player-controls.tsx#L23)

___

### TimelineManager

▸ **TimelineManager**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `timelineControls?` | `ReactNode` |
| › `trackZoom` | `number` |

#### Returns

`Element`

#### Defined in

[packages/video-editor/src/components/timeline/timeline-manager.tsx:5](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/components/timeline/timeline-manager.tsx#L5)

___

### default

▸ **default**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `VideoEditorProps` | - |
| `deprecatedLegacyContext?` | `any` | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:23](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/components/video-editor.tsx#L23)

___

### getAnimationGif

▸ **getAnimationGif**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[packages/video-editor/src/assets/index.ts:33](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/assets/index.ts#L33)

___

### usePlayerControl

▸ **usePlayerControl**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `togglePlayback` | () => `void` |

#### Defined in

[packages/video-editor/src/hooks/use-player-control.tsx:8](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/hooks/use-player-control.tsx#L8)

___

### useTimelineControl

▸ **useTimelineControl**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `deleteItem` | (`item`: `TrackElement` \| `Track`) => `void` |
| `handleRedo` | () => `void` |
| `handleUndo` | () => `void` |
| `splitElement` | (`element`: `TrackElement`, `currentTime`: `number`) => `void` |

#### Defined in

[packages/video-editor/src/hooks/use-timeline-control.tsx:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/video-editor/src/hooks/use-timeline-control.tsx#L7)
