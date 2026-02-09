import { useLivePlayerContext } from "@twick/live-player";
import SeekTrack, { PlayheadState } from "../track/seek-track";
import { TimelineTickConfig } from "../video-editor";

const SeekControl = ({
  duration,
  zoom,
  timelineCount,
  onSeek,
  timelineTickConfigs,
  onPlayheadUpdate,
}: {
  duration: number;
  zoom: number;
  timelineCount: number;
  onSeek: (time: number) => void;
  timelineTickConfigs?: TimelineTickConfig[];
  onPlayheadUpdate?: (state: PlayheadState) => void;
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
      onPlayheadUpdate={onPlayheadUpdate}
    />
  );
};

export default SeekControl;
