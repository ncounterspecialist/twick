/**
 * StageCanvas Component
 * 
 * The main editing canvas that displays the video/composition workspace.
 * Wraps the VideoEditor component in canvas mode with proper sizing and scrolling.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.resolution - Canvas resolution settings
 * @param {number} props.resolution.width - Canvas width in pixels
 * @param {number} props.resolution.height - Canvas height in pixels
 * 
 * @example
 * ```tsx
 * <StageCanvas resolution={{ width: 1920, height: 1080 }} />
 * ```
 */

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
