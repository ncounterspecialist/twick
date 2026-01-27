# Interface: VideoEditorProps

Props for the VideoEditor component.
Defines the configuration options and custom panels for the video editor.

**`Example`**

```jsx
<VideoEditor
  leftPanel={<MediaPanel />}
  rightPanel={<PropertiesPanel />}
  bottomPanel={<EffectsPanel />}
  editorConfig={{
    videoProps: { width: 1920, height: 1080 },
    canvasMode: true
  }}
  defaultPlayControls={true}
/>
```

## Table of contents

### Properties

- [leftPanel](VideoEditorProps.md#leftpanel)
- [rightPanel](VideoEditorProps.md#rightpanel)
- [bottomPanel](VideoEditorProps.md#bottompanel)
- [defaultPlayControls](VideoEditorProps.md#defaultplaycontrols)
- [editorConfig](VideoEditorProps.md#editorconfig)

## Properties

### leftPanel

• `Optional` **leftPanel**: `ReactNode`

Custom left panel component (e.g., media library)

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:129](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/components/video-editor.tsx#L129)

___

### rightPanel

• `Optional` **rightPanel**: `ReactNode`

Custom right panel component (e.g., properties inspector)

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:131](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/components/video-editor.tsx#L131)

___

### bottomPanel

• `Optional` **bottomPanel**: `ReactNode`

Custom bottom panel component (e.g., effects library)

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:133](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/components/video-editor.tsx#L133)

___

### defaultPlayControls

• `Optional` **defaultPlayControls**: `boolean`

Whether to show default play controls if no custom controls provided

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:135](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/components/video-editor.tsx#L135)

___

### editorConfig

• **editorConfig**: [`VideoEditorConfig`](VideoEditorConfig.md)

Editor configuration including video properties and mode settings

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:137](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/video-editor/src/components/video-editor.tsx#L137)
