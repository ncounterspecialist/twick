# @twick/media-utils

Core utilities for media handling and manipulation in the Twick platform.

## Overview

This package provides essential utilities for working with various media types including video, audio, and images. It offers functions for metadata extraction, dimension handling, caching, and file management.

## Installation

```bash
npm install @twick/media-utils
# or
pnpm add @twick/media-utils
```

## Quick Start

```typescript
import { 
  getVideoMetadata, 
  getImageDimensions, 
  getAudioDuration,
  getThumbnail 
} from '@twick/media-utils';

// Get video metadata
const videoMeta = await getVideoMetadata('path/to/video.mp4');
console.log(videoMeta); // { width, height, duration, etc. }

// Get image dimensions
const dimensions = await getImageDimensions('path/to/image.jpg');
console.log(dimensions); // { width, height }

// Get audio duration
const duration = await getAudioDuration('path/to/audio.mp3');
console.log(duration); // duration in seconds

// Generate thumbnail
const thumbnail = await getThumbnail('path/to/video.mp4', 5); // 5 seconds
console.log(thumbnail); // base64 thumbnail
```

## Key Features

- **Video Metadata**: Extract width, height, duration, and other properties
- **Image Processing**: Get dimensions and generate thumbnails
- **Audio Utilities**: Extract duration and audio properties
- **Caching**: Built-in caching for improved performance
- **File Management**: URL and file path handling utilities
- **Dimension Handling**: Responsive dimension calculations

## API Reference

### Core Functions

- `getVideoMetadata`: Extract video metadata
- `getImageDimensions`: Get image dimensions
- `getAudioDuration`: Extract audio duration
- `getThumbnail`: Generate video thumbnails
- `limit`: Apply size and duration limits
- `urlHelper`: URL manipulation utilities

### Types

- `VideoMetadata`: Video metadata interface
- `ImageDimensions`: Image dimension interface
- `AudioMetadata`: Audio metadata interface
- `ThumbnailOptions`: Thumbnail generation options

For complete API documentation, refer to the generated documentation.

## Browser Support

This package requires a browser environment with support for:
- HTML5 Video and Audio elements
- Canvas API
- File API
- Modern JavaScript features (ES2020+)

## Documentation

For complete documentation, refer to the project documentation site.

## License

This package is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK

For commercial licensing inquiries, contact: contact@kifferai.com

For full license terms, see the main LICENSE.md file in the project root.
