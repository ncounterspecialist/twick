import { useEffect, useState } from "react";
import { TextElement, TrackElement, type TextAlign } from "@twick/timeline";
import { AVAILABLE_TEXT_FONTS } from "@twick/video-editor";

export const DEFAULT_TEXT_PROPS = {
  text: "Sample",
  fontSize: 48,
  fontFamily: "Poppins",
  fontWeight: 400,
  fontStyle: "normal",
  textColor: "#ffffff",
  strokeColor: "#4d4d4d",
  strokeWidth: 0,
  applyShadow: false,
  shadowColor: "#000000",
  textAlign: "center" as TextAlign,
  shadowOffset: [0, 0],
  shadowBlur: 2,
  shadowOpacity: 1.0,
};

export interface TextPanelState {
  textContent: string;
  fontSize: number;
  selectedFont: string;
  isBold: boolean;
  isItalic: boolean;
  textColor: string;
  strokeColor: string;
  applyShadow: boolean;
  shadowColor: string;
  strokeWidth: number;
  applyBackground: boolean;
  backgroundColor: string;
  backgroundOpacity: number;
  fonts: string[];
  operation: string;
}

export interface TextPanelActions {
  setTextContent: (text: string) => void;
  setFontSize: (size: number) => void;
  setSelectedFont: (font: string) => void;
  setIsBold: (bold: boolean) => void;
  setIsItalic: (italic: boolean) => void;
  setTextColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setApplyShadow: (shadow: boolean) => void;
  setShadowColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setApplyBackground: (apply: boolean) => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundOpacity: (opacity: number) => void;
  handleApplyChanges: () => void;
}

