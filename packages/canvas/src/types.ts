import { Dimensions } from "@twick/media-utils";

declare module "fabric" {
  interface FabricObject {
    zIndex?: number;
  }
}

/**
 * Configuration properties for creating and initializing a canvas.
 * Defines the video and canvas dimensions, styling options, and interaction settings.
 *
 * @example
 * ```js
 * const canvasProps: CanvasProps = {
 *   videoSize: { width: 1920, height: 1080 },
 *   canvasSize: { width: 800, height: 600 },
 *   canvasRef: canvasElement,
 *   backgroundColor: "#000000",
 *   selectionBorderColor: "#2563eb",
 *   selectionLineWidth: 2,
 *   uniScaleTransform: true,
 *   enableRetinaScaling: true,
 *   touchZoomThreshold: 10
 * };
 * ```
 */
export type CanvasProps = {
  /** Dimensions of the video content */
  videoSize: Dimensions;
  /** Dimensions of the canvas element */
  canvasSize: Dimensions;
  /** Reference to the HTML canvas element or selector string */
  canvasRef: HTMLCanvasElement | string;
  /** Background color of the canvas */
  backgroundColor?: string;
  /** Border color for selected objects */
  selectionBorderColor?: string;
  /** Width of the selection border */
  selectionLineWidth?: number;
  /** Ensures uniform scaling of objects */
  uniScaleTransform?: boolean;
  /** Enables retina scaling for higher DPI displays */
  enableRetinaScaling?: boolean;
  /** Threshold for touch zoom interactions */
  touchZoomThreshold?: number;
};

/**
 * Metadata about the canvas including dimensions and scaling factors.
 * Contains calculated values for coordinate transformations between video and canvas spaces.
 *
 * @example
 * ```js
 * const metadata: CanvasMetadata = {
 *   width: 800,
 *   height: 600,
 *   aspectRatio: 1.33,
 *   scaleX: 0.416,
 *   scaleY: 0.556
 * };
 * ```
 */
export type CanvasMetadata = {
  /** Width of the canvas in pixels */
  width: number;
  /** Height of the canvas in pixels */
  height: number;
  /** Aspect ratio of the canvas (width / height) */
  aspectRatio: number;
  /** Horizontal scaling factor from video to canvas */
  scaleX: number;
  /** Vertical scaling factor from video to canvas */
  scaleY: number;
};

/**
 * Frame effect configuration for canvas elements.
 * Defines visual effects that can be applied to elements during specific time ranges.
 *
 * @example
 * ```js
 * const frameEffect: FrameEffect = {
 *   s: 0,
 *   e: 5,
 *   props: {
 *     shape: "circle",
 *     radius: 50,
 *     rotation: 45,
 *     framePosition: { x: 100, y: 100 },
 *     frameSize: [200, 200]
 *   }
 * };
 * ```
 */
export type FrameEffect = {
  /** Start time of the effect in seconds */
  s: number;
  /** End time of the effect in seconds */
  e: number;
  /** Effect properties and configuration */
  props: {
    /** Shape type for the frame effect */
    shape?: "circle" | "rect";
    /** Radius for circular effects */
    radius?: number;
    /** Rotation angle in degrees */
    rotation?: number;
    /** Position of the frame effect */
    framePosition?: {
      /** X coordinate */
      x: number;
      /** Y coordinate */
      y: number;
    };
    /** Size of the frame effect [width, height] */
    frameSize?: [number, number];
  };
};

/**
 * Canvas element configuration for various element types.
 * Defines the structure for text, image, video, and other elements on the canvas.
 *
 * @example
 * ```js
 * const canvasElement: CanvasElement = {
 *   id: "element-1",
 *   type: "text",
 *   props: {
 *     text: "Hello World",
 *     x: 100,
 *     y: 100,
 *     fontSize: 48
 *   },
 *   s: 0,
 *   e: 10,
 *   frameEffects: [frameEffect]
 * };
 * ```
 */
export type CanvasElement = {
  /** Unique identifier for the element */
  id: string;
  /** Type of element (text, image, video, etc.) */
  type: string;
  /** Element properties and styling */
  props: CanvasElementProps;
  /** Start time of the element in seconds */
  s?: number;
  /** End time of the element in seconds */
  e?: number;
  /** Text content for text elements */
  t?: string;
  /** Array of frame effects applied to the element */
  frameEffects?: FrameEffect[];
  /** Type of timeline element */
  timelineType?: string;
  /** Background color for the element */
  backgoundColor?: string;
  /** Object fit mode for media elements */
  objectFit?: "contain" | "cover" | "fill" | "none";
  /** Frame configuration for the element */
  frame?: {
    /** Size of the frame [width, height] */
    size?: [number, number];
    /** Rotation angle in degrees */
    rotation?: number;
    /** Horizontal scale factor */
    scaleX?: number;
    /** Vertical scale factor */
    scaleY?: number;
    /** Stroke color */
    stroke?: string;
    /** Stroke line width */
    lineWidth?: number;
    /** Corner radius for rounded rectangles */
    radius?: number;
    /** X coordinate */
    x: number;
    /** Y coordinate */
    y: number;
  };
};

