/**
 * @twick/studio - Studio Package
 *
 * React-based studio suite for the Twick platform. 
 * Offers an integrated interface with timeline editing, player controls, media management, and animation tools.
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
 * Default export: TwickStudio (full editor component)
 */
export default TwickStudio;