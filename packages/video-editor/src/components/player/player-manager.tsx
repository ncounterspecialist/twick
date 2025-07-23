import { CANVAS_OPERATIONS, useTwickCanvas } from "@twick/canvas";
import {
  LivePlayer,
  useLivePlayerContext,
} from "@twick/live-player";
import {
  getCurrentElements,
  TIMELINE_ACTION,
  useTimelineContext,
  useTimelineEditor,
} from "@twick/timeline";
import { useEffect, useRef, useState } from "react";
import "../../styles/video-editor.css";

export const PlayerManager = ({
  videoProps,
  canvasMode,
}: {
  videoProps: { width: number; height: number };
  canvasMode: boolean;
}) => {
  const [projectData, setProjectData] = useState<any>(null);
  const {
    timelineAction,
    setSelectedItem,
  } = useTimelineContext();
  const editor = useTimelineEditor();
  const {
    playerState,
    playerVolume,
    seekTime,
    setPlayerState,
    setCurrentTime,
    setTotalDuration,
  } = useLivePlayerContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCanvasReady = (canvas: any) => {
    console.log("canvas ready", canvas);
  };

  const handleCanvasOperation = (operation: string, data: any) => {
    switch (operation) {
      case CANVAS_OPERATIONS.ITEM_SELECTED:
        setSelectedItem(data);
        break;
      case CANVAS_OPERATIONS.ITEM_UPDATED:
        editor.updateElement({
          timelineId: data.timelineId,
          elementId: data.id,
          updates: data,
          forceUpdate: true,
          noSelection: true,
        });
        break;
      default:
        break;
    }
  };

  const { twickCanvas, buildCanvas, setCanvasElements } = useTwickCanvas({
    onCanvasReady: handleCanvasReady,
    onCanvasOperation: handleCanvasOperation,
  });

  useEffect(() => {
    if (timelineAction.type === TIMELINE_ACTION.SET_PROJECT_DATA) {
      setProjectData(timelineAction.payload);
    }
  }, [timelineAction]);

  useEffect(() => {
    if (projectData && videoProps) {
      const timelineData = editor.getTimelineData();
      if (timelineData) {
        const elements = getCurrentElements(0, timelineData.tracks.map(track => track.toJSON()));
        setCanvasElements(elements);
      }
    }
  }, [projectData, videoProps, editor]);

  return (
    <div className="twick-player-manager" ref={containerRef}>
      <LivePlayer
        ref={canvasRef}
        videoProps={videoProps}
        projectData={projectData}
        playerState={playerState}
        playerVolume={playerVolume}
        seekTime={seekTime}
        setPlayerState={setPlayerState}
        setCurrentTime={setCurrentTime}
        setTotalDuration={setTotalDuration}
        canvasMode={canvasMode}
        twickCanvas={twickCanvas}
        buildCanvas={buildCanvas}
      />
    </div>
  );
};
