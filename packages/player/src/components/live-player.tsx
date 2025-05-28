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

export type LivePlayerProps = {
  playing: boolean;
  projectData: any;
  videoSize?: {
    width: number;
    height: number;
  };
  seekTime?: number;
  volume?: number;
  quality?: number;
  onTimeUpdate?: (currentTime: number) => void;
  onDataUpdate?: (data: any) => void;
  onPlayerReady?: (player: CorePlayer) => void;
  onDurationChange?: (duration: number) => void;
};
export const LivePlayer = ({
  playing,
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

  const onCurrentTimeUpdate = (currentTime: number) => {
    if (onTimeUpdate) {
      onTimeUpdate(currentTime);
    }
  };

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

  const onFirstRender = () => {
    if (playerRef.current?.player && playerRef.current.htmlElement) {
      playerRef.current.htmlElement?.nextElementSibling?.setAttribute(
        "style",
        "display: none;"
      );
      setProjectData(projectData);
    }
  };

  const setProjectData = (projectData: any) => {
    if (playerRef.current?.htmlElement) {
      if (projectData) {
        playerRef.current.htmlElement.setAttribute(
          "variables",
          JSON.stringify(projectData)
        );
      }
    }
  };

  useEffect(() => {
    setProjectData(projectData);
  }, [projectData]);

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
        height={
          baseProject?.input?.properties?.height || DEFAULT_VIDEO_SIZE.height
        }
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
