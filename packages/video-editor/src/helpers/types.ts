export type MediaItem = {
    id: string;
    type: 'image' | 'video' | 'audio';
    url: string;
    arrayBuffer?: ArrayBuffer;
    thumbnail?: string;
    metadata?: Record<string, any>;
  }
  
  export type PaginationOptions = {
    page: number;
    limit: number;
  }
  
  export type SearchOptions = {
    query: string;
    type?: 'image' | 'video' | 'audio';
    metadata?: Record<string, any>;
  }

  export type TextEffect = {
    name: string;
    delay?: number;
    bufferTime?: number;
    getSample: (textEffect?: TextEffect) => string;
  }
  export type Animation = {
    name: string;
    interval?: number;
    animate?: "enter" | "exit" | "both";
    mode?: "in" | "out";
    direction?: "up" | "down" | "left" | "right" | "center";
    options?: {
      animate?: string[];
      direction?: string[];
      mode?: string[];
    };
    getSample: (animation?: Animation) => string;
};


export interface ElementColors {
  fragment: string;
  video: string;
  caption: string;
  image: string;
  audio: string;
  text: string;
  element: string;
  rect: string;
  frameEffect: string;
  filters: string;
  transition: string;
  animation: string;
}