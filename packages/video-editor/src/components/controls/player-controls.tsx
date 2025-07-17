import React, { useCallback, useMemo } from "react";
import { PLAYER_STATE } from "@twick/live-player";
import "../../styles/player-controls.css";
import { Trash2, Scissors,  Play, Pause, Loader2 } from "lucide-react";
import { canSplitElement, Timeline, TimelineElement } from "@twick/timeline";

interface PlayerControlsProps {
  selectedItem: TimelineElement | Timeline | null;
  currentTime: number;
  duration: number;
  playerState: keyof typeof PLAYER_STATE;
  togglePlayback: () => void;
  onDelete?: (item: TimelineElement | Timeline) => void;
  onSplit?: (item: TimelineElement, splitTime: number) => void;
  className?: string;
  useEnhancedControls?: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  selectedItem,
  duration,
  currentTime,
  playerState,
  togglePlayback,
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

  const canSplit = useMemo(() => {
    return  selectedItem && canSplitElement(selectedItem as TimelineElement);
  }, [selectedItem]);

  const handleDelete = useCallback(() => {
    if(selectedItem && onDelete) {
      onDelete(selectedItem)
    }

  }, [selectedItem, onDelete]);

  const handleSplit = useCallback(() => {
    if(selectedItem && onSplit && canSplitElement(selectedItem as TimelineElement)) {
      onSplit(selectedItem as TimelineElement, currentTime)
    }
  }, [selectedItem, onSplit, canSplit, currentTime]);

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
            canSplit ? " active" : " btn-disabled"}`}
          onClick={handleSplit}
          title="Split"
        >
          <Scissors size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Playback Controls */}
      <div className="playback-controls player-controls-playback-controls">
        <button
          className={`control-btn play-pause-btn player-controls-play-pause-btn${
            playerState === PLAYER_STATE.PLAYING ? " playing" : ""
          }${playerState === PLAYER_STATE.REFRESHING ? " refreshing" : ""}`}
          onClick={togglePlayback}
          title={
            playerState === PLAYER_STATE.PLAYING
              ? "Pause"
              : playerState === PLAYER_STATE.REFRESHING
              ? "Refreshing"
              : "Play"
          }
          disabled={playerState === PLAYER_STATE.REFRESHING}
        >
          {playerState === PLAYER_STATE.PLAYING ? (
            <Pause size={28} strokeWidth={2} />
          ) : playerState === PLAYER_STATE.REFRESHING ? (
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
