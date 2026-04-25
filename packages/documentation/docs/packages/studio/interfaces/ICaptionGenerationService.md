[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / ICaptionGenerationService

# Interface: ICaptionGenerationService

## Table of contents

### Properties

- [generateCaptionVideo](ICaptionGenerationService.md#generatecaptionvideo)
- [generateCaptions](ICaptionGenerationService.md#generatecaptions)
- [getRequestStatus](ICaptionGenerationService.md#getrequeststatus)
- [pollingIntervalMs](ICaptionGenerationService.md#pollingintervalms)
- [updateProjectWithCaptions](ICaptionGenerationService.md#updateprojectwithcaptions)

## Properties

### generateCaptionVideo

• `Optional` **generateCaptionVideo**: (`videoUrl`: `string`, `videoSize?`: \{ `height`: `number` ; `width`: `number`  }) => `Promise`\<`string`\>

#### Type declaration

▸ (`videoUrl`, `videoSize?`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `videoUrl` | `string` |
| `videoSize?` | `Object` |
| `videoSize.height` | `number` |
| `videoSize.width` | `number` |

##### Returns

`Promise`\<`string`\>

#### Defined in

[studio/src/types/index.ts:115](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L115)

___

### generateCaptions

• **generateCaptions**: (`videoElement`: `VideoElement`, `project`: `ProjectJSON`, `language?`: `string`, `phraseLength?`: [`CaptionPhraseLength`](../modules.md#captionphraselength)) => `Promise`\<`string`\>

#### Type declaration

▸ (`videoElement`, `project`, `language?`, `phraseLength?`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `videoElement` | `VideoElement` |
| `project` | `ProjectJSON` |
| `language?` | `string` |
| `phraseLength?` | [`CaptionPhraseLength`](../modules.md#captionphraselength) |

##### Returns

`Promise`\<`string`\>

#### Defined in

[studio/src/types/index.ts:104](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L104)

___

### getRequestStatus

• **getRequestStatus**: (`reqId`: `string`) => `Promise`\<[`ICaptionGenerationPollingResponse`](ICaptionGenerationPollingResponse.md)\>

#### Type declaration

▸ (`reqId`): `Promise`\<[`ICaptionGenerationPollingResponse`](ICaptionGenerationPollingResponse.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `reqId` | `string` |

##### Returns

`Promise`\<[`ICaptionGenerationPollingResponse`](ICaptionGenerationPollingResponse.md)\>

#### Defined in

[studio/src/types/index.ts:120](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L120)

___

### pollingIntervalMs

• `Optional` **pollingIntervalMs**: `number`

Polling interval in milliseconds for caption status checks. Defaults to 5000.

#### Defined in

[studio/src/types/index.ts:125](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L125)

___

### updateProjectWithCaptions

• **updateProjectWithCaptions**: (`captions`: [`CaptionEntry`](CaptionEntry.md)[]) => `ProjectJSON`

#### Type declaration

▸ (`captions`): `ProjectJSON`

##### Parameters

| Name | Type |
| :------ | :------ |
| `captions` | [`CaptionEntry`](CaptionEntry.md)[] |

##### Returns

`ProjectJSON`

#### Defined in

[studio/src/types/index.ts:111](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L111)
