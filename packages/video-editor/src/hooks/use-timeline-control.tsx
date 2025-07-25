import {
  TrackElement,
  Track,
  useTimelineEditor,
} from "@twick/timeline";

const useTimelineControl = () => {
  const editor = useTimelineEditor();

  const deleteItem = (_item: Track | TrackElement) => {
    // const timelineId = (item as TrackElement)?.timelineId;
    // editor.deleteItem(timelineId || item.id, item.id);
  };
  
  const splitElement = (_element: TrackElement, _currentTime: number) => {
    // editor.splitElement(element.trackId, element.id, splitTime);
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
