import React, { useState } from "react";
import { Music } from "lucide-react";
import type { MediaItem } from "../types";

interface MediaLibraryProps {
  mediaItems: MediaItem[];
  onSelect?: (item: MediaItem) => void;
  onAddToTimeline?: (item: MediaItem) => void;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({
  mediaItems,
  onSelect,
  onAddToTimeline,
}) => {
  const [showOnlyImages, setShowOnlyImages] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mediaItems.filter((item) => {
    const matchesType = !showOnlyImages || item.type === "image";
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleItemClick = (item: MediaItem) => {
    onSelect?.(item);
  };

  const handleItemDoubleClick = (item: MediaItem) => {
    onAddToTimeline?.(item);
  };

  return (
    <div className="w-72 bg-gray-900 border-l border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <h3 className="text-lg font-semibold text-white mb-4">Media Library</h3>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Filter */}
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={showOnlyImages}
            onChange={(e) => setShowOnlyImages(e.target.checked)}
            className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-800"
          />
          <span>Show only images</span>
        </label>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3 auto-rows-fr">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              onDoubleClick={() => handleItemDoubleClick(item)}
              className="group relative w-full h-24 cursor-pointer overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all duration-200"
            >
              {item.type === "audio" && (
                <div className="flex flex-col items-center justify-center h-full w-full bg-gray-700 transition-transform group-hover:scale-105">
                  <Music className="w-6 h-6 text-gray-400" />
                  <span className="text-white text-xs px-2 text-center mt-1 truncate w-full">
                    {item.name}
                  </span>
                </div>
              )}
              {item.type === "video" && (
                <video
                  src={item.url}
                  poster={item.thumbnail}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              )}
              {item.type === "image" && (
                <img
                  src={item.url}
                  alt=""
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-20" />

              {/* Type indicator */}
              <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                {item.type}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <div className="text-center">
              <Music className="w-12 h-12 mx-auto mb-2 text-gray-600" />
              <p className="text-sm">No media files found</p>
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