/**
 * Properties for canvas elements including styling, positioning, and media attributes.
 * Comprehensive type definition covering all possible element properties.
 *
 * @example
 * ```js
 * const elementProps: CanvasElementProps = {
 *   src: "image.jpg",
 *   text: "Sample Text",
 *   x: 100,
 *   y: 100,
 *   rotation: 45,
 *   scaleX: 1.5,
 *   scaleY: 1.5,
 *   opacity: 0.8,
 *   fontSize: 48,
 *   fontFamily: "Arial",
 *   fill: "#FFFFFF",
 *   stroke: "#000000"
 * };
 * ```
 */
export type CanvasElementProps = {
  /** Source URL for media elements */
  src?: string;
  /** Text content for text elements */
  text?: string;
  /** Rotation angle in degrees */
  rotation?: number;
  /** Horizontal scale factor */
  scaleX?: number;
  /** Vertical scale factor */
  scaleY?: number;
  /** Size array [width, height] */
  size?: [number, number];
  /** X coordinate position */
  x?: number;
  /** Y coordinate position */
  y?: number;
  /** Corner radius for rounded shapes */
  radius?: number;
  /** Opacity value (0-1) */
  opacity?: number;
  /** Width in pixels */
  width?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Height in pixels */
  height?: number;
  /** Whether text should wrap */
  textWrap?: boolean;
  /** Text alignment */
  textAlign?: "left" | "center" | "right";
  /** Position object with x, y coordinates */
  pos?: {
    /** X coordinate */
    x: number;
    /** Y coordinate */
    y: number;
  };
  /** Shadow configuration */
  shadow?: {
    /** Shadow color */
    color: string;
    /** Shadow blur radius */
    blur: number;
    /** Shadow X offset */
    offsetX: number;
    /** Shadow Y offset */
    offsetY?: number;
  };
  /** Font configuration object */
  font?: {
    /** Font family */
    family?: string;
    /** Font size in pixels */
    size?: number;
    /** Font style */
    style?: string;
    /** Font weight */
    weight?: string;
  };
  /** Font family name */
  fontFamily?: string;
  /** Font size in pixels */
  fontSize?: number;
  /** Font style (normal, italic, etc.) */
  fontStyle?: string;
  /** Font weight (normal, bold, etc.) */
  fontWeight?: string;
  /** Fill color */
  fill?: string;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Line width for strokes */
  lineWidth?: number;
  /** Shadow color */
  shadowColor?: string;
  /** Shadow blur radius */
  shadowBlur?: number;
  /** Shadow offset [x, y] */
  shadowOffset?: [number, number];
  /** Playback rate for video elements */
  playbackRate?: number;
  /** Current time for video elements */
  time?: number;
};

/**
 * Properties specific to caption elements.
 * Defines styling and positioning for caption text with background and highlight options.
 *
 * @example
 * ```js
 * const captionProps: CaptionProps = {
 *   font: {
 *     family: "Arial",
 *     size: 48,
 *     fill: "#FFFFFF"
 *   },
 *   pos: {
 *     x: 100,
 *     y: 100
 *   },
 *   color: {
 *     text: "#FFFFFF",
 *     background: "#000000",
 *     highlight: "#FFFF00"
 *   }
 * };
 * ```
 */
export type CaptionProps = {
  /** Font configuration for caption text */
  font?: {
    /** Font family */
    family?: string;
    /** Font size in pixels */
    size?: number;
    /** Text fill color */
    fill?: string;
    /** Font weight */
    weight?: string;
    /** Font style */
    style?: string;
  };
  /** Opacity value (0-1) */
  opacity?: number;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  lineWidth?: number;
  /** Shadow color */
  shadowColor?: string;
  /** Shadow blur radius */
  shadowBlur?: number;
  /** Shadow offset [x, y] */
  shadowOffset?: [number, number];
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Color configuration for caption styling */
  color?: {
    /** Text color */
    text?: string;
    /** Background color */
    background?: string;
    /** Highlight color */
    highlight?: string;
  };
  applyToAll?: boolean;
};
