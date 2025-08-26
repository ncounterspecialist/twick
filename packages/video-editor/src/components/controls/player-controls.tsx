import React, { useCallback } from "react";
import { PLAYER_STATE } from "@twick/live-player";
import "../../styles/player-controls.css";
import { Trash2, Scissors, Play, Pause, Loader2 } from "lucide-react";
import { UndoRedoControls } from "./undo-redo-controls";
import { TrackElement, Track } from "@twick/timeline";

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
  /** Optional CSS class name for styling */
  className?: string;
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
  className = "",
}) => {
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

  return (
    <div
      className={`player-controls player-controls-card-vertical ${className}`}
    >
      {/* Edit Controls */}
      <div className="edit-controls player-controls-edit-controls">
        <button
          className={`control-btn delete-btn player-controls-delete-btn${
            !!selectedItem ? " active" : " btn-disabled"
          }`}
          onClick={handleDelete}
          disabled={!selectedItem}
          title="Delete"
        >
          <Trash2 size={18} strokeWidth={2} />
        </button>

        <button
          className={`control-btn split-btn player-controls-split-btn${
            selectedItem instanceof TrackElement ? " active" : " btn-disabled"
          }`}
          onClick={handleSplit}
          title="Split"
        >
          <Scissors size={18} strokeWidth={2} />
        </button>
        <UndoRedoControls
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
        />
      </div>

      {/* Playback Controls */}
      <div className="playback-controls player-controls-playback-controls">
        <button
          className={`control-btn play-pause-btn player-controls-play-pause-btn${
            playerState === PLAYER_STATE.PLAYING ? " playing" : ""
          }${playerState === PLAYER_STATE.REFRESH ? " refreshing" : ""}`}
          onClick={togglePlayback}
          title={
            playerState === PLAYER_STATE.PLAYING
              ? "Pause"
              : playerState === PLAYER_STATE.REFRESH
              ? "Refreshing"
              : "Play"
          }
          disabled={playerState === PLAYER_STATE.REFRESH}
        >
          {playerState === PLAYER_STATE.PLAYING ? (
            <Pause size={28} strokeWidth={2} />
          ) : playerState === PLAYER_STATE.REFRESH ? (
            <Loader2 size={28} strokeWidth={2} className="refreshing-spinner" />
          ) : (
            <Play size={28} strokeWidth={2} />
          )}
        </button>

        {/* Time Display at top */}
        <div className="time-display player-controls-time-display">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="time-separator player-controls-time-separator">
            |
          </span>
          <span className="total-time player-controls-total-time">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
