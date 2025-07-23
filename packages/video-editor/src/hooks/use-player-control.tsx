import { PLAYER_STATE, useLivePlayerContext } from "@twick/live-player";
import {
  TIMELINE_ACTION,
  useTimelineContext,
} from "@twick/timeline";
import { useEffect, useRef } from "react";

export const usePlayerControl = () => {
  const { playerState, setPlayerState } = useLivePlayerContext();
  const { timelineAction, setTimelineAction } = useTimelineContext();
  const playerStateRef = useRef<PLAYER_STATE>(playerState);

  const togglePlayback = () => {
    if (playerState === PLAYER_STATE.PLAYING) {
      playerStateRef.current = PLAYER_STATE.PAUSED;
      setPlayerState(PLAYER_STATE.PAUSED);
    } else if (playerState === PLAYER_STATE.PAUSED) {
      playerStateRef.current = PLAYER_STATE.REFRESHING;
      setPlayerState(PLAYER_STATE.REFRESHING);
      // TODO: get player data from timeline context
      setTimelineAction(TIMELINE_ACTION.UPDATE_PLAYER_DATA, {});
    }
  };

  useEffect(() => {
    if (timelineAction.type === TIMELINE_ACTION.ON_PLAYER_UPDATED) {
      if(playerStateRef.current === PLAYER_STATE.REFRESHING) {
        playerStateRef.current = PLAYER_STATE.PLAYING;
        setPlayerState(PLAYER_STATE.PLAYING);
      }
    }
  }, [timelineAction]);


  return {
    togglePlayback,
  };
};
