import { useEffect, useMemo, useRef, useState } from "react";
import { Timeline, TimelineElement } from "../../types";
import Track from "../tracks/track";
import TrackHeader from "../tracks/track-header";

import "../../styles/timeline.css";

function TimelineView({
  zoomLevel,
  selectedItem,
  duration,
  timeline,
  seekTrack,
  onReorder,
  onEditElement,
  onSelectionChange,
  onDeletion,
}: {
  timelineControls?: React.ReactNode;
  zoomLevel: number;
  duration: number;
  timeline: Timeline[];
  selectedItem: TimelineElement | Timeline | null;
  seekTrack?: React.ReactNode;
  onReorder: (timeline: Timeline[]) => void;
  onEditElement: (timelineId: string, elementId: string, updates: any) => void;
  onSeek: (time: number) => void;
  onSelectionChange: (element: TimelineElement | Timeline) => void;
  onDeletion: (element: TimelineElement | Timeline) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const seekContainerRef = useRef<HTMLDivElement>(null);
  const timelineContentRef = useRef<HTMLDivElement>(null);
  const [, setScrollLeft] = useState(0);

  const [draggedTimeline, setDraggedTimeline] = useState<Timeline | null>(null);

  const { selectedTimeline, selectedTimelineElement } = useMemo(() => {
    if (selectedItem && "elements" in selectedItem) {
      return { selectedTimeline: selectedItem, selectedTimelineElement: null };
    }
    return { selectedTimeline: null, selectedTimelineElement: selectedItem };
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
  const handleTrackDragStart = (e: React.DragEvent, timeline: Timeline) => {
    console.log("Drag", timeline);
    setDraggedTimeline(timeline);
    e.dataTransfer.setData("application/json", JSON.stringify(timeline));
  };

  const handleTrackDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleTrackDrop = (e: React.DragEvent, targetTimeline: Timeline) => {
    e.preventDefault();

    // Reset opacity
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }

    if (!draggedTimeline || draggedTimeline.id === targetTimeline.id) return;

    // Reorder timeline
    const reordered = [...(timeline || [])];
    const draggedIndex = reordered.findIndex(
      (t) => t.id === draggedTimeline.id
    );
    const targetIndex = reordered.findIndex((t) => t.id === targetTimeline.id);

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

  const handleItemSelection = (element: TimelineElement | Timeline) => {
    if (onSelectionChange) {
      onSelectionChange(element);
    }
  };

  const handleItemDeletion = (element: TimelineElement | Timeline) => {
    if (onDeletion) {
      onDeletion(element);
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
            <div className="twick-seek-track-empty-space">
            </div>
            <div style={{ flexGrow: 1 }}>{seekTrack}</div>
          </div>
        ) : null}
      </div>
      <div ref={timelineContentRef} style={{ width: timelineWidthPx }}>
        {(timeline || []).map((timeline: Timeline) => (
          <div className="twick-timeline-container" key={timeline.id}>
            {/* Track header with drag support */}
            <div className="twick-timeline-header-container">
              <TrackHeader
                timeline={timeline}
                selectedItem={selectedTimeline}
                onDeletion={handleItemDeletion}
                onSelect={handleItemSelection}
                onDragStart={handleTrackDragStart}
                onDragOver={handleTrackDragOver}
                onDrop={handleTrackDrop}
              />
            </div>

            {/* Track content */}
            <Track
              duration={duration}
              selectedItem={selectedTimelineElement}
              zoom={zoomLevel}
              allowOverlap={timeline.allowOverlap}
              elements={timeline.elements}
              trackWidth={timelineWidth - labelWidth} // Subtract label width for accurate track width
              onItemSelection={handleItemSelection}
              onItemDeletion={handleItemDeletion}
              updateTrackElement={(elementId, partials) => {
                if (onEditElement) {
                  onEditElement(timeline.id, elementId, partials);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineView;
