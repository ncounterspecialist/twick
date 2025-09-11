/**
 * VideoPanel Component
 * 
 * A panel for managing video elements in the studio. Provides functionality
 * for searching, uploading, previewing, and adding video files to the timeline.
 * Features a grid layout with video thumbnails and hover actions.
 * 
 * @component
 * @param {Object} props
 * @param {MediaItem[]} props.items - List of video items to display
 * @param {string} props.searchQuery - Current search query
 * @param {(query: string) => void} props.setSearchQuery - Handle search query changes
 * @param {(item: MediaItem) => void} props.handleSelection - Handle video item selection
 * @param {(data: { file: File; blobUrl: string }) => void} props.handleFileUpload - Handle file uploads
 * 
 * @example
 * ```tsx
 * <VideoPanel
 *   items={videoItems}
 *   searchQuery=""
 *   setSearchQuery={setSearchQuery}
 *   handleSelection={handleSelect}
 *   handleFileUpload={handleUpload}
 * />
 * ```
 */

import { Wand2, Plus, Play, Pause } from "lucide-react";
import type { MediaItem } from "@twick/video-editor";
import type { VideoPanelProps } from "../../types/media-panel";
import FileInput from "../shared/file-input";
import SearchInput from "../shared/search-input";
import { inputStyles } from "../../styles/input-styles";
import { useVideoPreview } from "../../hooks/use-video-preview";


export function VideoPanel({
  items,
  searchQuery,
  onSearchChange,
  onItemSelect,
  onFileUpload,
  acceptFileTypes,
}: VideoPanelProps) {
  const { playingVideo, togglePlayPause } = useVideoPreview();
  return (
    <div className={inputStyles.panel.container}>
      <h3 className={inputStyles.panel.title}>Video Library</h3>

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
          id="video-upload"
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
              <video
                src={item.url}
                poster={item.thumbnail}
                className={`h-full w-full object-cover transition-transform ${playingVideo === item.id ? 'scale-105' : 'group-hover:scale-105'}`}
                ref={(el) => {
                  // Add ended event listener to handle playback completion
                  if (el) {
                    el.addEventListener('ended', () => {
                      el.currentTime = 0;
                    }, { once: true });
                  }
                }}
              />

              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-black transition-opacity ${playingVideo === item.id ? 'bg-opacity-30' : 'bg-opacity-0 group-hover:bg-opacity-20'}`} />

              {/* Quick Actions */}
              <div className="absolute top-1 right-1 flex gap-2">
                {/* Play/Pause Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const videoEl = e.currentTarget.parentElement?.parentElement?.querySelector('video');
                    if (videoEl) {
                      togglePlayPause(item, videoEl);
                    }
                  }}
                  className={`w-6 h-6 rounded-full bg-purple-500/80 hover:bg-purple-500 flex items-center justify-center text-white text-xs ${playingVideo === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-200`}
                >
                  {playingVideo === item.id ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </button>

                {/* Add Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemSelect(item, true);
                  }}
                  className="w-6 h-6 rounded-full bg-purple-500/80 hover:bg-purple-500 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
              <p className={inputStyles.label.base}>No videos found</p>
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