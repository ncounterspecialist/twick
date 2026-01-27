[@twick/media-utils](README.md) / Exports

# @twick/media-utils

## Table of contents

### Classes

- [VideoFrameExtractor](classes/VideoFrameExtractor.md)

### Interfaces

- [AudioSegment](interfaces/AudioSegment.md)
- [VideoFrameExtractorOptions](interfaces/VideoFrameExtractorOptions.md)

### Type Aliases

- [Dimensions](modules.md#dimensions)
- [Position](modules.md#position)
- [VideoMeta](modules.md#videometa)

### Functions

- [blobUrlToFile](modules.md#bloburltofile)
- [detectMediaTypeFromUrl](modules.md#detectmediatypefromurl)
- [downloadFile](modules.md#downloadfile)
- [extractAudio](modules.md#extractaudio)
- [getAudioDuration](modules.md#getaudioduration)
- [getDefaultVideoFrameExtractor](modules.md#getdefaultvideoframeextractor)
- [getImageDimensions](modules.md#getimagedimensions)
- [getObjectFitSize](modules.md#getobjectfitsize)
- [getScaledDimensions](modules.md#getscaleddimensions)
- [getThumbnail](modules.md#getthumbnail)
- [getThumbnailCached](modules.md#getthumbnailcached)
- [getVideoMeta](modules.md#getvideometa)
- [hasAudio](modules.md#hasaudio)
- [limit](modules.md#limit)
- [loadFile](modules.md#loadfile)
- [saveAsFile](modules.md#saveasfile)
- [stitchAudio](modules.md#stitchaudio)

## Type Aliases

### Dimensions

Ƭ **Dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[types.ts:1](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/types.ts#L1)

___

### Position

Ƭ **Position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[types.ts:3](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/types.ts#L3)

___

### VideoMeta

Ƭ **VideoMeta**: [`Dimensions`](modules.md#dimensions) & \{ `duration`: `number`  }

#### Defined in

[types.ts:5](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/types.ts#L5)

## Functions

### blobUrlToFile

▸ **blobUrlToFile**(`blobUrl`, `fileName`): `Promise`\<`File`\>

Converts a Blob URL to a File object.
Fetches the blob data from the URL and creates a new File object with the specified name.
Useful for converting blob URLs back to File objects for upload or processing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blobUrl` | `string` | The Blob URL to convert |
| `fileName` | `string` | The name to assign to the resulting File object |

#### Returns

`Promise`\<`File`\>

Promise resolving to a File object with the blob data

**`Example`**

```js
const file = await blobUrlToFile("blob:http://localhost:3000/abc123", "image.jpg");
// file is now a File object that can be uploaded or processed
```

#### Defined in

[file-helper.ts:16](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/file-helper.ts#L16)

___

### detectMediaTypeFromUrl

▸ **detectMediaTypeFromUrl**(`url`): `Promise`\<``null`` \| ``"audio"`` \| ``"video"`` \| ``"image"``\>

Detects the media type (image, video, or audio) of a given URL by sending a HEAD request.
Uses a lightweight HEAD request to fetch only the headers, avoiding download of the full file.
The function analyzes the Content-Type header to determine the media type category.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the media file to analyze |

#### Returns

`Promise`\<``null`` \| ``"audio"`` \| ``"video"`` \| ``"image"``\>

Promise resolving to the detected media type or null

**`Example`**

```js
// Detect image type
const type = await detectMediaTypeFromUrl("https://example.com/image.jpg");
// type = "image"

// Detect video type
const type = await detectMediaTypeFromUrl("https://example.com/video.mp4");
// type = "video"

// Detect audio type
const type = await detectMediaTypeFromUrl("https://example.com/audio.mp3");
// type = "audio"

// Invalid or inaccessible URL
const type = await detectMediaTypeFromUrl("https://example.com/invalid");
// type = null
```

#### Defined in

[url-helper.ts:28](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/url-helper.ts#L28)

___

### downloadFile

▸ **downloadFile**(`url`, `filename`): `Promise`\<`void`\>

Downloads a file from a given URL and triggers a browser download.
Fetches the file content from the provided URL and creates a download link
to save it locally. The function handles the entire download process including
fetching, blob creation, and cleanup of temporary resources.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the file to download |
| `filename` | `string` | The name of the file to be saved locally |

#### Returns

`Promise`\<`void`\>

Promise resolving when the download is initiated

**`Example`**

```js
await downloadFile("https://example.com/image.jpg", "downloaded-image.jpg");
// Browser will automatically download the file with the specified name
```

#### Defined in

[file-helper.ts:122](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/file-helper.ts#L122)

___

### extractAudio

▸ **extractAudio**(`«destructured»`): `Promise`\<`string`\>

Extracts an audio segment from a media source between start and end times,
rendered at the specified playback rate, and returns a Blob URL to an MP3 file.
The function fetches the source, decodes the audio track using Web Audio API,
renders the segment offline for speed and determinism, encodes it as MP3 using lamejs,
and returns an object URL. Callers should revoke the URL when done.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | `undefined` |
| › `end?` | `number` | `undefined` |
| › `playbackRate?` | `number` | `1` |
| › `src` | `string` | `undefined` |
| › `start?` | `number` | `0` |

#### Returns

`Promise`\<`string`\>

Promise resolving to a Blob URL to the extracted MP3 file

**`Example`**

```js
const url = await extractAudio({ src, start: 3, end: 8, playbackRate: 1.25 });
const audio = new Audio(url);
audio.play();
// later: URL.revokeObjectURL(url);
```

#### Defined in

[audio-utils.ts:32](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/audio-utils.ts#L32)

___

### getAudioDuration

▸ **getAudioDuration**(`audioSrc`): `Promise`\<`number`\>

Retrieves the duration (in seconds) of an audio file from a given source URL.
Uses a cache to avoid reloading the same audio multiple times for better performance.
The function creates a temporary audio element, loads only metadata, and extracts
the duration without downloading the entire audio file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audioSrc` | `string` | The source URL of the audio file |

#### Returns

`Promise`\<`number`\>

Promise resolving to the duration of the audio in seconds

**`Example`**

```js
// Get duration of an MP3 file
const duration = await getAudioDuration("https://example.com/audio.mp3");
// duration = 180.5 (3 minutes and 0.5 seconds)

// Get duration of a local blob URL
const duration = await getAudioDuration("blob:http://localhost:3000/abc123");
// duration = 45.2
```

#### Defined in

[get-audio-duration.ts:23](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/get-audio-duration.ts#L23)

___

### getDefaultVideoFrameExtractor

▸ **getDefaultVideoFrameExtractor**(`options?`): [`VideoFrameExtractor`](classes/VideoFrameExtractor.md)

Get the default VideoFrameExtractor instance.
Creates one if it doesn't exist.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`VideoFrameExtractorOptions`](interfaces/VideoFrameExtractorOptions.md) |

#### Returns

[`VideoFrameExtractor`](classes/VideoFrameExtractor.md)

#### Defined in

[video-frame-extractor.ts:404](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/video-frame-extractor.ts#L404)

___

### getImageDimensions

▸ **getImageDimensions**(`url`): `Promise`\<[`Dimensions`](modules.md#dimensions)\>

Gets the dimensions (width and height) of an image from the given URL.
Uses a cache to avoid reloading the image if already fetched, and employs
a concurrency limiter to control resource usage and prevent overwhelming
the browser with too many simultaneous image loads.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the image to analyze |

#### Returns

`Promise`\<[`Dimensions`](modules.md#dimensions)\>

Promise resolving to an object containing width and height

**`Example`**

```js
// Get dimensions of a remote image
const dimensions = await getImageDimensions("https://example.com/image.jpg");
// dimensions = { width: 1920, height: 1080 }

// Get dimensions of a local blob URL
const dimensions = await getImageDimensions("blob:http://localhost:3000/abc123");
// dimensions = { width: 800, height: 600 }

// Subsequent calls for the same URL will use cache
const cachedDimensions = await getImageDimensions("https://example.com/image.jpg");
// Returns immediately from cache without reloading
```

#### Defined in

[get-image-dimensions.ts:53](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/get-image-dimensions.ts#L53)

___

### getObjectFitSize

▸ **getObjectFitSize**(`objectFit`, `elementSize`, `containerSize`): [`Dimensions`](modules.md#dimensions)

Calculates the resized dimensions of an element to fit inside a container
based on the specified object-fit strategy ("contain", "cover", "fill", or default).
Implements CSS object-fit behavior for programmatic dimension calculations.
Useful for responsive design and media scaling applications.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objectFit` | `string` | The object-fit behavior |
| `elementSize` | [`Dimensions`](modules.md#dimensions) | The original size of the element |
| `containerSize` | [`Dimensions`](modules.md#dimensions) | The size of the container |

#### Returns

[`Dimensions`](modules.md#dimensions)

Object containing the calculated width and height

**`Example`**

```js
// Contain: fit entire element inside container
const contained = getObjectFitSize("contain", {width: 1000, height: 500}, {width: 400, height: 300});
// contained = { width: 400, height: 200 }

// Cover: fill container while maintaining aspect ratio
const covered = getObjectFitSize("cover", {width: 1000, height: 500}, {width: 400, height: 300});
// covered = { width: 600, height: 300 }

// Fill: stretch to completely fill container
const filled = getObjectFitSize("fill", {width: 1000, height: 500}, {width: 400, height: 300});
// filled = { width: 400, height: 300 }
```

#### Defined in

[dimension-handler.ts:97](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/dimension-handler.ts#L97)

___

### getScaledDimensions

▸ **getScaledDimensions**(`width`, `height`, `maxWidth`, `maxHeight`): [`Dimensions`](modules.md#dimensions)

Calculates the scaled dimensions of an element to fit inside a container
based on the specified max dimensions while maintaining aspect ratio.
Ensures the resulting dimensions are even numbers and fit within the specified bounds.
If the original dimensions are already smaller than the max values, returns the original dimensions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | The original width of the element in pixels |
| `height` | `number` | The original height of the element in pixels |
| `maxWidth` | `number` | The maximum allowed width of the container in pixels |
| `maxHeight` | `number` | The maximum allowed height of the container in pixels |

#### Returns

[`Dimensions`](modules.md#dimensions)

Object containing the calculated width and height

**`Example`**

```js
// Scale down a large image to fit in a smaller container
const scaled = getScaledDimensions(1920, 1080, 800, 600);
// scaled = { width: 800, height: 450 }

// Small image that doesn't need scaling
const scaled = getScaledDimensions(400, 300, 800, 600);
// scaled = { width: 400, height: 300 }

// Ensure even dimensions for video encoding
const scaled = getScaledDimensions(1001, 1001, 1000, 1000);
// scaled = { width: 1000, height: 1000 }
```

#### Defined in

[dimension-handler.ts:30](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/dimension-handler.ts#L30)

___

### getThumbnail

▸ **getThumbnail**(`videoUrl`, `seekTime?`, `playbackRate?`): `Promise`\<`string`\>

Extracts a thumbnail from a video at a specific seek time and playback rate.
Creates a hidden video element in the browser, seeks to the specified time,
and captures the frame into a canvas, which is then exported as a JPEG data URL or Blob URL.
The function handles video loading, seeking, frame capture, and cleanup automatically.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `videoUrl` | `string` | `undefined` | The URL of the video to extract the thumbnail from |
| `seekTime` | `number` | `0.1` | The time in seconds at which to capture the frame |
| `playbackRate` | `number` | `1` | Playback speed for the video |

#### Returns

`Promise`\<`string`\>

Promise resolving to a thumbnail image URL

**`Example`**

```js
// Extract thumbnail at 5 seconds
const thumbnail = await getThumbnail("https://example.com/video.mp4", 5);
// thumbnail is a data URL like "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."

// Extract thumbnail with custom playback rate
const thumbnail = await getThumbnail("https://example.com/video.mp4", 2.5, 1.5);
```

#### Defined in

[get-thumbnail.ts:22](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/get-thumbnail.ts#L22)

___

### getThumbnailCached

▸ **getThumbnailCached**(`videoUrl`, `seekTime?`, `playbackRate?`): `Promise`\<`string`\>

Extract a frame using the default extractor instance.
This is a drop-in replacement for getThumbnail with better performance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `videoUrl` | `string` | `undefined` | The URL of the video |
| `seekTime` | `number` | `0.1` | The time in seconds to extract the frame |
| `playbackRate?` | `number` | `undefined` | Playback speed (optional, uses extractor default if not provided) |

#### Returns

`Promise`\<`string`\>

Promise resolving to a thumbnail image URL

#### Defined in

[video-frame-extractor.ts:422](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/video-frame-extractor.ts#L422)

___

### getVideoMeta

▸ **getVideoMeta**(`videoSrc`): `Promise`\<[`VideoMeta`](modules.md#videometa)\>

Fetches metadata (width, height, duration) for a given video source.
Uses a cache to avoid reloading the same video multiple times for better performance.
The function creates a temporary video element, loads only metadata, and extracts
the video properties without downloading the entire file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoSrc` | `string` | The URL or path to the video file |

#### Returns

`Promise`\<[`VideoMeta`](modules.md#videometa)\>

Promise resolving to an object containing video metadata

**`Example`**

```js
// Get metadata for a video
const metadata = await getVideoMeta("https://example.com/video.mp4");
// metadata = { width: 1920, height: 1080, duration: 120.5 }

// Get metadata for a local blob URL
const metadata = await getVideoMeta("blob:http://localhost:3000/abc123");
// metadata = { width: 1280, height: 720, duration: 30.0 }
```

#### Defined in

[get-video-metadata.ts:24](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/get-video-metadata.ts#L24)

___

### hasAudio

▸ **hasAudio**(`src`): `Promise`\<`boolean`\>

Checks if a video or audio file has an audio track with actual sound content.
This function attempts to decode the audio and verifies that it's not empty or silent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | `string` | The source URL of the media file to check |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if the media has audio, false otherwise

**`Example`**

```js
// Check if a video has audio
const hasSound = await hasAudio("https://example.com/video.mp4");
if (hasSound) {
  // Extract audio or show audio controls
} else {
  // Handle video without audio
}
```

#### Defined in

[audio-utils.ts:104](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/audio-utils.ts#L104)

___

### limit

▸ **limit**\<`T`\>(`fn`): `Promise`\<`T`\>

Wraps an async function to enforce concurrency limits.
If the concurrency limit is reached, the function is queued and executed later
when a slot becomes available. This prevents overwhelming the system with too
many concurrent operations, which is useful for resource-intensive tasks like
media processing or API calls.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `Promise`\<`T`\> | Async function returning a Promise that should be executed with concurrency control |

#### Returns

`Promise`\<`T`\>

Promise resolving with the result of the wrapped function

**`Example`**

```js
// Limit concurrent image processing operations
const processImage = async (imageUrl) => {
  // Expensive image processing operation
  return await someImageProcessing(imageUrl);
};

// Process multiple images with concurrency limit
const results = await Promise.all([
  limit(() => processImage("image1.jpg")),
  limit(() => processImage("image2.jpg")),
  limit(() => processImage("image3.jpg")),
  limit(() => processImage("image4.jpg")),
  limit(() => processImage("image5.jpg")),
  limit(() => processImage("image6.jpg")), // This will be queued until a slot opens
]);
```

#### Defined in

[limit.ts:57](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/limit.ts#L57)

___

### loadFile

▸ **loadFile**(`accept`): `Promise`\<`File`\>

Opens a native file picker and resolves with the selected File.
The accepted file types can be specified using the same format as the
input accept attribute (e.g. "application/json", ".png,.jpg", "image/*").

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accept` | `string` | The accept filter string for the file input |

#### Returns

`Promise`\<`File`\>

Promise resolving to the chosen File

**`Example`**

```ts
const file = await loadFile("application/json");
const text = await file.text();
const data = JSON.parse(text);
```

#### Defined in

[file-helper.ts:37](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/file-helper.ts#L37)

___

### saveAsFile

▸ **saveAsFile**(`content`, `type`, `name`): `void`

Triggers a download of a file from a string or Blob.
Creates a temporary download link and automatically clicks it to initiate the download.
The function handles both string content and Blob objects, and automatically cleans up
the created object URL after the download is initiated.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `Blob` | The content to save, either a string or a Blob object |
| `type` | `string` | The MIME type of the content |
| `name` | `string` | The name of the file to be saved |

#### Returns

`void`

**`Example`**

```js
// Download text content
saveAsFile("Hello World", "text/plain", "hello.txt");

// Download JSON data
saveAsFile(JSON.stringify({data: "value"}), "application/json", "data.json");

// Download blob content
saveAsFile(imageBlob, "image/png", "screenshot.png");
```

#### Defined in

[file-helper.ts:93](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/file-helper.ts#L93)

___

### stitchAudio

▸ **stitchAudio**(`segments`, `totalDuration?`): `Promise`\<`string`\>

Stitches multiple audio segments into a single MP3 file.
Creates a timeline where each segment plays at its specified time,
with silence filling gaps between segments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `segments` | [`AudioSegment`](interfaces/AudioSegment.md)[] | Array of audio segments with source, start, and end times |
| `totalDuration?` | `number` | Total duration of the output audio |

#### Returns

`Promise`\<`string`\>

Promise resolving to a Blob URL to the stitched MP3 file

**`Example`**

```js
const segments = [
  { src: "audio1.mp3", s: 0, e: 5, volume: 1.0 },
  { src: "audio2.mp3", s: 10, e: 15, volume: 0.8 }
];
const url = await stitchAudio(segments, 15);
// Creates a 15-second audio file with segments at specified times
```

#### Defined in

[audio-utils.ts:151](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/media-utils/src/audio-utils.ts#L151)
