import {
  DEMO_STUDIO_CONFIG,
  INITIAL_TIMELINE_DATA,
  LivePlayerProvider,
  TimelineProvider,
  TwickStudio,
} from "@twick/studio";
import "@twick/studio/dist/studio.css";

export default function StarterDemo() {
  return (
    <LivePlayerProvider>
      <TimelineProvider initialData={INITIAL_TIMELINE_DATA} contextId="starter-demo">
        <TwickStudio studioConfig={DEMO_STUDIO_CONFIG} />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
