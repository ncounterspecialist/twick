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

  const handleUndo = () => {
    editor.undo();
  }

  const handleRedo = () => {
    editor.redo();
  }

  return {
    splitElement,
    deleteItem,
    handleUndo,
    handleRedo,
  };
};

export default useTimelineControl;
