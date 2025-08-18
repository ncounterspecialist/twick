[@twick/timeline](README.md) / Exports

# @twick/timeline

## Table of contents

### Classes

- [AudioElement](classes/AudioElement.md)
- [CaptionElement](classes/CaptionElement.md)
- [CircleElement](classes/CircleElement.md)
- [ElementAdder](classes/ElementAdder.md)
- [ElementAnimation](classes/ElementAnimation.md)
- [ElementCloner](classes/ElementCloner.md)
- [ElementDeserializer](classes/ElementDeserializer.md)
- [ElementFrameEffect](classes/ElementFrameEffect.md)
- [ElementRemover](classes/ElementRemover.md)
- [ElementSerializer](classes/ElementSerializer.md)
- [ElementSplitter](classes/ElementSplitter.md)
- [ElementTextEffect](classes/ElementTextEffect.md)
- [ElementUpdater](classes/ElementUpdater.md)
- [ElementValidator](classes/ElementValidator.md)
- [IconElement](classes/IconElement.md)
- [ImageElement](classes/ImageElement.md)
- [RectElement](classes/RectElement.md)
- [TextElement](classes/TextElement.md)
- [TimelineEditor](classes/TimelineEditor.md)
- [Track](classes/Track.md)
- [TrackElement](classes/TrackElement.md)
- [ValidationError](classes/ValidationError.md)
- [VideoElement](classes/VideoElement.md)

### Interfaces

- [ElementVisitor](interfaces/ElementVisitor.md)
- [SplitResult](interfaces/SplitResult.md)
- [TimelineProviderProps](interfaces/TimelineProviderProps.md)

### Type Aliases

