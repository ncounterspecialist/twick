import { useMemo } from 'react';
import type { CaptionDoc, CaptionSegmentId } from '../utils/captions/types';
import type { CaptionSegment } from '../utils/captions/types';

export function useCaptionTableSelection(doc: CaptionDoc | null, selectedId: CaptionSegmentId | null, selectedIds: Set<CaptionSegmentId>) {
  const orderedIds = useMemo(() => {
    if (!doc) return [];
    return doc.segments.slice().sort((a: CaptionSegment, b: CaptionSegment) => a.startMs - b.startMs).map((s) => s.id);
  }, [doc]);

  const selectedExists = !!doc && !!selectedId && doc.segments.some((s) => s.id === selectedId);
  const selectionCount = selectedIds.size;

  const selectedOrderedIdx = useMemo(() => {
    return orderedIds
      .map((id, idx) => (selectedIds.has(id) ? idx : null))
      .filter((v): v is number => v !== null)
      .sort((a, b) => a - b);
  }, [orderedIds, selectedIds]);

  const isAdjacentSelection =
    selectionCount >= 2 &&
    selectedOrderedIdx.length === selectionCount &&
    selectedOrderedIdx.every((v, i, arr) => (i === 0 ? true : v === arr[i - 1] + 1));

  const canMerge = isAdjacentSelection;
  const canDelete = selectionCount >= 1;
  const canSplit = selectionCount === 1 && selectedExists;

  const overlapIds = useMemo(() => {
    if (!doc) return new Set<CaptionSegmentId>();
    const ordered = doc.segments.slice().sort((a, b) => a.startMs - b.startMs);
    const ids = new Set<CaptionSegmentId>();
    for (let i = 1; i < ordered.length; i += 1) {
      if (ordered[i].startMs < ordered[i - 1].endMs) ids.add(ordered[i].id);
    }
    return ids;
  }, [doc]);

  return { orderedIds, overlapIds, canMerge, canDelete, canSplit, selectedExists, selectionCount };
}
