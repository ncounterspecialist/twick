import {
  TimelineView,
  type Timeline,
  useTimeline,
  type TimelineElement,
} from "@twick/timeline";
import { useEffect, useState } from "react";

const TimelineManager = ({ projectData }: { projectData: any }) => {
  const [selectedItem, setSelectedItem] = useState<
    TimelineElement | Timeline | null
  >(null);
  const { timelineData, duration, setTimelines, editElement } = useTimeline({
    selectedItem: selectedItem,
    captionProps: {},
    applyPropsToAllSubtitle: false,
  });

  useEffect(() => {
    if (projectData.timeline) {
      setTimelines(projectData.timeline, projectData.version ?? 0);
    }
  }, [projectData]);

  const onReorder = (reorderedItems: Timeline[]) => {
    console.log(reorderedItems, timelineData);
    setTimelines(reorderedItems, (timelineData?.version ?? 0) + 1);
  };

  return (
    <TimelineView
      timelines={timelineData?.timelines ?? []}
      duration={duration}
      seekTime={0}
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
    />
  );
};

export default TimelineManager;
