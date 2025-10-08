import { ElementColors } from "./types";
import { TimelineTickConfig } from "../components/video-editor";

/**
 * Initial timeline data structure for new video editor projects.
 * Provides a default timeline with a sample text element to get started.
 * 
 * @example
 * ```js
 * import { INITIAL_TIMELINE_DATA } from '@twick/video-editor';
 * 
 * // Use as starting point for new projects
 * const newProject = {
 *   ...INITIAL_TIMELINE_DATA,
 *   tracks: [...INITIAL_TIMELINE_DATA.tracks, newTrack]
 * };
 * ```
 */
export const INITIAL_TIMELINE_DATA = {
  tracks: [
    {
      type: "element",
      id: "t-sample",
      name: "sample",
      elements: [
        {
          id: "e-sample",
          trackId: "t-sample",
          name: "sample",
          type: "text",
          s: 0,
          e: 5,
          props: {
            text: "Twick Video Editor",
            fill: "#FFFFFF",
          },
        },
      ],
    },
  ],
  version: 1,
};

/**
 * Minimum duration for timeline elements in seconds.
 * Used to prevent elements from having zero or negative duration.
 * 
 * @example
 * ```js
 * import { MIN_DURATION } from '@twick/video-editor';
 * 
 * const elementDuration = Math.max(duration, MIN_DURATION);
 * // Ensures element has at least 0.1 seconds duration
 * ```
 */
export const MIN_DURATION = 0.1;

/**
 * Drag operation types for timeline interactions.
 * Defines the different phases of drag operations on timeline elements.
 * 
 * @example
 * ```js
 * import { DRAG_TYPE } from '@twick/video-editor';
 * 
 * function handleDrag(type) {
 *   switch (type) {
 *     case DRAG_TYPE.START:
 *       // Handle drag start
 *       break;
 *     case DRAG_TYPE.MOVE:
 *       // Handle drag move
 *       break;
 *     case DRAG_TYPE.END:
 *       // Handle drag end
 *       break;
 *   }
 * }
 * ```
 */
export const DRAG_TYPE = {
  /** Drag operation is starting */
  START: "start",
  /** Drag operation is in progress */
  MOVE: "move",
  /** Drag operation has ended */
  END: "end",
} as const;

/**
 * Default zoom level for timeline view.
 * Controls the initial magnification of the timeline interface.
 * 
 * @example
 * ```js
 * import { DEFAULT_TIMELINE_ZOOM } from '@twick/video-editor';
 * 
 * const [zoom, setZoom] = useState(DEFAULT_TIMELINE_ZOOM);
 * // Timeline starts with 1.5x zoom
 * ```
 */
export const DEFAULT_TIMELINE_ZOOM = 1.5;

/**
 * Default timeline zoom configuration including min, max, step, and default values.
 * Controls the zoom behavior and constraints for the timeline view.
 * 
 * @example
 * ```js
 * import { DEFAULT_TIMELINE_ZOOM_CONFIG } from '@twick/video-editor';
 * 
 * // Use default zoom configuration
 * <VideoEditor
 *   editorConfig={{
 *     videoProps: { width: 1920, height: 1080 },
 *     timelineZoomConfig: DEFAULT_TIMELINE_ZOOM_CONFIG
 *   }}
 * />
 * ```
 */
export const DEFAULT_TIMELINE_ZOOM_CONFIG = {
  /** Minimum zoom level (10%) */
  min: 0.1,
  /** Maximum zoom level (300%) */
  max: 3.0,
  /** Zoom step increment/decrement (10%) */
  step: 0.1,
  /** Default zoom level (150%) */
  default: 1.5
};

/**
 * Default timeline tick configurations for different duration ranges.
 * Defines major tick intervals and number of minor ticks between majors
 * to provide optimal timeline readability at various durations.
 * 
 * Each configuration applies when the duration is less than the specified threshold.
 * Configurations are ordered by duration threshold ascending.
 * 
 * @example
 * ```js
 * import { DEFAULT_TIMELINE_TICK_CONFIGS } from '@twick/video-editor';
 * 
 * // Use default configurations
 * <VideoEditor
 *   editorConfig={{
 *     videoProps: { width: 1920, height: 1080 },
 *     timelineTickConfigs: DEFAULT_TIMELINE_TICK_CONFIGS
 *   }}
 * />
 * ```
 */
