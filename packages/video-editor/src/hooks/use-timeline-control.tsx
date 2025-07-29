import {
  TrackElement,
  Track,
  useTimelineContext,
} from "@twick/timeline";

const useTimelineControl = () => {
  const { editor } = useTimelineContext();

  const deleteItem = (item: Track | TrackElement) => {
    if(item instanceof Track) {
      editor.removeTrackById(item.getId());
    } else if(item instanceof TrackElement) {
      editor.removeElementFromTrack(item.getTrackId(), item);
    }
  };
  
  const splitElement = (element: TrackElement, currentTime: number) => {
    editor.splitElementInTrack(element.getTrackId(), element, currentTime);
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
