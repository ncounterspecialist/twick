import { useState, useRef, useEffect } from "react";
import { IconElement, TrackElement } from "@twick/timeline";

export interface Icon {
  name: string;
  svg: string;
}

export interface IconPanelState {
  icons: Icon[];
  loading: boolean;
  hasMore: boolean;
  totalIcons: number;
  searchQuery: string;
}

export interface IconPanelActions {
  handleSearch: (query: string) => void;
  handleSelection: (icon: Icon) => void;
  handleDownloadIcon: (icon: Icon) => void;
  handleLoadMore: () => void;
}

const ICONS_PER_PAGE = 20;

export const useIconPanel = ({
  selectedElement,
  addElement,
  updateElement,
}: {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}): IconPanelState & IconPanelActions => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalIcons, setTotalIcons] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const currentQuery = useRef("");

  const fetchIcons = async (query: string, reset = false) => {
    try {
      setLoading(true);
      const newPage = reset ? 1 : page;
      const start = (newPage - 1) * ICONS_PER_PAGE;
      const url = `https://api.iconify.design/search?query=${query}&limit=${ICONS_PER_PAGE}&offset=${start}`;

      const response = await fetch(url);
      const data = await response.json();

      const iconData = data.icons || [];
      const total = data.total || 0;
      setTotalIcons(total);

      const formattedIcons = await Promise.all(
        iconData.map(async (icon: any) => {
          const svgUrl = `https://api.iconify.design/${icon}.svg`;

          try {
            const svgResponse = await fetch(svgUrl);
            const svg = await svgResponse.text();
            return { name: icon, svg };
          } catch (e) {
            console.error(`Error fetching SVG for ${icon}:`, e);
            return null;
          }
        })
      );

      const validIcons = formattedIcons.filter((icon) => icon !== null) as Icon[];

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

  const handleSelection = (icon: Icon) => {
    const svgBlob = new Blob([icon.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    let iconElement;
    if (selectedElement instanceof IconElement) {
      iconElement = selectedElement;
      iconElement.setSrc(url);
      iconElement.setName(icon.name);
      updateElement?.(iconElement);
    } else {
      iconElement = new IconElement(url, {
        width: 100,
        height: 100,
      });
      iconElement.setName(icon.name);
      addElement?.(iconElement);
    }

    URL.revokeObjectURL(url);
  };

  const handleDownloadIcon = (icon: Icon) => {
    const blob = new Blob([icon.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${icon.name}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadMore = () => {
    fetchIcons(currentQuery.current, false);
  };

  return {
    icons,
    loading,
    hasMore,
    totalIcons,
    searchQuery,
    handleSearch,
    handleSelection,
    handleDownloadIcon,
    handleLoadMore,
  };
};
