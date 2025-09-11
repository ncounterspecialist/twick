import type { PanelProps } from "../../types";
import { VideoPanel } from "../panel/video-panel";
import { useMediaPanel } from "../../hooks/use-media-panel";

export function VideoPanelContainer(props: PanelProps) {
  const {
    items,
    searchQuery,
    setSearchQuery,
    handleSelection,
    handleFileUpload,
    isLoading,
    acceptFileTypes,
  } = useMediaPanel("video", {
    selectedElement: props.selectedElement ?? null,
    addElement: props.addElement!,
    updateElement: props.updateElement!,
  },
  props.videoResolution);

  return (
    <VideoPanel
      items={items}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onItemSelect={handleSelection}
      onFileUpload={handleFileUpload}
      isLoading={isLoading}
      acceptFileTypes={acceptFileTypes}
    />
  );
}
