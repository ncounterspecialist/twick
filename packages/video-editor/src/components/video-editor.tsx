import { PlayerManager } from "./player/player-manager";
import TimelineManager from "./timeline/timeline-manager";
import "../styles/video-editor.css";
import React, { useState } from "react";
import ControlManager from "./controls/control-manager";
import { DEFAULT_TIMELINE_ZOOM } from "../helpers/constants";

interface VideoEditorProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  bottomPanel?: React.ReactNode;
  playControls?: React.ReactNode;
  defaultPlayControls?: boolean;
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
  bottomPanel,
  editorConfig,
  playControls,
  defaultPlayControls = true,
}) => {
  const [trackZoom, setTrackZoom] = useState(DEFAULT_TIMELINE_ZOOM);
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
      {bottomPanel ? bottomPanel : null}
      <div className="twick-editor-timeline-section">
        {playControls ? (
          playControls
        ) : defaultPlayControls ? (
          <ControlManager trackZoom={trackZoom} setTrackZoom={setTrackZoom} />
        ) : null}

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
