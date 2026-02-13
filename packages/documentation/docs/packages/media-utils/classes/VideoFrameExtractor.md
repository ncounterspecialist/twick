[@twick/media-utils](../README.md) / [Exports](../modules.md) / VideoFrameExtractor

# Class: VideoFrameExtractor

Service for efficiently extracting frames from videos.

Features:
- Reuses a single video element per video URL
- LRU cache for extracted frames
- Fast seeking for timeline scrubbing
- Automatic cleanup of unused video elements

**`Example`**

```js
const extractor = new VideoFrameExtractor();

// Extract frame at 5 seconds
const thumbnail = await extractor.getFrame("https://example.com/video.mp4", 5);

// Extract another frame from the same video (reuses video element)
const thumbnail2 = await extractor.getFrame("https://example.com/video.mp4", 10);

// Cleanup when done
extractor.dispose();
```

## Table of contents

### Constructors

- [constructor](VideoFrameExtractor.md#constructor)

### Methods

- [clearCache](VideoFrameExtractor.md#clearcache)
- [dispose](VideoFrameExtractor.md#dispose)
- [getFrame](VideoFrameExtractor.md#getframe)
- [removeVideo](VideoFrameExtractor.md#removevideo)

## Constructors

### constructor

• **new VideoFrameExtractor**(`options?`): [`VideoFrameExtractor`](VideoFrameExtractor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`VideoFrameExtractorOptions`](../interfaces/VideoFrameExtractorOptions.md) |

#### Returns

[`VideoFrameExtractor`](VideoFrameExtractor.md)

#### Defined in

[video-frame-extractor.ts:58](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L58)

## Methods

### clearCache

▸ **clearCache**(): `void`

Clear the frame cache.

#### Returns

`void`

#### Defined in

[video-frame-extractor.ts:356](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L356)

___

### dispose

▸ **dispose**(): `void`

Dispose of all video elements and clear caches.
Removes all video elements from the DOM and clears both the frame cache
and video element cache. Call this when the extractor is no longer needed
to prevent memory leaks.

#### Returns

`void`

#### Defined in

[video-frame-extractor.ts:385](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L385)

___

### getFrame

▸ **getFrame**(`videoUrl`, `seekTime?`): `Promise`\<`string`\>

Get a frame thumbnail from a video at a specific time.
Uses caching and reuses video elements for optimal performance.
Uses 0.1s instead of 0 when seekTime is 0, since frames at t=0 are often blank.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `videoUrl` | `string` | `undefined` | The URL of the video |
| `seekTime` | `number` | `0.1` | The time in seconds to extract the frame (0 is treated as 0.1) |

#### Returns

`Promise`\<`string`\>

Promise resolving to a thumbnail image URL (data URL or blob URL)

#### Defined in

[video-frame-extractor.ts:78](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L78)

___

### removeVideo

▸ **removeVideo**(`videoUrl`): `void`

Remove a specific video element and clear its cached frames.

#### Parameters

| Name | Type |
| :------ | :------ |
| `videoUrl` | `string` |

#### Returns

`void`

#### Defined in

[video-frame-extractor.ts:363](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L363)
