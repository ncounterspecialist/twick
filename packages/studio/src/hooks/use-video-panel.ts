import { useEffect, useState } from "react";
import { VideoElement, TrackElement, useTimelineContext } from "@twick/timeline";
import type { MediaItem } from "@twick/video-editor";
import { getMediaManager } from "../components/shared";

export interface VideoPanelState {
  items: MediaItem[];
  searchQuery: string;
}

export interface VideoPanelActions {
  setSearchQuery: (query: string) => void;
  handleSelection: (item: MediaItem) => void;
  handleFileUpload: (fileData: { file: File; blobUrl: string }) => void;
}

export const useVideoPanel = ({
  selectedElement,
  addElement,
  updateElement,
}: {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}): VideoPanelState & VideoPanelActions => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const mediaManager = getMediaManager();
  const { videoResolution } = useTimelineContext();

  useEffect(() => {
    const loadItems = async () => {
      const results = await mediaManager.search({
        query: searchQuery,
        type: "video",
      });
      setItems(results);
    };
    loadItems();
  }, [searchQuery]);

  const handleSelection = async (item: MediaItem) => {
    let videoElement;
    if (selectedElement instanceof VideoElement) {
      videoElement = selectedElement;
      videoElement.setSrc(item.url);
      await videoElement.updateVideoMeta();
      updateElement?.(videoElement);
    } else {
      videoElement = new VideoElement(item.url, {
        width: videoResolution.width,
        height: videoResolution.height,
      });
      addElement?.(videoElement);
    }
  };

  const handleFileUpload = async (fileData: {
    file: File;
    blobUrl: string;
  }) => {
    const arrayBuffer = await fileData.file.arrayBuffer();
    const newItem = await mediaManager.addItem({
      url: fileData.blobUrl,
      type: "video",
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