- [Animation](modules.md#animation)
- [AudioProps](modules.md#audioprops)
- [CaptionProps](modules.md#captionprops)
- [CircleProps](modules.md#circleprops)
- [Colors](modules.md#colors)
- [ElementJSON](modules.md#elementjson)
- [Fonts](modules.md#fonts)
- [Frame](modules.md#frame)
- [FrameEffect](modules.md#frameeffect)
- [FrameEffectProps](modules.md#frameeffectprops)
- [IconProps](modules.md#iconprops)
- [ImageProps](modules.md#imageprops)
- [ObjectFit](modules.md#objectfit)
- [Position](modules.md#position)
- [ProjectJSON](modules.md#projectjson)
- [RectProps](modules.md#rectprops)
- [Size](modules.md#size)
- [SizeArray](modules.md#sizearray)
- [TextAlign](modules.md#textalign)
- [TextEffect](modules.md#texteffect)
- [TextProps](modules.md#textprops)
- [TimelineContextType](modules.md#timelinecontexttype)
- [TrackJSON](modules.md#trackjson)
- [VideoProps](modules.md#videoprops)

### Variables

- [CAPTION\_COLOR](modules.md#caption_color)
- [CAPTION\_FONT](modules.md#caption_font)
- [CAPTION\_STYLE](modules.md#caption_style)
- [CAPTION\_STYLE\_OPTIONS](modules.md#caption_style_options)
- [PLAYER\_STATE](modules.md#player_state)
- [PROCESS\_STATE](modules.md#process_state)
- [TIMELINE\_ACTION](modules.md#timeline_action)
- [TIMELINE\_ELEMENT\_TYPE](modules.md#timeline_element_type)
- [WORDS\_PER\_PHRASE](modules.md#words_per_phrase)

### Functions

- [TimelineProvider](modules.md#timelineprovider)
- [canSplitElement](modules.md#cansplitelement)
- [extractVideoAudio](modules.md#extractvideoaudio)
- [generateShortUuid](modules.md#generateshortuuid)
- [getCurrentElements](modules.md#getcurrentelements)
- [getDecimalNumber](modules.md#getdecimalnumber)
- [getTotalDuration](modules.md#gettotalduration)
- [isElementId](modules.md#iselementid)
- [isTrackId](modules.md#istrackid)
- [useTimelineContext](modules.md#usetimelinecontext)

## Type Aliases

### Animation

Ƭ **Animation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `animate?` | ``"enter"`` \| ``"exit"`` \| ``"both"`` |
| `direction?` | ``"up"`` \| ``"down"`` \| ``"left"`` \| ``"right"`` \| ``"center"`` |
| `intensity?` | `number` |
| `interval?` | `number` |
| `mode?` | ``"in"`` \| ``"out"`` |
| `name` | `string` |

#### Defined in

[packages/timeline/src/types/index.ts:129](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L129)

___

### AudioProps

Ƭ **AudioProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `loop?` | `boolean` |
| `playbackRate?` | `number` |
| `src` | `string` |
| `time?` | `number` |
| `volume?` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:62](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L62)

___

### CaptionProps

Ƭ **CaptionProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `color?` | \{ `background?`: `string` ; `highlight?`: `string` ; `text?`: `string`  } |
| `color.background?` | `string` |
| `color.highlight?` | `string` |
| `color.text?` | `string` |
| `font?` | \{ `family?`: `string` ; `fill?`: `string` ; `size?`: `number`  } |
| `font.family?` | `string` |
| `font.fill?` | `string` |
| `font.size?` | `number` |
| `pos?` | \{ `x`: `number` ; `y`: `number`  } |
| `pos.x` | `number` |
| `pos.y` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L70)

___

### CircleProps

Ƭ **CircleProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fill` | `string` |
| `radius` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:87](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L87)

___

### Colors

Ƭ **Colors**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `background?` | `string` |
| `highlight?` | `string` |
| `text?` | `string` |

#### Defined in

[packages/timeline/src/types/index.ts:1](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L1)

___

### ElementJSON

Ƭ **ElementJSON**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `animation?` | [`Animation`](modules.md#animation) |
| `backgroundColor?` | `string` |
| `e` | `number` |
| `frame?` | [`Frame`](modules.md#frame) |
| `frameEffects?` | [`FrameEffect`](modules.md#frameeffect)[] |
| `id` | `string` |
| `mediaDuration?` | `number` |
| `name` | `string` |
| `objectFit?` | [`ObjectFit`](modules.md#objectfit) |
| `props?` | \{ `[key: string]`: `any`; `capStyle?`: `string` ; `hWords?`: `Record`\<`string`, `any`\> ; `mute?`: `boolean` ; `play?`: `boolean` ; `playbackRate?`: `number` ; `size?`: [`number`, `number`] ; `src?`: `string` ; `text?`: `string` ; `time?`: `number` ; `videoFilter?`: `string`  } |
| `props.capStyle?` | `string` |
| `props.hWords?` | `Record`\<`string`, `any`\> |
| `props.mute?` | `boolean` |
| `props.play?` | `boolean` |
| `props.playbackRate?` | `number` |
| `props.size?` | [`number`, `number`] |
| `props.src?` | `string` |
| `props.text?` | `string` |
| `props.time?` | `number` |
| `props.videoFilter?` | `string` |
| `s` | `number` |
| `t?` | `string` |
| `textEffect?` | [`TextEffect`](modules.md#texteffect) |
| `trackId` | `string` |
| `trackType?` | `string` |
| `type` | `string` |

#### Defined in

[packages/timeline/src/types/index.ts:138](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L138)

___

### Fonts

Ƭ **Fonts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `family?` | `string` |
| `size?` | `number` |
| `style?` | `string` |
| `weight?` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L7)

___

### Frame

Ƭ **Frame**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fill?` | `string` |
| `size?` | [`number`, `number`] |
| `stroke?` | `string` |
| `strokeWidth?` | `number` |
| `x?` | `number` |
| `y?` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:33](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L33)

___

### FrameEffect

Ƭ **FrameEffect**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `e` | `number` |
| `props` | [`FrameEffectProps`](modules.md#frameeffectprops) |
| `s` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:52](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L52)

___

### FrameEffectProps

Ƭ **FrameEffectProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `elementPosition?` | [`Position`](modules.md#position) |
| `framePosition` | [`Position`](modules.md#position) |
| `frameShape` | ``"circle"`` \| ``"rect"`` |
| `frameSize` | [`SizeArray`](modules.md#sizearray) |
| `objectFit?` | [`ObjectFit`](modules.md#objectfit) |
| `radius?` | `number` |
| `transitionDuration?` | `number` |
| `transitionEasing?` | `string` |

#### Defined in

[packages/timeline/src/types/index.ts:42](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L42)

___

### IconProps

Ƭ **IconProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `size` | [`Size`](modules.md#size) |
| `src` | `string` |

#### Defined in

[packages/timeline/src/types/index.ts:92](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L92)

___

### ImageProps

Ƭ **ImageProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mediaFilter?` | `string` |
| `src` | `string` |

#### Defined in

[packages/timeline/src/types/index.ts:97](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L97)

___

### ObjectFit

Ƭ **ObjectFit**: ``"cover"`` \| ``"contain"`` \| ``"fill"`` \| ``"none"``

#### Defined in

[packages/timeline/src/types/index.ts:58](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L58)

___

### Position

Ƭ **Position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:14](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L14)

___

### ProjectJSON

Ƭ **ProjectJSON**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `tracks` | [`TrackJSON`](modules.md#trackjson)[] |
| `version` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:185](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L185)

___

### RectProps

Ƭ **RectProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fill` | `string` |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:102](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L102)

___

### Size

Ƭ **Size**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:26](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L26)

___

### SizeArray

Ƭ **SizeArray**: [`number`, `number`]

#### Defined in

[packages/timeline/src/types/index.ts:31](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L31)

___

### TextAlign

Ƭ **TextAlign**: ``"left"`` \| ``"center"`` \| ``"right"``

#### Defined in

[packages/timeline/src/types/index.ts:60](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L60)

___

### TextEffect

Ƭ **TextEffect**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bufferTime?` | `number` |
| `delay?` | `number` |
| `duration?` | `number` |
| `name` | `string` |

#### Defined in

[packages/timeline/src/types/index.ts:19](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L19)

___

### TextProps

Ƭ **TextProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fill?` | `string` |
| `fontFamily?` | `string` |
| `fontSize?` | `number` |
| `fontStyle?` | ``"normal"`` \| ``"italic"`` |
| `fontWeight?` | `number` |
| `lineWidth?` | `number` |
| `rotation?` | `number` |
| `stroke?` | `string` |
| `text` | `string` |
| `textAlign?` | [`TextAlign`](modules.md#textalign) |

#### Defined in

[packages/timeline/src/types/index.ts:108](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L108)

___

### TimelineContextType

Ƭ **TimelineContextType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `canRedo` | `boolean` |
| `canUndo` | `boolean` |
| `changeLog` | `number` |
| `contextId` | `string` |
| `editor` | [`TimelineEditor`](classes/TimelineEditor.md) |
| `present` | [`ProjectJSON`](modules.md#projectjson) \| ``null`` |
| `selectedItem` | [`Track`](classes/Track.md) \| [`TrackElement`](classes/TrackElement.md) \| ``null`` |
| `setSelectedItem` | (`item`: [`Track`](classes/Track.md) \| [`TrackElement`](classes/TrackElement.md) \| ``null``) => `void` |
| `setTimelineAction` | (`type`: `string`, `payload`: `any`) => `void` |
| `timelineAction` | \{ `payload`: `any` ; `type`: `string`  } |
| `timelineAction.payload` | `any` |
| `timelineAction.type` | `string` |
| `totalDuration` | `number` |

#### Defined in

[packages/timeline/src/context/timeline-context.tsx:19](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/context/timeline-context.tsx#L19)

___

### TrackJSON

Ƭ **TrackJSON**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allowOverlap?` | `boolean` |
| `elements` | [`ElementJSON`](modules.md#elementjson)[] |
| `id` | `string` |
| `name` | `string` |
| `props?` | \{ `capStyle?`: `string` ; `colors?`: [`Colors`](modules.md#colors) ; `font?`: [`Fonts`](modules.md#fonts) ; `hWords?`: `Record`\<`string`, `any`\> ; `pos?`: [`Position`](modules.md#position) ; `wordsPerPhrase?`: `number`  } |
| `props.capStyle?` | `string` |
| `props.colors?` | [`Colors`](modules.md#colors) |
| `props.font?` | [`Fonts`](modules.md#fonts) |
| `props.hWords?` | `Record`\<`string`, `any`\> |
| `props.pos?` | [`Position`](modules.md#position) |
| `props.wordsPerPhrase?` | `number` |
| `type` | `string` |

#### Defined in

[packages/timeline/src/types/index.ts:169](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L169)

___

### VideoProps

Ƭ **VideoProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mediaFilter?` | `string` |
| `playbackRate?` | `number` |
| `src` | `string` |
| `time?` | `number` |
| `volume?` | `number` |

#### Defined in

[packages/timeline/src/types/index.ts:121](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/types/index.ts#L121)

## Variables

### CAPTION\_COLOR

• `Const` **CAPTION\_COLOR**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bgColor` | `string` |
| `highlight` | `string` |
| `text` | `string` |

#### Defined in

[packages/timeline/src/utils/constants.ts:32](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/constants.ts#L32)

___

### CAPTION\_FONT

• `Const` **CAPTION\_FONT**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Defined in

[packages/timeline/src/utils/constants.ts:28](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/constants.ts#L28)

___

### CAPTION\_STYLE

• `Const` **CAPTION\_STYLE**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `WORD_BG_HIGHLIGHT` | `string` |
| `WORD_BY_WORD` | `string` |
| `WORD_BY_WORD_WITH_BG` | `string` |

#### Defined in

[packages/timeline/src/utils/constants.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/constants.ts#L7)

___

### CAPTION\_STYLE\_OPTIONS

• `Const` **CAPTION\_STYLE\_OPTIONS**: `Object`

#### Defined in

[packages/timeline/src/utils/constants.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/constants.ts#L13)

___

### PLAYER\_STATE

• `Const` **PLAYER\_STATE**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `PAUSED` | `string` |
| `PLAYING` | `string` |
| `REFRESH` | `string` |

#### Defined in

[packages/timeline/src/utils/constants.ts:1](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/constants.ts#L1)

___

### PROCESS\_STATE

• `Const` **PROCESS\_STATE**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `COMPLETED` | `string` |
| `FAILED` | `string` |
| `IDLE` | `string` |
| `PROCESSING` | `string` |

#### Defined in

[packages/timeline/src/utils/constants.ts:58](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/constants.ts#L58)

___

### TIMELINE\_ACTION

• `Const` **TIMELINE\_ACTION**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `NONE` | `string` |
| `ON_PLAYER_UPDATED` | `string` |
| `SET_PLAYER_STATE` | `string` |
| `UPDATE_PLAYER_DATA` | `string` |

#### Defined in

[packages/timeline/src/utils/constants.ts:40](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/constants.ts#L40)

___

### TIMELINE\_ELEMENT\_TYPE

• `Const` **TIMELINE\_ELEMENT\_TYPE**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AUDIO` | `string` |
| `CAPTION` | `string` |
| `CIRCLE` | `string` |
| `ICON` | `string` |
| `IMAGE` | `string` |
| `RECT` | `string` |
| `TEXT` | `string` |
| `VIDEO` | `string` |

#### Defined in

[packages/timeline/src/utils/constants.ts:47](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/constants.ts#L47)

___

### WORDS\_PER\_PHRASE

• `Const` **WORDS\_PER\_PHRASE**: ``4``

#### Defined in

[packages/timeline/src/utils/constants.ts:38](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/constants.ts#L38)

## Functions

### TimelineProvider

▸ **TimelineProvider**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`TimelineProviderProps`](interfaces/TimelineProviderProps.md) |

#### Returns

`Element`

#### Defined in

[packages/timeline/src/context/timeline-context.tsx:152](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/context/timeline-context.tsx#L152)

___

### canSplitElement

▸ **canSplitElement**(`element`, `currentTime`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TrackElement`](classes/TrackElement.md) |
| `currentTime` | `number` |

#### Returns

`boolean`

#### Defined in

[packages/timeline/src/utils/timeline.utils.ts:57](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/timeline.utils.ts#L57)

___

### extractVideoAudio

▸ **extractVideoAudio**(`tracks`, `duration`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracks` | [`Track`](classes/Track.md)[] |
| `duration` | `number` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[packages/timeline/src/utils/timeline.utils.ts:64](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/timeline.utils.ts#L64)

___

### generateShortUuid

▸ **generateShortUuid**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/utils/timeline.utils.ts:25](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/timeline.utils.ts#L25)

___

### getCurrentElements

▸ **getCurrentElements**(`currentTime`, `tracks`): `Readonly`\<[`TrackElement`](classes/TrackElement.md)\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentTime` | `number` |
| `tracks` | [`Track`](classes/Track.md)[] |

#### Returns

`Readonly`\<[`TrackElement`](classes/TrackElement.md)\>[]

#### Defined in

[packages/timeline/src/utils/timeline.utils.ts:33](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/timeline.utils.ts#L33)

___

### getDecimalNumber

▸ **getDecimalNumber**(`num`, `precision?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `num` | `number` | `undefined` |
| `precision` | `number` | `3` |

#### Returns

`number`

#### Defined in

[packages/timeline/src/utils/timeline.utils.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/timeline.utils.ts#L7)

___

### getTotalDuration

▸ **getTotalDuration**(`tracks`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracks` | [`TrackJSON`](modules.md#trackjson)[] |

#### Returns

`number`

#### Defined in

[packages/timeline/src/utils/timeline.utils.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/timeline.utils.ts#L11)

___

### isElementId

▸ **isElementId**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/timeline/src/utils/timeline.utils.ts:61](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/timeline.utils.ts#L61)

___

### isTrackId

▸ **isTrackId**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/timeline/src/utils/timeline.utils.ts:62](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/utils/timeline.utils.ts#L62)

___

### useTimelineContext

▸ **useTimelineContext**(): [`TimelineContextType`](modules.md#timelinecontexttype)

#### Returns

[`TimelineContextType`](modules.md#timelinecontexttype)

#### Defined in

[packages/timeline/src/context/timeline-context.tsx:186](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/context/timeline-context.tsx#L186)
