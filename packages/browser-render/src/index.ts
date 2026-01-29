/**
 * @twick/browser-render
 * Browser-native video rendering using WebCodecs API
 */

// Main browser renderer functions
export { renderTwickVideoInBrowser, downloadVideoBlob } from './browser-renderer';

// Helpers
export { normalizeVideoBlob } from './audio/video-normalizer';
export type { NormalizeVideoOptions, NormalizeVideoResult } from './audio/video-normalizer';

// React hook
export { useBrowserRenderer } from './hooks/use-browser-renderer';

// Type definitions
export type { BrowserRenderConfig } from './browser-renderer';
export type { 
  UseBrowserRendererOptions, 
  UseBrowserRendererReturn 
} from './hooks/use-browser-renderer';

// Set as default export
export { renderTwickVideoInBrowser as default } from './browser-renderer';
