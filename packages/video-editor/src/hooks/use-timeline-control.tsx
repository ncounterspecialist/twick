import {
  TrackElement,
  Track,
  useTimelineContext,
} from "@twick/timeline";

const useTimelineControl = () => {
  const { editor } = useTimelineContext();

  const deleteItem = (item: Track | TrackElement) => {
    if(item instanceof Track) {
      editor.removeTrack(item);
    } else if(item instanceof TrackElement) {
      editor.removeElement(item);
    }
  };
  
  const splitElement = (element: TrackElement, currentTime: number) => {
    editor.splitElement(element, currentTime);
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
