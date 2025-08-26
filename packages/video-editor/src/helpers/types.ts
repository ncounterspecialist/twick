/**
 * Represents a media item in the video editor.
 * Defines the structure for images, videos, and audio files
 * that can be used in video editing projects.
 * 
 * @example
 * ```js
 * const mediaItem: MediaItem = {
 *   id: "media-123",
 *   type: "video",
 *   url: "https://example.com/video.mp4",
 *   thumbnail: "https://example.com/thumbnail.jpg",
 *   metadata: {
 *     duration: 30,
 *     width: 1920,
 *     height: 1080
 *   }
 * };
 * ```
 */
export type MediaItem = {
  /** Unique identifier for the media item */
  id: string;
  /** Type of media (image, video, or audio) */
  type: 'image' | 'video' | 'audio';
  /** URL or path to the media file */
  url: string;
  /** Optional array buffer containing the media data */
  arrayBuffer?: ArrayBuffer;
  /** Optional thumbnail URL for the media item */
  thumbnail?: string;
  /** Optional metadata about the media item */
  metadata?: Record<string, any>;
};

/**
 * Pagination options for media library queries.
 * Used to control the number of items returned and pagination.
 * 
 * @example
 * ```js
 * const pagination: PaginationOptions = {
 *   page: 1,
 *   limit: 20
 * };
 * 
 * // Fetch first 20 items
 * const mediaItems = await mediaManager.getMedia(pagination);
 * ```
 */
export type PaginationOptions = {
  /** Page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
};

/**
 * Search options for filtering media items.
 * Defines search criteria for finding specific media content.
 * 
 * @example
 * ```js
 * const searchOptions: SearchOptions = {
 *   query: "nature",
 *   type: "image",
 *   metadata: {
 *     tags: ["landscape", "outdoor"]
 *   }
 * };
 * 
 * // Search for nature images with specific tags
 * const results = await mediaManager.searchMedia(searchOptions);
 * ```
 */
export type SearchOptions = {
  /** Search query string */
  query: string;
  /** Optional media type filter */
  type?: 'image' | 'video' | 'audio';
  /** Optional metadata filters */
  metadata?: Record<string, any>;
};

/**
 * Text effect configuration for animated text elements.
 * Defines how text animations are applied to timeline elements.
 * 
 * @example
 * ```js
 * const textEffect: TextEffect = {
 *   name: "typewriter",
 *   delay: 0.5,
 *   bufferTime: 0.1,
 *   getSample: (effect) => "Sample text animation"
 * };
 * 
 * // Apply text effect to element
 * textElement.setTextEffect(textEffect);
 * ```
 */
export type TextEffect = {
  /** Name of the text effect */
  name: string;
  /** Delay before effect starts (in seconds) */
  delay?: number;
  /** Buffer time between characters (in seconds) */
  bufferTime?: number;
  /** Function to get sample text for preview */
  getSample: (textEffect?: TextEffect) => string;
};

/**
 * Animation configuration for timeline elements.
 * Defines how elements are animated during playback.
 * 
 * @example
 * ```js
 * const animation: Animation = {
 *   name: "fade",
 *   interval: 0.5,
 *   animate: "enter",
 *   mode: "in",
 *   direction: "center",
 *   options: {
 *     animate: ["enter", "exit"],
 *     direction: ["up", "down", "left", "right"],
 *     mode: ["in", "out"]
 *   },
 *   getSample: (anim) => "Sample animation preview"
 * };
 * 
 * // Apply animation to element
 * element.setAnimation(animation);
 * ```
 */
export type Animation = {
  /** Name of the animation */
  name: string;
  /** Interval between animation cycles (in seconds) */
  interval?: number;
  /** When to apply the animation */
  animate?: "enter" | "exit" | "both";
  /** Animation mode (in/out) */
  mode?: "in" | "out";
  /** Direction of the animation */
  direction?: "up" | "down" | "left" | "right" | "center";
  /** Available options for the animation */
  options?: {
    /** Available animation types */
    animate?: string[];
    /** Available directions */
    direction?: string[];
    /** Available modes */
    mode?: string[];
  };
  /** Function to get sample preview */
  getSample: (animation?: Animation) => string;
};

/**
 * Color scheme for different element types in the timeline.
 * Provides consistent visual distinction between various timeline elements.
 * Each property represents the default color for a specific element type.
 * 
 * @example
 * ```js
 * const colors: ElementColors = {
 *   video: "#4B2E83",
 *   text: "#375A7F",
 *   image: "#805A38",
 *   audio: "#3C665B",
 *   // ... other element colors
 * };
 * 
 * // Apply color to element
 * element.style.backgroundColor = colors[element.type];
 * ```
 */
export interface ElementColors {
  /** Fragment element color */
  fragment: string;
  /** Video element color */
  video: string;
  /** Caption element color */
  caption: string;
  /** Image element color */
  image: string;
  /** Audio element color */
  audio: string;
  /** Text element color */
  text: string;
  /** Generic element color */
  element: string;
  /** Rectangle element color */
  rect: string;
  /** Frame effect color */
  frameEffect: string;
  /** Filters color */
  filters: string;
  /** Transition color */
  transition: string;
  /** Animation color */
  animation: string;
}