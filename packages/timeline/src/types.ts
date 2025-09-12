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
  x: number;
  y: number;
  width?: number;
  height?: number;
  size?: [number, number]; // For image/video elements
}

// Element Types
export interface ElementJSON {
  id: string;
  type: string;
  s: number; // start time
  e: number; // end time
  position?: Position;
  rotation?: number;
  opacity?: number;
  [key: string]: any; // Additional properties based on element type
}

export interface TrackJSON {
  id: string;
  name: string;
  type?: string; // Added for track serialization
  elements: ElementJSON[];
}

export interface ProjectJSON {
  tracks: TrackJSON[];
  version: number;
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
  strokeWidth?: number;
  textAlign?: TextAlign;
  fontWeight?: number | string;
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
  strokeColor?: string;
  lineWidth?: number;
}

export interface IconProps {
  fill: string;
  size?: number;
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