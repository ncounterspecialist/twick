/**
 * Browser-based audio processing using Web Audio API
 * Mirrors the server's FFmpeg audio generation logic
 */

export interface MediaAsset {
  key: string;
  src: string;
  type: 'video' | 'audio';
  startInVideo: number;
  endInVideo: number;
  duration: number;
  playbackRate: number;
  volume: number;
  trimLeftInSeconds: number;
  durationInSeconds: number;
}

export interface AssetInfo {
  key: string;
  src: string;
  type: 'video' | 'audio';
  currentTime: number;
  playbackRate: number;
  volume: number;
}

/**
 * Get asset placement from frames (similar to server's getAssetPlacement)
 */
export function getAssetPlacement(frames: AssetInfo[][]): MediaAsset[] {
  const assets: MediaAsset[] = [];
  const assetTimeMap = new Map<string, { start: number; end: number }>();

  for (let frame = 0; frame < frames.length; frame++) {
    for (const asset of frames[frame]) {
      if (!assetTimeMap.has(asset.key)) {
        assetTimeMap.set(asset.key, {
          start: asset.currentTime,
          end: asset.currentTime,
        });
        assets.push({
          key: asset.key,
          src: asset.src,
          type: asset.type,
          startInVideo: frame,
          endInVideo: frame,
          duration: 0,
          durationInSeconds: 0,
          playbackRate: asset.playbackRate,
          volume: asset.volume,
          trimLeftInSeconds: asset.currentTime,
        });
      } else {
        const timeInfo = assetTimeMap.get(asset.key);
        if (timeInfo) {
          timeInfo.end = asset.currentTime;
        }
        const existingAsset = assets.find(a => a.key === asset.key);
        if (existingAsset) {
          existingAsset.endInVideo = frame;
        }
      }
    }
  }

  // Calculate durations
  assets.forEach(asset => {
    const timeInfo = assetTimeMap.get(asset.key);
    if (timeInfo) {
      asset.durationInSeconds = (timeInfo.end - timeInfo.start) / asset.playbackRate;
    }
    asset.duration = asset.endInVideo - asset.startInVideo + 1;
  });

  return assets;
}

/**
 * Audio processor using Web Audio API
 */
export class BrowserAudioProcessor {
  private audioContext: AudioContext;

  constructor(private sampleRate: number = 48000) {
    this.audioContext = new AudioContext({ sampleRate });
  }

  /**
   * Fetch and decode audio from a media source
   */
  async fetchAndDecodeAudio(src: string): Promise<AudioBuffer> {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer);
  }

  /**
   * Process audio asset with playback rate, volume, and timing
   */
  async processAudioAsset(
    asset: MediaAsset,
    fps: number,
    totalFrames: number
  ): Promise<AudioBuffer> {
    const audioBuffer = await this.fetchAndDecodeAudio(asset.src);
    
    const duration = totalFrames / fps;
    const outputLength = Math.ceil(duration * this.sampleRate);
    const outputBuffer = this.audioContext.createBuffer(
      2, // stereo
      outputLength,
      this.sampleRate
    );

    // Calculate timing
    const startTime = asset.startInVideo / fps;
    const trimLeft = asset.trimLeftInSeconds / asset.playbackRate;
    const trimRight = trimLeft + asset.durationInSeconds;

    // Process each channel
    for (let channel = 0; channel < 2; channel++) {
      const inputData = audioBuffer.getChannelData(Math.min(channel, audioBuffer.numberOfChannels - 1));
      const outputData = outputBuffer.getChannelData(channel);

      // Calculate sample positions
      const startSample = Math.floor(startTime * this.sampleRate);
      const trimLeftSample = Math.floor(trimLeft * this.sampleRate);
      const trimRightSample = Math.floor(trimRight * this.sampleRate);

      // Copy and process samples
      for (let i = 0; i < outputData.length; i++) {
        const outputTime = i / this.sampleRate;
        const assetTime = outputTime - startTime;
        
        if (assetTime < 0 || assetTime >= asset.durationInSeconds) {
          outputData[i] = 0; // Silence
        } else {
          // Apply playback rate
          const inputSample = Math.floor((trimLeftSample + assetTime * asset.playbackRate * this.sampleRate));
          if (inputSample >= 0 && inputSample < inputData.length) {
            outputData[i] = inputData[inputSample] * asset.volume;
          } else {
            outputData[i] = 0;
          }
        }
      }
    }

    return outputBuffer;
  }

  /**
   * Mix multiple audio buffers
   */
  mixAudioBuffers(buffers: AudioBuffer[]): AudioBuffer {
    if (buffers.length === 0) {
      return this.audioContext.createBuffer(2, 1, this.sampleRate);
    }

    const maxLength = Math.max(...buffers.map(b => b.length));
    const mixedBuffer = this.audioContext.createBuffer(2, maxLength, this.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const mixedData = mixedBuffer.getChannelData(channel);
      
      buffers.forEach(buffer => {
        const channelData = buffer.getChannelData(Math.min(channel, buffer.numberOfChannels - 1));
        for (let i = 0; i < channelData.length; i++) {
          mixedData[i] = (mixedData[i] || 0) + channelData[i] / buffers.length;
        }
      });
    }

    return mixedBuffer;
  }

  /**
   * Convert AudioBuffer to WAV format
   */
  audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    const bytesPerSample = bitDepth / 8;
    const blockAlign = numberOfChannels * bytesPerSample;

    const data = new Float32Array(buffer.length * numberOfChannels);
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < buffer.length; i++) {
        data[i * numberOfChannels + channel] = channelData[i];
      }
    }

    const dataLength = data.length * bytesPerSample;
    const headerLength = 44;
    const wav = new ArrayBuffer(headerLength + dataLength);
    const view = new DataView(wav);

    // Write WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // fmt chunk size
    view.setUint16(20, format, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);

    // Write audio data
    const volume = 0.8;
    let offset = 44;
    for (let i = 0; i < data.length; i++) {
      const sample = Math.max(-1, Math.min(1, data[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }

    return wav;
  }

  async close() {
    await this.audioContext.close();
  }
}
