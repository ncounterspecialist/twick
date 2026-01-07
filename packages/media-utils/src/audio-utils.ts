/**
 * Audio segment interface for stitching
 */
export interface AudioSegment {
  src: string;
  s: number; // start time in seconds
  e: number; // end time in seconds
  volume?: number; // volume level (0-1), defaults to 1, 0 = muted
}

/**
 * Extracts an audio segment from a media source between start and end times,
 * rendered at the specified playback rate, and returns a Blob URL to an MP3 file.
 * The function fetches the source, decodes the audio track using Web Audio API,
 * renders the segment offline for speed and determinism, encodes it as MP3 using lamejs,
 * and returns an object URL. Callers should revoke the URL when done.
 *
 * @param src - The source URL of the media file
 * @param playbackRate - The playback rate for the extracted segment
 * @param start - The start time in seconds
 * @param end - The end time in seconds
 * @returns Promise resolving to a Blob URL to the extracted MP3 file
 * 
 * @example
 * ```js
 * const url = await extractAudio({ src, start: 3, end: 8, playbackRate: 1.25 });
 * const audio = new Audio(url);
 * audio.play();
 * // later: URL.revokeObjectURL(url);
 * ```
 */
export const extractAudio = async ({
  src,
  playbackRate = 1,
  start = 0,
  end,
}: {
  src: string;
  playbackRate?: number;
  start?: number;
  end?: number;
}): Promise<string> => {
  if (!src) throw new Error("src is required");
  if (playbackRate <= 0) throw new Error("playbackRate must be > 0");

  // Basic URL safety check
  const isSafeUrl = /^(https?:|blob:|data:)/i.test(src);
  if (!isSafeUrl) throw new Error("Unsafe media source URL");

  // Fetch and decode audio
  const audioBuffer = await fetchAndDecodeAudio(src);

  // Check if audio buffer has no audio content
  if (audioBuffer.duration === 0 || audioBuffer.length === 0) {
    throw new Error("No audio track found in the media source");
  }

  // Check if audio is completely silent
  if (isAudioSilent(audioBuffer)) {
    throw new Error("Audio track is silent (no audio content detected)");
  }

  // Normalize time range
  const clampedStart = Math.max(0, start || 0);
  const fullDuration = audioBuffer.duration;
  const clampedEnd = Math.min(
    typeof end === "number" ? end : fullDuration,
    fullDuration
  );
  if (clampedEnd <= clampedStart)
    throw new Error("Invalid range: end must be greater than start");

  // Render segment with playback rate
  const renderedBuffer = await renderAudioSegment(
    audioBuffer,
    clampedStart,
    clampedEnd,
    playbackRate
  );

  // Convert to MP3 and return URL
  const mp3Blob = await audioBufferToMp3(renderedBuffer);
  return URL.createObjectURL(mp3Blob);
};

/**
 * Checks if a video or audio file has an audio track with actual sound content.
 * This function attempts to decode the audio and verifies that it's not empty or silent.
 * 
 * @param src - The source URL of the media file to check
 * @returns Promise resolving to true if the media has audio, false otherwise
 * 
 * @example
 * ```js
 * // Check if a video has audio
 * const hasSound = await hasAudio("https://example.com/video.mp4");
 * if (hasSound) {
 *   // Extract audio or show audio controls
 * } else {
 *   // Handle video without audio
 * }
 * ```
 */
export const hasAudio = async (src: string): Promise<boolean> => {
  if (!src) return false;

  // Basic URL safety check
  const isSafeUrl = /^(https?:|blob:|data:)/i.test(src);
  if (!isSafeUrl) return false;

  try {
    // Fetch and decode audio
    const audioBuffer = await fetchAndDecodeAudio(src);

    // Check if audio buffer has no audio content
    if (audioBuffer.duration === 0 || audioBuffer.length === 0) {
      return false;
    }

    // Check if audio is completely silent
    if (isAudioSilent(audioBuffer)) {
      return false;
    }

    return true;
  } catch (error) {
    // If decoding fails, assume no audio
    return false;
  }
};

