import { sample } from "../helpers/sample-data";
import { TimelineProvider } from "@twick/timeline";
import TimelineManager from "../components/timeline-manager";

import "@twick/timeline/dist/timeline.css";
import { LivePlayerProvider } from "@twick/live-player";

const ExampleTimeline = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider>
          <div className="flex flex-col w-full h-full bg-background border border-border overflow-x-hidden">
            <TimelineManager projectData={sample.input} />
          </div>
    </TimelineProvider>
    </LivePlayerProvider>
  );
};

export default ExampleTimeline;
