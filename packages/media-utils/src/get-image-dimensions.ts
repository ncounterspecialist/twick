import { limit } from "./limit";
import { Dimensions } from "./types";
import { imageDimensionsCache } from "./cache";

/**
 * Loads an image from the given URL and resolves with its natural dimensions.
 * Internal helper function that creates a temporary Image element to extract
 * the natural width and height of an image without displaying it.
 *
 * @param url - The image URL to load
 * @returns Promise resolving with the image's natural width and height
 */
const loadImageDimensions = (url: string): Promise<Dimensions> => {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('getImageDimensions() is only available in the browser.'));
      return;
    }

    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Gets the dimensions (width and height) of an image from the given URL.
 * Uses a cache to avoid reloading the image if already fetched, and employs
 * a concurrency limiter to control resource usage and prevent overwhelming
 * the browser with too many simultaneous image loads.
 *
 * @param url - The URL of the image to analyze
 * @returns Promise resolving to an object containing width and height
 * 
 * @example
 * ```js
 * // Get dimensions of a remote image
 * const dimensions = await getImageDimensions("https://example.com/image.jpg");
 * // dimensions = { width: 1920, height: 1080 }
 * 
 * // Get dimensions of a local blob URL
 * const dimensions = await getImageDimensions("blob:http://localhost:3000/abc123");
 * // dimensions = { width: 800, height: 600 }
 * 
 * // Subsequent calls for the same URL will use cache
 * const cachedDimensions = await getImageDimensions("https://example.com/image.jpg");
 * // Returns immediately from cache without reloading
 * ```
 */
export const getImageDimensions = (url: string): Promise<Dimensions> => {
  // Return cached dimensions if available
  if (imageDimensionsCache[url]) {
    return Promise.resolve(imageDimensionsCache[url]);
  }

  // Fetch and cache the dimensions using a concurrency limit
  return limit(() => loadImageDimensions(url)).then((dimensions) => {
    imageDimensionsCache[url] = dimensions;
    return dimensions;
  });
};
