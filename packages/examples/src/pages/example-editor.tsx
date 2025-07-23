import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import { generateShortUuid, TimelineProvider } from "@twick/timeline";

import "./example-editor.css";

const ExampleEditor = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId={generateShortUuid()}
        initialData={INITIAL_TIMELINE_DATA}
      >
        <VideoEditor
          leftPanel={<div></div>}
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
