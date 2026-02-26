import React from "react";
import {
  ArrowElement,
  RectElement,
  CircleElement,
  LineElement,
} from "@twick/timeline";
import type { PanelProps } from "../../types";

const SHAPE_COLORS = {
  line: "#f97316",
  arrow: "#f59e0b",
  rect: "#facc15",
  circle: "#facc15",
};

export const AnnotationsPanel = ({
  addElement,
  videoResolution,
}: PanelProps): React.ReactElement => {
  const addLine = async () => {
    if (!addElement) return;
    const element = new LineElement(SHAPE_COLORS.line, {
      width: Math.round(videoResolution.width * 0.35),
      height: 4,
    })
      .setEnd(5)
      .setName("Line");
    await addElement(element);
  };

  const addArrow = async () => {
    if (!addElement) return;
    const element = new ArrowElement(SHAPE_COLORS.arrow, { width: 220, height: 20 })
      .setEnd(5)
      .setName("Arrow Callout");
    await addElement(element);
  };

  const addBox = async () => {
    if (!addElement) return;
    const element = new RectElement(SHAPE_COLORS.rect, {
      width: Math.round(videoResolution.width * 0.35),
      height: Math.round(videoResolution.height * 0.18),
    })
      .setEnd(5)
      .setName("Box");
    await addElement(element);
  };

  const addCircle = async () => {
    if (!addElement) return;
    const radius = Math.round(Math.min(videoResolution.width, videoResolution.height) * 0.12);
    const element = new CircleElement(SHAPE_COLORS.circle, radius)
      .setEnd(5)
      .setName("Circle");
    await addElement(element);
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h3>Shapes</h3>
      </div>
      <div
        className="panel-content"
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        }}
      >
        {/* Line */}
        <button
          type="button"
          className="btn-ghost"
          onClick={addLine}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            padding: "10px 12px",
            textAlign: "left",
            minHeight: 90,
          }}
        >
          <div
            style={{
              height: 6,
              borderRadius: 999,
              background: "rgba(249,115,22,1)",
              marginBottom: 8,
            }}
          />
          <div style={{ fontWeight: 600, marginBottom: 2 }}>Line</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            Draw a straight segment to connect or underline.
          </div>
        </button>

        {/* Arrow */}
        <button
          type="button"
          className="btn-ghost"
          onClick={addArrow}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            padding: "10px 12px",
            textAlign: "left",
            minHeight: 90,
          }}
        >
          <div
            style={{
              height: 10,
              borderRadius: 999,
              background: "rgba(249,115,22,1)",
              position: "relative",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -4,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderLeft: "12px solid rgba(249,115,22,1)",
              }}
            />
          </div>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>Arrow callout</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            Emphasize a button or region with a directional arrow.
          </div>
        </button>

        {/* Box (Rect) */}
        <button
          type="button"
          className="btn-ghost"
          onClick={addBox}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            padding: "10px 12px",
            textAlign: "left",
            minHeight: 90,
          }}
        >
          <div
            style={{
              height: 40,
              borderRadius: 10,
              backgroundColor: "rgba(250,204,21,0.35)",
              border: "1px solid rgba(250,204,21,0.8)",
              marginBottom: 8,
            }}
          />
          <div style={{ fontWeight: 600, marginBottom: 2 }}>Box</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            Draw attention to important text or UI with a soft highlight.
          </div>
        </button>

        {/* Circle */}
        <button
          type="button"
          className="btn-ghost"
          onClick={addCircle}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            padding: "10px 12px",
            textAlign: "left",
            minHeight: 90,
          }}
        >
          <div
            style={{
              height: 40,
              width: 40,
              borderRadius: 999,
              border: "2px solid rgba(250,204,21,0.9)",
              backgroundColor: "rgba(250,204,21,0.2)",
              marginBottom: 8,
              alignSelf: "flex-start",
            }}
          />
          <div style={{ fontWeight: 600, marginBottom: 2 }}>Circle</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            Add a circular callout or highlight area.
          </div>
        </button>
      </div>
    </div>
  );
};
