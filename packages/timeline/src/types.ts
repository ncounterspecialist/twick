// Basic Types
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Frame {
  x?: number;
  y?: number;
  rotation?: number;
  width?: number;
  height?: number;
  size?: [number, number]; // For image/video elements
}

/** Optional transition metadata on an element (e.g. crossfade to the next clip). */
export interface ElementTransitionJSON {
  toElementId: string;
  duration: number;
  kind: string;
}

// Element Types
export interface ElementJSON {
  id: string;
  type: string;
  s: number; // start time
  e: number; // end time
  t?: string; // text
  position?: Position;
  rotation?: number;
  opacity?: number;
  transition?: ElementTransitionJSON;
  metadata?: ElementMetadata;
  [key: string]: any; // Additional properties based on element type
}

export interface TrackJSON {
  id: string;
  name: string;
  type?: string; // Added for track serialization
  language?: string;
  props?: Record<string, any>;
  elements: ElementJSON[];
}

/**
 * Lightweight asset descriptor that can be embedded in ProjectJSON to make
 * projects more portable across environments.
 *
 * This mirrors the core fields of the editor MediaItem/MediaAsset type but
 * intentionally omits heavy or provider-specific details.
 */
export interface ProjectAssetJSON {
  /** Stable asset id used by timeline elements (e.g. video/image/audio). */
  id: string;
  /** Logical media type (video, audio, image). */
  type: string;
  /** Primary render URL for this asset. */
  url: string;
  /** Optional preview image URL (thumbnail/poster frame). */
  previewUrl?: string;
  /** Optional duration in milliseconds for audio/video assets. */
  duration?: number;
  /** Pixel dimensions for image/video assets (if known). */
  width?: number;
  height?: number;
  /**
   * Optional high-level source/origin hints.
   * These are advisory only; renderers should rely primarily on `url`.
   */
  source?: "user" | "public";
  origin?: string;
  /**
   * Provider attribution hints for public assets.
   * Useful for UI and export workflows that need to show credits.
   */
  attribution?: {
    text?: string;
    author?: string;
    authorUrl?: string;
    licenseUrl?: string;
  };
}

export interface ProjectJSON {
  watermark?: WatermarkJSON;
  backgroundColor?: string;
  metadata?: ProjectMetadata;
  /**
   * Optional portable asset manifest for this project.
   *
   * - Keys are assetIds referenced from element props (e.g. VideoProps.srcAssetId).
   * - Values are lightweight asset descriptors that allow projects to be moved
   *   between environments while still rendering correctly, even if the host
   *   does not have a separate asset library backing store.
   *
   * Renderers and editors SHOULD gracefully handle the case where this is
   * undefined (legacy projects) or partially populated.
   */
  assets?: Record<string, ProjectAssetJSON>;
  tracks: TrackJSON[];
  version: number;
}

export interface ChapterMarker {
  id: string;
  title: string;
  time: number;
  description?: string;
}

export interface ProjectMetadata {
  title?: string;
  description?: string;
  tags?: string[];
  templateId?: string;
  profile?: string;
  chapters?: ChapterMarker[];
  custom?: Record<string, unknown>;
}

export type ElementMetadata = Record<string, unknown>;

export interface WatermarkJSON {
  id: string;
  type: 'text' | 'image';
  position?: Position;
  rotation?: number;
  opacity?: number;
  props: TextProps | ImageProps;
}


// Props Types
export interface BaseMediaProps {
  src: string;
  time?: number;
  playbackRate?: number;
  volume?: number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export interface VideoProps extends BaseMediaProps {
  width?: number;
  height?: number;
  mediaFilter?: string;
  src: string;
  time?: number;
  playbackRate?: number;
  volume?: number;
}

export interface AudioProps extends BaseMediaProps {
  src: string;
  time?: number;
  playbackRate?: number;
  volume?: number;
  loop?: boolean;
}

export interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  objectFit?: ObjectFit;
  mediaFilter?: string;
}

export interface TextProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  stroke?: string;
  shadowColor?: string;
  shadowOffset?: number[];
  shadowBlur?: number;
  shadowOpacity?: number;
  strokeWidth?: number;
  textAlign?: TextAlign;
  backgroundColor?: string;
  backgroundOpacity?: number;
  fontWeight?: number;
  lineWidth?: number;
  rotation?: number;
  fontStyle?: string;
}

export interface RectProps {
  fill: string;
  width: number;
  height: number;
  radius: number;
  strokeColor?: string;
  lineWidth?: number;
}

export interface CircleProps {
  fill: string;
  radius: number;
  height: number;
  width: number;
  strokeColor?: string;
  lineWidth?: number;
}

export interface IconProps {
  fill: string;
  size?: number;
}

export interface ArrowProps {
  fill: string;
  width: number;
  height: number;
  lineWidth?: number;
}

export interface LineProps {
  /** Stroke/fill color for the line body */
  fill: string;
  /** Line length in pixels (mapped to width) */
  width: number;
  /** Line thickness in pixels (mapped to height) */
  height: number;
  /** Corner radius / rounded caps */
  radius?: number;
  /** Optional stroke width for outlines */
  lineWidth?: number;
}

// Effect Types
export interface TextEffect {
  duration: number;
  delay?: number;
  bufferTime?: number;
  name: string; // Added for text effect deserialization
}

export interface FrameEffectProps {
  frameSize: [number, number];
  framePosition: Position;
  radius?: number;
  transitionDuration?: number;
  objectFit?: ObjectFit;
}

export interface FrameEffect {
  s: number; // start time
  e: number; // end time
  props: FrameEffectProps;
}

export interface EffectProps {
  /**
   * Unique key identifying the effect in the GL effects catalog.
   * This should map to an EffectKey in @twick/effects.
   */
  effectKey: string;
  /**
   * Overall effect intensity, typically in the range [0, 1].
   * Renderers should clamp values into this range.
   */
  intensity?: number;
}

// Animation Types
export interface Animation {
  name: string;
  animate?: 'enter' | 'exit' | 'both';
  interval?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
  intensity?: number;
  mode?: 'in' | 'out';
  duration?: number;
}

// Utility Types
export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';