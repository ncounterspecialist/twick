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
  const { timelineData, duration, setTimeline, editElement } = useTimeline({
    selectedItem: selectedItem,
    captionProps: {},
    videoSize: { width: 720, height: 1280 },
    applyPropsToAllSubtitle: false,
  });

  const { setSeekTime, setCurrentTime } = useLivePlayerContext();

  useEffect(() => {
    if (projectData.timeline) {
      setTimeline(projectData.timeline, projectData.version ?? 0);
    }
  }, [projectData]);

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
      timeline={timelineData?.timeline ?? []}
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
        <SeekControl duration={duration} zoom={1.5} onSeek={handleSeekAction} timelineCount={timelineData?.timeline?.length ?? 0} />
      }
    ></TimelineView>
  );
};

export default TimelineManager;
