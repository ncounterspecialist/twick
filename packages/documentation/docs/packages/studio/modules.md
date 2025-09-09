[@twick/studio - v0.14.0](README.md) / Exports

# @twick/studio - v0.14.0

## Table of contents

### References

- [default](modules.md#default)

### Functions

- [AudioPanel](modules.md#audiopanel)
- [CirclePanel](modules.md#circlepanel)
- [IconPanel](modules.md#iconpanel)
- [ImagePanel](modules.md#imagepanel)
- [RectPanel](modules.md#rectpanel)
- [StageCanvas](modules.md#stagecanvas)
- [StudioHeader](modules.md#studioheader)
- [SubtitlesPanel](modules.md#subtitlespanel)
- [TextPanel](modules.md#textpanel)
- [Toolbar](modules.md#toolbar)
- [TwickStudio](modules.md#twickstudio)
- [VideoPanel](modules.md#videopanel)
- [useStudioManager](modules.md#usestudiomanager)

## References

### default

Renames and re-exports [TwickStudio](modules.md#twickstudio)

## Functions

### AudioPanel

▸ **AudioPanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `AudioPanelProps` |

#### Returns

`Element`

#### Defined in

components/panel/audio-panel.tsx:46

___

### CirclePanel

▸ **CirclePanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `CirclePanelProps` |

#### Returns

`Element`

#### Defined in

components/panel/circle-panel.tsx:6

___

### IconPanel

▸ **IconPanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `IconPanelProps` |

#### Returns

`Element`

#### Defined in

components/panel/icon-panel.tsx:7

___

### ImagePanel

▸ **ImagePanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ImagePanelProps` |

#### Returns

`Element`

#### Defined in

components/panel/image-panel.tsx:9

___

### RectPanel

▸ **RectPanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `RectPanelProps` |

#### Returns

`Element`

#### Defined in

components/panel/rect-panel.tsx:6

___

### StageCanvas

▸ **StageCanvas**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `resolution` | `Object` |
| › `resolution.height` | `number` |
| › `resolution.width` | `number` |

#### Returns

`Element`

#### Defined in

[components/stage-canvas.tsx:22](https://github.com/ncounterspecialist/twick/blob/64cc251de458363b71f3a1b2ee7fb607eb8d6858/packages/studio/src/components/stage-canvas.tsx#L22)

___

### StudioHeader

▸ **StudioHeader**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `setVideoResolution` | (`resolution`: `Size`) => `void` |

#### Returns

`Element`

#### Defined in

[components/header.tsx:23](https://github.com/ncounterspecialist/twick/blob/64cc251de458363b71f3a1b2ee7fb607eb8d6858/packages/studio/src/components/header.tsx#L23)

___

### SubtitlesPanel

▸ **SubtitlesPanel**(): `Element`

#### Returns

`Element`

#### Defined in

components/panel/subtitles-panel.tsx:11

___

### TextPanel

▸ **TextPanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `TextPanelProps` |

#### Returns

`Element`

#### Defined in

components/panel/text-panel.tsx:6

___

### Toolbar

▸ **Toolbar**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `selectedTool` | `string` |
| › `setSelectedTool` | (`tool`: `string`) => `void` |

#### Returns

`Element`

#### Defined in

[components/toolbar.tsx:63](https://github.com/ncounterspecialist/twick/blob/64cc251de458363b71f3a1b2ee7fb607eb8d6858/packages/studio/src/components/toolbar.tsx#L63)

___

### TwickStudio

▸ **TwickStudio**(): `Element`

#### Returns

`Element`

#### Defined in

[components/twick-studio.tsx:25](https://github.com/ncounterspecialist/twick/blob/64cc251de458363b71f3a1b2ee7fb607eb8d6858/packages/studio/src/components/twick-studio.tsx#L25)

___

### VideoPanel

▸ **VideoPanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `VideoPanelProps` |

#### Returns

`Element`

#### Defined in

components/panel/video-panel.tsx:9

___

### useStudioManager

▸ **useStudioManager**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `addElement` | (`element`: `TrackElement`) => `void` |
| `selectedElement` | ``null`` \| `TrackElement` |
| `selectedTool` | `string` |
| `setSelectedTool` | `Dispatch`\<`SetStateAction`\<`string`\>\> |
| `updateElement` | (`element`: `TrackElement`) => `void` |

#### Defined in

[hooks/use-studio-manager.tsx:29](https://github.com/ncounterspecialist/twick/blob/64cc251de458363b71f3a1b2ee7fb607eb8d6858/packages/studio/src/hooks/use-studio-manager.tsx#L29)
