import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import type { MediaItem } from "@twick/video-editor";
import type { BaseMediaManager } from "@twick/video-editor";
import { getMediaManager, initializeDefaultVideos, removeDefaultDemoMediaItems } from "../components/shared";
import type { StudioConfig } from "../types";

type MediaType = "video" | "audio" | "image";

interface MediaState {
  items: MediaItem[];
  searchQuery: string;
  isLoading: boolean;
}

interface MediaContextType {
  mediaManager: BaseMediaManager;
  videoState: MediaState;
  audioState: MediaState;
  imageState: MediaState;
  setSearchQuery: (type: MediaType, query: string) => void;
  addItem: (type: MediaType, item: MediaItem) => void;
  removeItem: (type: MediaType, id: string) => void;
}

const initialMediaState: MediaState = {
  items: [],
  searchQuery: "",
  isLoading: false,
};

const MediaContext = createContext<MediaContextType | null>(null);

export function MediaProvider({
  children,
  studioConfig,
}: {
  children: ReactNode;
  studioConfig?: StudioConfig;
}) {
  const [videoState, setVideoState] = useState<MediaState>(initialMediaState);
  const [audioState, setAudioState] = useState<MediaState>(initialMediaState);
  const [imageState, setImageState] = useState<MediaState>(initialMediaState);
  const mediaManager = useMemo(() => {
    const namespace = studioConfig?.media?.namespace;
    return getMediaManager({
      namespace,
      manager: studioConfig?.media?.manager,
      createManager: studioConfig?.media?.createManager,
    });
  }, [
    studioConfig?.media?.namespace,
    studioConfig?.media?.manager,
    studioConfig?.media?.createManager,
  ]);

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

  const makeSeedKey = (
    seed: NonNullable<NonNullable<StudioConfig["media"]>["seed"]> | undefined,
  ): string => {
    if (!seed) return "defaults";
    if (seed === "defaults" || seed === "none") return seed;
    if (typeof seed === "function") return "customFn";
    if (typeof seed === "object" && Array.isArray(seed.items)) {
      // Stable key across renders for identical item lists (order-insensitive).
      const parts = seed.items.map((i) => `${i.type}::${i.url}`).sort();
      return `items:${parts.join("|")}`;
    }
    return "unknown";
  };

  const lastInitKeyRef = useRef<string | null>(null);
  const initPromiseRef = useRef<Promise<void> | null>(null);

  const seedItemsOnce = async (items: Omit<MediaItem, "id">[]) => {
    if (items.length === 0) return;

    // Make fixed-list seeding idempotent across refreshes.
    // We de-dupe by URL within each type to avoid inserting duplicates repeatedly.
    const types = Array.from(new Set(items.map((i) => i.type))).filter(Boolean);
    await Promise.all(
      types.map(async (type) => {
        const existing = await mediaManager.search({ type, query: "" });
        const existingUrls = new Set(existing.map((x) => x.url));
        const toAdd = items.filter((i) => i.type === type && !existingUrls.has(i.url));
        if (toAdd.length > 0) {
          await mediaManager.addItems(toAdd);
        }
      }),
    );
  };

  // Initialize default videos and load initial data for each type
  useEffect(() => {
    const seed = studioConfig?.media?.seed ?? "defaults";
    const namespace = studioConfig?.media?.namespace ?? "default";
    const initKey = `${namespace}::${makeSeedKey(seed)}`;

    if (lastInitKeyRef.current === initKey) {
      return;
    }
    lastInitKeyRef.current = initKey;

    const initialize = async () => {
      if (seed === "defaults") {
        await initializeDefaultVideos({
          namespace: studioConfig?.media?.namespace,
          manager: mediaManager,
        });
      } else if (seed === "none") {
        // Do not seed defaults. Also remove any previously persisted demo defaults
        // (by URL) so the media list does not show them for this namespace.
        await removeDefaultDemoMediaItems(mediaManager);
      } else if (typeof seed === "function") {
        await seed(mediaManager);
      } else if (seed && typeof seed === "object" && Array.isArray(seed.items)) {
        // Treat fixed-list seeding as "custom defaults": remove Twick demo defaults
        // (if present from a prior run) and then seed the provided list idempotently.
        await removeDefaultDemoMediaItems(mediaManager);
        await seedItemsOnce(seed.items);
      }
      // Then load all media items
      loadItems("video", "");
      loadItems("audio", "");
      loadItems("image", "");
    };

    // Serialize init to avoid races (check-then-add) across rapid rerenders.
    const run = async () => {
      if (initPromiseRef.current) {
        await initPromiseRef.current;
        return;
      }
      initPromiseRef.current = initialize().finally(() => {
        initPromiseRef.current = null;
      });
      await initPromiseRef.current;
    };

    void run();
  }, [mediaManager, studioConfig?.media?.namespace, studioConfig?.media?.seed]);

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

  const removeItem = (type: MediaType, id: string) => {
    const [state, setState] = getStateAndSetter(type);
    setState({
      ...state,
      items: state.items.filter((i) => i.id !== id),
    });
  };

  return (
    <MediaContext.Provider
      value={{
        mediaManager,
        videoState,
        audioState,
        imageState,
        setSearchQuery,
        addItem,
        removeItem,
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
    mediaManager: context.mediaManager,
    setSearchQuery: (query: string) => context.setSearchQuery(type, query),
    addItem: (item: MediaItem) => context.addItem(type, item),
    removeItem: (id: string) => context.removeItem(type, id),
  };
}

export function useMediaManager(): BaseMediaManager {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMediaManager must be used within a MediaProvider");
  }
  return context.mediaManager;
}
