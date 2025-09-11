import { useMediaPanel } from "../../hooks/use-media-panel";
import { AudioPanel } from "../panel/audio-panel";
import type { PanelProps } from "../../types";

export const AudioPanelContainer = (props: PanelProps) => {
  const {
    items,
    searchQuery,
    setSearchQuery,
    handleSelection,
    handleFileUpload,
    isLoading,
    acceptFileTypes,
  } = useMediaPanel("audio", {
    selectedElement: props.selectedElement ?? null,
    addElement: props.addElement!,
    updateElement: props.updateElement!,
  },
  props.videoResolution);

  return (
    <AudioPanel
      items={items}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onItemSelect={handleSelection}
      onFileUpload={handleFileUpload}
      isLoading={isLoading}
      acceptFileTypes={acceptFileTypes}
    />
  );
};
