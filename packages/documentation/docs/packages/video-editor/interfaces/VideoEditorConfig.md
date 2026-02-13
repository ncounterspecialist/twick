# Interface: VideoEditorConfig

Configuration options for the video editor.
Defines the video properties and editor behavior settings.

**`Example`**

```js
const editorConfig = {
  videoProps: { width: 1920, height: 1080 },
  canvasMode: true,
  timelineTickConfigs: [
    { durationThreshold: 30, majorInterval: 5, minorTicks: 5 },
    { durationThreshold: 300, majorInterval: 30, minorTicks: 6 }
  ],
  timelineZoomConfig: {
    min: 0.5, max: 2.0, step: 0.25, default: 1.0
  },
  elementColors: {
    video: "#8B5FBF",
    audio: "#3D8B8B",
    // ... other element colors
  }
};
```

## Table of contents

### Properties

- [videoProps](VideoEditorConfig.md#videoprops)
- [playerProps](VideoEditorConfig.md#playerprops)
- [canvasMode](VideoEditorConfig.md#canvasmode)
- [timelineTickConfigs](VideoEditorConfig.md#timelinetickconfigs)
- [timelineZoomConfig](VideoEditorConfig.md#timelinezoomconfig)
- [elementColors](VideoEditorConfig.md#elementcolors)

## Properties

### videoProps

• **videoProps**: `Object`

Video dimensions and properties

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | Width of the video in pixels |
| `height` | `number` | Height of the video in pixels |
| `backgroundColor?` | `string` | Background color of the video |

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:86](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L86)

___

### playerProps

• `Optional` **playerProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `quality?` | `number` |
| `maxWidth?` | `number` |
| `maxHeight?` | `number` |

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:94](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L94)

___

### canvasMode

• `Optional` **canvasMode**: `boolean`

Whether to use canvas mode for rendering

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:100](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L100)

___

### timelineTickConfigs

• `Optional` **timelineTickConfigs**: [`TimelineTickConfig`](TimelineTickConfig.md)[]

Custom timeline tick configurations for different duration ranges

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:102](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L102)

___

### timelineZoomConfig

• `Optional` **timelineZoomConfig**: [`TimelineZoomConfig`](TimelineZoomConfig.md)

Custom timeline zoom configuration (min, max, step, default)

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:104](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L104)

___

### elementColors

• `Optional` **elementColors**: [`ElementColors`](ElementColors.md)

Custom element colors for timeline elements

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:106](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L106)
