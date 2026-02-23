import {
  LivePlayer,
  PLAYER_STATE,
  useLivePlayerContext,
} from "@twick/live-player";
import { useTimelineContext } from "@twick/timeline";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../../styles/video-editor.css";
import { usePlayerManager } from "../../hooks/use-player-manager";
import { useCanvasDrop } from "../../hooks/use-canvas-drop";
import { throttle } from "../../helpers/function.utils";
import type { CanvasConfig } from "../../helpers/types";
import { CanvasContextMenu } from "./canvas-context-menu";

const RESIZE_THROTTLE_MS = 200;

/**
 * PlayerManager component that manages video playback and canvas rendering.
 * Integrates the live player with canvas operations, handling both video playback
 * and static canvas display modes. Automatically updates canvas when paused and
 * manages player state transitions.
 *
 * @param props - Component configuration props
 * @param props.videoProps - Video dimensions and background color
 * @param props.playerProps - Optional player quality settings
 * @param props.canvasMode - Whether to show canvas overlay when paused
 * @param props.canvasConfig - Canvas behavior options (e.g. enableShiftAxisLock)
 * @returns JSX element containing player and canvas components
 * 
 * @example
 * ```tsx
 * <PlayerManager
 *   videoProps={{ width: 1920, height: 1080, backgroundColor: '#000' }}
 *   playerProps={{ quality: 720 }}
 *   canvasMode={true}
 *   canvasConfig={{ enableShiftAxisLock: true }}
 * />
 * ```
 */
export const PlayerManager = ({
  videoProps,
  playerProps,
  canvasMode,
  canvasConfig,
}: {
  videoProps: { width: number; height: number, backgroundColor?: string };
  playerProps?: { quality?: number },
  canvasMode: boolean;
  canvasConfig?: CanvasConfig;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const durationRef = useRef<number>(0);
  const seekTimeRef = useRef<number>(0);
  const { changeLog } = useTimelineContext();
  const {
    playerState,
    playerVolume,
    seekTime,
    setPlayerState,
    setCurrentTime,
  } = useLivePlayerContext();
  const {
    twickCanvas,
    projectData,
    updateCanvas,
    resizeCanvas,
    setBackgroundColor,
    playerUpdating,
    onPlayerUpdate,
    buildCanvas,
    handleDropOnCanvas,
    bringToFront,
    sendToBack,
    bringForward,
    sendBackward,
    deleteElement,
  } = usePlayerManager({ videoProps, canvasConfig });
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; elementId: string } | null>(null);
  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const { handleDragOver, handleDragLeave, handleDrop } = useCanvasDrop({
    containerRef,
    videoSize: { width: videoProps.width, height: videoProps.height },
    onDrop: handleDropOnCanvas,
    enabled: !!handleDropOnCanvas && canvasMode,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvasSize = {
      width: container?.clientWidth ?? 0,
      height: container?.clientHeight ?? 0,
    };
    if (canvasSize.width > 0 && canvasSize.height > 0) {
      buildCanvas({
        backgroundColor:
          videoProps.backgroundColor ??
          projectData?.input?.backgroundColor ??
          "#000000",
        videoSize: {
          width: videoProps.width,
          height: videoProps.height,
        },
        canvasSize,
        canvasRef: canvasRef.current,
      });
    }
  }, [videoProps]);

  // Keep canvas background in sync with project (e.g. when user changes it in Composition panel)
  useEffect(() => {
    const color =
      projectData?.input?.backgroundColor ??
      videoProps.backgroundColor ??
      "#000000";
    setBackgroundColor(color);
  }, [projectData?.input?.backgroundColor, videoProps.backgroundColor, setBackgroundColor]);

  const handleResize = useMemo(
    () =>
      throttle(() => {
        const container = containerRef.current;
        if (!container || !canvasMode || !twickCanvas) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width <= 0 || height <= 0) return;
        resizeCanvas({
          canvasSize: { width, height },
          videoSize: { width: videoProps.width, height: videoProps.height },
        });
        updateCanvas(seekTimeRef.current, true);
      }, RESIZE_THROTTLE_MS),
    [canvasMode, twickCanvas, resizeCanvas, updateCanvas, videoProps.width, videoProps.height]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !canvasMode) return;
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [canvasMode, handleResize]);

  seekTimeRef.current = seekTime;

  useEffect(() => {
    if (twickCanvas && playerState === PLAYER_STATE.PAUSED) {
      updateCanvas(seekTime);
    }
  }, [twickCanvas, playerState, seekTime, changeLog]);

  useEffect(() => {
    if (!twickCanvas || !canvasMode) return;
    const onSelectionCreated = (e: any) => {
      const ev = e?.e;
      if (!ev) return;
      const id = e.target?.get?.("id");
      if (id) {
        setContextMenu({ x: ev.clientX, y: ev.clientY, elementId: id });
      }
    }
    twickCanvas.on("contextmenu", onSelectionCreated);
    return () => {
      twickCanvas.off("contextmenu", onSelectionCreated);

    };
  }, [twickCanvas, canvasMode]);

  const handleTimeUpdate = (time: number) => {
    if (durationRef.current && time >= durationRef.current) {
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
      {
        <div
          className="twick-editor-loading-overlay"
          style={{
            display: playerUpdating ? 'flex' : 'none',
          }}
        >
          {playerUpdating ? <div className="twick-editor-loading-spinner" /> : null}
        </div>
      }
      <LivePlayer
        seekTime={seekTime}
        projectData={projectData}
        quality={playerProps?.quality || 1}
        videoSize={{
          width: videoProps.width,
          height: videoProps.height,
        }}
        onPlayerUpdate={onPlayerUpdate}
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
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onContextMenu={(e) => e.preventDefault()}
        >
          <canvas ref={canvasRef} className="twick-editor-canvas" />
        </div>
      )}
      {contextMenu && (
        <CanvasContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          elementId={contextMenu.elementId}
          onBringToFront={bringToFront}
          onSendToBack={sendToBack}
          onBringForward={bringForward}
          onSendBackward={sendBackward}
          onDelete={deleteElement}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
};
