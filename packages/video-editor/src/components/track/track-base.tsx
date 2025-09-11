import { useRef } from "react";
import { Track, TrackElement } from "@twick/timeline";
import "../../styles/timeline.css";
import TrackElementView from "./track-element";

interface TrackBaseProps {
  duration: number;
  zoom: number;
  track: Track;
  trackWidth: number;
  selectedItem: TrackElement | null;
  allowOverlap?: boolean;
  onItemSelection: (element: TrackElement) => void;
  onDrag: ({
    element,
    dragType,
    updates,
  }: {
    element: TrackElement;
    dragType: string;
    updates: { start: number; end: number };
  }) => void;
}

const TrackBase = ({
  duration,
  zoom,
  track,
  trackWidth,
  selectedItem,
  onItemSelection,
  onDrag,
  allowOverlap = false,
}: TrackBaseProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const trackWidthStyle = `${Math.max(100, duration * zoom * 100)}px`;

  const elements = track.getElements();
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
          onSelection={onItemSelection}
          onDrag={onDrag}
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
