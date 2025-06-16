import { useEffect, useMemo, useRef } from "react";
import { Player as CorePlayer } from "@revideo/core";
import { Player } from "@revideo/player-react";
import { getBaseProject } from "../helpers/player.utils";
//@ts-ignore
import project from "@twick/visualizer/dist/project";

const DEFAULT_VIDEO_SIZE = {
  width: 720,
  height: 1280,
};

/**
 * Props for the `LivePlayer` component.
 */
export type LivePlayerProps = {
  /** Whether the player should be playing or paused */
  playing: boolean;

  /** Dynamic project variables to feed into the player */
  projectData: any;

  /** Dimensions of the video player (width x height) */
  videoSize?: {
    width: number;
    height: number;
  };

  /** Time in seconds to seek to on load or update */
  seekTime?: number;

  /** Style for the player container */
  containerStyle?: React.CSSProperties;

  /** Volume of the player (0.0 - 1.0) */
  volume?: number;

  /** Playback quality level (0.0 - 1.0) */
  quality?: number;

  /** Callback fired on time update during playback */
  onTimeUpdate?: (currentTime: number) => void;

  /** Callback fired when player data is updated */
  onDataUpdate?: (data: any) => void;

  /** Callback fired once the player is ready */
  onPlayerReady?: (player: CorePlayer) => void;

  /** Callback fired when the video duration is loaded */
  onDurationChange?: (duration: number) => void;
};

/**
 * `LivePlayer` is a React component that wraps around the `@revideo/player-react` player.
 *
 * It supports dynamic project variables, external control for playback, time seeking,
 * volume and quality adjustment, and lifecycle callbacks like `onPlayerReady` and `onDurationChange`.
 *
 * @param props - Props to control the player and respond to its state
 * @returns A configured player UI component
 */
export const LivePlayer = ({
  playing,
  containerStyle,
  projectData,
  videoSize,
  seekTime = 0,
  volume = 0.25,
  quality = 0.5,
  onTimeUpdate,
  onDataUpdate,
  onPlayerReady,
  onDurationChange,
}: LivePlayerProps) => {
  const baseProject = useMemo(
    () => getBaseProject(videoSize || DEFAULT_VIDEO_SIZE),
    [videoSize]
  );

  const isFirstRender = useRef(false);

  const playerRef = useRef<{
    player: CorePlayer | null;
    htmlElement: HTMLElement | null;
  }>({ player: null, htmlElement: null });

  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Handle time updates from the player and relay to external callback.
   */
  const onCurrentTimeUpdate = (currentTime: number) => {
    if (onTimeUpdate) {
      onTimeUpdate(currentTime);
    }
  };

  /**
   * Handle player ready lifecycle and store references.
   */
  const handlePlayerReady = (player: CorePlayer) => {
    playerRef.current = {
      player,
      htmlElement:
        playerContainerRef.current?.querySelector("revideo-player") || null,
    };

    if (!isFirstRender.current) {
      onFirstRender();
      isFirstRender.current = true;

      if (onPlayerReady) {
        onPlayerReady(player);
      }
    } else {
      if (onDataUpdate) {
        onDataUpdate(player);
      }
    }
  };

  /**
   * Performs setup only once after the player has rendered for the first time.
   */
  const onFirstRender = () => {
    if (playerRef.current?.player && playerRef.current.htmlElement) {
      playerRef.current.htmlElement?.nextElementSibling?.setAttribute(
        "style",
        "display: none;"
      );
      setProjectData(projectData);
    }
  };

  /**
   * Applies JSON variables to the player element.
   */
  const setProjectData = (projectData: any) => {
    if (playerRef.current?.htmlElement && projectData) {
      playerRef.current.htmlElement.setAttribute(
        "variables",
        JSON.stringify(projectData)
      );
    }
  };

  // Apply new project data whenever it changes
  useEffect(() => {
    setProjectData(projectData);
  }, [projectData]);

  // Play/pause player based on external prop
  useEffect(() => {
    if (playerRef.current?.player) {
      playerRef.current.player.togglePlayback(playing);
    }
  }, [playing]);

  return (
    <div
      ref={playerContainerRef}
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        ...containerStyle || {},
      }}
    >
      <Player
        project={project}
        looping={false}
        controls={false}
        currentTime={seekTime}
        variables={baseProject}
        volume={volume}
        quality={quality}
        onTimeUpdate={onCurrentTimeUpdate}
        onPlayerReady={handlePlayerReady}
        width={baseProject.input?.properties?.width || DEFAULT_VIDEO_SIZE.width}
        height={baseProject?.input?.properties?.height || DEFAULT_VIDEO_SIZE.height}
        timeDisplayFormat="MM:SS.mm"
        onDurationChange={(e) => {
          if (onDurationChange) {
            onDurationChange(e);
          }
        }}
      />
    </div>
  );
};
