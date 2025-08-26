import { ElementColors } from "./types";

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
  /** Fragment element color */
  fragment: "#111111",
  /** Video element color - muted deep violet */
  video: "#4B2E83",
  /** Caption element color - faded violet/blue */
  caption: "#5C5470",
  /** Image element color - earthy brown-orange */
  image: "#805A38",
  /** Audio element color - dark muted teal-green */
  audio: "#3C665B",
  /** Text element color - dusty steel blue */
  text: "#375A7F",
  /** Generic element color - muted berry purple */
  element: "#6B3A5B",
  /** Rectangle element color - desaturated deep indigo */
  rect: "#4C3A72",
  /** Frame effect color - dusty rose/maroon */
  frameEffect: "#703C57",
  /** Filters color - muted twilight purple */
  filters: "#5A4C82",
  /** Transition color - toasted copper */
  transition: "#7A573A",
  /** Animation color - slate pine green */
  animation: "#32645C",
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