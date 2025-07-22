import { LivePlayerProvider } from "@twick/live-player";
import "./example-demo.css";
import { generateShortUuid, TimelineProvider } from "@twick/timeline";
import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import CommandPanel from "../components/command-panel";

const ExampleDemo = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider
         contextId={generateShortUuid()}
        initialData={INITIAL_TIMELINE_DATA}
        undoRedoPersistenceKey="twick-demo"
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
