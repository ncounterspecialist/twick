[@twick/ai-models](README.md) / Exports

# @twick/ai-models

## Table of contents

### Classes

- [AdapterNotFoundError](classes/AdapterNotFoundError.md)
- [GenerationOrchestrator](classes/GenerationOrchestrator.md)
- [InMemoryJobStore](classes/InMemoryJobStore.md)
- [ProviderRegistry](classes/ProviderRegistry.md)
- [UnsupportedGenerationTypeError](classes/UnsupportedGenerationTypeError.md)

### Interfaces

- [AvatarGenerationInput](interfaces/AvatarGenerationInput.md)
- [CaptionGenerationInput](interfaces/CaptionGenerationInput.md)
- [CreateJobInput](interfaces/CreateJobInput.md)
- [GenerationJob](interfaces/GenerationJob.md)
- [IGenerationPollingResponse](interfaces/IGenerationPollingResponse.md)
- [ImageGenerationInput](interfaces/ImageGenerationInput.md)
- [JobStore](interfaces/JobStore.md)
- [LegacyCaptionEntry](interfaces/LegacyCaptionEntry.md)
- [LocalizedTrackResult](interfaces/LocalizedTrackResult.md)
- [MediaAssetResult](interfaces/MediaAssetResult.md)
- [ModelDimension](interfaces/ModelDimension.md)
- [ModelInfo](interfaces/ModelInfo.md)
- [OverlayAnnotation](interfaces/OverlayAnnotation.md)
- [PersonalizationVariableSet](interfaces/PersonalizationVariableSet.md)
- [ProjectAssemblyPatch](interfaces/ProjectAssemblyPatch.md)
- [ProjectSection](interfaces/ProjectSection.md)
- [ProviderAdapter](interfaces/ProviderAdapter.md)
- [ProviderConfig](interfaces/ProviderConfig.md)
- [ProviderGenerationOutput](interfaces/ProviderGenerationOutput.md)
- [ProviderJobStatusResponse](interfaces/ProviderJobStatusResponse.md)
- [ProviderStartJobRequest](interfaces/ProviderStartJobRequest.md)
- [ProviderStartJobResponse](interfaces/ProviderStartJobResponse.md)
- [ScriptToTimelineGenerationInput](interfaces/ScriptToTimelineGenerationInput.md)
- [TimedTextSegment](interfaces/TimedTextSegment.md)
- [TimelineAutoEditPatch](interfaces/TimelineAutoEditPatch.md)
- [TimelineAvatarPatch](interfaces/TimelineAvatarPatch.md)
- [TimelineBrollPatch](interfaces/TimelineBrollPatch.md)
- [TimelineCaptionPatch](interfaces/TimelineCaptionPatch.md)
- [TimelineEnhancementPatch](interfaces/TimelineEnhancementPatch.md)
- [TimelineLocalizationPatch](interfaces/TimelineLocalizationPatch.md)
- [TimelineMediaPatch](interfaces/TimelineMediaPatch.md)
- [TimelineOverlayPatch](interfaces/TimelineOverlayPatch.md)
- [TimelinePdfToVideoPatch](interfaces/TimelinePdfToVideoPatch.md)
- [TimelinePlacementHint](interfaces/TimelinePlacementHint.md)
- [TimelineVariantPatch](interfaces/TimelineVariantPatch.md)
- [TimelineVoicePatch](interfaces/TimelineVoicePatch.md)
- [TranslationGenerationInput](interfaces/TranslationGenerationInput.md)
- [VideoGenerationInput](interfaces/VideoGenerationInput.md)
- [VoiceGenerationInput](interfaces/VoiceGenerationInput.md)
- [WaitForCompletionOptions](interfaces/WaitForCompletionOptions.md)

### Type Aliases

