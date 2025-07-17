import {
  TIMELINE_OPERATION,
  Timeline,
  TimelineElement,
  useTimelineContext,
} from "@twick/timeline";

const useTimelineControl = () => {
  const { setTimelineOperation } = useTimelineContext();

  const deleteItem = (item: TimelineElement | Timeline) => {
    const timelineId = (item as TimelineElement)?.timelineId;
    setTimelineOperation(TIMELINE_OPERATION.DELETE_ITEM, {
      elementId: item?.id,
      timelineId,
    });
  };
  
  const splitElement = (element: TimelineElement, splitTime: number) => {
    setTimelineOperation(TIMELINE_OPERATION.SPLIT_ELEMENT, {
      elementId: element?.id,
      timelineId: element?.timelineId,
      splitTime,
    });
  };

  return {
    splitElement,
    deleteItem,
  };
};

export default useTimelineControl;
