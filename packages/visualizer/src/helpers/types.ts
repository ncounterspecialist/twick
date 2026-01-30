import { View2D } from "@twick/2d";
import { Reference, ThreadGenerator, Vector2 } from "@twick/core";

/**
 * Main input configuration for video visualization.
 * Contains player settings, background color, dimensions, and track definitions
 * for creating complete video visualizations.
 */
export type VideoInput = {
  playerId: string,
  backgroundColor: string;
  properties: {
    width: number;
    height: number;
  };
  tracks: VisualizerTrack[];
};

/**
 * Supported media types for visualizer elements.
 * Defines the types of media content that can be displayed.
 */
export type MediaType = "video" | "image";

/**
 * Object fit options for content scaling within containers.
 * Controls how content is sized and positioned within its container.
 */
export type ObjectFit = "contain" | "cover" | "fill" | "none";

/**
 * Two-dimensional size vector with x and y coordinates.
 * Used for representing width and height dimensions.
 */
export type SizeVector = {
  x: number;
  y: number;
};

/**
 * Size object with width and height properties.
 * Standard size representation for elements and containers.
 */
export type Size = {
  width: number;
  height: number;
};

/**
 * Size array with width and height values.
 * Alternative size representation as a tuple.
 */
export type SizeArray = [number, number];

/**
 * Position object with x and y coordinates.
 * Represents 2D positioning for elements in the scene.
 */
export type Position = {
  x: number;
  y: number;
};

/**
 * Frame effect configuration for visual masking.
 * Defines timing and properties for frame effects like circles and rectangles.
 */
export type FrameEffect = {
  name: string;
  s: number;
  e: number;
  props: FrameEffectProps;
};

/**
 * Properties for frame effect transformations.
 * Controls frame size, shape, position, and transition behavior.
 */
export type FrameEffectProps = {
  frameSize: SizeArray;
  frameShape: "circle" | "rect";
  framePosition: Position;
  radius: number;
  objectFit: ObjectFit;
  transitionDuration: number;
  transitionEasing?: string;
  elementPosition: Position;
};

/**
 * Styling configuration for caption elements.
 * Defines visual appearance of captions including layout and text styling.
 */
export type CaptionStyle = {
  rect: {
    alignItems?: string;
    gap?: number;
    justifyContent?: string;
    padding?: [number, number];
    radius?: number;
  };
  word: {
    lineWidth: number;
    stroke: string;
    fontWeight: number;
    shadowOffset?: number[];
    shadowColor?: string;
    shadowBlur?: number;
    fill: string;
    fontFamily: string;
    bgColor?: string;
    bgOffsetWidth?: number;
    bgOffsetHeight?: number;
    fontSize: number;
    strokeFirst?: boolean;
  };
};

/**
 * Caption element configuration.
 * Defines text content, timing, styling, and display properties for captions.
 */
export type Caption = {
  t: string;
  s: number;
  e: number;
  capStyle?: string;
  props?: CaptionProps;
};

/**
 * Caption styling properties.
 * Controls colors, fonts, background, and positioning for caption text.
 */
export type CaptionProps = {
  colors: CaptionColors;
  font: CaptionFont;
  bgOpacity?: number;
  bgOffsetWidth?: number;
  bgOffsetHeight?: number;
  bgMargin?: [number, number];
  bgRadius?: number;
  bgPadding?: [number, number];
  maxWidth?: number;
  x?: number;
  y?: number;
};

/**
 * Color configuration for caption text and backgrounds.
 * Defines text color, background color, and highlight colors.
 */
export type CaptionColors = {
  text?: string;
  bgColor?: string;
  highlight?: string;
};

/**
 * Font configuration for caption text.
 * Controls font family, size, weight, and style.
 */
export type CaptionFont = {
  family?: string;
  size?: number;
  weight?: number;
  style?: string;
};

/**
 * Visualizer element configuration.
 * Defines the structure and properties for all visual elements in the scene
 * including videos, images, text, and captions with their animations and effects.
 */
export type VisualizerElement = {
  id: string;
  trackId?: string;
  frame?: any;
  props?: any;
  objectFit?: "contain" | "cover" | "fill";
  type?: string;
  s: number;
  e: number;
  backgroundColor?: string;
  animation?: AnimationProps;
  textEffect: TextEffectProps;
  frameEffects?: FrameEffect[];
  scale?: number;
  t?: string;
  hWords?: any;
};

