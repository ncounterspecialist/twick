import { useEffect, useState } from "react";
import { RectElement, TrackElement } from "@twick/timeline";

export const DEFAULT_RECT_PROPS = {
  cornerRadius: 0,
  fillColor: "#3b82f6",
  // UI uses 0–100%; element opacity is 0–1
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
  // Stored as percentage 0–100 for the UI slider
  const [opacity, setOpacity] = useState(DEFAULT_RECT_PROPS.opacity);
  const [strokeColor, setStrokeColor] = useState(DEFAULT_RECT_PROPS.strokeColor);
  const [lineWidth, setLineWidth] = useState(DEFAULT_RECT_PROPS.lineWidth);

  const applyLiveChangesToExistingRect = (overrides: Partial<RectPanelState> = {}) => {
    if (!(selectedElement instanceof RectElement)) {
      return;
    }

    const rectElement = selectedElement;
    const nextCornerRadius = overrides.cornerRadius ?? cornerRadius;
    const nextFillColor = overrides.fillColor ?? fillColor;
    const nextOpacityPercent = overrides.opacity ?? opacity;
    const nextStrokeColor = overrides.strokeColor ?? strokeColor;
    const nextLineWidth = overrides.lineWidth ?? lineWidth;

    rectElement.setCornerRadius(nextCornerRadius);
    rectElement.setFill(nextFillColor);
    // Element expects 0–1 opacity
    rectElement.setOpacity(nextOpacityPercent / 100);
    rectElement.setStrokeColor(nextStrokeColor);
    rectElement.setLineWidth(nextLineWidth);

    updateElement?.(rectElement);
  };

  const handleCornerRadiusChange = (radius: number) => {
    setCornerRadius(radius);
    applyLiveChangesToExistingRect({ cornerRadius: radius });
  };

  const handleFillColorChange = (color: string) => {
    setFillColor(color);
    applyLiveChangesToExistingRect({ fillColor: color });
  };

  const handleOpacityChange = (nextOpacity: number) => {
    setOpacity(nextOpacity);
    applyLiveChangesToExistingRect({ opacity: nextOpacity });
  };

  const handleStrokeColorChange = (color: string) => {
    setStrokeColor(color);
    applyLiveChangesToExistingRect({ strokeColor: color });
  };

  const handleLineWidthChange = (width: number) => {
    setLineWidth(width);
    applyLiveChangesToExistingRect({ lineWidth: width });
  };

  const handleApplyChanges = () => {
    // For existing rectangles, changes are already applied live via the handlers above.
    // The apply button is only meaningful when creating a new rectangle.
    if (selectedElement instanceof RectElement) {
      return;
    }

    const rectElement = new RectElement(fillColor, { width: 200, height: 200 })
      .setCornerRadius(cornerRadius)
      // Element expects 0–1 opacity; UI stores 0–100
      .setOpacity(opacity / 100)
      .setStrokeColor(strokeColor)
      .setLineWidth(lineWidth);

    addElement?.(rectElement);
  };

  useEffect(() => {
    if (selectedElement instanceof RectElement) {
      setCornerRadius(selectedElement.getCornerRadius() ?? DEFAULT_RECT_PROPS.cornerRadius);
      setFillColor(selectedElement.getFill() ?? DEFAULT_RECT_PROPS.fillColor);
      const elementOpacity = selectedElement.getOpacity();
      // Convert 0–1 element opacity into 0–100 UI percentage
      setOpacity(elementOpacity != null ? elementOpacity * 100 : DEFAULT_RECT_PROPS.opacity);
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
    setCornerRadius: handleCornerRadiusChange,
    setFillColor: handleFillColorChange,
    setOpacity: handleOpacityChange,
    setStrokeColor: handleStrokeColorChange,
    setLineWidth: handleLineWidthChange,
    handleApplyChanges,
  };
};
