# Audio Implementation Guide

## Overview

Browser-based audio processing for Twick video rendering, matching the server's FFmpeg implementation.

## Architecture

### 1. **Audio Processor** (`src/audio/audio-processor.ts`)
- Mirrors server's `generate-audio.ts` logic
- Uses Web Audio API instead of FFmpeg
- Handles:
  - Asset tracking across frames
  - Audio extraction from video/audio elements
  - Playback rate adjustment
  - Volume control
  - Audio trimming
  - Multi-track mixing

### 2. **Service Worker** (`public/audio-worker.js`)
- Caches media assets for offline processing
- Handles background audio extraction
- Reduces network requests during rendering

### 3. **Audio/Video Muxer** (`src/audio/audio-video-muxer.ts`)
- Combines video and audio tracks
- Two approaches:
  - **mp4box.js**: Lightweight, browser-native
  - **FFmpeg.wasm**: More robust, ~30MB bundle

## Implementation Steps

### Step 1: Install Dependencies

```bash
# For mp4box.js approach (recommended)
npm install mp4box

# OR for FFmpeg.wasm approach (more features, larger)
npm install @ffmpeg/ffmpeg @ffmpeg/util
```

### Step 2: Register Service Worker

```typescript
// In your app's initialization
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/audio-worker.js')
    .then(reg => console.log('Audio worker registered'))
    .catch(err => console.error('Audio worker failed:', err));
}
```

### Step 3: Enable Audio in Browser Renderer

Update `browser-renderer.ts`:

```typescript
import { BrowserAudioProcessor, getAssetPlacement } from './audio/audio-processor';
import { muxAudioVideo } from './audio/audio-video-muxer';

// In BrowserWasmExporter.generateAudio():
public async generateAudio(
  assets: any[][],
  startFrame: number,
  endFrame: number,
): Promise<ArrayBuffer | null> {
  const processor = new BrowserAudioProcessor();
  const assetPlacements = getAssetPlacement(assets);
  
  const processedBuffers: AudioBuffer[] = [];
  for (const asset of assetPlacements) {
    if (asset.volume > 0 && asset.playbackRate > 0) {
      const buffer = await processor.processAudioAsset(
        asset,
        this.settings.fps || 30,
        endFrame - startFrame
      );
      processedBuffers.push(buffer);
    }
  }
  
  const mixedBuffer = processor.mixAudioBuffers(processedBuffers);
  const wavData = processor.audioBufferToWav(mixedBuffer);
  
  await processor.close();
  return wavData;
}
```

### Step 4: Collect Audio Assets During Rendering

In `renderTwickVideoInBrowser()`:

```typescript
// Track media assets for each frame
const mediaAssets: AssetInfo[][] = [];

for (let frame = 0; frame < totalFrames; frame++) {
  // ... existing rendering code ...
  
  // Collect media assets from current scene
  const currentAssets = (renderer as any).playback.currentScene.getMediaAssets?.() || [];
  mediaAssets.push(currentAssets);
}

// Generate audio after video rendering
const audioData = await exporter.generateAudio(mediaAssets, 0, totalFrames);

// Mux audio and video
if (audioData) {
  const finalBlob = await muxAudioVideo({
    videoBlob,
    audioBuffer: audioData,
    fps,
    width,
    height
  });
  return finalBlob;
}
```

## API Parity with Server

| Feature | Server (FFmpeg) | Browser (Web Audio) | Status |
|---------|-----------------|---------------------|--------|
| Asset Tracking | `getAssetPlacement()` | `getAssetPlacement()` | ✅ Ready |
| Audio Extraction | FFmpeg decode | `decodeAudioData()` | ✅ Ready |
| Playback Rate | `atempo` filter | Sample interpolation | ✅ Ready |
| Volume | `volume` filter | Gain multiplication | ✅ Ready |
| Trimming | `atrim` filter | Sample slicing | ✅ Ready |
| Mixing | `amix` filter | Buffer mixing | ✅ Ready |
| WAV Encoding | FFmpeg encode | Manual WAV encoding | ✅ Ready |
| Muxing | FFmpeg merge | mp4box.js / FFmpeg.wasm | ⚠️ Needs library |

## Performance Considerations

### Memory Usage
- Web Audio API decodes entire audio files into memory
- Large video files can cause memory issues
- Consider chunked processing for long videos

### Processing Time
- Audio processing adds 20-50% to render time
- Service worker caching helps with repeated renders
- Consider showing separate progress for video/audio

### Browser Limits
- Chrome: ~2GB audio buffer limit
- Safari: Stricter memory limits
- Firefox: Better memory management but slower

## Example Usage

```typescript
import { useBrowserRenderer } from '@twick/browser-render';

function VideoRenderer() {
  const { render, progress } = useBrowserRenderer({
    width: 1920,
    height: 1080,
    fps: 30,
    includeAudio: true, // Enable audio processing
  });

  const handleRender = async () => {
    const videoBlob = await render({
      input: {
        properties: { width: 1920, height: 1080, fps: 30 },
        tracks: [
          {
            type: 'element',
            elements: [
              {
                type: 'video',
                src: 'https://example.com/video.mp4',
                // Audio will be automatically extracted and included
              }
            ]
          }
        ]
      }
    });
  };

  return <button onClick={handleRender}>Render with Audio</button>;
}
```

## Troubleshooting

### No Audio in Output
1. Check if `includeAudio: true` is set
2. Verify service worker is registered
3. Check browser console for Web Audio API errors
4. Ensure video sources have audio tracks

### Memory Errors
1. Reduce video quality/resolution
2. Process shorter segments
3. Clear service worker cache
4. Use FFmpeg.wasm with streaming

### Performance Issues
1. Use service worker caching
2. Reduce number of audio tracks
3. Lower audio sample rate (default: 48kHz)
4. Consider server-side rendering for production

## Future Enhancements

- [ ] Streaming audio processing (chunks)
- [ ] Web Workers for parallel processing
- [ ] Real-time audio preview
- [ ] Audio effects (reverb, EQ, etc.)
- [ ] WASM-based audio processing for better performance
- [ ] Support for more audio formats
