import { useState, useCallback } from 'react';
import type { CaptionDoc, CaptionSegmentId, EditorActionResult } from '../utils/captions/types';

export type CaptionSaveState = {
  baselineDoc: CaptionDoc | null;
  currentDoc: CaptionDoc | null;
  selectedId: CaptionSegmentId | null;
  selectedIds: Set<CaptionSegmentId>;
  mediaUrl: string | null;
};

const initialState: CaptionSaveState = {
  baselineDoc: null,
  currentDoc: null,
  selectedId: null,
  selectedIds: new Set(),
  mediaUrl: null,
};

export function useCaptionState() {
  const [state, setState] = useState<CaptionSaveState>(initialState);

  const applyResult = useCallback((result: EditorActionResult) => {
    setState((prev) => ({
      ...prev,
      currentDoc: result.doc,
      selectedId: result.selectedId ?? prev.selectedId,
    }));
  }, []);

  return { state, setState, applyResult };
}
