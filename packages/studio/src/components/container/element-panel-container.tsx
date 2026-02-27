import React from "react";
import { Size, TrackElement } from "@twick/timeline";
import type { StudioConfig, UploadConfig } from "../../types";
import { AudioPanelContainer } from "./audio-panel-container";
import { ImagePanelContainer } from "./image-panel-container";
import { VideoPanelContainer } from "./video-panel-container";
import { TextPanelContainer } from "./text-panel-container";
import { TextStylePanelContainer } from "./text-style-panel-container";
import { EffectStylePanelContainer } from "./effect-style-panel-container";
import { Wand2 } from "lucide-react";
import { CaptionsPanelContainer } from "./captions-panel-container";
import { GenerateMediaPanelContainer } from "./generate-media-panel-container";
import { TemplateGalleryPanel } from "../panel/template-gallery-panel";
import { RecordPanel } from "../panel/record-panel";
import { AnnotationsPanel } from "../panel/annotations-panel";
import { ChaptersPanel } from "../panel/chapters-panel";
import { ScriptPanel } from "../panel/script-panel";

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
  uploadConfig?: UploadConfig;
  studioConfig?: StudioConfig;
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
  setSelectedTool,
  uploadConfig,
  studioConfig,
}: ElementPanelContainerProps): React.ReactElement => {
  const addNewElement = async (element: TrackElement) => {
    await addElement(element);
  };

  // Render appropriate library based on selected tool
  const renderLibrary = () => {
    const CustomPanel = studioConfig?.customPanels?.[selectedTool];
    if (CustomPanel) {
      return (
        <CustomPanel
          selectedElement={selectedElement}
          videoResolution={videoResolution}
          addElement={addNewElement}
          updateElement={updateElement}
          uploadConfig={uploadConfig}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          studioConfig={studioConfig}
        />
      );
    }

    switch (selectedTool) {
      case "image":
        return (
          <ImagePanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
            uploadConfig={uploadConfig}
          />
        );
      case "audio":
        return (
          <AudioPanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
            uploadConfig={uploadConfig}
          />
        );
      case "video":
        return (
          <VideoPanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
            uploadConfig={uploadConfig}
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
      case "text-style":
        return (
          <TextStylePanelContainer
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
          />
        );
      case "effect":
        return (
          <EffectStylePanelContainer
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
          />
        );
      case "caption":
        return <CaptionsPanelContainer />;
      case "generate-media":
        return (
          <GenerateMediaPanelContainer
            videoResolution={videoResolution}
            selectedElement={selectedElement}
            addElement={addNewElement}
            updateElement={updateElement}
            studioConfig={studioConfig}
          />
        );
      case "templates":
        return <TemplateGalleryPanel studioConfig={studioConfig} />;
      case "record":
        return (
          <RecordPanel
            selectedElement={selectedElement}
            videoResolution={videoResolution}
            addElement={addNewElement}
            updateElement={updateElement}
            uploadConfig={uploadConfig}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            studioConfig={studioConfig}
          />
        );
      case "shape":
        return (
          <AnnotationsPanel
            selectedElement={selectedElement}
            videoResolution={videoResolution}
            addElement={addNewElement}
            updateElement={updateElement}
            uploadConfig={uploadConfig}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            studioConfig={studioConfig}
          />
        );
      case "chapters":
        return (
          <ChaptersPanel
            selectedElement={selectedElement}
            videoResolution={videoResolution}
            addElement={addNewElement}
            updateElement={updateElement}
            uploadConfig={uploadConfig}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            studioConfig={studioConfig}
          />
        );
      case "script":
        return (
          <ScriptPanel
            selectedElement={selectedElement}
            videoResolution={videoResolution}
            addElement={addNewElement}
            updateElement={updateElement}
            uploadConfig={uploadConfig}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            studioConfig={studioConfig}
          />
        );
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