export const DEFAULT_TIMELINE_TICK_CONFIGS: TimelineTickConfig[] = [
  {
    durationThreshold: 10, // < 10 seconds
    majorInterval: 1,      // 1s major ticks
    minorTicks: 10         // 0.1s minor ticks (10 minors between majors)
  },
  {
    durationThreshold: 30, // < 30 seconds
    majorInterval: 5,      // 5s major ticks
    minorTicks: 5          // 1s minor ticks (5 minors between majors)
  },
  {
    durationThreshold: 120, // < 2 minutes
    majorInterval: 10,      // 10s major ticks
    minorTicks: 5           // 2s minor ticks (5 minors between majors)
  },
  {
    durationThreshold: 300, // < 5 minutes
    majorInterval: 30,      // 30s major ticks
    minorTicks: 6           // 5s minor ticks (6 minors between majors)
  },
  {
    durationThreshold: 900, // < 15 minutes
    majorInterval: 60,      // 1m major ticks
    minorTicks: 6           // 10s minor ticks (6 minors between majors)
  },
  {
    durationThreshold: 1800, // < 30 minutes
    majorInterval: 120,      // 2m major ticks
    minorTicks: 4            // 30s minor ticks (4 minors between majors)
  },
  {
    durationThreshold: 3600, // < 1 hour
    majorInterval: 300,      // 5m major ticks
    minorTicks: 5            // 1m minor ticks (5 minors between majors)
  },
  {
    durationThreshold: 7200, // < 2 hours
    majorInterval: 600,      // 10m major ticks
    minorTicks: 10           // 1m minor ticks (10 minors between majors)
  },
  {
    durationThreshold: Infinity, // >= 2 hours
    majorInterval: 1800,         // 30m major ticks
    minorTicks: 6                // 5m minor ticks (6 minors between majors)
  }
];

/**
 * Default color scheme for different element types in the timeline.
 * Provides consistent visual distinction between various timeline elements.
 * 
 * @example
 * ```js
 * import { DEFAULT_ELEMENT_COLORS } from '@twick/video-editor';
 * 
 * const videoColor = DEFAULT_ELEMENT_COLORS.video; // "#4B2E83"
 * const textColor = DEFAULT_ELEMENT_COLORS.text;   // "#375A7F"
 * 
 * // Apply colors to timeline elements
 * element.style.backgroundColor = DEFAULT_ELEMENT_COLORS[element.type];
 * ```
 */
export const DEFAULT_ELEMENT_COLORS: ElementColors = {
    /** Fragment element color - deep charcoal matching UI background */
    fragment: "#1A1A1A",
    /** Video element color - vibrant royal purple */
    video: "#8B5FBF",
    /** Caption element color - soft wisteria purple */
    caption: "#9B8ACE",
    /** Image element color - warm copper accent */
    image: "#D4956C",
    /** Audio element color - deep teal */
    audio: "#3D8B8B",
    /** Text element color - medium lavender */
    text: "#8D74C4",
    /** Generic element color - muted amethyst */
    element: "#7B68B8",
    /** Rectangle element color - deep indigo */
    rect: "#5B4B99",
    /** Frame effect color - rich magenta */
    frameEffect: "#B55B9C",
    /** Filters color - periwinkle blue */
    filters: "#7A89D4",
    /** Transition color - burnished bronze */
    transition: "#BE8157",
    /** Animation color - muted emerald */
    animation: "#4B9B78",
    /** Icon element color - bright orchid */
    icon: "#A76CD4",
    /** Circle element color - deep byzantium */
    circle: "#703D8B",
  };
/**
 * Available text fonts for video editor text elements.
 * Includes Google Fonts, display fonts, and custom CDN fonts.
 * 
 * @example
 * ```js
 * import { AVAILABLE_TEXT_FONTS } from '@twick/video-editor';
 * 
 * // Use Google Fonts
 * const googleFont = AVAILABLE_TEXT_FONTS.ROBOTO; // "Roboto"
 * 
 * // Use decorative fonts
 * const decorativeFont = AVAILABLE_TEXT_FONTS.BANGERS; // "Bangers"
 * 
 * // Apply font to text element
 * textElement.style.fontFamily = AVAILABLE_TEXT_FONTS.POPPINS;
 * ```
 */
export const AVAILABLE_TEXT_FONTS = {
  // Google Fonts
  /** Modern sans-serif font */
  RUBIK: "Rubik",
  /** Clean and readable font */
  MULISH: "Mulish",
  /** Bold display font */
  LUCKIEST_GUY: "Luckiest Guy",
  /** Elegant serif font */
  PLAYFAIR_DISPLAY: "Playfair Display",
  /** Classic sans-serif font */
  ROBOTO: "Roboto",
  /** Modern geometric font */
  POPPINS: "Poppins",
  // Display and Decorative Fonts
  /** Comic-style display font */
  BANGERS: "Bangers",
  /** Handwritten-style font */
  BIRTHSTONE: "Birthstone",
  /** Elegant script font */
  CORINTHIA: "Corinthia",
  /** Formal script font */
  IMPERIAL_SCRIPT: "Imperial Script",
  /** Bold outline font */
  KUMAR_ONE_OUTLINE: "Kumar One Outline",
  /** Light outline font */
  LONDRI_OUTLINE: "Londrina Outline",
  /** Casual script font */
  MARCK_SCRIPT: "Marck Script",
  /** Modern sans-serif font */
  MONTSERRAT: "Montserrat",
  /** Stylish display font */
  PATTAYA: "Pattaya",
  // CDN Fonts
  /** Unique display font */
  PERALTA: "Peralta",
  /** Bold impact font */
  IMPACT: "Impact",
  /** Handwritten-style font */
  LUMANOSIMO: "Lumanosimo",
  /** Custom display font */
  KAPAKANA: "Kapakana",
  /** Handwritten font */
  HANDYRUSH: "HandyRush",
  /** Decorative font */
  DASHER: "Dasher",
  /** Signature-style font */
  BRITTANY_SIGNATURE: "Brittany Signature"
} as const;