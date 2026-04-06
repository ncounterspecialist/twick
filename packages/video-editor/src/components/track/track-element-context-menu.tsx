import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "../../styles/video-editor.css";

const VIEWPORT_MARGIN = 8;

function clampMenuPosition(
  clientX: number,
  clientY: number,
  width: number,
  height: number
): { left: number; top: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxLeft = Math.max(VIEWPORT_MARGIN, vw - width - VIEWPORT_MARGIN);
  const maxTop = Math.max(VIEWPORT_MARGIN, vh - height - VIEWPORT_MARGIN);
  return {
    left: Math.min(Math.max(VIEWPORT_MARGIN, clientX), maxLeft),
    top: Math.min(Math.max(VIEWPORT_MARGIN, clientY), maxTop),
  };
}

export interface TrackElementContextMenuProps {
  x: number;
  y: number;
  canSplit: boolean;
  onSplit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

/**
 * Timeline clip context menu: split at playhead, delete.
 * Uses the same styles as the canvas context menu; portals to document.body
 * so it is not clipped by timeline overflow or motion transforms.
 */
export const TrackElementContextMenu: React.FC<TrackElementContextMenuProps> = ({
  x,
  y,
  canSplit,
  onSplit,
  onDelete,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ left: number; top: number }>(() => ({
    left: x,
    top: y,
  }));

  const reposition = useCallback(() => {
    const el = menuRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setPosition(clampMenuPosition(x, y, width, height));
  }, [x, y]);

  useLayoutEffect(() => {
    reposition();
  }, [reposition]);

  useEffect(() => {
    window.addEventListener("resize", reposition);
    return () => window.removeEventListener("resize", reposition);
  }, [reposition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const wrap = (fn: () => void) => {
    fn();
    onClose();
  };

  const menu = (
    <div
      ref={menuRef}
      className="twick-canvas-context-menu"
      style={{ left: position.left, top: position.top }}
      role="menu"
    >
      <button
        type="button"
        className="twick-canvas-context-menu-item"
        onClick={() => wrap(onSplit)}
        disabled={!canSplit}
        role="menuitem"
        style={!canSplit ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
      >
        Split at playhead
      </button>
      <div className="twick-canvas-context-menu-separator" role="separator" />
      <button
        type="button"
        className="twick-canvas-context-menu-item twick-canvas-context-menu-item-danger"
        onClick={() => wrap(onDelete)}
        role="menuitem"
      >
        Delete
      </button>
    </div>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(menu, document.body);
};
