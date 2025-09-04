import React, { useEffect, useState } from "react";
import {
  Upload,
  Search,
  Wand2,
  Plus,
  Volume2,
  Play,
  Pause,
} from "lucide-react";
import { getMediaManager } from "../../shared";
import type { MediaItem } from "@twick/video-editor";

interface AudioLibraryProps {
  onSelect?: (item: MediaItem) => void;
  onAddToTimeline?: (item: MediaItem) => void;
}

export const AudioLibrary: React.FC<AudioLibraryProps> = ({
  onSelect,
  onAddToTimeline,
}) => {
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

  const handleItemClick = (item: MediaItem) => {
    onSelect?.(item);
  };

  const handleItemDoubleClick = (item: MediaItem) => {
    onAddToTimeline?.(item);
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



  return (
    <div className="w-72 bg-neutral-800/80 border-r border-gray-600/50 flex flex-col h-full backdrop-blur-md shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-600/50 flex-shrink-0">
        <h3 className="text-lg font-bold text-gray-100 mb-4">Audio Library</h3>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search audio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-neutral-700/80 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm shadow-sm"
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
              onClick={() => handleItemClick(item)}
              onDoubleClick={() => handleItemDoubleClick(item)}
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
                    onAddToTimeline?.(item);
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
