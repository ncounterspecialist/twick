import { Track, TrackElement, useTimelineContext } from "@twick/timeline";
import { useState } from "react";

export const useStudioManager = () => {
  const { editor, selectedItem, setSelectedItem } = useTimelineContext();

  const selectedElement = selectedItem instanceof TrackElement ? selectedItem : null;

  const [ selectedTool, setSelectedTool ] = useState<string>("video");

  const addElement = (element: TrackElement) => {
    if (selectedItem instanceof Track) {
      editor.addElementToTrack(selectedItem, element);
    } else {
      const newTrack = editor.addTrack("Track");
      editor.addElementToTrack(newTrack, element);
    }
  };

  const updateElement = (element: TrackElement) => {
    const updatedElement =editor.updateElement(element);
    editor.refresh();
    setSelectedItem(updatedElement)
  };

  // const addSubtitlesToTimeline = (elements: TrackElement[]) => {
  //   if (selectedItem instanceof Track && selectedItem.getType() == "caption") {
  //     elements.forEach((element) => {
  //       editor.addElementToTrack(selectedItem, element);
  //     });
  //   } else {
  //     const newTrack = editor.addTrack("Track", "caption");
  //     elements.forEach((element) => {
  //       editor.addElementToTrack(newTrack, element);
  //     });
  //   }
  // };


  return {
    selectedTool, 
    setSelectedTool,
    selectedElement,
    addElement,
    updateElement
  };
};

