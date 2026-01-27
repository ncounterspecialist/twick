import { Renderer, Vector2 } from "@twick/core";
import type { Project, RendererSettings } from "@twick/core";
import defaultProject from "@twick/visualizer/dist/project.js";
import { BrowserAudioProcessor, getAssetPlacement, type AssetInfo } from './audio/audio-processor';
import { muxAudioVideo } from './audio/audio-video-muxer';

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

  public static async create(settings: RendererSettings) {
    return new BrowserWasmExporter(settings);
  }

  public constructor(
    private readonly settings: RendererSettings,
  ) {
    this.fps = settings.fps || 30;
  }

  public async start(): Promise<void> {
    try {
      // Import mp4-wasm
      const loadMp4Module = (await import('mp4-wasm')).default;
      
      // Try multiple locations to fetch the WASM file
      const possiblePaths = [
        // Vite dev server virtual path
        '/@mp4-wasm',
        // Common bundled asset paths (Vite uses hashed names)
        '/assets/mp4-wasm.wasm',
        '/assets/mp4-YBRi_559.wasm', // Known Vite hash
        '/mp4-wasm.wasm',
        // Node modules path (for dev)
        '/node_modules/mp4-wasm/dist/mp4-wasm.wasm',
      ];
      
      let buffer: ArrayBuffer | null = null;
      let successPath = '';
      
      for (const path of possiblePaths) {
        try {
          const resp = await fetch(path);
          if (resp.ok) {
            const contentType = resp.headers.get('content-type');
            // Make sure we got a WASM file, not HTML
            if (contentType && contentType.includes('html')) {
              continue;
            }
            buffer = await resp.arrayBuffer();
            successPath = path;
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      if (!buffer) {
        throw new Error(
          'Could not load WASM file from any location. ' +
          'Please copy mp4-wasm.wasm to your public directory or configure Vite to serve it.'
        );
      }
      
      const mp4 = await loadMp4Module({ wasmBinary: buffer });

      this.encoder = mp4.createWebCodecsEncoder({
        width: this.settings.size.x,
        height: this.settings.size.y,
        fps: this.fps,
      });
    } catch (error) {
      throw error;
    }
  }

  public async handleFrame(canvas: HTMLCanvasElement, frameNumber?: number): Promise<void> {
    const frameIndex = frameNumber !== undefined ? frameNumber : this.currentFrame;
    const timestampMicroseconds = Math.round((frameIndex / this.fps) * 1_000_000);
    
    const frame = new VideoFrame(canvas, { 
      timestamp: timestampMicroseconds,
      duration: Math.round((1 / this.fps) * 1_000_000)
    });
    
    await this.encoder.addFrame(frame);
    frame.close();
    
    if (frameNumber === undefined) {
      this.currentFrame++;
    }
  }

  public async stop(): Promise<void> {
    const buf = await this.encoder.end();
    this.videoBlob = new Blob([buf], { type: 'video/mp4' });
  }

  public async generateAudio(
    assets: AssetInfo[][],
    startFrame: number,
    endFrame: number,
  ): Promise<ArrayBuffer | null> {
    try {
      const processor = new BrowserAudioProcessor();
      const assetPlacements = getAssetPlacement(assets);

      if (assetPlacements.length === 0) {
        return null;
      }

      const processedBuffers: AudioBuffer[] = [];
      for (const asset of assetPlacements) {
        if (asset.volume > 0 && asset.playbackRate > 0) {
          try {
            const buffer = await processor.processAudioAsset(
              asset,
              this.settings.fps || 30,
              endFrame - startFrame
            );
            processedBuffers.push(buffer);
          } catch {
            // Continue with other audio assets
          }
        }
      }

      if (processedBuffers.length === 0) {
        return null;
      }

      const mixedBuffer = processor.mixAudioBuffers(processedBuffers);
      const wavData = processor.audioBufferToWav(mixedBuffer);

      await processor.close();
      return wavData;
    } catch {
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
      throw new Error(
        'Cannot render: Video has zero duration. ' +
        'Please ensure your project has valid content with non-zero duration. ' +
        'Check that all video elements have valid sources and are properly loaded.'
      );
    }
    
    const videoElements: any[] = [];
    if (variables.input.tracks) {
      variables.input.tracks.forEach((track: any) => {
        if (track.elements) {
          track.elements.forEach((el: any) => {
            if (el.type === 'video') videoElements.push(el);
          });
        }
      });
    }

    if (videoElements.length > 0) {
      for (const videoEl of videoElements) {
        const src = videoEl.props?.src;
        if (!src || src === 'undefined') continue;
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
      if (settings.onProgress) settings.onProgress(frame / totalFrames);
    }

    await exporter.stop();
    
    let audioData: ArrayBuffer | null = null;
    if (settings.includeAudio && mediaAssets.length > 0) {
      audioData = await exporter.generateAudio(mediaAssets, 0, totalFrames);
    }

    let finalBlob = exporter.getVideoBlob();
    if (!finalBlob) {
      throw new Error('Failed to create video blob');
    }

    if (audioData && settings.includeAudio) {
      try {
        finalBlob = await muxAudioVideo({
          videoBlob: finalBlob,
          audioBuffer: audioData,
        });
      } catch {
        const audioBlob = new Blob([audioData], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = 'audio.wav';
        a.click();
        URL.revokeObjectURL(audioUrl);
      }
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
  
  // Clean up the object URL after a delay
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export default renderTwickVideoInBrowser;
