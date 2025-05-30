[@twick/media-utils](README.md) / Exports

# @twick/media-utils

## Table of contents

### Type Aliases

- [Dimensions](modules.md#dimensions)
- [Position](modules.md#position)
- [VideoMeta](modules.md#videometa)

### Functions

- [blobUrlToFile](modules.md#bloburltofile)
- [detectMediaTypeFromUrl](modules.md#detectmediatypefromurl)
- [downloadFile](modules.md#downloadfile)
- [getAudioDuration](modules.md#getaudioduration)
- [getImageDimensions](modules.md#getimagedimensions)
- [getObjectFitSize](modules.md#getobjectfitsize)
- [getScaledDimensions](modules.md#getscaleddimensions)
- [getThumbnail](modules.md#getthumbnail)
- [getVideoMeta](modules.md#getvideometa)
- [limit](modules.md#limit)
- [saveAsFile](modules.md#saveasfile)

## Type Aliases

### Dimensions

Ƭ **Dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[types.ts:1](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/types.ts#L1)

___

### Position

Ƭ **Position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[types.ts:3](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/types.ts#L3)

___

### VideoMeta

Ƭ **VideoMeta**: [`Dimensions`](modules.md#dimensions) & \{ `duration`: `number`  }

#### Defined in

[types.ts:5](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/types.ts#L5)

## Functions

### blobUrlToFile

▸ **blobUrlToFile**(`blobUrl`, `fileName`): `Promise`\<`File`\>

Converts a Blob URL to a File object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blobUrl` | `string` | The Blob URL to convert. |
| `fileName` | `string` | The name to assign to the resulting File. |

#### Returns

`Promise`\<`File`\>

A Promise that resolves to a File object.

#### Defined in

[file-helper.ts:8](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/file-helper.ts#L8)

___

### detectMediaTypeFromUrl

▸ **detectMediaTypeFromUrl**(`url`): `Promise`\<``"image"`` \| ``"video"`` \| ``"audio"`` \| ``null``\>

Detects the media type (image, video, or audio) of a given URL by sending a HEAD request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the media file. |

#### Returns

`Promise`\<``"image"`` \| ``"video"`` \| ``"audio"`` \| ``null``\>

A promise that resolves to 'image', 'video', or 'audio' based on the Content-Type header,
         or `null` if the type couldn't be determined or the request fails.

#### Defined in

[url-helper.ts:8](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/url-helper.ts#L8)

___

### downloadFile

▸ **downloadFile**(`url`, `filename`): `Promise`\<`void`\>

Downloads a file from a given URL and triggers a browser download.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the file to download. |
| `filename` | `string` | The name of the file to be saved. |

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the download is initiated or rejects if there is an error.

#### Defined in

[file-helper.ts:41](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/file-helper.ts#L41)

___

### getAudioDuration

▸ **getAudioDuration**(`audioSrc`): `Promise`\<`number`\>

Retrieves the duration (in seconds) of an audio file from a given source URL.
Uses a cache to avoid reloading the same audio multiple times.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audioSrc` | `string` | The source URL of the audio file. |

#### Returns

`Promise`\<`number`\>

A Promise that resolves to the duration of the audio in seconds.

#### Defined in

[get-audio-duration.ts:10](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/get-audio-duration.ts#L10)

___

### getImageDimensions

▸ **getImageDimensions**(`url`): `Promise`\<[`Dimensions`](modules.md#dimensions)\>

Gets the dimensions (width and height) of an image from the given URL.
Uses a cache to avoid reloading the image if already fetched.
Also uses a concurrency limiter to control resource usage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the image. |

#### Returns

`Promise`\<[`Dimensions`](modules.md#dimensions)\>

A Promise that resolves to an object containing `width` and `height`.

#### Defined in

[get-image-dimensions.ts:35](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/get-image-dimensions.ts#L35)

___

### getObjectFitSize

▸ **getObjectFitSize**(`objectFit`, `elementSize`, `containerSize`): [`Dimensions`](modules.md#dimensions)

Calculates the resized dimensions of an element to fit inside a container
based on the specified object-fit strategy ("contain", "cover", "fill", or default).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objectFit` | `string` | The object-fit behavior ('contain', 'cover', 'fill', or default/fallback). |
| `elementSize` | [`Dimensions`](modules.md#dimensions) | The original size of the element (width and height). |
| `containerSize` | [`Dimensions`](modules.md#dimensions) | The size of the container (width and height). |

#### Returns

[`Dimensions`](modules.md#dimensions)

An object containing the calculated width and height for the element.

#### Defined in

[dimension-handler.ts:63](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/dimension-handler.ts#L63)

___

### getScaledDimensions

▸ **getScaledDimensions**(`width`, `height`, `maxWidth`, `maxHeight`): [`Dimensions`](modules.md#dimensions)

Calculates the scaled dimensions of an element to fit inside a container
based on the specified max dimensions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | The original width of the element. |
| `height` | `number` | The original height of the element. |
| `maxWidth` | `number` | The maximum width of the container. |
| `maxHeight` | `number` | The maximum height of the container. |

#### Returns

[`Dimensions`](modules.md#dimensions)

An object containing the calculated width and height for the element.

#### Defined in

[dimension-handler.ts:13](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/dimension-handler.ts#L13)

___

### getThumbnail

▸ **getThumbnail**(`videoUrl`, `seekTime?`, `playbackRate?`): `Promise`\<`string`\>

Extracts a thumbnail from a video at a specific seek time and playback rate.

This function creates a hidden `<video>` element in the browser,
seeks to the specified time, and captures the frame into a canvas,
which is then exported as a JPEG data URL or Blob URL.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `videoUrl` | `string` | `undefined` | The URL of the video to extract the thumbnail from. |
| `seekTime` | `number` | `0.1` | The time in seconds at which to capture the frame. Default is 0.1s. |
| `playbackRate` | `number` | `1` | Playback speed for the video. Default is 1. |

#### Returns

`Promise`\<`string`\>

A Promise that resolves to a thumbnail image URL (either a base64 data URL or blob URL).

#### Defined in

[get-thumbnail.ts:13](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/get-thumbnail.ts#L13)

___

### getVideoMeta

▸ **getVideoMeta**(`videoSrc`): `Promise`\<[`VideoMeta`](modules.md#videometa)\>

Fetches metadata (width, height, duration) for a given video source.
If metadata has already been fetched and cached, it returns the cached data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoSrc` | `string` | The URL or path to the video file. |

#### Returns

`Promise`\<[`VideoMeta`](modules.md#videometa)\>

A Promise that resolves to an object containing video metadata.

#### Defined in

[get-video-metadata.ts:11](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/get-video-metadata.ts#L11)

___

### limit

▸ **limit**\<`T`\>(`fn`): `Promise`\<`T`\>

Wraps an async function to enforce concurrency limits.
If concurrency limit is reached, the function is queued and executed later.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `Promise`\<`T`\> | Async function returning a Promise |

#### Returns

`Promise`\<`T`\>

Promise that resolves/rejects with fn's result

#### Defined in

[limit.ts:33](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/limit.ts#L33)

___

### saveAsFile

▸ **saveAsFile**(`content`, `type`, `name`): `void`

Triggers a download of a file from a string or Blob.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `Blob` | The content to save, either a string or a Blob. |
| `type` | `string` | The MIME type of the content. |
| `name` | `string` | The name of the file to be saved. |

#### Returns

`void`

#### Defined in

[file-helper.ts:21](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/media-utils/src/file-helper.ts#L21)
