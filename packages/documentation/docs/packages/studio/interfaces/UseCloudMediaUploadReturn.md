[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / UseCloudMediaUploadReturn

# Interface: UseCloudMediaUploadReturn

## Table of contents

### Properties

- [error](UseCloudMediaUploadReturn.md#error)
- [isUploading](UseCloudMediaUploadReturn.md#isuploading)
- [progress](UseCloudMediaUploadReturn.md#progress)
- [resetError](UseCloudMediaUploadReturn.md#reseterror)
- [uploadFile](UseCloudMediaUploadReturn.md#uploadfile)

## Properties

### error

• **error**: ``null`` \| `string`

#### Defined in

[studio/src/hooks/use-cloud-media-upload.ts:28](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-cloud-media-upload.ts#L28)

___

### isUploading

• **isUploading**: `boolean`

#### Defined in

[studio/src/hooks/use-cloud-media-upload.ts:26](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-cloud-media-upload.ts#L26)

___

### progress

• **progress**: `number`

#### Defined in

[studio/src/hooks/use-cloud-media-upload.ts:27](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-cloud-media-upload.ts#L27)

___

### resetError

• **resetError**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[studio/src/hooks/use-cloud-media-upload.ts:29](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-cloud-media-upload.ts#L29)

___

### uploadFile

• **uploadFile**: (`file`: `File`) => `Promise`\<\{ `url`: `string`  }\>

#### Type declaration

▸ (`file`): `Promise`\<\{ `url`: `string`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |

##### Returns

`Promise`\<\{ `url`: `string`  }\>

#### Defined in

[studio/src/hooks/use-cloud-media-upload.ts:25](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/hooks/use-cloud-media-upload.ts#L25)
