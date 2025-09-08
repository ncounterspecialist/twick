import { useEffect, useState } from "react";
import { getMediaManager } from "../components/shared";
import type { MediaItem } from "@twick/video-editor";
import { AudioElement } from "@twick/timeline";
import type { PanelProps } from "../types";

export const useAudioPanel = ({ selectedElement, addElement, updateElement }: PanelProps) => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const mediaManager = getMediaManager();

  useEffect(() => {
    const loadItems = async () => {
      const results = await mediaManager.search({
        query: searchQuery,
        type: "audio",
      });
      setItems(results);
    };
    loadItems();
  }, [searchQuery]);

  const handleSelection = async (item: MediaItem) => {
    let audioElement;
    if(selectedElement instanceof AudioElement) {
      audioElement = selectedElement;
      audioElement.setSrc(item.url);
      await audioElement.updateAudioMeta();
      updateElement?.(audioElement);
    } else {
      audioElement = new AudioElement(item.url);
      addElement?.(audioElement);
    }
  };

  const handlePlayPause = (item: MediaItem) => {
    if (playingAudio === item.id) {
      // Stop current audio
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      setPlayingAudio(null);
      setAudioElement(null);
    } else {
      // Stop any currently playing audio
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }

      // Start new audio
      const audio = new Audio(item.url);
      audio.play();
      setPlayingAudio(item.id);
      setAudioElement(audio);

      // Clean up when audio ends
      audio.onended = () => {
        setPlayingAudio(null);
        setAudioElement(null);
      };
    }
  };

  const handleFileUpload = async (fileData: {
    file: File;
    blobUrl: string;
  }) => {
    const arrayBuffer = await fileData.file.arrayBuffer();
    const newItem = await mediaManager.addItem({
      url: fileData.blobUrl,
      type: "audio",
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
    playingAudio,
    handleSelection,
    handlePlayPause,
    handleFileUpload,
  };
};
