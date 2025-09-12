export interface Animation {
  name: string;
  interval?: number;
  duration?: number;
  intensity?: number;
  animate?: "enter" | "exit" | "both";
  mode?: "in" | "out";
  direction?: "up" | "down" | "left" | "right" | "center";
  options: {
    animate?: ("enter" | "exit" | "both")[];
    mode?: ("in" | "out")[];
    direction?: ("left" | "right" | "center" | "up" | "down")[];
    intensity?: [number, number];
    interval?: [number, number];
    duration?: [number, number];
  };
  getSample: (animation?: Animation) => string;
}

export interface TextEffect {
  name: string;
  duration: number;
  delay?: number;
  bufferTime?: number;
  getSample?: () => string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  width?: number;
  height?: number;
  metadata?: {
    title?: string;
    [key: string]: any;
  };
  arrayBuffer?: ArrayBuffer;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SearchOptions {
  query?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  metadata?: {
    [key: string]: any;
  };
}

export interface ElementColors {
  video: string;
  audio: string;
  image: string;
  text: string;
  caption: string;
  icon: string;
  circle: string;
  rect: string;
  element: string;
  fragment: string;
  frameEffect: string;
  filters: string;
  transition: string;
  animation: string;
}