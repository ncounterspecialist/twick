/**
 * Alternative audio extraction using MediaElementAudioSourceNode
 * This captures audio directly from a playing video element without decoding
 * Works with ANY audio codec the browser can play!
 */

export class VideoElementAudioExtractor {
  private audioContext: AudioContext;
  private video: HTMLVideoElement;
  private destination: MediaStreamAudioDestinationNode | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  
  constructor(videoSrc: string, sampleRate: number = 48000) {
    this.audioContext = new AudioContext({ sampleRate });
    this.video = document.createElement('video');
    this.video.crossOrigin = 'anonymous';
    this.video.src = videoSrc;
    this.video.muted = true; // Mute playback but audio will still be captured
  }
  
  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.video.addEventListener('loadedmetadata', () => resolve(), { once: true });
      
      this.video.addEventListener('error', (e) => {
        reject(new Error(`Failed to load video for audio extraction: ${e}`));
      }, { once: true });
    });
  }
  
  /**
   * Extract audio by playing the video and capturing audio output
   */
  async extractAudio(
    startTime: number,
    duration: number,
    playbackRate: number = 1.0
  ): Promise<AudioBuffer> {
    // Check if video has audio tracks before attempting extraction
    try {
      // Try to create MediaElementSource - this will fail if video has no audio
      const source = this.audioContext.createMediaElementSource(this.video);
      
      // Create destination for recording
      this.destination = this.audioContext.createMediaStreamDestination();
      source.connect(this.destination);
    } catch (err) {
      // If we can't create the source, the video likely has no audio track
      throw new Error('Video has no audio track');
    }
    
    // Create MediaRecorder to capture audio
    this.audioChunks = [];
    let mimeType = 'audio/webm';
    
    // Check if MediaRecorder supports the mime type
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      // Fallback to default
      mimeType = '';
    }
    
    try {
      this.mediaRecorder = new MediaRecorder(this.destination.stream, {
        mimeType: mimeType || undefined,
      });
    } catch (err) {
      throw new Error(`Failed to create MediaRecorder: ${err}. Video may have no audio track.`);
    }
    
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };
    
    // Set up video playback
    this.video.currentTime = startTime;
    this.video.playbackRate = playbackRate;
    
    // Wait for seek to complete
    await new Promise<void>((resolve, reject) => {
      const seekTimeout = setTimeout(() => {
        reject(new Error('Video seek timeout'));
      }, 5000);
      
      this.video.addEventListener('seeked', () => {
        clearTimeout(seekTimeout);
        resolve();
      }, { once: true });
      
      this.video.addEventListener('error', () => {
        clearTimeout(seekTimeout);
        reject(new Error('Video seek error'));
      }, { once: true });
    });
    
    // Start recording and playing
    return new Promise((resolve, reject) => {
      const recordingTimeout = setTimeout(() => {
        this.video.pause();
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          this.mediaRecorder.stop();
        }
        reject(new Error('Audio extraction timeout - video may have no audio track'));
      }, (duration / playbackRate + 10) * 1000); // Add 10s buffer
      
      let hasData = false;
      const dataCheckInterval = setInterval(() => {
        if (this.audioChunks.length > 0 && this.audioChunks.some(chunk => chunk.size > 0)) {
          hasData = true;
        }
      }, 1000);
      
      this.mediaRecorder!.onerror = (event) => {
        clearInterval(dataCheckInterval);
        clearTimeout(recordingTimeout);
        this.video.pause();
        reject(new Error(`MediaRecorder error: ${event}. Video may have no audio track.`));
      };
      
      try {
        this.mediaRecorder!.start(100); // Request data every 100ms
        this.video.play().catch((playErr) => {
          clearInterval(dataCheckInterval);
          clearTimeout(recordingTimeout);
          reject(new Error(`Failed to play video: ${playErr}`));
        });
      } catch (startErr) {
        clearInterval(dataCheckInterval);
        clearTimeout(recordingTimeout);
        reject(new Error(`Failed to start recording: ${startErr}`));
      }
      
      // Stop recording after duration
      setTimeout(async () => {
        clearInterval(dataCheckInterval);
        clearTimeout(recordingTimeout);
        this.video.pause();
        
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          this.mediaRecorder.stop();
        }
        
        // Wait for final data with timeout
        const stopTimeout = setTimeout(() => {
          if (this.audioChunks.length === 0 || !hasData) {
            reject(new Error('No audio data captured - video has no audio track'));
          }
        }, 2000);
        
        await new Promise<void>((res) => {
          if (this.mediaRecorder) {
            this.mediaRecorder.addEventListener('stop', () => {
              clearTimeout(stopTimeout);
              res();
            }, { once: true });
          } else {
            clearTimeout(stopTimeout);
            res();
          }
        });
        
        // Convert recorded audio to AudioBuffer
        try {
          if (this.audioChunks.length === 0 || !this.audioChunks.some(chunk => chunk.size > 0)) {
            throw new Error('No audio data captured - video has no audio track');
          }
          
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          if (audioBlob.size === 0) {
            throw new Error('Audio blob is empty - video has no audio track');
          }
          
          const arrayBuffer = await audioBlob.arrayBuffer();
          const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
          
          // Validate audio buffer
          if (audioBuffer.length === 0 || audioBuffer.duration === 0) {
            throw new Error('Audio buffer is empty - video has no audio track');
          }
          
          resolve(audioBuffer);
        } catch (err) {
          reject(new Error(`Failed to decode recorded audio: ${err}`));
        }
      }, (duration / playbackRate) * 1000);
    });
  }
  
  async close(): Promise<void> {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.video.pause();
    this.video.src = '';
    if (this.audioContext.state !== 'closed') {
      await this.audioContext.close();
    }
  }
}

/**
 * Extract audio from video using MediaElementAudioSourceNode
 * This method works with any audio codec the browser can play
 */
export async function extractAudioFromVideo(
  videoSrc: string,
  startTime: number,
  duration: number,
  playbackRate: number = 1.0,
  sampleRate: number = 48000
): Promise<AudioBuffer> {
  const extractor = new VideoElementAudioExtractor(videoSrc, sampleRate);
  
  try {
    await extractor.initialize();
    const audioBuffer = await extractor.extractAudio(startTime, duration, playbackRate);
    return audioBuffer;
  } finally {
    await extractor.close();
  }
}
