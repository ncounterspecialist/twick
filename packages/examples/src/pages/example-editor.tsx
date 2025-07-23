import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import {  TimelineProvider } from "@twick/timeline";

import "./example-editor.css";
import EditorControls from "../components/editor-controls";

const ExampleEditor = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId={'editor-demo'}
        initialData={INITIAL_TIMELINE_DATA}
      >
        <VideoEditor
          leftPanel={<EditorControls/>}
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
