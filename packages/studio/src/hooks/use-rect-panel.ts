import { useEffect, useState } from "react";
import { RectElement, TrackElement } from "@twick/timeline";

export const DEFAULT_RECT_PROPS = {
  cornerRadius: 0,
  fillColor: "#3b82f6",
  opacity: 100,
  strokeColor: "#000000",
  lineWidth: 0,
};

export interface RectPanelState {
  cornerRadius: number;
  fillColor: string;
  opacity: number;
  strokeColor: string;
  lineWidth: number;
  operation: string;
}

export interface RectPanelActions {
  setCornerRadius: (radius: number) => void;
  setFillColor: (color: string) => void;
  setOpacity: (opacity: number) => void;
  setStrokeColor: (color: string) => void;
  setLineWidth: (width: number) => void;
  handleApplyChanges: () => void;
}

export const useRectPanel = ({
  selectedElement,
  addElement,
  updateElement,
}: {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}): RectPanelState & RectPanelActions => {
  const [cornerRadius, setCornerRadius] = useState(DEFAULT_RECT_PROPS.cornerRadius);
  const [fillColor, setFillColor] = useState(DEFAULT_RECT_PROPS.fillColor);
  const [opacity, setOpacity] = useState(DEFAULT_RECT_PROPS.opacity);
  const [strokeColor, setStrokeColor] = useState(DEFAULT_RECT_PROPS.strokeColor);
  const [lineWidth, setLineWidth] = useState(DEFAULT_RECT_PROPS.lineWidth);

  const handleApplyChanges = () => {
    let rectElement;
    if (selectedElement instanceof RectElement) {
      rectElement = selectedElement;
      rectElement.setCornerRadius(cornerRadius);
      rectElement.setOpacity(opacity);
      rectElement.setStrokeColor(strokeColor);
      rectElement.setLineWidth(lineWidth);
      updateElement?.(rectElement);
    } else {
      rectElement = new RectElement(fillColor, { width: 200, height: 200 })
        .setCornerRadius(cornerRadius)
        .setOpacity(opacity)
        .setStrokeColor(strokeColor)
        .setLineWidth(lineWidth);
      addElement?.(rectElement);
    }
  };

  useEffect(() => {
    if (selectedElement instanceof RectElement) {
      setCornerRadius(selectedElement.getCornerRadius() ?? DEFAULT_RECT_PROPS.cornerRadius);
      setFillColor(selectedElement.getFill() ?? DEFAULT_RECT_PROPS.fillColor);
      setOpacity(selectedElement.getOpacity() ?? DEFAULT_RECT_PROPS.opacity);
      setStrokeColor(selectedElement.getStrokeColor() ?? DEFAULT_RECT_PROPS.strokeColor);
      setLineWidth(selectedElement.getLineWidth() ?? DEFAULT_RECT_PROPS.lineWidth);
    }
  }, [selectedElement]);

  return {
    cornerRadius,
    fillColor,
    opacity,
    strokeColor,
    lineWidth,
    operation: selectedElement instanceof RectElement ? "Apply Changes": "Add Rectangle",
    setCornerRadius,
    setFillColor,
    setOpacity,
    setStrokeColor,
    setLineWidth,
    handleApplyChanges,
  };
};
