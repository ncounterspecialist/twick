import { Renderer, Vector2 } from "@twick/core";
import type { Project, RendererSettings } from "@twick/core";
import defaultProject from "@twick/visualizer/dist/project.js";
import { hasAudio } from "@twick/media-utils";
import { BrowserAudioProcessor, getAssetPlacement, type AssetInfo } from './audio/audio-processor';
import { muxAudioVideo } from './audio/audio-video-muxer';

/** Detect Windows so we can apply encoder workarounds (canvas copy for valid VideoFrame input). */
function isWindows(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const plat = (navigator as { platform?: string }).platform ?? '';
  return /Win(dows|32|64|CE)/i.test(ua) || /Win/i.test(plat);
}

/**
 * Browser-native video exporter using WebCodecs API
 * This exporter downloads the video directly in the browser without any server interaction
 */
class BrowserWasmExporter {
  public static readonly id = '@twick/core/wasm';
  public static readonly displayName = 'Browser Video (Wasm)';

  private encoder: any;
  private videoBlob: Blob | null = null;
  private onProgressCallback?: (progress: number) => void;
  private currentFrame: number = 0;
  private fps: number = 30;
  /** On Windows, copy each frame to this canvas before creating VideoFrame to avoid invalid encoder output. */
  private copyCanvas: HTMLCanvasElement | null = null;
  /** On Windows use native VideoEncoder + mp4-muxer with prefer-software so frames are actually encoded. */
  private useNativeEncoder = false;
  private nativeVideoEncoder: VideoEncoder | null = null;
  private nativeMuxer: { addVideoChunk: (chunk: EncodedVideoChunk, meta?: EncodedVideoChunkMetadata) => void; finalize: () => void; target: { buffer: ArrayBuffer } } | null = null;

  public static async create(settings: RendererSettings) {
    return new BrowserWasmExporter(settings);
  }

  public constructor(
    private readonly settings: RendererSettings,
  ) {
    this.fps = settings.fps || 30;
  }

  public async start(): Promise<void> {
    const w = this.settings.size.x;
    const h = this.settings.size.y;
    const fps = this.fps;

    if (isWindows()) {
      try {
        const { Muxer, ArrayBufferTarget } = await import('mp4-muxer');
        const target = new ArrayBufferTarget();
        const muxer = new Muxer({
          target,
          video: { codec: 'avc', width: w, height: h },
        });
        this.nativeMuxer = muxer as typeof this.nativeMuxer;

        const videoEncoder = new VideoEncoder({
          output: (chunk: EncodedVideoChunk, meta?: EncodedVideoChunkMetadata) => muxer.addVideoChunk(chunk, meta),
          error: (e: Error) => console.error('[BrowserRender] VideoEncoder error:', e),
        });
        const bitrate = Math.max(500_000, (w * h * fps * 0.1) | 0);
        const config: VideoEncoderConfig = {
          codec: 'avc1.42001f',
          width: w,
          height: h,
          bitrate,
          framerate: fps,
          hardwareAcceleration: 'prefer-software',
        };
        const support = await VideoEncoder.isConfigSupported(config);
        if (!support.supported) {
          delete (config as unknown as Record<string, unknown>).hardwareAcceleration;
        }
        videoEncoder.configure(config);
        this.nativeVideoEncoder = videoEncoder;
        this.useNativeEncoder = true;
        this.copyCanvas = document.createElement('canvas');
        this.copyCanvas.width = w;
        this.copyCanvas.height = h;
        return;
      } catch {
        this.useNativeEncoder = false;
        this.nativeVideoEncoder = null;
        this.nativeMuxer = null;
      }
    }

    try {
      const loadMp4Module = (await import('mp4-wasm')).default;
      const possiblePaths = [
        '/@mp4-wasm',
        '/assets/mp4-wasm.wasm',
        '/assets/mp4-YBRi_559.wasm',
        '/mp4-wasm.wasm',
        '/node_modules/mp4-wasm/dist/mp4-wasm.wasm',
      ];
      let buffer: ArrayBuffer | null = null;
      for (const path of possiblePaths) {
        try {
          const resp = await fetch(path);
          if (resp.ok) {
            const contentType = resp.headers.get('content-type');
            if (contentType && contentType.includes('html')) continue;
            buffer = await resp.arrayBuffer();
            break;
          }
        } catch {
          continue;
        }
      }
      if (!buffer) {
        console.error('[BrowserRender] Exporter start: no WASM buffer from any path');
        throw new Error(
          'Could not load WASM file from any location. ' +
          'Please copy mp4-wasm.wasm to your public directory or configure Vite to serve it.'
        );
      }
      const mp4 = await loadMp4Module({ wasmBinary: buffer });
      this.encoder = mp4.createWebCodecsEncoder({ width: w, height: h, fps });
      if (isWindows()) {
        this.copyCanvas = document.createElement('canvas');
        this.copyCanvas.width = w;
        this.copyCanvas.height = h;
      }
    } catch (error) {
      throw error;
    }
  }

