import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { MediaItem } from "@twick/video-editor";
import { getMediaManager } from "../components/shared";

interface VideoPanelContextType {
  items: MediaItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addItem: (item: MediaItem) => void;
  isLoading: boolean;
}

const VideoPanelContext = createContext<VideoPanelContextType | null>(null);

export function VideoPanelProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const mediaManager = getMediaManager();

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      try {
        const results = await mediaManager.search({
          query: searchQuery,
          type: "video",
        });
        setItems(results);
      } finally {
        setIsLoading(false);
      }
    };
    loadItems();
  }, [searchQuery]);

  const addItem = (newItem: MediaItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <VideoPanelContext.Provider
      value={{
        items,
        searchQuery,
        setSearchQuery,
        addItem,
        isLoading
      }}
    >
      {children}
    </VideoPanelContext.Provider>
  );
}

export function useVideoPanel() {
  const context = useContext(VideoPanelContext);
  if (!context) {
    throw new Error("useVideoPanel must be used within a VideoPanelProvider");
  }
  return context;
}
