/**
 * TextPanel Component
 * 
 * A panel for creating and editing text elements in the studio. Provides comprehensive
 * text styling options including font selection, size, colors, stroke, and shadow effects.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.textContent - Text content to display
 * @param {number} props.fontSize - Font size in pixels
 * @param {string} props.selectedFont - Selected font family
 * @param {boolean} props.isBold - Whether text is bold
 * @param {boolean} props.isItalic - Whether text is italic
 * @param {string} props.textColor - Text color in hex format
 * @param {string} props.strokeColor - Stroke color in hex format
 * @param {boolean} props.applyShadow - Whether to apply shadow effect
 * @param {string} props.shadowColor - Shadow color in hex format
 * @param {number} props.strokeWidth - Width of text stroke
 * @param {string[]} props.fonts - Available font options
 * @param {(text: string) => void} props.setTextContent - Update text content
 * @param {(size: number) => void} props.setFontSize - Update font size
 * @param {(font: string) => void} props.setSelectedFont - Update selected font
 * @param {(bold: boolean) => void} props.setIsBold - Toggle bold style
 * @param {(italic: boolean) => void} props.setIsItalic - Toggle italic style
 * @param {(color: string) => void} props.setTextColor - Update text color
 * @param {(color: string) => void} props.setStrokeColor - Update stroke color
 * @param {(apply: boolean) => void} props.setApplyShadow - Toggle shadow effect
 * @param {(color: string) => void} props.setShadowColor - Update shadow color
 * @param {(width: number) => void} props.setStrokeWidth - Update stroke width
 * @param {() => void} props.handleApplyChanges - Apply text element changes
 * 
 * @example
 * ```tsx
 * <TextPanel
 *   textContent="Sample Text"
 *   fontSize={48}
 *   selectedFont="Arial"
 *   isBold={false}
 *   isItalic={false}
 *   textColor="#000000"
 *   strokeColor="#ffffff"
 *   applyShadow={false}
 *   shadowColor="#000000"
 *   strokeWidth={0}
 *   fonts={["Arial", "Times New Roman"]}
 *   setTextContent={setText}
 *   setFontSize={setSize}
 *   // ... other handlers
 * />
 * ```
 */

import type { TextPanelState, TextPanelActions } from "../../hooks/use-text-panel";

export type TextPanelProps = TextPanelState & TextPanelActions;

export function TextPanel({
  textContent,
  fontSize,
  selectedFont,
  isBold,
  isItalic,
  textColor,
  strokeColor,
  applyShadow,
  shadowColor,
  strokeWidth,
  fonts,
  operation,
  setTextContent,
  setFontSize,
  setSelectedFont,
  setIsBold,
  setIsItalic,
  setTextColor,
  setStrokeColor,
  setApplyShadow,
  setShadowColor,
  setStrokeWidth,
  handleApplyChanges,
}: TextPanelProps) {
  return (
    <div className="panel-container">
      <div className="panel-title">Text</div>
      {/* Text Content */}
      <div className="flex panel-section">
        <input
          type="text"
          value={textContent}
          placeholder="Sample"
          onChange={(e) => setTextContent(e.target.value)}
          className="input-dark"
        />
      </div>

      {/* Font Size */}
      <div className="panel-section">
        <label className="label-dark">Font Size</label>
        <div className="slider-container">
          <input
            type="range"
            min="8"
            max="120"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="slider-purple"
          />
          <span className="slider-value">{fontSize}px</span>
        </div>
      </div>

      {/* Font */}
      <div className="panel-section">
        <label className="label-dark">Font</label>
        <div className="font-controls">
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="select-dark"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsBold(!isBold)}
            className={`btn-icon ${isBold ? 'btn-icon-active' : ''}`}
          >
            B
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`btn-icon ${isItalic ? 'btn-icon-active' : ''}`}
          >
            I
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="panel-section">
        <label className="label-dark">Colors</label>
        <div className="color-section">
          {/* Text Color */}
          <div className="color-control">
            <label className="label-small">Text Color</label>
            <div className="color-inputs">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="color-text"
              />
            </div>
          </div>

          {/* Stroke Color */}
          <div className="color-control">
            <label className="label-small">Stroke Color</label>
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

          {/* Apply Shadow */}
          <div className="checkbox-control">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={applyShadow}
                onChange={(e) => setApplyShadow(e.target.checked)}
                className="checkbox-purple"
              />
              Apply Shadow
            </label>
          </div>

          {/* Shadow Color - Only shown when shadow is enabled */}
          {applyShadow && (
            <div className="color-control">
              <label className="label-small">Shadow Color</label>
              <div className="color-inputs">
                <input
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="color-picker"
                />
                <input
                  type="text"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="color-text"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stroke Width */}
      <div className="panel-section">
        <label className="label-dark">Stroke Width</label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="2"
            step={0.1}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="slider-purple"
          />
          <span className="slider-value">{strokeWidth}</span>
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