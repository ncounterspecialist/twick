import {
  TrackElement,
  VideoElement,
  AudioElement,
  ImageElement,
  Size,
} from "@twick/timeline";
import type { MediaItem } from "@twick/video-editor";
import { getMediaManager } from "../components/shared";
import { useMedia } from "../context/media-context";

export interface MediaPanelState {
  items: MediaItem[];
  searchQuery: string;
  isLoading: boolean;
  acceptFileTypes: string[];
}

export interface MediaPanelActions {
  setSearchQuery: (query: string) => void;
  handleSelection: (item: MediaItem, forceAdd?: boolean) => void;
  handleFileUpload: (fileData: { file: File; blobUrl: string }) => void;
}

export type MediaType = "video" | "audio" | "image";

const mediaConfigs = {
  video: {
    acceptFileTypes: ["video/*"] as string[],
    createElement: (url: string, parentSize: Size) =>
      new VideoElement(url, parentSize),
    updateElement: async (element: TrackElement, url: string) => {
      if (element instanceof VideoElement) {
        element.setSrc(url);
        await element.updateVideoMeta();
      }
    },
  },
  audio: {
    acceptFileTypes: ["audio/*"] as string[],
    createElement: (url: string, _parentSize: Size) => new AudioElement(url),
    updateElement: async (element: TrackElement, url: string) => {
      if (element instanceof AudioElement) {
        element.setSrc(url);
        await element.updateAudioMeta();
      }
    },
  },
  image: {
    acceptFileTypes: ["image/*"] as string[],
    createElement: (url: string, parentSize: Size) =>
      new ImageElement(url, parentSize),
    updateElement: async (element: TrackElement, url: string) => {
      if (element instanceof ImageElement) {
        element.setSrc(url);
        await element.updateImageMeta();
      }
    },
  },
};

export const useMediaPanel = (
  type: MediaType,
  {
    selectedElement,
    addElement,
    updateElement,
  }: {
    selectedElement: TrackElement | null;
    addElement: (element: TrackElement) => void;
    updateElement: (element: TrackElement) => void;
  },
  videoResolution: Size
): MediaPanelState & MediaPanelActions => {
  const { items, searchQuery, setSearchQuery, addItem, isLoading } =
    useMedia(type);
  const mediaManager = getMediaManager();

  const handleSelection = async (item: MediaItem, forceAdd?: boolean) => {
    const config = mediaConfigs[type];
    if (forceAdd) {
      const element = config.createElement(item.url, videoResolution);
      addElement(element);
    } else {
      if (selectedElement) {
        await config.updateElement(selectedElement, item.url);
        updateElement(selectedElement);
      } else {
        const element = config.createElement(item.url, videoResolution);
        addElement(element);
      }
    }
  };

  const handleFileUpload = async (fileData: {
    file: File;
    blobUrl: string;
  }) => {
    const arrayBuffer = await fileData.file.arrayBuffer();
    const newItem = await mediaManager.addItem({
      name: fileData.file.name,
      url: fileData.blobUrl,
      type,
      arrayBuffer,
      metadata: {
        name: fileData.file.name,
        size: fileData.file.size,
        type: fileData.file.type,
      },
    });
    addItem(newItem);
  };

  const config = mediaConfigs[type];
  return {
    items,
    searchQuery,
    setSearchQuery,
    handleSelection,
    handleFileUpload,
    isLoading,
    acceptFileTypes: config.acceptFileTypes,
  };
};
