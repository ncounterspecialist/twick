import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import demoMp4Url from '../../assets/HTML_in_100_Seconds.mp4?url';
import demoSrtUrl from '../../assets/HTML_in_100_Seconds.srt?url';
import { exportSrt, exportVtt } from '../utils/captions/export';
import { parseSrt } from '../utils/captions/parseSrt';
import type { CaptionSegment, CaptionSegmentId } from '../utils/captions/types';
import { buildMockInsightsForDoc, buildMockInsightsForSegment } from '../utils/mockAi/mockAi';
import type { MockDocInsights, MockSegmentInsights } from '../utils/mockAi/types';
import { downloadTextFile } from '../utils/system/download';
import {
  useToast,
  useCaptionState,
  useCaptionActions,
  useVideoPlayback,
} from '../hooks';
import { getActiveSuggestionsForSegment } from '../utils/mockAi/textSuggestions';
import { LeftSidebar } from './aside/LeftSidebar';
import { TopBar } from './layout/TopBar';
import { VideoTimelinePanel } from './VideoTimelinePanel';
import { VideoPlayer } from './video-player';

export const App = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { toast, showToast } = useToast();
  const { state, setState, applyResult } = useCaptionState();
  const [ignoredSuggestionIds, setIgnoredSuggestionIds] = useState<Set<string>>(new Set());
  const [showOnlyFlagged, setShowOnlyFlagged] = useState(false);
  const [, setMockDocInsights] = useState<MockDocInsights | null>(null);
  const [, setMockSegmentInsights] = useState<MockSegmentInsights | null>(null);
  const [segmentPlayUntilMs, setSegmentPlayUntilMs] = useState<number | null>(null);

  const onIgnoreSuggestion = useCallback((id: string) => {
    setIgnoredSuggestionIds((prev) => new Set(prev).add(id));
  }, []);

  const onAfterDocChange = useCallback((doc: Parameters<typeof buildMockInsightsForDoc>[0], selectedId: CaptionSegmentId | null) => {
    setMockDocInsights(buildMockInsightsForDoc(doc));
    const seg = selectedId ? doc.segments.find((s) => s.id === selectedId) ?? null : null;
    setMockSegmentInsights(seg ? buildMockInsightsForSegment(seg) : null);
  }, []);

  const {
    findText,
    setFindText,
    replaceText,
    setReplaceText,
    handleSelect,
    handleToggleSelect,
    handleEditText,
    handleFindNext,
    handleFindPrevious,
    handleReplaceOne,
    handleReplaceAll,
    handleSplit,
    handleMerge,
    handleDelete,
    handleAddCaption,
    handleSetSpeakerForSelected,
    handleRemoveSpeakerForSelected,
    handleRevert,
  } = useCaptionActions({
    state,
    setState,
    applyResult,
    videoRef,
    showToast,
    onAfterDocChange,
  });

  const {
    isPlaying,
    currentTimeMs,
    setCurrentTimeMs,
    videoDurationMs,
    playbackRate,
    setPlaybackRate,
    togglePlay,
    handleStop,
    handleScrub,
  } = useVideoPlayback({ videoRef });

  // When we're in "play single caption" mode, stop playback once we reach the
  // end of the target segment.
  useEffect(() => {
    if (!videoRef.current) return;
    if (segmentPlayUntilMs == null) return;
    if (!isPlaying) return;
    if (currentTimeMs < segmentPlayUntilMs) return;

    videoRef.current.pause();
    videoRef.current.currentTime = segmentPlayUntilMs / 1000;
    setCurrentTimeMs(segmentPlayUntilMs);
    setSegmentPlayUntilMs(null);
  }, [currentTimeMs, isPlaying, segmentPlayUntilMs, setCurrentTimeMs, videoRef]);

  const handleImport = useCallback(async () => {
    const srtText = await fetch(demoSrtUrl).then((r) => r.text());
    const parsed = parseSrt(srtText);

    setState({
      baselineDoc: parsed,
      currentDoc: parsed,
      selectedId: parsed.segments[0]?.id ?? null,
      selectedIds: new Set(parsed.segments[0]?.id ? [parsed.segments[0].id] : []),
      mediaUrl: demoMp4Url,
    });

    onAfterDocChange(parsed, parsed.segments[0]?.id ?? null);

    if (videoRef.current) {
      videoRef.current.src = demoMp4Url;
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackRate;
    }

    showToast('Imported demo MP4 + SRT');
  }, [setState, onAfterDocChange, playbackRate, showToast]);

  const handleExportSrt = useCallback(() => {
    if (!state.currentDoc) return;
    downloadTextFile('captions.srt', exportSrt(state.currentDoc));
  }, [state.currentDoc]);

  const handleExportVtt = useCallback(() => {
    if (!state.currentDoc) return;
    downloadTextFile('captions.vtt', exportVtt(state.currentDoc));
  }, [state.currentDoc]);

  const handleSave = useCallback(() => {
    if (!state.currentDoc) return;
    localStorage.setItem('twick_closed_captions_demo_doc', JSON.stringify(state.currentDoc));
    showToast('Saved locally (demo)');
  }, [state.currentDoc, showToast]);

  const handlePublish = useCallback(() => {
    showToast('Publish is disabled in Phase 1 demo');
  }, [showToast]);

  const seekToCaptionByOffset = useCallback(
    async (offset: -1 | 1) => {
      if (!state.currentDoc || !videoRef.current) return;
      const orderedAll = state.currentDoc.segments.slice().sort((a, b) => a.startMs - b.startMs);

      // Compute overlap ids (same logic as timeline).
      const overlapIds = new Set<CaptionSegmentId>();
      for (let i = 1; i < orderedAll.length; i += 1) {
        const prev = orderedAll[i - 1];
        const curr = orderedAll[i];
        if (curr.startMs < prev.endMs) overlapIds.add(curr.id);
      }

      const ordered: CaptionSegment[] = showOnlyFlagged
        ? orderedAll.filter((seg) => {
            const hasOverlap = overlapIds.has(seg.id);
            const hasSuggestions = getActiveSuggestionsForSegment(seg, ignoredSuggestionIds).length > 0;
            return hasOverlap || hasSuggestions;
          })
        : orderedAll;
      if (ordered.length === 0) return;

      const t = currentTimeMs;
      const currentIdx = state.selectedId ? ordered.findIndex((s) => s.id === state.selectedId) : -1;
      const idxFromTime = ordered.findIndex((s) => s.startMs <= t && t < s.endMs);
      const baseIdx = currentIdx !== -1 ? currentIdx : idxFromTime !== -1 ? idxFromTime : 0;

      const nextIdx = Math.max(0, Math.min(ordered.length - 1, baseIdx + offset));
      const nextSeg = ordered[nextIdx];
      if (!nextSeg) return;

      setState((prev) => ({
        ...prev,
        selectedId: nextSeg.id,
        selectedIds: new Set([nextSeg.id]),
      }));
      onAfterDocChange(state.currentDoc, nextSeg.id);

      videoRef.current.currentTime = nextSeg.startMs / 1000;
      setCurrentTimeMs(nextSeg.startMs);
      await videoRef.current.play();
      setSegmentPlayUntilMs(nextSeg.endMs);
    },
    [
      state.currentDoc,
      state.selectedId,
      currentTimeMs,
      setState,
      setCurrentTimeMs,
      onAfterDocChange,
      setSegmentPlayUntilMs,
      videoRef,
      showOnlyFlagged,
      ignoredSuggestionIds,
    ]
  );

  const currentCaption = useMemo(() => {
    if (!state.currentDoc) return { id: null as CaptionSegmentId | null, text: '' };
    const tMs = currentTimeMs;
    const seg = state.currentDoc.segments.find((s) => s.startMs <= tMs && tMs < s.endMs) ?? null;
    return { id: seg?.id ?? null, text: seg?.text ?? '' };
  }, [state.currentDoc, currentTimeMs]);

  const handleDocChangeFromTimeline = useCallback(
    (doc: typeof state.currentDoc, selectedId?: CaptionSegmentId | null) => {
      setState((prev) => ({
        ...prev,
        currentDoc: doc ?? prev.currentDoc,
        selectedId: selectedId === undefined ? prev.selectedId : selectedId,
      }));
    },
    [setState]
  );

  return (
    <div className="ccRoot">
      <TopBar
        hasDoc={!!state.currentDoc}
        onImport={handleImport}
        onExportSrt={handleExportSrt}
        onExportVtt={handleExportVtt}
        onRevert={handleRevert}
        onSave={handleSave}
        onPublish={handlePublish}
      />

      <div className="ccBody">
        <div className="ccMainRow">
          <LeftSidebar
            doc={state.currentDoc}
            selectedId={state.selectedId}
            selectedIds={state.selectedIds}
            ignoredSuggestionIds={ignoredSuggestionIds}
            showOnlyFlagged={showOnlyFlagged}
            onToggleShowOnlyFlagged={(next) => setShowOnlyFlagged(next)}
            onIgnoreSuggestion={onIgnoreSuggestion}
            onSelect={(id: CaptionSegmentId, e: MouseEvent) => handleSelect(id, e)}
            onToggleSelect={handleToggleSelect}
            onEditCaptionText={handleEditText}
            findText={findText}
            replaceText={replaceText}
            onChangeFindText={setFindText}
            onChangeReplaceText={setReplaceText}
            onFindNext={handleFindNext}
            onFindPrevious={handleFindPrevious}
            onReplaceOne={handleReplaceOne}
            onReplaceAll={handleReplaceAll}
            onSetSpeakerForSelected={handleSetSpeakerForSelected}
            onRemoveSpeakerForSelected={handleRemoveSpeakerForSelected}
            onAddCaption={handleAddCaption}
            onSplit={handleSplit}
            onMerge={handleMerge}
            onDelete={handleDelete}
          />

          <div className="ccVideoColumn">
            <VideoPlayer
              doc={state.currentDoc}
              currentTimeMs={currentTimeMs}
              durationMs={videoDurationMs}
              isPlaying={isPlaying}
              playbackRate={playbackRate}
              onTogglePlay={async () => {
                // Exit single-caption mode when the user manually plays/pauses.
                setSegmentPlayUntilMs(null);
                await togglePlay();
              }}
              onStop={() => {
                setSegmentPlayUntilMs(null);
                handleStop();
              }}
              onSeekMs={handleScrub}
              onSetPlaybackRate={setPlaybackRate}
              onPlayPrevCaption={() => seekToCaptionByOffset(-1)}
              onPlayNextCaption={() => seekToCaptionByOffset(1)}
              videoRef={videoRef}
              burnedInCaptionSegmentId={currentCaption.id}
              burnedInCaptionText={currentCaption.text}
              onEditBurnedInCaptionText={(id, nextText) => {
                if (!state.currentDoc) return;
                handleEditText(id, nextText);
              }}
            />
          </div>
        </div>

        <div className="ccTimelineRow">
          <VideoTimelinePanel
            doc={state.currentDoc}
            selectedId={state.selectedId}
            selectedIds={state.selectedIds}
            ignoredSuggestionIds={ignoredSuggestionIds}
            showOnlyFlagged={showOnlyFlagged}
            durationMs={videoDurationMs}
            playheadMs={currentTimeMs}
            mediaUrl={state.mediaUrl}
            onSelect={(id) => handleSelect(id)}
            onSeekMs={(ms) => {
              if (videoRef.current) videoRef.current.currentTime = ms / 1000;
            }}
            onDocChange={handleDocChangeFromTimeline}
            setMockDocInsights={setMockDocInsights}
            setMockSegmentInsights={setMockSegmentInsights}
            showToast={showToast}
          />
        </div>
      </div>

      {toast ? <div className="ccToast">{toast}</div> : null}
    </div>
  );
};
