import { useCallback, useEffect, useRef, useState } from "react";
import { Track } from "@twick/timeline";

const MARQUEE_THRESHOLD = 4;

export interface MarqueeRect {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface UseMarqueeSelectionOptions {
  duration: number;
  zoomLevel: number;
  labelWidth: number;
  trackCount: number;
  trackHeight: number;
  tracks: Track[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  onMarqueeSelect: (ids: Set<string>) => void;
  onEmptyClick: () => void;
}

export function useMarqueeSelection({
  duration,
  zoomLevel,
  labelWidth,
  trackCount,
  trackHeight,
  tracks,
  containerRef,
  onMarqueeSelect,
  onEmptyClick,
}: UseMarqueeSelectionOptions) {
  const [marquee, setMarquee] = useState<MarqueeRect | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const marqueeRef = useRef(marquee);
  marqueeRef.current = marquee;

  const pixelsPerSecond = 100 * zoomLevel;

  const getCoords = useCallback(
    (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: e.clientX - rect.left + (containerRef.current?.scrollLeft ?? 0),
        y: e.clientY - rect.top,
      };
    },
    [containerRef]
  );

  const handleGlobalMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!startPosRef.current) return;
      const { x, y } = getCoords(e);
      const dx = Math.abs(x - startPosRef.current.x);
      const dy = Math.abs(y - startPosRef.current.y);
      if (dx > MARQUEE_THRESHOLD || dy > MARQUEE_THRESHOLD) {
        hasDraggedRef.current = true;
      }
      setMarquee((prev) => (prev ? { ...prev, endX: x, endY: y } : null));
    },
    [getCoords]
  );

  const handleGlobalMouseUp = useCallback(() => {
    if (!startPosRef.current) return;
    const currentMarquee = marqueeRef.current;

    if (!hasDraggedRef.current || !currentMarquee) {
      setMarquee(null);
      startPosRef.current = null;
      onEmptyClick();
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      return;
    }

    const left = Math.min(currentMarquee.startX, currentMarquee.endX);
    const right = Math.max(currentMarquee.startX, currentMarquee.endX);
    const top = Math.min(currentMarquee.startY, currentMarquee.endY);
    const bottom = Math.max(currentMarquee.startY, currentMarquee.endY);

    const startTime = Math.max(0, (left - labelWidth) / pixelsPerSecond);
    const endTime = Math.min(duration, (right - labelWidth) / pixelsPerSecond);
    const rowHeight = trackHeight + 2;
    const startTrackIdx = Math.max(0, Math.floor(top / rowHeight));
    const endTrackIdx = Math.min(
      trackCount - 1,
      Math.floor(bottom / rowHeight)
    );

    const selectedIds = new Set<string>();
    for (let tIdx = startTrackIdx; tIdx <= endTrackIdx; tIdx++) {
      const track = tracks[tIdx];
      if (!track) continue;
      for (const el of track.getElements()) {
        const elStart = el.getStart();
        const elEnd = el.getEnd();
        if (elStart < endTime && elEnd > startTime) {
          selectedIds.add(el.getId());
        }
      }
    }

    onMarqueeSelect(selectedIds);
    setMarquee(null);
    startPosRef.current = null;

    window.removeEventListener("mousemove", handleGlobalMouseMove);
    window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [
    duration,
    pixelsPerSecond,
    labelWidth,
    trackCount,
    trackHeight,
    tracks,
    onMarqueeSelect,
    onEmptyClick,
    handleGlobalMouseMove,
  ]);

  useEffect(() => {
    if (!marquee) return;
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [marquee, handleGlobalMouseMove, handleGlobalMouseUp]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        (e.target as HTMLElement).closest(".twick-track-element") ||
        (e.target as HTMLElement).closest(".twick-track-header")
      ) {
        return;
      }
      const { x, y } = getCoords(e.nativeEvent);
      startPosRef.current = { x, y };
      hasDraggedRef.current = false;
      setMarquee({ startX: x, startY: y, endX: x, endY: y });
    },
    [getCoords]
  );

  return { marquee, handleMouseDown };
}
