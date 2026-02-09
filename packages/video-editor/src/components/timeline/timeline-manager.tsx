import { useState, useCallback } from "react";
import { useLivePlayerContext } from "@twick/live-player";
import { PLAYER_STATE } from "@twick/live-player";
import SeekControl from "../controls/seek-control";
import TimelineView from "./timeline-view";
import { useTimelineContext } from "@twick/timeline";
import { useTimelineManager } from "../../hooks/use-timeline-manager";
import { useTimelineSelection } from "../../hooks/use-timeline-selection";
import { TimelineTickConfig } from "../video-editor";
import { ElementColors } from "../../helpers/types";
import { PlayheadState } from "../track/seek-track";

const TimelineManager = ({
  trackZoom,
  timelineTickConfigs,
  elementColors,
}: {
  trackZoom: number;
  timelineTickConfigs?: TimelineTickConfig[];
  elementColors?: ElementColors;
}) => {
  const { playerState } = useLivePlayerContext();
  const {
    timelineData,
    totalDuration,
    selectedItem,
    onAddTrack,
    onReorder,
    onElementDrag,
    onSeek,
  } = useTimelineManager();
  const { selectedIds } = useTimelineContext();
  const { handleItemSelect, handleEmptyClick, handleMarqueeSelect } =
    useTimelineSelection();

  const [playheadState, setPlayheadState] = useState<PlayheadState>({
    positionPx: 0,
    isDragging: false,
  });

  const handlePlayheadUpdate = useCallback((state: PlayheadState) => {
    setPlayheadState(state);
  }, []);

  const isPlayheadActive =
    playerState === PLAYER_STATE.PLAYING || playheadState.isDragging;

  return (
    <TimelineView
      tracks={timelineData?.tracks ?? []}
      zoomLevel={trackZoom}
      duration={totalDuration}
      selectedItem={selectedItem}
      selectedIds={selectedIds}
      onDeletion={() => {}}
      onAddTrack={onAddTrack}
      onReorder={onReorder}
      onElementDrag={onElementDrag}
      onSeek={onSeek}
      onItemSelect={handleItemSelect}
      onEmptyClick={handleEmptyClick}
      onMarqueeSelect={handleMarqueeSelect}
      elementColors={elementColors}
      playheadPositionPx={playheadState.positionPx}
      isPlayheadActive={isPlayheadActive}
      seekTrack={
        <SeekControl
          duration={totalDuration}
          zoom={trackZoom}
          onSeek={onSeek}
          timelineCount={timelineData?.tracks?.length ?? 0}
          timelineTickConfigs={timelineTickConfigs}
          onPlayheadUpdate={handlePlayheadUpdate}
        />
      }
    />
  );
};

export default TimelineManager;
