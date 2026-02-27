import { CaptionStyle } from "./types";

/**
 * Constants used throughout the visualizer package.
 * Contains default values, configuration options, and type definitions.
 */

/**
 * Default background color for scenes
 */
export const DEFAULT_BACKGROUND_COLOR = "#000000";

/**
 * Default position for elements
 */
export const DEFAULT_POSITION = {
  x: 0,
  y: 0,
};

/**
 * Default timing function for animations
 */
export const DEFAULT_TIMING_FUNCTION = "easeInOut";

/**
 * Available frame shapes for elements
 */
export const FRAME_SHAPE = {
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  LINE: "line",
} as const;

/**
 * Timeline types for different media elements
 */
export const TRACK_TYPES = {
  VIDEO: "video",
  AUDIO: "audio",
  CAPTION: "caption",
  SCENE: "scene",
  ELEMENT: "element",
  EFFECT: "effect",
} as const;

export const CAPTION_STYLE: Record<string, CaptionStyle> = {
  highlight_bg: {
    rect: {
      alignItems: "center",
      gap: 2,
    },
    word: {
      lineWidth: 0.35,
      stroke: "#000000",
      fontWeight: 700,
      shadowOffset: [-3, 3],
      shadowColor: "#000000",
      fill: "#ffffff",
      fontFamily: "Bangers",
      bgColor: "#444444",
      bgOffsetWidth: 30,
      bgOffsetHeight: 8,
      fontSize: 46,
    },
  },
  word_by_word: {
    rect: {
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    word: {
      lineWidth: 0.35,
      stroke: "#000000",
      fontWeight: 700,
      strokeFirst: true,
      shadowOffset: [-2, 2],
      shadowColor: "#000000",
      shadowBlur: 5,
      fontFamily: "Bangers",
      fill: "#FFFFFF",
      bgOffsetWidth: 20,
      bgOffsetHeight: 10,
      fontSize: 46,
    },
  },
  word_by_word_with_bg: {
    rect: {
      alignItems: "center",
      gap: 8,
      padding: [10, 20],
      radius: 10,
    },
    word: {
      lineWidth: 0.35,
      stroke: "#000000",
      fontWeight: 700,
      strokeFirst: true,
      shadowOffset: [-2, 2],
      shadowColor: "#000000",
      shadowBlur: 5,
      fontFamily: "Bangers",
      fill: "#FFFFFF",
      bgOffsetWidth: 20,
      bgOffsetHeight: 10,
      fontSize: 46,
    },
  },
  outline_only: {
    rect: {
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    word: {
      lineWidth: 0.5,
      stroke: "#000000",
      fontWeight: 600,
      strokeFirst: true,
      shadowOffset: [0, 0],
      shadowBlur: 0,
      fontFamily: "Arial",
      fill: "#FFFFFF",
      fontSize: 42,
    },
  },
  soft_box: {
    rect: {
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: [12, 24],
      radius: 12,
    },
    word: {
      lineWidth: 0.2,
      stroke: "#000000",
      fontWeight: 600,
      strokeFirst: true,
      shadowOffset: [-1, 1],
      shadowColor: "rgba(0,0,0,0.3)",
      shadowBlur: 3,
      fontFamily: "Montserrat",
      fill: "#FFFFFF",
      fontSize: 40,
    },
  },
  lower_third: {
    rect: {
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: [14, 32],
      radius: 0,
    },
    word: {
      lineWidth: 0.2,
      stroke: "#000000",
      fontWeight: 600,
      strokeFirst: true,
      shadowOffset: [0, 1],
      shadowColor: "rgba(0,0,0,0.5)",
      shadowBlur: 2,
      fontFamily: "Arial",
      fill: "#FFFFFF",
      fontSize: 38,
    },
  },
  typewriter: {
    rect: {
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    word: {
      lineWidth: 0.3,
      stroke: "#000000",
      fontWeight: 600,
      strokeFirst: true,
      shadowOffset: [0, 0],
      shadowBlur: 0,
      fontFamily: "Monaco",
      fill: "#FFFFFF",
      fontSize: 40,
    },
  },
  karaoke: {
    rect: {
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    word: {
      lineWidth: 0.35,
      stroke: "#000000",
      fontWeight: 700,
      strokeFirst: true,
      shadowOffset: [-2, 2],
      shadowColor: "#000000",
      shadowBlur: 4,
      fontFamily: "Bangers",
      fill: "#FFFFFF",
      fontSize: 46,
    },
  },
  pop_scale: {
    rect: {
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    word: {
      lineWidth: 0.35,
      stroke: "#000000",
      fontWeight: 700,
      strokeFirst: true,
      shadowOffset: [-2, 2],
      shadowColor: "#000000",
      shadowBlur: 5,
      fontFamily: "Bangers",
      fill: "#FFFFFF",
      fontSize: 46,
    },
  },
};

export const DEFAULT_CAPTION_COLORS = {
  text: "#000000",
  bgColor: "#444444",
};

export const DEFAULT_CAPTION_FONT = {
  family: "Bangers",
  size: 46,
  weight: 700,
};

export const TRANSPARENT_COLOR = "#FFFFFF00";

export const ELEMENT_TYPES = {
  VIDEO: "video",
  IMAGE: "image",
  AUDIO: "audio",
  TEXT: "text",
  CAPTION: "caption",
  RECT: "rect",
  CIRCLE: "circle",
  ICON: "icon",
};

export const OBJECT_FIT = {
  CONTAIN: "contain",
  COVER: "cover",
  FILL: "fill",
  NONE: "none",
};

export const COLOR_FILTERS = {
  SATURATED: "saturated",
  BRIGHT: "bright",
  VIBRANT: "vibrant",
  RETRO: "retro",
  BLACK_WHITE: "blackWhite",
  SEPIA: "sepia",
  COOL: "cool",
  WARM: "warm",
  CINEMATIC: "cinematic",
  SOFT_GLOW: "softGlow",
  MOODY: "moody",
  DREAMY: "dreamy",
  INVERTED: "inverted",
  VINTAGE: "vintage",
  DRAMATIC: "dramatic",
  FADED: "faded",
};

export const EVENT_TYPES = {
  PLAYER_UPDATE: "twick:playerUpdate",
};
