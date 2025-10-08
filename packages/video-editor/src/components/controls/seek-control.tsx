import { useLivePlayerContext } from "@twick/live-player";
import SeekTrack from "../track/seek-track";
import { TimelineTickConfig } from "../video-editor";

const SeekControl = ({
  duration,
  zoom,
  timelineCount,
  onSeek,
  timelineTickConfigs,
}: {
  duration: number;
  zoom: number;
  timelineCount: number;
  onSeek: (time: number) => void;
  timelineTickConfigs?: TimelineTickConfig[];
}) => {
  const { currentTime } = useLivePlayerContext();
  return (
    <SeekTrack
      duration={duration}
      currentTime={currentTime}
      zoom={zoom}
      onSeek={onSeek}
      timelineCount={timelineCount}
      timelineTickConfigs={timelineTickConfigs}
    />
  );
};

export default SeekControl;
