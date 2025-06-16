import VideoEditor from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import EditorControls from "../components/editor-controls";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider } from "@twick/timeline";

import "./example-editor.css";
const ExampleEditor = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={{
          timeline: [],
          version: 0,
        }}
      >
        <VideoEditor
          leftPanel={<EditorControls />}
          rightPanel={<div></div>}
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

export default ExampleEditor;
