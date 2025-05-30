import { Dimensions } from "@twick/media-utils";

declare module 'fabric' {
  interface FabricObject {
    zIndex?: number;
  }
} 

export type CanvasProps = {
    videoSize: Dimensions;
    canvasSize: Dimensions; 
    canvasRef: HTMLCanvasElement | string;
    backgroundColor?: string;
    selectionBorderColor?: string;
    selectionLineWidth?: number;
    uniScaleTransform?: boolean;
    enableRetinaScaling?: boolean;
    touchZoomThreshold?: number;
  };
  
export type CanvasMetadata = {
    width: number;
    height: number;
    aspectRatio: number;
    scaleX: number;
    scaleY: number;
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

export type CanvasElement = {
    id: string;
    name: string;
    type: string;
    props: CanvasElementProps;
    s?: number;
    e?: number;
    frameEffects?: FrameEffect[];
    timelineType?: string;
    backgoundColor?: string;
    objectFit?: "contain" | "cover" | "fill" | "none";
    frame?: {
        size?: [number, number];
        rotation?: number;
        scaleX?: number;
        scaleY?: number;
        stroke?: string;
        lineWidth?: number;
        radius?: number;
        x: number;
        y: number;
    };
}

export type CanvasElementProps = {
    src?: string;
    text?: string;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
    size?: [number, number];
    x?: number;
    y?: number;
    radius?: number;
    opacity?: number;
    width?: number;
    height?: number;
    pos?: {
        x: number;
        y: number;
    };
    shadow?: {
        color: string;
        blur: number;
        offsetX: number;
        offsetY?: number;
    };
    font?: {
        family?: string;
        size?: number;
        style?: string;
        weight?: string;
    },
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    lineWidth?: number;
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffset?: [number, number];
    playbackRate?: number;
    time?: number;
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
