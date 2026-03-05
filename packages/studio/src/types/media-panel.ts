import type { MediaItem } from "@twick/video-editor";

export type MediaType = "video" | "audio" | "image";

export interface MediaPanelBasePropsCommon {
  items: MediaItem[];
  isLoading: boolean;
  acceptFileTypes: string[];
  onItemSelect: (item: MediaItem, forceAdd?: boolean) => void;
  onFileUpload: (fileData: { file: File; blobUrl: string }) => void;
  canLoadMore?: boolean;
  onLoadMore?: () => void;
}

export interface SearchablePanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface VideoPanelProps extends MediaPanelBasePropsCommon {
  onUrlAdd: (url: string) => void;
  showAddByUrl?: boolean;
}

export interface AudioPanelProps extends MediaPanelBasePropsCommon, SearchablePanelProps {
  onUrlAdd: (url: string) => void;
}
export interface ImagePanelProps extends MediaPanelBasePropsCommon, SearchablePanelProps {
  onUrlAdd: (url: string) => void;
  showAddByUrl?: boolean;
}
