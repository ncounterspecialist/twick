import { createContext, useContext, useState } from "react";
import { PLAYER_STATE } from "../helpers/constants";

type LivePlayerContextType = {
  playerState: string;
  currentTime: number;
  seekTime: number;
  playerVolume: number;
  setSeekTime: (time: number) => void;
  setPlayerState: (state: string) => void;
  setCurrentTime: (time: number) => void;
  setPlayerVolume: (volume: number) => void;
};

const LivePlayerContext = createContext<LivePlayerContextType | undefined>(undefined);

export const LivePlayerProvider = ({ children }: { children: React.ReactNode }) => {
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
        setSeekTime,
        setPlayerState: (state: string) => {
          if(state === PLAYER_STATE.PAUSED) {
            setSeekTime(currentTime);
          }
          setPlayerState(state);
        },
        setCurrentTime,
        setPlayerVolume,
      }}
    >
      {children}
    </LivePlayerContext.Provider>
  );
};

export const useLivePlayerContext = () => {
  const context = useContext(LivePlayerContext);
  if (context === undefined) {
    throw new Error("useLivePlayerContext must be used within a LivePlayerProvider");
  }
  return context;
};
