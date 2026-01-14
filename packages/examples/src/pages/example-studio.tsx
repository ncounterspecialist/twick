import { TwickStudio, LivePlayerProvider, TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/studio";
import "@twick/studio/dist/studio.css";
export default function ExampleStudio() {

  console.log("ExampleStudio rendered", INITIAL_TIMELINE_DATA);
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