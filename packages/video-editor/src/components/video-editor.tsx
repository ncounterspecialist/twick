import { PlayerManager } from "./player/player-manager";
import TimelineManager from "./timeline/timeline-manager";
import "../styles/video-editor.css";
import React, { useMemo, useState } from "react";
import ControlManager from "./controls/control-manager";
import { DEFAULT_TIMELINE_ZOOM } from "../helpers/constants";

/**
 * Configuration options for the video editor.
 * Defines the video properties and editor behavior settings.
 *
 * @example
 * ```js
 * const editorConfig = {
 *   videoProps: { width: 1920, height: 1080 },
 *   canvasMode: true
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
  /** Whether to use canvas mode for rendering */
  canvasMode?: boolean;
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
  /** Custom play controls component */
  playControls?: React.ReactNode;
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
  playControls,
  defaultPlayControls = true,
}) => {
  const [trackZoom, setTrackZoom] = useState(DEFAULT_TIMELINE_ZOOM);

  const useMemoizedPlayerManager = useMemo(
    () => (
      <PlayerManager
        videoProps={editorConfig.videoProps}
        canvasMode={editorConfig.canvasMode ?? true}
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
        {playControls ? (
          playControls
        ) : defaultPlayControls ? (
          <ControlManager trackZoom={trackZoom} setTrackZoom={setTrackZoom} />
        ) : null}

        <TimelineManager trackZoom={trackZoom} />
      </div>
    </div>
  );
};

export default VideoEditor;
