import { ImagePanel } from "./panels/image-panel";
import { AudioPanel } from "./panels/audio-panel";
import { VideoPanel } from "./panels/video-panel";
import { TextPanel } from "./panels/text-panel";
import { SubtitlesPanel } from "./panels/subtitles-panel";
import IconPanel from "./panels/icon-panel";
import { RectPanel } from "./panels/rect-panel";
import { CirclePanel } from "./panels/circle-panel";
import { TrackElement } from "@twick/timeline";

interface ElementPanelProps {
  selectedTool: string; 
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

const ElementPanel = ({ selectedTool, selectedElement, addElement, updateElement }: ElementPanelProps): JSX.Element => {

  // Render appropriate library based on selected tool
  const renderLibrary = () => {
    switch (selectedTool) {
      case "image":
        return <ImagePanel selectedElement={selectedElement} addElement={addElement} updateElement={updateElement} />;
      case "audio":
        return <AudioPanel selectedElement={selectedElement} addElement={addElement} updateElement={updateElement} />;
      case "video":
        return <VideoPanel selectedElement={selectedElement} addElement={addElement} updateElement={updateElement} />;
      case "text":
        return <TextPanel selectedElement={selectedElement} addElement={addElement} updateElement={updateElement} />;
      case "icon":
        return <IconPanel selectedElement={selectedElement} addElement={addElement} updateElement={updateElement}/>;
      case "rect":
        return <RectPanel selectedElement={selectedElement} addElement={addElement} updateElement={updateElement}/>;
      case "circle":
        return <CirclePanel selectedElement={selectedElement} addElement={addElement} updateElement={updateElement}/>;
      case "subtitle":
        return <SubtitlesPanel/>;
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

export default ElementPanel;