export const useTextPanel = ({
  selectedElement,
  addElement,
  updateElement,
}: {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}): TextPanelState & TextPanelActions => {
  const [textContent, setTextContent] = useState(DEFAULT_TEXT_PROPS.text);
  const [fontSize, setFontSize] = useState(DEFAULT_TEXT_PROPS.fontSize);
  const [selectedFont, setSelectedFont] = useState(DEFAULT_TEXT_PROPS.fontFamily);
  const [isBold, setIsBold] = useState(DEFAULT_TEXT_PROPS.fontWeight === 700);
  const [isItalic, setIsItalic] = useState(DEFAULT_TEXT_PROPS.fontStyle === "italic");
  const [textColor, setTextColor] = useState(DEFAULT_TEXT_PROPS.textColor);
  const [strokeColor, setStrokeColor] = useState(DEFAULT_TEXT_PROPS.strokeColor);
  const [applyShadow, setApplyShadow] = useState(DEFAULT_TEXT_PROPS.applyShadow);
  const [shadowColor, setShadowColor] = useState(DEFAULT_TEXT_PROPS.shadowColor);
  const [strokeWidth, setStrokeWidth] = useState(DEFAULT_TEXT_PROPS.strokeWidth);
  const [applyBackground, setApplyBackground] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#FACC15");
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  const fonts = Object.values(AVAILABLE_TEXT_FONTS);

  const applyLiveChangesToExistingText = (overrides: Partial<TextPanelState> = {}) => {
    if (!(selectedElement instanceof TextElement)) {
      return;
    }

    const textElement = selectedElement;

    const nextState: Pick<
      TextPanelState,
      | "textContent"
      | "fontSize"
      | "selectedFont"
      | "isBold"
      | "isItalic"
      | "textColor"
      | "strokeColor"
      | "strokeWidth"
      | "applyShadow"
      | "shadowColor"
      | "applyBackground"
      | "backgroundColor"
      | "backgroundOpacity"
    > = {
      textContent,
      fontSize,
      selectedFont,
      isBold,
      isItalic,
      textColor,
      strokeColor,
      strokeWidth,
      applyShadow,
      shadowColor,
      applyBackground,
      backgroundColor,
      backgroundOpacity,
      ...overrides,
    };

    textElement.setText(nextState.textContent);
    textElement.setFontSize(nextState.fontSize);
    textElement.setFontFamily(nextState.selectedFont);
    textElement.setFontWeight(nextState.isBold ? 700 : 400);
    textElement.setFontStyle(nextState.isItalic ? "italic" : "normal");
    textElement.setFill(nextState.textColor);
    textElement.setStrokeColor(nextState.strokeColor);
    textElement.setLineWidth(nextState.strokeWidth);
    textElement.setTextAlign(DEFAULT_TEXT_PROPS.textAlign);

    const nextProps = { ...textElement.getProps() };

    if (nextState.applyShadow) {
      nextProps.shadowColor = nextState.shadowColor;
      nextProps.shadowOffset = DEFAULT_TEXT_PROPS.shadowOffset;
      nextProps.shadowBlur = DEFAULT_TEXT_PROPS.shadowBlur;
      nextProps.shadowOpacity = DEFAULT_TEXT_PROPS.shadowOpacity;
    } else {
      nextProps.shadowColor = undefined;
      nextProps.shadowOffset = undefined;
      nextProps.shadowBlur = undefined;
      nextProps.shadowOpacity = undefined;
    }

    if (nextState.applyBackground) {
      nextProps.backgroundColor = nextState.backgroundColor;
      nextProps.backgroundOpacity = nextState.backgroundOpacity;
    } else {
      nextProps.backgroundColor = undefined;
      nextProps.backgroundOpacity = undefined;
    }

    textElement.setProps(nextProps);
    updateElement(textElement);
  };

  const handleTextContentChange = (text: string) => {
    setTextContent(text);
    applyLiveChangesToExistingText({ textContent: text });
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    applyLiveChangesToExistingText({ fontSize: size });
  };

  const handleSelectedFontChange = (font: string) => {
    setSelectedFont(font);
    applyLiveChangesToExistingText({ selectedFont: font });
  };

  const handleIsBoldChange = (bold: boolean) => {
    setIsBold(bold);
    applyLiveChangesToExistingText({ isBold: bold });
  };

  const handleIsItalicChange = (italic: boolean) => {
    setIsItalic(italic);
    applyLiveChangesToExistingText({ isItalic: italic });
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    applyLiveChangesToExistingText({ textColor: color });
  };

  const handleStrokeColorChange = (color: string) => {
    setStrokeColor(color);
    applyLiveChangesToExistingText({ strokeColor: color });
  };

  const handleStrokeWidthChange = (width: number) => {
    setStrokeWidth(width);
    applyLiveChangesToExistingText({ strokeWidth: width });
  };

  const handleApplyShadowChange = (shadow: boolean) => {
    setApplyShadow(shadow);
    applyLiveChangesToExistingText({ applyShadow: shadow });
  };

  const handleShadowColorChange = (color: string) => {
    setShadowColor(color);
    applyLiveChangesToExistingText({ shadowColor: color });
  };

  const handleApplyBackgroundChange = (apply: boolean) => {
    setApplyBackground(apply);
    applyLiveChangesToExistingText({ applyBackground: apply });
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    applyLiveChangesToExistingText({ backgroundColor: color });
  };

  const handleBackgroundOpacityChange = (opacity: number) => {
    setBackgroundOpacity(opacity);
    applyLiveChangesToExistingText({ backgroundOpacity: opacity });
  };

  const handleApplyChanges = async () => {
    // For existing text elements, changes are already applied live via the handlers above.
    // The apply button is only meaningful when creating a new text element.
    if (selectedElement instanceof TextElement) {
      return;
    }

    const textElement = new TextElement(textContent)
      .setFontSize(fontSize)
      .setFontFamily(selectedFont)
      .setFontWeight(isBold ? 700 : 400)
      .setFontStyle(isItalic ? "italic" : "normal")
      .setFill(textColor)
      .setStrokeColor(strokeColor)
      .setLineWidth(strokeWidth)
      .setTextAlign("center");

    const nextProps = { ...textElement.getProps() };
    if (applyShadow) {
      nextProps.shadowColor = shadowColor;
      nextProps.shadowOffset = DEFAULT_TEXT_PROPS.shadowOffset;
      nextProps.shadowBlur = DEFAULT_TEXT_PROPS.shadowBlur;
      nextProps.shadowOpacity = DEFAULT_TEXT_PROPS.shadowOpacity;
    }
    if (applyBackground) {
      nextProps.backgroundColor = backgroundColor;
      nextProps.backgroundOpacity = backgroundOpacity;
    }
    textElement.setProps(nextProps);
    await addElement(textElement);
  };

  useEffect(() => {
    if (selectedElement instanceof TextElement) {
      setTextContent(selectedElement.getText());
      const textProps = selectedElement.getProps();
      setSelectedFont(textProps.fontFamily ?? DEFAULT_TEXT_PROPS.fontFamily);
      setFontSize(textProps.fontSize ?? DEFAULT_TEXT_PROPS.fontSize);
      setIsBold(textProps.fontWeight === 700);
      setIsItalic(textProps.fontStyle === "italic");
      setTextColor(textProps.fill ?? DEFAULT_TEXT_PROPS.textColor);
      setStrokeColor(textProps.stroke ?? DEFAULT_TEXT_PROPS.strokeColor);
      setStrokeWidth(textProps.lineWidth ?? DEFAULT_TEXT_PROPS.strokeWidth);
      const hasShadow = textProps.shadowColor !== undefined;
      setApplyShadow(hasShadow);
      if (hasShadow) {
        setShadowColor(textProps.shadowColor ?? DEFAULT_TEXT_PROPS.shadowColor);
      }
      const hasBackground = textProps.backgroundColor != null && textProps.backgroundColor !== "";
      setApplyBackground(hasBackground);
      if (hasBackground) {
        setBackgroundColor(textProps.backgroundColor ?? "#FACC15");
        setBackgroundOpacity(textProps.backgroundOpacity ?? 1);
      }
    } else {
      setTextContent(DEFAULT_TEXT_PROPS.text);
      setFontSize(DEFAULT_TEXT_PROPS.fontSize);
      setSelectedFont(DEFAULT_TEXT_PROPS.fontFamily);
      setIsBold(DEFAULT_TEXT_PROPS.fontWeight === 700);
      setIsItalic(DEFAULT_TEXT_PROPS.fontStyle === "italic");
      setTextColor(DEFAULT_TEXT_PROPS.textColor);
      setStrokeColor(DEFAULT_TEXT_PROPS.strokeColor);
      setStrokeWidth(DEFAULT_TEXT_PROPS.strokeWidth);
      setApplyShadow(DEFAULT_TEXT_PROPS.applyShadow);
      setShadowColor(DEFAULT_TEXT_PROPS.shadowColor);
      setApplyBackground(false);
      setBackgroundColor("#FACC15");
      setBackgroundOpacity(1);
    }
  }, [selectedElement]);

  return {
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
    operation: selectedElement instanceof TextElement ? "Apply Changes": "Add Text",
    setTextContent: handleTextContentChange,
    setFontSize: handleFontSizeChange,
    setSelectedFont: handleSelectedFontChange,
    setIsBold: handleIsBoldChange,
    setIsItalic: handleIsItalicChange,
    setTextColor: handleTextColorChange,
    setStrokeColor: handleStrokeColorChange,
    setApplyShadow: handleApplyShadowChange,
    setShadowColor: handleShadowColorChange,
    setStrokeWidth: handleStrokeWidthChange,
    applyBackground,
    backgroundColor,
    backgroundOpacity,
    setApplyBackground: handleApplyBackgroundChange,
    setBackgroundColor: handleBackgroundColorChange,
    setBackgroundOpacity: handleBackgroundOpacityChange,
    handleApplyChanges,
  };
};
