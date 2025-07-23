import { getDecimalNumber, useTimelineContext, useTimelineEditor, type TimelineElement } from "@twick/timeline";
import { ANIMATIONS } from "@twick/video-editor";
import { useEffect, useState } from "react";

const AnimationPanel = () => {
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(
    null
  );
  const [animate, setAnimate] = useState("enter");
  const [direction, setDirection] = useState("up");
  const [mode, setMode] = useState("in");
  const [interval, setInterval] = useState(1000);
  const { selectedItem } = useTimelineContext();
  const editor = useTimelineEditor();

  const handleAnimate = () => {
    if (!selectedAnimation) return;
    const element = selectedItem as TimelineElement;
    editor.setElementAnimation({
      timelineId: element.timelineId,
      elementId: element.id,
      animation: {
        name: selectedAnimation,
        animate,
        direction,
        mode,
        interval: getDecimalNumber(interval / 1000),
      },
    });
  };

  const handleDeleteAnimation = () => {
    if (!selectedAnimation) return;
    const element = selectedItem as TimelineElement;
    editor.setElementAnimation({
      timelineId: element.timelineId,
      elementId: element.id,
      animation: null,
    });
  };

  useEffect(() => {
    if (selectedItem?.id?.startsWith("e-")) {
      const element = selectedItem as TimelineElement;
      if (element.animation) {
        setSelectedAnimation(element.animation.name);
        setAnimate(element.animation.animate || "enter");
        setDirection(element.animation.direction || "up");
        setMode(element.animation.mode || "in");
        setInterval((element.animation.interval || 0.5) * 1000);
      }
    }
  }, [selectedItem]);

  if (!selectedItem?.id?.startsWith("e-")) return null;

  return (
    <div className="twick-animation-panel">
      <div className="twick-animation-header">
        <h3>Animation</h3>
      </div>
      <div className="twick-animation-content">
        <div className="twick-animation-select">
          <label>Animation Type:</label>
          <select
            value={selectedAnimation || ""}
            onChange={(e) => setSelectedAnimation(e.target.value)}
          >
            <option value="">Select Animation</option>
            {ANIMATIONS.map((anim) => (
              <option key={anim.name} value={anim.name}>
                {anim.name}
              </option>
            ))}
          </select>
        </div>

        {selectedAnimation && (
          <>
            <div className="twick-animation-controls">
              <div className="twick-animation-control">
                <label>Animate:</label>
                <select value={animate} onChange={(e) => setAnimate(e.target.value)}>
                  <option value="enter">Enter</option>
                  <option value="exit">Exit</option>
                </select>
              </div>

              <div className="twick-animation-control">
                <label>Direction:</label>
                <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                  <option value="up">Up</option>
                  <option value="down">Down</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div className="twick-animation-control">
                <label>Mode:</label>
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                  <option value="in">In</option>
                  <option value="out">Out</option>
                </select>
              </div>

              <div className="twick-animation-control">
                <label>Interval (seconds):</label>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={interval / 1000}
                  onChange={(e) => setInterval(parseFloat(e.target.value) * 1000)}
                />
                <span>{interval / 1000}s</span>
              </div>
            </div>

            <div className="twick-animation-actions">
              <button onClick={handleAnimate}>Apply Animation</button>
              <button onClick={handleDeleteAnimation}>Remove Animation</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnimationPanel;
