/**
 * CirclePanel Component
 *
 * A panel for creating and editing circle shapes in the studio. Provides controls
 * for adjusting radius, fill color, opacity, stroke color, and line width.
 *
 * @component
 * @param {Object} props
 * @param {number} props.radius - Circle radius in pixels
 * @param {string} props.fillColor - Fill color in hex format
 * @param {number} props.opacity - Opacity percentage (0-100)
 * @param {string} props.strokeColor - Stroke color in hex format
 * @param {number} props.lineWidth - Stroke width in pixels
 * @param {(radius: number) => void} props.setRadius - Update circle radius
 * @param {(color: string) => void} props.setFillColor - Update fill color
 * @param {(opacity: number) => void} props.setOpacity - Update opacity
 * @param {(color: string) => void} props.setStrokeColor - Update stroke color
 * @param {(width: number) => void} props.setLineWidth - Update line width
 * @param {() => void} props.handleApplyChanges - Apply circle element changes
 *
 * @example
 * ```tsx
 * <CirclePanel
 *   radius={50}
 *   fillColor="#ff0000"
 *   opacity={100}
 *   strokeColor="#000000"
 *   lineWidth={2}
 *   setRadius={setRadius}
 *   setFillColor={setFill}
 *   setOpacity={setOpacity}
 *   setStrokeColor={setStroke}
 *   setLineWidth={setWidth}
 *   handleApplyChanges={applyChanges}
 * />
 * ```
 */

import type {
  CirclePanelState,
  CirclePanelActions,
} from "../../hooks/use-circle-panel";

export type CirclePanelProps = CirclePanelState & CirclePanelActions;

export function CirclePanel({
  radius,
  fillColor,
  opacity,
  strokeColor,
  lineWidth,
  operation,
  setRadius,
  setFillColor,
  setOpacity,
  setStrokeColor,
  setLineWidth,
  handleApplyChanges,
}: CirclePanelProps) {
  return (
    <div className="panel-container">
      <div className="panel-title">Circle</div>
      {/* Radius */}
      <div className="panel-section">
        <label className="label-dark">Radius</label>
        <div className="slider-container">
          <input
            type="range"
            min="10"
            max="300"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="slider-purple"
          />
          <span className="slider-value">{radius}px</span>
        </div>
      </div>

      {/* Fill Color */}
      <div className="panel-section">
        <label className="label-dark">Fill Color</label>
        <div className="color-inputs">
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            className="color-picker"
          />
          <input
            type="text"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            className="color-text"
          />
        </div>
      </div>

      {/* Opacity */}
      <div className="panel-section">
        <label className="label-dark">Opacity</label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="slider-purple"
          />
          <span className="slider-value">{opacity}%</span>
        </div>
      </div>

      {/* Stroke Color */}
      <div className="panel-section">
        <label className="label-dark">Stroke Color</label>
        <div className="color-inputs">
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="color-picker"
          />
          <input
            type="text"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="color-text"
          />
        </div>
      </div>

      {/* Line Width */}
      <div className="panel-section">
        <label className="label-dark">Line Width</label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="slider-purple"
          />
          <span className="slider-value">{lineWidth}px</span>
        </div>
      </div>

      {/* Operation button */}
      <div className="flex panel-section">
        <button onClick={handleApplyChanges} className="btn-primary w-full">
          {operation}
        </button>
      </div>
    </div>
  );
}
