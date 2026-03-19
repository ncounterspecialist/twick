import { useEffect, useMemo, useRef, useState } from 'react';
import type { CaptionDoc, CaptionSegmentId } from '../../utils/captions/types';
import { getActiveSuggestionsForSegment } from '../../utils/mockAi/textSuggestions';
import { CaptionTimelineElement } from './CaptionTimelineElement';
import { VideoWaveformTrack } from './VideoWaveformTrack';

const SUBTITLE_TRACK_HEIGHT_PX = 56;
const VIDEO_TRACK_HEIGHT_PX = 70;
const LABEL_COL_PX = 96;
const MIN_CONTENT_PX = 900;
const SCALE_HEIGHT_PX = 26;

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const formatScaleLabel = (ms: number) => {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const pickMajorTickSec = (durationMs: number) => {
  const d = durationMs / 1000;
  if (d <= 20) return 1;
  // Prefer 5s majors for short timelines so 0-10s is visually tighter.
  if (d <= 60) return 5;
  if (d <= 5 * 60) return 10;
  if (d <= 15 * 60) return 30;
  return 60;
};

export const ClosedCaptionsTimeline = ({
  doc,
  selectedId,
  selectedIds,
  ignoredSuggestionIds,
  showOnlyFlagged,
  durationMs,
  playheadMs,
  mediaUrl,
  pxPerSecond,
  onSelect,
  onSeekMs,
  onUpdateTiming,
}: {
  doc: CaptionDoc;
  selectedId: CaptionSegmentId | null;
  selectedIds: Set<CaptionSegmentId>;
  ignoredSuggestionIds: Set<string>;
  showOnlyFlagged: boolean;
  durationMs: number;
  playheadMs: number;
  mediaUrl?: string;
  pxPerSecond: number;
  onSelect: (id: CaptionSegmentId) => void;
  onSeekMs: (ms: number) => void;
  onUpdateTiming: (params: {
    id: CaptionSegmentId;
    startMs: number;
    endMs: number;
    dragType: 'move' | 'start' | 'end';
  }) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentWidthPx, setContentWidthPx] = useState(MIN_CONTENT_PX);

  useEffect(() => {
    const w = Math.max(MIN_CONTENT_PX, Math.round((durationMs / 1000) * pxPerSecond));
    setContentWidthPx(w);
  }, [durationMs, pxPerSecond]);

  const segments = useMemo(() => doc.segments.slice().sort((a, b) => a.startMs - b.startMs), [doc.segments]);
  const segmentHasSuggestions = useMemo(() => {
    const set = new Set<CaptionSegmentId>();
    segments.forEach((seg) => {
      if (getActiveSuggestionsForSegment(seg, ignoredSuggestionIds).length > 0) set.add(seg.id);
    });
    return set;
  }, [segments, ignoredSuggestionIds]);
  const overlapIds = useMemo(() => {
    const ids = new Set<CaptionSegmentId>();
    for (let i = 1; i < segments.length; i += 1) {
      if (segments[i].startMs < segments[i - 1].endMs) {
        ids.add(segments[i].id);
      }
    }
    return ids;
  }, [segments]);

  const playheadLeftPx = (playheadMs / Math.max(1, durationMs)) * contentWidthPx;

  const majorTickSec = useMemo(() => pickMajorTickSec(durationMs), [durationMs]);
  const scaleTicks = useMemo(() => {
    const ticks: Array<{ tMs: number; leftPx: number; label?: string; kind: 'major' | 'minor' }> = [];
    const majorMs = majorTickSec * 1000;
    const minorMs =
      majorTickSec === 5
        ? 1000
        : majorTickSec === 10
          ? 5000
          : majorTickSec === 30
            ? 10000
            : majorTickSec === 60
              ? 30000
              : null;
    const max = Math.max(0, durationMs);
    const pxPerMajor = (majorMs / Math.max(1, durationMs)) * contentWidthPx;
    const labelEvery = pxPerMajor < 70 ? 2 : 1;

    // Drive by minor ticks for consistent density.
    const stepMs = minorMs ?? majorMs;
    for (let t = 0, majorIndex = 0; t <= max; t += stepMs) {
      const isMajor = t % majorMs === 0;
      const leftPx = (t / Math.max(1, durationMs)) * contentWidthPx;
      if (isMajor) {
        const shouldLabel = majorIndex % labelEvery === 0;
        ticks.push({
          tMs: t,
          leftPx,
          label: shouldLabel ? formatScaleLabel(t) : undefined,
          kind: 'major',
        });
        majorIndex += 1;
      } else {
        ticks.push({ tMs: t, leftPx, kind: 'minor' });
      }
    }
    return ticks;
  }, [durationMs, contentWidthPx, majorTickSec]);

  // Keep playhead in view when it moves.
  useEffect(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    const viewport = sc.clientWidth - LABEL_COL_PX;
    if (viewport <= 0) return;

    const contentMaxScroll = Math.max(0, contentWidthPx - viewport);
    const playheadPxInContent = (playheadMs / Math.max(1, durationMs)) * contentWidthPx;
    const playheadViewportX = playheadPxInContent - sc.scrollLeft;
    const padding = 120;

    if (playheadViewportX < padding) {
      sc.scrollLeft = clamp(sc.scrollLeft - (padding - playheadViewportX), 0, contentMaxScroll);
    } else if (playheadViewportX > viewport - padding) {
      sc.scrollLeft = clamp(sc.scrollLeft + (playheadViewportX - (viewport - padding)), 0, contentMaxScroll);
    }
  }, [playheadMs, durationMs, contentWidthPx]);

  const handleSeek = (e: React.MouseEvent) => {
    const content = contentRef.current;
    if (!content) return;
    const rect = content.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = clamp(x / Math.max(1, contentWidthPx), 0, 1);
    onSeekMs(Math.round(pct * durationMs));
  };

  return (
    <div className="ccTlScroll" ref={scrollRef}>
      <div className="ccTlGrid" style={{ width: LABEL_COL_PX + contentWidthPx }}>
        <div className="ccTlLabels" style={{ width: LABEL_COL_PX }}>
          <div className="ccTlScaleLabelRow" style={{ height: SCALE_HEIGHT_PX }}>
            Time
          </div>
          <div className="ccTlLabelRow" style={{ height: SUBTITLE_TRACK_HEIGHT_PX }}>
            Subtitles
          </div>
          <div className="ccTlLabelRow" style={{ height: VIDEO_TRACK_HEIGHT_PX }}>
            Video
          </div>
        </div>

        <div className="ccTlContent" ref={contentRef} onMouseDown={handleSeek}>
          <div className="ccTlScaleRow" style={{ height: SCALE_HEIGHT_PX }}>
            <div className="ccTlScaleRail" style={{ width: contentWidthPx }}>
              {scaleTicks.map((tick) => (
                <div
                  key={`${tick.kind}-${tick.tMs}`}
                  className={['ccTlScaleTick', tick.kind === 'minor' ? 'isMinor' : ''].join(' ')}
                  style={{ left: tick.leftPx }}
                >
                  <div className="ccTlScaleLine" />
                  {tick.label ? <div className="ccTlScaleText">{tick.label}</div> : null}
                </div>
              ))}
            </div>
          </div>

          <div className="ccTlPlayhead" style={{ left: playheadLeftPx }}>
            <div className="ccTlPlayheadHandle" />
          </div>

          <div className="ccTlTrackRow" style={{ height: SUBTITLE_TRACK_HEIGHT_PX }}>
            <div className="ccTlTrackShell" style={{ width: contentWidthPx }}>
              {segments.map((seg) => {
                const hasSuggestions = segmentHasSuggestions.has(seg.id);
                const isOverlap = overlapIds.has(seg.id);
                if (showOnlyFlagged && !hasSuggestions && !isOverlap) return null;
                return (
                  <CaptionTimelineElement
                    key={seg.id}
                    segment={seg}
                    selected={seg.id === selectedId}
                    inSelection={selectedIds.has(seg.id)}
                    isOverlap={isOverlap}
                    hasSuggestions={hasSuggestions}
                    parentWidthPx={contentWidthPx}
                    durationMs={durationMs}
                    onSelect={() => onSelect(seg.id)}
                    onUpdateTiming={(p) => onUpdateTiming({ id: seg.id, ...p })}
                  />
                );
              })}
            </div>
          </div>

          <div className="ccTlTrackRow" style={{ height: VIDEO_TRACK_HEIGHT_PX }}>
            <VideoWaveformTrack
              mediaUrl={mediaUrl}
              durationMs={durationMs}
              widthPx={contentWidthPx}
              heightPx={VIDEO_TRACK_HEIGHT_PX}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

