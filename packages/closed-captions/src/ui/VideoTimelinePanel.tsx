import { useMemo, useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import type { CaptionDoc, CaptionSegmentId } from '../utils/captions/types';
import type { MockDocInsights, MockSegmentInsights } from '../utils/mockAi/types';
import { ClosedCaptionsTimeline } from './timeline/ClosedCaptionsTimeline';
import { applyUpdateTiming } from '../utils/editor/actions';
import { buildMockInsightsForDoc, buildMockInsightsForSegment } from '../utils/mockAi/mockAi';

export const VideoTimelinePanel = ({
  doc,
  selectedId,
  selectedIds,
  ignoredSuggestionIds,
  showOnlyFlagged,
  durationMs,
  playheadMs,
  mediaUrl,
  onSelect,
  onSeekMs,
  onDocChange,
  setMockDocInsights,
  setMockSegmentInsights,
  showToast,
}: {
  doc: CaptionDoc | null;
  selectedId: CaptionSegmentId | null;
  selectedIds: Set<CaptionSegmentId>;
  ignoredSuggestionIds: Set<string>;
  showOnlyFlagged: boolean;
  durationMs: number;
  playheadMs: number;
  mediaUrl: string | null;
  onSelect: (id: CaptionSegmentId) => void;
  onSeekMs: (ms: number) => void;
  onDocChange: (doc: CaptionDoc, selectedId?: CaptionSegmentId | null) => void;
  setMockDocInsights: (v: MockDocInsights | null) => void;
  setMockSegmentInsights: (v: MockSegmentInsights | null) => void;
  showToast: (msg: string) => void;
}) => {
  // Base scale for long videos (1h+) - kept small by default.
  const BASE_PX_PER_SECOND = 105;
  const [zoom, setZoom] = useState(0.5); // default: 50% width vs previous scale

  const pxPerSecond = useMemo(() => {
    const z = Math.max(0.25, Math.min(2, zoom));
    return BASE_PX_PER_SECOND * z;
  }, [zoom]);

  return (
    !doc ? (
      <div className="ccEmpty">Import to view timeline.</div>
    ) : (
      <div className="ccPanel">
        <div className="ccPanelHeaderRow">
          <div className="ccPanelTitle" style={{ marginBottom: 0 }}>
            Video Timeline
          </div>
          <div className="ccGhostIconRow">
            <button
              className="ccGhostIconBtn"
              onClick={() => setZoom((z) => Math.max(0.25, Math.round((z - 0.25) * 100) / 100))}
              title="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              className="ccGhostIconBtn"
              onClick={() => setZoom((z) => Math.min(2, Math.round((z + 0.25) * 100) / 100))}
              title="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
            <div className="ccZoomPill" title="Current zoom">
              {Math.round(zoom * 100)}%
            </div>
          </div>
        </div>

        <ClosedCaptionsTimeline
          doc={doc}
          selectedId={selectedId}
          selectedIds={selectedIds}
          ignoredSuggestionIds={ignoredSuggestionIds}
          showOnlyFlagged={showOnlyFlagged}
          durationMs={durationMs}
          playheadMs={playheadMs}
          mediaUrl={mediaUrl ?? undefined}
          pxPerSecond={pxPerSecond}
          onSelect={onSelect}
          onSeekMs={onSeekMs}
          onUpdateTiming={({ id, startMs, endMs, dragType }) => {
            const result = applyUpdateTiming(doc, id, { startMs, endMs }, { minMs: 0, maxMs: durationMs });
            onDocChange(result.doc, result.selectedId ?? id);
            setMockDocInsights(buildMockInsightsForDoc(result.doc));
            const seg = result.doc.segments.find((s) => s.id === (result.selectedId ?? id)) ?? null;
            setMockSegmentInsights(seg ? buildMockInsightsForSegment(seg) : null);
            showToast(
              dragType === 'move' ? 'Moved caption' : dragType === 'start' ? 'Adjusted start' : 'Adjusted end'
            );
          }}
        />
      </div>
    )
  );
};

