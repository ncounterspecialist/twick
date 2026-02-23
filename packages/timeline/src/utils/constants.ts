/**
 * Track type constants for timeline tracks.
 * Use these instead of raw strings for type safety and consistency.
 *
 * @example
 * ```js
 * import { TRACK_TYPES } from '@twick/timeline';
 *
 * editor.addTrack("Video", TRACK_TYPES.VIDEO);
 * const captionsTrack = editor.getCaptionsTrack(); // first track with type TRACK_TYPES.CAPTION
 * ```
 */
export const TRACK_TYPES = {
  /** Video track – video clips */
  VIDEO: "video",
  /** Audio track – audio clips */
  AUDIO: "audio",
  /** Caption track – captions / captions */
  CAPTION: "caption",
  /** Scene track – scene containers (e.g. image/video as full scene) */
  SCENE: "scene",
  /** Element track – text, shapes, icons, images (overlay elements) */
  ELEMENT: "element",
} as const;

/** Union type of valid track type strings */
export type TrackType = (typeof TRACK_TYPES)[keyof typeof TRACK_TYPES];

/**
 * Initial timeline data structure for new video editor projects.
 * Provides a default timeline with a sample text element to get started.
 * 
 * @example
 * ```js
 * import { INITIAL_TIMELINE_DATA } from '@twick/timeline';
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
      type: TRACK_TYPES.ELEMENT,
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
            text: "Twick SDK",
            fill: "#FFFFFF",
          },
        },
      ],
    },
  ],
  version: 1,
};

/**
 * Player state constants for timeline playback control.
 * Defines the different states that a timeline player can be in during playback.
 * 
 * @example
 * ```js
 * import { PLAYER_STATE } from '@twick/timeline';
 * 
 * if (playerState === PLAYER_STATE.PLAYING) {
 *   console.log('Timeline is currently playing');
 * }
 * ```
 */
export const PLAYER_STATE = {
  /** Player is refreshing/reloading content */
  REFRESH: "Refresh",
  /** Player is actively playing content */
  PLAYING: "Playing",
  /** Player is paused */
  PAUSED: "Paused",
} as const;

/**
 * Caption styling options for text elements.
 * Defines different visual styles for caption text rendering.
 * 
 * @example
 * ```js
 * import { CAPTION_STYLE } from '@twick/timeline';
 * 
 * const captionElement = new CaptionElement({
 *   style: CAPTION_STYLE.WORD_BY_WORD
 * });
 * ```
 */
export const CAPTION_STYLE = {
  /** Highlights background of each word */
  WORD_BG_HIGHLIGHT: "highlight_bg",
  /** Animates text word by word */
  WORD_BY_WORD: "word_by_word",
  /** Animates text word by word with background highlighting */
  WORD_BY_WORD_WITH_BG: "word_by_word_with_bg",
  /** Classic outline: white text with black stroke, no background */
  OUTLINE_ONLY: "outline_only",
  /** Soft box: full phrase in semi-transparent rounded box */
  SOFT_BOX: "soft_box",
  /** Lower third: single line with optional bar (broadcast style) */
  LOWER_THIRD: "lower_third",
  /** Typewriter: characters appear one by one */
  TYPEWRITER: "typewriter",
  /** Karaoke: one word highlighted at a time */
  KARAOKE: "karaoke",
  /** Pop / scale: words pop in with a short scale animation */
  POP_SCALE: "pop_scale",
} as const;

/**
 * Human-readable options for caption styles.
 * Provides user-friendly labels for caption style selection.
 * 
 * @example
 * ```js
 * import { CAPTION_STYLE_OPTIONS } from '@twick/timeline';
 * 
 * const options = Object.values(CAPTION_STYLE_OPTIONS);
 * // Returns array of style options with labels
 * ```
 */
