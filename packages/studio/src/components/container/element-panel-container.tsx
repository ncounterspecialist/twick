import { SubtitlesPanel } from "../panel/subtitles-panel";
import { Size, TrackElement } from "@twick/timeline";
import { AudioPanelContainer } from "./audio-panel-container";
import { ImagePanelContainer } from "./image-panel-container";
import { VideoPanelContainer } from "./video-panel-container";
import { TextPanelContainer } from "./text-panel-container";
import { IconPanelContainer } from "./icon-panel-container";
import { RectPanelContainer } from "./rect-panel-container";
import { CirclePanelContainer } from "./circle-panel-container";

interface ElementPanelContainerProps {
  selectedTool: string;
  selectedElement: TrackElement | null;
  videoResolution: Size;
  setSelectedTool: (tool: string) => void;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

const ElementPanelContainer = ({
  selectedTool,
  setSelectedTool,
  videoResolution,
  selectedElement,
  addElement,
  updateElement,
}: ElementPanelContainerProps): JSX.Element => {
  const addNewElement = async (element: TrackElement) => {
    await addElement(element);
    if (!["image", "video", "audio"].includes(selectedTool)) {
      setSelectedTool("none");
    }
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
      case "subtitle":
        return <SubtitlesPanel />;
      default:
        return (
          <div className="w-72 h-full bg-neutral-800/80 border-r border-gray-600/50 flex flex-col items-center justify-center">
            <div className="text-center text-gray-400">
              <p>Select a tool to view library</p>
              <p className="text-sm mt-2">Choose photo, audio, or video</p>
            </div>
          </div>
        );
    }
  };

  return renderLibrary();
};

export default ElementPanelContainer;
