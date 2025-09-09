import { SubtitlesPanel } from "../panel/subtitles-panel";
import { TrackElement } from "@twick/timeline";
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
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

const ElementPanelContainer = ({
  selectedTool,
  selectedElement,
  addElement,
  updateElement,
}: ElementPanelContainerProps): JSX.Element => {
  // Render appropriate library based on selected tool
  const renderLibrary = () => {
    switch (selectedTool) {
      case "image":
        return (
          <ImagePanelContainer
            selectedElement={selectedElement}
            addElement={addElement}
            updateElement={updateElement}
          />
        );
      case "audio":
        return (
          <AudioPanelContainer
            selectedElement={selectedElement}
            addElement={addElement}
            updateElement={updateElement}
          />
        );
      case "video":
        return (
          <VideoPanelContainer
            selectedElement={selectedElement}
            addElement={addElement}
            updateElement={updateElement}
          />
        );
      case "text":
        return (
          <TextPanelContainer
            selectedElement={selectedElement}
            addElement={addElement}
            updateElement={updateElement}
          />
        );
      case "icon":
        return (
          <IconPanelContainer
            selectedElement={selectedElement}
            addElement={addElement}
            updateElement={updateElement}
          />
        );
      case "rect":
        return (
          <RectPanelContainer
            selectedElement={selectedElement}
            addElement={addElement}
            updateElement={updateElement}
          />
        );
      case "circle":
        return (
          <CirclePanelContainer
            selectedElement={selectedElement}
            addElement={addElement}
            updateElement={updateElement}
          />
        );
      case "subtitle":
        return <SubtitlesPanel />;
      default:
        return (
          <div className="w-72 bg-neutral-800/80 border-r border-gray-600/50 flex flex-col h-full items-center justify-center">
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
