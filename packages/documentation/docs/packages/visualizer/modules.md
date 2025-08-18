# @twick/visualizer

## Table of contents

### Interfaces

- [Animation](interfaces/Animation.md)
- [Element](interfaces/Element.md)
- [FrameEffectPlugin](interfaces/FrameEffectPlugin.md)
- [TextEffect](interfaces/TextEffect.md)

### Type Aliases

- [AnimationParams](modules.md#animationparams)
- [AnimationProps](modules.md#animationprops)
- [Caption](modules.md#caption)
- [CaptionColors](modules.md#captioncolors)
- [CaptionFont](modules.md#captionfont)
- [CaptionProps](modules.md#captionprops)
- [CaptionStyle](modules.md#captionstyle)
- [ElementParams](modules.md#elementparams)
- [FrameEffect](modules.md#frameeffect)
- [FrameEffectParams](modules.md#frameeffectparams)
- [FrameEffectProps](modules.md#frameeffectprops)
- [FrameState](modules.md#framestate)
- [MediaType](modules.md#mediatype)
- [ObjectFit](modules.md#objectfit)
- [Position](modules.md#position)
- [Size](modules.md#size)
- [SizeArray](modules.md#sizearray)
- [SizeVector](modules.md#sizevector)
- [TextEffectParams](modules.md#texteffectparams)
- [TextEffectProps](modules.md#texteffectprops)
- [VideoInput](modules.md#videoinput)
- [VisualizerElement](modules.md#visualizerelement)
- [VisualizerTrack](modules.md#visualizertrack)

### Variables

- [scene](modules.md#scene)

## Type Aliases

### AnimationParams

Ƭ **AnimationParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `animate?` | ``"enter"`` \| ``"exit"`` \| ``"both"`` |
| `containerRef?` | `Reference`\<`any`\> |
| `direction?` | ``"left"`` \| ``"right"`` \| ``"center"`` \| ``"up"`` \| ``"down"`` |
| `duration?` | `number` |
| `elementRef` | `Reference`\<`any`\> |
| `intensity?` | `number` |
| `interval?` | `number` |
| `mode?` | ``"in"`` \| ``"out"`` |
| `view` | `View2D` |

#### Defined in

[helpers/types.ts:190](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L190)

___

### AnimationProps

Ƭ **AnimationProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `animate?` | ``"enter"`` \| ``"exit"`` \| ``"both"`` |
| `direction?` | ``"left"`` \| ``"right"`` \| ``"center"`` \| ``"up"`` \| ``"down"`` |
| `duration?` | `number` |
| `intensity?` | `number` |
| `interval?` | `number` |
| `mode?` | ``"in"`` \| ``"out"`` |
| `name` | `string` |

#### Defined in

[helpers/types.ts:202](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L202)

___

### Caption

Ƭ **Caption**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `capStyle?` | `string` |
| `e` | `number` |
| `props?` | [`CaptionProps`](modules.md#captionprops) |
| `s` | `number` |
| `t` | `string` |

#### Defined in

[helpers/types.ts:78](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L78)

___

### CaptionColors

Ƭ **CaptionColors**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `background?` | `string` |
| `highlight?` | `string` |
| `text?` | `string` |

#### Defined in

[helpers/types.ts:99](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L99)

___

### CaptionFont

Ƭ **CaptionFont**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `family?` | `string` |
| `size?` | `number` |
| `style?` | `string` |
| `weight?` | `number` |

#### Defined in

[helpers/types.ts:105](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L105)

___

### CaptionProps

Ƭ **CaptionProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bgMargin?` | [`number`, `number`] |
| `bgOffsetHeight?` | `number` |
| `bgOffsetWidth?` | `number` |
| `bgOpacity?` | `number` |
| `bgPadding?` | [`number`, `number`] |
| `bgRadius?` | `number` |
| `colors` | [`CaptionColors`](modules.md#captioncolors) |
| `font` | [`CaptionFont`](modules.md#captionfont) |
| `x?` | `number` |
| `y?` | `number` |

#### Defined in

[helpers/types.ts:86](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L86)

___

### CaptionStyle

Ƭ **CaptionStyle**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `rect` | \{ `alignItems?`: `string` ; `gap?`: `number` ; `justifyContent?`: `string` ; `padding?`: [`number`, `number`] ; `radius?`: `number`  } |
| `rect.alignItems?` | `string` |
| `rect.gap?` | `number` |
| `rect.justifyContent?` | `string` |
| `rect.padding?` | [`number`, `number`] |
| `rect.radius?` | `number` |
| `word` | \{ `bgColor?`: `string` ; `bgOffsetHeight?`: `number` ; `bgOffsetWidth?`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `fontSize`: `number` ; `fontWeight`: `number` ; `lineWidth`: `number` ; `shadowBlur?`: `number` ; `shadowColor?`: `string` ; `shadowOffset?`: `number`[] ; `stroke`: `string` ; `strokeFirst?`: `boolean`  } |
| `word.bgColor?` | `string` |
| `word.bgOffsetHeight?` | `number` |
| `word.bgOffsetWidth?` | `number` |
| `word.fill` | `string` |
| `word.fontFamily` | `string` |
| `word.fontSize` | `number` |
| `word.fontWeight` | `number` |
| `word.lineWidth` | `number` |
| `word.shadowBlur?` | `number` |
| `word.shadowColor?` | `string` |
| `word.shadowOffset?` | `number`[] |
| `word.stroke` | `string` |
| `word.strokeFirst?` | `boolean` |

#### Defined in

[helpers/types.ts:53](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L53)

___

### ElementParams

Ƭ **ElementParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `caption?` | [`Caption`](modules.md#caption) |
| `containerRef` | `Reference`\<`any`\> |
| `element?` | [`VisualizerElement`](modules.md#visualizerelement) |
| `view` | `View2D` |
| `waitOnStart?` | `boolean` |

#### Defined in

[helpers/types.ts:154](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L154)

___

### FrameEffect

Ƭ **FrameEffect**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `e` | `number` |
| `name` | `string` |
| `props` | [`FrameEffectProps`](modules.md#frameeffectprops) |
| `s` | `number` |

#### Defined in

[helpers/types.ts:35](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L35)

___

### FrameEffectParams

Ƭ **FrameEffectParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `containerRef?` | `Reference`\<`any`\> |
| `elementRef` | `Reference`\<`any`\> |
| `frameEffect` | [`FrameEffect`](modules.md#frameeffect) |
| `initFrameState` | [`FrameState`](modules.md#framestate) |

#### Defined in

[helpers/types.ts:217](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L217)

___

### FrameEffectProps

Ƭ **FrameEffectProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `elementPosition` | [`Position`](modules.md#position) |
| `framePosition` | [`Position`](modules.md#position) |
| `frameShape` | ``"circle"`` \| ``"rect"`` |
| `frameSize` | [`SizeArray`](modules.md#sizearray) |
| `objectFit` | [`ObjectFit`](modules.md#objectfit) |
| `radius` | `number` |
| `transitionDuration` | `number` |
| `transitionEasing?` | `string` |

#### Defined in

[helpers/types.ts:42](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L42)

___

### FrameState

Ƭ **FrameState**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `element` | \{ `pos`: `Vector2` ; `scale`: `Vector2` ; `size`: `Vector2`  } |
| `element.pos` | `Vector2` |
| `element.scale` | `Vector2` |
| `element.size` | `Vector2` |
| `frame` | \{ `pos`: `Vector2` ; `radius`: `number` ; `rotation`: `number` ; `scale`: `Vector2` ; `size`: `Vector2`  } |
| `frame.pos` | `Vector2` |
| `frame.radius` | `number` |
| `frame.rotation` | `number` |
| `frame.scale` | `Vector2` |
| `frame.size` | `Vector2` |

#### Defined in

[helpers/types.ts:229](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L229)

___

### MediaType

Ƭ **MediaType**: ``"video"`` \| ``"image"``

#### Defined in

[helpers/types.ts:14](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L14)

___

### ObjectFit

Ƭ **ObjectFit**: ``"contain"`` \| ``"cover"`` \| ``"fill"`` \| ``"none"``

#### Defined in

[helpers/types.ts:16](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L16)

___

### Position

Ƭ **Position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[helpers/types.ts:30](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L30)

___

### Size

Ƭ **Size**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[helpers/types.ts:23](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L23)

___

### SizeArray

Ƭ **SizeArray**: [`number`, `number`]

#### Defined in

[helpers/types.ts:28](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L28)

___

### SizeVector

Ƭ **SizeVector**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[helpers/types.ts:18](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L18)

___

### TextEffectParams

Ƭ **TextEffectParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bufferTime?` | `number` |
| `delay?` | `number` |
| `direction?` | ``"left"`` \| ``"right"`` \| ``"center"`` |
| `duration?` | `number` |
| `elementRef` | `Reference`\<`any`\> |
| `interval?` | `number` |

#### Defined in

[helpers/types.ts:167](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L167)

___

### TextEffectProps

Ƭ **TextEffectProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bufferTime?` | `number` |
| `delay?` | `number` |
| `direction?` | ``"left"`` \| ``"right"`` \| ``"center"`` |
| `duration?` | `number` |
| `interval?` | `number` |
| `name` | `string` |

#### Defined in

[helpers/types.ts:176](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L176)

___

### VideoInput

Ƭ **VideoInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `backgroundColor` | `string` |
| `playerId` | `string` |
| `properties` | \{ `height`: `number` ; `width`: `number`  } |
| `properties.height` | `number` |
| `properties.width` | `number` |
| `tracks` | [`VisualizerTrack`](modules.md#visualizertrack)[] |

#### Defined in

[helpers/types.ts:4](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L4)

___

### VisualizerElement

Ƭ **VisualizerElement**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `animation?` | [`AnimationProps`](modules.md#animationprops) |
| `backgroundColor?` | `string` |
| `e` | `number` |
| `frame?` | `any` |
| `frameEffects?` | [`FrameEffect`](modules.md#frameeffect)[] |
| `hWords?` | `any` |
| `id` | `string` |
| `objectFit?` | ``"contain"`` \| ``"cover"`` \| ``"fill"`` |
| `props?` | `any` |
| `s` | `number` |
| `scale?` | `number` |
| `t?` | `string` |
| `textEffect` | [`TextEffectProps`](modules.md#texteffectprops) |
| `trackId?` | `string` |
| `type?` | `string` |

#### Defined in

[helpers/types.ts:112](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L112)

___

### VisualizerTrack

Ƭ **VisualizerTrack**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `elements` | [`VisualizerElement`](modules.md#visualizerelement)[] |
| `id` | `string` |
| `props?` | \{ `bgOpacity?`: `number` ; `capStyle?`: `string` ; `captionProps?`: [`CaptionProps`](modules.md#captionprops) ; `colors?`: \{ `background?`: `string` ; `highlight?`: `string` ; `text?`: `string`  } ; `font?`: \{ `family?`: `string` ; `size?`: `number` ; `style?`: `string` ; `weight?`: `number`  } ; `x?`: `number` ; `y?`: `number`  } |
| `props.bgOpacity?` | `number` |
| `props.capStyle?` | `string` |
| `props.captionProps?` | [`CaptionProps`](modules.md#captionprops) |
| `props.colors?` | \{ `background?`: `string` ; `highlight?`: `string` ; `text?`: `string`  } |
| `props.colors.background?` | `string` |
| `props.colors.highlight?` | `string` |
| `props.colors.text?` | `string` |
| `props.font?` | \{ `family?`: `string` ; `size?`: `number` ; `style?`: `string` ; `weight?`: `number`  } |
| `props.font.family?` | `string` |
| `props.font.size?` | `number` |
| `props.font.style?` | `string` |
| `props.font.weight?` | `number` |
| `props.x?` | `number` |
| `props.y?` | `number` |
| `type` | `string` |

#### Defined in

[helpers/types.ts:130](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/helpers/types.ts#L130)

## Variables

### scene

• `Const` **scene**: `SceneDescription`\<`ThreadGeneratorFactory`\<`View2D`\>\>

Creates and configures the main scene for video visualization

**`Param`**

Name of the scene

**`Param`**

Generator function that handles scene setup and animation

#### Defined in

[visualizer.tsx:32](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/visualizer/src/visualizer.tsx#L32)
