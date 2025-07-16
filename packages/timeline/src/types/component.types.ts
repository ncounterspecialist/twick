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