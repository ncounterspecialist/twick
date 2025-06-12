import { useLivePlayerContext } from "@twick/live-player";
import { SeekTrack } from "@twick/timeline";

const SeekControl = ({
  duration,
  zoom,
  timelineCount,
  onSeek,
}: {
  duration: number;
  zoom: number;
  timelineCount: number;
  onSeek: (time: number) => void;
}) => {
  const { currentTime } = useLivePlayerContext();
  return (
    <SeekTrack
      duration={duration}
      currentTime={currentTime}
      zoom={zoom}
      onSeek={onSeek}
      timelineCount={timelineCount}
    />
  );
};

export default SeekControl;
