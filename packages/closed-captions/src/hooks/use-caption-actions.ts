import { useState, useCallback, type MouseEvent } from 'react';
import type { CaptionDoc, CaptionSegmentId } from '../utils/captions/types';
import type { EditorActionResult } from '../utils/captions/types';
import type { CaptionSaveState } from './use-caption-state';
import {
  applyEditText,
  applyFindNext,
  applyFindPrevious,
  applyMergeGroup,
  applyMergeNext,
  applyReplaceAll,
  applyReplaceOne,
  applyRevert,
  applySplitAt,
  applyDelete,
  applyDeleteMany,
  applyAddAfter,
  applySetSpeakerMany,
} from '../utils/editor/actions';

export type OnAfterDocChange = (doc: CaptionDoc, selectedId: CaptionSegmentId | null) => void;

type UseCaptionActionsOptions = {
  state: CaptionSaveState;
  setState: React.Dispatch<React.SetStateAction<CaptionSaveState>>;
  applyResult: (result: EditorActionResult) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  showToast: (message: string) => void;
  onAfterDocChange: OnAfterDocChange;
};

export function useCaptionActions({
  state,
  setState,
  applyResult,
  videoRef,
  showToast,
  onAfterDocChange,
}: UseCaptionActionsOptions) {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const applyAndSync = useCallback(
    (result: EditorActionResult) => {
      applyResult(result);
      onAfterDocChange(result.doc, result.selectedId ?? state.selectedId);
    },
    [applyResult, onAfterDocChange, state.selectedId]
  );

  const handleSelect = useCallback(
    (id: CaptionSegmentId, event?: MouseEvent) => {
      setState((prev) => {
        const doc = prev.currentDoc;
        const ordered = doc ? doc.segments.slice().sort((a, b) => a.startMs - b.startMs) : [];
        const prevIds = prev.selectedIds;
        const isMeta = !!event && (event.metaKey || event.ctrlKey);
        const isShift = !!event && event.shiftKey;

        if (!doc) return prev;

        if (isShift && prev.selectedId) {
          const a = ordered.findIndex((s) => s.id === prev.selectedId);
          const b = ordered.findIndex((s) => s.id === id);
          if (a !== -1 && b !== -1) {
            const lo = Math.min(a, b);
            const hi = Math.max(a, b);
            const nextSet = new Set<CaptionSegmentId>();
            for (let i = lo; i <= hi; i += 1) nextSet.add(ordered[i].id);
            return { ...prev, selectedId: id, selectedIds: nextSet };
          }
        }

        if (isMeta) {
          const nextSet = new Set(prevIds);
          if (nextSet.has(id)) nextSet.delete(id);
          else nextSet.add(id);
          const nextSelectedId = nextSet.size === 0 ? id : prev.selectedId ?? id;
          return { ...prev, selectedId: nextSelectedId, selectedIds: nextSet.size ? nextSet : new Set([id]) };
        }

        return { ...prev, selectedId: id, selectedIds: new Set([id]) };
      });

      const doc = state.currentDoc;
      if (doc) {
        const seg = doc.segments.find((s) => s.id === id) ?? null;
        onAfterDocChange(doc, id);
        if (videoRef.current && seg) videoRef.current.currentTime = seg.startMs / 1000;
      }
    },
    [setState, state.currentDoc, videoRef, onAfterDocChange]
  );

  const handleToggleSelect = useCallback(
    (id: CaptionSegmentId, e: MouseEvent) => {
      e.stopPropagation();
      setState((prev) => {
        if (!prev.currentDoc) return prev;
        const ordered = prev.currentDoc.segments.slice().sort((a, b) => a.startMs - b.startMs).map((s) => s.id);
        const isShift = e.shiftKey;

        if (isShift && prev.selectedId) {
          const a = ordered.indexOf(prev.selectedId);
          const b = ordered.indexOf(id);
          if (a !== -1 && b !== -1) {
            const lo = Math.min(a, b);
            const hi = Math.max(a, b);
            const nextSet = new Set<CaptionSegmentId>();
            for (let i = lo; i <= hi; i += 1) nextSet.add(ordered[i]);
            return { ...prev, selectedIds: nextSet, selectedId: id };
          }
        }

        const nextSet = new Set(prev.selectedIds);
        if (nextSet.has(id)) nextSet.delete(id);
        else nextSet.add(id);
        const nextSelectedId = nextSet.has(prev.selectedId ?? '') ? prev.selectedId : nextSet.values().next().value ?? id;
        return { ...prev, selectedIds: nextSet, selectedId: nextSelectedId };
      });
    },
    [setState]
  );

  const handleEditText = useCallback(
    (id: CaptionSegmentId, nextText: string) => {
      if (!state.currentDoc) return;
      const result = applyEditText(state.currentDoc, id, nextText);
      applyAndSync(result);
    },
    [state.currentDoc, applyAndSync]
  );

  const handleFindNext = useCallback(() => {
    if (!state.currentDoc) return;
    const result = applyFindNext(state.currentDoc, state.selectedId, findText);
    if (!result.selectedId) {
      showToast('No match found');
      return;
    }
    applyAndSync(result);
    handleSelect(result.selectedId);
  }, [state.currentDoc, state.selectedId, findText, applyAndSync, showToast, handleSelect]);

  const handleFindPrevious = useCallback(() => {
    if (!state.currentDoc) return;
    const result = applyFindPrevious(state.currentDoc, state.selectedId, findText);
    if (!result.selectedId) {
      showToast('No match found');
      return;
    }
    applyAndSync(result);
    handleSelect(result.selectedId);
  }, [state.currentDoc, state.selectedId, findText, applyAndSync, showToast, handleSelect]);

  const handleReplaceOne = useCallback(() => {
    if (!state.currentDoc || !state.selectedId) return;
    const result = applyReplaceOne(state.currentDoc, state.selectedId, findText, replaceText);
    applyAndSync(result);
  }, [state.currentDoc, state.selectedId, findText, replaceText, applyAndSync]);

  const handleReplaceAll = useCallback(() => {
    if (!state.currentDoc) return;
    const result = applyReplaceAll(state.currentDoc, findText, replaceText);
    applyAndSync(result);
    showToast(`Replaced ${result.meta?.replacedCount ?? 0} occurrence(s)`);
  }, [state.currentDoc, findText, replaceText, applyAndSync, showToast]);

  const handleSplit = useCallback(() => {
    if (!state.currentDoc || !state.selectedId) return;
    const playheadMs = Math.round((videoRef.current?.currentTime ?? 0) * 1000);
    const result = applySplitAt(state.currentDoc, state.selectedId, playheadMs);
    applyAndSync(result);
  }, [state.currentDoc, state.selectedId, videoRef, applyAndSync]);

  const handleMerge = useCallback(() => {
    if (!state.currentDoc || !state.selectedId) return;
    const ids = Array.from(state.selectedIds);
    const ordered = state.currentDoc.segments.slice().sort((a, b) => a.startMs - b.startMs).map((s) => s.id);
    const idxs = ids.map((id) => ordered.indexOf(id)).filter((i) => i >= 0).sort((a, b) => a - b);
    const adjacent =
      ids.length >= 2 &&
      idxs.length === ids.length &&
      idxs.every((v, i, arr) => (i === 0 ? true : v === arr[i - 1] + 1));

    const result = adjacent ? applyMergeGroup(state.currentDoc, ids) : applyMergeNext(state.currentDoc, state.selectedId);
    applyAndSync(result);
  }, [state.currentDoc, state.selectedId, state.selectedIds, applyAndSync]);

  const handleDelete = useCallback(() => {
    if (!state.currentDoc) return;
    const ids = Array.from(state.selectedIds);
    const result =
      ids.length > 1
        ? applyDeleteMany(state.currentDoc, ids)
        : state.selectedId
          ? applyDelete(state.currentDoc, state.selectedId)
          : { doc: state.currentDoc, selectedId: null as CaptionSegmentId | null };
    applyAndSync(result);
    setState((prev) => ({
      ...prev,
      selectedIds: result.selectedId ? new Set([result.selectedId]) : new Set(),
    }));
    onAfterDocChange(result.doc, result.selectedId ?? null);
  }, [state.currentDoc, state.selectedId, state.selectedIds, applyAndSync, setState, onAfterDocChange]);

  const handleAddCaption = useCallback(() => {
    if (!state.currentDoc) return;
    const result = applyAddAfter(state.currentDoc, state.selectedId);
    applyAndSync(result);
  }, [state.currentDoc, state.selectedId, applyAndSync]);

  const handleSetSpeakerForSelected = useCallback(
    (speaker: string) => {
      if (!state.currentDoc) return;
      const ids = Array.from(state.selectedIds);
      if (ids.length === 0) return;
      const result = applySetSpeakerMany(state.currentDoc, ids, speaker);
      applyAndSync(result);
      showToast('Updated speaker');
    },
    [state.currentDoc, state.selectedIds, applyAndSync, showToast]
  );

  const handleRemoveSpeakerForSelected = useCallback(() => {
    if (!state.currentDoc) return;
    const ids = Array.from(state.selectedIds);
    if (ids.length === 0) return;
    const result = applySetSpeakerMany(state.currentDoc, ids, null);
    applyAndSync(result);
    showToast('Removed speaker');
  }, [state.currentDoc, state.selectedIds, applyAndSync, showToast]);

  const handleRevert = useCallback(() => {
    if (!state.baselineDoc) return;
    const result = applyRevert(state.baselineDoc);
    applyResult(result);
    setState((prev) => ({
      ...prev,
      selectedIds: new Set(result.selectedId ? [result.selectedId] : []),
    }));
    onAfterDocChange(result.doc, result.selectedId ?? null);
    showToast('Reverted to baseline');
  }, [state.baselineDoc, applyResult, setState, onAfterDocChange, showToast]);

  return {
    findText,
    setFindText,
    replaceText,
    setReplaceText,
    handleSelect,
    handleToggleSelect,
    handleEditText,
    handleFindNext,
    handleFindPrevious,
    handleReplaceOne,
    handleReplaceAll,
    handleSplit,
    handleMerge,
    handleDelete,
    handleAddCaption,
    handleSetSpeakerForSelected,
    handleRemoveSpeakerForSelected,
    handleRevert,
  };
}
