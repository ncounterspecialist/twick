import { useStudioContext } from "../context/studio-context";
import { ImageLibrary } from "./image-library";
import { AudioLibrary } from "./audio-library";
import { VideoLibrary } from "./video-library";
import type { MediaItem } from "@twick/video-editor";
import { TextPanel } from "./text-panel";
import { SubtitlesPanel } from "./subtitles-panel";

const ElementPanel = () => {
  const { state } = useStudioContext();

  // Handler functions for media selection and timeline addition
  const handleMediaSelect = (item: MediaItem) => {
    // Handle media selection - could update selected media in state
    console.log("Selected media:", item);
  };

  const handleAddToTimeline = (item: MediaItem) => {
    // Handle adding media to timeline - could dispatch an action
    console.log("Adding to timeline:", item);
  };

  // Render appropriate library based on selected tool
  const renderLibrary = () => {
    switch (state.selectedTool) {
      case "image":
        return (
          <ImageLibrary
            onSelect={handleMediaSelect}
            onAddToTimeline={handleAddToTimeline}
          />
        );
      case "audio":
        return (
          <AudioLibrary
            onSelect={handleMediaSelect}
            onAddToTimeline={handleAddToTimeline}
          />
        );
      case "video":
        return (
          <VideoLibrary
            onSelect={handleMediaSelect}
            onAddToTimeline={handleAddToTimeline}
          />
        );
      case "text":
        return <TextPanel />;
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

export default ElementPanel;
