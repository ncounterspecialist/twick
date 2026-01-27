[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / ISubtitleGenerationService

# Interface: ISubtitleGenerationService

## Table of contents

### Properties

- [generateSubtitleVideo](ISubtitleGenerationService.md#generatesubtitlevideo)
- [generateSubtitles](ISubtitleGenerationService.md#generatesubtitles)
- [getRequestStatus](ISubtitleGenerationService.md#getrequeststatus)
- [updateProjectWithSubtitles](ISubtitleGenerationService.md#updateprojectwithsubtitles)

## Properties

### generateSubtitleVideo

• `Optional` **generateSubtitleVideo**: (`videoUrl`: `string`, `videoSize?`: \{ `height`: `number` ; `width`: `number`  }) => `Promise`\<`string`\>

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

[studio/src/types/index.ts:88](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L88)

___

### generateSubtitles

• **generateSubtitles**: (`videoElement`: `VideoElement`, `project`: `ProjectJSON`) => `Promise`\<`string`\>

#### Type declaration

▸ (`videoElement`, `project`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `videoElement` | `VideoElement` |
| `project` | `ProjectJSON` |

##### Returns

`Promise`\<`string`\>

#### Defined in

[studio/src/types/index.ts:79](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L79)

___

### getRequestStatus

• **getRequestStatus**: (`reqId`: `string`) => `Promise`\<[`ISubtitleGenerationPollingResponse`](ISubtitleGenerationPollingResponse.md)\>

#### Type declaration

▸ (`reqId`): `Promise`\<[`ISubtitleGenerationPollingResponse`](ISubtitleGenerationPollingResponse.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `reqId` | `string` |

##### Returns

`Promise`\<[`ISubtitleGenerationPollingResponse`](ISubtitleGenerationPollingResponse.md)\>

#### Defined in

[studio/src/types/index.ts:93](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L93)

___

### updateProjectWithSubtitles

• **updateProjectWithSubtitles**: (`subtitles`: [`SubtitleEntry`](SubtitleEntry.md)[]) => `ProjectJSON`

#### Type declaration

▸ (`subtitles`): `ProjectJSON`

##### Parameters

| Name | Type |
| :------ | :------ |
| `subtitles` | [`SubtitleEntry`](SubtitleEntry.md)[] |

##### Returns

`ProjectJSON`

#### Defined in

[studio/src/types/index.ts:84](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L84)
