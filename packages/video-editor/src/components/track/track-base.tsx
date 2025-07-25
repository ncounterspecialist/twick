
import { useEffect, useRef, useState } from "react";
import { Track, TrackElement } from "@twick/timeline";
import "../../styles/timeline.css";
import TrackElementView from "./track-element";

interface TrackBaseProps {
  duration: number;
  zoom: number;
  track: Track;
  updateTrackElement: (id: string, updates: any) => void;
  trackWidth: number;
  selectedItem: TrackElement | null;
  allowOverlap?: boolean;
  onItemDeletion: (element: TrackElement) => void;
  onItemSelection: (element: TrackElement) => void;
}

const TrackBase = ({
  duration,
  zoom,
  track,
  updateTrackElement,
  trackWidth,
  selectedItem,
  onItemDeletion,
  onItemSelection,
  allowOverlap = false,
}: TrackBaseProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [localElements, setLocalElements] = useState<TrackElement[]>([]);

  useEffect(() => {
    const elements = track.getElements();
    setLocalElements([...elements]);
  }, [track]);

  const trackWidthStyle = `${Math.max(100, duration * zoom * 100)}px`;

  return (
    <div
      ref={trackRef}
      className={"twick-track"}
      style={{
        width: trackWidthStyle
      }}
    >
      {localElements?.map((element, index) => (
        <TrackElementView
          key={element.getId()}
          element={element}
          duration={duration}
          allowOverlap={allowOverlap}
          parentWidth={trackWidth}
          selectedItem={selectedItem}
          updateTrackElement={updateTrackElement}
          onSelection={onItemSelection}
          onDeletion={onItemDeletion}
          nextStart={index < localElements.length - 1 ? localElements[index + 1].getStart() : duration}
          prevEnd={index > 0 ? localElements[index - 1].getEnd() : 0}
        />
      ))}
    </div>
  );
};

export default TrackBase;
