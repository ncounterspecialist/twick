import type { EmojiAsset } from "../../helpers/emoji-catalog";
import { EMOJI_CATEGORIES, type EmojiCategory } from "../../helpers/emoji-catalog";
import { useMemo, useState } from "react";

interface EmojiPanelProps {
  items: EmojiAsset[];
  onItemSelect: (item: EmojiAsset) => void;
}

export function EmojiPanel({ items, onItemSelect }: EmojiPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<EmojiCategory | "All">("All");

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const categoryMatch =
        activeCategory === "All" ? true : item.category === activeCategory;
      if (!categoryMatch) return false;
      if (!query) return true;
      return (
        item.emoji.includes(query) ||
        item.label.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });
  }, [items, searchQuery, activeCategory]);

  return (
    <div className="panel-container">
      <div className="panel-title">Emoji Stickers</div>
      <div className="panel-section">
        <input
          type="text"
          placeholder="Search emoji..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-dark"
        />
      </div>
      <div className="emoji-categories">
        {EMOJI_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`emoji-category-chip ${
              activeCategory === category ? "emoji-category-chip-active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="emoji-grid">
        {filteredItems.map((item) => (
          <button
            key={`${item.emoji}-${item.imageUrl}`}
            type="button"
            className="emoji-item"
            title={item.label}
            onClick={() => onItemSelect(item)}
          >
            <img
              src={item.imageUrl}
              alt={item.label}
              className="emoji-item-image"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {filteredItems.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-content">
            <p className="empty-state-text">No emoji found</p>
          </div>
        </div>
      )}
    </div>
  );
}
