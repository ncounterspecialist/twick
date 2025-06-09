import { LivePlayer } from "@twick/live-player";
import { TIMELINE_ACTION, TIMELINE_OPERATION, useTimelineContext } from "@twick/timeline";
import { useEffect, useState } from "react";

export const PlayerContainer = ({
  videoProps,
  playing,
}: {
  videoProps: { width: number; height: number };
  playing: boolean;
}) => {
  const [projectData, setProjectData] = useState<any>(null);
  const { timelineAction, setTimelineOperation } = useTimelineContext();

  useEffect(() => {
    if (timelineAction.action === TIMELINE_ACTION.SET_LATEST_PROJECT_DATA && videoProps) {
      const _latestProjectData = {
        input: {
          properties: videoProps,
          timeline: timelineAction.data?.timelines ?? [],
          version: timelineAction.data?.version ?? 0,
        },
      }
      setProjectData(_latestProjectData);
    }
  }, [timelineAction, videoProps]);

  return (
    <div
      className="aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-lg
     bg-gray-100 dark:bg-gray-800"
    >
      <button
        className="absolute top-[50px] right-[10px]"
        onClick={() => setTimelineOperation(TIMELINE_OPERATION.FETCH_LATEST_PROJECT_DATA, null)}
      >
        Update
      </button>
      <LivePlayer
        projectData={projectData}
        videoSize={{
          width: videoProps.width,
          height: videoProps.height,
        }}
        playing={playing}
      />
    </div>
  );
};
