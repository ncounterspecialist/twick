import { useEffect, useRef } from "react";

/**
 * Configuration for playhead scroll behavior.
 */
export interface PlayheadScrollConfig {
  /** Pixels to keep between playhead and viewport edge before auto-scrolling */
  margin?: number;
  /** Width of the label/track-header area (left of seek track) in pixels */
  labelWidth?: number;
}

const DEFAULT_MARGIN = 80;
const DEFAULT_LABEL_WIDTH = 140;

/**
 * Scrolls the timeline container to keep the playhead visible when it reaches
 * the viewport edge. Used during playback and when dragging the playhead.
 *
 * @param scrollContainerRef - Ref to the scrollable timeline container
 * @param playheadPositionPx - Playhead position in pixels (from left of content)
 * @param isActive - Whether to run scroll logic (playing or dragging)
 * @param config - Optional margin and label width
 */
export function usePlayheadScroll(
  scrollContainerRef: React.RefObject<HTMLElement | null>,
  playheadPositionPx: number,
  isActive: boolean,
  config?: PlayheadScrollConfig
): void {
  const margin = config?.margin ?? DEFAULT_MARGIN;
  const labelWidth = config?.labelWidth ?? DEFAULT_LABEL_WIDTH;
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const contentX = labelWidth + playheadPositionPx;

    const scrollToKeepPlayheadVisible = () => {
      const { scrollLeft, clientWidth } = container;
      const minVisible = scrollLeft + margin;
      const maxVisible = scrollLeft + clientWidth - margin;

      let newScrollLeft: number | null = null;

      if (contentX < minVisible) {
        newScrollLeft = Math.max(0, contentX - margin);
      } else if (contentX > maxVisible) {
        newScrollLeft = contentX - clientWidth + margin;
      }

      if (newScrollLeft !== null) {
        container.scrollLeft = newScrollLeft;
      }
    };

    const scheduleScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        scrollToKeepPlayheadVisible();
      });
    };

    scheduleScroll();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    isActive,
    playheadPositionPx,
    scrollContainerRef,
    margin,
    labelWidth,
  ]);
}
