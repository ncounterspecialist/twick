import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { MediaItem } from "@twick/video-editor";
import { getMediaManager, initializeDefaultVideos } from "../components/shared";

type MediaType = "video" | "audio" | "image";

interface MediaState {
  items: MediaItem[];
  searchQuery: string;
  isLoading: boolean;
}

interface MediaContextType {
  videoState: MediaState;
  audioState: MediaState;
  imageState: MediaState;
  setSearchQuery: (type: MediaType, query: string) => void;
  addItem: (type: MediaType, item: MediaItem) => void;
}

const initialMediaState: MediaState = {
  items: [],
  searchQuery: "",
  isLoading: false,
};

const MediaContext = createContext<MediaContextType | null>(null);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [videoState, setVideoState] = useState<MediaState>(initialMediaState);
  const [audioState, setAudioState] = useState<MediaState>(initialMediaState);
  const [imageState, setImageState] = useState<MediaState>(initialMediaState);
  const mediaManager = getMediaManager();

  const getStateAndSetter = (type: MediaType): [MediaState, (state: MediaState) => void] => {
    switch (type) {
      case "video":
        return [videoState, setVideoState];
      case "audio":
        return [audioState, setAudioState];
      case "image":
        return [imageState, setImageState];
    }
  };

  const loadItems = async (type: MediaType, query: string) => {
    const [state, setState] = getStateAndSetter(type);
    
    setState({ ...state, isLoading: true });
    try {
      const results = await mediaManager.search({
        query,
        type,
      });
      setState({
        items: results,
        searchQuery: query,
        isLoading: false,
      });
    } catch (error) {
      console.error(`Error loading ${type} items:`, error);
      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  // Initialize default videos and load initial data for each type
  useEffect(() => {
    const initialize = async () => {
      // Initialize default videos first
      await initializeDefaultVideos();
      // Then load all media items
      loadItems("video", "");
      loadItems("audio", "");
      loadItems("image", "");
    };
    initialize();
  }, []);

  const setSearchQuery = (type: MediaType, query: string) => {
    const [state, setState] = getStateAndSetter(type);
    setState({ ...state, searchQuery: query });
    loadItems(type, query);
  };

  const addItem = (type: MediaType, newItem: MediaItem) => {
    const [state, setState] = getStateAndSetter(type);
    setState({
      ...state,
      items: [...state.items, newItem],
    });
  };

  return (
    <MediaContext.Provider
      value={{
        videoState,
        audioState,
        imageState,
        setSearchQuery,
        addItem,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia(type: MediaType) {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }

  const state = context[`${type}State`];
  return {
    items: state.items,
    searchQuery: state.searchQuery,
    isLoading: state.isLoading,
    setSearchQuery: (query: string) => context.setSearchQuery(type, query),
    addItem: (item: MediaItem) => context.addItem(type, item),
  };
}
