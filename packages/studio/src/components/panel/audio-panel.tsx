/**
 * AudioPanel Component
 * 
 * A panel for managing audio elements in the studio. Provides functionality
 * for searching, uploading, previewing, and adding audio files to the timeline.
 * 
 * @component
 * @param {Object} props
 * @param {MediaItem[]} props.items - List of audio items to display
 * @param {string} props.searchQuery - Current search query
 * @param {string | null} props.playingAudio - ID of currently playing audio, if any
 * @param {(query: string) => void} props.onSearchChange - Handle search query changes
 * @param {(item: MediaItem) => void} props.onItemSelect - Handle audio item selection
 * @param {(item: MediaItem) => void} props.onPlayPause - Toggle audio preview playback
 * @param {(data: { file: File; blobUrl: string }) => void} props.onFileUpload - Handle file uploads
 * 
 * @example
 * ```tsx
 * <AudioPanel
 *   items={audioItems}
 *   searchQuery=""
 *   playingAudio={null}
 *   onSearchChange={setSearchQuery}
 *   onItemSelect={handleSelect}
 *   onPlayPause={togglePlayback}
 *   onFileUpload={handleUpload}
 * />
 * ```
 */

import { Wand2, Plus, Volume2, Play, Pause } from "lucide-react";
import { TIMELINE_DROP_MEDIA_TYPE } from "@twick/video-editor";
import UrlInput from "../shared/url-input";
import type { AudioPanelProps } from "../../types/media-panel";
import { useAudioPreview } from "../../hooks/use-audio-preview";


export const AudioPanel = ({
  items,
  onItemSelect,
  onUrlAdd,
}: AudioPanelProps) => {
  const { playingAudio, togglePlayPause } = useAudioPreview();
  return (
    <div className="panel-container">
      <div className="panel-title">Audio Library</div>

      {/* Add by URL */}
      <div className="panel-section">
        <UrlInput type="audio" onSubmit={onUrlAdd} />
      </div>

      {/* Upload */}
      {/* <div className="flex panel-section">
        <FileInput
          id="audio-upload"
          acceptFileTypes={acceptFileTypes}
          onFileLoad={onFileUpload}
          buttonText="Import media"
          className="btn-primary w-full"
          icon={<Upload className="icon-sm" />}
        />
      </div> */}

      {/* Audio List */}
      <div className="media-content">
        <div className="media-list">
          {(items || []).map((item) => (
            <div
              key={item.id}
              draggable
              onDoubleClick={() => onItemSelect(item)}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  TIMELINE_DROP_MEDIA_TYPE,
                  JSON.stringify({ type: "audio", url: item.url })
                );
                e.dataTransfer.effectAllowed = "copy";
              }}
              className="media-list-item media-item-draggable"
            >
              {/* Audio Info */}
              <div className="media-list-content">
                {/* Play/Pause button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause(item);
                  }}
                  className="media-action-btn"
                >
                  {playingAudio === item.id ? (
                    <Pause className="icon-sm" />
                  ) : (
                    <Play className="icon-sm" />
                  )}
                </button>

                {/* Audio Icon */}
                <div className={`media-list-icon ${playingAudio === item.id ? 'active' : ''}`}>
                  <Volume2 className="icon-sm" />
                </div>

                {/* Audio Title */}
                <div className="media-list-title">
                  {item.metadata?.title || item.metadata?.name}
                </div>

                {/* Quick Add button */}
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
              <p className="empty-state-text">No audio files found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};