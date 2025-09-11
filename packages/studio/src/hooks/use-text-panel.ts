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

  const fonts = Object.values(AVAILABLE_TEXT_FONTS);

  const handleApplyChanges = async () => {
    let textElement;
    if (selectedElement instanceof TextElement) {
      textElement = selectedElement;
      textElement.setText(textContent);
      textElement.setFontSize(fontSize);
      textElement.setFontFamily(selectedFont);
      textElement.setFontWeight(isBold ? 700 : 400);
      textElement.setFontStyle(isItalic ? "italic" : "normal");
      textElement.setFill(textColor);
      textElement.setStrokeColor(strokeColor);
      textElement.setLineWidth(strokeWidth);
      textElement.setTextAlign(DEFAULT_TEXT_PROPS.textAlign);
      if (applyShadow) {
        textElement.setProps({
          ...textElement.getProps(),
          shadowColor,
          shadowOffset: DEFAULT_TEXT_PROPS.shadowOffset,
          shadowBlur: DEFAULT_TEXT_PROPS.shadowBlur,
          shadowOpacity: DEFAULT_TEXT_PROPS.shadowOpacity,
        });
      } else {
        textElement.setProps({
          ...textElement.getProps(),
          shadowColor: undefined,
          shadowOffset: undefined,
          shadowBlur: undefined,
          shadowOpacity: undefined,
        });
      }
      updateElement(textElement);
    } else {
      textElement = new TextElement(textContent)
        .setFontSize(fontSize)
        .setFontFamily(selectedFont)
        .setFontWeight(isBold ? 700 : 400)
        .setFontStyle(isItalic ? "italic" : "normal")
        .setFill(textColor)
        .setStrokeColor(strokeColor)
        .setLineWidth(strokeWidth)
        .setTextAlign("center");

      if (applyShadow) {
        textElement.setProps({
          ...textElement.getProps(),
          shadowColor,
          shadowOffset: DEFAULT_TEXT_PROPS.shadowOffset,
          shadowBlur: DEFAULT_TEXT_PROPS.shadowBlur,
          shadowOpacity: DEFAULT_TEXT_PROPS.shadowOpacity,
        });
      }
      await addElement(textElement);
    }
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
  };
};
