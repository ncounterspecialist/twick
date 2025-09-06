import { ImageLibrary } from "./media-library/image-library";
import { AudioLibrary } from "./media-library/audio-library";
import { VideoLibrary } from "./media-library/video-library";
import { TextPanel } from "./panels/text-panel";
import { SubtitlesPanel } from "./panels/subtitles-panel";
import IconPanel from "./panels/icon-panel";
import { RectPanel } from "./panels/rect-panel";
import { CirclePanel } from "./panels/circle-panel";
import { TrackElement } from "@twick/timeline";

interface ElementPanelProps {
  selectedTool: string;
  addElement: (element: TrackElement) => void;
}

const ElementPanel = ({ selectedTool, addElement }: ElementPanelProps): JSX.Element => {

  // Render appropriate library based on selected tool
  const renderLibrary = () => {
    switch (selectedTool) {
      case "image":
        return <ImageLibrary onAddToTimeline={addElement} />;
      case "audio":
        return <AudioLibrary onAddToTimeline={addElement} />;
      case "video":
        return <VideoLibrary onAddToTimeline={addElement} />;
      case "text":
        return <TextPanel onAddToTimeline={addElement} />;
      case "icon":
        return <IconPanel onAddToTimeline={addElement}/>;
      case "rect":
        return <RectPanel onAddToTimeline={addElement}/>;
      case "circle":
        return <CirclePanel onAddToTimeline={addElement}/>;
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
