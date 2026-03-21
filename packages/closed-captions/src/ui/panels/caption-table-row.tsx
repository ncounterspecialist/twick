import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import type { CaptionSegment, CaptionSegmentId } from '../../utils/captions/types';
import type { PlayheadPhase } from '../../utils/captions/playhead-phase';
import type { TextSuggestion } from '../../utils/mock-ai/text-suggestions';
import { formatClock } from '../format-clock';
import { SuggestionPopover } from './suggestion-popover';

export type TextPart = { text: string; suggestion: TextSuggestion | null };

const HOVER_CLOSE_DELAY_MS = 200;

type CaptionTableRowProps = {
  segment: CaptionSegment;
  isPrimary: boolean;
  isSelected: boolean;
  isOverlap: boolean;
  hasSuggestions: boolean;
  playheadPhase: PlayheadPhase;
  textParts: TextPart[];
  onSelect: (id: CaptionSegmentId, event: ReactMouseEvent) => void;
  onToggleSelect: (id: CaptionSegmentId, event: ReactMouseEvent) => void;
  onPlayCaption: (id: CaptionSegmentId) => void;
  onEditCaptionText: (id: CaptionSegmentId, nextText: string) => void;
  onApplySuggestion: (suggestion: TextSuggestion, replacement: string) => void;
  onIgnoreSuggestion: (id: string) => void;
};

export function CaptionTableRow({
  segment,
  isPrimary,
  isSelected,
  isOverlap,
  hasSuggestions,
  playheadPhase,
  textParts,
  onSelect,
  onToggleSelect,
  onPlayCaption,
  onEditCaptionText,
  onApplySuggestion,
  onIgnoreSuggestion,
}: CaptionTableRowProps) {
  const [hoveredSuggestion, setHoveredSuggestion] = useState<TextSuggestion | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);

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

  const syncScroll = useCallback(() => {
    const ta = textareaRef.current;
    const ov = overlayRef.current;
    if (ta && ov) {
      ov.scrollTop = ta.scrollTop;
      ov.scrollLeft = ta.scrollLeft;
    }
  }, []);

  useEffect(() => {
    syncScroll();
    const ta = textareaRef.current;
    const content = overlayContentRef.current;
    if (ta && content) {
      content.style.minHeight = `${ta.scrollHeight}px`;
    }
  }, [segment.text, syncScroll]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${Math.min(120, Math.max(36, el.scrollHeight))}px`;
  }, [segment.text]);

  const speakerLabel = segment.speaker?.trim() ? segment.speaker.trim() : '-';

  const overlaySpans =
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
    ) : null;

  return (
    <>
      <tr
        data-segment-id={segment.id}
        className={[
          'ccCaptionTableRow',
          playheadPhase === 'active' ? 'ccPlayheadActive' : '',
          playheadPhase === 'past' ? 'ccPlayheadPast' : '',
          playheadPhase === 'future' ? 'ccPlayheadFuture' : '',
          isSelected ? 'isSelected' : '',
          isPrimary ? 'isPrimary' : '',
          isOverlap ? 'isOverlap' : '',
          hasSuggestions ? 'ccHasSuggestion' : '',
        ].join(' ')}
        onClick={(e) => onSelect(segment.id, e)}
        onDoubleClick={(e) => {
          e.preventDefault();
          onPlayCaption(segment.id);
        }}
        title="Cmd/Ctrl-click to multi-select · Shift-click for range · Double-click row to play"
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
        </td>
        <td className="ccCaptionTableTdTime ccMono">{formatClock(segment.startMs)}</td>
        <td className="ccCaptionTableTdTime ccMono">{formatClock(segment.endMs)}</td>
        <td className="ccCaptionTableTdSpeaker">{speakerLabel}</td>
        <td className="ccCaptionTableTdText ccCaptionTableTdTextEditor">
          <div className="ccCaptionTableTextWrap">
            <textarea
              ref={textareaRef}
              className="ccCaptionTableTextarea"
              value={segment.text}
              onChange={(e) => onEditCaptionText(segment.id, e.target.value)}
              onScroll={syncScroll}
              onDoubleClick={(e) => e.stopPropagation()}
              spellCheck
              rows={1}
              aria-label="Caption text"
            />
            {overlaySpans ? (
              <div ref={overlayRef} className="ccCaptionTableSuggestionOverlay" aria-hidden>
                <div ref={overlayContentRef} className="ccCaptionTableSuggestionOverlayContent">
                  {overlaySpans}
                </div>
              </div>
            ) : null}
          </div>
        </td>
      </tr>
      {hoveredSuggestion && anchorRect ? (
        <SuggestionPopover
          suggestions={[hoveredSuggestion]}
          anchorRect={anchorRect}
          isOpen={!!hoveredSuggestion}
          onApply={onApplySuggestion}
          onIgnore={onIgnoreSuggestion}
          onPopoverMouseEnter={cancelClose}
          onPopoverMouseLeave={scheduleClose}
        />
      ) : null}
    </>
  );
}
