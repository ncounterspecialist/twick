[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / ICaptionGenerationService

# Interface: ICaptionGenerationService

## Table of contents

### Properties

- [generateCaptionVideo](#generatecaptionvideo)
- [generateCaptions](#generatecaptions)
- [getRequestStatus](#getrequeststatus)
- [updateProjectWithCaptions](#updateprojectwithcaptions)

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

[studio/src/types/index.ts:88](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L88)

___

### generateCaptions

• **generateCaptions**: (`videoElement`: `VideoElement`, `project`: `ProjectJSON`) => `Promise`\<`string`\>

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

[studio/src/types/index.ts:93](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L93)

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

[studio/src/types/index.ts:84](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/studio/src/types/index.ts#L84)
