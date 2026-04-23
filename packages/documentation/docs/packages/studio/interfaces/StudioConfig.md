[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / StudioConfig

# Interface: StudioConfig

## Hierarchy

- `VideoEditorConfig`

  ↳ **`StudioConfig`**

## Table of contents

### Properties

- [canvasConfig](StudioConfig.md#canvasconfig)
- [captionGenerationService](StudioConfig.md#captiongenerationservice)
- [customPanels](StudioConfig.md#custompanels)
- [customTools](StudioConfig.md#customtools)
- [exportVideo](StudioConfig.md#exportvideo)
- [hiddenTools](StudioConfig.md#hiddentools)
- [imageGenerationService](StudioConfig.md#imagegenerationservice)
- [loadProject](StudioConfig.md#loadproject)
- [media](StudioConfig.md#media)
- [saveProject](StudioConfig.md#saveproject)
- [scriptToTimelineService](StudioConfig.md#scripttotimelineservice)
- [templates](StudioConfig.md#templates)
- [translationService](StudioConfig.md#translationservice)
- [uploadConfig](StudioConfig.md#uploadconfig)
- [videoGenerationService](StudioConfig.md#videogenerationservice)
- [voiceoverGenerationService](StudioConfig.md#voiceovergenerationservice)

## Properties

### canvasConfig

• `Optional` **canvasConfig**: `CanvasConfig`

Canvas behavior options (e.g. enableShiftAxisLock). Same as editorConfig.canvasConfig in TwickEditor.

#### Overrides

VideoEditorConfig.canvasConfig

#### Defined in

[studio/src/types/index.ts:145](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L145)

___

### captionGenerationService

• `Optional` **captionGenerationService**: [`ICaptionGenerationService`](ICaptionGenerationService.md)

Caption generation service for polling-based async caption generation
Implement this in your application code to provide API endpoints

#### Defined in

[studio/src/types/index.ts:152](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L152)

___

### customPanels

• `Optional` **customPanels**: `Record`\<`string`, `ComponentType`\<[`PanelProps`](PanelProps.md)\>\>

Custom panel renderers keyed by tool id.

#### Defined in

[studio/src/types/index.ts:174](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L174)

___

### customTools

• `Optional` **customTools**: [`ToolCategory`](ToolCategory.md)[]

Extra tool definitions injected into the left toolbar.

#### Defined in

[studio/src/types/index.ts:170](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L170)

___

### exportVideo

• `Optional` **exportVideo**: (`project`: `ProjectJSON`, `videoSettings`: [`VideoSettings`](VideoSettings.md)) => `Promise`\<[`Result`](Result.md)\>

#### Type declaration

▸ (`project`, `videoSettings`): `Promise`\<[`Result`](Result.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `project` | `ProjectJSON` |
| `videoSettings` | [`VideoSettings`](VideoSettings.md) |

##### Returns

`Promise`\<[`Result`](Result.md)\>

#### Defined in

[studio/src/types/index.ts:163](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L163)

___

### hiddenTools

• `Optional` **hiddenTools**: `string`[]

Tool ids that should be hidden from the default toolbar.

#### Defined in

[studio/src/types/index.ts:172](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L172)

___

### imageGenerationService

• `Optional` **imageGenerationService**: [`IImageGenerationService`](IImageGenerationService.md)

Image generation service for polling-based async image generation

#### Defined in

[studio/src/types/index.ts:154](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L154)

___

### loadProject

• `Optional` **loadProject**: () => `Promise`\<`ProjectJSON`\>

#### Type declaration

▸ (): `Promise`\<`ProjectJSON`\>

##### Returns

`Promise`\<`ProjectJSON`\>

#### Defined in

[studio/src/types/index.ts:147](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L147)

___

### media

• `Optional` **media**: `Object`

Media library configuration (multi-tenant safe).

By default, Twick Studio uses an IndexedDB-backed `BrowserMediaManager` and
seeds demo defaults (Pexels/Pixabay URLs). In production SaaS, you typically:
- set `seed` to the string `"none"`
- set `namespace` to a tenant-scoped string (for example env, tenant id, and user id joined with colons)
- optionally provide a custom `manager` that talks to your backend

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `createManager?` | () => `BaseMediaManager` | - |
| `manager?` | `BaseMediaManager` | Provide a media manager implementation (remote-backed, custom cache, etc.). If omitted, Studio uses an IndexedDB-backed `BrowserMediaManager`. |
| `namespace?` | `string` | Namespace key used by storage-backed media managers (e.g. IndexedDB) to isolate assets per tenant/user. If omitted, a shared default namespace is used. |
| `seed?` | \{ `items`: `Omit`\<`MediaItem`, ``"id"``\>[]  } \| ``"defaults"`` \| ``"none"`` \| (`manager`: `BaseMediaManager`) => `Promise`\<`void`\> | Controls initial seeding behavior. - `"defaults"`: seed demo defaults (backwards compatible behavior) - `"none"`: do not seed anything - `{ items }` object shape: seed with a fixed list of assets - `(mgr) => Promise<void>`: custom async seeding (e.g. fetch user library) |

#### Defined in

[studio/src/types/index.ts:187](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L187)

___

### saveProject

• `Optional` **saveProject**: (`project`: `ProjectJSON`, `fileName`: `string`) => `Promise`\<[`Result`](Result.md)\>

#### Type declaration

▸ (`project`, `fileName`): `Promise`\<[`Result`](Result.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `project` | `ProjectJSON` |
| `fileName` | `string` |

##### Returns

`Promise`\<[`Result`](Result.md)\>

#### Defined in

[studio/src/types/index.ts:146](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L146)

___

### scriptToTimelineService

• `Optional` **scriptToTimelineService**: [`IScriptToTimelineService`](IScriptToTimelineService.md)

Script-to-timeline service for AI outline expansion.

#### Defined in

[studio/src/types/index.ts:162](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L162)

___

### templates

• `Optional` **templates**: [`ProjectTemplate`](ProjectTemplate.md)[]

Optional project templates shown in Template Gallery.

#### Defined in

[studio/src/types/index.ts:176](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L176)

___

### translationService

• `Optional` **translationService**: [`ITranslationService`](ITranslationService.md)

Caption translation service for multi-language workflows.

#### Defined in

[studio/src/types/index.ts:160](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L160)

___

### uploadConfig

• `Optional` **uploadConfig**: [`UploadConfig`](UploadConfig.md)

When set, media panels show cloud upload (S3 or GCS). Backend must be configured with env (e.g. FILE_UPLOADER_S3_* or GOOGLE_CLOUD_*).
See cloud-functions/cors/ and file-uploader README for CORS and credentials.

#### Defined in

[studio/src/types/index.ts:168](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L168)

___

### videoGenerationService

• `Optional` **videoGenerationService**: [`IVideoGenerationService`](IVideoGenerationService.md)

Video generation service for polling-based async video generation

#### Defined in

[studio/src/types/index.ts:156](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L156)

___

### voiceoverGenerationService

• `Optional` **voiceoverGenerationService**: [`IVoiceoverService`](IVoiceoverService.md)

Voiceover generation service for narration generation.

#### Defined in

[studio/src/types/index.ts:158](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L158)
