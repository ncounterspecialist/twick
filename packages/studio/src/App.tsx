import { EditorShell } from "./components/editor-shell";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider } from "@twick/timeline";
import { INITIAL_TIMELINE_DATA } from "@twick/video-editor";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-900">
      <LivePlayerProvider>
        <TimelineProvider
          contextId={"twick-studio"}
          initialData={INITIAL_TIMELINE_DATA}
        >
          <EditorShell />
        </TimelineProvider>
      </LivePlayerProvider>
    </div>
  );
}

export default App;
