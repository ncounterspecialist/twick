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

import { Wand2, Plus, Upload } from "lucide-react";
import type { MediaItem } from "@twick/video-editor";
import type { ImagePanelProps } from "../../types/media-panel";
import FileInput from "../shared/file-input";
import UrlInput from "../shared/url-input";

export function ImagePanel({
  items,
  searchQuery,
  onSearchChange,
  onItemSelect,
  onFileUpload,
  acceptFileTypes,
  onUrlAdd,
}: ImagePanelProps) {
  return (
    <div className="panel-container">
      <div className="panel-title">Image Library</div>

      {/* Add by URL */}
      <div className="panel-section">
        <UrlInput type="image" onSubmit={onUrlAdd} />
      </div>
      {/* Upload */}
      <div className="flex panel-section">
        <FileInput
          id="image-upload"
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
              <img src={item.url} alt="" className="media-item-content" />

              {/* Quick Actions */}
              <div className="media-actions">
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
              <p className="empty-state-text">No images found</p>
              {searchQuery && (
                <p className="empty-state-subtext">Try adjusting your search</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
