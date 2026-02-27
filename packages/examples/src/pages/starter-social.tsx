import {
  INITIAL_TIMELINE_DATA,
  LivePlayerProvider,
  MARKETING_STUDIO_CONFIG,
  TimelineProvider,
  TwickStudio,
} from "@twick/studio";
import "@twick/studio/dist/studio.css";

export default function StarterSocial() {
  return (
    <LivePlayerProvider>
      <TimelineProvider initialData={INITIAL_TIMELINE_DATA} contextId="starter-social">
        <TwickStudio studioConfig={MARKETING_STUDIO_CONFIG} />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
