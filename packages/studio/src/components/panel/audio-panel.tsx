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

import { Wand2, Plus, Volume2, Play } from "lucide-react";
import SearchInput from "../shared/search-input";
import FileInput from "../shared/file-input";
import type { AudioPanelProps } from "../../types/media-panel";
import { inputStyles } from "../../styles/input-styles";


export const AudioPanel = ({
  items,
  searchQuery,
  onSearchChange,
  onItemSelect,
  onFileUpload,
  acceptFileTypes,
}: AudioPanelProps) => {
  return (
    <div className={inputStyles.panel.container}>
      <h3 className={inputStyles.panel.title}>Audio Library</h3>

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
          id="audio-upload"
          acceptFileTypes={acceptFileTypes}
          onFileLoad={onFileUpload}
          buttonText="Upload"
        />
      </div>

      {/* Audio List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {(items || []).map((item) => (
            <div
              key={item.id}
              onDoubleClick={() => onItemSelect(item)}
              className="audio-item group relative cursor-pointer p-3 bg-neutral-700/50 rounded-lg hover:bg-neutral-700/80 transition-all duration-200 border border-transparent hover:border-purple-500/30"
            >
              {/* Audio Info */}
              <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemSelect(item, true);
                  }}
                  className="w-8 h-8 rounded-full bg-purple-500/80 hover:bg-purple-500 flex items-center justify-center text-white transition-all duration-200 flex-shrink-0"
                >
                  <Play className="w-4 h-4" />
                </button>

                {/* Audio Icon */}
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-5 h-5 text-purple-400" />
                </div>

                {/* Audio Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-100 truncate">
                    {item.metadata?.title}
                  </h4>
                </div>

                {/* Quick Add Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemSelect(item);
                  }}
                  className="w-6 h-6 rounded-full bg-purple-500/60 hover:bg-purple-500 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
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
              <p className={inputStyles.label.base}>No audio files found</p>
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
};