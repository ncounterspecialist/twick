import { useEffect, useState } from "react";
import { ImageElement, TrackElement, useTimelineContext } from "@twick/timeline";
import type { MediaItem } from "@twick/video-editor";
import { getMediaManager } from "../components/shared";

export interface ImagePanelState {
  items: MediaItem[];
  searchQuery: string;
}

export interface ImagePanelActions {
  setSearchQuery: (query: string) => void;
  handleSelection: (item: MediaItem) => void;
  handleFileUpload: (fileData: { file: File; blobUrl: string }) => void;
}

export const useImagePanel = ({
  selectedElement,
  addElement,
  updateElement,
}: {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}): ImagePanelState & ImagePanelActions => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const mediaManager = getMediaManager();
  const { videoResolution } = useTimelineContext();

  useEffect(() => {
    const loadItems = async () => {
      const results = await mediaManager.search({
        query: searchQuery,
        type: "image",
      });
      setItems(results);
    };
    loadItems();
  }, [searchQuery]);

  const handleSelection = (item: MediaItem) => {
    let imageElement;
    if (selectedElement instanceof ImageElement) {
      imageElement = selectedElement;
      imageElement.setSrc(item.url);
      updateElement?.(imageElement);
    } else {
      imageElement = new ImageElement(item.url, {
        width: videoResolution.width,
        height: videoResolution.height,
      });
      addElement?.(imageElement);
    }
  };

  const handleFileUpload = async (fileData: {
    file: File;
    blobUrl: string;
  }) => {
    const arrayBuffer = await fileData.file.arrayBuffer();
    const newItem = await mediaManager.addItem({
      url: fileData.blobUrl,
      type: "image",
      arrayBuffer,
      metadata: {
        name: fileData.file.name,
        size: fileData.file.size,
        type: fileData.file.type,
      },
    });
    setItems((prev) => [...prev, newItem]);
  };

  return {
    items,
    searchQuery,
    setSearchQuery,
    handleSelection,
    handleFileUpload,
  };
};
