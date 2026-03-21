import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import type { CaptionDoc, CaptionSegmentId } from '../utils/captions/types';
import type { TextSuggestion } from '../utils/mock-ai/text-suggestions';
import { getActiveSuggestionsForSegment, getTextPartsWithSuggestions } from '../utils/mock-ai/text-suggestions';
import { SuggestionPopover } from './panels/suggestion-popover';

function replaceFirstOccurrence(text: string, original: string, replacement: string): string {
  const idx = text.toLowerCase().indexOf(original.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + replacement + text.slice(idx + original.length);
}

const HOVER_CLOSE_DELAY_MS = 200;

type Props = {
  doc: CaptionDoc | null;
  segmentId: CaptionSegmentId | null;
  text: string;
  ignoredSuggestionIds: Set<string>;
  onEditCaptionText: (segmentId: CaptionSegmentId, nextText: string) => void;
  onIgnoreSuggestion: (id: string) => void;
};

export const BurnedInCaption = ({
  doc,
  segmentId,
  text,
  ignoredSuggestionIds,
  onEditCaptionText,
  onIgnoreSuggestion,
}: Props) => {
  const [hoveredSuggestion, setHoveredSuggestion] = useState<TextSuggestion | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useMemo(() => {
    if (!doc || !segmentId) return [];
    const seg = doc.segments.find((s) => s.id === segmentId);
    return seg ? getActiveSuggestionsForSegment(seg, ignoredSuggestionIds) : [];
  }, [doc, segmentId, ignoredSuggestionIds]);

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

  useEffect(() => {
    syncScroll();
    const ta = textareaRef.current;
    const content = overlayContentRef.current;
    if (ta && content) {
      content.style.minHeight = `${ta.scrollHeight}px`;
    }
  }, [text, syncScroll]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${Math.min(140, el.scrollHeight)}px`;
  }, [text]);

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

  if (!segmentId) return null;

  return (
    <div className="ccBurnedInCaption">
      <div className="ccBurnedInCaptionTextareaWrap">
        <textarea
          ref={textareaRef}
          className="ccBurnedInCaptionInput"
          value={text}
          onChange={(e) => onEditCaptionText(segmentId, e.target.value)}
          onScroll={syncScroll}
          spellCheck
        />
        {textParts.length > 0 ? (
          <div ref={overlayRef} className="ccBurnedInCaptionSuggestionOverlay" aria-hidden>
            <div ref={overlayContentRef} className="ccBurnedInCaptionSuggestionOverlayContent">
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
        ) : null}
      </div>
      {hoveredSuggestion && anchorRect ? (
        <SuggestionPopover
          suggestions={[hoveredSuggestion]}
          anchorRect={anchorRect}
          isOpen={!!hoveredSuggestion}
          onApply={handleApply}
          onIgnore={onIgnoreSuggestion}
          onPopoverMouseEnter={cancelClose}
          onPopoverMouseLeave={scheduleClose}
        />
      ) : null}
    </div>
  );
};
