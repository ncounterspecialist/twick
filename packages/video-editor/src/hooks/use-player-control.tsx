import { PLAYER_STATE, useLivePlayerContext } from "@twick/live-player";
import {
  TIMELINE_ACTION,
  useTimelineContext,
} from "@twick/timeline";
import { useEffect, useRef } from "react";

/**
 * Custom hook to manage player control state and playback.
 * Handles play/pause toggling and synchronization with timeline context
 * for video editor playback control.
 *
 * @returns Object containing player control functions
 * 
 * @example
 * ```js
 * const { togglePlayback } = usePlayerControl();
 * 
 * // Toggle between play and pause states
 * togglePlayback();
 * ```
 */
export const usePlayerControl = () => {
  const { playerState, setPlayerState } = useLivePlayerContext();
  const { present, timelineAction, setTimelineAction } = useTimelineContext();
  const playerStateRef = useRef<PLAYER_STATE>(playerState);

  /**
   * Toggles between play and pause states.
   * Handles state transitions and triggers timeline updates
   * when transitioning from pause to refresh state.
   * 
   * @example
   * ```js
   * togglePlayback();
   * // Switches between PLAYING and PAUSED states
   * ```
   */
  const togglePlayback = () => {
    if (playerState === PLAYER_STATE.PLAYING) {
      playerStateRef.current = PLAYER_STATE.PAUSED;
      setPlayerState(PLAYER_STATE.PAUSED);
    } else if (playerState === PLAYER_STATE.PAUSED) {
      playerStateRef.current = PLAYER_STATE.REFRESH;
      setPlayerState(PLAYER_STATE.REFRESH);
      setTimelineAction(TIMELINE_ACTION.UPDATE_PLAYER_DATA, present);
    }
  };

  useEffect(() => {
    if (timelineAction.type === TIMELINE_ACTION.ON_PLAYER_UPDATED) {
      if(playerStateRef.current === PLAYER_STATE.REFRESH) {
        playerStateRef.current = PLAYER_STATE.PLAYING;
        setPlayerState(PLAYER_STATE.PLAYING);
      }
    }
  }, [timelineAction]);


  return {
    togglePlayback,
  };
};
