import React from "react";
import { Size, TrackElement } from "@twick/timeline";
import { AudioPanelContainer } from "./audio-panel-container";
import { ImagePanelContainer } from "./image-panel-container";
import { VideoPanelContainer } from "./video-panel-container";
import { TextPanelContainer } from "./text-panel-container";
import { IconPanelContainer } from "./icon-panel-container";
import { RectPanelContainer } from "./rect-panel-container";
import { CirclePanelContainer } from "./circle-panel-container";
import { Wand2 } from "lucide-react";
import { CaptionsPanelContainer } from "./captions-panel-container";

/**
 * Props interface for the ElementPanelContainer component.
 * Defines the configuration and callback functions for element management.
 */
interface ElementPanelContainerProps {
  selectedTool: string;
  selectedElement: TrackElement | null;
  videoResolution: Size;
  setSelectedTool: (tool: string) => void;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

/**
 * ElementPanelContainer component that renders the appropriate element panel
 * based on the currently selected tool. Provides a unified interface for
 * managing different types of timeline elements including media, text, shapes,
 * and captions. Shows an empty state when no tool is selected.
 *
 * @param props - Component props for element panel configuration
 * @returns JSX element containing the appropriate element panel or empty state
 * 
 * @example
 * ```tsx
 * <ElementPanelContainer
 *   selectedTool="text"
 *   selectedElement={currentElement}
 *   videoResolution={{ width: 1920, height: 1080 }}
 *   setSelectedTool={setTool}
 *   addElement={addToTimeline}
 *   updateElement={updateInTimeline}
 * />
 * ```
 */
const ElementPanelContainer = ({
  selectedTool,
  videoResolution,
  selectedElement,
  addElement,
  updateElement,
}: ElementPanelContainerProps): React.ReactElement => {
  const addNewElement = async (element: TrackElement) => {
    await addElement(element);
  };

  // Render appropriate library based on selected tool
  const renderLibrary = () => {
    switch (selectedTool) {
      case "image":
        return (
          <ImagePanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
          />
        );
      case "audio":
        return (
          <AudioPanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
          />
        );
      case "video":
        return (
          <VideoPanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
          />
        );
      case "text":
        return (
          <TextPanelContainer
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
          />
        );
      case "icon":
        return (
          <IconPanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
          />
        );
      case "rect":
        return (
          <RectPanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
          />
        );
      case "circle":
        return (
          <CirclePanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
          />
        );
      case "caption":
        return <CaptionsPanelContainer />;
      default:
        return (
          <div className="panel-container">
            <div className="empty-state">
              <div className="empty-state-content">
                <Wand2 className="empty-state-icon" />
                <p className="empty-state-text">Select an element from toolbar</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderLibrary();
};

export default ElementPanelContainer;
