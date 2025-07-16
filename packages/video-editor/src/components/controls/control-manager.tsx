import { useLivePlayerContext } from "@twick/live-player";
import PlayerControls from "./player-controls";
import { TIMELINE_OPERATION, useTimelineContext } from "@twick/timeline";
import { usePlayerControl } from "../../hooks/use-player-control";
import TimelineZoom from "./timeline-zoom";

const ControlManager = ({
  trackZoom,
  setTrackZoom,
}: {
  trackZoom: number;
  setTrackZoom: (zoom: number) => void;
}) => {
  const { totalDuration, currentTime, playerState } = useLivePlayerContext();
  const { togglePlayback } = usePlayerControl();
  const { selectedItem, setTimelineOperation } = useTimelineContext();
  const onDelete = () => {
    if (selectedItem) {
      setTimelineOperation(TIMELINE_OPERATION.DELETE_ITEM, {
        id: selectedItem.id,
      });
    }
  };
  const onSplit = () => {
    console.log("onSplit");
  };

  return (
    <div className="twick-editor-timeline-controls">
      <PlayerControls
        selectedItem={selectedItem}
        duration={totalDuration}
        currentTime={currentTime}
        playerState={playerState}
        togglePlayback={togglePlayback}
        onDelete={onDelete}
        onSplit={onSplit}
      />
      <TimelineZoom zoomLevel={trackZoom} setZoomLevel={setTrackZoom} />
    </div>
  );
};

export default ControlManager;
