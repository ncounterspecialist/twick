export type Colors = {
  text?: string;
  background?: string;
  highlight?: string;
};

export type Fonts = {
  family?: string;
  size?: number;
  weight?: number;
  style?: string;
};

export type Position = {
  x: number;
  y: number;
};

export type TextEffect = {
  name: string;
  duration?: number;
  delay?: number;
  bufferTime?: number;
};

export type Size = {
  width: number;
  height: number;
};

export type SizeArray = [number, number];

export type Frame = {
  size?: [number, number];
  x?: number;
  y?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

export type FrameEffectProps = {
  frameSize: SizeArray;
  frameShape: "circle" | "rect";
  framePosition: Position;
  radius?: number;
  objectFit?: ObjectFit;
  transitionDuration?: number;
  transitionEasing?: string;
  elementPosition?: Position;
};
export type FrameEffect = {
  s: number;
  e: number;
  props: FrameEffectProps;
};

export type ObjectFit = "cover" | "contain" | "fill" | "none";

export type TextAlign = "left" | "center" | "right";

export type AudioProps = {
  src: string;
  play: boolean;
  volume?: number;
  loop?: boolean;
  playbackRate?: number;
  time?: number;
};

export type CaptionProps = {
  font?: {
    family?: string;
    size?: number;
    fill?: string;
  };
  pos?: {
    x: number;
    y: number;
  };
  color?: {
    text?: string;
    background?: string;
    highlight?: string;
  };
};

export type CircleProps = {
  radius: number;
  fill: string;
};

export type IconProps = {
  src: string;
  size: Size;
};

export type ImageProps = {
  src: string;
  mediaFilter?: string;
};

export type RectProps = {
  width: number;
  height: number;
  fill: string;
};

export type TextProps = {
  text: string;
  fill?: string;
  rotation?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  fontStyle?: "normal" | "italic";
  textAlign?: TextAlign;
};

export type VideoProps = {
  src: string;
  play: boolean;
  playbackRate?: number;
  time?: number;
  mediaFilter?: string;
  volume?: number;
};

export type Animation = {
  name: string;
  interval?: number;
  intensity?: number;
  animate?: "enter" | "exit" | "both";
  mode?: "in" | "out";
  direction?: "up" | "down" | "left" | "right" | "center";
};

export type ElementJSON = {
  id: string;
  type: string;
  s: number;
  e: number;
  t?: string;
  trackId: string;
  name: string;
  trackType?: string;
  backgroundColor?: string;
  frameEffects?: FrameEffect[];
  animation?: Animation;
  textEffect?: TextEffect;
  objectFit?: ObjectFit;
  mediaDuration?: number;
  props?: {
    playbackRate?: number;
    capStyle?: string;
    time?: number;
    videoFilter?: string;
    text?: string;
    src?: string;
    size?: [number, number];
    play?: boolean;
    mute?: boolean;
    hWords?: Record<string, any>;
    [key: string]: any;
  };
  frame?: Frame;
};

export type TrackJSON = {
  id: string;
  name: string;
  type: string;
  allowOverlap?: boolean;
  elements: ElementJSON[];
  props?: {
    capStyle?: string;
    font?: Fonts;
    wordsPerPhrase?: number;
    pos?: Position;
    colors?: Colors;
    hWords?: Record<string, any>;
  };
};

export type ProjectJSON = {
  tracks: TrackJSON[];
  version: number;
};
