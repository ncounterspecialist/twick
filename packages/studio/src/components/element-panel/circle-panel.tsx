import { inputStyles } from "../../styles/input-styles";
import type { CirclePanelState, CirclePanelActions } from "../../hooks/use-circle-panel";

export type CirclePanelProps = CirclePanelState & CirclePanelActions;

export function CirclePanel({
  radius,
  fillColor,
  opacity,
  strokeColor,
  lineWidth,
  setRadius,
  setFillColor,
  setOpacity,
  setStrokeColor,
  setLineWidth,
  handleApplyChanges,
}: CirclePanelProps) {
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