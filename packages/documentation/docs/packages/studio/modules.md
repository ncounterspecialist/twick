[@twick/studio - v0.15.0](README.md) / Exports

# @twick/studio - v0.15.0

## Table of contents

### References

- [LivePlayer](modules.md#liveplayer)
- [PLAYER\_STATE](modules.md#player_state)
- [default](modules.md#default)
- [generateId](modules.md#generateid)
- [getBaseProject](modules.md#getbaseproject)
- [useLivePlayerContext](modules.md#useliveplayercontext)

### Interfaces

- [GenerateSubtitlesResponse](interfaces/GenerateSubtitlesResponse.md)
- [ISubtitleGenerationPollingResponse](interfaces/ISubtitleGenerationPollingResponse.md)
- [ISubtitleGenerationService](interfaces/ISubtitleGenerationService.md)
- [PanelProps](interfaces/PanelProps.md)
- [PropertiesPanelProps](interfaces/PropertiesPanelProps.md)
- [RequestStatus](interfaces/RequestStatus.md)
- [RequestStatusCompleted](interfaces/RequestStatusCompleted.md)
- [RequestStatusPending](interfaces/RequestStatusPending.md)
- [Result](interfaces/Result.md)
- [StudioConfig](interfaces/StudioConfig.md)
- [SubtitleEntry](interfaces/SubtitleEntry.md)
- [Timeline](interfaces/Timeline.md)
- [TimelineElement](interfaces/TimelineElement.md)
- [ToolCategory](interfaces/ToolCategory.md)
- [VideoSettings](interfaces/VideoSettings.md)

### Type Aliases

- [RequestStatusResponse](modules.md#requeststatusresponse)

### Variables

- [CAPTION\_PROPS](modules.md#caption_props)
- [LivePlayerProvider](modules.md#liveplayerprovider)

### Functions

- [AudioPanel](modules.md#audiopanel)
- [CirclePanel](modules.md#circlepanel)
- [IconPanel](modules.md#iconpanel)
- [ImagePanel](modules.md#imagepanel)
- [RectPanel](modules.md#rectpanel)
- [StudioHeader](modules.md#studioheader)
- [SubtitlesPanel](modules.md#subtitlespanel)
- [TextPanel](modules.md#textpanel)
- [Toolbar](modules.md#toolbar)
- [TwickStudio](modules.md#twickstudio)
- [VideoPanel](modules.md#videopanel)
- [useGenerateSubtitles](modules.md#usegeneratesubtitles)
- [useStudioManager](modules.md#usestudiomanager)

## References

### LivePlayer

Renames and re-exports [LivePlayerProvider](modules.md#liveplayerprovider)

___

### PLAYER\_STATE

Renames and re-exports [LivePlayerProvider](modules.md#liveplayerprovider)

___

### default

Renames and re-exports [TwickStudio](modules.md#twickstudio)

___

### generateId

Renames and re-exports [LivePlayerProvider](modules.md#liveplayerprovider)

___

### getBaseProject

Renames and re-exports [LivePlayerProvider](modules.md#liveplayerprovider)

___

### useLivePlayerContext

Renames and re-exports [LivePlayerProvider](modules.md#liveplayerprovider)

## Type Aliases

### RequestStatusResponse

Ƭ **RequestStatusResponse**: [`RequestStatusPending`](interfaces/RequestStatusPending.md) \| [`RequestStatusCompleted`](interfaces/RequestStatusCompleted.md)

Union type for request status responses

#### Defined in

[studio/src/types/index.ts:70](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L70)

## Variables

### CAPTION\_PROPS

• `Const` **CAPTION\_PROPS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `highlight_bg` | \{ `colors`: \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } ; `font`: \{ `family`: `string` = "Bangers"; `size`: `number` = 46; `weight`: `number` = 700 } ; `fontWeight`: `number` = 700; `lineWidth`: `number` = 0.35; `shadowColor`: `string` = "#000000"; `shadowOffset`: `number`[] ; `stroke`: `string` = "#000000" } |
| `highlight_bg.colors` | \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } |
| `highlight_bg.colors.bgColor` | `string` |
| `highlight_bg.colors.highlight` | `string` |
| `highlight_bg.colors.text` | `string` |
| `highlight_bg.font` | \{ `family`: `string` = "Bangers"; `size`: `number` = 46; `weight`: `number` = 700 } |
| `highlight_bg.font.family` | `string` |
| `highlight_bg.font.size` | `number` |
| `highlight_bg.font.weight` | `number` |
| `highlight_bg.fontWeight` | `number` |
| `highlight_bg.lineWidth` | `number` |
| `highlight_bg.shadowColor` | `string` |
| `highlight_bg.shadowOffset` | `number`[] |
| `highlight_bg.stroke` | `string` |
| `word_by_word` | \{ `colors`: \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } ; `font`: \{ `family`: `string` = "Bangers"; `size`: `number` = 46; `weight`: `number` = 700 } ; `lineWidth`: `number` = 0.35; `shadowBlur`: `number` = 5; `shadowColor`: `string` = "#000000"; `shadowOffset`: `number`[] ; `stroke`: `string` = "#000000" } |
| `word_by_word.colors` | \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } |
| `word_by_word.colors.bgColor` | `string` |
| `word_by_word.colors.highlight` | `string` |
| `word_by_word.colors.text` | `string` |
| `word_by_word.font` | \{ `family`: `string` = "Bangers"; `size`: `number` = 46; `weight`: `number` = 700 } |
| `word_by_word.font.family` | `string` |
| `word_by_word.font.size` | `number` |
| `word_by_word.font.weight` | `number` |
| `word_by_word.lineWidth` | `number` |
| `word_by_word.shadowBlur` | `number` |
| `word_by_word.shadowColor` | `string` |
| `word_by_word.shadowOffset` | `number`[] |
| `word_by_word.stroke` | `string` |
| `word_by_word_with_bg` | \{ `colors`: \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } ; `font`: \{ `family`: `string` = "Bangers"; `size`: `number` = 46; `weight`: `number` = 700 } ; `lineWidth`: `number` = 0.35; `shadowBlur`: `number` = 5; `shadowColor`: `string` = "#000000"; `shadowOffset`: `number`[]  } |
| `word_by_word_with_bg.colors` | \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } |
| `word_by_word_with_bg.colors.bgColor` | `string` |
| `word_by_word_with_bg.colors.highlight` | `string` |
| `word_by_word_with_bg.colors.text` | `string` |
| `word_by_word_with_bg.font` | \{ `family`: `string` = "Bangers"; `size`: `number` = 46; `weight`: `number` = 700 } |
| `word_by_word_with_bg.font.family` | `string` |
| `word_by_word_with_bg.font.size` | `number` |
| `word_by_word_with_bg.font.weight` | `number` |
| `word_by_word_with_bg.lineWidth` | `number` |
| `word_by_word_with_bg.shadowBlur` | `number` |
| `word_by_word_with_bg.shadowColor` | `string` |
| `word_by_word_with_bg.shadowOffset` | `number`[] |

#### Defined in

[studio/src/helpers/constant.ts:3](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/helpers/constant.ts#L3)

___

### LivePlayerProvider

• **LivePlayerProvider**: `any`

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

[studio/src/components/panel/audio-panel.tsx:37](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/panel/audio-panel.tsx#L37)

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

[studio/src/components/panel/circle-panel.tsx:46](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/panel/circle-panel.tsx#L46)

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

[studio/src/components/panel/icon-panel.tsx:46](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/panel/icon-panel.tsx#L46)

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

[studio/src/components/panel/image-panel.tsx:33](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/panel/image-panel.tsx#L33)

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

[studio/src/components/panel/rect-panel.tsx:43](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/panel/rect-panel.tsx#L43)

___

### StudioHeader

▸ **StudioHeader**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `StudioHeaderProps` |

#### Returns

`Element`

#### Defined in

[studio/src/components/header.tsx:30](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/header.tsx#L30)

___

### SubtitlesPanel

▸ **SubtitlesPanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `addSubtitle` | () => `void` |
| › `deleteSubtitle` | (`index`: `number`) => `void` |
| › `splitSubtitle` | (`index`: `number`) => `void` |
| › `subtitles` | `SubtitleEntry`[] |
| › `updateSubtitle` | (`index`: `number`, `subtitle`: `SubtitleEntry`) => `void` |

#### Returns

`Element`

#### Defined in

[studio/src/components/panel/subtitles-panel.tsx:43](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/panel/subtitles-panel.tsx#L43)

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

[studio/src/components/panel/text-panel.tsx:57](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/panel/text-panel.tsx#L57)

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

[studio/src/components/toolbar.tsx:63](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/toolbar.tsx#L63)

___

### TwickStudio

▸ **TwickStudio**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `studioConfig?` | [`StudioConfig`](interfaces/StudioConfig.md) |

#### Returns

`Element`

#### Defined in

[studio/src/components/twick-studio.tsx:33](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/twick-studio.tsx#L33)

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

[studio/src/components/panel/video-panel.tsx:35](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/components/panel/video-panel.tsx#L35)

___

### useGenerateSubtitles

▸ **useGenerateSubtitles**(`studioConfig?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `studioConfig?` | [`StudioConfig`](interfaces/StudioConfig.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `addSubtitlesToTimeline` | (`subtitles`: [`SubtitleEntry`](interfaces/SubtitleEntry.md)[]) => `void` |
| `getSubtitleStatus` | (`reqId`: `string`) => `Promise`\<[`ISubtitleGenerationPollingResponse`](interfaces/ISubtitleGenerationPollingResponse.md)\> |
| `onGenerateSubtitles` | (`videoElement`: `VideoElement`) => `Promise`\<``null`` \| `string`\> |

#### Defined in

[studio/src/hooks/use-generate-subtitles.ts:8](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/hooks/use-generate-subtitles.ts#L8)

___

### useStudioManager

▸ **useStudioManager**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `addElement` | (`element`: `TrackElement`) => `Promise`\<`void`\> |
| `selectedElement` | ``null`` \| `TrackElement` |
| `selectedProp` | `string` |
| `selectedTool` | `string` |
| `setSelectedProp` | `Dispatch`\<`SetStateAction`\<`string`\>\> |
| `setSelectedTool` | `Dispatch`\<`SetStateAction`\<`string`\>\> |
| `updateElement` | (`element`: `TrackElement`) => `void` |

#### Defined in

[studio/src/hooks/use-studio-manager.tsx:30](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/hooks/use-studio-manager.tsx#L30)
