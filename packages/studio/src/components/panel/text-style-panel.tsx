import { TextElement } from "@twick/timeline";
import { AVAILABLE_TEXT_FONTS } from "@twick/video-editor";

interface TextStylePanelProps {
  addElement: (element: TextElement) => void;
}

interface TextStylePreset {
  id: string;
  label: string;
  description: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textColor: string;
  strokeColor: string;
  strokeWidth: number;
  applyShadow: boolean;
  shadowColor?: string;
  applyBackground: boolean;
  backgroundColor?: string;
  backgroundOpacity?: number;
}

const TEXT_STYLE_PRESETS: TextStylePreset[] = [
  // Utility / captions
  {
    id: "classic-subtitle",
    label: "Classic Subtitle",
    description: "White text with subtle outline",
    fontFamily: AVAILABLE_TEXT_FONTS.ROBOTO,
    fontSize: 32,
    fontWeight: 500,
    textColor: "#FFFFFF",
    strokeColor: "#000000",
    strokeWidth: 0.5,
    applyShadow: false,
    applyBackground: false,
  },
  {
    id: "minimal-subtitle",
    label: "Minimal Subtitle",
    description: "Clean white text, no effects",
    fontFamily: AVAILABLE_TEXT_FONTS.MULISH,
    fontSize: 30,
    fontWeight: 500,
    textColor: "#FFFFFF",
    strokeColor: "#000000",
    strokeWidth: 0,
    applyShadow: false,
    applyBackground: false,
  },
  {
    id: "impact-caption",
    label: "Impact Caption",
    description: "Bold white with strong outline",
    fontFamily: AVAILABLE_TEXT_FONTS.IMPACT,
    fontSize: 34,
    fontWeight: 700,
    textColor: "#FFFFFF",
    strokeColor: "#000000",
    strokeWidth: 1,
    applyShadow: false,
    applyBackground: false,
  },
  {
    id: "bar-caption",
    label: "Bar Caption",
    description: "White text on dark bar",
    fontFamily: AVAILABLE_TEXT_FONTS.RUBIK,
    fontSize: 30,
    fontWeight: 600,
    textColor: "#FFFFFF",
    strokeColor: "#000000",
    strokeWidth: 0,
    applyShadow: false,
    applyBackground: true,
    backgroundColor: "#020617",
    backgroundOpacity: 0.85,
  },
  // Titles
  {
    id: "big-title",
    label: "Big Title",
    description: "Large bold center title",
    fontFamily: AVAILABLE_TEXT_FONTS.LUCKIEST_GUY,
    fontSize: 56,
    fontWeight: 700,
    textColor: "#FFFFFF",
    strokeColor: "#000000",
    strokeWidth: 0.5,
    applyShadow: true,
    shadowColor: "#000000",
    applyBackground: false,
  },
  {
    id: "minimal-title",
    label: "Minimal Title",
    description: "Lightweight clean heading",
    fontFamily: AVAILABLE_TEXT_FONTS.PLAYFAIR_DISPLAY,
    fontSize: 42,
    fontWeight: 400,
    textColor: "#E5E7EB",
    strokeColor: "#000000",
    strokeWidth: 0,
    applyShadow: false,
    applyBackground: false,
  },
  {
    id: "highlight-title",
    label: "Highlight Title",
    description: "Bold on yellow highlight",
    fontFamily: AVAILABLE_TEXT_FONTS.POPPINS,
    fontSize: 40,
    fontWeight: 700,
    textColor: "#111827",
    strokeColor: "#000000",
    strokeWidth: 0,
    applyShadow: false,
    applyBackground: true,
    backgroundColor: "#FACC15",
    backgroundOpacity: 0.9,
  },
  {
    id: "outline-title",
    label: "Outline Title",
    description: "Bold outlined title",
    fontFamily: AVAILABLE_TEXT_FONTS.KUMAR_ONE_OUTLINE,
    fontSize: 48,
    fontWeight: 700,
    textColor: "#000000",
    strokeColor: "#FFFFFF",
    strokeWidth: 1.2,
    applyShadow: false,
    applyBackground: false,
  },
  // Social / handle
  {
    id: "handle-chip",
    label: "Handle Chip",
    description: "@handle chip style",
    fontFamily: AVAILABLE_TEXT_FONTS.RUBIK,
    fontSize: 26,
    fontWeight: 600,
    textColor: "#0F172A",
    strokeColor: "#000000",
    strokeWidth: 0,
    applyShadow: false,
    applyBackground: true,
    backgroundColor: "#E5E7EB",
    backgroundOpacity: 1,
  },
  {
    id: "cta-pill",
    label: "CTA Pill",
    description: "Call-to-action pill",
    fontFamily: AVAILABLE_TEXT_FONTS.IMPACT,
    fontSize: 28,
    fontWeight: 700,
    textColor: "#FFFFFF",
    strokeColor: "#000000",
    strokeWidth: 0,
    applyShadow: false,
    applyBackground: true,
    backgroundColor: "#22C55E",
    backgroundOpacity: 1,
  },
];

