import { videoMetaCache } from "./cache";
import { VideoMeta } from "./types";

/**
 * Fetches metadata (width, height, duration) for a given video source.
 * Uses a cache to avoid reloading the same video multiple times for better performance.
 * The function creates a temporary video element, loads only metadata, and extracts
 * the video properties without downloading the entire file.
 *
 * @param videoSrc - The URL or path to the video file
 * @returns Promise resolving to an object containing video metadata
 * 
 * @example
 * ```js
 * // Get metadata for a video
 * const metadata = await getVideoMeta("https://example.com/video.mp4");
 * // metadata = { width: 1920, height: 1080, duration: 120.5 }
 * 
 * // Get metadata for a local blob URL
 * const metadata = await getVideoMeta("blob:http://localhost:3000/abc123");
 * // metadata = { width: 1280, height: 720, duration: 30.0 }
 * ```
 */
export const getVideoMeta = (videoSrc: string): Promise<VideoMeta> => {
  // Return cached metadata if available
  if (videoMetaCache[videoSrc]) {
    return Promise.resolve(videoMetaCache[videoSrc]);
  }

  return new Promise<VideoMeta>((resolve, reject) => {
    // Validate the videoSrc to ensure it's a safe URL before assigning it to video.src
    const isSafeUrl = /^(https?:|blob:|data:video\/)/i.test(videoSrc);
    if (!isSafeUrl) {
      reject(new Error("Unsafe video source URL"));
      return;
    }

    const tryLoadVideo = (useCors: boolean) => {
      const video: HTMLVideoElement = document.createElement("video");
      video.preload = "metadata"; // Only preload metadata to reduce bandwidth
      video.crossOrigin = useCors ? "anonymous" : null; // Set crossOrigin to handle CORS, or null as fallback
      video.src = videoSrc;

      // When metadata is loaded, extract and cache it
      video.onloadedmetadata = () => {
        const meta: VideoMeta = {
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
        };
        videoMetaCache[videoSrc] = meta;
        resolve(meta);
      };

      // Handle video loading errors
      video.onerror = () => {
        // If we tried with CORS and it failed, retry without CORS
        if (useCors) {
          // Clean up the failed video element
          video.src = '';
          // Retry without CORS
          tryLoadVideo(false);
        } else {
          reject(new Error("Failed to load video metadata. This may be due to CORS restrictions or an invalid video URL."));
        }
      };
    };

    // First try with CORS enabled
    tryLoadVideo(true);
  });
};
