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

import { Wand2, Plus, Play, Pause, Upload } from "lucide-react";
import type { MediaItem } from "@twick/video-editor";
import type { VideoPanelProps } from "../../types/media-panel";
import { useVideoPreview } from "../../hooks/use-video-preview";
import FileInput from "../shared/file-input";
import SearchInput from "../shared/search-input";


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
    <div className="panel-container">
      <div className="panel-title">Video Library</div>

      {/* Search */}
      <div className="flex panel-section">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={onSearchChange}
        />
      </div>

      {/* Import Button */}
      <div className="flex panel-section">
        <FileInput
          id="video-upload"
          acceptFileTypes={acceptFileTypes}
          onFileLoad={onFileUpload}
          buttonText="Import media"
          className="btn-primary w-full"
          icon={<Upload className="icon-sm" />}
        />
      </div>

      {/* Media Grid */}
      <div className="media-content">
        <div className="media-grid">
          {(items || []).map((item: MediaItem) => (
            <div
              key={item.id}
              onDoubleClick={() => onItemSelect(item)}
              className="media-item"
            >
              <video
                src={item.url}
                poster={item.thumbnail}
                className="media-item-content"
                ref={(el) => {
                  if (el) {
                    el.addEventListener('ended', () => {
                      el.currentTime = 0;
                    }, { once: true });
                  }
                }}
              />

              {/* Duration */}
              <div className="media-duration">
                0:13
              </div>

              {/* Quick Actions */}
              <div className="media-actions">
                {/* Play/Pause button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const videoEl = e.currentTarget.parentElement?.parentElement?.querySelector('video');
                    if (videoEl) {
                      togglePlayPause(item, videoEl);
                    }
                  }}
                  className="media-action-btn"
                >
                  {playingVideo === item.id ? (
                    <Pause className="icon-sm" />
                  ) : (
                    <Play className="icon-sm" />
                  )}
                </button>

                {/* Add button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemSelect(item, true);
                  }}
                  className="media-action-btn"
                >
                  <Plus className="icon-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-content">
              <Wand2 className="empty-state-icon" />
              <p className="empty-state-text">No videos found</p>
              {searchQuery && (
                <p className="empty-state-subtext">
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