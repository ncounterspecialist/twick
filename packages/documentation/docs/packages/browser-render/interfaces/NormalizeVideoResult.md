[@twick/browser-render](../README.md) / [Exports](../modules.md) / NormalizeVideoResult

# Interface: NormalizeVideoResult

Result of normalization

## Table of contents

### Properties

- [blob](NormalizeVideoResult.md#blob)
- [debug](NormalizeVideoResult.md#debug)
- [size](NormalizeVideoResult.md#size)

## Properties

### blob

• **blob**: `Blob`

Normalized video Blob (MP4, H.264 + AAC).

#### Defined in

[audio/video-normalizer.ts:27](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/audio/video-normalizer.ts#L27)

___

### debug

• `Optional` **debug**: `Object`

Optional debug information (durations, etc.).

#### Type declaration

| Name | Type |
| :------ | :------ |
| `execMs` | `number` |
| `loadMs` | `number` |
| `readMs` | `number` |
| `totalMs` | `number` |
| `writeMs` | `number` |

#### Defined in

[audio/video-normalizer.ts:31](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/audio/video-normalizer.ts#L31)

___

### size

• **size**: `number`

Size in bytes of the normalized video.

#### Defined in

[audio/video-normalizer.ts:29](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/browser-render/src/audio/video-normalizer.ts#L29)
