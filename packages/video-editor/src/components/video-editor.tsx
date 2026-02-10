import { PlayerManager } from "./player/player-manager";
import TimelineManager from "./timeline/timeline-manager";
import "../styles/video-editor.css";
import React, { useMemo, useState } from "react";
import ControlManager from "./controls/control-manager";
import {
  DEFAULT_TIMELINE_ZOOM_CONFIG,
  DEFAULT_TIMELINE_TICK_CONFIGS,
  DEFAULT_ELEMENT_COLORS,
} from "../helpers/constants";
import { CanvasConfig, ElementColors } from "../helpers/types";

/**
 * Configuration for timeline tick marks at specific duration ranges.
 * Defines major tick interval and number of minor ticks between majors.
 *
 * @example
 * ```js
 * const tickConfig = {
 *   durationThreshold: 300, // applies when video < 5 minutes
 *   majorInterval: 30, // major tick every 30 seconds
 *   minorTicks: 6 // 6 minor ticks between majors (every 5 seconds)
 * };
 * ```
 */
export interface TimelineTickConfig {
  /** Duration threshold in seconds - this config applies when duration < threshold */
  durationThreshold: number;
  /** Major tick interval in seconds */
  majorInterval: number;
  /** Number of minor ticks between major ticks */
  minorTicks: number;
}

/**
 * Configuration for timeline zoom behavior.
 * Defines the minimum, maximum, step, and default zoom levels.
 *
 * @example
 * ```js
 * const zoomConfig = {
 *   min: 0.5,     // 50% minimum zoom
 *   max: 2.0,     // 200% maximum zoom
 *   step: 0.25,   // 25% zoom steps
 *   default: 1.0  // 100% default zoom
 * };
 * ```
 */
export interface TimelineZoomConfig {
  /** Minimum zoom level */
  min: number;
  /** Maximum zoom level */
  max: number;
  /** Zoom step increment/decrement */
  step: number;
  /** Default zoom level */
  default: number;
}

/**
 * Configuration options for the video editor.
 * Defines the video properties and editor behavior settings.
 *
 * @example
 * ```js
 * const editorConfig = {
 *   videoProps: { width: 1920, height: 1080 },
 *   canvasMode: true,
 *   canvasConfig: { enableShiftAxisLock: true },
 *   timelineTickConfigs: [
 *     { durationThreshold: 30, majorInterval: 5, minorTicks: 5 },
 *     { durationThreshold: 300, majorInterval: 30, minorTicks: 6 }
 *   ],
 *   timelineZoomConfig: {
 *     min: 0.5, max: 2.0, step: 0.25, default: 1.0
 *   },
 *   elementColors: {
 *     video: "#8B5FBF",
 *     audio: "#3D8B8B",
 *     // ... other element colors
 *   }
 * };
 * ```
 */
export interface VideoEditorConfig {
  /** Video dimensions and properties */
  videoProps: {
    /** Width of the video in pixels */
    width: number;
    /** Height of the video in pixels */
    height: number;
    /** Background color of the video */
    backgroundColor?: string;
  };
  playerProps?: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
  };
  /** Whether to use canvas mode for rendering */
  canvasMode?: boolean;
  /** Canvas behavior options (axis lock, zoom, snapping, etc.). Used by TwickEditor and TwickStudio. */
  canvasConfig?: CanvasConfig;
  /** Custom timeline tick configurations for different duration ranges */
  timelineTickConfigs?: TimelineTickConfig[];
  /** Custom timeline zoom configuration (min, max, step, default) */
  timelineZoomConfig?: TimelineZoomConfig;
  /** Custom element colors for timeline elements */
  elementColors?: ElementColors;
  /** Frames per second for time display (MM:SS.FF format) */
  fps?: number;
}

