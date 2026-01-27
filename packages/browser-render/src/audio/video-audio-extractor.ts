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
    // Create audio source from video element
    const source = this.audioContext.createMediaElementSource(this.video);
    
    // Create destination for recording
    this.destination = this.audioContext.createMediaStreamDestination();
    source.connect(this.destination);
    
    // Create MediaRecorder to capture audio
    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(this.destination.stream, {
      mimeType: 'audio/webm',
    });
    
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };
    
    // Set up video playback
    this.video.currentTime = startTime;
    this.video.playbackRate = playbackRate;
    
    // Wait for seek to complete
    await new Promise<void>((resolve) => {
      this.video.addEventListener('seeked', () => resolve(), { once: true });
    });
    
    // Start recording and playing
    return new Promise((resolve, reject) => {
      const recordingTimeout = setTimeout(() => {
        reject(new Error('Audio extraction timeout'));
      }, (duration / playbackRate + 5) * 1000); // Add 5s buffer
      
      this.mediaRecorder!.start();
      this.video.play();
      
      // Stop recording after duration
      setTimeout(async () => {
        clearTimeout(recordingTimeout);
        this.video.pause();
        this.mediaRecorder!.stop();
        
        // Wait for final data
        await new Promise<void>((res) => {
          this.mediaRecorder!.addEventListener('stop', () => res(), { once: true });
        });
        
        // Convert recorded audio to AudioBuffer
        try {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          const arrayBuffer = await audioBlob.arrayBuffer();
          const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
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
