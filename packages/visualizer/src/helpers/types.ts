/**
 * Type definitions for the visualizer package.
 * Contains interfaces and types for video, audio, captions, and other visual elements.
 */

/**
 * Base interface for timeline elements
 */
export interface TimelineBase {
  type: string;
  startTime: number;
  duration: number;
}

/**
 * Video timeline configuration
 */
export interface VideoTimeline extends TimelineBase {
  type: "video";
  url: string;
  position?: Position;
  size?: Size;
  effects?: FrameEffect[];
}

/**
 * Audio timeline configuration
 */
export interface AudioTimeline extends TimelineBase {
  type: "audio";
  url: string;
  volume?: number;
}

/**
 * Caption timeline configuration
 */
export interface CaptionTimeline extends TimelineBase {
  type: "caption";
  text: string;
  position?: Position;
  style?: TextStyle;
}

/**
 * Scene timeline configuration
 */
export interface SceneTimeline extends TimelineBase {
  type: "scene";
  backgroundColor?: string;
  elements?: ElementProperties[];
}

/**
 * Element timeline configuration
 */
export interface ElementTimeline extends TimelineBase {
  type: "element";
  properties: ElementProperties;
}

export type VideoInput = {
  backgroundColor: string;
  properties: {
    width: number;
    height: number;
  };
  timeline: VisualizerTimeline[];
};

export type MediaType = "video" | "image";

export type ObjectFit = "contain" | "cover" | "fill" | "none";

export type SizeVector = {
  x: number;
  y: number;
};

export type SizeArray = [number, number];

export type Position = {
  x: number;
  y: number;
};

export type FrameEffect = {
  s: number;
  e: number;
  props: FrameEffectProps;
};


export type FrameEffectProps = {
  frameSize: SizeArray;
  frameShape: "circle" | "rect";
  framePosition: Position;
  radius: number;
  objectFit: ObjectFit;
  transitionDuration: number;
  transitionEasing?: string;
  elementPosition: Position;
};

export type CaptionStyle = {
  rect: {
    alignItems?: string;
    gap?: number;
    justifyContent?: string;
    padding?: [number, number];
    radius?: number;
  };
  word: {
    lineWidth: number;
    stroke: string;
    fontWeight: number;
    shadowOffset?: number[];
    shadowColor?: string;
    shadowBlur?: number;
    fill: string;
    fontFamily: string;
    bgColor?: string;
    bgOffsetWidth?: number;
    bgOffsetHeight?: number;
    fontSize: number;
    strokeFirst?: boolean;
  };
};

export interface Caption {
  t: string;
  s: number;
  e: number;
  props?: CaptionProps;
}

export type CaptionProps = {
  colors: CaptionColors;
  font: CaptionFont;
  bgOpacity?: number;
  bgOffsetWidth?: number;
  bgOffsetHeight?: number;
  bgMargin?: [number, number];
  bgRadius?: number;
  bgPadding?: [number, number];
  x?: number;
  y?: number;
};

export type CaptionColors = {
  text?: string;
  background?: string;
  highlight?: string;
};

export type CaptionFont = {
  family?: string;
  size?: number;
  weight?: number;
  style?: string;
};

export type VisualizerElement = {
  id: string;
  frame?: any;
  props?: any;
  objectFit?: 'contain' | 'cover' | 'fill';
  type?: string;
  s: number;
  e: number;
  backgroundColor?: string;
  elements?: VisualizerElement[];
  animations?: any[];
  scale?: number;
  t?: string;
  hWords?: any;
};

export type VisualizerTimeline = {
  id: string;
  type: string;
  elements: VisualizerElement[];
  captions?: Caption[];
  props?: {
    capStyle?: string;
    bgOpacity?: number;
    x?: number;
    y?: number;
    colors?: {
      text?: string;
      background?: string;
      highlight?: string;
    };
    font?: {
      family?: string;
      size?: number;
      weight?: number;
      style?: string;
    };
    captionProps?: CaptionProps;
  };
};
