import SeekControl from "../controls/seek-control";
import TimelineView from "./timeline-view";
import { useTimelineManager } from "../../hooks/use-timeline-manager";

const TimelineManager = ({
  timelineControls,
  trackZoom,
}: {
  timelineControls?: React.ReactNode;
  trackZoom: number;
}) => {
  
  const {timelineData, totalDuration, selectedItem, onAddTrack, onReorder, onElementDrag, onSeek, onSelectionChange} = useTimelineManager();

  return (
    <TimelineView
      timelineControls={timelineControls}
      tracks={timelineData?.tracks ?? []}
      zoomLevel={trackZoom}
      duration={totalDuration}
      selectedItem={selectedItem}
      onDeletion={() => {}}
      onAddTrack={onAddTrack}
      onReorder={onReorder}
      onElementDrag={onElementDrag}
      onSeek={onSeek}
      onSelectionChange={onSelectionChange}
      seekTrack={
        <SeekControl
          duration={totalDuration}
          zoom={trackZoom}
          onSeek={onSeek}
          timelineCount={timelineData?.tracks?.length ?? 0}
        />
      }
    ></TimelineView>
  );
};

export default TimelineManager;
