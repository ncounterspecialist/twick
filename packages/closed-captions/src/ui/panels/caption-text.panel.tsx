import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import type { CaptionDoc, CaptionSegmentId } from '../../utils/captions/types';
import type { TextSuggestion } from '../../utils/mockAi/textSuggestions';
import { getTextPartsWithSuggestions } from '../../utils/mockAi/textSuggestions';
import { SuggestionPopover } from './SuggestionPopover';

type Props = {
  doc: CaptionDoc | null;
  selectedId: CaptionSegmentId | null;
  suggestions: TextSuggestion[];
  onEditCaptionText: (id: CaptionSegmentId, nextText: string) => void;
  onIgnoreSuggestion: (id: string) => void;
};

function replaceFirstOccurrence(text: string, original: string, replacement: string): string {
  const idx = text.toLowerCase().indexOf(original.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + replacement + text.slice(idx + original.length);
}

const HOVER_CLOSE_DELAY_MS = 200;

export const CaptionTextPanel = ({
  doc,
  selectedId,
  suggestions,
  onEditCaptionText,
  onIgnoreSuggestion,
}: Props) => {
  const [hoveredSuggestion, setHoveredSuggestion] = useState<TextSuggestion | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const text = selectedId && doc ? doc.segments.find((s) => s.id === selectedId)?.text ?? '' : '';
  const textParts =
    text && suggestions.length > 0 ? getTextPartsWithSuggestions(text, suggestions) : [];

  const syncScroll = useCallback(() => {
    const ta = textareaRef.current;
    const ov = overlayRef.current;
    if (ta && ov) {
      ov.scrollTop = ta.scrollTop;
      ov.scrollLeft = ta.scrollLeft;
    }
  }, []);

  const overlayContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    syncScroll();
    const ta = textareaRef.current;
    const content = overlayContentRef.current;
    if (ta && content) {
      content.style.minHeight = `${ta.scrollHeight}px`;
    }
  }, [text, syncScroll]);

  const handleApply = useCallback(
    (sug: TextSuggestion, replacement: string) => {
      if (!doc || !sug.segmentId) return;
      const seg = doc.segments.find((s) => s.id === sug.segmentId);
      if (!seg) return;
      const newText = replaceFirstOccurrence(seg.text, sug.originalText, replacement);
      onEditCaptionText(sug.segmentId, newText);
    },
    [doc, onEditCaptionText]
  );

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

  return (
    <div className="ccCaptionEditorSection">
      <div className="ccPanelTitle">Caption text</div>
      <div className="ccCaptionTextareaWrap">
        <textarea
          ref={textareaRef}
          className="ccCaptionEditorTextarea"
          placeholder={selectedId ? 'Edit selected caption…' : 'Select a caption to edit'}
          value={text}
          onChange={(e) => selectedId && onEditCaptionText(selectedId, e.target.value)}
          onScroll={syncScroll}
          disabled={!selectedId}
          spellCheck
        />
        {textParts.length > 0 && (
          <div
            ref={overlayRef}
            className="ccCaptionSuggestionOverlay"
            aria-hidden
          >
            <div ref={overlayContentRef} className="ccCaptionSuggestionOverlayContent">
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
            </div>
          </div>
        )}
      </div>
      {hoveredSuggestion && anchorRect && (
        <SuggestionPopover
          suggestions={[hoveredSuggestion]}
          anchorRect={anchorRect}
          isOpen={!!hoveredSuggestion}
          onApply={handleApply}
          onIgnore={onIgnoreSuggestion}
          onPopoverMouseEnter={cancelClose}
          onPopoverMouseLeave={scheduleClose}
        />
      )}
    </div>
  );
};