  public async handleFrame(canvas: HTMLCanvasElement, frameNumber?: number): Promise<void> {
    const frameIndex = frameNumber !== undefined ? frameNumber : this.currentFrame;
    const timestampMicroseconds = Math.round((frameIndex / this.fps) * 1_000_000);
    const durationMicroseconds = Math.round((1 / this.fps) * 1_000_000);

    let sourceCanvas: HTMLCanvasElement = canvas;
    if (this.copyCanvas) {
      if (
        this.copyCanvas.width !== canvas.width ||
        this.copyCanvas.height !== canvas.height
      ) {
        this.copyCanvas.width = canvas.width;
        this.copyCanvas.height = canvas.height;
      }
      const ctx = this.copyCanvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0);
        sourceCanvas = this.copyCanvas;
      }
    }

    if (this.useNativeEncoder && this.nativeVideoEncoder) {
      const bitmap = await createImageBitmap(sourceCanvas);
      const frame = new VideoFrame(bitmap, {
        timestamp: timestampMicroseconds,
        duration: durationMicroseconds,
      });
      this.nativeVideoEncoder.encode(frame, { keyFrame: frameIndex === 0 });
      frame.close();
      bitmap.close();
    } else {
      let frame: VideoFrame;
      if (isWindows() && typeof createImageBitmap === 'function') {
        const bitmap = await createImageBitmap(sourceCanvas);
        frame = new VideoFrame(bitmap, {
          timestamp: timestampMicroseconds,
          duration: durationMicroseconds,
        });
        await this.encoder.addFrame(frame);
        frame.close();
        bitmap.close();
      } else {
        frame = new VideoFrame(sourceCanvas, {
          timestamp: timestampMicroseconds,
          duration: durationMicroseconds,
        });
        await this.encoder.addFrame(frame);
        frame.close();
      }
    }

    if (frameNumber === undefined) {
      this.currentFrame++;
    }
  }

  public async stop(): Promise<void> {
    if (this.useNativeEncoder && this.nativeVideoEncoder && this.nativeMuxer) {
      await this.nativeVideoEncoder.flush();
      this.nativeVideoEncoder.close();
      this.nativeVideoEncoder = null;
      this.nativeMuxer.finalize();
      const buf = this.nativeMuxer.target.buffer;
      this.nativeMuxer = null;
      this.videoBlob = new Blob([buf], { type: 'video/mp4' });
      return;
    }
    const buf = await this.encoder.end();
    const copy =
      buf instanceof ArrayBuffer
        ? buf.slice(0)
        : new Uint8Array(buf).slice().buffer;
    this.videoBlob = new Blob([copy], { type: 'video/mp4' });
  }

  public async generateAudio(
    assets: AssetInfo[][],
    startFrame: number,
    endFrame: number,
    onProgress?: (progress: number) => void,
  ): Promise<ArrayBuffer | null> {
    try {
      const processor = new BrowserAudioProcessor();
      const assetPlacements = getAssetPlacement(assets);

      if (assetPlacements.length === 0) {
        return null;
      }

      const processableCount = assetPlacements.filter(a => a.volume > 0 && a.playbackRate > 0).length;
      let processedCount = 0;

      const processedBuffers: AudioBuffer[] = [];
      for (let i = 0; i < assetPlacements.length; i++) {
        const asset = assetPlacements[i];
        if (asset.volume > 0 && asset.playbackRate > 0) {
          try {
            if (asset.type === 'video') {
              try {
                const assetHasAudio = await hasAudio(asset.src);
                if (!assetHasAudio) continue;
              } catch {
                // Continue processing if check fails (might have audio)
              }
            }

            // Add timeout wrapper for processAudioAsset (30 seconds max per asset)
            const processPromise = processor.processAudioAsset(
              asset,
              this.settings.fps || 30,
              endFrame - startFrame
            );
            
            const timeoutPromise = new Promise<never>((_, reject) => {
              setTimeout(() => {
                reject(new Error(`Timeout processing audio asset after 20s - video may have no audio track`));
              }, 20000);
            });
            
            const buffer = await Promise.race([processPromise, timeoutPromise]);
            processedBuffers.push(buffer);
            processedCount++;
            if (onProgress && processableCount > 0) {
              onProgress(processedCount / processableCount);
            }
          } catch {
            // Continue with other audio assets
          }
        }
      }

      if (processedBuffers.length === 0) {
        return null;
      }

      if (onProgress) onProgress(0.85);
      const mixedBuffer = processor.mixAudioBuffers(processedBuffers);
      if (onProgress) onProgress(0.92);

      const wavData = processor.audioBufferToWav(mixedBuffer);
      if (onProgress) onProgress(1);

      await processor.close();
      return wavData;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error('[BrowserRender] Audio generation error:', errorMsg);
      if (errorStack) console.error('[BrowserRender] Stack:', errorStack);
      return null;
    }
  }

  public async mergeMedia(): Promise<void> {
    // In browser, we don't need to merge separately
    // The video is already created with audio in the encoder
  }

  public async downloadVideos(assets: any[][]): Promise<void> {
    // Browser doesn't need to download source videos
    // They're already accessible via URLs
  }

  public getVideoBlob(): Blob | null {
    return this.videoBlob;
  }

  public setProgressCallback(callback: (progress: number) => void): void {
    this.onProgressCallback = callback;
  }
}

