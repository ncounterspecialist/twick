import { audioDurationCache } from "./cache";

/**
 * Retrieves the duration (in seconds) of an audio file from a given source URL.
 * Uses a cache to avoid reloading the same audio multiple times.
 *
 * @param audioSrc - The source URL of the audio file.
 * @returns A Promise that resolves to the duration of the audio in seconds.
 */
export const getAudioDuration = (audioSrc: string): Promise<number> => {
  // Return cached duration if available
  if (audioDurationCache[audioSrc]) {
    return Promise.resolve(audioDurationCache[audioSrc]);
  }

  return new Promise((resolve, reject) => {
    const audio = document.createElement("audio");
    audio.preload = "metadata"; // Only load metadata (e.g., duration)
    // Sanitize the audioSrc to prevent XSS by only allowing safe URLs (http, https, blob, data)
    const isSafeUrl = /^(https?:|blob:|data:audio\/)/i.test(audioSrc);
    if (!isSafeUrl) {
      throw new Error("Unsafe audio source URL");
    }
    audio.src = audioSrc;

    // When metadata is loaded, store duration in cache and resolve
    audio.onloadedmetadata = () => {
      const duration = audio.duration;
      audioDurationCache[audioSrc] = duration;
      resolve(duration);
    };

    // Handle loading errors
    audio.onerror = () => {
      reject(new Error("Failed to load audio metadata"));
    };
  });
};
