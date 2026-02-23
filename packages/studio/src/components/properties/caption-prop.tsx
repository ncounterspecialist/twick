import { useEffect, useRef, useState } from "react";
import {
  CaptionElement,
  CAPTION_STYLE,
  CAPTION_STYLE_OPTIONS,
  useTimelineContext,
} from "@twick/timeline";
import { PropertiesPanelProps } from "../../types";

export { CAPTION_STYLE, CAPTION_STYLE_OPTIONS };

export const CAPTION_FONT = {
  size: 40,
  family: "Bangers",
};

export const CAPTION_COLOR = {
  text: "#ffffff",
  highlight: "#ff4081",
  bgColor: "#8C52FF",
  outlineColor: "#000000",
};

interface CaptionPropPanelProps {
  /** No-op when using fixed config. Kept for API compatibility. */
  setApplyPropsToAllCaption?: (apply: boolean) => void;
}

export function CaptionPropPanel({
  selectedElement,
  updateElement,
}: CaptionPropPanelProps & PropertiesPanelProps) {
  const { editor, changeLog } = useTimelineContext();
  const captionRef = useRef<HTMLInputElement>(null);
  const [capStyle, setCapStyle] = useState<(typeof CAPTION_STYLE_OPTIONS)[keyof typeof CAPTION_STYLE_OPTIONS]>(
    CAPTION_STYLE_OPTIONS[CAPTION_STYLE.WORD_BG_HIGHLIGHT]
  );
  const [fontSize, setFontSize] = useState(CAPTION_FONT.size);
  const [fontFamily, setFontFamily] = useState(CAPTION_FONT.family);
  const [colors, setColors] = useState({
    text: CAPTION_COLOR.text,
    highlight: CAPTION_COLOR.highlight,
    bgColor: CAPTION_COLOR.bgColor,
    outlineColor: CAPTION_COLOR.outlineColor,
  });

  const track = selectedElement instanceof CaptionElement
    ? editor.getTrackById(selectedElement.getTrackId())
    : null;
  const trackProps = track?.getProps() ?? {};
  const applyToAll = trackProps?.applyToAll ?? false;

  const handleUpdateCaption = (updates: {
    text?: string;
    style?: string;
    fontSize?: number;
    fontFamily?: string;
    colors?: typeof colors;
  }) => {
    const captionElement = selectedElement as CaptionElement;
    if (!captionElement) return;

    if (applyToAll && track) {
      const nextFont = {
        size: updates.fontSize ?? fontSize,
        family: updates.fontFamily ?? fontFamily,
      };
      const nextColors = updates.colors ?? colors;
      const nextCapStyle = updates.style ?? capStyle?.value;

      track.setProps({
        ...trackProps,
        capStyle: nextCapStyle,
        font: { ...(trackProps?.font ?? {}), ...nextFont },
        colors: nextColors,
      });
      editor.refresh();
    } else {
      const elementProps = captionElement.getProps() ?? {};
      captionElement.setProps({
        ...elementProps,
        capStyle: updates.style ?? capStyle?.value,
        font: {
          size: updates.fontSize ?? fontSize,
          family: updates.fontFamily ?? fontFamily,
        },
        colors: updates.colors ?? colors,
      });
      updateElement?.(captionElement);
    }
  };

  useEffect(() => {
    const captionElement = selectedElement as CaptionElement;
    if (captionElement) {
      if (captionRef.current) {
        captionRef.current.value = captionElement?.getText();
      }
      const props = applyToAll ? trackProps : (captionElement.getProps() ?? {});
      const _capStyle = props?.capStyle;
      if (_capStyle && _capStyle in CAPTION_STYLE_OPTIONS) {
        setCapStyle(CAPTION_STYLE_OPTIONS[_capStyle as keyof typeof CAPTION_STYLE_OPTIONS]);
      }
      setFontSize(props?.font?.size ?? CAPTION_FONT.size);
      setFontFamily(props?.font?.family ?? CAPTION_FONT.family);
      const c = props?.colors;
      setColors({
        text: c?.text ?? CAPTION_COLOR.text,
        highlight: c?.highlight ?? CAPTION_COLOR.highlight,
        bgColor: c?.bgColor ?? CAPTION_COLOR.bgColor,
        outlineColor: c?.outlineColor ?? CAPTION_COLOR.outlineColor,
      });
    }
  }, [selectedElement, applyToAll, changeLog]);

  if (!(selectedElement instanceof CaptionElement)) {
    return null;
  }

  return (
    <div className="panel-container">
      {/* Caption Style */}
      <div className="panel-section">
        <label className="label-dark">Caption Style</label>
        <select
          value={capStyle.value}
          onChange={(e) => {
            const val = e.target.value as keyof typeof CAPTION_STYLE_OPTIONS;
            if (val in CAPTION_STYLE_OPTIONS) {
              setCapStyle(CAPTION_STYLE_OPTIONS[val]);
            }
            handleUpdateCaption({ style: e.target.value });
          }}
          className="select-dark w-full"
        >
          {Object.values(CAPTION_STYLE_OPTIONS).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="panel-section">
        <label className="label-dark">Font Size</label>
        <div className="slider-container">
          <input
            type="range"
            min="8"
            max="72"
            step="1"
            value={fontSize}
            onChange={(e) => {
              const value = Number(e.target.value);
              setFontSize(value);
              handleUpdateCaption({ fontSize: value });
            }}
            className="slider-purple"
          />
          <span className="slider-value">{fontSize}px</span>
        </div>
      </div>

      {/* Font */}
      <div className="panel-section">
        <label className="label-dark">Font</label>
        <select
          value={fontFamily}
          onChange={(e) => {
            const value = e.target.value;
            setFontFamily(value);
            handleUpdateCaption({ fontFamily: value });
          }}
          className="select-dark w-full"
        >
          <option value="Bangers">Bangers</option>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>

      {/* Colors */}
      <div className="panel-section">
        <label className="label-dark">Colors</label>
        <div className="color-section">
          <div className="color-control">
            <label className="label-small">Text Color</label>
            <div className="color-inputs">
              <input
                type="color"
                value={colors.text}
                onChange={(e) => {
                  const newColors = { ...colors, text: e.target.value };
                  setColors(newColors);
                  handleUpdateCaption({ colors: newColors });
                }}
                className="color-picker"
              />
              <input
                type="text"
                value={colors.text}
                onChange={(e) => {
                  const newColors = { ...colors, text: e.target.value };
                  setColors(newColors);
                  handleUpdateCaption({ colors: newColors });
                }}
                className="color-text"
              />
            </div>
          </div>
          <div className="color-control">
            <label className="label-small">Background Color</label>
            <div className="color-inputs">
              <input
                type="color"
                value={colors.bgColor}
                onChange={(e) => {
                  const newColors = { ...colors, bgColor: e.target.value };
                  setColors(newColors);
                  handleUpdateCaption({ colors: newColors });
                }}
                className="color-picker"
              />
              <input
                type="text"
                value={colors.bgColor}
                onChange={(e) => {
                  const newColors = { ...colors, bgColor: e.target.value };
                  setColors(newColors);
                  handleUpdateCaption({ colors: newColors });
                }}
                className="color-text"
              />
            </div>
          </div>
          <div className="color-control">
            <label className="label-small">Outline Color</label>
            <div className="color-inputs">
              <input
                type="color"
                value={colors.outlineColor}
                onChange={(e) => {
                  const newColors = { ...colors, outlineColor: e.target.value };
                  setColors(newColors);
                  handleUpdateCaption({ colors: newColors });
                }}
                className="color-picker"
              />
              <input
                type="text"
                value={colors.outlineColor}
                onChange={(e) => {
                  const newColors = { ...colors, outlineColor: e.target.value };
                  setColors(newColors);
                  handleUpdateCaption({ colors: newColors });
                }}
                className="color-text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptionPropPanel;
