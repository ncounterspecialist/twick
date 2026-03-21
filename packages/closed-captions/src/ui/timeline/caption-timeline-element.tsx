import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from '@use-gesture/react';
import type { CaptionSegment } from '../../utils/captions/types';
import type { PlayheadPhase } from '../../utils/captions/playhead-phase';
import { snapSegmentTiming } from '../../utils/audio/snap-timing';

const MIN_DURATION_MS = 200;
const SNAP_TOLERANCE_MS = 120;

export type CaptionTimelineElementProps = {
  segment: CaptionSegment;
  selected: boolean;
  inSelection: boolean;
  isOverlap: boolean;
  hasSuggestions: boolean;
  playheadPhase: PlayheadPhase;
  parentWidthPx: number;
  durationMs: number;
  snapPointsMs: number[];
  onSelect: () => void;
  onUpdateTiming: (params: { startMs: number; endMs: number; dragType: 'move' | 'start' | 'end' }) => void;
};

export const CaptionTimelineElement: FC<CaptionTimelineElementProps> = ({
  segment,
  selected,
  inSelection,
  isOverlap,
  hasSuggestions,
  playheadPhase,
  parentWidthPx,
  durationMs,
  snapPointsMs,
  onSelect,
  onUpdateTiming,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

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

  const bindMove = useDrag(({ delta: [dx], last }) => {
    if (!parentWidthPx) return;
    setPos((prev) => {
      const span = prev.endMs - prev.startMs;
      const nextStart = prev.startMs + toMs(dx);
      const next = clamp(nextStart, nextStart + span);
      if (last) {
        const snapped = snapSegmentTiming(
          next.startMs,
          next.endMs,
          'move',
          snapPointsMs,
          SNAP_TOLERANCE_MS,
          durationMs,
          MIN_DURATION_MS
        );
        onUpdateTiming({ ...snapped, dragType: 'move' });
        return snapped;
      }
      return next;
    });
  });

  const bindStart = useDrag(({ delta: [dx], event, last }) => {
    event?.stopPropagation();
    if (!parentWidthPx) return;
    setPos((prev) => {
      const next = clamp(prev.startMs + toMs(dx), prev.endMs);
      if (last) {
        const snapped = snapSegmentTiming(
          next.startMs,
          next.endMs,
          'start',
          snapPointsMs,
          SNAP_TOLERANCE_MS,
          durationMs,
          MIN_DURATION_MS
        );
        onUpdateTiming({ ...snapped, dragType: 'start' });
        return snapped;
      }
      return next;
    });
  });

  const bindEnd = useDrag(({ delta: [dx], event, last }) => {
    event?.stopPropagation();
    if (!parentWidthPx) return;
    setPos((prev) => {
      const next = clamp(prev.startMs, prev.endMs + toMs(dx));
      if (last) {
        const snapped = snapSegmentTiming(
          next.startMs,
          next.endMs,
          'end',
          snapPointsMs,
          SNAP_TOLERANCE_MS,
          durationMs,
          MIN_DURATION_MS
        );
        onUpdateTiming({ ...snapped, dragType: 'end' });
        return snapped;
      }
      return next;
    });
  });

  const leftPct = durationMs > 0 ? (pos.startMs / durationMs) * 100 : 0;
  const widthPct = durationMs > 0 ? ((pos.endMs - pos.startMs) / durationMs) * 100 : 0;
  const className = useMemo(() => {
    const parts = ['ccTimelineEl'];
    if (playheadPhase === 'active') parts.push('ccPlayheadActive');
    if (playheadPhase === 'past') parts.push('ccPlayheadPast');
    if (playheadPhase === 'future') parts.push('ccPlayheadFuture');
    if (selected) parts.push('isSelected');
    else if (inSelection) parts.push('isInSelection');
    if (isOverlap) parts.push('isOverlap');
    if (hasSuggestions) parts.push('ccHasSuggestion');
    return parts.join(' ');
  }, [playheadPhase, selected, inSelection, isOverlap, hasSuggestions]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
      onMouseDown={(e) => {
        e.stopPropagation();
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

