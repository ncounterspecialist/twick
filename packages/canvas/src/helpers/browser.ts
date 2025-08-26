/**
 * Checks if the code is running in a browser environment.
 * Returns true if window object is available, false otherwise.
 * 
 * @example
 * ```js
 * import { isBrowser } from '@twick/canvas';
 * 
 * if (isBrowser) {
 *   // Browser-specific code
 *   console.log('Running in browser');
 * }
 * ```
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Checks if the Canvas API is supported in the current environment.
 * Returns true if HTMLCanvasElement is available, false otherwise.
 * 
 * @example
 * ```js
 * import { isCanvasSupported } from '@twick/canvas';
 * 
 * if (isCanvasSupported) {
 *   // Canvas operations are safe
 *   createCanvas();
 * }
 * ```
 */
export const isCanvasSupported = isBrowser && !!window.HTMLCanvasElement;

/**
 * Checks if the Video API is supported in the current environment.
 * Returns true if HTMLVideoElement is available, false otherwise.
 * 
 * @example
 * ```js
 * import { isVideoSupported } from '@twick/canvas';
 * 
 * if (isVideoSupported) {
 *   // Video operations are safe
 *   addVideoElement();
 * }
 * ```
 */
export const isVideoSupported = isBrowser && !!window.HTMLVideoElement;

/**
 * Asserts that the code is running in a browser environment.
 * Throws an error if the code is executed in a non-browser context
 * such as Node.js server-side rendering.
 * 
 * @throws Error when not running in a browser environment
 * 
 * @example
 * ```js
 * assertBrowser();
 * // Code continues if in browser, throws error if not
 * ```
 */
export function assertBrowser() {
  if (!isBrowser) {
    throw new Error('This code can only run in a browser environment');
  }
}

/**
 * Asserts that the Canvas API is supported in the current environment.
 * Checks for HTMLCanvasElement support and throws an error if canvas
 * functionality is not available.
 * 
 * @throws Error when Canvas API is not supported
 * 
 * @example
 * ```js
 * assertCanvasSupport();
 * // Code continues if canvas is supported, throws error if not
 * ```
 */
export function assertCanvasSupport() {
  if (!isCanvasSupported) {
    throw new Error('Canvas is not supported in this environment');
  }
}

/**
 * Asserts that the Video API is supported in the current environment.
 * Checks for HTMLVideoElement support and throws an error if video
 * functionality is not available.
 * 
 * @throws Error when Video API is not supported
 * 
 * @example
 * ```js
 * assertVideoSupport();
 * // Code continues if video is supported, throws error if not
 * ```
 */
export function assertVideoSupport() {
  if (!isVideoSupported) {
    throw new Error('Video is not supported in this environment');
  }
} 