/**
 * Props for the VideoEditor component.
 * Defines the configuration options and custom panels for the video editor.
 *
 * @example
 * ```jsx
 * <VideoEditor
 *   leftPanel={<MediaPanel />}
 *   rightPanel={<PropertiesPanel />}
 *   bottomPanel={<EffectsPanel />}
 *   editorConfig={{
 *     videoProps: { width: 1920, height: 1080 },
 *     canvasMode: true
 *   }}
 *   defaultPlayControls={true}
 * />
 * ```
 */
export interface VideoEditorProps {
  /** Custom left panel component (e.g., media library) */
  leftPanel?: React.ReactNode;
  /** Custom right panel component (e.g., properties inspector) */
  rightPanel?: React.ReactNode;
  /** Custom bottom panel component (e.g., effects library) */
  bottomPanel?: React.ReactNode;
  /** Whether to show default play controls if no custom controls provided */
  defaultPlayControls?: boolean;
  /** Editor configuration including video properties and mode settings */
  editorConfig: VideoEditorConfig;
}

/**
 * VideoEditor is the main component for the Twick video editing interface.
 * Provides a complete video editing environment with timeline management,
 * player controls, and customizable panels for media, properties, and effects.
 *
 * The editor consists of:
 * - Left panel: Media library and assets
 * - Center: Video player and preview
 * - Right panel: Properties and settings
 * - Bottom: Timeline and track management
 * - Controls: Playback controls and timeline zoom
 *
 * @param props - VideoEditor configuration and custom panels
 * @returns Complete video editing interface
 *
 * @example
 * ```jsx
 * import VideoEditor from '@twick/video-editor';
 *
 * function MyVideoEditor() {
 *   return (
 *     <VideoEditor
 *       leftPanel={<MediaLibrary />}
 *       rightPanel={<PropertiesPanel />}
 *       bottomPanel={<EffectsPanel />}
 *       editorConfig={{
 *         videoProps: { width: 1920, height: 1080 },
 *         canvasMode: true
 *       }}
 *       defaultPlayControls={true}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```jsx
 * // Minimal configuration
 * <VideoEditor
 *   editorConfig={{
 *     videoProps: { width: 1280, height: 720 }
 *   }}
 * />
 * ```
 */
const VideoEditor: React.FC<VideoEditorProps> = ({
  leftPanel,
  rightPanel,
  bottomPanel,
  editorConfig,
  defaultPlayControls = true,
}) => {
  const zoomConfig =
    editorConfig.timelineZoomConfig ?? DEFAULT_TIMELINE_ZOOM_CONFIG;
  const timelineTickConfigs =
    editorConfig?.timelineTickConfigs ?? DEFAULT_TIMELINE_TICK_CONFIGS;
  const elementColors = useMemo(
    () => ({
      ...DEFAULT_ELEMENT_COLORS,
      ...(editorConfig?.elementColors || {}),
    }),
    [editorConfig?.elementColors]
  );

  const [trackZoom, setTrackZoom] = useState(zoomConfig.default);

  const useMemoizedPlayerManager = useMemo(
    () => (
      <PlayerManager
        videoProps={editorConfig.videoProps}
        playerProps={editorConfig.playerProps}
        canvasMode={editorConfig.canvasMode ?? true}
        canvasConfig={editorConfig.canvasConfig}
      />
    ),
    [editorConfig]
  );
  return (
    <div className="twick-editor-main-container">
      <div className="twick-editor-view-section">
        {leftPanel ? leftPanel : <div />}
        {useMemoizedPlayerManager}
        {rightPanel ? rightPanel : <div />}
      </div>
      {bottomPanel ? bottomPanel : null}
      <div className="twick-editor-timeline-section">
        {defaultPlayControls ? (
          <ControlManager
            trackZoom={trackZoom}
            setTrackZoom={setTrackZoom}
            zoomConfig={zoomConfig}
            fps={editorConfig.fps}
          />
        ) : null}

        <TimelineManager
          trackZoom={trackZoom}
          timelineTickConfigs={timelineTickConfigs}
          elementColors={elementColors}
        />
      </div>
    </div>
  );
};

export default VideoEditor;
