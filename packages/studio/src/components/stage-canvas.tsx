import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider } from "@twick/timeline";

import "@twick/video-editor/dist/video-editor.css";
import { useEditor } from "../hooks/useEditor";

export function StageCanvas() {
  const { project } = useEditor();
  return (
    <div className="flex-1 overflow-y-auto p-3 bg-black">
      <div className="canvas-container mx-auto" style={{ maxWidth: 960 }}>
        <LivePlayerProvider>
          <TimelineProvider
            contextId={"twick-studio"}
            initialData={INITIAL_TIMELINE_DATA}
          >
            <VideoEditor
              editorConfig={{
                canvasMode: true,
                videoProps: {
                  width: project.timeline.width,
                  height: project.timeline.height,
                },
              }}
            />
          </TimelineProvider>
        </LivePlayerProvider>
      </div>
    </div>
  );
}