/**
 * Stitches multiple audio segments into a single MP3 file.
 * Creates a timeline where each segment plays at its specified time,
 * with silence filling gaps between segments.
 * 
 * @param segments - Array of audio segments with source, start, and end times
 * @param totalDuration - Total duration of the output audio
 * @returns Promise resolving to a Blob URL to the stitched MP3 file
 * 
 * @example
 * ```js
 * const segments = [
 *   { src: "audio1.mp3", s: 0, e: 5, volume: 1.0 },
 *   { src: "audio2.mp3", s: 10, e: 15, volume: 0.8 }
 * ];
 * const url = await stitchAudio(segments, 15);
 * // Creates a 15-second audio file with segments at specified times
 * ```
 */
export const stitchAudio = async (
  segments: AudioSegment[],
  totalDuration?: number
): Promise<string> => {
  if (!segments || segments.length === 0) {
    throw new Error("At least one audio segment is required");
  }

  // Calculate total duration if not provided
  const duration = totalDuration || Math.max(...segments.map(s => s.e));

  // Create timeline and render segments
  const renderedBuffer = await createAudioTimeline(segments, duration);

  // Convert to MP3 and return URL
  const mp3Blob = await audioBufferToMp3(renderedBuffer);
  return URL.createObjectURL(mp3Blob);
};

// ===== SHARED UTILITIES =====

/**
 * Fetches and decodes audio from a URL.
 * 
 * @param src - The URL of the audio file to fetch and decode
 * @returns Promise<AudioBuffer> - The decoded audio buffer
 */
const fetchAndDecodeAudio = async (src: string): Promise<AudioBuffer> => {
  const response = await fetch(src);
  if (!response.ok) throw new Error(`Failed to fetch source: ${response.status}`);
  
  const arrayBuffer = await response.arrayBuffer();
  return decodeAudioData(arrayBuffer);
};

/**
 * Decodes audio data using Web Audio API
 */
const decodeAudioData = async (arrayBuffer: ArrayBuffer): Promise<AudioBuffer> => {
  const AudioContextCtor: typeof AudioContext =
    (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextCtor) throw new Error("Web Audio API not supported");
  
  const audioContext = new AudioContextCtor();
  try {
    return await new Promise<AudioBuffer>((resolve, reject) => {
      audioContext.decodeAudioData(
        arrayBuffer.slice(0),
        (buf) => resolve(buf),
        (err) => reject(err || new Error("Failed to decode audio: no audio track found or unsupported format"))
      );
    });
  } finally {
    audioContext.close();
  }
};

/**
 * Checks if an AudioBuffer contains only silence
 * Samples a portion of the audio to detect if it's completely silent
 */
const isAudioSilent = (buffer: AudioBuffer, threshold: number = 0.001): boolean => {
  // Check all channels
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    // Sample every 100th frame for performance
    for (let i = 0; i < channelData.length; i += 100) {
      if (Math.abs(channelData[i]) > threshold) {
        return false; // Found non-silent audio
      }
    }
  }
  return true; // All sampled frames are silent
};

/**
 * Renders an audio segment with playback rate
 */
const renderAudioSegment = async (
  audioBuffer: AudioBuffer,
  start: number,
  end: number,
  playbackRate: number
): Promise<AudioBuffer> => {
  const OfflineAudioContextCtor: typeof OfflineAudioContext =
    (window as any).OfflineAudioContext || (window as any).webkitOfflineAudioContext;
  if (!OfflineAudioContextCtor) throw new Error("OfflineAudioContext not supported");

  const sampleRate = audioBuffer.sampleRate;
  const numChannels = audioBuffer.numberOfChannels;
  const sourceDuration = end - start;
  const renderedFrames = Math.max(
    1,
    Math.ceil((sourceDuration / playbackRate) * sampleRate)
  );

  const offline = new OfflineAudioContextCtor(numChannels, renderedFrames, sampleRate);
  const sourceNode = offline.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.playbackRate.value = playbackRate;
  sourceNode.connect(offline.destination);
  sourceNode.start(0, start, sourceDuration);

  return await offline.startRendering();
};

