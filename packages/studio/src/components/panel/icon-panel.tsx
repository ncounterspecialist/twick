/**
 * IconPanel Component
 * 
 * A panel for browsing, searching, and adding icons to the studio timeline.
 * Features a searchable grid of SVG icons with preview, add, and download actions.
 * Supports infinite scrolling with "Load More" functionality.
 * 
 * @component
 * @param {Object} props
 * @param {Icon[]} props.icons - List of icons to display
 * @param {boolean} props.loading - Loading state indicator
 * @param {boolean} props.hasMore - Whether more icons can be loaded
 * @param {number} props.totalIcons - Total number of available icons
 * @param {string} props.searchQuery - Current search query
 * @param {(query: string) => void} props.handleSearch - Handle search query changes
 * @param {(icon: Icon) => void} props.handleSelection - Handle icon selection
 * @param {(icon: Icon) => void} props.handleDownloadIcon - Handle icon download
 * @param {() => void} props.handleLoadMore - Load more icons
 * 
 * @example
 * ```tsx
 * <IconPanel
 *   icons={icons}
 *   loading={false}
 *   hasMore={true}
 *   totalIcons={1000}
 *   searchQuery=""
 *   handleSearch={setSearchQuery}
 *   handleSelection={addIconToTimeline}
 *   handleDownloadIcon={downloadSvg}
 *   handleLoadMore={loadNextPage}
 * />
 * ```
 */

import { Search, Loader2, Download } from "lucide-react";
import { inputStyles } from "../../styles/input-styles";
import type { IconPanelState, IconPanelActions, Icon } from "../../hooks/use-icon-panel";

export type IconPanelProps = IconPanelState & IconPanelActions;

export function IconPanel({
  icons,
  loading,
  hasMore,
  totalIcons,
  searchQuery,
  handleSearch,
  handleSelection,
  handleDownloadIcon,
  handleLoadMore,
}: IconPanelProps) {
  return (
    <div className={inputStyles.panel.container}>
      <h3 className={inputStyles.panel.title}>Icon Library</h3>

      {/* Search Section */}
      <div className={inputStyles.container}>
        <div className="relative mb-3">
          <Search
            className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className={`${inputStyles.input.base} pl-8`}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && icons.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      ) : (
        <>
          {/* Results Count */}
          {totalIcons > 0 && (
            <div className="mb-4 text-sm text-gray-400">
              Showing {icons.length} of {totalIcons} icons
            </div>
          )}

          {/* Icons Grid */}
          <div className="grid grid-cols-3 gap-3 mb-2 p-2">
            {(icons || []).map((icon: Icon, index: number) => (
              <div key={index} className="group relative cursor-pointer">
                <div
                  onClick={() => handleSelection(icon)}
                  className="w-16 h-16 flex items-center justify-center bg-neutral-700/50 border border-gray-600 rounded-lg hover:border-purple-500 hover:bg-neutral-700/70 transition-all duration-200 p-2"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelection(icon);
                      }}
                      className="p-1.5 bg-purple-600 hover:bg-purple-700 rounded transition-colors duration-200"
                      title="Add to timeline"
                    >
                      <span className="text-white text-xs">+</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadIcon(icon);
                      }}
                      className="p-1.5 bg-purple-600 hover:bg-purple-700 rounded transition-colors duration-200"
                      title="Download SVG"
                    >
                      <Download className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>

                {/* Icon name tooltip */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {icon.name}
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={`${inputStyles.button.primary} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Load More"
              )}
            </button>
          )}

          {/* Empty State */}
          {!loading && icons.length === 0 && searchQuery && (
            <div className="text-center py-8 text-gray-400">
              <p>No icons found</p>
              <p className="text-sm mt-2">Try a different search term</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}