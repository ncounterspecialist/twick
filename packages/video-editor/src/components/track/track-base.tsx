import { useRef } from "react";
import { Track, TrackElement } from "@twick/timeline";
import "../../styles/timeline.css";
import TrackElementView from "./track-element";
import { ElementColors } from "../../helpers/types";
import type { TrackElementDragPayload } from "./track-element";
import type { DropPointer } from "./track-element";

interface TrackBaseProps {
  duration: number;
  zoom: number;
  track: Track;
  trackWidth: number;
  selectedItem: TrackElement | null;
  selectedIds: Set<string>;
  allowOverlap?: boolean;
  onItemSelection: (element: TrackElement, event: React.MouseEvent) => void;
  onDrag: (payload: TrackElementDragPayload, dropPointer?: DropPointer) => void;
  onDragStateChange?: (isDragging: boolean, element?: TrackElement) => void;
  elementColors?: ElementColors;
  currentTime?: number;
  onContextMenuTarget?: (element: TrackElement) => void;
  onDeleteElement?: (element: TrackElement) => void;
  onSplitElement?: (element: TrackElement, splitTime: number) => void;
}

const TrackBase = ({
  duration,
  zoom,
  track,
  trackWidth,
  selectedItem,
  selectedIds,
  onItemSelection,
  onDrag,
  allowOverlap = false,
  onDragStateChange,
  elementColors,
  currentTime,
  onContextMenuTarget,
  onDeleteElement,
  onSplitElement,
}: TrackBaseProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const trackWidthStyle = `${Math.max(100, duration * zoom * 100)}px`;

  const elements = [...track.getElements()].sort((a, b) => {
    const byStart = a.getStart() - b.getStart();
    if (byStart !== 0) return byStart;
    const byEnd = a.getEnd() - b.getEnd();
    if (byEnd !== 0) return byEnd;
    return a.getId().localeCompare(b.getId());
  });
  return (
    <div
      ref={trackRef}
      className={"twick-track"}
      style={{
        width: trackWidthStyle,
      }}
    >
      {elements?.map((element, index) => (
        <TrackElementView
          key={element.getId()}
          element={element}
          duration={duration}
          allowOverlap={allowOverlap}
          parentWidth={trackWidth}
          selectedItem={selectedItem}
          selectedIds={selectedIds}
          onSelection={onItemSelection}
          onDrag={onDrag}
          onDragStateChange={onDragStateChange}
          elementColors={elementColors}
          currentTime={currentTime}
          onContextMenuTarget={onContextMenuTarget}
          onDeleteElement={onDeleteElement}
          onSplitElement={onSplitElement}
          nextStart={
            index < elements.length - 1
              ? elements[index + 1].getStart()
              : null
          }
          prevEnd={index > 0 ? elements[index - 1].getEnd() : 0}
        />
      ))}
    </div>
  );
};

export default TrackBase;
