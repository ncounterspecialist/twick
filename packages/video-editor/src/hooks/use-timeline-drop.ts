import { useCallback, useState } from "react";
import {
  Track,
  VideoElement,
  AudioElement,
  ImageElement,
} from "@twick/timeline";
import { getAssetTypeFromFile, DroppableAssetType } from "../helpers/asset-type";
import { TIMELINE_DROP_MEDIA_TYPE } from "../helpers/constants";
import type { Size } from "@twick/timeline";

export interface DropPreview {
  trackIndex: number;
  timeSec: number;
  /** Approximate width for preview (based on default duration) */
  widthPct: number;
}

const DEFAULT_DROP_DURATION = 5;

/**
 * Hook for handling file drops on the timeline.
 * Computes drop position from coordinates and provides handlers for drag/drop.
 */
export function useTimelineDrop({
  containerRef,
  scrollContainerRef,
  tracks,
  duration,
  zoomLevel,
  labelWidth,
  trackHeight,
  /** Width of the track content area (timeline minus labels). Used for accurate time mapping. */
  trackContentWidth,
  onDrop,
  enabled = true,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  /** Ref to scroll container; used for scrollLeft. Falls back to containerRef if not provided. */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  tracks: Track[];
  duration: number;
  zoomLevel: number;
  labelWidth: number;
  trackHeight: number;
  trackContentWidth?: number;
  onDrop: (params: {
    track: Track | null;
    timeSec: number;
    type: DroppableAssetType;
    url: string;
  }) => Promise<void>;
  enabled?: boolean;
}) {
  const [preview, setPreview] = useState<DropPreview | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const computePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return null;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollEl = scrollContainerRef?.current ?? containerRef.current;
      const scrollLeft = scrollEl?.scrollLeft ?? 0;
      // Use scroll container's rect for X so we match the scroll viewport coordinate system.
      // contentX = (mouse X in viewport) + scrollOffset - labelWidth
      const viewportLeft = scrollEl?.getBoundingClientRect?.()?.left ?? rect.left;
      const contentX = (clientX - viewportLeft) + scrollLeft - labelWidth;
      const relY = clientY - rect.top;
      const rawTrackIndex = Math.floor(relY / trackHeight);
      const trackIndex =
        tracks.length === 0
          ? 0
          : Math.max(0, Math.min(tracks.length - 1, rawTrackIndex));
      // Match track element positioning: track content maps 0..duration to 0..trackContentWidth
      const pixelsPerSecond =
        trackContentWidth != null && trackContentWidth > 0
          ? trackContentWidth / duration
          : 100 * zoomLevel;
      const timeSec = Math.max(
        0,
        Math.min(duration, contentX / pixelsPerSecond)
      );
      return { trackIndex, timeSec };
    },
    [
      containerRef,
      scrollContainerRef,
      tracks.length,
      labelWidth,
      trackHeight,
      zoomLevel,
      duration,
      trackContentWidth,
    ]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      if (!enabled) return;
      e.preventDefault();
      e.stopPropagation();
      const hasFiles = e.dataTransfer.types.includes("Files");
      const hasPanelMedia = e.dataTransfer.types.includes(TIMELINE_DROP_MEDIA_TYPE);
      if (!hasFiles && !hasPanelMedia) return;
      e.dataTransfer.dropEffect = "copy";
      setIsDraggingOver(true);

      const pos = computePosition(e.clientX, e.clientY);
      if (pos) {
        const track = tracks[pos.trackIndex] ?? null;
        if (track || tracks.length === 0) {
          setPreview({
            trackIndex: pos.trackIndex,
            timeSec: pos.timeSec,
            widthPct: Math.min(
              100,
              (DEFAULT_DROP_DURATION / duration) * 100
            ),
          });
        }
      }
    },
    [enabled, computePosition, tracks, duration]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDraggingOver(false);
      setPreview(null);
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      if (!enabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(false);
      setPreview(null);

      const pos = computePosition(e.clientX, e.clientY);
      if (!pos || pos.trackIndex < 0) return;
      const track = tracks[pos.trackIndex] ?? null;

      // Handle media dragged from studio panels (video, audio, image)
      if (e.dataTransfer.types.includes(TIMELINE_DROP_MEDIA_TYPE)) {
        try {
          const data = JSON.parse(
            e.dataTransfer.getData(TIMELINE_DROP_MEDIA_TYPE) || "{}"
          ) as { type?: DroppableAssetType; url?: string };
          if (data.type && data.url) {
            await onDrop({
              track,
              timeSec: pos.timeSec,
              type: data.type,
              url: data.url,
            });
          }
        } catch {
          // Invalid JSON or missing fields
        }
        return;
      }

      // Handle files dragged from OS (Finder, Explorer, etc.)
      const files = Array.from(e.dataTransfer.files || []);
      for (const file of files) {
        const type = getAssetTypeFromFile(file);
        if (!type) continue;
        const blobUrl = URL.createObjectURL(file);
        try {
          await onDrop({
            track,
            timeSec: pos.timeSec,
            type,
            url: blobUrl,
          });
        } finally {
          URL.revokeObjectURL(blobUrl);
        }
        break; // Only first valid file for now
      }
    },
    [enabled, computePosition, tracks, onDrop]
  );

  return { preview, isDraggingOver, handleDragOver, handleDragLeave, handleDrop };
}

export function createElementFromDrop(
  type: DroppableAssetType,
  blobUrl: string,
  parentSize: Size
): VideoElement | AudioElement | ImageElement {
  switch (type) {
    case "video":
      return new VideoElement(blobUrl, parentSize);
    case "audio":
      return new AudioElement(blobUrl);
    case "image":
      return new ImageElement(blobUrl, parentSize);
    default:
      throw new Error(`Unknown asset type: ${type}`);
  }
}
