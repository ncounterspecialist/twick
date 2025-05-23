import { videoMetaCache } from "./cache";
import { VideoMeta } from "./types";

/**
 * Fetches metadata (width, height, duration) for a given video source.
 * If metadata has already been fetched and cached, it returns the cached data.
 *
 * @param videoSrc - The URL or path to the video file.
 * @returns A Promise that resolves to an object containing video metadata.
 */
export const getVideoMeta = (videoSrc: string): Promise<VideoMeta> => {
  // Return cached metadata if available
  if (videoMetaCache[videoSrc]) {
    return Promise.resolve(videoMetaCache[videoSrc]);
  }

  return new Promise<VideoMeta>((resolve, reject) => {
    const video: HTMLVideoElement = document.createElement("video");
    video.preload = "metadata"; // Only preload metadata to reduce bandwidth
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
    video.onerror = () => reject(new Error("Failed to load video metadata"));
  });
};
