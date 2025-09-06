import { useEffect, useState } from "react";
import { inputStyles } from "../../styles/input-styles";
import { RectElement } from "@twick/timeline";
import type { PanelProps } from "../../types";

const DEFAULT_RECT_PROPS = {
  cornerRadius: 0,
  fillColor: "#3b82f6",
  opacity: 100,
  strokeColor: "#000000",
  lineWidth: 0,
}     
export function RectPanel({selectedElement, addElement, updateElement}: PanelProps) {
  const [cornerRadius, setCornerRadius] = useState(DEFAULT_RECT_PROPS.cornerRadius);
  const [fillColor, setFillColor] = useState(DEFAULT_RECT_PROPS.fillColor);
  const [opacity, setOpacity] = useState(DEFAULT_RECT_PROPS.opacity);
  const [strokeColor, setStrokeColor] = useState(DEFAULT_RECT_PROPS.strokeColor);
  const [lineWidth, setLineWidth] = useState(DEFAULT_RECT_PROPS.lineWidth);

  const handleApplyChanges = () => {
    let rectElement;
    if(selectedElement instanceof RectElement) {
      rectElement = selectedElement;
      rectElement.setCornerRadius(cornerRadius);
      rectElement.setOpacity(opacity);
      rectElement.setStrokeColor(strokeColor);
      rectElement.setLineWidth(lineWidth);
      updateElement?.(rectElement);
    } else {
      rectElement = new RectElement(fillColor, { width: 200, height: 200 })
    .setCornerRadius(cornerRadius)
    .setOpacity(opacity)
    .setStrokeColor(strokeColor)
    .setLineWidth(lineWidth);
    addElement?.(rectElement);
    }
  };

  useEffect(() => {
    if(selectedElement instanceof RectElement) {
      setCornerRadius(selectedElement.getCornerRadius() ?? DEFAULT_RECT_PROPS.cornerRadius);
      setFillColor(selectedElement.getFill() ?? DEFAULT_RECT_PROPS.fillColor);
      setOpacity(selectedElement.getOpacity() ?? DEFAULT_RECT_PROPS.opacity);
      setStrokeColor(selectedElement.getStrokeColor() ?? DEFAULT_RECT_PROPS.strokeColor);
      setLineWidth(selectedElement.getLineWidth() ?? DEFAULT_RECT_PROPS.lineWidth);
    }
  }, [selectedElement]);

  return (
    <div className={inputStyles.panel.container}>
      <h3 className={inputStyles.panel.title}>Rectangle</h3>

      {/* Corner Radius */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Corner Radius</label>
        <div className={inputStyles.range.container}>
          <input
            type="range"
            min="0"
            max="100"
            value={cornerRadius}
            onChange={(e) => setCornerRadius(Number(e.target.value))}
            className={inputStyles.range.base}
          />
          <span className={inputStyles.range.value}>{cornerRadius}px</span>
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
