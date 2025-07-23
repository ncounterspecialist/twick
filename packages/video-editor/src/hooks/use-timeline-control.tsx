import {
  Timeline,
  TimelineElement,
  useTimelineEditor,
} from "@twick/timeline";

const useTimelineControl = () => {
  const editor = useTimelineEditor();

  const deleteItem = (item: TimelineElement | Timeline) => {
    const timelineId = (item as TimelineElement)?.timelineId;
    editor.deleteItem(timelineId || item.id, item.id);
  };
  
  const splitElement = (element: TimelineElement, splitTime: number) => {
    editor.splitElement(element.timelineId, element.id, splitTime);
  };

  return {
    splitElement,
    deleteItem,
  };
};

export default useTimelineControl;
