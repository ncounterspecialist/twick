import { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/timeline.css";
import TrackHeader from "../track/track-header";
import TrackBase from "../track/track-base";
import { Track, TrackElement } from "@twick/timeline";
import { Plus } from "lucide-react";

function TimelineView({
  zoomLevel,
  selectedItem,
  duration,
  tracks,
  seekTrack,
  onAddTrack,
  onReorder,
  onSelectionChange,
  onElementDrag,
}: {
  zoomLevel: number;
  duration: number;
  tracks: Track[];
  selectedItem: Track | TrackElement | null;
  seekTrack?: React.ReactNode;
  onAddTrack: () => void; 
  onReorder: (tracks: Track[]) => void;
  onElementDrag: ({
    element,
    dragType,
    updates,
  }: {
    element: TrackElement;
    dragType: string;
    updates: { start: number; end: number };
  }) => void;
  onSeek: (time: number) => void;
  onSelectionChange: (element: TrackElement | Track) => void;
  onDeletion: (element: TrackElement | Track) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const seekContainerRef = useRef<HTMLDivElement>(null);
  const timelineContentRef = useRef<HTMLDivElement>(null);
  const [, setScrollLeft] = useState(0);

  const [draggedTimeline, setDraggedTimeline] = useState<Track | null>(null);

  const { selectedTrack, selectedTrackElement } = useMemo(() => {
    if (selectedItem && "elements" in selectedItem) {
      return { selectedTrack: selectedItem, selectedTrackElement: null };
    }
    return { selectedTrack: null, selectedTrackElement: selectedItem };
  }, [selectedItem]);

  // Calculate track width - using the same calculation for all tracks
  const timelineWidth = Math.max(100, duration * zoomLevel * 100);
  const timelineWidthPx = `${timelineWidth}px`;

  // Sync scroll between seek container and timeline container
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = e.currentTarget.scrollLeft;
    setScrollLeft(scrollPosition);

    // Update all containers to the same scroll position
    if (
      seekContainerRef.current &&
      e.currentTarget !== seekContainerRef.current
    ) {
      seekContainerRef.current.scrollLeft = scrollPosition;
    }

    if (containerRef.current && e.currentTarget !== containerRef.current) {
      containerRef.current.scrollLeft = scrollPosition;
    }

    if (
      timelineContentRef.current &&
      e.currentTarget !== timelineContentRef.current
    ) {
      timelineContentRef.current.scrollLeft = scrollPosition;
    }
  };

  const [, setTrackWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setTrackWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth(); // Initial set
    window.addEventListener("resize", updateWidth); // Handle resize

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [duration, zoomLevel]);

  // Fixed width for track labels
  const labelWidth = 140;

  // Track reordering handlers
  const handleTrackDragStart = (e: React.DragEvent, track: Track) => {
    console.log("Drag", track);
    setDraggedTimeline(track);
    e.dataTransfer.setData("application/json", JSON.stringify(track));
  };

  const handleTrackDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleTrackDrop = (e: React.DragEvent, targetTrack: Track) => {
    e.preventDefault();

    // Reset opacity
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }

    if (!draggedTimeline || draggedTimeline.getId() === targetTrack.getId())
      return;

    // Reorder timeline
    const reordered = [...(tracks || [])];
    const draggedIndex = reordered.findIndex(
      (t) => t.getId() === draggedTimeline.getId()
    );
    const targetIndex = reordered.findIndex(
      (t) => t.getId() === targetTrack.getId()
    );

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove the dragged timeline from its position
      const [removed] = reordered.splice(draggedIndex, 1);
      // Insert it at the target position
      reordered.splice(targetIndex, 0, removed);

      if (onReorder) {
        onReorder(reordered);
      }
      // Here you would also update the state in your backend or Redux store
      // dispatch(updateTimelineOrder(reordered));
    }

    setDraggedTimeline(null);
  };

  const handleItemSelection = (element: TrackElement | Track) => {
    if (onSelectionChange) {
      onSelectionChange(element);
    }
  };


  return (
    <div
      ref={containerRef}
      className="twick-timeline-scroll-container"
      onScroll={handleScroll}
    >
      <div style={{ width: timelineWidthPx }}>
        {seekTrack ? (
          <div style={{ display: "flex", position: "relative" }}>
            <div className="twick-seek-track-empty-space" onClick={onAddTrack}>
              <Plus color="white" size={20}/>
            </div>
            <div style={{ flexGrow: 1 }}>{seekTrack}</div>
          </div>
        ) : null}
      </div>
      <div ref={timelineContentRef} style={{ width: timelineWidthPx }}>
        {(tracks || []).map((track: Track) => (
          <div className="twick-timeline-container" key={track.getId()}>
            {/* Track header with drag support */}
            <div className="twick-timeline-header-container">
              <TrackHeader
                track={track}
                selectedItem={selectedTrack}
                onSelect={handleItemSelection}
                onDragStart={handleTrackDragStart}
                onDragOver={handleTrackDragOver}
                onDrop={handleTrackDrop}
              />
            </div>

            {/* Track content */}
            <TrackBase
              track={track}
              duration={duration}
              selectedItem={selectedTrackElement}
              zoom={zoomLevel}
              allowOverlap={false}
              trackWidth={timelineWidth - labelWidth} // Subtract label width for accurate track width
              onItemSelection={handleItemSelection}
              onDrag={onElementDrag}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineView;
