import { useCallback } from "react";
import {
  Track,
  TrackElement,
  useTimelineContext,
  getElementIdsInRange,
  resolveId,
} from "@twick/timeline";

/**
 * Handles timeline selection with multi-select support.
 * - Single click: replace selection
 * - Cmd/Ctrl+click: toggle item in selection
 * - Shift+click: range select (elements in same track, or tracks)
 */
export function useTimelineSelection() {
  const { editor, selectedIds, setSelection, setSelectedItem } =
    useTimelineContext();

  const handleItemSelect = useCallback(
    (item: Track | TrackElement, event: React.MouseEvent) => {
      const id = item.getId();
      const isMulti = event.metaKey || event.ctrlKey;
      const isRange = event.shiftKey;
      const tracks = editor.getTimelineData()?.tracks ?? [];

      if (isMulti) {
        setSelection((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
        return;
      }

      if (isRange) {
        const primaryId = selectedIds.size > 0 ? [...selectedIds][0] : null;
        if (!primaryId) {
          setSelectedItem(item);
          return;
        }
        const primary = resolveId(primaryId, tracks);
        if (!primary) {
          setSelectedItem(item);
          return;
        }

        if (item instanceof Track && primary instanceof Track) {
          const trackIds = tracks.map((t) => t.getId());
          const fromIdx = trackIds.indexOf(primary.getId());
          const toIdx = trackIds.indexOf(item.getId());
          if (fromIdx !== -1 && toIdx !== -1) {
            const [start, end] =
              fromIdx <= toIdx ? [fromIdx, toIdx] : [toIdx, fromIdx];
            const rangeIds = new Set(
              trackIds.slice(start, end + 1)
            );
            setSelection((prev) => new Set([...prev, ...rangeIds]));
            return;
          }
        }

        if (item instanceof TrackElement && primary instanceof TrackElement) {
          const track = editor.getTrackById(item.getTrackId());
          const primaryTrack = editor.getTrackById(primary.getTrackId());
          if (track && primaryTrack && track.getId() === primaryTrack.getId()) {
            const rangeIds = getElementIdsInRange(
              track,
              primary.getId(),
              item.getId()
            );
            setSelection((prev) => new Set([...prev, ...rangeIds]));
            return;
          }
        }
      }

      setSelectedItem(item);
    },
    [editor, selectedIds, setSelection, setSelectedItem]
  );

  const handleEmptyClick = useCallback(() => {
    setSelectedItem(null);
  }, [setSelectedItem]);

  const handleMarqueeSelect = useCallback(
    (ids: Set<string>) => {
      setSelection(ids);
    },
    [setSelection]
  );

  return { handleItemSelect, handleEmptyClick, handleMarqueeSelect };
}
