# @twick/visualizer

## Table of contents

### Type Aliases

- [Caption](modules.md#caption)
- [CaptionColors](modules.md#captioncolors)
- [CaptionFont](modules.md#captionfont)
- [CaptionProps](modules.md#captionprops)
- [CaptionStyle](modules.md#captionstyle)
- [FrameEffect](modules.md#frameeffect)
- [FrameEffectProps](modules.md#frameeffectprops)
- [MediaType](modules.md#mediatype)
- [ObjectFit](modules.md#objectfit)
- [Position](modules.md#position)
- [Size](modules.md#size)
- [SizeArray](modules.md#sizearray)
- [SizeVector](modules.md#sizevector)
- [VideoInput](modules.md#videoinput)
- [VisualizerElement](modules.md#visualizerelement)
- [VisualizerTimeline](modules.md#visualizertimeline)

### Variables

- [scene](modules.md#scene)

### Functions

- [addAudioElement](modules.md#addaudioelement)
- [addCaptionElement](modules.md#addcaptionelement)
- [addCircleElement](modules.md#addcircleelement)
- [addIconElement](modules.md#addiconelement)
- [addMediaElement](modules.md#addmediaelement)
- [addRectElement](modules.md#addrectelement)
- [addTextElement](modules.md#addtextelement)
- [makeSceneElements](modules.md#makesceneelements)

## Type Aliases

### Caption

Ƭ **Caption**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `e` | `number` |
| `props?` | [`CaptionProps`](modules.md#captionprops) |
| `s` | `number` |
| `t` | `string` |

#### Defined in

[helpers/types.ts:74](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L74)

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

[helpers/types.ts:94](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L94)

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

[helpers/types.ts:100](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L100)

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

[helpers/types.ts:81](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L81)

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

[helpers/types.ts:49](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L49)

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

[helpers/types.ts:31](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L31)

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

[helpers/types.ts:38](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L38)

___

### MediaType

Ƭ **MediaType**: ``"video"`` \| ``"image"``

#### Defined in

[helpers/types.ts:10](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L10)

___

### ObjectFit

Ƭ **ObjectFit**: ``"contain"`` \| ``"cover"`` \| ``"fill"`` \| ``"none"``

#### Defined in

[helpers/types.ts:12](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L12)

___

### Position

Ƭ **Position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[helpers/types.ts:26](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L26)

___

### Size

Ƭ **Size**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[helpers/types.ts:19](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L19)

___

### SizeArray

Ƭ **SizeArray**: [`number`, `number`]

#### Defined in

[helpers/types.ts:24](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L24)

___

### SizeVector

Ƭ **SizeVector**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[helpers/types.ts:14](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L14)

___

### VideoInput

Ƭ **VideoInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `backgroundColor` | `string` |
| `properties` | \{ `height`: `number` ; `width`: `number`  } |
| `properties.height` | `number` |
| `properties.width` | `number` |
| `timeline` | [`VisualizerTimeline`](modules.md#visualizertimeline)[] |

#### Defined in

[helpers/types.ts:1](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L1)

___

### VisualizerElement

Ƭ **VisualizerElement**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `animations?` | `any`[] |
| `backgroundColor?` | `string` |
| `e` | `number` |
| `elements?` | [`VisualizerElement`](modules.md#visualizerelement)[] |
| `frame?` | `any` |
| `hWords?` | `any` |
| `id` | `string` |
| `objectFit?` | ``"contain"`` \| ``"cover"`` \| ``"fill"`` |
| `props?` | `any` |
| `s` | `number` |
| `scale?` | `number` |
| `t?` | `string` |
| `type?` | `string` |

#### Defined in

[helpers/types.ts:107](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L107)

___

### VisualizerTimeline

Ƭ **VisualizerTimeline**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `captions?` | [`Caption`](modules.md#caption)[] |
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

[helpers/types.ts:123](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/helpers/types.ts#L123)

## Variables

### scene

• `Const` **scene**: `SceneDescription`\<`ThreadGeneratorFactory`\<`View2D`\>\>

Creates and configures the main scene for video visualization

**`Param`**

Name of the scene

**`Param`**

Generator function that handles scene setup and animation

#### Defined in

[visualizer.tsx:27](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/visualizer.tsx#L27)

## Functions

### addAudioElement

▸ **addAudioElement**(`«destructured»`): `Generator`\<`any`, `void`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `containerRef` | `Reference`\<`any`\> |
| › `element` | [`VisualizerElement`](modules.md#visualizerelement) |

#### Returns

`Generator`\<`any`, `void`, `any`\>

#### Defined in

[components/element.tsx:329](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/components/element.tsx#L329)

___

### addCaptionElement

▸ **addCaptionElement**(`«destructured»`): `Generator`\<`any`, `void`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `capStyle` | `string` |
| › `caption` | [`Caption`](modules.md#caption) |
| › `captionProps` | [`CaptionProps`](modules.md#captionprops) |
| › `containerRef` | `Reference`\<`any`\> |

#### Returns

`Generator`\<`any`, `void`, `any`\>

#### Defined in

[components/element.tsx:93](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/components/element.tsx#L93)

___

### addCircleElement

▸ **addCircleElement**(`«destructured»`): `Generator`\<`any`, `void`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `containerRef` | `Reference`\<`any`\> |
| › `element` | [`VisualizerElement`](modules.md#visualizerelement) |

#### Returns

`Generator`\<`any`, `void`, `any`\>

#### Defined in

[components/element.tsx:291](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/components/element.tsx#L291)

___

### addIconElement

▸ **addIconElement**(`«destructured»`): `Generator`\<`any`, `void`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `containerRef` | `Reference`\<`any`\> |
| › `element` | [`VisualizerElement`](modules.md#visualizerelement) |

#### Returns

`Generator`\<`any`, `void`, `any`\>

#### Defined in

[components/element.tsx:310](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/components/element.tsx#L310)

___

### addMediaElement

▸ **addMediaElement**(`«destructured»`): `Generator`\<`any`, `void`, `any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | `undefined` |
| › `containerRef` | `Reference`\<`any`\> | `undefined` |
| › `element` | [`VisualizerElement`](modules.md#visualizerelement) | `undefined` |
| › `mediaType` | `string` | `undefined` |
| › `waitOnStart?` | `boolean` | `true` |

#### Returns

`Generator`\<`any`, `void`, `any`\>

#### Defined in

[components/element.tsx:22](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/components/element.tsx#L22)

___

### addRectElement

▸ **addRectElement**(`«destructured»`): `Generator`\<`any`, `void`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `containerRef` | `Reference`\<`any`\> |
| › `element` | [`VisualizerElement`](modules.md#visualizerelement) |

#### Returns

`Generator`\<`any`, `void`, `any`\>

#### Defined in

[components/element.tsx:248](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/components/element.tsx#L248)

___

### addTextElement

▸ **addTextElement**(`«destructured»`): `Generator`\<`any`, `void`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `containerRef` | `Reference`\<`any`\> |
| › `element` | [`VisualizerElement`](modules.md#visualizerelement) |

#### Returns

`Generator`\<`any`, `void`, `any`\>

#### Defined in

[components/element.tsx:267](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/components/element.tsx#L267)

___

### makeSceneElements

▸ **makeSceneElements**(`«destructured»`): `Generator`\<`any`, `void`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `containerRef` | `Reference`\<`any`\> |
| › `element` | [`VisualizerElement`](modules.md#visualizerelement) |

#### Returns

`Generator`\<`any`, `void`, `any`\>

#### Defined in

[components/element.tsx:182](https://github.com/ncounterspecialist/twick/blob/68fcb0bdb6e399ce7203b658d7134f1e7881f544/packages/visualizer/src/components/element.tsx#L182)