export function TextStylePanel({ addElement }: TextStylePanelProps) {
  const createTextFromPreset = async (preset: TextStylePreset) => {
    const textElement = new TextElement("Sample")
      .setFontSize(preset.fontSize)
      .setFontFamily(preset.fontFamily)
      .setFontWeight(preset.fontWeight)
      .setFontStyle("normal")
      .setFill(preset.textColor)
      .setStrokeColor(preset.strokeColor)
      .setLineWidth(preset.strokeWidth)
      .setTextAlign("center");

    const nextProps = { ...textElement.getProps() };

    if (preset.applyShadow && preset.shadowColor) {
      nextProps.shadowColor = preset.shadowColor;
      nextProps.shadowOffset = [0, 0];
      nextProps.shadowBlur = 2;
      nextProps.shadowOpacity = 1;
    }

    if (preset.applyBackground && preset.backgroundColor) {
      nextProps.backgroundColor = preset.backgroundColor;
      nextProps.backgroundOpacity = preset.backgroundOpacity ?? 1;
    }

    textElement.setProps(nextProps);

    await addElement(textElement);
  };

  const handlePresetClick = (preset: TextStylePreset) => {
    void createTextFromPreset(preset);
  };

  return (
    <div className="panel-container">
      <div className="panel-title">Text Style</div>
      <div className="panel-section">
        <div className="text-style-grid">
          {TEXT_STYLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="text-style-card"
              onClick={() => handlePresetClick(preset)}
            >
              <div className="text-style-preview">
                <div
                  style={{
                    padding: preset.applyBackground ? "0.35rem 0.9rem" : 0,
                    borderRadius: preset.applyBackground ? "999px" : 0,
                    backgroundColor: preset.applyBackground
                      ? preset.backgroundColor
                      : "transparent",
                    boxShadow:
                      preset.applyBackground && preset.backgroundOpacity && preset.backgroundOpacity > 0.8
                        ? "0 0 20px rgba(0, 0, 0, 0.55)"
                        : undefined,
                  }}
                >
                  <span
                    style={{
                      fontFamily: preset.fontFamily,
                      fontWeight: preset.fontWeight,
                      // Scale preview size relative to configured size but clamp for tiles
                      fontSize: Math.max(10, Math.min(18, preset.fontSize * 0.35)),
                      color: preset.textColor,
                      WebkitTextStroke:
                        preset.strokeWidth > 0
                          ? `${preset.strokeWidth}px ${preset.strokeColor}`
                          : undefined,
                      textShadow:
                        preset.applyShadow && preset.shadowColor
                          ? `0 0 16px ${preset.shadowColor}`
                          : undefined,
                    }}
                  >
                    {preset.label}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

