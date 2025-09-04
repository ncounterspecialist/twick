import { useState, useRef, useEffect } from "react";
import { Search, Loader2, Download } from "lucide-react";

interface Icon {
  name: string;
  svg: string;
}

const IconPanel = () => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalIcons, setTotalIcons] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const ICONS_PER_PAGE = 20;

  const currentQuery = useRef("");

  const fetchIcons = async (query: string, reset = false) => {
    try {
      setLoading(true);
      const newPage = reset ? 1 : page;
      const start = (newPage - 1) * ICONS_PER_PAGE;
      const url = `https://api.iconify.design/search?query=${query}&limit=${ICONS_PER_PAGE}&offset=${start}`;

      const response = await fetch(url);
      const data = await response.json();

      // Process icons data
      const iconData = data.icons || [];
      const total = data.total || 0;
      setTotalIcons(total);

      // Format icons
      const formattedIcons = await Promise.all(
        iconData.map(async (icon: any) => {
          const svgUrl = `https://api.iconify.design/${icon}.svg`;

          try {
            const svgResponse = await fetch(svgUrl);
            const svg = await svgResponse.text();
            return {
              name: icon,
              svg,
            };
          } catch (e) {
            console.error(`Error fetching SVG for ${icon}:`, e);
            return null;
          }
        })
      );

      const validIcons = formattedIcons.filter(
        (icon) => icon !== null
      ) as Icon[];

      if (reset) {
        setIcons(validIcons);
      } else {
        setIcons([...icons, ...validIcons]);
      }

      setHasMore(start + validIcons.length < total);
      if (!reset) {
        setPage(newPage + 1);
      } else {
        setPage(2);
      }
    } catch (error) {
      console.error("Error fetching icons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIcons("media", true);
  }, []);

  const handleSearch = (query: string) => {
    currentQuery.current = query;
    setSearchQuery(query);
    fetchIcons(query, true);
  };

  const handleAddIcon = (icon: Icon) => {
    // TODO: Add icon to timeline or canvas
    console.log("Adding icon:", icon);
  };

  const handleDownloadIcon = (icon: Icon) => {
    // Create a download link for the SVG
    const blob = new Blob([icon.svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${icon.name}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-72 bg-neutral-800/80 border-l border-gray-600/50 p-4 overflow-y-auto overflow-x-hidden backdrop-blur-md shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6">Icon Library</h3>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" color="white"/>
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-neutral-700/80 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm shadow-sm"
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
          <div className="grid grid-cols-3 gap-3 mb-2 p-2 overflow-y-auto overflow-x-hidden">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
              >
                <div
                  onClick={() => handleAddIcon(icon)}
                  className="w-16 h-16 flex items-center justify-center bg-neutral-700/50 border border-gray-600 rounded-lg hover:border-purple-500 hover:bg-neutral-700/70 transition-all duration-200 p-2"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />
                
                {/* Hover overlay with actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddIcon(icon);
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
                      className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors duration-200"
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
              onClick={() => fetchIcons(currentQuery.current, false)}
              disabled={loading}
              className="w-full bg-neutral-700/50 hover:bg-neutral-700/70 border border-gray-600 hover:border-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
};

export default IconPanel;
