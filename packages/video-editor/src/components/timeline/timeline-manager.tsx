import SeekControl from "../controls/seek-control";
import TimelineView from "./timeline-view";
import { useTimelineManager } from "../../hooks/use-timeline-manager";
import { TimelineTickConfig } from "../video-editor";
import { ElementColors } from "../../helpers/types";

const TimelineManager = ({
  trackZoom,
  timelineTickConfigs,
  elementColors,
}: {
  trackZoom: number;
  timelineTickConfigs?: TimelineTickConfig[];
  elementColors?: ElementColors;
}) => {
  
  const {timelineData, totalDuration, selectedItem, onAddTrack, onReorder, onElementDrag, onSeek, onSelectionChange} = useTimelineManager();

  return (
    <TimelineView
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
      elementColors={elementColors}
      seekTrack={
        <SeekControl
          duration={totalDuration}
          zoom={trackZoom}
          onSeek={onSeek}
          timelineCount={timelineData?.tracks?.length ?? 0}
          timelineTickConfigs={timelineTickConfigs}
        />
      }
    ></TimelineView>
  );
};

export default TimelineManager;
