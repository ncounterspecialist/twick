[@twick/ai-models](../README.md) / [Exports](../modules.md) / ProviderGenerationOutput

# Interface: ProviderGenerationOutput

## Table of contents

### Properties

- [captions](ProviderGenerationOutput.md#captions)
- [durationMs](ProviderGenerationOutput.md#durationms)
- [localizedTrack](ProviderGenerationOutput.md#localizedtrack)
- [media](ProviderGenerationOutput.md#media)
- [mediaUrl](ProviderGenerationOutput.md#mediaurl)
- [overlayPatch](ProviderGenerationOutput.md#overlaypatch)
- [projectPatch](ProviderGenerationOutput.md#projectpatch)
- [providerMeta](ProviderGenerationOutput.md#providermeta)
- [segments](ProviderGenerationOutput.md#segments)
- [thumbnailUrl](ProviderGenerationOutput.md#thumbnailurl)
- [variantPatch](ProviderGenerationOutput.md#variantpatch)

## Properties

### captions

• `Optional` **captions**: [`TimedTextSegment`](TimedTextSegment.md)[]

#### Defined in

orchestration-types.ts:227

___

### durationMs

• `Optional` **durationMs**: `number`

#### Defined in

orchestration-types.ts:225

___

### localizedTrack

• `Optional` **localizedTrack**: [`LocalizedTrackResult`](LocalizedTrackResult.md)

#### Defined in

orchestration-types.ts:229

___

### media

• `Optional` **media**: [`MediaAssetResult`](MediaAssetResult.md)[]

#### Defined in

orchestration-types.ts:228

___

### mediaUrl

• `Optional` **mediaUrl**: `string`

#### Defined in

orchestration-types.ts:223

___

### overlayPatch

• `Optional` **overlayPatch**: [`TimelineOverlayPatch`](TimelineOverlayPatch.md)

#### Defined in

orchestration-types.ts:231

___

### projectPatch

• `Optional` **projectPatch**: [`ProjectAssemblyPatch`](ProjectAssemblyPatch.md)

#### Defined in

orchestration-types.ts:230

___

### providerMeta

• `Optional` **providerMeta**: `Record`\<`string`, `unknown`\>

#### Defined in

orchestration-types.ts:233

___

### segments

• `Optional` **segments**: [`TimedTextSegment`](TimedTextSegment.md)[]

#### Defined in

orchestration-types.ts:226

___

### thumbnailUrl

• `Optional` **thumbnailUrl**: `string`

#### Defined in

orchestration-types.ts:224

___

### variantPatch

• `Optional` **variantPatch**: [`TimelineVariantPatch`](TimelineVariantPatch.md)

#### Defined in

orchestration-types.ts:232
