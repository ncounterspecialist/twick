# Interface: TimelineZoomConfig

Configuration for timeline zoom behavior.
Defines the minimum, maximum, step, and default zoom levels.

**`Example`**

```js
const zoomConfig = {
  min: 0.5,     // 50% minimum zoom
  max: 2.0,     // 200% maximum zoom
  step: 0.25,   // 25% zoom steps
  default: 1.0  // 100% default zoom
};
```

## Table of contents

### Properties

- [min](TimelineZoomConfig.md#min)
- [max](TimelineZoomConfig.md#max)
- [step](TimelineZoomConfig.md#step)
- [default](TimelineZoomConfig.md#default)

## Properties

### min

• **min**: `number`

Minimum zoom level

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:51](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/components/video-editor.tsx#L51)

___

### max

• **max**: `number`

Maximum zoom level

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:53](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/components/video-editor.tsx#L53)

___

### step

• **step**: `number`

Zoom step increment/decrement

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:55](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/components/video-editor.tsx#L55)

___

### default

• **default**: `number`

Default zoom level

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:57](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/components/video-editor.tsx#L57)
