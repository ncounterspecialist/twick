import React from "react";
import { Play, Pause, RefreshCw } from "lucide-react";
import { PLAYER_STATE } from "@twick/timeline";
import { useLivePlayerContext } from "@twick/live-player";
import { usePlayerControl } from "@twick/video-editor";

interface PlayControlsProps {
}

const iconProps = {
  size: 28,
  color: "#333",
  style: {
    display: "block",
    margin: "auto",
    background: "#fff",
    borderRadius: "50%",
  },
};

const PlayControls: React.FC<PlayControlsProps> = ({}) => {
  const { playerState } = useLivePlayerContext();
  const { togglePlaying } = usePlayerControl();
  let icon, onClick, ariaLabel;
  if (playerState === PLAYER_STATE.PLAYING) {
    icon = <Pause {...iconProps} />;
    onClick = togglePlaying;
    ariaLabel = "Pause";
  } else if (playerState === PLAYER_STATE.PAUSED) {
    icon = <Play {...iconProps} />;
    onClick = togglePlaying;
    ariaLabel = "Play";
  } else {
    icon = <RefreshCw {...iconProps} />;
    onClick = () => {};
    ariaLabel = "Refresh";
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        border: "none",
        background: "#333",
        borderRadius: "50%",
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        cursor: "pointer",
        outline: "none",
        transition: "background 0.2s",
        padding: 0,
      }}
    >
      {icon}
    </button>
  );
};

export default PlayControls;
