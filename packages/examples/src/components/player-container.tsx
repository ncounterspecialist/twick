import {
  LivePlayer,
  PLAYER_STATE,
  useLivePlayerContext,
} from "@twick/live-player";
import {
  TIMELINE_ACTION,
  useTimelineContext,
} from "@twick/timeline";
import { useEffect, useRef, useState } from "react";

export const PlayerContainer = ({
  videoProps,
}: {
  videoProps: { width: number; height: number };
}) => {
  const [projectData, setProjectData] = useState<any>(null);
  const { timelineAction } = useTimelineContext();
  const durationRef = useRef<number>(0);
  const {
    playerState,
    playerVolume,
    seekTime,
    setPlayerState,
    setCurrentTime,
    setTotalDuration,
  } = useLivePlayerContext();

  useEffect(() => {
    if (
      timelineAction.action === TIMELINE_ACTION.SET_LATEST_PROJECT_DATA &&
      videoProps
    ) {
      const _latestProjectData = {
        input: {
          properties: videoProps,
          timeline: timelineAction.data?.timelines ?? [],
          version: timelineAction.data?.version ?? 0,
        },
      };
      setProjectData(_latestProjectData);
    }
  }, [timelineAction, videoProps]);

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
      className="aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-lg
     bg-gray-100 dark:bg-gray-800"
    >
      <LivePlayer
        seekTime={seekTime}
        projectData={projectData}
        videoSize={{
          width: videoProps.width,
          height: videoProps.height,
        }}
        onTimeUpdate={handleTimeUpdate}
        volume={playerVolume}
        onDurationChange={(duration: number) => {
          setTotalDuration(duration);
          durationRef.current = duration;
        }}
        playing={playerState === PLAYER_STATE.PLAYING}
      />
    </div>
  );
};
