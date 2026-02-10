/**
 * @twick/studio - Studio Package
 *
 * React-based studio suite for the Twick platform. 
 * Offers an integrated interface with timeline editing, player controls, media management, and animation tools.
 *
 * @example
 * ```jsx
 * // All components and providers can be imported from @twick/studio
 * import { 
 *   TwickStudio, 
 *   useStudioManager,
 *   LivePlayerProvider,
 *   TimelineProvider,
 *   INITIAL_TIMELINE_DATA
 * } from '@twick/studio';
 *
 * function App() {
 *   return (
 *     <LivePlayerProvider>
 *       <TimelineProvider
 *         initialData={INITIAL_TIMELINE_DATA}
 *         contextId="studio-demo"
 *       >
 *         <TwickStudio />
 *       </TimelineProvider>
 *     </LivePlayerProvider>
 *   );
 * }
 * ```
 */

import "./studio.css";
import "@twick/video-editor/dist/video-editor.css";

/**
 * Main component: full editing suite with timeline, canvas, media browser, and property panels.
 */
import { TwickStudio } from "./components/twick-studio";

/**
 * Left vertical toolbar for tool and mode selection.
 */
import { Toolbar } from "./components/toolbar";

/**
 * Hook for main studio state: selection, tools, elements.
 */
import { useStudioManager } from "./hooks/use-studio-manager";

/**
 * Hook for subtitle generation and polling.
 */
import useGenerateSubtitles from "./hooks/use-generate-subtitles";

/**
 * Top header with project actions and resolution controls.
 */
import StudioHeader from "./components/header";

/**
 * Audio clip browser/editor panel.
 */
import { AudioPanel } from "./components/panel/audio-panel";

/**
 * Video clip browser/editor panel.
 */
import { VideoPanel } from "./components/panel/video-panel";

/**
 * Image asset browser/editor panel.
 */
import { ImagePanel } from "./components/panel/image-panel";

/**
 * Panel for adding and editing text overlays.
 */
import { TextPanel } from "./components/panel/text-panel";

/**
 * Panel for adding and editing circle shapes.
 */
import { CirclePanel } from "./components/panel/circle-panel";

/**
 * Panel for adding and editing rectangle shapes.
 */
import { RectPanel } from "./components/panel/rect-panel";

/**
 * Panel for browsing and inserting icons.
 */
import { IconPanel } from "./components/panel/icon-panel";

/**
 * Panel for managing subtitles/captions.
 */
import { SubtitlesPanel } from "./components/panel/subtitles-panel";

// Main exported UI components
export {
  /** Main studio editing environment */
  TwickStudio,
  /** Editing tool/mode selector */
  Toolbar,
  /** Studio top bar with controls */
  StudioHeader,
};

// Panel exports for embedding or replacement
export {
  /** Panel for audio assets */
  AudioPanel,
  /** Panel for video assets */
  VideoPanel,
  /** Panel for image assets */
  ImagePanel,
  /** Panel for editing/add text elements */
  TextPanel,
  /** Panel for subtitle/caption management */
  SubtitlesPanel,
  /** Panel for adding circles */
  CirclePanel,
  /** Panel for adding rectangles */
  RectPanel,
  /** Panel for icon assets */
  IconPanel,
}

// Hook exports for external logic integration
export {
  /** Hook for managing studio state and selections */
  useStudioManager,
  /** Hook for polling-based subtitle generation */
  useGenerateSubtitles,
};

// Utilities and types
export * from "./helpers/generate-subtitles.service";
export * from "./helpers/constant";
export * from "./types";

/**
 * ============================================================================
 * RE-EXPORTS FROM DEPENDENCY PACKAGES
 * ============================================================================
 * 
 * The @twick/studio package re-exports components, hooks, types, and utilities
 * from its dependency packages (@twick/video-editor, @twick/timeline, @twick/live-player).
 * 
 * This provides a single entry point for developers using the Twick SDK.
 * 
 * Benefits:
 * - Install only `@twick/studio` instead of multiple packages
 * - Import everything from a single package: `import { ... } from '@twick/studio'`
 * - All dependencies are automatically installed and version-matched
 * - Simpler package management and fewer version conflicts
 * 
 * @example
 * ```jsx
 * // Before: Multiple package imports
 * import { TwickStudio } from '@twick/studio';
 * import { LivePlayer, LivePlayerProvider } from '@twick/live-player';
 * import { TimelineProvider, TimelineEditor } from '@twick/timeline';
 * import { VideoEditor } from '@twick/video-editor';
 * 
 * // After: Single package import
 * import { 
 *   TwickStudio, 
 *   LivePlayer, 
 *   LivePlayerProvider,
 *   TimelineProvider,
 *   TimelineEditor,
 *   VideoEditor
 * } from '@twick/studio';
 * ```
 */

