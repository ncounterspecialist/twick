import { useLivePlayerContext } from "@twick/live-player";
import PlayerControls from "./player-controls";
import { useTimelineContext } from "@twick/timeline";
import { usePlayerControl } from "../../hooks/use-player-control";
import useTimelineControl from "../../hooks/use-timeline-control";
import { TimelineZoomConfig } from "../video-editor";
import { DEFAULT_FPS } from "../../helpers/constants";

const ControlManager = ({
  trackZoom,
  setTrackZoom,
  zoomConfig,
  fps,
}: {
  trackZoom: number;
  setTrackZoom: (zoom: number) => void;
  zoomConfig: TimelineZoomConfig;
  fps?: number;
}) => {
  const { currentTime, playerState, setSeekTime, setCurrentTime } =
    useLivePlayerContext();
  const { togglePlayback } = usePlayerControl();
  const {
    canRedo,
    canUndo,
    totalDuration,
    selectedItem,
    selectedIds,
    followPlayheadEnabled,
    setFollowPlayheadEnabled,
  } = useTimelineContext();
  const { deleteItem, splitElement, handleUndo, handleRedo } =
    useTimelineControl();

  const handleSeek = (time: number) => {
    const clamped = Math.max(0, Math.min(totalDuration, time));
    setCurrentTime(clamped);
    setSeekTime(clamped);
  };

  return (
    <div className="twick-editor-timeline-controls">
      <PlayerControls
        selectedItem={selectedItem}
        selectedIds={selectedIds}
        duration={totalDuration}
        currentTime={currentTime}
        playerState={playerState}
        togglePlayback={togglePlayback}
        canUndo={canUndo}
        canRedo={canRedo}
        onDelete={() => deleteItem()}
        onSplit={splitElement}
        onUndo={handleUndo}
        onRedo={handleRedo}
        zoomLevel={trackZoom}
        setZoomLevel={setTrackZoom}
        zoomConfig={zoomConfig}
        fps={fps ?? DEFAULT_FPS}
        onSeek={handleSeek}
        followPlayheadEnabled={followPlayheadEnabled}
        onFollowPlayheadToggle={() => setFollowPlayheadEnabled(!followPlayheadEnabled)}
      />
    </div>
  );
};

export default ControlManager;
