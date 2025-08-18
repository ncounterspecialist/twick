[@twick/canvas](README.md) / Exports

# @twick/canvas

## Table of contents

### Type Aliases

- [CanvasElement](modules.md#canvaselement)
- [CanvasElementProps](modules.md#canvaselementprops)
- [CanvasMetadata](modules.md#canvasmetadata)
- [CanvasProps](modules.md#canvasprops)
- [CaptionProps](modules.md#captionprops)
- [FrameEffect](modules.md#frameeffect)

### Variables

- [CANVAS\_OPERATIONS](modules.md#canvas_operations)
- [disabledControl](modules.md#disabledcontrol)
- [rotateControl](modules.md#rotatecontrol)

### Functions

- [addBackgroundColor](modules.md#addbackgroundcolor)
- [addCaptionElement](modules.md#addcaptionelement)
- [addImageElement](modules.md#addimageelement)
- [addRectElement](modules.md#addrectelement)
- [addTextElement](modules.md#addtextelement)
- [addVideoElement](modules.md#addvideoelement)
- [convertToCanvasPosition](modules.md#converttocanvasposition)
- [convertToVideoPosition](modules.md#converttovideoposition)
- [createCanvas](modules.md#createcanvas)
- [getCurrentFrameEffect](modules.md#getcurrentframeeffect)
- [reorderElementsByZIndex](modules.md#reorderelementsbyzindex)
- [useTwickCanvas](modules.md#usetwickcanvas)

## Type Aliases

### CanvasElement

Ƭ **CanvasElement**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `backgoundColor?` | `string` |
| `e?` | `number` |
| `frame?` | \{ `lineWidth?`: `number` ; `radius?`: `number` ; `rotation?`: `number` ; `scaleX?`: `number` ; `scaleY?`: `number` ; `size?`: [`number`, `number`] ; `stroke?`: `string` ; `x`: `number` ; `y`: `number`  } |
| `frame.lineWidth?` | `number` |
| `frame.radius?` | `number` |
| `frame.rotation?` | `number` |
| `frame.scaleX?` | `number` |
| `frame.scaleY?` | `number` |
| `frame.size?` | [`number`, `number`] |
| `frame.stroke?` | `string` |
| `frame.x` | `number` |
| `frame.y` | `number` |
| `frameEffects?` | [`FrameEffect`](modules.md#frameeffect)[] |
| `id` | `string` |
| `objectFit?` | ``"contain"`` \| ``"cover"`` \| ``"fill"`` \| ``"none"`` |
| `props` | [`CanvasElementProps`](modules.md#canvaselementprops) |
| `s?` | `number` |
| `t?` | `string` |
| `timelineType?` | `string` |
| `type` | `string` |

#### Defined in

[types.ts:44](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/types.ts#L44)

___

### CanvasElementProps

Ƭ **CanvasElementProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fill?` | `string` |
| `font?` | \{ `family?`: `string` ; `size?`: `number` ; `style?`: `string` ; `weight?`: `string`  } |
| `font.family?` | `string` |
| `font.size?` | `number` |
| `font.style?` | `string` |
| `font.weight?` | `string` |
| `fontFamily?` | `string` |
| `fontSize?` | `number` |
| `fontStyle?` | `string` |
| `fontWeight?` | `string` |
| `height?` | `number` |
| `lineWidth?` | `number` |
| `opacity?` | `number` |
| `playbackRate?` | `number` |
| `pos?` | \{ `x`: `number` ; `y`: `number`  } |
| `pos.x` | `number` |
| `pos.y` | `number` |
| `radius?` | `number` |
| `rotation?` | `number` |
| `scaleX?` | `number` |
| `scaleY?` | `number` |
| `shadow?` | \{ `blur`: `number` ; `color`: `string` ; `offsetX`: `number` ; `offsetY?`: `number`  } |
| `shadow.blur` | `number` |
| `shadow.color` | `string` |
| `shadow.offsetX` | `number` |
| `shadow.offsetY?` | `number` |
| `shadowBlur?` | `number` |
| `shadowColor?` | `string` |
| `shadowOffset?` | [`number`, `number`] |
| `size?` | [`number`, `number`] |
| `src?` | `string` |
| `stroke?` | `string` |
| `strokeWidth?` | `number` |
| `text?` | `string` |
| `textAlign?` | ``"left"`` \| ``"center"`` \| ``"right"`` |
| `textWrap?` | `boolean` |
| `time?` | `number` |
| `width?` | `number` |
| `x?` | `number` |
| `y?` | `number` |

#### Defined in

[types.ts:68](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/types.ts#L68)

___

### CanvasMetadata

Ƭ **CanvasMetadata**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `aspectRatio` | `number` |
| `height` | `number` |
| `scaleX` | `number` |
| `scaleY` | `number` |
| `width` | `number` |

#### Defined in

[types.ts:21](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/types.ts#L21)

___

### CanvasProps

Ƭ **CanvasProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `backgroundColor?` | `string` |
| `canvasRef` | `HTMLCanvasElement` \| `string` |
| `canvasSize` | `Dimensions` |
| `enableRetinaScaling?` | `boolean` |
| `selectionBorderColor?` | `string` |
| `selectionLineWidth?` | `number` |
| `touchZoomThreshold?` | `number` |
| `uniScaleTransform?` | `boolean` |
| `videoSize` | `Dimensions` |

#### Defined in

[types.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/types.ts#L9)

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

[types.ts:114](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/types.ts#L114)

___

### FrameEffect

Ƭ **FrameEffect**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `e` | `number` |
| `props` | \{ `framePosition?`: \{ `x`: `number` ; `y`: `number`  } ; `frameSize?`: [`number`, `number`] ; `radius?`: `number` ; `rotation?`: `number` ; `shape?`: ``"circle"`` \| ``"rect"``  } |
| `props.framePosition?` | \{ `x`: `number` ; `y`: `number`  } |
| `props.framePosition.x` | `number` |
| `props.framePosition.y` | `number` |
| `props.frameSize?` | [`number`, `number`] |
| `props.radius?` | `number` |
| `props.rotation?` | `number` |
| `props.shape?` | ``"circle"`` \| ``"rect"`` |
| `s` | `number` |

#### Defined in

[types.ts:29](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/types.ts#L29)

## Variables

### CANVAS\_OPERATIONS

• `Const` **CANVAS\_OPERATIONS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ITEM_ADDED` | `string` |
| `ITEM_DELETED` | `string` |
| `ITEM_GROUPED` | `string` |
| `ITEM_SELECTED` | `string` |
| `ITEM_UNGROUPED` | `string` |
| `ITEM_UPDATED` | `string` |

#### Defined in

[helpers/constants.ts:26](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/helpers/constants.ts#L26)

___

### disabledControl

• `Const` **disabledControl**: `Control`

#### Defined in

[components/element-controls.tsx:3](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/components/element-controls.tsx#L3)

___

### rotateControl

• `Const` **rotateControl**: `Control`

#### Defined in

[components/element-controls.tsx:24](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/components/element-controls.tsx#L24)

## Functions

### addBackgroundColor

▸ **addBackgroundColor**(`«destructured»`): `Rect`\<\{ `fill`: `string` ; `hasBorders`: ``false`` = false; `hasControls`: ``false`` = false; `height`: `number` = canvasMetadata.height; `left`: `number` ; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `selectable`: ``false`` = false; `top`: `number` ; `width`: `number` = canvasMetadata.width }, `SerializedRectProps`, `ObjectEvents`\>

Add a background color to the canvas.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `canvas` | `Canvas` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |
| › `element` | [`CanvasElement`](modules.md#canvaselement) |
| › `index` | `number` |

#### Returns

`Rect`\<\{ `fill`: `string` ; `hasBorders`: ``false`` = false; `hasControls`: ``false`` = false; `height`: `number` = canvasMetadata.height; `left`: `number` ; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `selectable`: ``false`` = false; `top`: `number` ; `width`: `number` = canvasMetadata.width }, `SerializedRectProps`, `ObjectEvents`\>

A Fabric.js Rect object configured with the specified properties.

#### Defined in

[components/elements.tsx:527](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/components/elements.tsx#L527)

___

### addCaptionElement

▸ **addCaptionElement**(`params`): `FabricText`\<\{ `angle`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `fontSize`: `number` ; `fontWeight`: `number` = DEFAULT\_CAPTION\_PROPS.fontWeight; `left`: `Position` = x; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `shadow`: `Shadow` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `Position` = y }, `SerializedTextProps`, `ObjectEvents`\>

Add a caption element for the canvas based on provided props.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | Parameters for creating the caption. |
| `params.canvas` | `Canvas` | The Fabric.js canvas instance. |
| `params.canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | Metadata about the canvas, including scale and dimensions. |
| `params.captionProps` | [`CaptionProps`](modules.md#captionprops) | Default and user-defined caption properties. |
| `params.element` | [`CanvasElement`](modules.md#canvaselement) | The canvas element configuration. |
| `params.index` | `number` | The z-index of the element. |

#### Returns

`FabricText`\<\{ `angle`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `fontSize`: `number` ; `fontWeight`: `number` = DEFAULT\_CAPTION\_PROPS.fontWeight; `left`: `Position` = x; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `shadow`: `Shadow` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `Position` = y }, `SerializedTextProps`, `ObjectEvents`\>

The configured Fabric.js caption object.

#### Defined in

[components/elements.tsx:148](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/components/elements.tsx#L148)

___

### addImageElement

▸ **addImageElement**(`«destructured»`): `Promise`\<`undefined` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\> \| `Group`\>

Add an image element into a Fabric.js image object and optionally groups it with a frame.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `canvas` | `Canvas` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |
| › `currentFrameEffect?` | [`FrameEffect`](modules.md#frameeffect) |
| › `element` | [`CanvasElement`](modules.md#canvaselement) |
| › `imageUrl?` | `string` |
| › `index` | `number` |

#### Returns

`Promise`\<`undefined` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\> \| `Group`\>

A Fabric.js image object or a group with an image and frame.

#### Defined in

[components/elements.tsx:279](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/components/elements.tsx#L279)

___

### addRectElement

▸ **addRectElement**(`«destructured»`): `Rect`\<\{ `angle`: `number` ; `fill`: `string` ; `height`: `number` ; `left`: `Position` = x; `opacity`: `number` ; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `rx`: `number` ; `ry`: `number` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `Position` = y; `width`: `number`  }, `SerializedRectProps`, `ObjectEvents`\>

Add a rectangular Fabric.js element based on the provided canvas element data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `canvas` | `Canvas` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |
| › `element` | [`CanvasElement`](modules.md#canvaselement) |
| › `index` | `number` |

#### Returns

`Rect`\<\{ `angle`: `number` ; `fill`: `string` ; `height`: `number` ; `left`: `Position` = x; `opacity`: `number` ; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `rx`: `number` ; `ry`: `number` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `Position` = y; `width`: `number`  }, `SerializedRectProps`, `ObjectEvents`\>

A Fabric.js Rect object configured with the specified properties.

#### Defined in

[components/elements.tsx:472](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/components/elements.tsx#L472)

___

### addTextElement

▸ **addTextElement**(`params`): `FabricText`\<\{ `angle`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `fontSize`: `number` ; `fontStyle`: `string` ; `fontWeight`: `string` ; `left`: `Position` = x; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `shadow`: `undefined` \| `Shadow` ; `skipWrapping`: `boolean` = false; `stroke`: `string` ; `strokeWidth`: `number` ; `textAlign`: ``"left"`` \| ``"center"`` \| ``"right"`` ; `top`: `Position` = y }, `SerializedTextProps`, `ObjectEvents`\>

Add a text element for the canvas.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The parameters for creating the text element. |
| `params.canvas` | `Canvas` | - |
| `params.canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | Metadata about the canvas, including scale and dimensions. |
| `params.element` | [`CanvasElement`](modules.md#canvaselement) | The canvas element configuration. |
| `params.index` | `number` | The z-index of the element. |

#### Returns

`FabricText`\<\{ `angle`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `fontSize`: `number` ; `fontStyle`: `string` ; `fontWeight`: `string` ; `left`: `Position` = x; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `shadow`: `undefined` \| `Shadow` ; `skipWrapping`: `boolean` = false; `stroke`: `string` ; `strokeWidth`: `number` ; `textAlign`: ``"left"`` \| ``"center"`` \| ``"right"`` ; `top`: `Position` = y }, `SerializedTextProps`, `ObjectEvents`\>

The configured Fabric.js text object.

#### Defined in

[components/elements.tsx:32](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/components/elements.tsx#L32)

___

### addVideoElement

▸ **addVideoElement**(`«destructured»`): `Promise`\<`undefined` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\> \| `Group`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `canvas` | `Canvas` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |
| › `currentFrameEffect?` | [`FrameEffect`](modules.md#frameeffect) |
| › `element` | [`CanvasElement`](modules.md#canvaselement) |
| › `index` | `number` |
| › `snapTime` | `number` |

#### Returns

`Promise`\<`undefined` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\> \| `Group`\>

#### Defined in

[components/elements.tsx:230](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/components/elements.tsx#L230)

___

### convertToCanvasPosition

▸ **convertToCanvasPosition**(`x`, `y`, `canvasMetadata`): `Position`

Converts a position from the video coordinate space to the canvas coordinate space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | X-coordinate in video space. |
| `y` | `number` | Y-coordinate in video space. |
| `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | Metadata containing canvas scaling and dimensions. |

#### Returns

`Position`

The corresponding position in canvas space.

#### Defined in

[helpers/canvas.util.ts:118](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/helpers/canvas.util.ts#L118)

___

### convertToVideoPosition

▸ **convertToVideoPosition**(`x`, `y`, `canvasMetadata`, `videoSize`): `Position`

Converts a position from the canvas coordinate space to the video coordinate space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | X-coordinate in canvas space. |
| `y` | `number` | Y-coordinate in canvas space. |
| `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | Metadata containing canvas scaling and dimensions. |
| `videoSize` | `Dimensions` | Dimensions of the video. |

#### Returns

`Position`

The corresponding position in video space.

#### Defined in

[helpers/canvas.util.ts:138](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/helpers/canvas.util.ts#L138)

___

### createCanvas

▸ **createCanvas**(`«destructured»`): `Object`

Creates and initializes a Fabric.js canvas with specified configurations.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`CanvasProps`](modules.md#canvasprops) |

#### Returns

`Object`

An object containing the initialized canvas and its metadata.

| Name | Type |
| :------ | :------ |
| `canvas` | `Canvas` |
| `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |

#### Defined in

[helpers/canvas.util.ts:22](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/helpers/canvas.util.ts#L22)

___

### getCurrentFrameEffect

▸ **getCurrentFrameEffect**(`item`, `seekTime`): `any`

Retrieves the current frame effect for a given seek time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `any` | The item containing frame effects. |
| `seekTime` | `number` | The current time to match against frame effects. |

#### Returns

`any`

The current frame effect active at the given seek time, if any.

#### Defined in

[helpers/canvas.util.ts:157](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/helpers/canvas.util.ts#L157)

___

### reorderElementsByZIndex

▸ **reorderElementsByZIndex**(`canvas`): `void`

Reorders elements on the canvas based on their zIndex property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `canvas` | `Canvas` | The Fabric.js canvas instance. |

#### Returns

`void`

#### Defined in

[helpers/canvas.util.ts:83](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/helpers/canvas.util.ts#L83)

___

### useTwickCanvas

▸ **useTwickCanvas**(`«destructured»`): `Object`

Custom hook to manage a Fabric.js canvas and associated operations.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `onCanvasOperation?` | (`operation`: `string`, `data`: `any`) => `void` |
| › `onCanvasReady?` | (`canvas`: `Canvas`) => `void` |

#### Returns

`Object`

Canvas-related functions and state.

| Name | Type |
| :------ | :------ |
| `addElementToCanvas` | (`options`: \{ `captionProps?`: `any` ; `element`: [`CanvasElement`](modules.md#canvaselement) ; `index`: `number` ; `reorder`: `boolean` = true; `seekTime?`: `number`  }) => `Promise`\<`void`\> |
| `buildCanvas` | (`props`: [`CanvasProps`](modules.md#canvasprops)) => `void` |
| `onVideoSizeChange` | (`videoSize`: `Dimensions`) => `void` |
| `setCanvasElements` | (`options`: \{ `captionProps?`: `any` ; `cleanAndAdd?`: `boolean` = false; `elements`: [`CanvasElement`](modules.md#canvaselement)[] ; `seekTime?`: `number` = 0 }) => `Promise`\<`void`\> |
| `twickCanvas` | ``null`` \| `Canvas` |

#### Defined in

[hooks/use-twick-canvas.ts:29](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/canvas/src/hooks/use-twick-canvas.ts#L29)
