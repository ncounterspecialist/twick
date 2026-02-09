import { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/timeline.css";
import TrackHeader from "../track/track-header";
import TrackBase from "../track/track-base";
import { Track, TrackElement } from "@twick/timeline";
import { Plus } from "lucide-react";
import { ElementColors } from "../../helpers/types";
import { usePlayheadScroll } from "../../hooks/use-playhead-scroll";
import { useMarqueeSelection } from "../../hooks/use-marquee-selection";
import { useTimelineDrop } from "../../hooks/use-timeline-drop";
import { MarqueeOverlay } from "./marquee-overlay";
import type { Size } from "@twick/timeline";

/** Width of sticky left area (add track button + track headers) in pixels */
const LABEL_WIDTH = 40;
const TRACK_HEIGHT = 44;

function TimelineView({
  zoomLevel,
  selectedItem,
  duration,
  tracks,
  seekTrack,
  onAddTrack,
  onReorder,
  onItemSelect,
  onEmptyClick,
  onMarqueeSelect,
  onElementDrag,
  elementColors,
  selectedIds,
  playheadPositionPx = 0,
  isPlayheadActive = false,
  onDropOnTimeline,
  videoResolution,
  enableDropOnTimeline = true,
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
  onItemSelect: (item: Track | TrackElement, event: React.MouseEvent) => void;
  onEmptyClick: () => void;
  onMarqueeSelect: (ids: Set<string>) => void;
  onDeletion: (element: TrackElement | Track) => void;
  selectedIds: Set<string>;
  elementColors?: ElementColors;
  /** Playhead position in pixels (for auto-scroll) */
  playheadPositionPx?: number;
  /** Whether playhead is moving (playing or dragging) */
  isPlayheadActive?: boolean;
  /** Called when a file or panel media item is dropped on the timeline */
  onDropOnTimeline?: (params: {
    track: Track | null;
    timeSec: number;
    type: "video" | "audio" | "image";
    url: string;
  }) => Promise<void>;
  /** Video resolution for creating elements from dropped files */
  videoResolution?: Size;
  /** Whether to enable drop-on-timeline */
  enableDropOnTimeline?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const seekContainerRef = useRef<HTMLDivElement>(null);
  const timelineContentRef = useRef<HTMLDivElement>(null);
  const [, setScrollLeft] = useState(0);

  const [draggedTimeline, setDraggedTimeline] = useState<Track | null>(null);

  const { selectedTrackElement } = useMemo(() => {
    if (selectedItem && "elements" in selectedItem) {
      return { selectedTrackElement: null };
    }
    return { selectedTrackElement: selectedItem };
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

  usePlayheadScroll(containerRef, playheadPositionPx, isPlayheadActive, {
    labelWidth: LABEL_WIDTH,
  });

  const { marquee, handleMouseDown: handleMarqueeMouseDown } =
    useMarqueeSelection({
      duration,
      zoomLevel,
      labelWidth: LABEL_WIDTH,
      trackCount: tracks?.length ?? 0,
      trackHeight: TRACK_HEIGHT,
      tracks: tracks ?? [],
      containerRef: timelineContentRef,
      onMarqueeSelect,
      onEmptyClick,
    });

  const { preview, handleDragOver, handleDragLeave, handleDrop } =
    useTimelineDrop({
      containerRef: timelineContentRef,
      scrollContainerRef: containerRef,
      tracks: tracks ?? [],
      duration,
      zoomLevel,
      labelWidth: LABEL_WIDTH,
      trackHeight: TRACK_HEIGHT,
      trackContentWidth: timelineWidth - LABEL_WIDTH,
      onDrop: onDropOnTimeline ?? (async () => {}),
      enabled: enableDropOnTimeline && !!onDropOnTimeline && !!videoResolution,
    });

  // Track reordering handlers
  const handleTrackDragStart = (e: React.DragEvent, track: Track) => {
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

  const handleItemSelection = (item: Track | TrackElement, event: React.MouseEvent) => {
    onItemSelect(item, event);
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
      <div
        ref={timelineContentRef}
        style={{ width: timelineWidthPx, position: "relative" }}
        onMouseDown={handleMarqueeMouseDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <MarqueeOverlay marquee={marquee} />
        {preview && (
          <div
            className="twick-drop-preview"
            style={{
              position: "absolute",
              left: LABEL_WIDTH + (preview.timeSec / duration) * (timelineWidth - LABEL_WIDTH),
              top: preview.trackIndex * TRACK_HEIGHT + 2,
              width: (preview.widthPct / 100) * (timelineWidth - LABEL_WIDTH),
              height: TRACK_HEIGHT - 4,
            }}
          />
        )}
        <div style={{ position: "relative", zIndex: 10 }}>
        {(tracks || []).map((track: Track) => (
          <div className="twick-timeline-container" key={track.getId()}>
            {/* Track header with drag support */}
            <div className="twick-timeline-header-container">
              <TrackHeader
                track={track}
                selectedIds={selectedIds}
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
              selectedIds={selectedIds}
              zoom={zoomLevel}
              allowOverlap={false}
              trackWidth={timelineWidth - LABEL_WIDTH}
              onItemSelection={handleItemSelection}
              onDrag={onElementDrag}
              elementColors={elementColors}
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default TimelineView;
