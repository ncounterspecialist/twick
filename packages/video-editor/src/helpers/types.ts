export interface Animation {
  name: string;
  interval?: number;
  duration?: number;
  intensity?: number;
  animate?: "enter" | "exit" | "both";
  mode?: "in" | "out";
  direction?: "up" | "down" | "left" | "right" | "center";
  options: {
    animate?: ("enter" | "exit" | "both")[];
    mode?: ("in" | "out")[];
    direction?: ("left" | "right" | "center" | "up" | "down")[];
    intensity?: [number, number];
    interval?: [number, number];
    duration?: [number, number];
  };
  getSample: (animation?: Animation) => string;
}

export interface TextEffect {
  name: string;
  duration: number;
  delay?: number;
  bufferTime?: number;
  getSample?: () => string;
}

export type MediaSource = "user" | "public";

export type MediaOrigin =
  | "upload"
  | "pexels"
  | "unsplash"
  | "pixabay"
  | "custom"
  | string;

/**
 * Generic media entity used by the editor and Studio.
 *
 * This shape is intentionally provider-agnostic and can represent:
 * - User-uploaded assets (local or cloud-backed)
 * - Public/provider assets (Pexels, Unsplash, internal stock, etc.)
 *
 * NOTE:
 * - Existing consumers can continue to treat this as a simple MediaItem
 *   (id, type, url, thumbnail, duration, etc.).
 * - New fields (source/origin/provider/attribution) enable richer asset
 *   library experiences without breaking backwards compatibility.
 */
export interface MediaItem {
  /** Stable internal id for this asset within the host app/library. */
  id: string;
  /** Human-readable name (file name, provider title, etc.). */
  name: string;
  /** Logical media type (video, audio, image, etc.). */
  type: string;
  /**
   * Primary URL used by canvas/visualizer and exports.
   * This may point to user storage, CDN, or a third-party provider.
   */
  url: string;
  /**
   * Optional preview image URL (thumbnail or poster frame).
   * Prefer using this over the full asset for grid/list views.
   */
  previewUrl?: string;
  /**
   * Backwards-compatible thumbnail alias for previewUrl.
   */
  thumbnail?: string;
  /**
   * Optional URL to a precomputed audio waveform or spectrogram.
   */
  waveformUrl?: string;
  /** Duration in milliseconds for audio/video assets (if known). */
  duration?: number;
  /** Pixel dimensions for image/video assets (if known). */
  width?: number;
  height?: number;
  /** Approximate size of the original asset in bytes (if known). */
  sizeBytes?: number;
  /**
   * High-level source category: user-owned vs public/provider.
   * Undefined for legacy items defaults to user-owned semantics.
   */
  source?: MediaSource;
  /**
   * Origin of the asset (upload, pexels, unsplash, etc.).
   * Useful for analytics and provider-specific policies.
   */
  origin?: MediaOrigin;
  /**
   * Provider metadata (for public assets).
   * - provider: canonical provider id ('pexels', 'unsplash', ...)
   * - providerId: provider-specific asset id
   * - providerUrl: link back to the provider's detail page
   */
  provider?: string;
  providerId?: string;
  providerUrl?: string;
  /**
   * Attribution and licensing hints for public assets.
   * The host app can surface this in UI or export flows.
   */
  attribution?: {
    text?: string;
    author?: string;
    authorUrl?: string;
    licenseUrl?: string;
  };
  /** Free-form tags for search and filtering. */
  tags?: string[];
  /**
   * Arbitrary structured metadata.
   * Consumers should namespace their keys to avoid collisions.
   */
  metadata?: {
    title?: string;
    [key: string]: any;
  };
  /**
   * Optional serialized binary representation for local-only storage
   * (e.g. IndexedDB via BrowserMediaManager).
   */
  arrayBuffer?: ArrayBuffer;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SearchOptions {
  query?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  metadata?: {
    [key: string]: any;
  };
}

export interface ElementColors {
  video: string;
  audio: string;
  image: string;
  text: string;
  caption: string;
  icon: string;
  circle: string;
  rect: string;
  element: string;
  fragment: string;
  frameEffect: string;
  filters: string;
  transition: string;
  animation: string;
  effect?: string;
}

/**
 * Canvas behavior options for TwickEditor / TwickStudio.
 * Customers set these via editorConfig.canvasConfig or studioConfig.
 */
export interface CanvasConfig {
  /** When true, holding Shift while dragging restricts movement to horizontal or vertical (dominant axis). Default: false. */
  enableShiftAxisLock?: boolean;
  /** When true, element resize keeps aspect ratio (uniform scaling). Can be overridden per element via props. Default: true for media. */
  lockAspectRatio?: boolean;
}