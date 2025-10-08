import type { PanelProps } from "../../types";
import { ImagePanel } from "../panel/image-panel";
import { useMediaPanel } from "../../hooks/use-media-panel";
import { useMedia } from "../../context/media-context";
import { getMediaManager } from "../shared";

export function ImagePanelContainer(props: PanelProps) {
  const { addItem } = useMedia("image");
  const mediaManager = getMediaManager();
  const {
    items,
    searchQuery,
    setSearchQuery,
    handleSelection,
    handleFileUpload,
    isLoading,
    acceptFileTypes,
  } = useMediaPanel("image", {
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
      type: "image",
      metadata: { source: "url" },
    });
    addItem(newItem);
  };

  return (
    <ImagePanel
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
}
