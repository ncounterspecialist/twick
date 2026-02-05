import {
  LivePlayer,
  PLAYER_STATE,
  useLivePlayerContext,
} from "@twick/live-player";
import { useTimelineContext } from "@twick/timeline";
import { useEffect, useRef } from "react";
import "../../styles/video-editor.css";
import { usePlayerManager } from "../../hooks/use-player-manager";

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
 * @returns JSX element containing player and canvas components
 * 
 * @example
 * ```tsx
 * <PlayerManager
 *   videoProps={{ width: 1920, height: 1080, backgroundColor: '#000' }}
 *   playerProps={{ quality: 720 }}
 *   canvasMode={true}
 * />
 * ```
 */
export const PlayerManager = ({
  videoProps,
  playerProps,
  canvasMode,
}: {
  videoProps: { width: number; height: number, backgroundColor?: string };
  playerProps?: { quality?: number },
  canvasMode: boolean;
}) => {
  const { changeLog } = useTimelineContext();
  const { twickCanvas, projectData, updateCanvas, playerUpdating, onPlayerUpdate, buildCanvas } =
    usePlayerManager({ videoProps });
  const durationRef = useRef<number>(0);
  const {
    playerState,
    playerVolume,
    seekTime,
    setPlayerState,
    setCurrentTime,
  } = useLivePlayerContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvasSize = {
      width: container?.clientWidth,
      height: container?.clientHeight,
    };
    buildCanvas({
      backgroundColor: videoProps.backgroundColor,
      videoSize: {
        width: videoProps.width,
        height: videoProps.height,
      },
      canvasSize,
      canvasRef: canvasRef.current,
    });
  }, [videoProps]);

  useEffect(() => {
    if (twickCanvas && playerState === PLAYER_STATE.PAUSED) {
      updateCanvas(seekTime);
    }
  }, [twickCanvas, playerState, seekTime, changeLog]);

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
        >
          <canvas ref={canvasRef} className="twick-editor-canvas" />
        </div>
      )}
    </div>
  );
};
