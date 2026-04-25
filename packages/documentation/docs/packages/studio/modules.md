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

- [CaptionEntry](interfaces/CaptionEntry.md)
- [CloudMediaUploadProps](interfaces/CloudMediaUploadProps.md)
- [ExportProjectBundleOptions](interfaces/ExportProjectBundleOptions.md)
- [GCSUploadResponse](interfaces/GCSUploadResponse.md)
- [GenerateCaptionsResponse](interfaces/GenerateCaptionsResponse.md)
- [GenerateImageParams](interfaces/GenerateImageParams.md)
- [GenerateVideoParams](interfaces/GenerateVideoParams.md)
- [ICaptionGenerationPollingResponse](interfaces/ICaptionGenerationPollingResponse.md)
- [ICaptionGenerationService](interfaces/ICaptionGenerationService.md)
- [IImageGenerationService](interfaces/IImageGenerationService.md)
- [IScriptToTimelineService](interfaces/IScriptToTimelineService.md)
- [ITranslationService](interfaces/ITranslationService.md)
- [IVideoGenerationService](interfaces/IVideoGenerationService.md)
- [IVoiceoverService](interfaces/IVoiceoverService.md)
- [PanelProps](interfaces/PanelProps.md)
- [ProjectBundleExport](interfaces/ProjectBundleExport.md)
- [ProjectTemplate](interfaces/ProjectTemplate.md)
- [PropertiesPanelProps](interfaces/PropertiesPanelProps.md)
- [RequestStatus](interfaces/RequestStatus.md)
- [RequestStatusCompleted](interfaces/RequestStatusCompleted.md)
- [RequestStatusPending](interfaces/RequestStatusPending.md)
- [Result](interfaces/Result.md)
- [S3PresignResponse](interfaces/S3PresignResponse.md)
- [StudioConfig](interfaces/StudioConfig.md)
- [Timeline](interfaces/Timeline.md)
- [TimelineElement](interfaces/TimelineElement.md)
- [ToolCategory](interfaces/ToolCategory.md)
- [UploadConfig](interfaces/UploadConfig.md)
- [UseCloudMediaUploadConfig](interfaces/UseCloudMediaUploadConfig.md)
- [UseCloudMediaUploadReturn](interfaces/UseCloudMediaUploadReturn.md)
- [VideoSettings](interfaces/VideoSettings.md)

### Type Aliases

