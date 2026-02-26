import {
  EDU_STUDIO_CONFIG,
  INITIAL_TIMELINE_DATA,
  LivePlayerProvider,
  TimelineProvider,
  TwickStudio,
} from "@twick/studio";
import "@twick/studio/dist/studio.css";

export default function StarterEdu() {
  return (
    <LivePlayerProvider>
      <TimelineProvider initialData={INITIAL_TIMELINE_DATA} contextId="starter-edu">
        <TwickStudio studioConfig={EDU_STUDIO_CONFIG} />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
