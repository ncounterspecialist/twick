import VideoEditor from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
  
export function StageCanvas({resolution}: {resolution: {width: number, height: number}}) {
  return (
    <div className="flex-1 overflow-y-auto p-1">
      <div className="canvas-container mx-auto" style={{ maxWidth: 960 }}>
        <VideoEditor
          editorConfig={{
            canvasMode: true,
            videoProps: {
              width: resolution.width,
              height: resolution.height,
            },
          }}
        />
      </div>
    </div>
  );
}
