import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from '@use-gesture/react';
import type { CaptionSegment } from '../../utils/captions/types';

const MIN_DURATION_MS = 200;

export type CaptionTimelineElementProps = {
  segment: CaptionSegment;
  selected: boolean;
  inSelection: boolean;
  isOverlap: boolean;
  hasSuggestions: boolean;
  parentWidthPx: number;
  durationMs: number;
  onSelect: () => void;
  onUpdateTiming: (params: { startMs: number; endMs: number; dragType: 'move' | 'start' | 'end' }) => void;
};

export const CaptionTimelineElement: FC<CaptionTimelineElementProps> = ({
  segment,
  selected,
  inSelection,
  isOverlap,
  hasSuggestions,
  parentWidthPx,
  durationMs,
  onSelect,
  onUpdateTiming,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const dragTypeRef = useRef<'move' | 'start' | 'end'>('move');
  const lastPosRef = useRef<{ startMs: number; endMs: number } | null>(null);

  const [pos, setPos] = useState(() => ({ startMs: segment.startMs, endMs: segment.endMs }));

  useEffect(() => {
    setPos({ startMs: segment.startMs, endMs: segment.endMs });
  }, [segment.startMs, segment.endMs]);

  const toMs = (dx: number) => {
    if (!parentWidthPx || durationMs <= 0) return 0;
    return (dx / parentWidthPx) * durationMs;
  };

  const clamp = (startMs: number, endMs: number) => {
    let s = Math.max(0, startMs);
    let e = Math.min(durationMs, endMs);
    if (e - s < MIN_DURATION_MS) {
      e = Math.min(durationMs, s + MIN_DURATION_MS);
      s = Math.max(0, e - MIN_DURATION_MS);
    }
    return { startMs: s, endMs: e };
  };

  const bindMove = useDrag(({ delta: [dx], first, last }) => {
    if (!parentWidthPx) return;
    if (first) {
      dragTypeRef.current = 'move';
      lastPosRef.current = pos;
    }
    setPos((prev) => {
      const span = prev.endMs - prev.startMs;
      const nextStart = prev.startMs + toMs(dx);
      const next = clamp(nextStart, nextStart + span);
      return next;
    });
    if (last) {
      const finalPos = lastPosRef.current ? clamp(pos.startMs, pos.endMs) : clamp(pos.startMs, pos.endMs);
      onUpdateTiming({ ...finalPos, dragType: 'move' });
    }
  });

  const bindStart = useDrag(({ delta: [dx], event, first, last }) => {
    event?.stopPropagation();
    if (!parentWidthPx) return;
    if (first) {
      dragTypeRef.current = 'start';
      lastPosRef.current = pos;
    }
    setPos((prev) => clamp(prev.startMs + toMs(dx), prev.endMs));
    if (last) {
      const next = clamp(pos.startMs, pos.endMs);
      onUpdateTiming({ ...next, dragType: 'start' });
    }
  });

  const bindEnd = useDrag(({ delta: [dx], event, first, last }) => {
    event?.stopPropagation();
    if (!parentWidthPx) return;
    if (first) {
      dragTypeRef.current = 'end';
      lastPosRef.current = pos;
    }
    setPos((prev) => clamp(prev.startMs, prev.endMs + toMs(dx)));
    if (last) {
      const next = clamp(pos.startMs, pos.endMs);
      onUpdateTiming({ ...next, dragType: 'end' });
    }
  });

  const leftPct = durationMs > 0 ? (pos.startMs / durationMs) * 100 : 0;
  const widthPct = durationMs > 0 ? ((pos.endMs - pos.startMs) / durationMs) * 100 : 0;
  const className = useMemo(() => {
    const parts = ['ccTimelineEl'];
    if (selected) parts.push('isSelected');
    else if (inSelection) parts.push('isInSelection');
    if (isOverlap) parts.push('isOverlap');
    if (hasSuggestions) parts.push('ccHasSuggestion');
    return parts.join(' ');
  }, [selected, inSelection, isOverlap, hasSuggestions]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
      onMouseDown={(e) => {
        e.stopPropagation();
        lastPosRef.current = pos;
        // Prevent timeline background seek when interacting with this element.
        // (We still allow seeking by clicking empty timeline space.)
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div className="ccTimelineElMove" {...bindMove()} />
      <div className="ccTimelineElText" title={segment.text}>
        {segment.text}
      </div>
      {selected ? <div className="ccTimelineHandle ccTimelineHandleStart" {...bindStart()} /> : null}
      {selected ? <div className="ccTimelineHandle ccTimelineHandleEnd" {...bindEnd()} /> : null}
    </div>
  );
};

