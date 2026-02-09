import { useCallback } from "react";
import { getAssetTypeFromFile, DroppableAssetType } from "../helpers/asset-type";
import { TIMELINE_DROP_MEDIA_TYPE } from "../helpers/constants";

export interface CanvasDropPayload {
  type: DroppableAssetType;
  url: string;
  canvasX?: number;
  canvasY?: number;
}

/**
 * Hook for handling file/media drops on the canvas.
 * Accepts both files from OS and media dragged from studio panels.
 */
export function useCanvasDrop({
  containerRef,
  videoSize,
  onDrop,
  enabled = true,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  videoSize: { width: number; height: number };
  onDrop: (payload: CanvasDropPayload) => Promise<void>;
  enabled?: boolean;
}) {
  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      if (!enabled) return;
      e.preventDefault();
      e.stopPropagation();
      const hasFiles = e.dataTransfer.types.includes("Files");
      const hasPanelMedia = e.dataTransfer.types.includes(TIMELINE_DROP_MEDIA_TYPE);
      if (!hasFiles && !hasPanelMedia) return;
      e.dataTransfer.dropEffect = "copy";
    },
    [enabled]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      if (!enabled || !containerRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      let type: DroppableAssetType | null = null;
      let url: string | null = null;

      // Handle media dragged from studio panels
      if (e.dataTransfer.types.includes(TIMELINE_DROP_MEDIA_TYPE)) {
        try {
          const data = JSON.parse(
            e.dataTransfer.getData(TIMELINE_DROP_MEDIA_TYPE) || "{}"
          ) as { type?: DroppableAssetType; url?: string };
          if (data.type && data.url) {
            type = data.type;
            url = data.url;
          }
        } catch {
          // Invalid JSON
        }
      }

      // Handle files from OS
      if (!type || !url) {
        const files = Array.from(e.dataTransfer.files || []);
        for (const file of files) {
          const detectedType = getAssetTypeFromFile(file);
          if (detectedType) {
            type = detectedType;
            url = URL.createObjectURL(file);
            try {
              await onDrop({
                type,
                url,
                canvasX: getCanvasX(e, containerRef.current, videoSize),
                canvasY: getCanvasY(e, containerRef.current, videoSize),
              });
            } finally {
              URL.revokeObjectURL(url);
            }
            return;
          }
        }
        return;
      }

      await onDrop({
        type,
        url,
        canvasX: getCanvasX(e, containerRef.current, videoSize),
        canvasY: getCanvasY(e, containerRef.current, videoSize),
      });
    },
    [enabled, containerRef, videoSize, onDrop]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      // Could reset drop state if needed
    }
  }, []);

  return { handleDragOver, handleDragLeave, handleDrop };
}

function getCanvasX(
  e: React.DragEvent,
  container: HTMLElement,
  videoSize: { width: number; height: number }
): number {
  const rect = container.getBoundingClientRect();
  const relX = (e.clientX - rect.left) / rect.width;
  return Math.max(0, Math.min(videoSize.width, relX * videoSize.width));
}

function getCanvasY(
  e: React.DragEvent,
  container: HTMLElement,
  videoSize: { width: number; height: number }
): number {
  const rect = container.getBoundingClientRect();
  const relY = (e.clientY - rect.top) / rect.height;
  return Math.max(0, Math.min(videoSize.height, relY * videoSize.height));
}