/**
 * Creates an audio timeline with multiple segments
 */
const createAudioTimeline = async (
  segments: AudioSegment[],
  duration: number
): Promise<AudioBuffer> => {
  const OfflineAudioContextCtor: typeof OfflineAudioContext =
    (window as any).OfflineAudioContext || (window as any).webkitOfflineAudioContext;
  if (!OfflineAudioContextCtor) throw new Error("OfflineAudioContext not supported");

  const sampleRate = 44100; // Standard sample rate
  const totalFrames = Math.ceil(duration * sampleRate);
  const offline = new OfflineAudioContextCtor(2, totalFrames, sampleRate); // Stereo output

  // Process each segment
  for (const segment of segments) {
    if (segment.s >= segment.e) {
      console.warn(`Invalid segment: start (${segment.s}) >= end (${segment.e})`);
      continue;
    }

    // Skip segments with volume 0 (muted)
    const volume = segment.volume ?? 1;
    if (volume <= 0) {
      console.warn(`Skipping muted segment: ${segment.src}`);
      continue;
    }

    try {
      const audioBuffer = await fetchAndDecodeAudio(segment.src);
      const segmentDuration = segment.e - segment.s;
      const sourceDuration = Math.min(segmentDuration, audioBuffer.duration);

      const source = offline.createBufferSource();
      source.buffer = audioBuffer;
      
      // Apply volume control if not 1.0
      if (volume !== 1) {
        const gainNode = offline.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(offline.destination);
      } else {
        source.connect(offline.destination);
      }
      
      source.start(segment.s, 0, sourceDuration);
    } catch (error) {
      console.warn(`Failed to process segment: ${segment.src}`, error);
    }
  }

  return await offline.startRendering();
};

/**
 * Converts an AudioBuffer to an MP3 Blob using lamejs
 */
const audioBufferToMp3 = async (buffer: AudioBuffer): Promise<Blob> => {
  try {
    // Convert AudioBuffer to WAV ArrayBuffer
    const wavArrayBuffer = audioBufferToWavArrayBuffer(buffer);
    
    // Decode WAV back to PCM using AudioContext
    const pcmBuffer = await decodeAudioData(wavArrayBuffer);
    
    // Encode PCM to MP3 using lamejs
    return await encodePcmToMp3(pcmBuffer);
  } catch (error) {
    // Fallback to WAV if MP3 encoding fails
    return audioBufferToWavBlob(buffer);
  }
};

/**
 * Converts AudioBuffer to WAV ArrayBuffer
 */
const audioBufferToWavArrayBuffer = (buffer: AudioBuffer): ArrayBuffer => {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numFrames = buffer.length;

  // Interleave channels
  const interleaved = interleave(buffer, numChannels, numFrames);

  // Create WAV ArrayBuffer
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = interleaved.length * bytesPerSample;
  const bufferSize = 44 + dataSize;
  const arrayBuffer = new ArrayBuffer(bufferSize);
  const view = new DataView(arrayBuffer);

  // RIFF header
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");

  // fmt chunk
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // PCM
  view.setUint16(20, 1, true); // audio format = 1 (PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // bits per sample

  // data chunk
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  // PCM samples
  floatTo16BitPCM(view, 44, interleaved);

  return arrayBuffer;
};

/**
 * Encodes PCM AudioBuffer to MP3 using lamejs
 */
