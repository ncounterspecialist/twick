import { PLAYER_STATE, useLivePlayerContext } from "@twick/live-player";
import { TIMELINE_ACTION, TIMELINE_OPERATION, useTimelineContext } from "@twick/timeline";
import { useEffect } from "react";

export const usePlayerControl = () => {
    const { playerState, setPlayerState } = useLivePlayerContext();
    const { timelineAction, setTimelineOperation } = useTimelineContext();

    const togglePlaying = () => {
        if (playerState === PLAYER_STATE.PLAYING) {
            setPlayerState(PLAYER_STATE.PAUSED);
        } else if(playerState === PLAYER_STATE.PAUSED) {
            setPlayerState(PLAYER_STATE.REFRESHING);
            setTimelineOperation(TIMELINE_OPERATION.FETCH_LATEST_PROJECT_DATA, null);
        } 
    }

    useEffect(() => {
        if(playerState === PLAYER_STATE.REFRESHING) {
          if (timelineAction.action === TIMELINE_ACTION.UPDATE_PROJECT_DATA) {
            setPlayerState(PLAYER_STATE.PLAYING);
          }
        }
      }, [timelineAction, playerState]);

      return {
        togglePlaying,
      }
}