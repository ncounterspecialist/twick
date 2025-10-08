import React, { useCallback } from "react";
import { PLAYER_STATE } from "@twick/live-player";
import "../../styles/player-controls.css";
import {
  Trash2,
  Scissors,
  Play,
  Pause,
  Loader2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { UndoRedoControls } from "./undo-redo-controls";
import { TrackElement, Track } from "@twick/timeline";
import { TimelineZoomConfig } from "../video-editor";
import { DEFAULT_TIMELINE_ZOOM_CONFIG } from "../../helpers/constants";

/**
 * Props for the PlayerControls component.
 * Defines the configuration options and callback functions for player controls.
 *
 * @example
 * ```jsx
 * <PlayerControls
 *   selectedItem={selectedElement}
 *   currentTime={5.5}
 *   duration={120}
 *   canUndo={true}
 *   canRedo={false}
 *   playerState={PLAYER_STATE.PLAYING}
 *   togglePlayback={handleTogglePlayback}
 *   onUndo={handleUndo}
 *   onRedo={handleRedo}
 *   onDelete={handleDelete}
 *   onSplit={handleSplit}
 *   zoomLevel={1.0}
 *   setZoomLevel={handleZoomChange}
 * />
 * ```
 */
export interface PlayerControlsProps {
  /** Currently selected timeline element or track */
  selectedItem: TrackElement | Track | null;
  /** Current playback time in seconds */
  currentTime: number;
  /** Total duration of the timeline in seconds */
  duration: number;
  /** Whether undo operation is available */
  canUndo: boolean;
  /** Whether redo operation is available */
  canRedo: boolean;
  /** Current player state (playing, paused, refresh) */
  playerState: keyof typeof PLAYER_STATE;
  /** Function to toggle between play and pause */
  togglePlayback: () => void;
  /** Optional callback for undo operation */
  onUndo?: () => void;
  /** Optional callback for redo operation */
  onRedo?: () => void;
  /** Optional callback for delete operation */
  onDelete?: (item: TrackElement | Track) => void;
  /** Optional callback for split operation */
  onSplit?: (item: TrackElement, splitTime: number) => void;
  /** Current zoom level for timeline */
  zoomLevel?: number;
  /** Function to set zoom level */
  setZoomLevel?: (zoom: number) => void;
  /** Optional CSS class name for styling */
  className?: string;
  /** Timeline zoom configuration (min, max, step, default) */
  zoomConfig?: TimelineZoomConfig;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  selectedItem,
  duration,
  currentTime,
  playerState,
  togglePlayback,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onSplit,
  onDelete,
  zoomLevel = 1,
  setZoomLevel,
  className = "",
  zoomConfig = DEFAULT_TIMELINE_ZOOM_CONFIG,
}) => {
  const MAX_ZOOM = zoomConfig.max;
  const MIN_ZOOM = zoomConfig.min;
  const ZOOM_STEP = zoomConfig.step;
  // Format time to MM:SS format
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const handleDelete = useCallback(() => {
    if (selectedItem && onDelete) {
      onDelete(selectedItem);
    }
  }, [selectedItem, onDelete]);

  const handleSplit = useCallback(() => {
    if (selectedItem instanceof TrackElement && onSplit) {
      onSplit(selectedItem as TrackElement, currentTime);
    }
  }, [selectedItem, onSplit, currentTime]);

  const handleZoomIn = useCallback(() => {
    if (setZoomLevel && zoomLevel < MAX_ZOOM) {
      setZoomLevel(zoomLevel + ZOOM_STEP);
    }
  }, [zoomLevel, setZoomLevel]);

  const handleZoomOut = useCallback(() => {
    if (setZoomLevel && zoomLevel > MIN_ZOOM) {
      setZoomLevel(zoomLevel - ZOOM_STEP);
    }
  }, [zoomLevel, setZoomLevel]);

  return (
    <div className={`player-controls ${className}`}>
      {/* Edit Controls */}
      <div className="edit-controls">
        <button
          onClick={handleDelete}
          disabled={!selectedItem}
          title="Delete"
          className={`control-btn delete-btn ${
            !selectedItem ? "btn-disabled" : ""
          }`}
        >
          <Trash2 className="icon-md" />
        </button>

        <button
          onClick={handleSplit}
          disabled={!(selectedItem instanceof TrackElement)}
          title="Split"
          className={`control-btn split-btn ${
            !(selectedItem instanceof TrackElement) ? "btn-disabled" : ""
          }`}
        >
          <Scissors className="icon-md" />
        </button>

        <UndoRedoControls
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
        />
      </div>

      <div className="playback-controls">
        {/* Playback Controls */}
        <button
          onClick={togglePlayback}
          disabled={playerState === PLAYER_STATE.REFRESH}
          title={
            playerState === PLAYER_STATE.PLAYING
              ? "Pause"
              : playerState === PLAYER_STATE.REFRESH
              ? "Refreshing"
              : "Play"
          }
          className="control-btn play-pause-btn"
        >
          {playerState === PLAYER_STATE.PLAYING ? (
            <Pause className="icon-lg" />
          ) : playerState === PLAYER_STATE.REFRESH ? (
            <Loader2 className="icon-lg animate-spin" />
          ) : (
            <Play className="icon-lg" />
          )}
        </button>

        {/* Time Display */}
        <div className="time-display">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="time-separator">/</span>
          <span className="total-time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right side - Zoom Controls */}
      {setZoomLevel && (
        <div className="twick-track-zoom-container">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= MIN_ZOOM}
            title="Zoom Out"
            className={`control-btn ${
              zoomLevel <= MIN_ZOOM ? "btn-disabled" : ""
            }`}
          >
            <ZoomOut className="icon-md" />
          </button>

          {/* Zoom Level Display */}
          <div className="zoom-level">{Math.round(zoomLevel * 100)}%</div>

          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= MAX_ZOOM}
            title="Zoom In"
            className={`control-btn ${
              zoomLevel >= MAX_ZOOM ? "btn-disabled" : ""
            }`}
          >
            <ZoomIn className="icon-md" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerControls;
