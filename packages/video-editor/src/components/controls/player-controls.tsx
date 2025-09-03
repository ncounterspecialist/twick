import React, { useCallback } from "react";
import { PLAYER_STATE } from "@twick/live-player";
import "../../styles/player-controls.css";
import { Trash2, Scissors, Play, Pause, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import { UndoRedoControls } from "./undo-redo-controls";
import { TrackElement, Track } from "@twick/timeline";

const MAX_ZOOM = 3;
const MIN_ZOOM = 0.5;
const ZOOM_STEP = 0.25;

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
    <div className={`h-16 bg-gray-800 border-t border-gray-700 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left side - Edit and Playback Controls */}
        <div className="flex items-center gap-4">
          {/* Edit Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={!selectedItem}
              title="Delete"
              className={`btn btn-ghost ${
                !!selectedItem ? "text-red-400 hover:text-red-300" : "text-gray-500 cursor-not-allowed"
              }`}
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <button
              onClick={handleSplit}
              disabled={!(selectedItem instanceof TrackElement)}
              title="Split"
              className={`btn btn-ghost ${
                selectedItem instanceof TrackElement ? "text-blue-400 hover:text-blue-300" : "text-gray-500 cursor-not-allowed"
              }`}
            >
              <Scissors className="w-5 h-5" />
            </button>
            
            <UndoRedoControls
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={onUndo}
              onRedo={onRedo}
            />
          </div>

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
            className="btn btn-ghost text-white"
          >
            {playerState === PLAYER_STATE.PLAYING ? (
              <Pause className="w-6 h-6" />
            ) : playerState === PLAYER_STATE.REFRESH ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          {/* Time Display */}
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-sm font-medium">{formatTime(currentTime)}</span>
            <span className="text-gray-500">/</span>
            <span className="text-sm">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right side - Zoom Controls */}
        {setZoomLevel && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= MIN_ZOOM}
              title="Zoom Out"
              className={`btn btn-ghost ${
                zoomLevel > MIN_ZOOM ? "text-gray-300 hover:text-white" : "text-gray-500 cursor-not-allowed"
              }`}
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            {/* Zoom Level Display */}
            <div className="text-sm text-gray-300 font-medium min-w-[3rem] text-center">
              {Math.round(zoomLevel * 100)}%
            </div>

            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= MAX_ZOOM}
              title="Zoom In"
              className={`btn btn-ghost ${
                zoomLevel < MAX_ZOOM ? "text-gray-300 hover:text-white" : "text-gray-500 cursor-not-allowed"
              }`}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerControls;
