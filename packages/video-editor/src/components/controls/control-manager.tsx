import { useLivePlayerContext } from "@twick/live-player";
import PlayerControls from "./player-controls";
import { useTimelineContext } from "@twick/timeline";
import { usePlayerControl } from "../../hooks/use-player-control";
import useTimelineControl from "../../hooks/use-timeline-control";
import { TimelineZoomConfig } from "../video-editor";

const ControlManager = ({
  trackZoom,
  setTrackZoom,
  zoomConfig,
}: {
  trackZoom: number;
  setTrackZoom: (zoom: number) => void;
  zoomConfig: TimelineZoomConfig;
}) => {
  const { currentTime, playerState } = useLivePlayerContext();
  const { togglePlayback } = usePlayerControl();
  const { canRedo, canUndo, totalDuration, selectedItem } = useTimelineContext();
  const { deleteItem, splitElement, handleUndo, handleRedo } = useTimelineControl();

  return (
    <div className="twick-editor-timeline-controls">
      <PlayerControls
        selectedItem={selectedItem}
        duration={totalDuration}
        currentTime={currentTime}
        playerState={playerState}
        togglePlayback={togglePlayback}
        canUndo={canUndo}
        canRedo={canRedo}
        onDelete={deleteItem}
        onSplit={splitElement}
        onUndo={handleUndo}
        onRedo={handleRedo}
        zoomLevel={trackZoom}
        setZoomLevel={setTrackZoom}
        zoomConfig={zoomConfig}
      />
    </div>
  );
};

export default ControlManager;
