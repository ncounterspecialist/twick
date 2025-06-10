import { sample } from "../helpers/sample-data";
import { TimelineProvider } from "@twick/timeline";
import TimelineManager from "../components/timeline-manager";
import { PlayerContainer } from "../components/player-container";

import "./example-timeline.css";
import "@twick/timeline/dist/timeline.css";
import { LivePlayerProvider } from "@twick/live-player";
import EditorControls from "../components/editor-controls";

const ExampleTimeline = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider>
        <div className="flex flex-col w-full h-full gap-2">
          <div className="flex flex-row gap-2 w-full h-full">
            <EditorControls />
            <div className="flex w-full h-auto justify-center items-center bg-black">
              <PlayerContainer
                videoProps={sample.input.properties}
              />
            </div>
          </div>
          <div className="flex flex-col w-full h-full bg-background border border-border overflow-x-hidden">
            <TimelineManager projectData={sample.input} />
          </div>
        </div>
      </TimelineProvider>
    </LivePlayerProvider>
  );
};

export default ExampleTimeline;