/**
 * Browser rendering configuration
 */
export interface BrowserRenderConfig {
  /** 
   * Custom Project object
   * If not provided, defaults to @twick/visualizer project
   * 
   * Note: Must be an imported Project object, not a string path.
   * String paths only work in Node.js environments (server renderer).
   * 
   * Example:
   * ```typescript
   * import myProject from './my-custom-project';
   * 
   * await renderTwickVideoInBrowser({
   *   projectFile: myProject,
   *   variables: { input: {...} }
   * });
   * ```
   */
  projectFile?: Project;
  /** Input variables containing project configuration */
  variables: {
    input: any;
    playerId?: string;
    [key: string]: any;
  };
  /** Render settings */
  settings?: {
    width?: number;
    height?: number;
    fps?: number;
    quality?: 'low' | 'medium' | 'high';
    range?: [number, number]; // [start, end] in seconds
    includeAudio?: boolean; // Enable audio processing
    downloadAudioSeparately?: boolean; // Download audio.wav separately
    onAudioReady?: (audioBlob: Blob) => void; // Callback when audio is ready
    onProgress?: (progress: number) => void;
    onComplete?: (videoBlob: Blob) => void;
    onError?: (error: Error) => void;
  };
}

/**
 * Renders a Twick video directly in the browser without requiring a server.
 * Uses WebCodecs API for encoding video frames into MP4 format.
 * 
 * This function uses the same signature as the server renderer for consistency.
 *
 * @param config - Configuration object containing variables and settings
 * @param config.projectFile - Optional project file path or Project object (defaults to visualizer project)
 * @param config.variables - Variables containing input configuration (tracks, elements, etc.)
 * @param config.settings - Optional render settings (width, height, fps, etc.)
 * @returns Promise resolving to a Blob containing the rendered video
 * 
 * @example
 * ```js
 * import { renderTwickVideoInBrowser } from '@twick/browser-render';
 * 
 * // Using default visualizer project
 * const videoBlob = await renderTwickVideoInBrowser({
 *   variables: {
 *     input: {
 *       properties: { width: 1920, height: 1080, fps: 30 },
 *       tracks: [
 *         // Your tracks configuration
 *       ]
 *     }
 *   },
 *   settings: {
 *     width: 1920,
 *     height: 1080,
 *     fps: 30,
 *     quality: 'high',
 *     onProgress: (progress) => console.log(`Rendering: ${progress * 100}%`),
 *   }
 * });
 * 
 * // Using custom project
 * import myProject from './my-custom-project';
 * const videoBlob = await renderTwickVideoInBrowser({
 *   projectFile: myProject, // Must be an imported Project object
 *   variables: { input: {...} },
 *   settings: {...}
 * });
 * 
 * // Download the video
 * const url = URL.createObjectURL(videoBlob);
 * const a = document.createElement('a');
 * a.href = url;
 * a.download = 'video.mp4';
 * a.click();
 * URL.revokeObjectURL(url);
 * ```
 */
