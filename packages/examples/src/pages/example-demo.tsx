import { LivePlayerProvider } from "@twick/live-player";
import "@twick/timeline/dist/timeline.css";
import "./example-demo.css";
import { TimelineProvider } from "@twick/timeline";
import VideoEditor from "@twick/video-editor";
import CommandPanel from "../components/command-panel";
import PlayControls from "../components/play-controls";

const ExampleDemo = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={{
          timeline: [],
          version: 0,
        }}
      >
        <VideoEditor
          leftPanel={
            <div className="left-panel">
              <PlayControls />
            </div>
          }
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
