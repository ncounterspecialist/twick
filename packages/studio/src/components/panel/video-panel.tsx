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
import { TIMELINE_DROP_MEDIA_TYPE } from "@twick/video-editor";
import type { VideoPanelProps } from "../../types/media-panel";
import { useVideoPreview } from "../../hooks/use-video-preview";
import UrlInput from "../shared/url-input";


export function VideoPanel({
  items,
  onItemSelect,
  onUrlAdd,
}: VideoPanelProps) {
  const { playingVideo, togglePlayPause } = useVideoPreview();
  return (
    <div className="panel-container">
      <div className="panel-title">Video Library</div>

      {/* Add by URL */}
      <div className="flex panel-section">
        <UrlInput type="video" onSubmit={onUrlAdd} />
      </div>

      {/* Media Grid */}
      <div className="media-content">
        <div className="media-grid">
          {(items || []).map((item: MediaItem) => (
            <div
              key={item.id}
              draggable
              onDoubleClick={() => onItemSelect(item)}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  TIMELINE_DROP_MEDIA_TYPE,
                  JSON.stringify({ type: "video", url: item.url })
                );
                e.dataTransfer.effectAllowed = "copy";
              }}
              className="media-item media-item-draggable"
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
              {/* <div className="media-duration">
                0:13
              </div> */}

              {/* Corner play/pause control */}
              <div className="media-actions media-actions-corner">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const videoEl =
                      e.currentTarget.parentElement?.parentElement?.querySelector("video");
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}