import { LRUCache } from "./lru-cache";

/**
 * Configuration options for the VideoFrameExtractor service.
 */
export interface VideoFrameExtractorOptions {
  /** Maximum number of cached frames (default: 50) */
  maxCacheSize?: number;
  /** Maximum number of video elements to keep in memory (default: 5) */
  maxVideoElements?: number;
  /** Timeout for video loading in milliseconds (default: 15000) */
  loadTimeout?: number;
  /** JPEG quality for thumbnails (0-1, default: 0.8) */
  jpegQuality?: number;
  /** Playback rate for video (default: 1) */
  playbackRate?: number;
}

interface VideoElementState {
  video: HTMLVideoElement;
  isReady: boolean;
  isLoading: boolean;
  loadPromise: Promise<void> | null;
  lastUsed: number;
}

/**
 * Service for efficiently extracting frames from videos.
 * 
 * Features:
 * - Reuses a single video element per video URL
 * - LRU cache for extracted frames
 * - Fast seeking for timeline scrubbing
 * - Automatic cleanup of unused video elements
 * 
 * @example
 * ```js
 * const extractor = new VideoFrameExtractor();
 * 
 * // Extract frame at 5 seconds
 * const thumbnail = await extractor.getFrame("https://example.com/video.mp4", 5);
 * 
 * // Extract another frame from the same video (reuses video element)
 * const thumbnail2 = await extractor.getFrame("https://example.com/video.mp4", 10);
 * 
 * // Cleanup when done
 * extractor.dispose();
 * ```
 */
export class VideoFrameExtractor {
  private frameCache: LRUCache<string, string>;
  private videoElements: Map<string, VideoElementState>;
  private readonly maxVideoElements: number;
  private readonly loadTimeout: number;
  private readonly jpegQuality: number;
  private readonly playbackRate: number;

  constructor(options: VideoFrameExtractorOptions = {}) {
    this.frameCache = new LRUCache<string, string>(
      options.maxCacheSize ?? 50
    );
    this.videoElements = new Map();
    this.maxVideoElements = options.maxVideoElements ?? 5;
    this.loadTimeout = options.loadTimeout ?? 15000;
    this.jpegQuality = options.jpegQuality ?? 0.8;
    this.playbackRate = options.playbackRate ?? 1;
  }

  /**
   * Get a frame thumbnail from a video at a specific time.
   * Uses caching and reuses video elements for optimal performance.
   * 
   * @param videoUrl - The URL of the video
   * @param seekTime - The time in seconds to extract the frame
   * @returns Promise resolving to a thumbnail image URL (data URL or blob URL)
   */
  async getFrame(videoUrl: string, seekTime: number = 0.1): Promise<string> {
    // Check cache first
    const cacheKey = this.getCacheKey(videoUrl, seekTime);
    const cached = this.frameCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Get or create video element
    const videoState = await this.getVideoElement(videoUrl);
    
    // Extract frame
    const thumbnail = await this.extractFrame(videoState.video, seekTime);
    
    // Cache the result
    this.frameCache.set(cacheKey, thumbnail);
    
    return thumbnail;
  }

  /**
   * Get or create a video element for the given URL.
   * Reuses existing elements and manages cleanup.
   */
  private async getVideoElement(videoUrl: string): Promise<VideoElementState> {
    let videoState = this.videoElements.get(videoUrl);

    // If video element exists and is ready, return it
    if (videoState && videoState.isReady) {
      videoState.lastUsed = Date.now();
      return videoState;
    }

    // If video element exists but is loading, wait for it
    if (videoState && videoState.isLoading && videoState.loadPromise) {
      await videoState.loadPromise;
      if (videoState.isReady) {
        videoState.lastUsed = Date.now();
        return videoState;
      }
    }

    // Cleanup old video elements if we're at capacity
    if (this.videoElements.size >= this.maxVideoElements) {
      this.cleanupOldVideoElements();
    }

    // Create new video element
    videoState = await this.createVideoElement(videoUrl);
    this.videoElements.set(videoUrl, videoState);
    videoState.lastUsed = Date.now();

    return videoState;
  }