- [AIModelCategory](modules.md#aimodelcategory)
- [AIModelProvider](modules.md#aimodelprovider)
- [GenerationInput](modules.md#generationinput)
- [GenerationType](modules.md#generationtype)
- [JobStatus](modules.md#jobstatus)
- [TimelinePatch](modules.md#timelinepatch)
- [VoiceSegment](modules.md#voicesegment)

### Functions

- [normalizeCaptionEntries](modules.md#normalizecaptionentries)
- [toTimelinePatch](modules.md#totimelinepatch)

## Type Aliases

### AIModelCategory

Ƭ **AIModelCategory**: ``"image"`` \| ``"video"`` \| ``"music"`` \| ``"voiceover"`` \| ``"translation"`` \| ``"script"``

Model catalog types for Twick generative AI integration.
Aligned with videosos-main ApiInfo structure.

#### Defined in

[types.ts:6](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L6)

___

### AIModelProvider

Ƭ **AIModelProvider**: ``"fal"`` \| ``"runware"`` \| ``"openai"`` \| ``"gemini"`` \| ``"bedrock"`` \| ``"local"``

#### Defined in

[types.ts:13](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L13)

___

### GenerationInput

Ƭ **GenerationInput**: [`VoiceGenerationInput`](interfaces/VoiceGenerationInput.md) \| [`AvatarGenerationInput`](interfaces/AvatarGenerationInput.md) \| [`CaptionGenerationInput`](interfaces/CaptionGenerationInput.md) \| [`TranslationGenerationInput`](interfaces/TranslationGenerationInput.md) \| [`ImageGenerationInput`](interfaces/ImageGenerationInput.md) \| [`VideoGenerationInput`](interfaces/VideoGenerationInput.md) \| [`ScriptToTimelineGenerationInput`](interfaces/ScriptToTimelineGenerationInput.md) \| `Record`\<`string`, `unknown`\>

#### Defined in

orchestration-types.ts:236

___

### GenerationType

Ƭ **GenerationType**: ``"caption"`` \| ``"translation"`` \| ``"voice"`` \| ``"avatar"`` \| ``"image"`` \| ``"video"`` \| ``"imageToVideo"`` \| ``"scriptToTimeline"`` \| ``"videoEnhancement"`` \| ``"assetSelection"`` \| ``"pdfToVideo"`` \| ``"overlayGeneration"`` \| ``"personalization"`` \| ``"autoEdit"`` \| ``"brollSuggestion"`` \| ``"sceneAssembly"``

#### Defined in

orchestration-types.ts:3

___

### JobStatus

Ƭ **JobStatus**: ``"queued"`` \| ``"processing"`` \| ``"completed"`` \| ``"failed"`` \| ``"cancelled"``

#### Defined in

orchestration-types.ts:21

___

### TimelinePatch

Ƭ **TimelinePatch**: [`TimelineVoicePatch`](interfaces/TimelineVoicePatch.md) \| [`TimelineAvatarPatch`](interfaces/TimelineAvatarPatch.md) \| [`TimelineCaptionPatch`](interfaces/TimelineCaptionPatch.md) \| [`TimelineMediaPatch`](interfaces/TimelineMediaPatch.md) \| [`TimelineBrollPatch`](interfaces/TimelineBrollPatch.md) \| [`TimelineOverlayPatch`](interfaces/TimelineOverlayPatch.md) \| [`TimelineLocalizationPatch`](interfaces/TimelineLocalizationPatch.md) \| [`TimelineAutoEditPatch`](interfaces/TimelineAutoEditPatch.md) \| [`TimelineVariantPatch`](interfaces/TimelineVariantPatch.md) \| [`TimelineEnhancementPatch`](interfaces/TimelineEnhancementPatch.md) \| [`TimelinePdfToVideoPatch`](interfaces/TimelinePdfToVideoPatch.md)

#### Defined in

orchestration-types.ts:322

___

### VoiceSegment

Ƭ **VoiceSegment**: [`TimedTextSegment`](interfaces/TimedTextSegment.md)

Backward compatible alias for existing voice-oriented naming.

#### Defined in

orchestration-types.ts:56

## Functions

### normalizeCaptionEntries

▸ **normalizeCaptionEntries**(`captions`): [`TimedTextSegment`](interfaces/TimedTextSegment.md)[]

Normalize legacy caption entries (milliseconds) into TimedTextSegment.

#### Parameters

| Name | Type |
| :------ | :------ |
| `captions` | [`LegacyCaptionEntry`](interfaces/LegacyCaptionEntry.md)[] |

#### Returns

[`TimedTextSegment`](interfaces/TimedTextSegment.md)[]

#### Defined in

caption-normalizer.ts:13

___

### toTimelinePatch

▸ **toTimelinePatch**(`job`): [`TimelinePatch`](modules.md#timelinepatch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | [`GenerationJob`](interfaces/GenerationJob.md) |

#### Returns

[`TimelinePatch`](modules.md#timelinepatch)

#### Defined in

timeline-injection.ts:23
