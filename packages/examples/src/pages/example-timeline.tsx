import { sample } from "../helpers/sample-data";
import { TIMELINE_ELEMENT_TYPE, TIMELINE_OPERATION, TimelineProvider, useTimelineContext } from "@twick/timeline";
import TimelineManager from "../components/timeline-manager";
import { PlayerContainer } from "../components/player-container";
import { useState } from "react";

import "./example-timeline.css";
import "@twick/timeline/dist/timeline.css";

const ExampleTimeline = () => {
  const [playing, setPlaying] = useState(false);
  const addElement = (type: string) => {
    console.log(type);
  };

  const addTimeline = () => {
    console.log("timeline");
  };
  return (
    <TimelineProvider>
      <div className="flex flex-col w-full h-full gap-2">
        <div className="flex flex-row gap-2 w-full h-full">
          <div className="flex flex-col gap-2">
            <button onClick={addTimeline}>Timeline</button>
            <button onClick={() => addElement(TIMELINE_ELEMENT_TYPE.IMAGE)}>
              Image
            </button>
            <button onClick={() => addElement(TIMELINE_ELEMENT_TYPE.TEXT)}>
              Text
            </button>
            <button onClick={() => addElement(TIMELINE_ELEMENT_TYPE.AUDIO)}>
              Audio
            </button>
            <button onClick={() => addElement(TIMELINE_ELEMENT_TYPE.VIDEO)}>
              Video
            </button>
            <button onClick={() => setPlaying(!playing)}>
              {playing ? "Pause" : "Play"}
            </button>
          </div>
          <div className="flex w-full h-auto justify-center items-center bg-black">
            <PlayerContainer videoProps={sample.input.properties} playing={playing} />
          </div>
        </div>
        <div className="flex flex-col w-full h-full bg-background border border-border overflow-x-hidden">
          <TimelineManager projectData={sample.input} />
        </div>
      </div>
    </TimelineProvider>
  );
};

export default ExampleTimeline;
