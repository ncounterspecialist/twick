import { LivePlayerProvider } from "@twick/live-player";
import { TwickStudio } from "@twick/studio";
import { TimelineProvider } from "@twick/timeline";
import "@twick/studio/dist/studio.css";
import { INITIAL_TIMELINE_DATA } from "@twick/video-editor";

export default function ExampleStudio() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
        contextId={"studio-demo"}
      >
        <TwickStudio studioConfig={{
          videoProps: {
            width: 720,
            height: 1280,
          },
        }}/>
      </TimelineProvider>
    </LivePlayerProvider>
  );
}