export const CAPTION_STYLE_OPTIONS = {
  [CAPTION_STYLE.WORD_BG_HIGHLIGHT]: {
    label: "Highlight Background",
    value: CAPTION_STYLE.WORD_BG_HIGHLIGHT,
  },
  [CAPTION_STYLE.WORD_BY_WORD]: {
    label: "Word by Word",
    value: CAPTION_STYLE.WORD_BY_WORD,
  },
  [CAPTION_STYLE.WORD_BY_WORD_WITH_BG]: {
    label: "Word with Background",
    value: CAPTION_STYLE.WORD_BY_WORD_WITH_BG,
  },
  [CAPTION_STYLE.OUTLINE_ONLY]: {
    label: "Classic Outline",
    value: CAPTION_STYLE.OUTLINE_ONLY,
  },
  [CAPTION_STYLE.SOFT_BOX]: {
    label: "Soft Box",
    value: CAPTION_STYLE.SOFT_BOX,
  },
  [CAPTION_STYLE.LOWER_THIRD]: {
    label: "Lower Third",
    value: CAPTION_STYLE.LOWER_THIRD,
  },
  [CAPTION_STYLE.TYPEWRITER]: {
    label: "Typewriter",
    value: CAPTION_STYLE.TYPEWRITER,
  },
  [CAPTION_STYLE.KARAOKE]: {
    label: "Karaoke",
    value: CAPTION_STYLE.KARAOKE,
  },
  [CAPTION_STYLE.POP_SCALE]: {
    label: "Pop / Scale",
    value: CAPTION_STYLE.POP_SCALE,
  },
} as const;

/**
 * Default font settings for caption elements.
 * Defines the standard typography configuration for captions.
 * 
 * @example
 * ```js
 * import { CAPTION_FONT } from '@twick/timeline';
 * 
 * const fontSize = CAPTION_FONT.size; // 40
 * ```
 */
export const CAPTION_FONT = {
  /** Font size in pixels */
  size: 40,
} as const;

/**
 * Default color scheme for caption elements.
 * Defines the standard color palette for caption text and backgrounds.
 * 
 * @example
 * ```js
 * import { CAPTION_COLOR } from '@twick/timeline';
 * 
 * const textColor = CAPTION_COLOR.text; // "#ffffff"
 * const highlightColor = CAPTION_COLOR.highlight; // "#ff4081"
 * ```
 */
export const CAPTION_COLOR = {
  /** Text color in hex format */
  text: "#ffffff",
  /** Highlight color in hex format */
  highlight: "#ff4081",
  /** Background color in hex format */
  bgColor: "#8C52FF",
} as const;

/**
 * Number of words to display per phrase in caption animations.
 * Controls the chunking of text for word-by-word animations.
 * 
 * @example
 * ```js
 * import { WORDS_PER_PHRASE } from '@twick/timeline';
 * 
 * const phraseLength = WORDS_PER_PHRASE; // 4
 * ```
 */
export const WORDS_PER_PHRASE = 4;

/**
 * Timeline action types for state management.
 * Defines the different actions that can be performed on the timeline.
 * 
 * @example
 * ```js
 * import { TIMELINE_ACTION } from '@twick/timeline';
 * 
 * if (action.type === TIMELINE_ACTION.SET_PLAYER_STATE) {
 *   // Handle player state change
 * }
 * ```
 */
export const TIMELINE_ACTION = {
  /** No action being performed */
  NONE: "none",
  /** Setting the player state (play/pause) */
  SET_PLAYER_STATE: "setPlayerState",
  /** Updating player data */
  UPDATE_PLAYER_DATA: "updatePlayerData",
  /** Player has been updated */
  ON_PLAYER_UPDATED: "onPlayerUpdated",
} as const;

/**
 * Element type constants for timeline elements.
 * Defines the different types of elements that can be added to timeline tracks.
 * 
 * @example
 * ```js
 * import { TIMELINE_ELEMENT_TYPE } from '@twick/timeline';
 * 
 * if (element.type === TIMELINE_ELEMENT_TYPE.VIDEO) {
 *   // Handle video element
 * }
 * ```
 */
export const TIMELINE_ELEMENT_TYPE = {
  /** Video element type */
  VIDEO: "video",
  /** Caption element type */
  CAPTION: "caption",
  /** Image element type */
  IMAGE: "image",
  /** Audio element type */
  AUDIO: "audio",
  /** Text element type */
  TEXT: "text",
  /** Rectangle element type */
  RECT: "rect",
  /** Circle element type */
  CIRCLE: "circle",
  /** Icon element type */
  ICON: "icon",
  /** Placeholder element type (e.g. for lazy-loaded media) */
  PLACEHOLDER: "placeholder",
} as const;

/**
 * Process state constants for async operations.
 * Defines the different states of background processing operations.
 * 
 * @example
 * ```js
 * import { PROCESS_STATE } from '@twick/timeline';
 * 
 * if (processState === PROCESS_STATE.PROCESSING) {
 *   // Show loading indicator
 * }
 * ```
 */
export const PROCESS_STATE = {
  /** Process is idle */
  IDLE: "Idle",
  /** Process is currently running */
  PROCESSING: "Processing",
  /** Process has completed successfully */
  COMPLETED: "Completed",
  /** Process has failed */
  FAILED: "Failed",
} as const; 