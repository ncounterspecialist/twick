import SeekControl from "../controls/seek-control";
import TimelineView from "./timeline-view";
import { useTimelineManager } from "../../hooks/use-timeline-manger";

const TimelineManager = ({
  timelineControls,
  trackZoom,
}: {
  timelineControls?: React.ReactNode;
  trackZoom: number;
}) => {
  
  const {timelineData, totalDuration, selectedItem, onReorder, onEdit, onSeek, onSelectionChange} = useTimelineManager();

  return (
    <TimelineView
      timelineControls={timelineControls}
      tracks={timelineData?.tracks ?? []}
      zoomLevel={trackZoom}
      duration={totalDuration}
      selectedItem={selectedItem}
      onDeletion={() => {}}
      onReorder={onReorder}
      onEditElement={onEdit}
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
