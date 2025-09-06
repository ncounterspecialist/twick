import { useEffect, useState } from "react";
import { Wand2, Plus } from "lucide-react";
import { getMediaManager } from "../../shared";
import type { MediaItem } from "@twick/video-editor";
import { TrackElement, VideoElement } from "@twick/timeline";
import FileInput from "../../shared/file-input";
import SearchInput from "../../shared/search-input";

interface VideoLibraryProps {
  onAddToTimeline?: (item: TrackElement) => void;
}

export const VideoLibrary = ({
  onAddToTimeline,
}: VideoLibraryProps) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const mediaManager = getMediaManager();

  useEffect(() => {
    const loadItems = async () => {
      const results = await mediaManager.search({
        query: searchQuery,
        type: "video",
      });
      setItems(results);
    };
    loadItems();
  }, [searchQuery]);

  const handleAddElement = (item: MediaItem) => {
    const videoElement = new VideoElement(item.url, {
      width: 1280,
      height: 720,
    });
    onAddToTimeline?.(videoElement);
  };

  const handleFileUpload = async (fileData: {
    file: File;
    blobUrl: string;
  }) => {
    const arrayBuffer = await fileData.file.arrayBuffer();
    const newItem = await mediaManager.addItem({
      url: fileData.blobUrl,
      type: "video",
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
        <h3 className="text-lg font-bold text-gray-100 mb-4">Video Library</h3>
        {/* Search */}
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* Upload Button */}
        <FileInput id="video-upload" acceptFileTypes={["video/*"]} onFileLoad={handleFileUpload} buttonText="Upload" />
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3 auto-rows-fr">
          {items.map((item) => (
            <div
              key={item.id}
              onDoubleClick={() => handleAddElement(item)}
              className="media-item-compact group relative cursor-pointer overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
            >
              <video
                src={item.url}
                poster={item.thumbnail}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-20" />

              {/* Quick Actions */}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddElement(item);
                  }}
                  className="w-5 h-5 rounded-full bg-purple-500/80 hover:bg-purple-500 flex items-center justify-center text-white text-xs"
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
              <p className="text-sm font-medium">No Video found</p>
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
