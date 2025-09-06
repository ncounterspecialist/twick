import { useEffect, useState } from "react";
import { Upload, Wand2, Plus } from "lucide-react";
import { getMediaManager } from "../../shared";
import type { MediaItem } from "@twick/video-editor";
import { ImageElement, useTimelineContext } from "@twick/timeline";
import SearchInput from "../../shared/search-input";
import FileInput from "../../shared/file-input";
import type { PanelProps } from "../../types";

export const ImagePanel = ({
  selectedElement,
  addElement,
  updateElement,
}: PanelProps) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const mediaManager = getMediaManager();
  const { videoResolution } = useTimelineContext();

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

  const handleSelection = (item: MediaItem) => {
    let imageElement;
    if (selectedElement instanceof ImageElement) {
      imageElement = selectedElement;
      imageElement.setSrc(item.url);
      updateElement?.(imageElement);
    } else {
      imageElement = new ImageElement(item.url, {
        width: videoResolution.width,
        height: videoResolution.height,
      });
      addElement?.(imageElement);
    }
  };

  const handleFileUpload = async (fileData: {
    file: File;
    blobUrl: string;
  }) => {
    const arrayBuffer = await fileData.file.arrayBuffer();
    const newItem = await mediaManager.addItem({
      url: fileData.blobUrl,
      type: "image",
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
        <h3 className="text-lg font-bold text-gray-100 mb-4">Media Library</h3>

        {/* Search */}
        <div className="relative mb-3">
          {/* Search */}
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* Upload Button */}
          <FileInput
            id="image-upload"
            acceptFileTypes={["image/*"]}
            onFileLoad={handleFileUpload}
            buttonText="Upload"
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
              onDoubleClick={() => handleSelection(item)}
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelection(item);
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
