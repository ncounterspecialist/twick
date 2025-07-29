import { limit } from "./limit";
import { Dimensions } from "./types";
import { imageDimensionsCache } from "./cache";

/**
 * Loads an image from the given URL and resolves with its natural dimensions.
 *
 * @param url - The image URL to load.
 * @returns A Promise that resolves with the image's width and height.
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
 * Uses a cache to avoid reloading the image if already fetched.
 * Also uses a concurrency limiter to control resource usage.
 *
 * @param url - The URL of the image.
 * @returns A Promise that resolves to an object containing `width` and `height`.
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
