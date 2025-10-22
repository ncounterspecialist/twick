/**
 * @twick/video-editor - Video Editor Package
 * 
 * A comprehensive React-based video editor component for the Twick platform.
 * Provides a complete video editing interface with timeline management,
 * player controls, media management, and animation capabilities.
 * 
 * @example
 * ```jsx
 * import VideoEditor, { 
 *   usePlayerControl, 
 *   BrowserMediaManager,
 *   ANIMATIONS,
 *   TEXT_EFFECTS,
 *   PlayerControlsProps,
 *   VideoEditorProps
 * } from '@twick/video-editor';
 * 
 * function App() {
 *   return (
 *     <VideoEditor
 *       editorConfig={{
 *         videoProps: { width: 1920, height: 1080 },
 *         canvasMode: true
 *       }}
 *       defaultPlayControls={true}
 *     />
 *   );
 * }
 * ```
 */

// Auto-import CSS styles
import "./styles/video-editor.css";

import VideoEditor, { VideoEditorProps, VideoEditorConfig, TimelineTickConfig, TimelineZoomConfig } from "./components/video-editor";
import PlayerControls, { PlayerControlsProps } from "./components/controls/player-controls";
import TimelineManager from "./components/timeline/timeline-manager";
import { usePlayerControl } from "./hooks/use-player-control";
import { useEditorManager } from "./hooks/use-editor-manager";
import BrowserMediaManager from "./helpers/media-manager/browser-media-manager";
import { MediaItem, PaginationOptions, SearchOptions, Animation, TextEffect, ElementColors } from "./helpers/types";
import BaseMediaManager from "./helpers/media-manager/base-media-manager";
import { animationGifs, getAnimationGif } from "./assets";
import { ANIMATIONS } from "./helpers/animation-manager";
import { TEXT_EFFECTS } from "./helpers/text-effects-manager";
import useTimelineControl from "./hooks/use-timeline-control";
import { setElementColors } from "./helpers/editor.utils";  

export { setElementColors };

// Types and interfaces
export type { MediaItem, PaginationOptions, SearchOptions, Animation, TextEffect, ElementColors };
export type { PlayerControlsProps, VideoEditorProps, VideoEditorConfig, TimelineTickConfig, TimelineZoomConfig };

// Constants and configurations
export { ANIMATIONS, TEXT_EFFECTS };

// Components and hooks
export { 
  usePlayerControl, 
  useEditorManager,
  BrowserMediaManager, 
  BaseMediaManager, 
  animationGifs, 
  getAnimationGif, 
  PlayerControls, 
  TimelineManager, 
  useTimelineControl 
};

// Utilities and constants
export * from "./helpers/constants";

// Default export
export default VideoEditor;