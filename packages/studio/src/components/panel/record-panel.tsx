import React, { useState } from "react";
import { VideoElement } from "@twick/timeline";
import type { PanelProps } from "../../types";
import { useScreenRecorder } from "../../hooks/use-screen-recorder";

export const RecordPanel = ({
  addElement,
  videoResolution,
}: PanelProps): React.ReactElement => {
  const [withMic, setWithMic] = useState(true);
  const { state, mediaUrl, error, startRecording, stopRecording, clearRecording } =
    useScreenRecorder();

  const addToTimeline = async () => {
    if (!mediaUrl || !addElement) return;
    const element = new VideoElement(mediaUrl, videoResolution)
      .setEnd(5)
      .setName("Screen Recording")
      .setMetadata({
        source: "screen-recording",
        hasMic: withMic,
      });
    await element.updateVideoMeta();
    const duration = element.getMediaDuration?.() ?? 5;
    element.setEnd(Math.max(1, duration));
    addElement(element);
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h3>Record Screen</h3>
      </div>
      <div className="panel-content" style={{ display: "grid", gap: "12px" }}>
        <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={withMic}
            onChange={(e) => setWithMic(e.target.checked)}
          />
          Include microphone
        </label>

        {state !== "recording" ? (
          <button className="btn-primary" onClick={() => startRecording(withMic)}>
            Start Recording
          </button>
        ) : (
          <button className="btn-ghost" onClick={stopRecording}>
            Stop Recording
          </button>
        )}

        {error ? <span className="text-sm">{error}</span> : null}

        {mediaUrl ? (
          <>
            <video src={mediaUrl} controls style={{ width: "100%", borderRadius: "8px" }} />
            <button className="btn-primary" onClick={addToTimeline}>
              Add Recording To Timeline
            </button>
            <button className="btn-ghost" onClick={clearRecording}>
              Clear Recording
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};
