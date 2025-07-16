import { TimelineElement } from "./element.types";

// Re-export TimelineElement for convenience  
export type { TimelineElement };

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