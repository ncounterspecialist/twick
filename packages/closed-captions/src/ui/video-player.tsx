import { Pause, Play, SkipBack, SkipForward, Square } from 'lucide-react';
import type { CaptionDoc, CaptionSegmentId } from '../utils/captions/types';
import { formatClock } from './format-clock';
import { BurnedInCaption } from './burned-in-caption';

type Props = {
  doc: CaptionDoc | null;
  ignoredSuggestionIds: Set<string>;
  currentTimeMs: number;
  durationMs: number;
  isPlaying: boolean;
  playbackRate: number;
  onTogglePlay: () => void;
  onStop: () => void;
  onSeekMs: (ms: number) => void;
  onSetPlaybackRate: (rate: number) => void;
  onPlayPrevCaption: () => void;
  onPlayNextCaption: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  burnedInCaptionSegmentId: CaptionSegmentId | null;
  burnedInCaptionText: string;
  onEditBurnedInCaptionText: (segmentId: CaptionSegmentId, nextText: string) => void;
  onIgnoreSuggestion: (id: string) => void;
};

export const VideoPlayer = ({
  doc,
  ignoredSuggestionIds,
  currentTimeMs,
  durationMs,
  isPlaying,
  playbackRate,
  onTogglePlay,
  onStop,
  onSeekMs,
  onSetPlaybackRate,
  onPlayPrevCaption,
  onPlayNextCaption,
  videoRef,
  burnedInCaptionSegmentId,
  burnedInCaptionText,
  onEditBurnedInCaptionText,
  onIgnoreSuggestion,
}: Props) => {
  const canTransport = !!doc;
  return (
    <div className="ccPreview">
      <div className="ccPreviewVideoWrap">
        <video ref={videoRef} className="ccVideo" controls={false} />
        <BurnedInCaption
          doc={doc}
          segmentId={burnedInCaptionSegmentId}
          text={burnedInCaptionText}
          ignoredSuggestionIds={ignoredSuggestionIds}
          onEditCaptionText={onEditBurnedInCaptionText}
          onIgnoreSuggestion={onIgnoreSuggestion}
        />
      </div>

      <div className="ccTransport">
        <button className="ccGhostIconBtn" type="button" disabled={!canTransport} onClick={onPlayPrevCaption}>
          <SkipBack size={16} />
        </button>

        <button className="ccGhostIconBtn" type="button" disabled={!canTransport} onClick={onTogglePlay}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button className="ccGhostIconBtn" type="button" disabled={!canTransport} onClick={onStop}>
          <Square size={16} />
        </button>

        <button className="ccGhostIconBtn" type="button" disabled={!canTransport} onClick={onPlayNextCaption}>
          <SkipForward size={16} />
        </button>

        <div className="ccTransportMeta">
          <span className="ccMono">
            {formatClock(currentTimeMs)} / {formatClock(durationMs)}
          </span>
        </div>

        <input
          className="ccScrubber"
          type="range"
          min={0}
          max={Math.max(1, durationMs)}
          value={Math.max(0, Math.min(currentTimeMs, durationMs))}
          onChange={(e) => onSeekMs(Number(e.target.value))}
          disabled={!canTransport}
        />

        <div className="ccTransportRight">
          <label className="ccInlineLabel">
            Speed
            <select
              className="ccSelect"
              value={playbackRate}
              onChange={(e) => onSetPlaybackRate(Number(e.target.value))}
              disabled={!canTransport}
            >
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

