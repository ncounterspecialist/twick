import { createContext, useContext, useState } from "react";
import { PLAYER_STATE } from "../helpers/constants";

/**
 * Type definition for the Live Player context.
 * Contains all the state and functions needed to control a live player instance.
 * 
 * @example
 * ```js
 * const {
 *   playerState,
 *   currentTime,
 *   seekTime,
 *   playerVolume,
 *   setSeekTime,
 *   setPlayerState,
 *   setCurrentTime,
 *   setPlayerVolume
 * } = useLivePlayerContext();
 * ```
 */
type LivePlayerContextType = {
  /** Current state of the player (playing, paused, refresh) */
  playerState: string;
  /** Current playback time in seconds */
  currentTime: number;
  /** Time to seek to when player state changes */
  seekTime: number;
  /** Current volume level (0-1) */
  playerVolume: number;
  /** Function to get the current time */
  getCurrentTime: () => number;
  /** Function to set the seek time */
  setSeekTime: (time: number) => void;
  /** Function to set the player state */
  setPlayerState: (state: string) => void;
  /** Function to set the current time */
  setCurrentTime: (time: number) => void;
  /** Function to set the player volume */
  setPlayerVolume: (volume: number) => void;
};

const LivePlayerContext = createContext<LivePlayerContextType | undefined>(undefined);

/**
 * Provider component for the Live Player context.
 * Manages the global state for live player instances including playback state,
 * timing, and volume controls. Automatically handles seek time updates when
 * pausing to maintain playback position.
 *
 * @param props - Component props containing children to wrap
 * @returns Context provider with live player state management
 * 
 * @example
 * ```jsx
 * <LivePlayerProvider>
 *   <YourApp />
 * </LivePlayerProvider>
 * ```
 */
export const LivePlayerProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("LivePlayerProvider", children);
  const [playerState, setPlayerState] = useState<string>(PLAYER_STATE.PAUSED);
  const [seekTime, setSeekTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playerVolume, setPlayerVolume] = useState<number>(1);

  return (
    <LivePlayerContext.Provider
      value={{
        seekTime,
        playerState,
        currentTime,
        playerVolume,
        getCurrentTime: () => currentTime,
        setSeekTime,
        setPlayerState: (newState: string) => {
          if(newState === PLAYER_STATE.PAUSED) {
            setSeekTime(currentTime);
          }
          setPlayerState(newState);
        },
        setCurrentTime,
        setPlayerVolume,
      }}
    >
      {children}
    </LivePlayerContext.Provider>
  );
};

/**
 * Hook to access the Live Player context.
 * Provides access to player state, timing controls, and volume management.
 * Must be used within a LivePlayerProvider component.
 *
 * @returns LivePlayerContextType object with all player state and controls
 * @throws Error if used outside of LivePlayerProvider
 * 
 * @example
 * ```js
 * const {
 *   playerState,
 *   currentTime,
 *   setPlayerState,
 *   setCurrentTime
 * } = useLivePlayerContext();
 * 
 * // Control playback
 * setPlayerState(PLAYER_STATE.PLAYING);
 * 
 * // Update current time
 * setCurrentTime(30.5);
 * ```
 */
export const useLivePlayerContext = () => {
  const context = useContext(LivePlayerContext);
  if (context === undefined) {
    throw new Error("useLivePlayerContext must be used within a LivePlayerProvider");
  }
  return context;
};
