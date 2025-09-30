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

import { Loader2, Download, Plus } from "lucide-react";
import type {
  IconPanelState,
  IconPanelActions,
  Icon,
} from "../../hooks/use-icon-panel";
import SearchInput from "../shared/search-input";

export type IconPanelProps = IconPanelState & IconPanelActions;

export function IconPanel({
  icons,
  loading,
  totalIcons,
  searchQuery,
  handleSearch,
  handleSelection,
  handleDownloadIcon,
  handleLoadMore,
}: IconPanelProps) {
  return (
    <div className="panel-container">
      <div className="panel-title">Icon Library</div>

      {/* Search */}
      <div className="flex panel-section">
        <SearchInput searchQuery={searchQuery} setSearchQuery={handleSearch} />
      </div>

      {/* Icons Grid */}
      <div className="media-content">
        {/* Results Count */}
        {totalIcons > 0 && (
          <div className="media-count">
            Showing {icons.length} of {totalIcons} icons
          </div>
        )}

        {/* Loading State */}
        {loading && icons.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <Loader2 className="empty-state-icon animate-spin" />
              <p className="empty-state-text">Loading icons...</p>
            </div>
          </div>
        ) : (
          <div className="icon-grid">
            {(icons || []).map((icon: Icon, index: number) => (
              <div key={index} className="icon-item">
                <div
                  onClick={() => handleSelection(icon)}
                  className="icon-content"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />

                {/* Quick Actions */}
                <div className="icon-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelection(icon);
                    }}
                    className="icon-action-btn"
                    title="Add to timeline"
                  >
                    <Plus className="icon-sm" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadIcon(icon);
                    }}
                    className="icon-action-btn"
                    title="Download SVG"
                  >
                    <Download className="icon-sm" />
                  </button>
                </div>

                {/* Icon name */}
                <div className="icon-name">{icon.name}</div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && icons.length === 0 && searchQuery && (
          <div className="empty-state">
            <div className="empty-state-content">
              <p className="empty-state-text">No icons found</p>
              <p className="empty-state-subtext">Try a different search term</p>
            </div>
          </div>
        )}

        {!loading && totalIcons && icons.length < totalIcons && (
          <div className="flex panel-section">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="btn-primary"
            >
              Load More Icons
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
