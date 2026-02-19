import { useEffect, useRef } from "react";

export interface UseEdgeAutoScrollParams {
  isActive: boolean;
  getMouseClientX: () => number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  contentWidth: number;
  edgeThreshold?: number;
  maxScrollSpeed?: number;
}

/**
 * Auto-scrolls the timeline horizontally when the pointer is near the left/right edge during drag (OpenVideo-style).
 */
export function useEdgeAutoScroll({
  isActive,
  getMouseClientX,
  scrollContainerRef,
  contentWidth,
  edgeThreshold = 60,
  maxScrollSpeed = 20,
}: UseEdgeAutoScrollParams): void {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const step = () => {
      const el = scrollContainerRef.current;
      if (!el) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const rect = el.getBoundingClientRect();
      const mouseX = getMouseClientX();
      const xRelative = mouseX - rect.left;
      const viewportWidth = el.clientWidth;
      const scrollMax = Math.max(0, contentWidth - viewportWidth);

      let scrollSpeed = 0;

      if (xRelative < edgeThreshold && el.scrollLeft > 0) {
        const intensity = 1 - Math.max(0, xRelative) / edgeThreshold;
        scrollSpeed = -maxScrollSpeed * intensity;
      } else if (
        xRelative > viewportWidth - edgeThreshold &&
        el.scrollLeft < scrollMax
      ) {
        const intensity =
          1 - Math.max(0, viewportWidth - edgeThreshold - xRelative) / edgeThreshold;
        scrollSpeed = maxScrollSpeed * intensity;
      }

      if (scrollSpeed !== 0) {
        const newScrollLeft = Math.max(
          0,
          Math.min(scrollMax, el.scrollLeft + scrollSpeed)
        );
        el.scrollLeft = newScrollLeft;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [
    isActive,
    getMouseClientX,
    scrollContainerRef,
    contentWidth,
    edgeThreshold,
    maxScrollSpeed,
  ]);
}
