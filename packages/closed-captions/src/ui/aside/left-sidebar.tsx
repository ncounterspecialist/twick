import { type MouseEvent, useMemo } from 'react';
import type { CaptionDoc, CaptionSegmentId } from '../../utils/captions/types';
import { OperationsPanel } from '../panels/operations.panel';
import CaptionPanel from '../panels/caption.panel';

export const LeftSidebar = ({
  doc,
  selectedId,
  selectedIds,
  ignoredSuggestionIds,
  showOnlyFlagged,
  onToggleShowOnlyFlagged,
  onIgnoreSuggestion,
  onSelect,
  onToggleSelect,
  onEditCaptionText,
  findText,
  replaceText,
  onChangeFindText,
  onChangeReplaceText,
  onFindNext,
  onFindPrevious,
  onReplaceOne,
  onReplaceAll,
  onSetSpeakerForSelected,
  onRemoveSpeakerForSelected,
  onAddCaption,
  onSplit,
  onMerge,
  onDelete,
  onPlayCaption,
  playheadMs,
}: {
  doc: CaptionDoc | null;
  selectedId: CaptionSegmentId | null;
  selectedIds: Set<CaptionSegmentId>;
  ignoredSuggestionIds: Set<string>;
  showOnlyFlagged: boolean;
  onToggleShowOnlyFlagged: (next: boolean) => void;
  onIgnoreSuggestion: (id: string) => void;
  onSelect: (id: CaptionSegmentId, event: MouseEvent) => void;
  onToggleSelect: (id: CaptionSegmentId, event: MouseEvent) => void;
  onEditCaptionText: (id: CaptionSegmentId, nextText: string) => void;
  findText: string;
  replaceText: string;
  onChangeFindText: (v: string) => void;
  onChangeReplaceText: (v: string) => void;
  onFindNext: () => void;
  onFindPrevious: () => void;
  onReplaceOne: () => void;
  onReplaceAll: () => void;
  onSetSpeakerForSelected: (speaker: string) => void;
  onRemoveSpeakerForSelected: () => void;
  onAddCaption: () => void;
  onSplit: () => void;
  onMerge: () => void;
  onDelete: () => void;
  onPlayCaption: (id: CaptionSegmentId) => void;
  playheadMs: number;
}) => {
  const selectionCount = selectedIds.size;
  const selectionSpeaker = useMemo(() => {
    if (!doc || selectionCount === 0) return '';
    const speakers = Array.from(selectedIds)
      .map((id) => doc.segments.find((s) => s.id === id)?.speaker ?? '')
      .map((s) => s.trim());
    const unique = Array.from(new Set(speakers));
    if (unique.length === 1) return unique[0];
    return '';
  }, [doc, selectedIds, selectionCount]);

  return (
    <aside className="ccLeft">
      <OperationsPanel
        doc={doc}
        findText={findText}
        replaceText={replaceText}
        onChangeFindText={onChangeFindText}
        onChangeReplaceText={onChangeReplaceText}
        onFindNext={onFindNext}
        onFindPrevious={onFindPrevious}
        onReplaceOne={onReplaceOne}
        onReplaceAll={onReplaceAll}
        selectionCount={selectionCount}
        selectionSpeaker={selectionSpeaker}
        onSetSpeakerForSelected={onSetSpeakerForSelected}
        onRemoveSpeakerForSelected={onRemoveSpeakerForSelected}
      />
      <CaptionPanel
        doc={doc}
        selectedId={selectedId}
        selectedIds={selectedIds}
        ignoredSuggestionIds={ignoredSuggestionIds}
        showOnlyFlagged={showOnlyFlagged}
        onToggleShowOnlyFlagged={onToggleShowOnlyFlagged}
        onIgnoreSuggestion={onIgnoreSuggestion}
        onSelect={onSelect}
        onToggleSelect={onToggleSelect}
        onEditCaptionText={onEditCaptionText}
        onAddCaption={onAddCaption}
        onSplit={onSplit}
        onMerge={onMerge}
        onDelete={onDelete}
        onPlayCaption={onPlayCaption}
        playheadMs={playheadMs}
      />
    </aside>
  );
};