// ============================================================================
// VIDEO EDITOR EXPORTS
// ============================================================================
/**
 * Main video editor component and related types
 */
export { default as VideoEditor } from "@twick/video-editor";
export type { 
  VideoEditorProps, 
  VideoEditorConfig,
  CanvasConfig,
  TimelineTickConfig,
  TimelineZoomConfig,
  PlayerControlsProps
} from "@twick/video-editor";

/**
 * Video editor hooks for custom implementations
 */
export { 
  usePlayerControl,
  useEditorManager,
  useTimelineControl
} from "@twick/video-editor";

/**
 * Video editor components
 */
export {
  PlayerControls,
  TimelineManager
} from "@twick/video-editor";

/**
 * Media management utilities
 */
export {
  BrowserMediaManager,
  BaseMediaManager
} from "@twick/video-editor";

/**
 * Animation and text effect constants
 */
export {
  ANIMATIONS,
  TEXT_EFFECTS
} from "@twick/video-editor";

/**
 * Editor utility functions and types
 */
export {
  animationGifs,
  getAnimationGif,
  setElementColors
} from "@twick/video-editor";

export type {
  MediaItem,
  PaginationOptions,
  SearchOptions,
  Animation,
  TextEffect,
  ElementColors
} from "@twick/video-editor";

// ============================================================================
// LIVE PLAYER EXPORTS
// ============================================================================
/**
 * Live player components and context
 */
export { 
  LivePlayerProvider, 
  LivePlayer,
  useLivePlayerContext
} from "@twick/live-player";

/**
 * Player constants and utilities
 */
export {
  PLAYER_STATE,
  getBaseProject,
  generateId
} from "@twick/live-player";

// ============================================================================
// TIMELINE EXPORTS
// ============================================================================
/**
 * Timeline provider and editor
 */
export { 
  TimelineProvider,
  TimelineEditor,
  INITIAL_TIMELINE_DATA
} from "@twick/timeline";

export type { TimelineProviderProps } from "@twick/timeline";

/**
 * Timeline element classes
 */
export {
  Track,
  TrackElement,
  TextElement,
  VideoElement,
  ImageElement,
  AudioElement,
  CircleElement,
  RectElement,
  IconElement,
  CaptionElement,
  ElementAnimation,
  ElementFrameEffect,
  ElementTextEffect
} from "@twick/timeline";

/**
 * Timeline visitor pattern classes for element manipulation
 */
export {
  ElementSerializer,
  ElementDeserializer,
  ElementValidator,
  ElementAdder,
  ElementRemover,
  ElementUpdater,
  ElementSplitter,
  ElementCloner
} from "@twick/timeline";

/**
 * Timeline utilities and helpers
 */
export {
  generateShortUuid,
  getTotalDuration,
  getCurrentElements,
  isTrackId,
  isElementId,
  TIMELINE_ELEMENT_TYPE
} from "@twick/timeline";

/**
 * Timeline types
 */
export type {
  ProjectJSON,
  Size,
  Position,
  Frame,
  ElementJSON,
  TrackJSON,
  VideoProps,
  AudioProps,
  ImageProps,
  TextProps,
  RectProps,
  CircleProps,
  IconProps,
  TextEffect as TimelineTextEffect,
  FrameEffect,
  FrameEffectProps,
  Animation as TimelineAnimation,
  ObjectFit,
  TextAlign,
  BaseMediaProps
} from "@twick/timeline";

/**
 * Timeline constants
 */
export {
  CAPTION_STYLE,
  CAPTION_STYLE_OPTIONS,
  CAPTION_FONT,
  CAPTION_COLOR,
  WORDS_PER_PHRASE,
  TIMELINE_ACTION,
  PROCESS_STATE
} from "@twick/timeline";

/**
 * Default export: TwickStudio (full editor component)
 */
export default TwickStudio;