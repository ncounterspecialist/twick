# @twick/canvas - v0.15.0

## Table of contents

### Classes

- [ElementController](classes/ElementController.md)

### Functions

- [addTextElement](modules.md#addtextelement)
- [addCaptionElement](modules.md#addcaptionelement)
- [addVideoElement](modules.md#addvideoelement)
- [addImageElement](modules.md#addimageelement)
- [addRectElement](modules.md#addrectelement)
- [addBackgroundColor](modules.md#addbackgroundcolor)
- [createCanvas](modules.md#createcanvas)
- [reorderElementsByZIndex](modules.md#reorderelementsbyzindex)
- [convertToCanvasPosition](modules.md#converttocanvasposition)
- [convertToVideoPosition](modules.md#converttovideoposition)
- [getCurrentFrameEffect](modules.md#getcurrentframeeffect)
- [useTwickCanvas](modules.md#usetwickcanvas)

### Type Aliases

- [CanvasProps](modules.md#canvasprops)
- [CanvasMetadata](modules.md#canvasmetadata)
- [FrameEffect](modules.md#frameeffect)
- [CanvasElement](modules.md#canvaselement)
- [CanvasElementProps](modules.md#canvaselementprops)
- [CaptionProps](modules.md#captionprops)
- [BuildCanvasOptions](modules.md#buildcanvasoptions)
- [AddElementToCanvasOptions](modules.md#addelementtocanvasoptions)
- [SetCanvasElementsOptions](modules.md#setcanvaselementsoptions)
- [AddWatermarkToCanvasOptions](modules.md#addwatermarktocanvasoptions)
- [ResizeCanvasOptions](modules.md#resizecanvasoptions)
- [CanvasElementAddParams](modules.md#canvaselementaddparams)
- [CanvasElementUpdateContext](modules.md#canvaselementupdatecontext)
- [CanvasElementUpdateResult](modules.md#canvaselementupdateresult)
- [WatermarkUpdatePayload](modules.md#watermarkupdatepayload)
- [CanvasElementHandler](modules.md#canvaselementhandler)

### Variables

- [disabledControl](modules.md#disabledcontrol)
- [rotateControl](modules.md#rotatecontrol)
- [elementController](modules.md#elementcontroller)
- [CANVAS\_OPERATIONS](modules.md#canvas_operations)
- [ELEMENT\_TYPES](modules.md#element_types)

## Functions

### addTextElement

▸ **addTextElement**(`«destructured»`): `Textbox`\<\{ `left`: `Position` = x; `top`: `Position` = y; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `angle`: `number` ; `fontSize`: `number` ; `fontFamily`: `string` ; `fontStyle`: `string` ; `fontWeight`: `string` ; `fill`: `string` ; `opacity`: `number` ; `width`: `number` ; `splitByGrapheme`: ``false`` = false; `textAlign`: ``"left"`` \| ``"center"`` \| ``"right"`` ; `stroke`: `string` ; `strokeWidth`: `number` ; `backgroundColor`: `undefined` \| `string` ; `shadow`: `undefined` \| `Shadow`  }, `SerializedTextboxProps`, `ITextEvents`\>

Add a text element to the canvas.
Creates and configures a Fabric.js Textbox object with specified properties
including position, styling, interactive controls, and text wrapping support.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `element` | [`CanvasElement`](modules.md#canvaselement) |
| › `index` | `number` |
| › `canvas` | `Canvas` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |

#### Returns

`Textbox`\<\{ `left`: `Position` = x; `top`: `Position` = y; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `angle`: `number` ; `fontSize`: `number` ; `fontFamily`: `string` ; `fontStyle`: `string` ; `fontWeight`: `string` ; `fill`: `string` ; `opacity`: `number` ; `width`: `number` ; `splitByGrapheme`: ``false`` = false; `textAlign`: ``"left"`` \| ``"center"`` \| ``"right"`` ; `stroke`: `string` ; `strokeWidth`: `number` ; `backgroundColor`: `undefined` \| `string` ; `shadow`: `undefined` \| `Shadow`  }, `SerializedTextboxProps`, `ITextEvents`\>

The configured Fabric.js Textbox object with text wrapping enabled

**`Example`**

```js
const textElement = addTextElement({
  element: { id: "text1", props: { text: "Hello", x: 100, y: 100, width: 200 } },
  index: 1,
  canvas: fabricCanvas,
  canvasMetadata: { scaleX: 1, scaleY: 1, width: 800, height: 600 }
});
```

#### Defined in

[components/elements.tsx:51](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/components/elements.tsx#L51)

___

### addCaptionElement

▸ **addCaptionElement**(`«destructured»`): `Textbox`\<\{ `left`: `Position` = x; `top`: `Position` = y; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `angle`: `number` ; `fontSize`: `number` ; `fontFamily`: `string` ; `fill`: `string` ; `fontWeight`: `string` \| `number` ; `stroke`: `string` ; `opacity`: `number` ; `width`: `number` ; `splitByGrapheme`: ``false`` = false; `textAlign`: ``"left"`` \| ``"center"`` \| ``"right"`` ; `shadow`: `Shadow` ; `strokeWidth`: `number`  }, `SerializedTextboxProps`, `ITextEvents`\>

Add a caption element to the canvas based on provided props.
Creates a Fabric.js Textbox with caption-specific styling including
shadows, positioning, font properties, and text wrapping (same as text element).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | `undefined` |
| › `element` | [`CanvasElement`](modules.md#canvaselement) | `undefined` |
| › `index` | `number` | `undefined` |
| › `canvas` | `Canvas` | `undefined` |
| › `captionProps` | [`CaptionProps`](modules.md#captionprops) | `undefined` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | `undefined` |
| › `lockAspectRatio?` | `boolean` | `false` |

#### Returns

`Textbox`\<\{ `left`: `Position` = x; `top`: `Position` = y; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `angle`: `number` ; `fontSize`: `number` ; `fontFamily`: `string` ; `fill`: `string` ; `fontWeight`: `string` \| `number` ; `stroke`: `string` ; `opacity`: `number` ; `width`: `number` ; `splitByGrapheme`: ``false`` = false; `textAlign`: ``"left"`` \| ``"center"`` \| ``"right"`` ; `shadow`: `Shadow` ; `strokeWidth`: `number`  }, `SerializedTextboxProps`, `ITextEvents`\>

The configured Fabric.js Textbox caption object with wrapping enabled

**`Example`**

```js
const captionElement = addCaptionElement({
  element: { id: "caption1", props: { text: "Caption", x: 100, y: 100, width: 200 } },
  index: 3,
  canvas: fabricCanvas,
  captionProps: { font: { size: 24, family: "Arial" } },
  canvasMetadata: { scaleX: 1, scaleY: 1, width: 800, height: 600 }
});
```

#### Defined in

[components/elements.tsx:239](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/components/elements.tsx#L239)

___

### addVideoElement

▸ **addVideoElement**(`«destructured»`): `Promise`\<`undefined` \| `Group` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\>\>

Add a video frame as element into a Fabric.js image object and optionally groups it with a frame.
Creates a video element by extracting a frame at the specified time and applying
optional frame effects for enhanced visual presentation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `element` | [`CanvasElement`](modules.md#canvaselement) |
| › `index` | `number` |
| › `canvas` | `Canvas` |
| › `snapTime` | `number` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |
| › `currentFrameEffect?` | [`FrameEffect`](modules.md#frameeffect) |

#### Returns

`Promise`\<`undefined` \| `Group` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\>\>

A Fabric.js image object or a group with an image and frame

**`Example`**

```js
const videoElement = await addVideoElement({
  element: {
    id: "video1",
    props: { src: "video.mp4", x: 100, y: 100 }
  },
  index: 2,
  canvas: fabricCanvas,
  snapTime: 5.0,
  canvasMetadata: { scaleX: 1, scaleY: 1, width: 800, height: 600 },
  currentFrameEffect: { shape: "circle", radius: 50 }
});
```

#### Defined in

[components/elements.tsx:372](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/components/elements.tsx#L372)

___

### addImageElement

▸ **addImageElement**(`«destructured»`): `Promise`\<`undefined` \| `Group` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\>\>

Add an image element to the canvas and optionally group it with a frame.
Loads an image from URL and creates a Fabric.js image object with proper
positioning, scaling, and optional frame effects.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `«destructured»` | `Object` | `undefined` | - |
| › `imageUrl?` | `string` | `undefined` | - |
| › `element` | [`CanvasElement`](modules.md#canvaselement) | `undefined` | - |
| › `index` | `number` | `undefined` | - |
| › `canvas` | `Canvas` | `undefined` | - |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | `undefined` | - |
| › `currentFrameEffect?` | [`FrameEffect`](modules.md#frameeffect) | `undefined` | - |
| › `lockAspectRatio?` | `boolean` | `true` | When true, resize keeps aspect ratio (uniform scaling). Default true for images. |

#### Returns

`Promise`\<`undefined` \| `Group` \| `FabricImage`\<`Partial`\<`ImageProps`\>, `SerializedImageProps`, `ObjectEvents`\>\>

A Fabric.js image object or a group with an image and frame

**`Example`**

```js
const imageElement = await addImageElement({
  imageUrl: "https://example.com/image.jpg",
  element: { id: "img1", props: { src: "image.jpg", width: 200, height: 150 } },
  index: 4,
  canvas: fabricCanvas,
  canvasMetadata: { scaleX: 1, scaleY: 1, width: 800, height: 600 }
});
```

#### Defined in

[components/elements.tsx:434](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/components/elements.tsx#L434)

___

### addRectElement

▸ **addRectElement**(`«destructured»`): `Rect`\<\{ `left`: `Position` = x; `top`: `Position` = y; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `angle`: `number` ; `rx`: `number` ; `ry`: `number` ; `stroke`: `string` ; `strokeWidth`: `number` ; `fill`: `string` ; `opacity`: `number` ; `width`: `number` ; `height`: `number`  }, `SerializedRectProps`, `ObjectEvents`\>

Add a rectangular element to the canvas.
Creates a Fabric.js rectangle with specified properties including
position, size, styling, and interactive controls.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | `undefined` |
| › `element` | [`CanvasElement`](modules.md#canvaselement) | `undefined` |
| › `index` | `number` | `undefined` |
| › `canvas` | `Canvas` | `undefined` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | `undefined` |
| › `lockAspectRatio?` | `boolean` | `false` |

#### Returns

`Rect`\<\{ `left`: `Position` = x; `top`: `Position` = y; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `angle`: `number` ; `rx`: `number` ; `ry`: `number` ; `stroke`: `string` ; `strokeWidth`: `number` ; `fill`: `string` ; `opacity`: `number` ; `width`: `number` ; `height`: `number`  }, `SerializedRectProps`, `ObjectEvents`\>

A Fabric.js Rect object configured with the specified properties

**`Example`**

```js
const rectElement = addRectElement({
  element: { id: "rect1", props: { width: 100, height: 50, x: 200, y: 150 } },
  index: 6,
  canvas: fabricCanvas,
  canvasMetadata: { scaleX: 1, scaleY: 1, width: 800, height: 600 }
});
```

#### Defined in

[components/elements.tsx:658](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/components/elements.tsx#L658)

___

### addBackgroundColor

▸ **addBackgroundColor**(`«destructured»`): `Rect`\<\{ `width`: `number` = canvasMetadata.width; `height`: `number` = canvasMetadata.height; `left`: `number` ; `top`: `number` ; `fill`: `string` ; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `hasControls`: ``false`` = false; `hasBorders`: ``false`` = false; `selectable`: ``false`` = false }, `SerializedRectProps`, `ObjectEvents`\>

Add a background color to the canvas.
Creates a full-canvas rectangle with the specified background color
that serves as the base layer for other elements.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `element` | [`CanvasElement`](modules.md#canvaselement) |
| › `index` | `number` |
| › `canvas` | `Canvas` |
| › `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |

#### Returns

`Rect`\<\{ `width`: `number` = canvasMetadata.width; `height`: `number` = canvasMetadata.height; `left`: `number` ; `top`: `number` ; `fill`: `string` ; `originX`: ``"center"`` = "center"; `originY`: ``"center"`` = "center"; `hasControls`: ``false`` = false; `hasBorders`: ``false`` = false; `selectable`: ``false`` = false }, `SerializedRectProps`, `ObjectEvents`\>

A Fabric.js Rect object configured with the specified properties

**`Example`**

```js
const bgElement = addBackgroundColor({
  element: { id: "bg1", backgoundColor: "#ffffff" },
  index: 0,
  canvas: fabricCanvas,
  canvasMetadata: { scaleX: 1, scaleY: 1, width: 800, height: 600 }
});
```

#### Defined in

[components/elements.tsx:775](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/components/elements.tsx#L775)

___

### createCanvas

▸ **createCanvas**(`«destructured»`): `Object`

Creates and initializes a Fabric.js canvas with specified configurations.
Sets up a canvas with proper scaling, background, and interaction settings
based on the provided video and canvas dimensions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`CanvasProps`](modules.md#canvasprops) |

#### Returns

`Object`

Object containing the initialized canvas and its metadata

| Name | Type |
| :------ | :------ |
| `canvas` | `Canvas` |
| `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |

**`Example`**

```js
const { canvas, canvasMetadata } = createCanvas({
  videoSize: { width: 1920, height: 1080 },
  canvasSize: { width: 800, height: 600 },
  canvasRef: canvasElement,
  backgroundColor: "#000000",
  selectionBorderColor: "#2563eb"
});
```

#### Defined in

[helpers/canvas.util.ts:33](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/helpers/canvas.util.ts#L33)

___

### reorderElementsByZIndex

▸ **reorderElementsByZIndex**(`canvas`): `void`

Reorders elements on the canvas based on their zIndex property.
Sorts all canvas objects by their zIndex and re-adds them to maintain
proper layering order for visual elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `canvas` | `Canvas` | The Fabric.js canvas instance |

#### Returns

`void`

**`Example`**

```js
reorderElementsByZIndex(canvas);
// Elements are now properly layered based on zIndex
```

#### Defined in

[helpers/canvas.util.ts:143](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/helpers/canvas.util.ts#L143)

___

### convertToCanvasPosition

▸ **convertToCanvasPosition**(`x`, `y`, `canvasMetadata`): `Position`

Converts a position from the video coordinate space to the canvas coordinate space.
Applies scaling and centering transformations to map video coordinates
to the corresponding canvas pixel positions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | X-coordinate in video space |
| `y` | `number` | Y-coordinate in video space |
| `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | Metadata containing canvas scaling and dimensions |

#### Returns

`Position`

Object containing the corresponding position in canvas space

**`Example`**

```js
const canvasPos = convertToCanvasPosition(100, 200, canvasMetadata);
// canvasPos = { x: 450, y: 500 }
```

#### Defined in

[helpers/canvas.util.ts:272](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/helpers/canvas.util.ts#L272)

___

### convertToVideoPosition

▸ **convertToVideoPosition**(`x`, `y`, `canvasMetadata`, `videoSize`): `Position`

Converts a position from the canvas coordinate space to the video coordinate space.
Applies inverse scaling and centering transformations to map canvas coordinates
back to the corresponding video coordinate positions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | X-coordinate in canvas space |
| `y` | `number` | Y-coordinate in canvas space |
| `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | Metadata containing canvas scaling and dimensions |
| `videoSize` | `Dimensions` | Dimensions of the video |

#### Returns

`Position`

Object containing the corresponding position in video space

**`Example`**

```js
const videoPos = convertToVideoPosition(450, 500, canvasMetadata, videoSize);
// videoPos = { x: 100, y: 200 }
```

#### Defined in

[helpers/canvas.util.ts:331](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/helpers/canvas.util.ts#L331)

___

### getCurrentFrameEffect

▸ **getCurrentFrameEffect**(`item`, `seekTime`): `any`

Retrieves the current frame effect for a given seek time.
Searches through the item's frame effects to find the one that is active
at the specified seek time based on start and end time ranges.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `any` | The item containing frame effects |
| `seekTime` | `number` | The current time to match against frame effects |

#### Returns

`any`

The current frame effect active at the given seek time, or undefined if none found

**`Example`**

```js
const currentEffect = getCurrentFrameEffect(videoElement, 5.5);
// Returns the frame effect active at 5.5 seconds, if any
```

#### Defined in

[helpers/canvas.util.ts:374](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/helpers/canvas.util.ts#L374)

___

### useTwickCanvas

▸ **useTwickCanvas**(`«destructured»`): `Object`

Custom hook to manage a Fabric.js canvas and associated operations.
Provides functionality for canvas initialization, element management,
and event handling for interactive canvas operations.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | `undefined` |
| › `onCanvasReady?` | (`canvas`: `Canvas`) => `void` | `undefined` |
| › `onCanvasOperation?` | (`operation`: `string`, `data`: `any`) => `void` | `undefined` |
| › `enableShiftAxisLock?` | `boolean` | `false` |

#### Returns

`Object`

Object containing canvas-related functions and state

| Name | Type |
| :------ | :------ |
| `twickCanvas` | ``null`` \| `Canvas` |
| `buildCanvas` | (`props`: [`BuildCanvasOptions`](modules.md#buildcanvasoptions)) => `void` |
| `resizeCanvas` | (`canvasSize`: [`ResizeCanvasOptions`](modules.md#resizecanvasoptions)) => `void` |
| `onVideoSizeChange` | (`videoSize`: `Dimensions`) => `void` |
| `addWatermarkToCanvas` | (`__namedParameters`: [`AddWatermarkToCanvasOptions`](modules.md#addwatermarktocanvasoptions)) => `void` |
| `addElementToCanvas` | (`options`: [`AddElementToCanvasOptions`](modules.md#addelementtocanvasoptions)) => `Promise`\<`void`\> |
| `setCanvasElements` | (`options`: [`SetCanvasElementsOptions`](modules.md#setcanvaselementsoptions)) => `Promise`\<`void`\> |
| `bringToFront` | (`elementId`: `string`) => `boolean` |
| `sendToBack` | (`elementId`: `string`) => `boolean` |
| `bringForward` | (`elementId`: `string`) => `boolean` |
| `sendBackward` | (`elementId`: `string`) => `boolean` |

**`Example`**

```js
const { twickCanvas, buildCanvas, addElementToCanvas } = useTwickCanvas({
  onCanvasReady: (canvas) => console.log('Canvas ready:', canvas),
  onCanvasOperation: (operation, data) => console.log('Operation:', operation, data)
});
```

#### Defined in

[hooks/use-twick-canvas.ts:43](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/hooks/use-twick-canvas.ts#L43)

## Type Aliases

### CanvasProps

Ƭ **CanvasProps**: `Object`

Configuration properties for creating and initializing a canvas.
Defines the video and canvas dimensions, styling options, and interaction settings.

**`Example`**

```js
const canvasProps: CanvasProps = {
  videoSize: { width: 1920, height: 1080 },
  canvasSize: { width: 800, height: 600 },
  canvasRef: canvasElement,
  backgroundColor: "#000000",
  selectionBorderColor: "#2563eb",
  selectionLineWidth: 2,
  uniScaleTransform: true,
  enableRetinaScaling: true,
  touchZoomThreshold: 10
};
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoSize` | `Dimensions` | Dimensions of the video content |
| `canvasSize` | `Dimensions` | Dimensions of the canvas element |
| `canvasRef` | `HTMLCanvasElement` \| `string` | Reference to the HTML canvas element or selector string |
| `backgroundColor?` | `string` | Background color of the canvas |
| `selectionBorderColor?` | `string` | Border color for selected objects |
| `selectionLineWidth?` | `number` | Width of the selection border |
| `uniScaleTransform?` | `boolean` | Ensures uniform scaling of objects |
| `enableRetinaScaling?` | `boolean` | Enables retina scaling for higher DPI displays |
| `touchZoomThreshold?` | `number` | Threshold for touch zoom interactions |
| `lockAspectRatio?` | `boolean` | Default lock aspect ratio when resizing elements (uniform scaling). Can be overridden per element via props.lockAspectRatio. |

#### Defined in

[types.ts:28](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L28)

___

### CanvasMetadata

Ƭ **CanvasMetadata**: `Object`

Metadata about the canvas including dimensions and scaling factors.
Contains calculated values for coordinate transformations between video and canvas spaces.

**`Example`**

```js
const metadata: CanvasMetadata = {
  width: 800,
  height: 600,
  aspectRatio: 1.33,
  scaleX: 0.416,
  scaleY: 0.556
};
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | Width of the canvas in pixels |
| `height` | `number` | Height of the canvas in pixels |
| `aspectRatio` | `number` | Aspect ratio of the canvas (width / height) |
| `scaleX` | `number` | Horizontal scaling factor from video to canvas |
| `scaleY` | `number` | Vertical scaling factor from video to canvas |

#### Defined in

[types.ts:66](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L66)

___

### FrameEffect

Ƭ **FrameEffect**: `Object`

Frame effect configuration for canvas elements.
Defines visual effects that can be applied to elements during specific time ranges.

**`Example`**

```js
const frameEffect: FrameEffect = {
  s: 0,
  e: 5,
  props: {
    shape: "circle",
    radius: 50,
    rotation: 45,
    framePosition: { x: 100, y: 100 },
    frameSize: [200, 200]
  }
};
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `number` | Start time of the effect in seconds |
| `e` | `number` | End time of the effect in seconds |
| `props` | \{ `shape?`: ``"circle"`` \| ``"rect"`` ; `radius?`: `number` ; `rotation?`: `number` ; `framePosition?`: \{ `x`: `number` ; `y`: `number`  } ; `frameSize?`: [`number`, `number`]  } | Effect properties and configuration |
| `props.shape?` | ``"circle"`` \| ``"rect"`` | Shape type for the frame effect |
| `props.radius?` | `number` | Radius for circular effects |
| `props.rotation?` | `number` | Rotation angle in degrees |
| `props.framePosition?` | \{ `x`: `number` ; `y`: `number`  } | Position of the frame effect |
| `props.framePosition.x` | `number` | X coordinate |
| `props.framePosition.y` | `number` | Y coordinate |
| `props.frameSize?` | [`number`, `number`] | Size of the frame effect [width, height] |

#### Defined in

[types.ts:98](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L98)

___

### CanvasElement

Ƭ **CanvasElement**: `Object`

Canvas element configuration for various element types.
Defines the structure for text, image, video, and other elements on the canvas.

**`Example`**

```js
const canvasElement: CanvasElement = {
  id: "element-1",
  type: "text",
  props: {
    text: "Hello World",
    x: 100,
    y: 100,
    fontSize: 48
  },
  s: 0,
  e: 10,
  frameEffects: [frameEffect]
};
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Unique identifier for the element |
| `type` | `string` | Type of element (text, image, video, etc.) |
| `props` | [`CanvasElementProps`](modules.md#canvaselementprops) | Element properties and styling |
| `s?` | `number` | Start time of the element in seconds |
| `e?` | `number` | End time of the element in seconds |
| `t?` | `string` | Text content for text elements |
| `frameEffects?` | [`FrameEffect`](modules.md#frameeffect)[] | Array of frame effects applied to the element |
| `timelineType?` | `string` | Type of timeline element |
| `backgoundColor?` | `string` | Background color for the element |
| `objectFit?` | ``"contain"`` \| ``"cover"`` \| ``"fill"`` \| ``"none"`` | Object fit mode for media elements |
| `frame?` | \{ `size?`: [`number`, `number`] ; `rotation?`: `number` ; `scaleX?`: `number` ; `scaleY?`: `number` ; `stroke?`: `string` ; `lineWidth?`: `number` ; `radius?`: `number` ; `x`: `number` ; `y`: `number`  } | Frame configuration for the element |
| `frame.size?` | [`number`, `number`] | Size of the frame [width, height] |
| `frame.rotation?` | `number` | Rotation angle in degrees |
| `frame.scaleX?` | `number` | Horizontal scale factor |
| `frame.scaleY?` | `number` | Vertical scale factor |
| `frame.stroke?` | `string` | Stroke color |
| `frame.lineWidth?` | `number` | Stroke line width |
| `frame.radius?` | `number` | Corner radius for rounded rectangles |
| `frame.x` | `number` | X coordinate |
| `frame.y` | `number` | Y coordinate |
| `zIndex?` | `number` | Layering order on the canvas (higher = on top). Updated by bring to front / send to back. |

#### Defined in

[types.ts:144](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L144)

___

### CanvasElementProps

Ƭ **CanvasElementProps**: `Object`

Properties for canvas elements including styling, positioning, and media attributes.
Comprehensive type definition covering all possible element properties.

**`Example`**

```js
const elementProps: CanvasElementProps = {
  src: "image.jpg",
  text: "Sample Text",
  x: 100,
  y: 100,
  rotation: 45,
  scaleX: 1.5,
  scaleY: 1.5,
  opacity: 0.8,
  fontSize: 48,
  fontFamily: "Arial",
  fill: "#FFFFFF",
  stroke: "#000000"
};
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `src?` | `string` | Source URL for media elements |
| `text?` | `string` | Text content for text elements |
| `rotation?` | `number` | Rotation angle in degrees |
| `scaleX?` | `number` | Horizontal scale factor |
| `scaleY?` | `number` | Vertical scale factor |
| `size?` | [`number`, `number`] | Size array [width, height] |
| `x?` | `number` | X coordinate position |
| `y?` | `number` | Y coordinate position |
| `radius?` | `number` | Corner radius for rounded shapes |
| `opacity?` | `number` | Opacity value (0-1) |
| `width?` | `number` | Width in pixels |
| `maxWidth?` | `number` | Maximum width in pixels |
| `height?` | `number` | Height in pixels |
| `textWrap?` | `boolean` | Whether text should wrap |
| `textAlign?` | ``"left"`` \| ``"center"`` \| ``"right"`` | Text alignment |
| `pos?` | \{ `x`: `number` ; `y`: `number`  } | Position object with x, y coordinates |
| `pos.x` | `number` | X coordinate |
| `pos.y` | `number` | Y coordinate |
| `shadow?` | \{ `color`: `string` ; `blur`: `number` ; `offsetX`: `number` ; `offsetY?`: `number`  } | Shadow configuration |
| `shadow.color` | `string` | Shadow color |
| `shadow.blur` | `number` | Shadow blur radius |
| `shadow.offsetX` | `number` | Shadow X offset |
| `shadow.offsetY?` | `number` | Shadow Y offset |
| `font?` | \{ `family?`: `string` ; `size?`: `number` ; `style?`: `string` ; `weight?`: `string`  } | Font configuration object |
| `font.family?` | `string` | Font family |
| `font.size?` | `number` | Font size in pixels |
| `font.style?` | `string` | Font style |
| `font.weight?` | `string` | Font weight |
| `fontFamily?` | `string` | Font family name |
| `fontSize?` | `number` | Font size in pixels |
| `fontStyle?` | `string` | Font style (normal, italic, etc.) |
| `fontWeight?` | `string` | Font weight (normal, bold, etc.) |
| `fill?` | `string` | Fill color |
| `stroke?` | `string` | Stroke color |
| `strokeWidth?` | `number` | Stroke width |
| `lineWidth?` | `number` | Line width for strokes |
| `shadowColor?` | `string` | Shadow color |
| `shadowBlur?` | `number` | Shadow blur radius |
| `shadowOffset?` | [`number`, `number`] | Shadow offset [x, y] |
| `backgroundColor?` | `string` | Background color for text elements |
| `backgroundOpacity?` | `number` | Background opacity for text elements (0-1) |
| `playbackRate?` | `number` | Playback rate for video elements |
| `time?` | `number` | Current time for video elements |
| `lockAspectRatio?` | `boolean` | When true, resize preserves aspect ratio (uniform scaling). When false, allows non-uniform scale. |

#### Defined in

[types.ts:212](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L212)

___

### CaptionProps

Ƭ **CaptionProps**: `Object`

Properties specific to caption elements.
Defines styling and positioning for caption text with background and highlight options.

**`Example`**

```js
const captionProps: CaptionProps = {
  font: {
    family: "Arial",
    size: 48,
    fill: "#FFFFFF"
  },
  pos: {
    x: 100,
    y: 100
  },
  color: {
    text: "#FFFFFF",
    background: "#000000",
    highlight: "#FFFF00"
  }
};
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `font?` | \{ `family?`: `string` ; `size?`: `number` ; `fill?`: `string` ; `weight?`: `string` ; `style?`: `string`  } | Font configuration for caption text |
| `font.family?` | `string` | Font family |
| `font.size?` | `number` | Font size in pixels |
| `font.fill?` | `string` | Text fill color |
| `font.weight?` | `string` | Font weight |
| `font.style?` | `string` | Font style |
| `opacity?` | `number` | Opacity value (0-1) |
| `stroke?` | `string` | Stroke color |
| `lineWidth?` | `number` | Stroke width |
| `shadowColor?` | `string` | Shadow color |
| `shadowBlur?` | `number` | Shadow blur radius |
| `shadowOffset?` | [`number`, `number`] | Shadow offset [x, y] |
| `x` | `number` | X coordinate |
| `y` | `number` | Y coordinate |
| `color?` | \{ `text?`: `string` ; `background?`: `string` ; `highlight?`: `string`  } | Color configuration for caption styling |
| `color.text?` | `string` | Text color |
| `color.background?` | `string` | Background color |
| `color.highlight?` | `string` | Highlight color |
| `applyToAll?` | `boolean` | - |

#### Defined in

[types.ts:330](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L330)

___

### BuildCanvasOptions

Ƭ **BuildCanvasOptions**: [`CanvasProps`](modules.md#canvasprops) & \{ `forceBuild?`: `boolean`  }

Options for buildCanvas from useTwickCanvas.
CanvasProps plus optional forceBuild to recreate the canvas even when dimensions match.

#### Defined in

[types.ts:376](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L376)

___

### AddElementToCanvasOptions

Ƭ **AddElementToCanvasOptions**: `Object`

Options for addElementToCanvas from useTwickCanvas.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`CanvasElement`](modules.md#canvaselement) | The canvas element to add |
| `index` | `number` | Z-index / layer order |
| `reorder?` | `boolean` | Whether to reorder canvas objects by zIndex after adding (default true) |
| `seekTime?` | `number` | Seek time for video/frame snap (optional) |
| `captionProps?` | `any` | Caption styling (optional) |
| `lockAspectRatio?` | `boolean` | When true, element resize keeps aspect ratio (optional) |

#### Defined in

[types.ts:384](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L384)

___

### SetCanvasElementsOptions

Ƭ **SetCanvasElementsOptions**: `Object`

Options for setCanvasElements from useTwickCanvas.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `elements` | [`CanvasElement`](modules.md#canvaselement)[] | Canvas elements to set |
| `watermark?` | [`CanvasElement`](modules.md#canvaselement) | Optional watermark element |
| `seekTime?` | `number` | Seek time for video/frame snap (default 0) |
| `captionProps?` | `any` | Caption styling (optional) |
| `cleanAndAdd?` | `boolean` | When true, clear canvas before adding (default false) |
| `lockAspectRatio?` | `boolean` | When true, element resize keeps aspect ratio (optional) |

#### Defined in

[types.ts:402](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L402)

___

### AddWatermarkToCanvasOptions

Ƭ **AddWatermarkToCanvasOptions**: `Object`

Options for addWatermarkToCanvas from useTwickCanvas.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`CanvasElement`](modules.md#canvaselement) | The watermark canvas element to add |

#### Defined in

[types.ts:420](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L420)

___

### ResizeCanvasOptions

Ƭ **ResizeCanvasOptions**: `Object`

Options for resizeCanvas from useTwickCanvas.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `canvasSize` | `Dimensions` | New canvas dimensions (e.g. from ResizeObserver) |
| `videoSize?` | `Dimensions` | Optional video dimensions; defaults to current video size ref |

#### Defined in

[types.ts:428](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L428)

___

### CanvasElementAddParams

Ƭ **CanvasElementAddParams**: `Object`

Parameters passed to a canvas element handler when adding an element.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`CanvasElement`](modules.md#canvaselement) | - |
| `index` | `number` | - |
| `canvas` | `Canvas` | - |
| `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) | - |
| `seekTime?` | `number` | - |
| `captionProps?` | [`CaptionProps`](modules.md#captionprops) \| ``null`` | - |
| `elementFrameMapRef?` | \{ `current`: `Record`\<`string`, [`FrameEffect`](modules.md#frameeffect) \| `undefined`\>  } | - |
| `elementFrameMapRef.current` | `Record`\<`string`, [`FrameEffect`](modules.md#frameeffect) \| `undefined`\> | - |
| `getCurrentFrameEffect?` | (`item`: [`CanvasElement`](modules.md#canvaselement), `seekTime`: `number`) => [`FrameEffect`](modules.md#frameeffect) \| `undefined` | - |
| `watermarkPropsRef?` | \{ `current`: `any`  } | Used by watermark handler to store props for WATERMARK_UPDATED |
| `watermarkPropsRef.current` | `any` | - |
| `lockAspectRatio?` | `boolean` | When true, resize keeps aspect ratio (uniform scaling). Overridable by element.props.lockAspectRatio. |

#### Defined in

[types.ts:438](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L438)

___

### CanvasElementUpdateContext

Ƭ **CanvasElementUpdateContext**: `Object`

Context passed when updating element state from a Fabric object (e.g. after transform).

#### Type declaration

| Name | Type |
| :------ | :------ |
| `canvasMetadata` | [`CanvasMetadata`](modules.md#canvasmetadata) |
| `videoSize` | \{ `width`: `number` ; `height`: `number`  } |
| `videoSize.width` | `number` |
| `videoSize.height` | `number` |
| `elementFrameMapRef` | \{ `current`: `Record`\<`string`, [`FrameEffect`](modules.md#frameeffect) \| `undefined`\>  } |
| `elementFrameMapRef.current` | `Record`\<`string`, [`FrameEffect`](modules.md#frameeffect) \| `undefined`\> |
| `captionPropsRef` | \{ `current`: [`CaptionProps`](modules.md#captionprops) \| ``null``  } |
| `captionPropsRef.current` | [`CaptionProps`](modules.md#captionprops) \| ``null`` |
| `watermarkPropsRef` | \{ `current`: `any`  } |
| `watermarkPropsRef.current` | `any` |

#### Defined in

[types.ts:456](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L456)

___

### CanvasElementUpdateResult

Ƭ **CanvasElementUpdateResult**: `Object`

Result of updateFromFabricObject; tells the hook which operation to emit.
When operation is CAPTION_PROPS_UPDATED, payload is &#123; element, props &#125;.
When operation is WATERMARK_UPDATED, payload is WatermarkUpdatePayload.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `element` | [`CanvasElement`](modules.md#canvaselement) |
| `operation?` | `string` |
| `payload?` | `any` |

#### Defined in

[types.ts:469](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L469)

___

### WatermarkUpdatePayload

Ƭ **WatermarkUpdatePayload**: `Object`

Canonical payload for WATERMARK_UPDATED. Matches timeline WatermarkJSON shape
so video-editor can apply via setWatermark() and panel can update type/props.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `position` | \{ `x`: `number` ; `y`: `number`  } |
| `position.x` | `number` |
| `position.y` | `number` |
| `rotation?` | `number` |
| `opacity?` | `number` |
| `props?` | `Record`\<`string`, `unknown`\> |

#### Defined in

[types.ts:479](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L479)

___

### CanvasElementHandler

Ƭ **CanvasElementHandler**: `Object`

Handler for a canvas element type. Register with ElementController for scalable dispatch.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `add` | (`params`: [`CanvasElementAddParams`](modules.md#canvaselementaddparams)) => `Promise`\<`void`\> |
| `updateFromFabricObject?` | (`object`: `any`, `element`: [`CanvasElement`](modules.md#canvaselement), `context`: [`CanvasElementUpdateContext`](modules.md#canvaselementupdatecontext)) => [`CanvasElementUpdateResult`](modules.md#canvaselementupdateresult) \| ``null`` |

#### Defined in

[types.ts:489](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/types.ts#L489)

## Variables

### disabledControl

• `Const` **disabledControl**: `Control`

Disabled control for canvas elements.
Creates a control that appears disabled and doesn't perform any actions
when interacted with. Useful for showing non-interactive control points.

**`Example`**

```js
import { disabledControl } from '@twick/canvas';

// Apply to a canvas object
object.setControlsVisibility({
  mt: false, // Disable top control
  mb: false, // Disable bottom control
  ml: false, // Disable left control
  mr: false, // Disable right control
  bl: disabledControl, // Use disabled control for bottom-left
});
```

#### Defined in

[components/element-controls.tsx:22](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/components/element-controls.tsx#L22)

___

### rotateControl

• `Const` **rotateControl**: `Control`

Rotation control for canvas elements.
Creates a control that allows rotation of canvas objects with snapping
functionality for precise angle adjustments.

**`Example`**

```js
import { rotateControl } from '@twick/canvas';

// Apply to a canvas object
object.setControlsVisibility({
  mtr: rotateControl, // Use custom rotate control for top-right
});

// Enable rotation
object.set({
  hasRotatingPoint: true,
  lockRotation: false
});
```

#### Defined in

[components/element-controls.tsx:71](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/components/element-controls.tsx#L71)

___

### elementController

• `Const` **elementController**: [`ElementController`](classes/ElementController.md)

#### Defined in

[controllers/element.controller.ts:30](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/controllers/element.controller.ts#L30)

___

### CANVAS\_OPERATIONS

• `Const` **CANVAS\_OPERATIONS**: `Object`

Canvas operation constants for tracking canvas state changes.
Defines the different types of operations that can occur on canvas elements.

**`Example`**

```js
import { CANVAS_OPERATIONS } from '@twick/canvas';

function handleCanvasOperation(operation) {
  switch (operation) {
    case CANVAS_OPERATIONS.ITEM_ADDED:
      console.log('New item added to canvas');
      break;
    case CANVAS_OPERATIONS.ITEM_UPDATED:
      console.log('Item updated on canvas');
      break;
  }
}
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `ITEM_SELECTED` | `string` | An item has been selected on the canvas |
| `ITEM_UPDATED` | `string` | An item has been updated/modified on the canvas |
| `ITEM_DELETED` | `string` | An item has been deleted from the canvas |
| `ITEM_ADDED` | `string` | A new item has been added to the canvas |
| `ITEM_GROUPED` | `string` | Items have been grouped together |
| `ITEM_UNGROUPED` | `string` | Items have been ungrouped |
| `CAPTION_PROPS_UPDATED` | `string` | Caption properties have been updated |
| `WATERMARK_UPDATED` | `string` | Watermark has been updated |
| `ADDED_NEW_ELEMENT` | `string` | A new element was added via drop on canvas; payload is &#123; element &#125; |
| `Z_ORDER_CHANGED` | `string` | Z-order changed (bring to front / send to back). Payload is &#123; elementId, direction &#125;. Timeline should reorder tracks. |

#### Defined in

[helpers/constants.ts:97](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/helpers/constants.ts#L97)

___

### ELEMENT\_TYPES

• `Const` **ELEMENT\_TYPES**: `Object`

Element type constants for canvas elements.
Defines the different types of elements that can be added to the canvas.

**`Example`**

```js
import { ELEMENT_TYPES } from '@twick/canvas';

if (element.type === ELEMENT_TYPES.TEXT) {
  // Handle text element
} else if (element.type === ELEMENT_TYPES.IMAGE) {
  // Handle image element
}
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `TEXT` | `string` | Text element type |
| `CAPTION` | `string` | Caption element type |
| `IMAGE` | `string` | Image element type |
| `VIDEO` | `string` | Video element type |
| `RECT` | `string` | Rectangle element type |
| `CIRCLE` | `string` | Circle element type |
| `ICON` | `string` | Icon element type |
| `BACKGROUND_COLOR` | `string` | Background color element type |

#### Defined in

[helpers/constants.ts:135](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/helpers/constants.ts#L135)
