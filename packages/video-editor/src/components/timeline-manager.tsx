import {
  TimelineView,
  type Timeline,
  useTimeline,
  type TimelineElement,
} from "@twick/timeline";
import { useState } from "react";
import SeekControl from "./seek-control";
import { useLivePlayerContext } from "@twick/live-player";

const TimelineManager = ({
  timelineControls,
}: {
  timelineControls?: React.ReactNode;
}) => {
  const [selectedItem, setSelectedItem] = useState<
    TimelineElement | Timeline | null
  >(null);
  const { timelineData, duration, setTimeline, editElement } = useTimeline({
    selectedItem: selectedItem,
    captionProps: {},
    applyPropsToAllSubtitle: false,
  });

  const { setSeekTime, setCurrentTime } = useLivePlayerContext();

  const onReorder = (reorderedItems: Timeline[]) => {
    console.log(reorderedItems, timelineData);
    setTimeline(reorderedItems, (timelineData?.version ?? 0) + 1);
  };

  const handleSeekAction = (time: number) => {
    setCurrentTime(time);
    setSeekTime(time);
  };

  return (
    <TimelineView
      timelineControls={timelineControls}
      timeline={timelineData?.timeline ?? []}
      duration={duration}
      selectedItem={selectedItem}
      onDeletion={() => {}}
      onReorder={onReorder}
      onEditElement={(timelineId: string, elementId: string, updates: any) => {
        editElement({ timelineId, elementId, updates, noSelection: true });
      }}
      onSeek={() => {}}
      onSelectionChange={(selectedItem: TimelineElement | Timeline | null) => {
        setSelectedItem(selectedItem);
      }}
      seekTrack={
        <SeekControl
          duration={duration}
          zoom={1.5}
          onSeek={handleSeekAction}
          timelineCount={timelineData?.timeline?.length ?? 0}
        />
      }
    ></TimelineView>
  );
};

export default TimelineManager;
