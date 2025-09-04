import React, { useEffect, useState } from "react";
import { Upload, Search, Wand2, Plus } from "lucide-react";
import { getMediaManager } from "../../shared";
import type { MediaItem } from "@twick/video-editor";

interface ImageLibraryProps {
  onSelect?: (item: MediaItem) => void;
  onAddToTimeline?: (item: MediaItem) => void;
}

export const ImageLibrary: React.FC<ImageLibraryProps> = ({
  onSelect,
  onAddToTimeline,
}) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const mediaManager = getMediaManager();

  useEffect(() => {
    const loadItems = async () => {
      const results = await mediaManager.search({
        query: searchQuery,
        type: "image",
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

  return (
    <div className="w-72 bg-neutral-800/80 border-r border-gray-600/50 flex flex-col h-full backdrop-blur-md shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-600/50 flex-shrink-0">
        <h3 className="text-lg font-bold text-gray-100 mb-4">Media Library</h3>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-neutral-700/80 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm shadow-sm"
          />
        </div>

        {/* Upload Button */}
        <button className="w-full btn btn-primary flex items-center justify-center gap-2 py-2">
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3 auto-rows-fr">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              onDoubleClick={() => handleItemDoubleClick(item)}
              className="media-item-compact group relative cursor-pointer overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
            >
              <img
                src={item.url}
                alt=""
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-20" />

              {/* Quick Actions */}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="w-5 h-5 rounded-full bg-purple-500/80 hover:bg-purple-500 flex items-center justify-center text-white text-xs">
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
              <p className="text-sm font-medium">No image found</p>
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
