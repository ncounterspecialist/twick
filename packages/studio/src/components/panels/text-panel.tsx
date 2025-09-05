import { useState } from "react";
import { inputStyles } from "../../styles/input-styles";
import { TextElement, TrackElement } from "@twick/timeline";
import { AVAILABLE_TEXT_FONTS } from "@twick/video-editor";

export function TextPanel({onAddToTimeline}: {onAddToTimeline: (element: TrackElement) => void}) {
  const [textContent, setTextContent] = useState("Sample");
  const [fontSize, setFontSize] = useState(48);
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textColor, setTextColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#ffffff");
  const [applyShadow, setApplyShadow] = useState(false);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(0);

  const fonts = Object.values(AVAILABLE_TEXT_FONTS);

  const handleApplyChanges = () => {

    const textElement = new TextElement(textContent)
    .setFontSize(fontSize)
    .setFontFamily(selectedFont)
    .setFontWeight(isBold ? 700 : 400)
    .setFontStyle(isItalic ? "italic" : "normal")
    .setFill(textColor)
    .setStrokeColor(strokeColor)
    .setLineWidth(strokeWidth)
    .setTextAlign("center")

    if(applyShadow) {
      textElement.setProps(
        {
          ...textElement.getProps(),
          shadowColor,
          shadowOffset: [0, 0],
          shadowBlur: 2,
          shadowOpacity: 1.0
        }
      );
    }
    onAddToTimeline(textElement);
  }

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
              <option key={font} value={font}>{font}</option>
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
            <label htmlFor="applyShadow" className={inputStyles.radio.label}>Apply Shadow</label>
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
