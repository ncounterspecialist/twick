import { useCallback, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import type { CaptionSegment, CaptionSegmentId } from '../../utils/captions/types';
import type { TextSuggestion } from '../../utils/mockAi/textSuggestions';
import { formatClock } from '../formatClock';
import { SuggestionPopover } from './SuggestionPopover';

export type TextPart = { text: string; suggestion: TextSuggestion | null };

const HOVER_CLOSE_DELAY_MS = 200;

type CaptionTableRowProps = {
  segment: CaptionSegment;
  index: number;
  isPrimary: boolean;
  isSelected: boolean;
  isOverlap: boolean;
  hasSuggestions: boolean;
  textParts: TextPart[];
  onSelect: (id: CaptionSegmentId, event: ReactMouseEvent) => void;
  onToggleSelect: (id: CaptionSegmentId, event: ReactMouseEvent) => void;
  onApplySuggestion: (suggestion: TextSuggestion, replacement: string) => void;
  onIgnoreSuggestion: (id: string) => void;
};

export function CaptionTableRow({
  segment,
  index,
  isPrimary,
  isSelected,
  isOverlap,
  hasSuggestions,
  textParts,
  onSelect,
  onToggleSelect,
  onApplySuggestion,
  onIgnoreSuggestion,
}: CaptionTableRowProps) {
  const [hoveredSuggestion, setHoveredSuggestion] = useState<TextSuggestion | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null;
      setHoveredSuggestion(null);
      setAnchorRect(null);
    }, HOVER_CLOSE_DELAY_MS);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleSpanMouseEnter = useCallback(
    (e: ReactMouseEvent<HTMLSpanElement>, suggestion: TextSuggestion) => {
      cancelClose();
      setAnchorRect(e.currentTarget.getBoundingClientRect());
      setHoveredSuggestion(suggestion);
    },
    [cancelClose]
  );

  const handleSpanMouseLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  const speakerLabel = segment.speaker?.trim() ? segment.speaker.trim() : '-';

  const textCellContent =
    textParts.length > 0 ? (
      <>
        {textParts.map((part, i) =>
          part.suggestion ? (
            <span
              key={i}
              className="ccSuggestionUnderline ccSuggestionTrigger"
              onMouseEnter={(e) => handleSpanMouseEnter(e, part.suggestion!)}
              onMouseLeave={handleSpanMouseLeave}
            >
              {part.text}
            </span>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </>
    ) : (
      segment.text
    );

  return (
    <>
      <tr
        data-segment-id={segment.id}
        className={[
          'ccCaptionTableRow',
          isSelected ? 'isSelected' : '',
          isPrimary ? 'isPrimary' : '',
          isOverlap ? 'isOverlap' : '',
          hasSuggestions ? 'ccHasSuggestion' : '',
        ].join(' ')}
        onClick={(e) => onSelect(segment.id, e)}
        title="Cmd/Ctrl-click to multi-select - Shift-click for range"
      >
        <td className="ccCaptionTableTdNum">
          <button
            type="button"
            className={['ccCaptionCheckbox', isSelected ? 'isChecked' : ''].join(' ')}
            onClick={(e) => onToggleSelect(segment.id, e)}
            title="Select"
          >
            <span className="ccCaptionCheckboxInner" />
          </button>
          {index + 1}
        </td>
        <td className="ccCaptionTableTdTime ccMono">{formatClock(segment.startMs)}</td>
        <td className="ccCaptionTableTdTime ccMono">{formatClock(segment.endMs)}</td>
        <td className="ccCaptionTableTdSpeaker">{speakerLabel}</td>
        <td className="ccCaptionTableTdText">{textCellContent}</td>
      </tr>
      {hoveredSuggestion && (
        <SuggestionPopover
          suggestions={[hoveredSuggestion]}
          anchorRect={anchorRect}
          isOpen={!!hoveredSuggestion}
          onApply={onApplySuggestion}
          onIgnore={onIgnoreSuggestion}
          onPopoverMouseEnter={cancelClose}
          onPopoverMouseLeave={scheduleClose}
        />
      )}
    </>
  );
}
