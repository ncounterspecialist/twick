import { useEffect, useRef, useState } from "react";
import TrackElement from "./track-element";
import { TimelineElement } from "../types";
import "../styles/timeline.css";

interface TrackProps {
  duration: number;
  zoom: number;
  elements: TimelineElement[];
  updateTrackElement: (id: string, updates: any) => void;
  trackWidth: number;
  selectedItem: TimelineElement | null;
  allowOverlap?: boolean;
  onItemDeletion: (element: TimelineElement) => void;
  onItemSelection: (element: TimelineElement) => void;
}

const Track = ({
  duration,
  zoom,
  elements,
  updateTrackElement,
  trackWidth,
  selectedItem,
  onItemDeletion,
  onItemSelection,
  allowOverlap = false,
}: TrackProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [localElements, setLocalElements] = useState<TimelineElement[]>(elements);

  useEffect(() => {
    setLocalElements(elements);
  }, [elements]);

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
        <TrackElement
          key={element.id}
          element={element}
          duration={duration}
          allowOverlap={allowOverlap}
          parentWidth={trackWidth}
          selectedItem={selectedItem}
          updateTrackElement={updateTrackElement}
          onSelection={onItemSelection}
          onDeletion={onItemDeletion}
          nextStart={index < localElements.length - 1 ? localElements[index + 1].s : duration}
          prevEnd={index > 0 ? localElements[index - 1].e : 0}
        />
      ))}
    </div>
  );
};

export default Track;