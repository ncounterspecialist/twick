export interface TimelineServiceConfig {
  videoSize: {
    width: number;
    height: number;
  };
  onTimelineUpdate?: (data: TimelineData) => void;
  onSelectionChange?: (item: TimelineElement | Timeline | null) => void;
  onOperationComplete?: (operation: string, data: any) => void;
}

export interface AddElementOptions {
  timelineId: string;
  type: string;
  props: ImageProps | VideoProps | AudioProps | TextProps | any;
  s: number;
  e?: number;
  name?: string;
}

export interface EditElementOptions {
  timelineId: string;
  elementId: string;
  updates: Partial<TimelineElement>;
  noSelection?: boolean;
}

export interface AddTimelineOptions {
  type: string;
  name: string;
  allowOverlap?: boolean;
  props?: any;
}

export interface AnimationOptions {
  timelineId: string;
  elementId: string;
  animation: Animation | null;
}

export interface TextEffectOptions {
  timelineId: string;
  elementId: string;
  textEffect: TextEffect | null;
}

export type TextEffect = {
  name: string;
  duration?: number;
  delay?: number;
  bufferTime?: number;
}

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
}

export type Animation = {
    name: string;
    interval?: number;
    intensity?: number;
    animate?: "enter" | "exit" | "both";
    mode?: "in" | "out";
    direction?: "up" | "down" | "left" | "right" | "center";
}

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
    };
    frame?: {
      size?: [number, number];
      x?: number;
      y?: number;
      fill?: string;
      stroke?: string;
      strokeWidth?: number;
    };
  }
  
  export type Colors = {
    text?: string;
    background?: string;
    highlight?: string;
  }
  
  export type Fonts = {
    family?: string;
    size?: number;
    weight?: number;
    style?: string;
  }

  export type Position = {
    x: number;
    y: number;
  }
  
  export type Timeline = {
    id: string;
    name: string;
    type: string;
    allowOverlap?: boolean;
    elements: TimelineElement[];
    props?: {
      capStyle?: string;
      font?: Fonts;
      wordsPerPhrase?: number;
      pos?: Position,
      colors?: Colors;
      hWords?: Record<string, any>;
    };
  }
  
  export type TimelineData = {
    timeline: Timeline[];
    version: number;
  }

  export interface Caption {
    t: string;
    s: number;
    e: number;
  }
  

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
    }
}

export type ImageProps = {
    src: string;
    width: number;
    height: number;
    x: number;
    y: number;
    objectFit: "contain" | "cover" | "fill";
};

export type VideoProps = {
    src: string;
    width: number;
    height: number;
    x: number;
    y: number;
    playbackRate?: number;
    volume?: number;
    objectFit: "contain" | "cover" | "fill";
};

export type TextProps = {
  text: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  fontStyle?: string;
  x?: number;
  y?: number;
  rotation?: number;
  fill?: string;
  textAlign?: "left" | "center" | "right";
  textWrap?: boolean;
};

export type AudioProps = {
  src: string;
  volume?: number;
  loop?: boolean;
  playbackRate?: number;
};

// TimelineService interfaces
export interface TimelineServiceConfig {
  videoSize: {
    width: number;
    height: number;
  };
  onTimelineUpdate?: (data: TimelineData) => void;
  onSelectionChange?: (item: TimelineElement | Timeline | null) => void;
  onOperationComplete?: (operation: string, data: any) => void;
}

export interface AddElementOptions {
  timelineId: string;
  type: string;
  props: ImageProps | VideoProps | AudioProps | TextProps | any;
  s: number;
  e?: number;
  name?: string;
}

export interface EditElementOptions {
  timelineId: string;
  elementId: string;
  updates: Partial<TimelineElement>;
  noSelection?: boolean;
}

export interface AddTimelineOptions {
  type: string;
  name: string;
  allowOverlap?: boolean;
  props?: any;
}

export interface AnimationOptions {
  timelineId: string;
  elementId: string;
  animation: Animation | null;
}