  /**
   * Create and initialize a new video element.
   */
  private async createVideoElement(videoUrl: string): Promise<VideoElementState> {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.autoplay = false;
    video.preload = "auto";
    video.playbackRate = this.playbackRate;

    // Make video element hidden
    video.style.position = "absolute";
    video.style.left = "-9999px";
    video.style.top = "-9999px";
    video.style.width = "1px";
    video.style.height = "1px";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";
    video.style.zIndex = "-1";

    const state: VideoElementState = {
      video,
      isReady: false,
      isLoading: true,
      loadPromise: null,
      lastUsed: Date.now(),
    };

    // Create load promise
    state.loadPromise = new Promise<void>((resolve, reject) => {
      let timeoutId: number | undefined;

      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId);
      };

      const handleError = () => {
        cleanup();
        state.isLoading = false;
        reject(new Error(`Failed to load video: ${video.error?.message || "Unknown error"}`));
      };

      const handleLoadedMetadata = () => {
        cleanup();
        state.isReady = true;
        state.isLoading = false;
        resolve();
      };

      video.addEventListener("error", handleError, { once: true });
      video.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });

      // Timeout protection
      timeoutId = window.setTimeout(() => {
        cleanup();
        state.isLoading = false;
        reject(new Error("Video loading timed out"));
      }, this.loadTimeout);

      // Assign source and add to DOM
      video.src = videoUrl;
      document.body.appendChild(video);
    });

    try {
      await state.loadPromise;
    } catch (error) {
      // Cleanup on error
      if (video.parentNode) {
        video.remove();
      }
      throw error;
    }

    return state;
  }

  /**
   * Extract a frame from a video at the specified time.
   */
  private async extractFrame(
    video: HTMLVideoElement,
    seekTime: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      // Ensure video is paused
      video.pause();

      // Check if we're already at the target time (within a small threshold)
      const timeThreshold = 0.1; // 100ms threshold
      if (Math.abs(video.currentTime - seekTime) < timeThreshold) {
        // Already at target time, capture immediately
        try {
          const canvas = document.createElement("canvas");
          const width = video.videoWidth || 640;
          const height = video.videoHeight || 360;
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          ctx.drawImage(video, 0, 0, width, height);

          try {
            const dataUrl = canvas.toDataURL("image/jpeg", this.jpegQuality);
            resolve(dataUrl);
          } catch {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error("Failed to create Blob"));
                  return;
                }
                const blobUrl = URL.createObjectURL(blob);
                resolve(blobUrl);
              },
              "image/jpeg",
              this.jpegQuality
            );
          }
          return;
        } catch (err) {
          reject(new Error(`Error creating thumbnail: ${err}`));
          return;
        }
      }

      const handleSeeked = () => {
        try {
          const canvas = document.createElement("canvas");
          const width = video.videoWidth || 640;
          const height = video.videoHeight || 360;
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          // Draw current video frame onto canvas
          ctx.drawImage(video, 0, 0, width, height);

          // Export canvas to base64 image URL
          try {
            const dataUrl = canvas.toDataURL("image/jpeg", this.jpegQuality);
            resolve(dataUrl);
          } catch {
            // Fallback: convert canvas to Blob
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error("Failed to create Blob"));
                  return;
                }
                const blobUrl = URL.createObjectURL(blob);
                resolve(blobUrl);
              },
              "image/jpeg",
              this.jpegQuality
            );
          }
        } catch (err) {
          reject(new Error(`Error creating thumbnail: ${err}`));
        }
      };

      video.addEventListener("seeked", handleSeeked, { once: true });

      // Seek to the desired time
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.currentTime = seekTime;
          })
          .catch(() => {
            // Even if play fails, try to seek
            video.currentTime = seekTime;
          });
      } else {
        video.currentTime = seekTime;
      }
    });
  }

  /**
   * Generate cache key for a video URL and seek time.
   */
  private getCacheKey(videoUrl: string, seekTime: number): string {
    // Round seek time to 2 decimal places for better cache hits
    const roundedTime = Math.round(seekTime * 100) / 100;
    return `${videoUrl}:${roundedTime}`;
  }

  /**
   * Cleanup least recently used video elements.
   */
  private cleanupOldVideoElements(): void {
    if (this.videoElements.size < this.maxVideoElements) {
      return;
    }

    // Sort by last used time and remove oldest
    const entries = Array.from(this.videoElements.entries());
    entries.sort((a, b) => a[1].lastUsed - b[1].lastUsed);

    // Remove oldest entries until we're under the limit
    const toRemove = entries.slice(0, entries.length - this.maxVideoElements + 1);
    for (const [url, state] of toRemove) {
      if (state.video.parentNode) {
        state.video.remove();
      }
      this.videoElements.delete(url);
    }
  }

  /**
   * Clear the frame cache.
   */
  clearCache(): void {
    this.frameCache.clear();
  }

  /**
   * Remove a specific video element and clear its cached frames.
   */
  removeVideo(videoUrl: string): void {
    const state = this.videoElements.get(videoUrl);
    if (state) {
      if (state.video.parentNode) {
        state.video.remove();
      }
      this.videoElements.delete(videoUrl);
    }

    // Clear all cached frames for this video.
    // Note: LRU cache doesn't have iteration capabilities, so we clear all cached frames.
    // In a production system, you might want to track video-specific cache keys
    // to enable selective cache invalidation per video URL.
    this.frameCache.clear();
  }

  /**
   * Dispose of all video elements and clear caches.
   * Removes all video elements from the DOM and clears both the frame cache
   * and video element cache. Call this when the extractor is no longer needed
   * to prevent memory leaks.
   */
  dispose(): void {
    // Remove all video elements from the DOM
    for (const state of this.videoElements.values()) {
      if (state.video.parentNode) {
        state.video.remove();
      }
    }
    this.videoElements.clear();
    this.frameCache.clear();
  }
}

// Singleton instance for convenience
let defaultExtractor: VideoFrameExtractor | null = null;

/**
 * Get the default VideoFrameExtractor instance.
 * Creates one if it doesn't exist.
 */
export function getDefaultVideoFrameExtractor(
  options?: VideoFrameExtractorOptions
): VideoFrameExtractor {
  if (!defaultExtractor) {
    defaultExtractor = new VideoFrameExtractor(options);
  }
  return defaultExtractor;
}

/**
 * Extract a frame using the default extractor instance.
 * This is a drop-in replacement for getThumbnail with better performance.
 * 
 * @param videoUrl - The URL of the video
 * @param seekTime - The time in seconds to extract the frame
 * @param playbackRate - Playback speed (optional, uses extractor default if not provided)
 * @returns Promise resolving to a thumbnail image URL
 */
export async function getThumbnailCached(
  videoUrl: string,
  seekTime: number = 0.1,
  playbackRate?: number
): Promise<string> {
  const extractor = getDefaultVideoFrameExtractor(
    playbackRate !== undefined ? { playbackRate } : undefined
  );
  return extractor.getFrame(videoUrl, seekTime);
}
