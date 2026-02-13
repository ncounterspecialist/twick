[@twick/media-utils](../README.md) / [Exports](../modules.md) / VideoFrameExtractorOptions

# Interface: VideoFrameExtractorOptions

Configuration options for the VideoFrameExtractor service.

## Table of contents

### Properties

- [jpegQuality](VideoFrameExtractorOptions.md#jpegquality)
- [loadTimeout](VideoFrameExtractorOptions.md#loadtimeout)
- [maxCacheSize](VideoFrameExtractorOptions.md#maxcachesize)
- [maxVideoElements](VideoFrameExtractorOptions.md#maxvideoelements)
- [playbackRate](VideoFrameExtractorOptions.md#playbackrate)

## Properties

### jpegQuality

• `Optional` **jpegQuality**: `number`

JPEG quality for thumbnails (0-1, default: 0.8)

#### Defined in

[video-frame-extractor.ts:14](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L14)

___

### loadTimeout

• `Optional` **loadTimeout**: `number`

Timeout for video loading in milliseconds (default: 15000)

#### Defined in

[video-frame-extractor.ts:12](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L12)

___

### maxCacheSize

• `Optional` **maxCacheSize**: `number`

Maximum number of cached frames (default: 50)

#### Defined in

[video-frame-extractor.ts:8](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L8)

___

### maxVideoElements

• `Optional` **maxVideoElements**: `number`

Maximum number of video elements to keep in memory (default: 5)

#### Defined in

[video-frame-extractor.ts:10](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L10)

___

### playbackRate

• `Optional` **playbackRate**: `number`

Playback rate for video (default: 1)

#### Defined in

[video-frame-extractor.ts:16](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/media-utils/src/video-frame-extractor.ts#L16)