export const renderTwickVideoInBrowser = async (
  config: BrowserRenderConfig
): Promise<Blob> => {
  // Save original methods to restore later
  const originalVideoPlay = HTMLVideoElement.prototype.play;
  const originalAudioPlay = HTMLAudioElement.prototype.play;
  const originalCreateElement = document.createElement.bind(document);
  
  // Override play methods to force muting
  HTMLVideoElement.prototype.play = function() {
    this.muted = true;
    this.volume = 0;
    return originalVideoPlay.call(this);
  };
  
  HTMLAudioElement.prototype.play = function() {
    this.muted = true;
    this.volume = 0;
    return originalAudioPlay.call(this);
  };
  
  // Override createElement to mute video/audio on creation
  document.createElement = function(tagName: string, options?: any) {
    const element = originalCreateElement(tagName, options);
    if (tagName.toLowerCase() === 'video' || tagName.toLowerCase() === 'audio') {
      (element as any).muted = true;
      (element as any).volume = 0;
    }
    return element;
  } as any;

  try {
    const { projectFile, variables, settings = {} } = config;

    if (!variables || !variables.input) {
      console.error('[BrowserRender] renderTwickVideoInBrowser: missing variables.input');
      throw new Error('Invalid configuration. "variables.input" is required.');
    }

    const width = settings.width || variables.input.properties?.width || 1920;
    const height = settings.height || variables.input.properties?.height || 1080;
    const fps = settings.fps || variables.input.properties?.fps || 30;

    const project: Project = !projectFile ? defaultProject : (projectFile as Project);
    project.variables = variables as any;

    // Create renderer settings
    const renderSettings: RendererSettings = {
      name: 'browser-render',
      exporter: {
        name: '@twick/core/wasm',
      },
      size: new Vector2(width, height),
      resolutionScale: 1,
      colorSpace: 'srgb',
      fps: fps,
      range: settings.range || [0, Infinity],
      background: variables.input.backgroundColor || '#000000',
      ...(settings.quality && {
        quality: settings.quality,
      }),
    };

    const renderer = new Renderer(project);
    const exporter = await BrowserWasmExporter.create(renderSettings);
    await exporter.start();
    
    if (settings.onProgress) {
      exporter.setProgressCallback(settings.onProgress);
    }

    await renderer['reloadScenes'](renderSettings);
    (renderer as any).stage.configure(renderSettings);
    (renderer as any).playback.fps = renderSettings.fps;
    
    // Set playback state to Rendering (critical for video elements)
    // PlaybackState: Playing = 0, Rendering = 1, Paused = 2, Presenting = 3
    (renderer as any).playback.state = 1;
    
    const totalFrames = await renderer.getNumberOfFrames(renderSettings);

    if (totalFrames === 0 || !isFinite(totalFrames)) {
      console.error('[BrowserRender] renderTwickVideoInBrowser: invalid totalFrames', totalFrames);
      throw new Error(
        'Cannot render: Video has zero duration. ' +
        'Please ensure your project has valid content with non-zero duration. ' +
        'Check that all video elements have valid sources and are properly loaded.'
      );
    }
    
    const videoElements: any[] = [];
    const audioElements: any[] = [];
    if (variables.input.tracks) {
      variables.input.tracks.forEach((track: any) => {
        if (track.elements) {
          track.elements.forEach((el: any) => {
            if (el.type === 'video') videoElements.push(el);
            if (el.type === 'audio') audioElements.push(el);
          });
        }
      });
    }

    // Load video metadata and check for audio (required for rendering)
    let hasAnyAudio = false;
    if (settings.includeAudio && audioElements.length > 0) {
      hasAnyAudio = true;
    }
    if (videoElements.length > 0) {
      for (const videoEl of videoElements) {
        const src = videoEl.props?.src;
        if (!src || src === 'undefined') continue;
        
        // Load video metadata
        const preloadVideo = document.createElement('video');
        preloadVideo.crossOrigin = 'anonymous';
        preloadVideo.preload = 'metadata';
        preloadVideo.src = src;
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(
            () => reject(new Error(`Timeout loading video metadata: ${src.substring(0, 80)}`)),
            30000
          );
          preloadVideo.addEventListener('loadedmetadata', () => {
            clearTimeout(timeout);
            resolve();
          }, { once: true });
          preloadVideo.addEventListener('error', () => {
            clearTimeout(timeout);
            const err = preloadVideo.error;
            reject(new Error(`Failed to load video: ${err?.message || 'Unknown error'}`));
          }, { once: true });
        });
        
        if (settings.includeAudio) {
          try {
            const videoHasAudio = await hasAudio(src);
            if (videoHasAudio) hasAnyAudio = true;
          } catch {
            hasAnyAudio = true;
          }
        }
      }
    }

    await (renderer as any).playback.recalculate();
    await (renderer as any).playback.reset();
    await (renderer as any).playback.seek(0);

    const mediaAssets: AssetInfo[][] = [];
    
    for (let frame = 0; frame < totalFrames; frame++) {
      if (frame > 0) {
        await (renderer as any).playback.progress();
      }
      await (renderer as any).stage.render(
        (renderer as any).playback.currentScene,
        (renderer as any).playback.previousScene,
      );
      const currentAssets = (renderer as any).playback.currentScene.getMediaAssets?.() || [];
      mediaAssets.push(currentAssets);
      const canvas = (renderer as any).stage.finalBuffer;
      await exporter.handleFrame(canvas, frame);
      // Video encoding: 0–90% so audio phase (90–100%) is visible
      if (settings.onProgress) settings.onProgress((frame / totalFrames) * 0.9);
    }

    await exporter.stop();

    // Inject standalone audio elements into mediaAssets per frame so getAssetPlacement includes them
    if (audioElements.length > 0 && settings.includeAudio) {
      for (let frame = 0; frame < mediaAssets.length; frame++) {
        const timeInSec = frame / fps;
        for (const el of audioElements) {
          const s = typeof el.s === 'number' ? el.s : 0;
          const e = typeof el.e === 'number' ? el.e : Number.MAX_VALUE;
          if (timeInSec >= s && timeInSec < e && el.props?.src) {
            const playbackRate = el.props.playbackRate ?? 1;
            const volume = el.props.volume ?? 1;
            const trimStart = el.props.time ?? 0;
            const currentTime = (timeInSec - s) * playbackRate + trimStart;
            (mediaAssets[frame] as AssetInfo[]).push({
              key: el.id,
              src: el.props.src,
              type: 'audio',
              currentTime,
              playbackRate,
              volume,
            });
          }
        }
      }
    }

    let audioData: ArrayBuffer | null = null;

    if (settings.includeAudio && mediaAssets.length > 0 && hasAnyAudio) {
      // Audio phase: 90–97%; progress callback maps generateAudio 0–1 to 0.90–0.97
      const reportAudioProgress = (p: number) => {
        if (settings.onProgress) settings.onProgress(0.9 + p * 0.07);
      };

      try {
        audioData = await exporter.generateAudio(mediaAssets, 0, totalFrames, reportAudioProgress);
        if (settings.onProgress) settings.onProgress(0.97);
      } catch (audioError) {
        const errorMsg = audioError instanceof Error ? audioError.message : String(audioError);
        const errorStack = audioError instanceof Error ? audioError.stack : undefined;
        console.error('[BrowserRender] Audio generation failed:', errorMsg);
        if (errorStack) console.error('[BrowserRender] Stack:', errorStack);
        audioData = null;
      }
    }

    let finalBlob = exporter.getVideoBlob();
    if (!finalBlob) {
      console.error('[BrowserRender] renderTwickVideoInBrowser: getVideoBlob returned null');
      throw new Error('Failed to create video blob');
    }

    if (finalBlob.size === 0) {
      console.error('[BrowserRender] renderTwickVideoInBrowser: video blob size is 0');
      throw new Error('Video blob is empty. Rendering may have failed.');
    }
    const MIN_VIDEO_BLOB_BYTES = 1024;
    if (finalBlob.size < MIN_VIDEO_BLOB_BYTES) {
      console.error('[BrowserRender] renderTwickVideoInBrowser: video blob too small', finalBlob.size, 'bytes (expected >=', MIN_VIDEO_BLOB_BYTES, ')');
      throw new Error(
        `Video blob is too small (${finalBlob.size} bytes). No video frames were encoded. ` +
        'This often happens on Windows when the encoder does not accept the frame format from canvas. ' +
        'Try using a different browser or updating graphics drivers.'
      );
    }

    // Only attempt muxing if we have audio data
    // If no audio or muxing fails, return the video blob without audio
    if (audioData && settings.includeAudio) {
      if (settings.onProgress) settings.onProgress(0.98);
      try {
        const muxedBlob = await muxAudioVideo({
          videoBlob: finalBlob,
          audioBuffer: audioData,
        });
        
        // Validate muxed blob has content
        if (!muxedBlob || muxedBlob.size === 0) {
          throw new Error('Muxed video blob is empty');
        }
        
        finalBlob = muxedBlob;
      } catch (muxError) {
        const errorMsg = muxError instanceof Error ? muxError.message : String(muxError);
        const errorStack = muxError instanceof Error ? muxError.stack : undefined;
        console.error('[BrowserRender] Audio muxing failed:', errorMsg);
        if (errorStack) console.error('[BrowserRender] Stack:', errorStack);
        // Optionally download audio separately if requested
        if (settings.downloadAudioSeparately && audioData) {
          const audioBlob = new Blob([audioData], { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const a = document.createElement('a');
          a.href = audioUrl;
          a.download = 'audio.wav';
          a.click();
          URL.revokeObjectURL(audioUrl);
        }
        
        // Re-get the original blob to ensure we have a valid video
        finalBlob = exporter.getVideoBlob();
        if (!finalBlob || finalBlob.size === 0) {
          throw new Error('Video blob is invalid after muxing failure');
        }
      }
    }

    if (!finalBlob || finalBlob.size === 0) {
      console.error('[BrowserRender] renderTwickVideoInBrowser: final blob invalid', finalBlob?.size);
      throw new Error('Final video blob is empty or invalid');
    }

    if (settings.onProgress) {
      settings.onProgress(1.0);
    }

    if (settings.onComplete) {
      settings.onComplete(finalBlob);
    }

    return finalBlob;
  } catch (error) {
    if (config.settings?.onError) {
      config.settings.onError(error as Error);
    }
    throw error;
  } finally {
    // Restore original methods
    HTMLVideoElement.prototype.play = originalVideoPlay;
    HTMLAudioElement.prototype.play = originalAudioPlay;
    document.createElement = originalCreateElement as any;
  }
};

/**
 * Helper function to download a video blob as a file
 * 
 * @param videoBlob - The video blob to download
 * @param filename - The desired filename (default: 'video.mp4')
 * 
 * @example
 * ```js
 * const blob = await renderTwickVideoInBrowser(projectData);
 * downloadVideoBlob(blob, 'my-video.mp4');
 * ```
 */
export const downloadVideoBlob = (videoBlob: Blob, filename: string = 'video.mp4'): void => {
  const url = URL.createObjectURL(videoBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke later so the browser can finish reading the blob (Windows disk I/O can be slower).
  const revokeMs = isWindows() ? 5000 : 1000;
  setTimeout(() => URL.revokeObjectURL(url), revokeMs);
};

export default renderTwickVideoInBrowser;
