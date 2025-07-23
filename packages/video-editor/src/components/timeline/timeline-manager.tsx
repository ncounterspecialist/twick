import {
  type Timeline,
  useTimelineEditor,
  type TimelineElement,
  useTimelineContext,
} from "@twick/timeline";
import SeekControl from "../controls/seek-control";
import { useLivePlayerContext } from "@twick/live-player";
import TimelineView from "./timeline-view";

const TimelineManager = ({
  timelineControls,
  trackZoom,
}: {
  timelineControls?: React.ReactNode;
  trackZoom: number;
}) => {
  const { selectedItem, setSelectedItem, totalDuration } = useTimelineContext();
  const editor = useTimelineEditor();
  
  // Get timeline data from editor
  const timelineData = editor.getTimelineData();

  const { setSeekTime, setCurrentTime } = useLivePlayerContext();

  const onReorder = (reorderedItems: Timeline[]) => {
    console.log(reorderedItems, timelineData);
    editor.loadProject({
      timeline: reorderedItems,
      version: (timelineData?.version ?? 0) + 1,
    });
  };

  const handleSeekAction = (time: number) => {
    setCurrentTime(time);
    setSeekTime(time);
  };

  return (
    <TimelineView
      timelineControls={timelineControls}
      timeline={timelineData?.tracks?.map(track => track.toJSON()) ?? []}
      zoomLevel={trackZoom}
      duration={totalDuration}
      selectedItem={selectedItem}
      onDeletion={() => {}}
      onReorder={onReorder}
      onEditElement={(timelineId: string, elementId: string, updates: any) => {
        editor.updateElement({
          timelineId,
          elementId,
          updates,
          noSelection: true,
        });
      }}
      onSeek={() => {}}
      onSelectionChange={(selectedItem: TimelineElement | Timeline | null) => {
        setSelectedItem(selectedItem);
      }}
      seekTrack={
        <SeekControl
          duration={totalDuration}
          zoom={trackZoom}
          onSeek={handleSeekAction}
          timelineCount={timelineData?.tracks?.length ?? 0}
        />
      }
    ></TimelineView>
  );
};

export default TimelineManager;