- [CaptionPanelEntry](modules.md#captionpanelentry)
- [CaptionPhraseLength](modules.md#captionphraselength)
- [CloudUploadProvider](modules.md#clouduploadprovider)
- [RequestStatusResponse](modules.md#requeststatusresponse)

### Variables

- [CAPTION\_PROPS](modules.md#caption_props)
- [DEFAULT\_PROJECT\_TEMPLATES](modules.md#default_project_templates)
- [DEFAULT\_STUDIO\_CONFIG](modules.md#default_studio_config)
- [DEMO\_STUDIO\_CONFIG](modules.md#demo_studio_config)
- [EDU\_STUDIO\_CONFIG](modules.md#edu_studio_config)
- [LivePlayerProvider](modules.md#liveplayerprovider)
- [MARKETING\_STUDIO\_CONFIG](modules.md#marketing_studio_config)

### Functions

- [AnnotationsPanel](modules.md#annotationspanel)
- [AudioPanel](modules.md#audiopanel)
- [CaptionsPanel](modules.md#captionspanel)
- [ChaptersPanel](modules.md#chapterspanel)
- [CirclePanel](modules.md#circlepanel)
- [CloudMediaUpload](modules.md#cloudmediaupload)
- [EmojiPanel](modules.md#emojipanel)
- [ImagePanel](modules.md#imagepanel)
- [RecordPanel](modules.md#recordpanel)
- [RectPanel](modules.md#rectpanel)
- [ScriptPanel](modules.md#scriptpanel)
- [StudioHeader](modules.md#studioheader)
- [TemplateGalleryPanel](modules.md#templategallerypanel)
- [TextPanel](modules.md#textpanel)
- [Toolbar](modules.md#toolbar)
- [TwickStudio](modules.md#twickstudio)
- [VideoPanel](modules.md#videopanel)
- [exportProjectBundle](modules.md#exportprojectbundle)
- [useCloudMediaUpload](modules.md#usecloudmediaupload)
- [useGenerateCaptions](modules.md#usegeneratecaptions)
- [useScreenRecorder](modules.md#usescreenrecorder)
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

### CaptionPanelEntry

Ƭ **CaptionPanelEntry**: [`CaptionEntry`](interfaces/CaptionEntry.md) & \{ `isCustom?`: `boolean`  }

Caption entry used by Studio UI list rendering.
`isCustom` indicates whether this caption overrides track defaults.

#### Defined in

[studio/src/types/index.ts:62](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L62)

___

### CaptionPhraseLength

Ƭ **CaptionPhraseLength**: ``"short"`` \| ``"medium"`` \| ``"long"``

#### Defined in

[studio/src/types/index.ts:101](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L101)

___

### CloudUploadProvider

Ƭ **CloudUploadProvider**: ``"s3"`` \| ``"gcs"``

#### Defined in

[studio/src/hooks/use-cloud-media-upload.ts:3](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-cloud-media-upload.ts#L3)

___

### RequestStatusResponse

Ƭ **RequestStatusResponse**: [`RequestStatusPending`](interfaces/RequestStatusPending.md) \| [`RequestStatusCompleted`](interfaces/RequestStatusCompleted.md)

Union type for request status responses

#### Defined in

[studio/src/types/index.ts:93](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L93)

## Variables

### CAPTION\_PROPS

• `Const` **CAPTION\_PROPS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `highlight_bg` | \{ `colors`: \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } ; `font`: \{ `family`: `string` = "Bangers"; `size`: `number` = HIGHLIGHT\_BG\_FONT\_SIZE; `weight`: `number` = 700 } ; `fontWeight`: `number` = 700; `lineWidth`: `number` = HIGHLIGHT\_BG\_GEOMETRY.lineWidth; `rectProps`: {} = HIGHLIGHT\_BG\_GEOMETRY.rectProps; `shadowColor`: `string` = "#000000"; `shadowOffset`: `number`[] ; `stroke`: `string` = "#000000" } |
| `highlight_bg.colors` | \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } |
| `highlight_bg.colors.bgColor` | `string` |
| `highlight_bg.colors.highlight` | `string` |
| `highlight_bg.colors.text` | `string` |
| `highlight_bg.font` | \{ `family`: `string` = "Bangers"; `size`: `number` = HIGHLIGHT\_BG\_FONT\_SIZE; `weight`: `number` = 700 } |
| `highlight_bg.font.family` | `string` |
| `highlight_bg.font.size` | `number` |
| `highlight_bg.font.weight` | `number` |
| `highlight_bg.fontWeight` | `number` |
| `highlight_bg.lineWidth` | `number` |
| `highlight_bg.rectProps` | {} |
| `highlight_bg.shadowColor` | `string` |
| `highlight_bg.shadowOffset` | `number`[] |
| `highlight_bg.stroke` | `string` |
| `outline_only` | \{ `colors`: \{ `bgColor`: `string` = "#000000"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } ; `font`: \{ `family`: `string` = "Arial"; `size`: `number` = OUTLINE\_ONLY\_FONT\_SIZE; `weight`: `number` = 600 } ; `fontWeight`: `number` = 600; `lineWidth`: `number` = OUTLINE\_ONLY\_GEOMETRY.lineWidth; `rectProps`: {} = OUTLINE\_ONLY\_GEOMETRY.rectProps; `shadowBlur`: `number` = 0; `shadowColor`: `string` = "#000000"; `shadowOffset`: `number`[] ; `stroke`: `string` = "#000000" } |
| `outline_only.colors` | \{ `bgColor`: `string` = "#000000"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } |
| `outline_only.colors.bgColor` | `string` |
| `outline_only.colors.highlight` | `string` |
| `outline_only.colors.text` | `string` |
| `outline_only.font` | \{ `family`: `string` = "Arial"; `size`: `number` = OUTLINE\_ONLY\_FONT\_SIZE; `weight`: `number` = 600 } |
| `outline_only.font.family` | `string` |
| `outline_only.font.size` | `number` |
| `outline_only.font.weight` | `number` |
| `outline_only.fontWeight` | `number` |
| `outline_only.lineWidth` | `number` |
| `outline_only.rectProps` | {} |
| `outline_only.shadowBlur` | `number` |
| `outline_only.shadowColor` | `string` |
| `outline_only.shadowOffset` | `number`[] |
| `outline_only.stroke` | `string` |
| `soft_box` | \{ `colors`: \{ `bgColor`: `string` = "#333333"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } ; `font`: \{ `family`: `string` = "Montserrat"; `size`: `number` = SOFT\_BOX\_FONT\_SIZE; `weight`: `number` = 600 } ; `fontWeight`: `number` = 600; `lineWidth`: `number` = SOFT\_BOX\_GEOMETRY.lineWidth; `rectProps`: {} = SOFT\_BOX\_GEOMETRY.rectProps; `shadowBlur`: `number` = 3; `shadowColor`: `string` = "rgba(0,0,0,0.3)"; `shadowOffset`: `number`[] ; `stroke`: `string` = "#000000" } |
| `soft_box.colors` | \{ `bgColor`: `string` = "#333333"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } |
| `soft_box.colors.bgColor` | `string` |
| `soft_box.colors.highlight` | `string` |
| `soft_box.colors.text` | `string` |
| `soft_box.font` | \{ `family`: `string` = "Montserrat"; `size`: `number` = SOFT\_BOX\_FONT\_SIZE; `weight`: `number` = 600 } |
| `soft_box.font.family` | `string` |
| `soft_box.font.size` | `number` |
| `soft_box.font.weight` | `number` |
| `soft_box.fontWeight` | `number` |
| `soft_box.lineWidth` | `number` |
| `soft_box.rectProps` | {} |
| `soft_box.shadowBlur` | `number` |
| `soft_box.shadowColor` | `string` |
| `soft_box.shadowOffset` | `number`[] |
| `soft_box.stroke` | `string` |
| `word_by_word` | \{ `colors`: \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } ; `font`: \{ `family`: `string` = "Bangers"; `size`: `number` = WORD\_BY\_WORD\_FONT\_SIZE; `weight`: `number` = 700 } ; `lineWidth`: `number` = WORD\_BY\_WORD\_GEOMETRY.lineWidth; `rectProps`: {} = WORD\_BY\_WORD\_GEOMETRY.rectProps; `shadowBlur`: `number` = 5; `shadowColor`: `string` = "#000000"; `shadowOffset`: `number`[] ; `stroke`: `string` = "#000000" } |
| `word_by_word.colors` | \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } |
| `word_by_word.colors.bgColor` | `string` |
| `word_by_word.colors.highlight` | `string` |
| `word_by_word.colors.text` | `string` |
| `word_by_word.font` | \{ `family`: `string` = "Bangers"; `size`: `number` = WORD\_BY\_WORD\_FONT\_SIZE; `weight`: `number` = 700 } |
| `word_by_word.font.family` | `string` |
| `word_by_word.font.size` | `number` |
| `word_by_word.font.weight` | `number` |
| `word_by_word.lineWidth` | `number` |
| `word_by_word.rectProps` | {} |
| `word_by_word.shadowBlur` | `number` |
| `word_by_word.shadowColor` | `string` |
| `word_by_word.shadowOffset` | `number`[] |
| `word_by_word.stroke` | `string` |
| `word_by_word_with_bg` | \{ `colors`: \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } ; `font`: \{ `family`: `string` = "Bangers"; `size`: `number` = WORD\_BY\_WORD\_WITH\_BG\_FONT\_SIZE; `weight`: `number` = 700 } ; `lineWidth`: `number` = WORD\_BY\_WORD\_WITH\_BG\_GEOMETRY.lineWidth; `rectProps`: {} = WORD\_BY\_WORD\_WITH\_BG\_GEOMETRY.rectProps; `shadowBlur`: `number` = 5; `shadowColor`: `string` = "#000000"; `shadowOffset`: `number`[]  } |
| `word_by_word_with_bg.colors` | \{ `bgColor`: `string` = "#444444"; `highlight`: `string` = "#ff4081"; `text`: `string` = "#ffffff" } |
| `word_by_word_with_bg.colors.bgColor` | `string` |
| `word_by_word_with_bg.colors.highlight` | `string` |
| `word_by_word_with_bg.colors.text` | `string` |
| `word_by_word_with_bg.font` | \{ `family`: `string` = "Bangers"; `size`: `number` = WORD\_BY\_WORD\_WITH\_BG\_FONT\_SIZE; `weight`: `number` = 700 } |
| `word_by_word_with_bg.font.family` | `string` |
| `word_by_word_with_bg.font.size` | `number` |
| `word_by_word_with_bg.font.weight` | `number` |
| `word_by_word_with_bg.lineWidth` | `number` |
| `word_by_word_with_bg.rectProps` | {} |
| `word_by_word_with_bg.shadowBlur` | `number` |
| `word_by_word_with_bg.shadowColor` | `string` |
| `word_by_word_with_bg.shadowOffset` | `number`[] |

#### Defined in

[studio/src/helpers/constant.ts:15](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/helpers/constant.ts#L15)

___

### DEFAULT\_PROJECT\_TEMPLATES

• `Const` **DEFAULT\_PROJECT\_TEMPLATES**: [`ProjectTemplate`](interfaces/ProjectTemplate.md)[]

#### Defined in

[studio/src/templates/default-templates.ts:4](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/templates/default-templates.ts#L4)

___

### DEFAULT\_STUDIO\_CONFIG

• `Const` **DEFAULT\_STUDIO\_CONFIG**: [`StudioConfig`](interfaces/StudioConfig.md)

#### Defined in

[studio/src/profiles/index.ts:9](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/profiles/index.ts#L9)

___

### DEMO\_STUDIO\_CONFIG

• `Const` **DEMO\_STUDIO\_CONFIG**: [`StudioConfig`](interfaces/StudioConfig.md)

#### Defined in

[studio/src/profiles/index.ts:22](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/profiles/index.ts#L22)

___

### EDU\_STUDIO\_CONFIG

• `Const` **EDU\_STUDIO\_CONFIG**: [`StudioConfig`](interfaces/StudioConfig.md)

#### Defined in

[studio/src/profiles/index.ts:14](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/profiles/index.ts#L14)

___

### LivePlayerProvider

• **LivePlayerProvider**: `any`

___

### MARKETING\_STUDIO\_CONFIG

• `Const` **MARKETING\_STUDIO\_CONFIG**: [`StudioConfig`](interfaces/StudioConfig.md)

#### Defined in

[studio/src/profiles/index.ts:30](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/profiles/index.ts#L30)

## Functions

### AnnotationsPanel

▸ **AnnotationsPanel**(`«destructured»`): `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`PanelProps`](interfaces/PanelProps.md) |

#### Returns

`ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

[studio/src/components/panel/annotations-panel.tsx:17](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/annotations-panel.tsx#L17)

___

### AudioPanel

▸ **AudioPanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `AudioPanelProps` |

#### Returns

`Element`

#### Defined in

[studio/src/components/panel/audio-panel.tsx:38](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/audio-panel.tsx#L38)

___

### CaptionsPanel

▸ **CaptionsPanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `addCaption` | () => `void` |
| › `captions` | [`CaptionPanelEntry`](modules.md#captionpanelentry)[] |
| › `deleteCaption` | (`index`: `number`) => `void` |
| › `splitCaption` | (`index`: `number`) => `void` \| `Promise`\<`void`\> |
| › `updateCaption` | (`index`: `number`, `caption`: [`CaptionPanelEntry`](modules.md#captionpanelentry)) => `void` |

#### Returns

`Element`

#### Defined in

[studio/src/components/panel/captions-panel.tsx:49](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/captions-panel.tsx#L49)

___

### ChaptersPanel

▸ **ChaptersPanel**(`_props`): `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_props` | [`PanelProps`](interfaces/PanelProps.md) |

#### Returns

`ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

[studio/src/components/panel/chapters-panel.tsx:9](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/chapters-panel.tsx#L9)

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

[studio/src/components/panel/circle-panel.tsx:45](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/circle-panel.tsx#L45)

___

### CloudMediaUpload

▸ **CloudMediaUpload**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`CloudMediaUploadProps`](interfaces/CloudMediaUploadProps.md) |

#### Returns

`Element`

#### Defined in

[studio/src/components/shared/cloud-media-upload.tsx:21](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/shared/cloud-media-upload.tsx#L21)

___

### EmojiPanel

▸ **EmojiPanel**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `EmojiPanelProps` |

#### Returns

`Element`

#### Defined in

[studio/src/components/panel/emoji-panel.tsx:10](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/emoji-panel.tsx#L10)

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

[studio/src/components/panel/image-panel.tsx:34](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/image-panel.tsx#L34)

___

### RecordPanel

▸ **RecordPanel**(`«destructured»`): `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`PanelProps`](interfaces/PanelProps.md) |

#### Returns

`ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

[studio/src/components/panel/record-panel.tsx:6](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/record-panel.tsx#L6)

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

[studio/src/components/panel/rect-panel.tsx:42](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/rect-panel.tsx#L42)

___

### ScriptPanel

▸ **ScriptPanel**(`«destructured»`): `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`PanelProps`](interfaces/PanelProps.md) |

#### Returns

`ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

[studio/src/components/panel/script-panel.tsx:11](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/script-panel.tsx#L11)

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

[studio/src/components/header.tsx:32](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/header.tsx#L32)

___

### TemplateGalleryPanel

▸ **TemplateGalleryPanel**(`«destructured»`): `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `TemplateGalleryPanelProps` |

#### Returns

`ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

[studio/src/components/panel/template-gallery-panel.tsx:10](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/template-gallery-panel.tsx#L10)

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

[studio/src/components/panel/text-panel.tsx:63](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/text-panel.tsx#L63)

___

### Toolbar

▸ **Toolbar**(`«destructured»`): `Element`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | `undefined` |
| › `customTools?` | [`ToolCategory`](interfaces/ToolCategory.md)[] | `[]` |
| › `hiddenTools?` | `string`[] | `[]` |
| › `selectedTool` | `string` | `undefined` |
| › `setSelectedTool` | (`tool`: `string`) => `void` | `undefined` |

#### Returns

`Element`

#### Defined in

[studio/src/components/toolbar.tsx:73](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/toolbar.tsx#L73)

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

[studio/src/components/twick-studio.tsx:32](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/twick-studio.tsx#L32)

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

[studio/src/components/panel/video-panel.tsx:36](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/components/panel/video-panel.tsx#L36)

___

### exportProjectBundle

▸ **exportProjectBundle**(`project`, `options?`): [`ProjectBundleExport`](interfaces/ProjectBundleExport.md)

Creates a portable export bundle with project JSON, chapters, and captions.
This intentionally avoids zip dependencies; callers can zip externally.

#### Parameters

| Name | Type |
| :------ | :------ |
| `project` | `ProjectJSON` |
| `options?` | [`ExportProjectBundleOptions`](interfaces/ExportProjectBundleOptions.md) |

#### Returns

[`ProjectBundleExport`](interfaces/ProjectBundleExport.md)

#### Defined in

[studio/src/helpers/export-project-bundle.ts:33](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/helpers/export-project-bundle.ts#L33)

___

### useCloudMediaUpload

▸ **useCloudMediaUpload**(`config`): [`UseCloudMediaUploadReturn`](interfaces/UseCloudMediaUploadReturn.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`UseCloudMediaUploadConfig`](interfaces/UseCloudMediaUploadConfig.md) |

#### Returns

[`UseCloudMediaUploadReturn`](interfaces/UseCloudMediaUploadReturn.md)

#### Defined in

[studio/src/hooks/use-cloud-media-upload.ts:64](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-cloud-media-upload.ts#L64)

___

### useGenerateCaptions

▸ **useGenerateCaptions**(`studioConfig?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `studioConfig?` | [`StudioConfig`](interfaces/StudioConfig.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `addCaptionsToTimeline` | (`captions`: [`CaptionEntry`](interfaces/CaptionEntry.md)[]) => `void` |
| `getCaptionstatus` | (`reqId`: `string`) => `Promise`\<[`ICaptionGenerationPollingResponse`](interfaces/ICaptionGenerationPollingResponse.md)\> |
| `onGenerateCaptions` | (`videoElement`: `VideoElement`, `language?`: `string`, `phraseLength?`: [`CaptionPhraseLength`](modules.md#captionphraselength)) => `Promise`\<``null`` \| `string`\> |
| `pollingIntervalMs` | `number` |

#### Defined in

[studio/src/hooks/use-generate-captions.ts:9](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-generate-captions.ts#L9)

___

### useScreenRecorder

▸ **useScreenRecorder**(): `UseScreenRecorderReturn`

#### Returns

`UseScreenRecorderReturn`

#### Defined in

[studio/src/hooks/use-screen-recorder.ts:14](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-screen-recorder.ts#L14)

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

[studio/src/hooks/use-studio-manager.tsx:32](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-studio-manager.tsx#L32)
