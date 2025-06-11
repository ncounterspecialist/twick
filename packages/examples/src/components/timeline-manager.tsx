import {
  TimelineView,
  type Timeline,
  useTimeline,
  type TimelineElement,
} from "@twick/timeline";
import { useEffect, useState } from "react";
import SeekControl from "./seek-control";
import { useLivePlayerContext } from "@twick/live-player";

const TimelineManager = ({ projectData }: { projectData: any }) => {
  const [selectedItem, setSelectedItem] = useState<
    TimelineElement | Timeline | null
  >(null);
  const { timelineData, duration, setTimelines, editElement } = useTimeline({
    selectedItem: selectedItem,
    captionProps: {},
    applyPropsToAllSubtitle: false,
  });

  const { setSeekTime, setCurrentTime } = useLivePlayerContext();

  useEffect(() => {
    if (projectData.timeline) {
      setTimelines(projectData.timeline, projectData.version ?? 0);
    }
  }, [projectData]);

  const onReorder = (reorderedItems: Timeline[]) => {
    console.log(reorderedItems, timelineData);
    setTimelines(reorderedItems, (timelineData?.version ?? 0) + 1);
  };

  const handleSeekAction = (time: number) => {
    setCurrentTime(time);
    setSeekTime(time);
  };

  return (
    <TimelineView
      timelines={timelineData?.timelines ?? []}
      duration={duration}
      selectedItem={selectedItem}
      onDeletion={() => {}}
      onReorder={onReorder}
      onEditElement={(timelineId, elementId, updates) => {
        editElement({ timelineId, elementId, updates, noSelection: true });
      }}
      onSeek={() => {}}
      onSelectionChange={(selectedItem: TimelineElement | Timeline | null) => {
        setSelectedItem(selectedItem);
      }}
      seekTrack={
        <SeekControl duration={duration} zoom={1.5} onSeek={handleSeekAction} timelineCount={timelineData?.timelines?.length ?? 0} />
      }
    ></TimelineView>
  );
};

export default TimelineManager;
