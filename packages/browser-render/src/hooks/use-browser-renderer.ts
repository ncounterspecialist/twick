import { useState, useCallback } from 'react';
import { renderTwickVideoInBrowser, downloadVideoBlob } from '../browser-renderer';
import type { BrowserRenderConfig } from '../browser-renderer';

export interface UseBrowserRendererOptions {
  /** 
   * Custom Project object
   * If not provided, defaults to @twick/visualizer project
   * 
   * Note: Must be an imported Project object, not a string path.
   * String paths only work in Node.js (server renderer).
   * 
   * Example:
   * ```typescript
   * import myProject from './my-custom-project';
   * useBrowserRenderer({ projectFile: myProject })
   * ```
   */
  projectFile?: any;
  /** Video width in pixels */
  width?: number;
  /** Video height in pixels */
  height?: number;
  /** Frames per second */
  fps?: number;
  /** Render quality */
  quality?: 'low' | 'medium' | 'high';
  /** Time range to render [start, end] in seconds */
  range?: [number, number];
  /** Include audio in rendered video (experimental) */
  includeAudio?: boolean;
  /** Download audio separately as WAV file */
  downloadAudioSeparately?: boolean;
  /** Callback when audio is ready */
  onAudioReady?: (audioBlob: Blob) => void;
  /** Automatically download the video when rendering completes */
  autoDownload?: boolean;
  /** Default filename for downloads */
  downloadFilename?: string;
}

export interface UseBrowserRendererReturn {
  /** Start rendering the video */
  render: (variables: BrowserRenderConfig['variables']) => Promise<Blob | null>;
  /** Current rendering progress (0-1) */
  progress: number;
  /** Whether rendering is in progress */
  isRendering: boolean;
  /** Error if rendering failed */
  error: Error | null;
  /** The rendered video blob (available after rendering completes) */
  videoBlob: Blob | null;
  /** Download the rendered video */
  download: (filename?: string) => void;
  /** Reset the renderer state */
  reset: () => void;
}

/**
 * React hook for rendering Twick videos in the browser
 * 
 * Uses the same pattern as the server renderer for consistency.
 * 
 * @param options - Rendering options
 * @returns Renderer state and control functions
 * 
 * @example
 * ```tsx
 * import { useBrowserRenderer } from '@twick/browser-render';
 * 
 * // Using default visualizer project
 * function MyComponent() {
 *   const { render, progress, isRendering, videoBlob, download } = useBrowserRenderer({
 *     width: 1920,
 *     height: 1080,
 *     fps: 30,
 *     autoDownload: true,
 *   });
 * 
 *   const handleRender = async () => {
 *     await render({
 *       input: {
 *         properties: { width: 1920, height: 1080, fps: 30 },
 *         tracks: [
 *           // Your tracks configuration
 *         ]
 *       }
 *     });
 *   };
 * 
 *   return (
 *     <div>
 *       <button onClick={handleRender} disabled={isRendering}>
 *         {isRendering ? `Rendering... ${(progress * 100).toFixed(0)}%` : 'Render Video'}
 *       </button>
 *       {videoBlob && !autoDownload && (
 *         <button onClick={() => download('my-video.mp4')}>Download</button>
 *       )}
 *     </div>
 *   );
 * }
 * 
 * // Using custom project (must import it first)
 * import myProject from './my-project';
 * 
 * function CustomProjectComponent() {
 *   const { render } = useBrowserRenderer({
 *     projectFile: myProject, // Pass the imported project object
 *     width: 1920,
 *     height: 1080,
 *   });
 *   
 *   // ... rest of component
 * }
 * ```
 */
export const useBrowserRenderer = (options: UseBrowserRendererOptions = {}): UseBrowserRendererReturn => {
  const [progress, setProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const reset = useCallback(() => {
    setProgress(0);
    setIsRendering(false);
    setError(null);
    setVideoBlob(null);
  }, []);

  const download = useCallback((filename?: string) => {
    if (!videoBlob) {
      setError(new Error('No video available to download. Please render the video first.'));
      return;
    }
    try {
      downloadVideoBlob(videoBlob, filename || options.downloadFilename || 'video.mp4');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to download video'));
    }
  }, [videoBlob, options.downloadFilename]);

  const render = useCallback(async (variables: BrowserRenderConfig['variables']): Promise<Blob | null> => {
    reset();
    setIsRendering(true);

    try {
      const { projectFile, width, height, fps, quality, range, includeAudio, downloadAudioSeparately, onAudioReady, autoDownload, downloadFilename, ...restOptions } = options;
      
      const blob = await renderTwickVideoInBrowser({
        projectFile,
        variables,
        settings: {
          width,
          height,
          includeAudio,
          downloadAudioSeparately,
          onAudioReady,
          fps,
          quality,
          range,
          ...restOptions,
          onProgress: (p) => {
            setProgress(p);
          },
          onComplete: (blob) => {
            setVideoBlob(blob);
            if (autoDownload) {
              try {
                downloadVideoBlob(blob, downloadFilename || 'video.mp4');
              } catch (downloadErr) {
                setError(downloadErr instanceof Error ? downloadErr : new Error('Failed to auto-download video'));
              }
            }
          },
          onError: (err) => {
            setError(err);
          },
        },
      });

      if (!blob) {
        throw new Error('Rendering failed: No video blob was generated');
      }

      setVideoBlob(blob);
      setProgress(1);
      return blob;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setIsRendering(false);
    }
  }, [options, reset]);

  return {
    render,
    progress,
    isRendering,
    error,
    videoBlob,
    download,
    reset,
  };
};

export default useBrowserRenderer;
