import React from "react";
import { Timeline } from "../../types";
import { GripVertical, Lock } from "lucide-react";
import "../../styles/timeline.css";

interface TrackHeaderProps {
  timeline: Timeline;
  selectedItem: Timeline | null;
  onDeletion: (timeline: Timeline) => void;
  onSelect: (timeline: Timeline) => void;
  onDragStart: (e: React.DragEvent, timeline: Timeline) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, timeline: Timeline) => void;
}

const TrackHeader = ({
  timeline,
  selectedItem,
  onDragStart,
  onDragOver,
  onDrop,
  onSelect,
}: TrackHeaderProps) => {
  return (
    <div
      className={`twick-track-header ${
        selectedItem?.id?.startsWith("t-") && selectedItem.id === timeline.id
          ? "twick-track-header-selected"
          : "twick-track-header-default"
      }`}
      draggable
      onClick={() => onSelect(timeline)}
      onDragStart={(e) => onDragStart(e, timeline)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, timeline)}
    >
      {timeline?.type === "scene" ? (
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
