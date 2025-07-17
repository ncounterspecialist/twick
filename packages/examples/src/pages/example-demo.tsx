import { LivePlayerProvider } from "@twick/live-player";
import "@twick/timeline/dist/timeline.css";
import "./example-demo.css";
import { TimelineProvider } from "@twick/timeline";
import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import CommandPanel from "../components/command-panel";
import PlayControls from "../components/play-controls";

const ExampleDemo = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
      >
        <VideoEditor
          leftPanel={<div></div>}
          rightPanel={<CommandPanel />}
          editorConfig={{
            canvasMode: true,
            videoProps: {
              width: 720,
              height: 1280,
            },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
};

export default ExampleDemo;
