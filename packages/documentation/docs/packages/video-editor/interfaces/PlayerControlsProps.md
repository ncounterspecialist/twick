# Interface: PlayerControlsProps

Props for the PlayerControls component.
Defines the configuration options and callback functions for player controls.

**`Example`**

```jsx
<PlayerControls
  selectedItem={selectedElement}
  currentTime={5.5}
  duration={120}
  canUndo={true}
  canRedo={false}
  playerState={PLAYER_STATE.PLAYING}
  togglePlayback={handleTogglePlayback}
  onUndo={handleUndo}
  onRedo={handleRedo}
  onDelete={handleDelete}
  onSplit={handleSplit}
  zoomLevel={1.0}
  setZoomLevel={handleZoomChange}
/>
```

## Table of contents

### Properties

- [selectedItem](PlayerControlsProps.md#selecteditem)
- [currentTime](PlayerControlsProps.md#currenttime)
- [duration](PlayerControlsProps.md#duration)
- [canUndo](PlayerControlsProps.md#canundo)
- [canRedo](PlayerControlsProps.md#canredo)
- [playerState](PlayerControlsProps.md#playerstate)
- [togglePlayback](PlayerControlsProps.md#toggleplayback)
- [onUndo](PlayerControlsProps.md#onundo)
- [onRedo](PlayerControlsProps.md#onredo)
- [onDelete](PlayerControlsProps.md#ondelete)
- [onSplit](PlayerControlsProps.md#onsplit)
- [zoomLevel](PlayerControlsProps.md#zoomlevel)
- [setZoomLevel](PlayerControlsProps.md#setzoomlevel)
- [className](PlayerControlsProps.md#classname)
- [zoomConfig](PlayerControlsProps.md#zoomconfig)

## Properties

### selectedItem

• **selectedItem**: ``null`` \| `Track` \| `TrackElement`

Currently selected timeline element or track

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:43](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L43)

___

### currentTime

• **currentTime**: `number`

Current playback time in seconds

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:45](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L45)

___

### duration

• **duration**: `number`

Total duration of the timeline in seconds

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:47](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L47)

___

### canUndo

• **canUndo**: `boolean`

Whether undo operation is available

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:49](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L49)

___

### canRedo

• **canRedo**: `boolean`

Whether redo operation is available

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:51](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L51)

___

### playerState

• **playerState**: `string` \| `number` \| `symbol`

Current player state (playing, paused, refresh)

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:53](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L53)

___

### togglePlayback

• **togglePlayback**: () => `void`

Function to toggle between play and pause

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:55](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L55)

___

### onUndo

• `Optional` **onUndo**: () => `void`

Optional callback for undo operation

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:57](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L57)

___

### onRedo

• `Optional` **onRedo**: () => `void`

Optional callback for redo operation

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:59](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L59)

___

### onDelete

• `Optional` **onDelete**: (`item`: `Track` \| `TrackElement`) => `void`

Optional callback for delete operation

#### Type declaration

▸ (`item`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `Track` \| `TrackElement` |

##### Returns

`void`

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:61](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L61)

___

### onSplit

• `Optional` **onSplit**: (`item`: `TrackElement`, `splitTime`: `number`) => `void`

Optional callback for split operation

#### Type declaration

▸ (`item`, `splitTime`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `TrackElement` |
| `splitTime` | `number` |

##### Returns

`void`

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:63](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L63)

___

### zoomLevel

• `Optional` **zoomLevel**: `number`

Current zoom level for timeline

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:65](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L65)

___

### setZoomLevel

• `Optional` **setZoomLevel**: (`zoom`: `number`) => `void`

Function to set zoom level

#### Type declaration

▸ (`zoom`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `zoom` | `number` |

##### Returns

`void`

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:67](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L67)

___

### className

• `Optional` **className**: `string`

Optional CSS class name for styling

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:69](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L69)

___

### zoomConfig

• `Optional` **zoomConfig**: [`TimelineZoomConfig`](TimelineZoomConfig.md)

Timeline zoom configuration (min, max, step, default)

#### Defined in

[packages/video-editor/src/components/controls/player-controls.tsx:71](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/controls/player-controls.tsx#L71)
