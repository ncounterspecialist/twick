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

import { inputStyles } from "../../styles/input-styles";
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
    <div className={inputStyles.panel.container}>
      <h3 className={inputStyles.panel.title}>Text Element</h3>

      {/* Text Content */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Text Content</label>
        <input
          type="text"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          className={inputStyles.input.base}
        />
      </div>

      {/* Font Size */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Font Size</label>
        <div className={inputStyles.range.container}>
          <input
            type="range"
            min="8"
            max="120"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className={inputStyles.range.gradient}
          />
          <span className={inputStyles.range.value}>{fontSize}px</span>
        </div>
      </div>

      {/* Font */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Font</label>
        <div className="flex items-center gap-2">
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className={inputStyles.input.base}
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsBold(!isBold)}
            className={`${inputStyles.toggle.base} ${
              isBold ? inputStyles.toggle.active : inputStyles.toggle.inactive
            }`}
          >
            <span className="font-bold">B</span>
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`${inputStyles.toggle.base} ${
              isItalic ? inputStyles.toggle.active : inputStyles.toggle.inactive
            }`}
          >
            <span className="italic">I</span>
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Colors</label>
        <div className="space-y-3">
          {/* Text Color */}
          <div>
            <label className={inputStyles.label.small}>Text Color</label>
            <div className={inputStyles.color.container}>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className={inputStyles.color.picker}
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className={inputStyles.input.small}
              />
            </div>
          </div>

          {/* Stroke Color */}
          <div>
            <label className={inputStyles.label.small}>Stroke Color</label>
            <div className={inputStyles.color.container}>
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className={inputStyles.color.picker}
              />
              <input
                type="text"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className={inputStyles.input.small}
              />
            </div>
          </div>

          {/* Apply Shadow */}
          <div className={inputStyles.radio.container}>
            <input
              type="checkbox"
              id="applyShadow"
              checked={applyShadow}
              onChange={(e) => setApplyShadow(e.target.checked)}
              className={inputStyles.radio.base}
            />
            <label htmlFor="applyShadow" className={inputStyles.radio.label}>
              Apply Shadow
            </label>
          </div>

          {/* Shadow Color - Only shown when shadow is enabled */}
          {applyShadow && (
            <div>
              <label className={inputStyles.label.small}>Shadow Color</label>
              <div className={inputStyles.color.container}>
                <input
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className={inputStyles.color.picker}
                />
                <input
                  type="text"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className={inputStyles.input.small}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stroke Width */}
      <div className={inputStyles.container}>
        <label className={inputStyles.label.base}>Stroke Width</label>
        <div className={inputStyles.range.container}>
          <input
            type="range"
            min="0"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className={inputStyles.range.base}
          />
          <span className={inputStyles.range.value}>{strokeWidth}</span>
        </div>
      </div>

      {/* Apply Changes Button */}
      <div className="mt-8">
        <button onClick={handleApplyChanges} className={inputStyles.button.primary}>
          Apply Changes
        </button>
      </div>
    </div>
  );
}