import { PlayerManager } from "./player/player-manager";
import TimelineManager from "./timeline/timeline-manager";
import "../styles/video-editor.css";
import React, { useState } from "react";
import ControlManager from "./controls/control-manager";

interface VideoEditorProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  editorConfig: {
    videoProps: {
      width: number;
      height: number;
    };
    canvasMode?: boolean;
  };
}

const VideoEditor: React.FC<VideoEditorProps> = ({
  leftPanel,
  rightPanel,
  editorConfig,
}) => {
  const [trackZoom, setTrackZoom] = useState(1);
  return (
    <div className="twick-editor-main-container">
      <div className="twick-editor-view-section">
        {leftPanel ? leftPanel : null}
        <PlayerManager
          videoProps={editorConfig.videoProps}
          canvasMode={editorConfig.canvasMode ?? true}
        />
        {rightPanel ? rightPanel : null}
      </div>
      <div className="twick-editor-timeline-section">
        <ControlManager trackZoom={trackZoom} setTrackZoom={setTrackZoom} />

        <TimelineManager
          trackZoom={trackZoom}
          videoSize={{
            width: editorConfig.videoProps.width,
            height: editorConfig.videoProps.height,
          }}
        />
      </div>
    </div>
  );
};

export default VideoEditor;
