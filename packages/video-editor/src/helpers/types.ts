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

  export type Animation = {
    name: string;
    interval?: number;
    animate?: "enter" | "exit" | "both";
    mode?: "in" | "out";
    direction?: "up" | "down" | "left" | "right" | "center";
    options?: Record<string, any>;
    getSample: (animation?: Animation) => string;
};