/**
 * Visualizer track configuration.
 * Contains a collection of elements that share common properties and timing.
 * Tracks organize elements into logical groups for better scene management.
 */
export type VisualizerTrack = {
  id: string;
  type: string;
  elements: VisualizerElement[];
  containerProps?: ContainerProps;
  props?: {
    capStyle?: string;
    bgOpacity?: number;
    x?: number;
    y?: number;
    colors?: {
      text?: string;
      background?: string;
      highlight?: string;
    };
    font?: {
      family?: string;
      size?: number;
      weight?: number;
      style?: string;
    };
    applyToAll?: boolean;
    captionProps?: CaptionProps;
  };
};

/**
 * Container properties for layout and positioning of elements.
 * Controls the layout and positioning of elements in the container.
 */
export type ContainerProps = {
  maxWidth?: number;
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
};

/**
 * Parameters for creating elements in the visualizer scene.
 * Contains all necessary references and configuration for element creation.
 */
export type ElementParams = {
  view: View2D;
  containerRef: Reference<any>;
  element?: VisualizerElement;
  caption?: Caption;
  waitOnStart?: boolean;
  containerProps?: ContainerProps;
};

/**
 * Interface for creating visual elements in the scene.
 * Defines the contract for all element types including video, image, text, and captions.
 */
export interface Element<Params = ElementParams> {
  /** The unique name identifier for this element type */
  name: string;
  /** Creates and manages the element in the scene */
  create(params: Params): ThreadGenerator;
}

/**
 * Parameters for text effect animations.
 * Controls timing and behavior of text animation effects.
 */
export type TextEffectParams = {
  elementRef: Reference<any>;
  interval?: number;
  duration?: number;
  bufferTime?: number;
  delay?: number;
  direction?: "left" | "right" | "center";
};

/**
 * Configuration properties for text effects.
 * Defines how text effects should behave and appear.
 */
export type TextEffectProps = {
  name: string;
  interval?: number;
  duration?: number;
  bufferTime?: number;
  delay?: number;
  direction?: "left" | "right" | "center";
};

/**
 * Interface for text effect animations.
 * Defines the contract for text animation effects like typewriter, stream word, etc.
 */
export interface TextEffect<Params = TextEffectParams> {
  /** The unique name identifier for this text effect */
  name: string;
  /** Executes the text effect animation */
  run(params: Params): Generator;
}

/**
 * Parameters for element animations.
 * Controls timing, direction, and behavior of element animations.
 */
export type AnimationParams = {
  elementRef: Reference<any>;
  containerRef?: Reference<any>;
  view: View2D;
  interval?: number;
  duration?: number;
  intensity?: number;
  mode?: "in" | "out";
  animate?: "enter" | "exit" | "both";
  direction?: "left" | "right" | "center" | "up" | "down";
};

/**
 * Configuration properties for animations.
 * Defines how animations should behave and appear.
 */
export type AnimationProps = {
  name: string;
  interval?: number;
  duration?: number;
  intensity?: number;
  mode?: "in" | "out";
  animate?: "enter" | "exit" | "both";
  direction?: "left" | "right" | "center" | "up" | "down";
};

/**
 * Interface for element animations.
 * Defines the contract for element animation effects like fade, rise, blur, etc.
 */
export interface Animation<Params = AnimationParams> {
  /** The unique name identifier for this animation */
  name: string;
  /** Executes the animation */
  run(params: Params): ThreadGenerator;
}

/**
 * Parameters for frame effects.
 * Controls frame transformations and visual masking effects.
 */
export type FrameEffectParams = {
  elementRef: Reference<any>;
  containerRef?: Reference<any>;
  initFrameState: FrameState;
  frameEffect: FrameEffect;
};

/**
 * Interface for frame effect plugins.
 * Defines the contract for frame effects like circular and rectangular masks.
 */
export interface FrameEffectPlugin<Params = FrameEffectParams> {
  /** The unique name identifier for this frame effect */
  name: string;
  /** Executes the frame effect */
  run(params: Params): ThreadGenerator;
}

/**
 * State information for frame and element transformations.
 * Contains size, position, and transformation data for frame effects.
 */
export type FrameState = {
  frame: {
    size: Vector2;
    pos: Vector2;
    radius: number;
    scale: Vector2;
    rotation: number;
  };
  element: {
    size: Vector2;
    pos: Vector2;
    scale: Vector2;
  };
};
