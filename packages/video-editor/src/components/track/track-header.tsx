import React from "react";
import { Track } from "@twick/timeline";
import { GripVertical, Lock } from "lucide-react";
import "../../styles/timeline.css";

interface TrackHeaderProps {
  track: Track;
  selectedIds: Set<string>;
  onSelect: (track: Track, event: React.MouseEvent) => void;
  onDragStart: (e: React.DragEvent, track: Track) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, track: Track) => void;
}

const TrackHeader = ({
  track,
  selectedIds,
  onDragStart,
  onDragOver,
  onDrop,
  onSelect,
}: TrackHeaderProps) => {
  return (
    <div
      className={`twick-track-header ${
        selectedIds.has(track.getId())
          ? "twick-track-header-selected"
          : "twick-track-header-default"
      }`}
      draggable
      onClick={(e) => onSelect(track, e)}
      onDragStart={(e) => onDragStart(e, track)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, track)}
    >
      {track?.getType() === "scene" ? (
        <Lock className="twick-track-header-lock" />
      ) : null}

      <div className="twick-track-header-content">
        <div className="twick-track-header-grip">
          <GripVertical size={14} />
        </div>
      </div>
    </div>
  );
};

export default TrackHeader;