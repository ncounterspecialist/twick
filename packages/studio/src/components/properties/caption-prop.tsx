import { useEffect, useRef, useState } from "react";
import {
  CaptionElement,
  CAPTION_STYLE,
  CAPTION_STYLE_OPTIONS,
  computeCaptionGeometry,
  useTimelineContext,
} from "@twick/timeline";
import { AVAILABLE_TEXT_FONTS } from "@twick/video-editor";
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

type CaptionColorKey = keyof typeof CAPTION_COLOR;

type CaptionStyleColorMeta = {
  usedColors: CaptionColorKey[];
  labels: Partial<Record<CaptionColorKey, string>>;
};

const CAPTION_STYLE_COLOR_META: Record<string, CaptionStyleColorMeta> = {
  // Word background highlight - white text on colored pill
  highlight_bg: {
    usedColors: ["text", "bgColor"],
    labels: {
      text: "Text Color",
      bgColor: "Highlight Background",
    },
  },
  // Simple word-by-word – text only
  word_by_word: {
    usedColors: ["text", "outlineColor"],
    labels: {
      text: "Text Color",
      outlineColor: "Outline Color",
    },
  },
  // Word-by-word with a phrase bar background
  word_by_word_with_bg: {
    usedColors: ["text", "bgColor", "outlineColor"],
    labels: {
      text: "Text Color",
      bgColor: "Bar Background",
      outlineColor: "Outline Color",
    },
  },
  // Classic outlined text
  outline_only: {
    usedColors: ["text", "outlineColor"],
    labels: {
      text: "Fill Color",
      outlineColor: "Outline Color",
    },
  },
  // Soft rounded box behind text
  soft_box: {
    usedColors: ["text", "bgColor", "outlineColor"],
    labels: {
      text: "Text Color",
      bgColor: "Box Background",
      outlineColor: "Outline Color",
    },
  },
  // Broadcast style lower-third bar
  lower_third: {
    usedColors: ["text", "bgColor", "outlineColor"],
    labels: {
      text: "Title Text Color",
      bgColor: "Bar Background",
      outlineColor: "Outline Color",
    },
  },
  // Typewriter – text only
  typewriter: {
    usedColors: ["text", "outlineColor"],
    labels: {
      text: "Text Color",
      outlineColor: "Outline Color",
    },
  },
  // Karaoke – base text plus active word highlight
  karaoke: {
    usedColors: ["text", "outlineColor"],
    labels: {
      text: "Text Color",
      outlineColor: "Outline Color",
    },
  },
  // Karaoke-word – single active word, previous words dimmed
  "karaoke-word": {
    usedColors: ["text", "outlineColor"],
    labels: {
      text: "Text Color",
      outlineColor: "Outline Color",
    },
  },
  // Pop / scale – text only
  pop_scale: {
    usedColors: ["text", "outlineColor"],
    labels: {
      text: "Text Color",
      outlineColor: "Outline Color",
    },
  },
};

const DEFAULT_COLOR_META: CaptionStyleColorMeta = {
  usedColors: ["text", "bgColor", "outlineColor"],
  labels: {
    text: "Text Color",
    bgColor: "Background Color",
    outlineColor: "Outline Color",
  },
};

const CAPTION_FONTS = Object.values(AVAILABLE_TEXT_FONTS);

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

    const nextFontSize = updates.fontSize ?? fontSize;
    const geometry = computeCaptionGeometry(nextFontSize, updates.style ?? capStyle?.value ?? "");

    if (applyToAll && track) {
      const nextFont = {
        size: nextFontSize,
        family: updates.fontFamily ?? fontFamily,
      };
      const nextColors = updates.colors ?? colors;
      const nextCapStyle = updates.style ?? capStyle?.value;

      track.setProps({
        ...trackProps,
        capStyle: nextCapStyle,
        font: { ...(trackProps?.font ?? {}), ...nextFont },
        colors: nextColors,
        lineWidth: geometry.lineWidth,
        rectProps: geometry.rectProps,
      });
      editor.refresh();
    } else {
      const elementProps = captionElement.getProps() ?? {};
      captionElement.setProps({
        ...elementProps,
        capStyle: updates.style ?? capStyle?.value,
        font: {
          size: nextFontSize,
          family: updates.fontFamily ?? fontFamily,
        },
        colors: updates.colors ?? colors,
        lineWidth: geometry.lineWidth,
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

  const currentStyleKey = capStyle?.value as string | undefined;
  const currentColorMeta =
    (currentStyleKey && CAPTION_STYLE_COLOR_META[currentStyleKey]) ||
    DEFAULT_COLOR_META;

  const defaultColorLabels: Record<CaptionColorKey, string> = {
    text: "Text Color",
    bgColor: "Background Color",
    highlight: "Highlight Color",
    outlineColor: "Outline Color",
  };

  const renderColorControl = (key: CaptionColorKey) => {
    const label = currentColorMeta.labels[key] ?? defaultColorLabels[key];
    const value = colors[key];

    const handleChange = (next: string) => {
      const nextColors = { ...colors, [key]: next };
      setColors(nextColors);
      handleUpdateCaption({ colors: nextColors });
    };

    if (value == null) {
      return null;
    }

    return (
      <div className="color-control" key={key}>
        <label className="label-small">{label}</label>
        <div className="color-inputs">
          <input
            type="color"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className="color-picker"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className="color-text"
          />
        </div>
      </div>
    );
  };

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
          {CAPTION_FONTS.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Colors */}
      <div className="panel-section">
        <label className="label-dark">Colors</label>
        <div className="color-section">
          {currentColorMeta.usedColors.map((key) => renderColorControl(key))}
        </div>
      </div>
    </div>
  );
}

export default CaptionPropPanel;
