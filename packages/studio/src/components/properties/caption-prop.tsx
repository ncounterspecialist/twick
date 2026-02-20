import { useEffect, useRef, useState } from "react";
import { CaptionElement, CAPTION_STYLE, CAPTION_STYLE_OPTIONS } from "@twick/timeline";
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
};

interface CaptionPropPanelProps {
  setApplyPropsToAllCaption: (apply: boolean) => void;
}

// interface CaptionProps {
//   capStyle: string;
//   font: {
//     size: number;
//     family: string;
//   };
//   colors: {
//     text: string;
//     highlight: string;
//     bgColor: string;
//   };
// }

export function CaptionPropPanel({
  selectedElement,
  updateElement,
  setApplyPropsToAllCaption,
}: CaptionPropPanelProps & PropertiesPanelProps) {
  const captionProps = {
    capStyle: CAPTION_STYLE.WORD_BG_HIGHLIGHT,
    font: CAPTION_FONT,
    colors: CAPTION_COLOR
  };
  const [applyPropsToAllCaption] = useState(false);
  const captionRef = useRef<HTMLInputElement>(null);
  const [editedText, setEditedText] = useState("");
  const [capStyle, setCapStyle] = useState<(typeof CAPTION_STYLE_OPTIONS)[keyof typeof CAPTION_STYLE_OPTIONS]>(
    CAPTION_STYLE_OPTIONS[CAPTION_STYLE.WORD_BG_HIGHLIGHT]
  );
  const [fontSize, setFontSize] = useState(CAPTION_FONT.size);
  const [fontFamily, setFontFamily] = useState(CAPTION_FONT.family);
  const [colors, setColors] = useState({
    text: CAPTION_COLOR.text,
    highlight: CAPTION_COLOR.highlight,
    bgColor: CAPTION_COLOR.bgColor,
  });

  const handleUpdateCaption = (updates: {
    text?: string;
    style?: string;
    fontSize?: number;
    fontFamily?: string;
    colors?: typeof colors;
  }) => {
    const captionElement = selectedElement as CaptionElement;

    if (captionElement) {
      captionElement.setProps({
        ...(selectedElement?.getProps() || {}),
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
    if(captionElement) {
        setEditedText(captionElement?.getText());
        if (captionRef.current) {
          captionRef.current.value = captionElement?.getText();
        }
        const captionProps = captionElement.getProps();
        const _capStyle = captionProps?.capStyle || captionProps.capStyle;
        if (_capStyle && _capStyle in CAPTION_STYLE_OPTIONS) {
          setCapStyle(CAPTION_STYLE_OPTIONS[_capStyle as keyof typeof CAPTION_STYLE_OPTIONS]);
        }
        setFontSize(captionProps?.font?.size || captionProps.font.size);
        setFontFamily(
            captionProps?.font?.family || captionProps.font.family
        );
        setColors(captionProps?.colors || captionProps.colors);
    }
      
  }, [selectedElement, captionProps]);

  if (!(selectedElement instanceof CaptionElement)) {
    return null;
  }

  return (
      <div className="space-y-3">
        {/* Caption Content */}
        <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
          <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            Caption Content
          </h5>
          <input
            ref={captionRef}
            type="text"
            value={editedText}
            onBlur={(e) => handleUpdateCaption({ text: e.target.value })}
            className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
          />
        </div>

        {/* Caption Style */}
        <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
          <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            Caption Style
          </h5>
          <select
            value={capStyle.value}
            onChange={(e) => {
              const val = e.target.value as keyof typeof CAPTION_STYLE_OPTIONS;
              if (val in CAPTION_STYLE_OPTIONS) {
                setCapStyle(CAPTION_STYLE_OPTIONS[val]);
              }
              handleUpdateCaption({ style: e.target.value });
            }}
            className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
          >
            {Object.values(CAPTION_STYLE_OPTIONS).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Properties */}
        <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
          <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            Font Properties
          </h5>
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Font Size
              </label>
              <div className="flex items-center gap-2">
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
                  className="w-full h-1.5 bg-gradient-to-r from-purple-500/30 to-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <span className="w-10 text-right text-xs text-gray-400">
                  {fontSize}px
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Font Family
              </label>
              <select
                value={fontFamily}
                onChange={(e) => {
                  const value = e.target.value;
                  setFontFamily(value);
                  handleUpdateCaption({ fontFamily: value });
                }}
                className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
              >
                <option value="Bangers">Bangers</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
          <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            Colors
          </h5>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Text</label>
              <div className="flex h-8">
                <div
                  className="w-6 h-full rounded-l border border-gray-600/40"
                  style={{ backgroundColor: colors.text }}
                />
                <input
                  type="color"
                  value={colors.text}
                  onChange={(e) => {
                    const newColors = { ...colors, text: e.target.value };
                    setColors(newColors);
                    handleUpdateCaption({ colors: newColors });
                  }}
                  className="h-full w-full rounded-l-none bg-neutral-700/60 border border-gray-600/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Highlight
              </label>
              <div className="flex h-8">
                <div
                  className="w-6 h-full rounded-l border border-gray-600/40"
                  style={{ backgroundColor: colors.highlight }}
                />
                <input
                  type="color"
                  value={colors.highlight}
                  onChange={(e) => {
                    const newColors = { ...colors, highlight: e.target.value };
                    setColors(newColors);
                    handleUpdateCaption({ colors: newColors });
                  }}
                  className="h-full w-full rounded-l-none bg-neutral-700/60 border border-gray-600/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Background
              </label>
              <div className="flex h-8">
                <div
                  className="w-6 h-full rounded-l border border-gray-600/40"
                  style={{ backgroundColor: colors.bgColor }}
                />
                <input
                  type="color"
                  value={colors.bgColor}
                  onChange={(e) => {
                    const newColors = { ...colors, bgColor: e.target.value };
                    setColors(newColors);
                    handleUpdateCaption({ colors: newColors });
                  }}
                  className="h-full w-full rounded-l-none bg-neutral-700/60 border border-gray-600/40"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Apply to All */}
        <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="apply-all"
              checked={applyPropsToAllCaption}
              onChange={() => {
                setApplyPropsToAllCaption?.(!applyPropsToAllCaption);
              }}
              className="w-4 h-4 bg-neutral-700/60 border border-gray-600/40 rounded text-purple-500 focus:ring-purple-500/30"
            />
            <label htmlFor="apply-all" className="text-xs text-gray-400">
              Apply to all captions
            </label>
          </div>
        </div>
      </div>
  );
}

export default CaptionPropPanel;
