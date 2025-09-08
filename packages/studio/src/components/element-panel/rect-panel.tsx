import { inputStyles } from "../../styles/input-styles";
import type { RectPanelState, RectPanelActions } from "../../hooks/use-rect-panel";

export type RectPanelProps = RectPanelState & RectPanelActions;

export function RectPanel({
  cornerRadius,
  fillColor,
  opacity,
  strokeColor,
  lineWidth,
  setCornerRadius,
  setFillColor,
  setOpacity,
  setStrokeColor,
  setLineWidth,
  handleApplyChanges,
}: RectPanelProps) {
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