[@twick/workflow](README.md) / Exports

# @twick/workflow

## Table of contents

### Interfaces

- [ApplyCaptionToEditorInput](interfaces/ApplyCaptionToEditorInput.md)
- [CaptionProjectApplyInput](interfaces/CaptionProjectApplyInput.md)
- [CaptionProjectBuildInput](interfaces/CaptionProjectBuildInput.md)
- [CaptionSegmentMs](interfaces/CaptionSegmentMs.md)
- [CaptionTrackBuildInput](interfaces/CaptionTrackBuildInput.md)
- [CaptionTrackStyle](interfaces/CaptionTrackStyle.md)
- [TemplateSpec](interfaces/TemplateSpec.md)
- [TemplateTrackSpec](interfaces/TemplateTrackSpec.md)

### Type Aliases

- [WorkflowProjectJSON](modules.md#workflowprojectjson)
- [WorkflowProjectPatch](modules.md#workflowprojectpatch)

### Functions

- [applyCaptionsToEditor](modules.md#applycaptionstoeditor)
- [applyCaptionsToProject](modules.md#applycaptionstoproject)
- [applyProjectPatch](modules.md#applyprojectpatch)
- [applyTemplateToExistingProject](modules.md#applytemplatetoexistingproject)
- [buildCaptionProject](modules.md#buildcaptionproject)
- [buildCaptionTrack](modules.md#buildcaptiontrack)
- [buildProjectFromTemplateSpec](modules.md#buildprojectfromtemplatespec)
- [buildProjectVariantFromTemplate](modules.md#buildprojectvariantfromtemplate)

## Type Aliases

### WorkflowProjectJSON

Ƭ **WorkflowProjectJSON**: `ProjectJSON` & \{ `properties?`: \{ `height`: `number` ; `width`: `number`  }  }

#### Defined in

types.ts:96

___

### WorkflowProjectPatch

Ƭ **WorkflowProjectPatch**: \{ `payload`: [`CaptionProjectApplyInput`](interfaces/CaptionProjectApplyInput.md) ; `type`: ``"captions"``  }

#### Defined in

projects.ts:5

## Functions

### applyCaptionsToEditor

▸ **applyCaptionsToEditor**(`editor`, `input`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `editor` | `TimelineEditor` |
| `input` | [`ApplyCaptionToEditorInput`](interfaces/ApplyCaptionToEditorInput.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

captions.ts:273

___

### applyCaptionsToProject

▸ **applyCaptionsToProject**(`project`, `input`): `ProjectJSON`

#### Parameters

| Name | Type |
| :------ | :------ |
| `project` | `ProjectJSON` |
| `input` | [`CaptionProjectApplyInput`](interfaces/CaptionProjectApplyInput.md) |

#### Returns

`ProjectJSON`

#### Defined in

captions.ts:163

___

### applyProjectPatch

▸ **applyProjectPatch**(`project`, `patch`): `ProjectJSON`

#### Parameters

| Name | Type |
| :------ | :------ |
| `project` | `ProjectJSON` |
| `patch` | `Object` |
| `patch.payload` | [`CaptionProjectApplyInput`](interfaces/CaptionProjectApplyInput.md) |
| `patch.type` | ``"captions"`` |

#### Returns

`ProjectJSON`

#### Defined in

projects.ts:11

___

### applyTemplateToExistingProject

▸ **applyTemplateToExistingProject**(`project`, `spec`): [`WorkflowProjectJSON`](modules.md#workflowprojectjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `project` | `ProjectJSON` |
| `spec` | [`TemplateSpec`](interfaces/TemplateSpec.md) |

#### Returns

[`WorkflowProjectJSON`](modules.md#workflowprojectjson)

#### Defined in

templates.ts:56

___

### buildCaptionProject

▸ **buildCaptionProject**(`input`): [`WorkflowProjectJSON`](modules.md#workflowprojectjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`CaptionProjectBuildInput`](interfaces/CaptionProjectBuildInput.md) |

#### Returns

[`WorkflowProjectJSON`](modules.md#workflowprojectjson)

#### Defined in

captions.ts:102

___

### buildCaptionTrack

▸ **buildCaptionTrack**(`input`): `TrackJSON`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`CaptionTrackBuildInput`](interfaces/CaptionTrackBuildInput.md) |

#### Returns

`TrackJSON`

#### Defined in

captions.ts:65

___

### buildProjectFromTemplateSpec

▸ **buildProjectFromTemplateSpec**(`spec`): [`WorkflowProjectJSON`](modules.md#workflowprojectjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | [`TemplateSpec`](interfaces/TemplateSpec.md) |

#### Returns

[`WorkflowProjectJSON`](modules.md#workflowprojectjson)

#### Defined in

templates.ts:23

___

### buildProjectVariantFromTemplate

▸ **buildProjectVariantFromTemplate**(`baseProject`, `spec`): [`WorkflowProjectJSON`](modules.md#workflowprojectjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseProject` | `ProjectJSON` |
| `spec` | [`TemplateSpec`](interfaces/TemplateSpec.md) |

#### Returns

[`WorkflowProjectJSON`](modules.md#workflowprojectjson)

#### Defined in

templates.ts:36
