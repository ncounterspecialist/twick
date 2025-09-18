/**
 * useStudioManager Hook
 * 
 * A custom hook that manages the studio's state and operations.
 * Handles tool selection, element management, and timeline interactions.
 * 
 * @returns {Object} Studio manager methods and state
 * @property {string} selectedTool - Currently selected tool ID
 * @property {(tool: string) => void} setSelectedTool - Update selected tool
 * @property {TrackElement | null} selectedElement - Currently selected timeline element
 * @property {(element: TrackElement) => void} addElement - Add element to timeline
 * @property {(element: TrackElement) => void} updateElement - Update existing element
 * 
 * @example
 * ```tsx
 * const {
 *   selectedTool,
 *   setSelectedTool,
 *   selectedElement,
 *   addElement,
 *   updateElement
 * } = useStudioManager();
 * ```
 */

import { Track, TrackElement, useTimelineContext } from "@twick/timeline";
import { useEffect, useRef, useState } from "react";

export const useStudioManager = () => {
  const [selectedProp, setSelectedProp] = useState("element-props");

  const { editor, selectedItem, setSelectedItem } = useTimelineContext();

  const selectedElement = selectedItem instanceof TrackElement ? selectedItem : null;

  const [ selectedTool, setSelectedTool ] = useState<string>("none");

  const isToolChanged = useRef(false);

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

  useEffect(() => {
    if (selectedItem  instanceof TrackElement) {
      setSelectedTool(selectedItem.getType());
      isToolChanged.current = true;
    } else if(selectedItem instanceof Track) {
      // do-nothing
    } else {
      if(isToolChanged.current) {
        setSelectedTool("none");
      } else {
        setSelectedTool("video");
      }
    }
  }, [selectedItem]);


  return {
    selectedProp, 
    setSelectedProp,
    selectedTool, 
    setSelectedTool,
    selectedElement,
    addElement,
    updateElement
  };
};

