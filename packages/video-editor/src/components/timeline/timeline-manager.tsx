import { useState, useCallback } from "react";
import { useLivePlayerContext } from "@twick/live-player";
import { PLAYER_STATE } from "@twick/live-player";
import SeekControl from "../controls/seek-control";
import TimelineView from "./timeline-view";
import {
  useTimelineContext,
  VALIDATION_ERROR_CODE,
  ValidationError,
} from "@twick/timeline";
import { useTimelineManager } from "../../hooks/use-timeline-manager";
import { useTimelineSelection } from "../../hooks/use-timeline-selection";
import { TimelineTickConfig } from "../video-editor";
import { ElementColors } from "../../helpers/types";
import { PlayheadState } from "../track/seek-track";
import { createElementFromDrop } from "../../hooks/use-timeline-drop";

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
  const { followPlayheadEnabled, editor, videoResolution, setSelectedItem } =
    useTimelineContext();
  const {
    timelineData,
    totalDuration,
    selectedItem,
    onAddTrack,
    onReorder,
    onElementDrag,
    onElementDrop,
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
    (followPlayheadEnabled && playerState === PLAYER_STATE.PLAYING) ||
    playheadState.isDragging;

  const handleDropOnTimeline = useCallback(
    async (params: {
      track: import("@twick/timeline").Track | null;
      timeSec: number;
      type: import("../../helpers/asset-type").DroppableAssetType;
      url: string;
    }) => {
      const { track, timeSec, type, url } = params;
      const element = createElementFromDrop(type, url, videoResolution);
      element.setStart(timeSec);

      const targetTrack = track ?? editor.addTrack(`Track_${Date.now()}`);

      const tryAdd = async (
        t: import("@twick/timeline").Track
      ): Promise<boolean> => {
        try {
          const result = await editor.addElementToTrack(t, element);
          if (result) {
            setSelectedItem(element);
            return true;
          }
        } catch (err) {
          if (
            err instanceof ValidationError &&
            err.errors?.includes(VALIDATION_ERROR_CODE.COLLISION_ERROR)
          ) {
            const newTrack = editor.addTrack(`Track_${Date.now()}`);
            return tryAdd(newTrack);
          }
          throw err;
        }
        return false;
      };

      await tryAdd(targetTrack);
      editor.refresh();
    },
    [editor, videoResolution, setSelectedItem]
  );

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
      onElementDrop={onElementDrop}
      onSeek={onSeek}
      onItemSelect={handleItemSelect}
      onEmptyClick={handleEmptyClick}
      onMarqueeSelect={handleMarqueeSelect}
      elementColors={elementColors}
      playheadPositionPx={playheadState.positionPx}
      isPlayheadActive={isPlayheadActive}
      onDropOnTimeline={handleDropOnTimeline}
      videoResolution={videoResolution}
      enableDropOnTimeline={true}
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
