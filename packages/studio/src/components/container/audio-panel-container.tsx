import { useAudioPanel } from "../../hooks/use-audio-panel";
import { AudioPanel } from "../panel/audio-panel";
import type { PanelProps } from "../../types";

export const AudioPanelContainer = (props: PanelProps) => {
  const {
    items,
    searchQuery,
    setSearchQuery,
    playingAudio,
    handleSelection,
    handlePlayPause,
    handleFileUpload,
  } = useAudioPanel(props);

  return (
    <AudioPanel
      items={items}
      searchQuery={searchQuery}
      playingAudio={playingAudio}
      onSearchChange={setSearchQuery}
      onItemSelect={handleSelection}
      onPlayPause={handlePlayPause}
      onFileUpload={handleFileUpload}
    />
  );
};
