/**
 * ImagePanel Component
 * 
 * A panel for managing image elements in the studio. Provides functionality
 * for searching, uploading, previewing, and adding image files to the timeline.
 * Features a grid layout with image thumbnails and hover actions.
 * 
 * @component
 * @param {Object} props
 * @param {MediaItem[]} props.items - List of image items to display
 * @param {string} props.searchQuery - Current search query
 * @param {(query: string) => void} props.setSearchQuery - Handle search query changes
 * @param {(item: MediaItem) => void} props.handleSelection - Handle image item selection
 * @param {(data: { file: File; blobUrl: string }) => void} props.handleFileUpload - Handle file uploads
 * 
 * @example
 * ```tsx
 * <ImagePanel
 *   items={imageItems}
 *   searchQuery=""
 *   setSearchQuery={setSearchQuery}
 *   handleSelection={handleSelect}
 *   handleFileUpload={handleUpload}
 * />
 * ```
 */

import { Wand2, Plus } from "lucide-react";
import type { MediaItem } from "@twick/video-editor";
import type { ImagePanelProps } from "../../types/media-panel";
import SearchInput from "../shared/search-input";
import FileInput from "../shared/file-input";
import { inputStyles } from "../../styles/input-styles";


export function ImagePanel({
  items,
  searchQuery,
  onSearchChange,
  onItemSelect,
  onFileUpload,
  acceptFileTypes,
}: ImagePanelProps) {
  return (
    <div className={inputStyles.panel.container}>
      <h3 className={inputStyles.panel.title}>Image Library</h3>

      {/* Search */}
      <div className={inputStyles.container}>
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={onSearchChange}
        />
      </div>

      {/* Upload */}
      <div className={`${inputStyles.container} mb-8`}>
        <FileInput
          id="image-upload"
          acceptFileTypes={acceptFileTypes}
          onFileLoad={onFileUpload}
          buttonText="Upload"
        />
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 auto-rows-fr">
          {(items || []).map((item: MediaItem) => (
            <div
              key={item.id}
              onDoubleClick={() => onItemSelect(item)}
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
                    onItemSelect(item, true);
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
          <div className={`${inputStyles.container} flex items-center justify-center h-24`}>
            <div className="text-center">
              <Wand2 className="w-10 h-10 mx-auto mb-2 text-purple-500/50" />
              <p className={inputStyles.label.base}>No images found</p>
              {searchQuery && (
                <p className={inputStyles.label.small}>
                  Try adjusting your search
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}