const encodePcmToMp3 = async (buffer: AudioBuffer): Promise<Blob> => {
  const lamejs = await import("lamejs");

  const channels = buffer.numberOfChannels >= 2 ? 2 : 1;
  // Downsample to 22050 Hz for smaller file size (good for voice/speech)
  const targetSampleRate = 22050;
  const downsampledBuffer = downsampleAudioBuffer(buffer, targetSampleRate);
  const kbps = 48; // Reduced bitrate for smaller file size

  const mp3encoder = new lamejs.default.Mp3Encoder(channels, targetSampleRate, kbps);
  const samplesPerFrame = 1152;

  // Prepare PCM Int16 arrays
  const leftFloat = downsampledBuffer.getChannelData(0);
  const left = floatTo16(leftFloat);
  let right: Int16Array | undefined;
  if (channels === 2) {
    const rightFloat = downsampledBuffer.getChannelData(1);
    right = floatTo16(rightFloat);
  }

  const mp3Chunks: BlobPart[] = [];
  for (let i = 0; i < left.length; i += samplesPerFrame) {
    const leftChunk = left.subarray(i, Math.min(i + samplesPerFrame, left.length));
    let mp3buf: Uint8Array;
    if (channels === 2 && right) {
      const rightChunk = right.subarray(i, Math.min(i + samplesPerFrame, right.length));
      mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
    } else {
      mp3buf = mp3encoder.encodeBuffer(leftChunk);
    }
    if (mp3buf.length > 0) mp3Chunks.push(mp3buf as unknown as BlobPart);
  }

  const end = mp3encoder.flush();
  if (end.length > 0) mp3Chunks.push(end as unknown as BlobPart);

  return new Blob(mp3Chunks, { type: "audio/mpeg" });
};

/**
 * Converts an AudioBuffer to a WAV Blob (fallback)
 */
const audioBufferToWavBlob = (buffer: AudioBuffer): Blob => {
  const arrayBuffer = audioBufferToWavArrayBuffer(buffer);
  return new Blob([arrayBuffer], { type: "audio/wav" });
};

/**
 * Downsamples an AudioBuffer to a lower sample rate for smaller file size
 */
const downsampleAudioBuffer = (buffer: AudioBuffer, targetSampleRate: number): AudioBuffer => {
  if (buffer.sampleRate === targetSampleRate) {
    return buffer;
  }

  const ratio = buffer.sampleRate / targetSampleRate;
  const newLength = Math.round(buffer.length / ratio);
  const newBuffer = new AudioContext().createBuffer(
    buffer.numberOfChannels,
    newLength,
    targetSampleRate
  );

  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const oldData = buffer.getChannelData(channel);
    const newData = newBuffer.getChannelData(channel);
    
    for (let i = 0; i < newLength; i++) {
      const oldIndex = Math.floor(i * ratio);
      newData[i] = oldData[oldIndex];
    }
  }

  return newBuffer;
};

/**
 * Interleaves audio channels
 */
const interleave = (buffer: AudioBuffer, numChannels: number, numFrames: number): Float32Array => {
  if (numChannels === 1) {
    return buffer.getChannelData(0).slice(0, numFrames);
  }
  const result = new Float32Array(numFrames * numChannels);
  const channelData: Float32Array[] = [];
  for (let ch = 0; ch < numChannels; ch++) {
    channelData[ch] = buffer.getChannelData(ch);
  }
  let writeIndex = 0;
  for (let i = 0; i < numFrames; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      result[writeIndex++] = channelData[ch][i];
    }
  }
  return result;
};

/**
 * Converts float32 audio data to 16-bit PCM
 */
const floatTo16BitPCM = (view: DataView, offset: number, input: Float32Array): void => {
  let pos = offset;
  for (let i = 0; i < input.length; i++, pos += 2) {
    let s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(pos, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
};

/**
 * Converts float32 array to int16 array
 */
const floatTo16 = (input: Float32Array): Int16Array => {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return output;
};

/**
 * Writes string to DataView
 */
const writeString = (view: DataView, offset: number, str: string): void => {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
};
