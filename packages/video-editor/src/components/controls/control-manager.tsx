import { useLivePlayerContext } from "@twick/live-player";
import PlayerControls from "./player-controls";
import { useTimelineContext } from "@twick/timeline";
import { usePlayerControl } from "../../hooks/use-player-control";
import TimelineZoom from "./timeline-zoom";
import useTimelineControl from "../../hooks/use-timeline-control";

const ControlManager = ({
  trackZoom,
  setTrackZoom,
}: {
  trackZoom: number;
  setTrackZoom: (zoom: number) => void;
}) => {
  const { totalDuration, currentTime, playerState } = useLivePlayerContext();
  const { togglePlayback } = usePlayerControl();
  const { selectedItem } = useTimelineContext();
  const { deleteItem, splitElement } = useTimelineControl();

  return (
    <div className="twick-editor-timeline-controls">
      <PlayerControls
        selectedItem={selectedItem}
        duration={totalDuration}
        currentTime={currentTime}
        playerState={playerState}
        togglePlayback={togglePlayback}
        onDelete={deleteItem}
        onSplit={splitElement}
      />
      <TimelineZoom zoomLevel={trackZoom} setZoomLevel={setTrackZoom} />
    </div>
  );
};

export default ControlManager;
