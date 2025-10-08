import { useMediaPanel } from "../../hooks/use-media-panel";
import { AudioPanel } from "../panel/audio-panel";
import type { PanelProps } from "../../types";
import { useMedia } from "../../context/media-context";
import { getMediaManager } from "../shared";

export const AudioPanelContainer = (props: PanelProps) => {
  const { addItem } = useMedia("audio");
  const mediaManager = getMediaManager();
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

  const onUrlAdd = async (url: string) => {
    const nameFromUrl = (() => {
      try {
        const u = new URL(url);
        const parts = u.pathname.split("/").filter(Boolean);
        return decodeURIComponent(parts[parts.length - 1] || url);
      } catch {
        return url;
      }
    })();

    const newItem = await mediaManager.addItem({
      name: nameFromUrl,
      url,
      type: "audio",
      metadata: { source: "url" },
    });
    addItem(newItem);
  };

  return (
    <AudioPanel
      items={items}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onItemSelect={handleSelection}
      onFileUpload={handleFileUpload}
      isLoading={isLoading}
      acceptFileTypes={acceptFileTypes}
      onUrlAdd={onUrlAdd}
    />
  );
};
