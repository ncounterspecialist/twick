[@twick/canvas](README.md) / Exports

# @twick/canvas

## Table of contents

### Interfaces

- [CanvasContainerProps](interfaces/CanvasContainerProps.md)

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

- [CanvasContainer](modules.md#canvascontainer)
- [convertToCanvasPosition](modules.md#converttocanvasposition)
- [convertToVideoPosition](modules.md#converttovideoposition)
- [createCanvas](modules.md#createcanvas)
- [getCaptionElement](modules.md#getcaptionelement)
- [getCurrentFrameEffect](modules.md#getcurrentframeeffect)
- [getImageElement](modules.md#getimageelement)
- [getRectElement](modules.md#getrectelement)
- [getTextElement](modules.md#gettextelement)
- [getVideoElement](modules.md#getvideoelement)
- [reorderElementsByZIndex](modules.md#reorderelementsbyzindex)
- [useTwickCanvas](modules.md#usetwickcanvas)

## Type Aliases

### CanvasElement

Ƭ **CanvasElement**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `frame?` | \{ `radius?`: `number` ; `rotation?`: `number` ; `scaleX?`: `number` ; `scaleY?`: `number` ; `size?`: [`number`, `number`] ; `stroke?`: `string` ; `strokeWidth?`: `number` ; `x`: `number` ; `y`: `number`  } |
| `frame.radius?` | `number` |
| `frame.rotation?` | `number` |
| `frame.scaleX?` | `number` |
| `frame.scaleY?` | `number` |
| `frame.size?` | [`number`, `number`] |
| `frame.stroke?` | `string` |
| `frame.strokeWidth?` | `number` |
| `frame.x` | `number` |
| `frame.y` | `number` |
| `frameEffects?` | [`FrameEffect`](modules.md#frameeffect)[] |
| `id` | `string` |
| `name` | `string` |
| `objectFit?` | ``"contain"`` \| ``"cover"`` \| ``"fill"`` \| ``"none"`` |
| `props` | [`CanvasElementProps`](modules.md#canvaselementprops) |
| `startTime?` | `number` |
| `type` | `string` |

#### Defined in

packages/canvas/src/types.ts:42

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
| `time?` | `number` |
| `width?` | `number` |
| `x?` | `number` |
| `y?` | `number` |

#### Defined in

packages/canvas/src/types.ts:63

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

packages/canvas/src/types.ts:21

___

### CanvasProps

Ƭ **CanvasProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `backgroundColor?` | `string` |
| `canvasContainer` | `HTMLCanvasElement` \| `string` |
| `canvasSize` | `Dimensions` |
| `enableRetinaScaling?` | `boolean` |
| `selectionBorderColor?` | `string` |
| `selectionLineWidth?` | `number` |
| `touchZoomThreshold?` | `number` |
| `uniScaleTransform?` | `boolean` |
| `videoSize` | `Dimensions` |

#### Defined in

packages/canvas/src/types.ts:9

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

packages/canvas/src/types.ts:106

___

### FrameEffect

Ƭ **FrameEffect**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `e` | `number` |
| `props` | \{ `framePosition?`: \{ `x`: `number` ; `y`: `number`  } ; `frameSize?`: [`number`, `number`] ; `rotation?`: `number`  } |
| `props.framePosition?` | \{ `x`: `number` ; `y`: `number`  } |
| `props.framePosition.x` | `number` |
| `props.framePosition.y` | `number` |
| `props.frameSize?` | [`number`, `number`] |
| `props.rotation?` | `number` |
| `s` | `number` |

#### Defined in

packages/canvas/src/types.ts:29

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

packages/canvas/src/helpers/constants.ts:27

___

### disabledControl

• `Const` **disabledControl**: `Control`

#### Defined in

packages/canvas/src/components/element-controls.tsx:3

___

### rotateControl

• `Const` **rotateControl**: `Control`

#### Defined in

packages/canvas/src/components/element-controls.tsx:24

## Functions

### CanvasContainer

▸ **CanvasContainer**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`CanvasContainerProps`](interfaces/CanvasContainerProps.md) | - |
| `deprecatedLegacyContext?` | `any` | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

packages/canvas/src/components/canvas-container.tsx:10

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

packages/canvas/src/helpers/canvas.util.ts:111

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

packages/canvas/src/helpers/canvas.util.ts:131

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
| `canvas` | `FabricCanvas` |
| `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |

#### Defined in

packages/canvas/src/helpers/canvas.util.ts:21

___

### getCaptionElement

▸ **getCaptionElement**(`params`): `FabricText`\<\{ `angle`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `fontSize`: `number` ; `fontWeight`: `number` = DEFAULT\_CAPTION\_PROPS.fontWeight; `left`: `number` = x; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `shadow`: `Shadow` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `number` = y }, `SerializedTextProps`, `ObjectEvents`\>

Creates a caption element for the canvas based on provided props.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | Parameters for creating the caption. |
| `params.canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | Metadata about the canvas, including scale and dimensions. |
| `params.captionProps` | [`CaptionProps`](modules.md#captionprops) | Default and user-defined caption properties. |
| `params.element` | [`CanvasElement`](modules.md#canvaselement) | The canvas element configuration. |
| `params.index` | `number` | The z-index of the element. |

#### Returns

`FabricText`\<\{ `angle`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `fontSize`: `number` ; `fontWeight`: `number` = DEFAULT\_CAPTION\_PROPS.fontWeight; `left`: `number` = x; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `shadow`: `Shadow` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `number` = y }, `SerializedTextProps`, `ObjectEvents`\>

The configured Fabric.js caption object.

#### Defined in

packages/canvas/src/components/elements.tsx:97

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

packages/canvas/src/helpers/canvas.util.ts:150

___

### getImageElement

▸ **getImageElement**(`«destructured»`): `Promise`\<`undefined` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\> \| `Group`\>

Converts an image element into a Fabric.js image object and optionally groups it with a frame.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |
| › `element` | [`CanvasElement`](modules.md#canvaselement) |
| › `index` | `number` |

#### Returns

`Promise`\<`undefined` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\> \| `Group`\>

A Fabric.js image object or a group with an image and frame.

#### Defined in

packages/canvas/src/components/elements.tsx:251

___

### getRectElement

▸ **getRectElement**(`«destructured»`): `Rect`\<\{ `angle`: `number` ; `fill`: `string` ; `height`: `number` ; `left`: `number` = x; `opacity`: `number` ; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `rx`: `number` ; `ry`: `number` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `number` = y; `width`: `number`  }, `SerializedRectProps`, `ObjectEvents`\>

Creates a rectangular Fabric.js element based on the provided canvas element data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |
| › `element` | [`CanvasElement`](modules.md#canvaselement) |
| › `index` | `number` |

#### Returns

`Rect`\<\{ `angle`: `number` ; `fill`: `string` ; `height`: `number` ; `left`: `number` = x; `opacity`: `number` ; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `rx`: `number` ; `ry`: `number` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `number` = y; `width`: `number`  }, `SerializedRectProps`, `ObjectEvents`\>

A Fabric.js Rect object configured with the specified properties.

#### Defined in

packages/canvas/src/components/elements.tsx:459

___

### getTextElement

▸ **getTextElement**(`params`): `FabricText`\<\{ `angle`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `fontSize`: `number` ; `fontStyle`: `string` ; `fontWeight`: `string` ; `left`: `number` = x; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `shadow`: `undefined` \| `Shadow` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `number` = y }, `SerializedTextProps`, `ObjectEvents`\>

Creates a text element for the canvas.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The parameters for creating the text element. |
| `params.canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | Metadata about the canvas, including scale and dimensions. |
| `params.element` | [`CanvasElement`](modules.md#canvaselement) | The canvas element configuration. |
| `params.index` | `number` | The z-index of the element. |

#### Returns

`FabricText`\<\{ `angle`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `fontSize`: `number` ; `fontStyle`: `string` ; `fontWeight`: `string` ; `left`: `number` = x; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `shadow`: `undefined` \| `Shadow` ; `stroke`: `string` ; `strokeWidth`: `number` ; `top`: `number` = y }, `SerializedTextProps`, `ObjectEvents`\>

The configured Fabric.js text object.

#### Defined in

packages/canvas/src/components/elements.tsx:20

___

### getVideoElement

▸ **getVideoElement**(`params`): `Promise`\<`undefined` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\> \| `Group`\>

Loads a video frame as an image and returns it as a canvas element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | Parameters for creating the video element. |
| `params.canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | Metadata about the canvas, including scale and dimensions. |
| `params.currentFrameEffect?` | [`FrameEffect`](modules.md#frameeffect) | Optional frame effect to apply to the video. |
| `params.element` | [`CanvasElement`](modules.md#canvaselement) | The canvas element configuration. |
| `params.index` | `number` | The z-index of the element. |
| `params.snapTime` | `number` | - |

#### Returns

`Promise`\<`undefined` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\> \| `Group`\>

A Fabric.js image or group object for the video frame.

#### Defined in

packages/canvas/src/components/elements.tsx:177

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

packages/canvas/src/helpers/canvas.util.ts:79

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
| `addElementsToCanvas` | (`options`: \{ `captionProps?`: `any` ; `cleanAndAdd?`: `boolean` = false; `elements`: [`CanvasElement`](modules.md#canvaselement)[] ; `seekTime?`: `number` = 0 }) => `Promise`\<`void`\> |
| `intiateCanvas` | (`props`: [`CanvasProps`](modules.md#canvasprops)) => `void` |
| `onVideoSizeChange` | (`videoSize`: `Dimensions`) => `void` |
| `twickCanvas` | ``null`` \| `Canvas` |

#### Defined in

packages/canvas/src/hooks/use-twick-canvas.ts:28
