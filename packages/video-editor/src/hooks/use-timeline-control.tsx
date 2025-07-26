import {
  TrackElement,
  Track,
  useTimelineEditor,
} from "@twick/timeline";

const useTimelineControl = () => {
  const editor = useTimelineEditor();

  const deleteItem = (item: Track | TrackElement) => {
    if(item instanceof Track) {
      editor.removeTrackById(item.getId());
    } else if(item instanceof TrackElement) {
      editor.removeElementFromTrack(item.getTrackId(), item);
    }
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
