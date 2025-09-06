import { useEffect, useState } from "react";
import { Upload, Wand2, Plus, Volume2, Play, Pause } from "lucide-react";
import { getMediaManager } from "../../shared";
import type { MediaItem } from "@twick/video-editor";
import { AudioElement } from "@twick/timeline";
import SearchInput from "../../shared/search-input";
import FileInput from "../../shared/file-input";
import type { PanelProps } from "../../types";

export const AudioPanel = ({ selectedElement, addElement, updateElement }: PanelProps) => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

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

  return (
    <div className="w-72 bg-neutral-800/80 border-r border-gray-600/50 flex flex-col h-full backdrop-blur-md shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-600/50 flex-shrink-0">
        <h3 className="text-lg font-bold text-gray-100 mb-4">Audio Library</h3>

        {/* Search */}
        <div className="relative mb-3">
          {/* Search */}
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* Upload Button */}
          <FileInput
            id="audio-upload"
            acceptFileTypes={["audio/*"]}
            onFileLoad={handleFileUpload}
            buttonText="Upload"
          />
        </div>

        {/* Upload Button */}
        <button className="w-full btn btn-primary flex items-center justify-center gap-2 py-2">
          <Upload className="w-4 h-4" />
          Upload Audio
        </button>
      </div>

      {/* Audio List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              onDoubleClick={() => handleSelection(item)}
              className="audio-item group relative cursor-pointer p-3 bg-neutral-700/50 rounded-lg hover:bg-neutral-700/80 transition-all duration-200 border border-transparent hover:border-purple-500/30"
            >
              {/* Audio Info */}
              <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause(item);
                  }}
                  className="w-8 h-8 rounded-full bg-purple-500/80 hover:bg-purple-500 flex items-center justify-center text-white transition-all duration-200 flex-shrink-0"
                >
                  {playingAudio === item.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>

                {/* Audio Icon */}
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-5 h-5 text-purple-400" />
                </div>

                {/* Audio Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-100 truncate">
                    {item.metadata?.title}
                  </h4>
                </div>

                {/* Quick Add Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelection(item);
                  }}
                  className="w-6 h-6 rounded-full bg-purple-500/60 hover:bg-purple-500 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex items-center justify-center h-24 text-gray-400">
            <div className="text-center">
              <Wand2 className="w-10 h-10 mx-auto mb-2 text-purple-500/50" />
              <p className="text-sm font-medium">No audio files found</p>
              {searchQuery && (
                <p className="text-xs text-gray-500 mt-1">
                  Try adjusting your search
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
