import { useCallback, useEffect, useRef, type MouseEvent } from 'react';
import type { CaptionDoc, CaptionSegmentId } from '../../utils/captions/types';
import type { CaptionSegment } from '../../utils/captions/types';
import type { TextSuggestion } from '../../utils/mock-ai/text-suggestions';
import { GitMerge, Plus, Scissors, Trash2 } from 'lucide-react';
import { useCaptionTableSelection } from '../../hooks';
import {
  getActiveSuggestionsForSegment,
  getTextPartsWithSuggestions,
} from '../../utils/mock-ai/text-suggestions';
import { getPlayheadPhase } from '../../utils/captions/playhead-phase';
import type { TextPart } from './caption-table-row';
import { CaptionTableRow } from './caption-table-row';

function replaceFirstOccurrence(text: string, original: string, replacement: string): string {
  const idx = text.toLowerCase().indexOf(original.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + replacement + text.slice(idx + original.length);
}

const CaptionPanel = ({
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
  onAddCaption: () => void;
  onSplit: () => void;
  onMerge: () => void;
  onDelete: () => void;
  onPlayCaption: (id: CaptionSegmentId) => void;
  playheadMs: number;
}) => {
  const { overlapIds, canMerge, canDelete, canSplit } = useCaptionTableSelection(doc, selectedId, selectedIds);

  const handleApplySuggestion = useCallback(
    (suggestion: TextSuggestion, replacement: string) => {
      if (!doc) return;
      const seg = doc.segments.find((s) => s.id === suggestion.segmentId);
      if (!seg) return;
      const newText = replaceFirstOccurrence(seg.text, suggestion.originalText, replacement);
      onEditCaptionText(suggestion.segmentId, newText);
    },
    [doc, onEditCaptionText]
  );

  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!selectedId) return;
    const root = listRef.current;
    if (!root) return;
    const el = root.querySelector<HTMLElement>(`[data-segment-id="${selectedId}"]`);
    if (!el) return;
    // Ensure the selected caption is visible for editing.
    requestAnimationFrame(() => {
      el.scrollIntoView({ block: 'nearest' });
    });
  }, [selectedId]);

  return <div className="ccPanel ccCaptionsPanel">
  <div className="ccPanelHeaderRow">
    <div className="ccPanelTitle">Captions</div>
    <div className="ccCaptionHeaderRight">
      <label className="ccCaptionFilterToggle">
        <input
          type="checkbox"
          className="ccCheckboxInput"
          checked={showOnlyFlagged}
          onChange={(e) => onToggleShowOnlyFlagged(e.target.checked)}
        />
        <span>Warnings only</span>
      </label>
      <div className="ccGhostIconRow">
        <button className="ccGhostIconBtn" disabled={!canSplit} onClick={onSplit} title="Split">
          <Scissors size={16} />
        </button>
        <button className="ccGhostIconBtn" disabled={!canMerge} onClick={onMerge} title="Merge">
          <GitMerge size={16} />
        </button>
        <button className="ccGhostIconBtn ccGhostDanger" disabled={!canDelete} onClick={onDelete} title="Delete">
          <Trash2 size={16} />
        </button>
        <button className="ccGhostIconBtn" disabled={!doc} onClick={onAddCaption} title="Add caption">
          <Plus size={16} />
        </button>
      </div>
    </div>
  </div>

  {!doc ? (
    <div className="ccEmpty">
      Click <b>Import</b> to load demo MP4 + SRT.
    </div>
  ) : (
    <>
      <div ref={listRef} className="ccCaptionTableWrap">
        <table className="ccCaptionTable">
          <thead>
            <tr>
              <th className="ccCaptionTableThNum">#</th>
              <th className="ccCaptionTableThTime">Start</th>
              <th className="ccCaptionTableThTime">End</th>
              <th className="ccCaptionTableThSpeaker">Speaker</th>
              <th className="ccCaptionTableThText">Text</th>
            </tr>
          </thead>
          <tbody>
            {doc.segments
              .slice()
              .sort((a: CaptionSegment, b: CaptionSegment) => a.startMs - b.startMs)
              .map((seg) => {
                const segmentSuggestions = getActiveSuggestionsForSegment(seg, ignoredSuggestionIds);
                const hasSuggestions = segmentSuggestions.length > 0;
                const isOverlap = overlapIds.has(seg.id);
                if (showOnlyFlagged && !isOverlap && !hasSuggestions) return null;
                const textParts: TextPart[] = hasSuggestions
                  ? getTextPartsWithSuggestions(seg.text, segmentSuggestions)
                  : [];
                const playheadPhase = getPlayheadPhase(seg.startMs, seg.endMs, playheadMs);
                return (
                  <CaptionTableRow
                    key={seg.id}
                    segment={seg}
                    isPrimary={seg.id === selectedId}
                    isSelected={selectedIds.has(seg.id)}
                    isOverlap={isOverlap}
                    hasSuggestions={hasSuggestions}
                    playheadPhase={playheadPhase}
                    textParts={textParts}
                    onSelect={onSelect}
                    onToggleSelect={onToggleSelect}
                    onPlayCaption={onPlayCaption}
                    onEditCaptionText={onEditCaptionText}
                    onApplySuggestion={handleApplySuggestion}
                    onIgnoreSuggestion={onIgnoreSuggestion}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  )}
</div>
};

export default CaptionPanel;