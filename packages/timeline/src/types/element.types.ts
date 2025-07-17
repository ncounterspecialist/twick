export type TextEffect = {
  name: string;
  duration?: number;
  delay?: number;
  bufferTime?: number;
};

export type FrameEffect = {
  s: number;
  e: number;
  props: {
    shape?: "circle" | "rect";
    radius?: number;
    rotation?: number;
    framePosition?: {
      x: number;
      y: number;
    };
    frameSize?: [number, number];
  };
};

export type Animation = {
  name: string;
  interval?: number;
  intensity?: number;
  animate?: "enter" | "exit" | "both";
  mode?: "in" | "out";
  direction?: "up" | "down" | "left" | "right" | "center";
};

export type TimelineElement = {
  id: string;
  type: string;
  s: number;
  e: number;
  videoDuration?: number;
  timelineId: string;
  name: string;
  timelineType?: string;
  backgroundColor?: string;
  frameEffects?: FrameEffect[];
  animation?: Animation;
  textEffect?: TextEffect;
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
  frame?: {
    size?: [number, number];
    x?: number;
    y?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  };
};
