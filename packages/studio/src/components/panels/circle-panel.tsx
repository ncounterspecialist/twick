import { useState } from "react";
import { inputStyles } from "../../styles/input-styles";
import { CircleElement, TrackElement } from "@twick/timeline";

export function CirclePanel({onAddToTimeline}: {onAddToTimeline: (element: TrackElement) => void}) {
  const [radius, setRadius] = useState(50);
  const [fillColor, setFillColor] = useState("#3b82f6");
  const [opacity, setOpacity] = useState(100);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(0);

  const handleApplyChanges = () => {
    // TODO: Apply circle changes to selected circle element
    console.log("Applying circle changes:", {
      radius,
      fillColor,
      opacity,
      strokeColor,
      lineWidth
    });

    const circleElement = new CircleElement(fillColor, radius)
    .setOpacity(opacity)
    .setStrokeColor(strokeColor)
    .setLineWidth(lineWidth);

    onAddToTimeline(circleElement);
  };

  return (
    <div className={inputStyles.panel.container}>
      <h3 className={inputStyles.panel.title}>Circle</h3>

      {/* Radius */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Radius</label>
        <div className={inputStyles.range.container}>
          <input
            type="range"
            min="10"
            max="200"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className={inputStyles.range.base}
          />
          <span className={inputStyles.range.value}>{radius}px</span>
        </div>
      </div>

      {/* Fill Color */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Fill Color</label>
        <div className={inputStyles.color.container}>
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            className={inputStyles.color.picker}
          />
          <div 
            className={inputStyles.color.preview}
            style={{ backgroundColor: fillColor }}
          />
        </div>
      </div>

      {/* Opacity */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Opacity</label>
        <div className={inputStyles.range.container}>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className={inputStyles.range.gradient}
          />
          <span className={inputStyles.range.value}>{opacity}%</span>
        </div>
      </div>

      {/* Stroke Color */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Stroke Color</label>
        <div className={inputStyles.color.container}>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className={inputStyles.color.picker}
          />
          <div 
            className={inputStyles.color.preview}
            style={{ backgroundColor: strokeColor }}
          />
        </div>
      </div>

      {/* Line Width */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Line Width</label>
        <div className={inputStyles.range.container}>
          <input
            type="range"
            min="0"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className={inputStyles.range.base}
          />
          <span className={inputStyles.range.value}>{lineWidth}px</span>
        </div>
      </div>

      {/* Apply Changes Button */}
      <div className="mt-8">
        <button
          onClick={handleApplyChanges}
          className={inputStyles.button.primary}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}
