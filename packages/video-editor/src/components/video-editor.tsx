import { EditorManager } from "./editor-manager";
import TimelineManager from "./timeline-manager";
import "../styles/video-editor.css";
import React from "react";

interface VideoEditorProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  timelineControls?: React.ReactNode;
  editorConfig: {
    videoProps: {
      width: number;
      height: number;
    };
  };
}

const VideoEditor: React.FC<VideoEditorProps> = ({
  leftPanel,
  rightPanel,
  timelineControls,
  editorConfig,
}) => {
  return (
    <div className="twick-editor-main-container">
      <div className="twick-editor-view-section">
        {leftPanel ? leftPanel : null}
        <EditorManager videoProps={editorConfig.videoProps} />
        {rightPanel ? rightPanel : null}
      </div>
      <div className="twick-editor-timeline-section">
        <TimelineManager
          timelineControls={timelineControls}
        />
      </div>
    </div>
  );
};

export default VideoEditor;
