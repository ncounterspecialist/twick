import {
  TimelineView,
  type Timeline,
  useTimeline,
  type TimelineElement,
  useTimelineContext,
  TIMELINE_OPERATION,
} from "@twick/timeline";
import SeekControl from "../controls/seek-control";
import { useLivePlayerContext } from "@twick/live-player";

const TimelineManager = ({
  timelineControls,
  videoSize,
  trackZoom,
}: {
  timelineControls?: React.ReactNode;
  videoSize: { width: number; height: number };
  trackZoom: number;
}) => {
  const { selectedItem, setSelectedItem } = useTimelineContext();
  const { setTimelineOperation } = useTimelineContext();
  const { timelineData, duration } = useTimeline({
    selectedItem: selectedItem,
    captionProps: {},
    videoSize,
    applyPropsToAllSubtitle: false,
  });

  const { setSeekTime, setCurrentTime } = useLivePlayerContext();

  const onReorder = (reorderedItems: Timeline[]) => {
    console.log(reorderedItems, timelineData);
    setTimelineOperation(TIMELINE_OPERATION.SET_TIMELINE, {
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
      timeline={timelineData?.timeline ?? []}
      zoomLevel={trackZoom}
      duration={duration}
      selectedItem={selectedItem}
      onDeletion={() => {}}
      onReorder={onReorder}
      onEditElement={(timelineId: string, elementId: string, updates: any) => {
        setTimelineOperation(TIMELINE_OPERATION.UPDATE_ELEMENT, {
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
          duration={duration}
          zoom={trackZoom}
          onSeek={handleSeekAction}
          timelineCount={timelineData?.timeline?.length ?? 0}
        />
      }
    ></TimelineView>
  );
};

export default TimelineManager;
