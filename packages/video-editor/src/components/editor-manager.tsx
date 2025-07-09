import { CANVAS_OPERATIONS, useTwickCanvas } from "@twick/canvas";
import {
  LivePlayer,
  PLAYER_STATE,
  useLivePlayerContext,
} from "@twick/live-player";
import {
  getCurrentElements,
  TIMELINE_ACTION,
  TIMELINE_OPERATION,
  timelineService,
  useTimelineContext,
} from "@twick/timeline";
import { useEffect, useRef, useState } from "react";
import "../styles/video-editor.css";

export const EditorManager = ({
  videoProps,
  canvasMode,
}: {
  videoProps: { width: number; height: number };
  canvasMode: boolean;
}) => {
  const [projectData, setProjectData] = useState<any>(null);
  const {
    timelineAction,
    setTimelineOperation,
    setTimelineAction,
    latestProjectVersion,
    setSelectedItem,
  } = useTimelineContext();
  const durationRef = useRef<number>(0);
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
        setTimelineOperation(TIMELINE_OPERATION.UPDATE_ELEMENT, {
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
    const container = containerRef.current;
    const canvasSize = {
      width: container?.clientWidth,
      height: container?.clientHeight,
    };
    buildCanvas({
      videoSize: {
        width: videoProps.width,
        height: videoProps.height,
      },
      canvasSize,
      canvasRef: canvasRef.current,
    });
  }, [videoProps]);

  useEffect(() => {
    switch (timelineAction.action) {
      case TIMELINE_ACTION.SET_PROJECT_DATA:
        if (videoProps) {
          const _latestProjectData = {
            input: {
              properties: videoProps,
              timeline: timelineAction.data?.timeline ?? [],
              version: timelineAction.data?.version ?? 0,
            },
          };
          setProjectData(_latestProjectData);
        }
        break;
      case TIMELINE_ACTION.UPDATE_PLAYER_DATA:
        if (videoProps) {
          if (latestProjectVersion !== projectData?.input?.version) {
            const _latestProjectData = {
              input: {
                properties: videoProps,
                timeline: timelineAction.data?.timeline ?? [],
                version: timelineAction.data?.version ?? 0,
              },
            };
            setProjectData(_latestProjectData);
          } 
        }
        setTimelineAction(TIMELINE_ACTION.ON_PLAYER_UPDATED, null);
        break;
    }
  }, [timelineAction]);

  useEffect(() => {
    if (twickCanvas && playerState === PLAYER_STATE.PAUSED) {
      const elements = getCurrentElements(
        seekTime,
        timelineService.getTimelineData()?.timeline ?? []
      );
      setCanvasElements({
        elements,
        seekTime,
        captionProps: {},
        cleanAndAdd: true,
      });
    }
  }, [playerState, seekTime, twickCanvas, latestProjectVersion]);

  const handleTimeUpdate = (time: number) => {
    if (time >= durationRef.current) {
      setCurrentTime(0);
      setPlayerState(PLAYER_STATE.PAUSED);
    } else {
      setCurrentTime(time);
    }
  };

  return (
    <div
      className="twick-editor-container"
      style={{
        aspectRatio: `${videoProps.width}/${videoProps.height}`,
      }}
    >
      <LivePlayer
        seekTime={seekTime}
        projectData={projectData}
        videoSize={{
          width: videoProps.width,
          height: videoProps.height,
        }}
        containerStyle={{
          opacity: canvasMode
            ? playerState === PLAYER_STATE.PAUSED
              ? 0
              : 1
            : 1,
        }}
        onTimeUpdate={handleTimeUpdate}
        volume={playerVolume}
        onDurationChange={(duration: number) => {
          setTotalDuration(duration);
          durationRef.current = duration;
        }}
        playing={playerState === PLAYER_STATE.PLAYING}
      />
      {canvasMode && (
        <div
          ref={containerRef}
          className="twick-editor-canvas-container"
          style={{
            opacity: playerState === PLAYER_STATE.PAUSED ? 1 : 0,
          }}
        >
          <canvas ref={canvasRef} className="twick-editor-canvas" />
        </div>
      )}
    </div>
  );
};
