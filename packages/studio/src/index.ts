/**
 * @twick/studio - Studio Package
 *
 * A comprehensive React-based studio component for the Twick platform.
 * Provides a complete studio interface with timeline management,
 * player controls, media management, and animation capabilities.
 *
 * @example
 * ```jsx
 * import { TwickStudio, useStudioManager } from '@twick/studio';
 * import { TimelineProvider } from '@twick/timeline';
 * import { LivePlayerProvider } from '@twick/live-player';
 *
 * function App() {
 *   return (
 *     <LivePlayerProvider>
 *       <TimelineProvider
 *         initialData={{ timeline: [], version: 0 }}
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
 * Main studio component that provides the complete editing interface.
 * Includes timeline, canvas, media panels, and property controls.
 */
import { TwickStudio } from "./components/twick-studio";

/**
 * Toolbar component for selecting different editing tools and modes.
 */
import { Toolbar } from "./components/toolbar";

/**
 * Hook for managing studio state, selected tools, and element manipulation.
 */
import { useStudioManager } from "./hooks/use-studio-manager";

/**
 * Header component with project controls and video resolution settings.
 */
import StudioHeader from "./components/header";

/**
 * Panel for managing audio elements and library.
 */
import { AudioPanel } from "./components/panel/audio-panel";

/**
 * Panel for managing video elements and library.
 */
import { VideoPanel } from "./components/panel/video-panel";

/**
 * Panel for managing image elements and library.
 */
import { ImagePanel } from "./components/panel/image-panel";

/**
 * Panel for creating and editing text elements.
 */
import { TextPanel } from "./components/panel/text-panel";

/**
 * Panel for creating and editing circle shapes.
 */
import { CirclePanel } from "./components/panel/circle-panel";

/**
 * Panel for creating and editing rectangle shapes.
 */
import { RectPanel } from "./components/panel/rect-panel";

/**
 * Panel for adding and customizing icons.
 */
import { IconPanel } from "./components/panel/icon-panel";

/**
 * Panel for managing subtitles and captions.
 */
import { SubtitlesPanel } from "./components/panel/subtitles-panel";

// Components
export {
  /** Main studio component */
  TwickStudio,
  /** Tool selection toolbar */
  Toolbar,
  /** Studio header with controls */
  StudioHeader,
};

// Panels
export {
  /** Audio management panel */
  AudioPanel,
  /** Video management panel */
  VideoPanel,
  /** Image management panel */
  ImagePanel,
  /** Text editing panel */
  TextPanel,
  /** Subtitles management panel */
  SubtitlesPanel,
  /** Circle shape panel */
  CirclePanel,
  /** Rectangle shape panel */
  RectPanel,
  /** Icon management panel */
  IconPanel,
}

// Hooks
export {
  /** Studio state management hook */
  useStudioManager,
};

export * from "./types";

// Default export
export default TwickStudio;