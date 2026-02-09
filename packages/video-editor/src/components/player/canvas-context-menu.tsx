import React, { useEffect, useRef } from "react";

export interface CanvasContextMenuProps {
  x: number;
  y: number;
  elementId: string;
  onBringToFront: (elementId: string) => void;
  onSendToBack: (elementId: string) => void;
  onBringForward: (elementId: string) => void;
  onSendBackward: (elementId: string) => void;
  onClose: () => void;
}

/**
 * Context menu for canvas elements: z-order actions (Bring to Front, Send to Back, etc.).
 * Renders at the given coordinates and closes on action or click outside.
 */
export const CanvasContextMenu: React.FC<CanvasContextMenuProps> = ({
  x,
  y,
  elementId,
  onBringToFront,
  onSendToBack,
  onBringForward,
  onSendBackward,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleAction = (fn: (id: string) => void) => {
    fn(elementId);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="twick-canvas-context-menu"
      style={{ left: x, top: y }}
      role="menu"
    >
      <button
        type="button"
        className="twick-canvas-context-menu-item"
        onClick={() => handleAction(onBringToFront)}
        role="menuitem"
      >
        Bring to Front
      </button>
      <button
        type="button"
        className="twick-canvas-context-menu-item"
        onClick={() => handleAction(onBringForward)}
        role="menuitem"
      >
        Bring Forward
      </button>
      <button
        type="button"
        className="twick-canvas-context-menu-item"
        onClick={() => handleAction(onSendBackward)}
        role="menuitem"
      >
        Send Backward
      </button>
      <button
        type="button"
        className="twick-canvas-context-menu-item"
        onClick={() => handleAction(onSendToBack)}
        role="menuitem"
      >
        Send to Back
      </button>
    </div>
  );
};
