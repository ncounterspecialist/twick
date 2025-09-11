import type { MediaItem } from "@twick/video-editor";

export type MediaType = "video" | "audio" | "image";

export interface MediaPanelBaseProps {
  items: MediaItem[];
  searchQuery: string;
  isLoading: boolean;
  acceptFileTypes: string[];
  onSearchChange: (query: string) => void;
  onItemSelect: (item: MediaItem, forceAdd?: boolean) => void;
  onFileUpload: (fileData: { file: File; blobUrl: string }) => void;
}

export interface VideoPanelProps extends MediaPanelBaseProps {}
export interface AudioPanelProps extends MediaPanelBaseProps {}
export interface ImagePanelProps extends MediaPanelBaseProps {}
