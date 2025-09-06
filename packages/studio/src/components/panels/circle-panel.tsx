import { useEffect, useState } from "react";
import { inputStyles } from "../../styles/input-styles";
import { CircleElement } from "@twick/timeline";
import type { PanelProps } from "../../types";

const DEFAULT_CIRCLE_PROPS = {
  radius: 50,
  fillColor: "#3b82f6",
  opacity: 100,
  strokeColor: "#000000",
  lineWidth: 0,
}
export function CirclePanel({
  selectedElement,
  addElement,
  updateElement,
}: PanelProps) {
  const [radius, setRadius] = useState(DEFAULT_CIRCLE_PROPS.radius);
  const [fillColor, setFillColor] = useState(DEFAULT_CIRCLE_PROPS.fillColor);
  const [opacity, setOpacity] = useState(DEFAULT_CIRCLE_PROPS.opacity);
  const [strokeColor, setStrokeColor] = useState(DEFAULT_CIRCLE_PROPS.strokeColor);
  const [lineWidth, setLineWidth] = useState(DEFAULT_CIRCLE_PROPS.lineWidth);

  const handleApplyChanges = () => {
    let circleElement;
    if (selectedElement instanceof CircleElement) {
      circleElement = selectedElement;
      circleElement.setRadius(radius);
      circleElement.setFill(fillColor);
      circleElement.setOpacity(opacity);
      circleElement.setStrokeColor(strokeColor);
      circleElement.setLineWidth(lineWidth);
      updateElement?.(circleElement);
    } else {
      circleElement = new CircleElement(fillColor, radius)
        .setOpacity(opacity)
        .setStrokeColor(strokeColor)
        .setLineWidth(lineWidth);
      addElement?.(circleElement);
    }
  };

  useEffect(() => {
    if (selectedElement instanceof CircleElement) {
      setRadius(selectedElement.getRadius() ?? DEFAULT_CIRCLE_PROPS.radius);
      setFillColor(selectedElement.getFill() ?? DEFAULT_CIRCLE_PROPS.fillColor);
      setOpacity(selectedElement.getOpacity() ?? DEFAULT_CIRCLE_PROPS.opacity);
      setStrokeColor(selectedElement.getStrokeColor() ?? DEFAULT_CIRCLE_PROPS.strokeColor);
      setLineWidth(selectedElement.getLineWidth() ?? DEFAULT_CIRCLE_PROPS.lineWidth);
    }
  }, [selectedElement]);

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
            max="300"
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
