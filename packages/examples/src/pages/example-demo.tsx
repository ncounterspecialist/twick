import VideoEditor from "@twick/video-editor";
import { LivePlayerProvider } from "@twick/live-player";
import {  TimelineProvider } from "@twick/timeline";
import "@twick/video-editor/dist/video-editor.css";

const ExampleDemo = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId={'my-video-project'}
      >
        <VideoEditor
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
