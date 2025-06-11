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
