import { useEffect } from "react";

function shouldIgnoreKeydown(): boolean {
  const active = document.activeElement;
  if (!active) return false;
  const tag = active.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea") return true;
  if ((active as HTMLElement).isContentEditable) return true;
  return false;
}

/**
 * Registers keyboard shortcut for delete.
 * Delete, Backspace.
 * Ignores events when focus is in input, textarea, or contenteditable.
 */
export function useCanvasKeyboard({
  onDelete,
  enabled = true,
}: {
  onDelete?: () => void;
  enabled?: boolean;
}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (shouldIgnoreKeydown()) return;

      const key = e.key.toLowerCase();
      if (key === "delete" || key === "backspace") {
        e.preventDefault();
        onDelete?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onDelete]);
}
