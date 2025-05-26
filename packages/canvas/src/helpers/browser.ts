export const isBrowser = typeof window !== 'undefined';

export const isCanvasSupported = isBrowser && !!window.HTMLCanvasElement;

export const isVideoSupported = isBrowser && !!window.HTMLVideoElement;

export function assertBrowser() {
  if (!isBrowser) {
    throw new Error('This code can only run in a browser environment');
  }
}

export function assertCanvasSupport() {
  if (!isCanvasSupported) {
    throw new Error('Canvas is not supported in this environment');
  }
}

export function assertVideoSupport() {
  if (!isVideoSupported) {
    throw new Error('Video is not supported in this environment');
  }
} 