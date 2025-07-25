import { View2D } from "@revideo/2d";
import { Reference, ThreadGenerator, Vector2 } from "@revideo/core";

export type VideoInput = {
  backgroundColor: string;
  properties: {
    width: number;
    height: number;
  };
  tracks: VisualizerTrack[];
};

export type MediaType = "video" | "image";

export type ObjectFit = "contain" | "cover" | "fill" | "none";

export type SizeVector = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type SizeArray = [number, number];

export type Position = {
  x: number;
  y: number;
};

export type FrameEffect = {
  name: string;
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

export type Caption = {
  t: string;
  s: number;
  e: number;
  capStyle?: string;
  props?: CaptionProps;
};

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
  trackId?: string;
  frame?: any;
  props?: any;
  objectFit?: "contain" | "cover" | "fill";
  type?: string;
  s: number;
  e: number;
  backgroundColor?: string;
  animation?: AnimationProps;
  textEffect: TextEffectProps;
  frameEffects?: FrameEffect[];
  scale?: number;
  t?: string;
  hWords?: any;
};

export type VisualizerTrack = {
  id: string;
  type: string;
  elements: VisualizerElement[];
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

export type ElementParams = {
  view: View2D;
  containerRef: Reference<any>;
  element?: VisualizerElement;
  caption?: Caption;
  waitOnStart?: boolean;
};

export interface Element<Params = ElementParams> {
  name: string;
  create(params: Params): ThreadGenerator;
}

export type TextEffectParams = {
  elementRef: Reference<any>;
  interval?: number;
  duration?: number;
  bufferTime?: number;
  delay?: number;
  direction?: "left" | "right" | "center";
};

export type TextEffectProps = {
  name: string;
  interval?: number;
  duration?: number;
  bufferTime?: number;
  delay?: number;
  direction?: "left" | "right" | "center";
};

export interface TextEffect<Params = TextEffectParams> {
  name: string;
  run(params: Params): Generator;
}

export type AnimationParams = {
  elementRef: Reference<any>;
  containerRef?: Reference<any>;
  view: View2D;
  interval?: number;
  duration?: number;
  intensity?: number;
  mode?: "in" | "out";
  animate?: "enter" | "exit" | "both";
  direction?: "left" | "right" | "center" | "up" | "down";
};

export type AnimationProps = {
  name: string;
  interval?: number;
  duration?: number;
  intensity?: number;
  mode?: "in" | "out";
  animate?: "enter" | "exit" | "both";
  direction?: "left" | "right" | "center" | "up" | "down";
};

export interface Animation<Params = AnimationParams> {
  name: string;
  run(params: Params): ThreadGenerator;
}

export type FrameEffectParams = {
  elementRef: Reference<any>;
  containerRef?: Reference<any>;
  initFrameState: FrameState;
  frameEffect: FrameEffect;
};

export interface FrameEffectPlugin<Params = FrameEffectParams> {
  name: string;
  run(params: Params): ThreadGenerator;
}

export type FrameState = {
  frame: {
    size: Vector2;
    pos: Vector2;
    radius: number;
    scale: Vector2;
    rotation: number;
  };
  element: {
    size: Vector2;
    pos: Vector2;
    scale: Vector2;
  };
};
