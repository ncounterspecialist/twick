import { useEffect, useState } from "react";
import { CircleElement, TrackElement } from "@twick/timeline";

export const DEFAULT_CIRCLE_PROPS = {
  radius: 50,
  fillColor: "#3b82f6",
  // UI uses 0–100%; element opacity is 0–1
  opacity: 100,
  strokeColor: "#000000",
  lineWidth: 0,
};

export interface CirclePanelState {
  radius: number;
  fillColor: string;
  opacity: number;
  strokeColor: string;
  lineWidth: number;
  operation: string;
}

export interface CirclePanelActions {
  setRadius: (radius: number) => void;
  setFillColor: (color: string) => void;
  setOpacity: (opacity: number) => void;
  setStrokeColor: (color: string) => void;
  setLineWidth: (width: number) => void;
  handleApplyChanges: () => void;
}

export const useCirclePanel = ({
  selectedElement,
  addElement,
  updateElement,
}: {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}): CirclePanelState & CirclePanelActions => {
  const [radius, setRadius] = useState(DEFAULT_CIRCLE_PROPS.radius);
  const [fillColor, setFillColor] = useState(DEFAULT_CIRCLE_PROPS.fillColor);
  // Stored as percentage 0–100 for the UI slider
  const [opacity, setOpacity] = useState(DEFAULT_CIRCLE_PROPS.opacity);
  const [strokeColor, setStrokeColor] = useState(DEFAULT_CIRCLE_PROPS.strokeColor);
  const [lineWidth, setLineWidth] = useState(DEFAULT_CIRCLE_PROPS.lineWidth);

  const applyLiveChangesToExistingCircle = (overrides: Partial<CirclePanelState> = {}) => {
    if (!(selectedElement instanceof CircleElement)) {
      return;
    }

    const circleElement = selectedElement;
    const nextRadius = overrides.radius ?? radius;
    const nextFillColor = overrides.fillColor ?? fillColor;
    const nextOpacityPercent = overrides.opacity ?? opacity;
    const nextStrokeColor = overrides.strokeColor ?? strokeColor;
    const nextLineWidth = overrides.lineWidth ?? lineWidth;

    circleElement.setRadius(nextRadius);
    circleElement.setFill(nextFillColor);
    // Element expects 0–1 opacity
    circleElement.setOpacity(nextOpacityPercent / 100);
    circleElement.setStrokeColor(nextStrokeColor);
    circleElement.setLineWidth(nextLineWidth);

    updateElement?.(circleElement);
  };

  const handleRadiusChange = (nextRadius: number) => {
    setRadius(nextRadius);
    applyLiveChangesToExistingCircle({ radius: nextRadius });
  };

  const handleFillColorChange = (color: string) => {
    setFillColor(color);
    applyLiveChangesToExistingCircle({ fillColor: color });
  };

  const handleOpacityChange = (nextOpacity: number) => {
    setOpacity(nextOpacity);
    applyLiveChangesToExistingCircle({ opacity: nextOpacity });
  };

  const handleStrokeColorChange = (color: string) => {
    setStrokeColor(color);
    applyLiveChangesToExistingCircle({ strokeColor: color });
  };

  const handleLineWidthChange = (width: number) => {
    setLineWidth(width);
    applyLiveChangesToExistingCircle({ lineWidth: width });
  };

  const handleApplyChanges = () => {
    // For existing circles, changes are already applied live via the handlers above.
    // The apply button is only meaningful when creating a new circle.
    if (selectedElement instanceof CircleElement) {
      return;
    }

    const circleElement = new CircleElement(fillColor, radius)
      // Element expects 0–1 opacity; UI stores 0–100
      .setOpacity(opacity / 100)
      .setStrokeColor(strokeColor)
      .setLineWidth(lineWidth);

    addElement?.(circleElement);
  };

  useEffect(() => {
    if (selectedElement instanceof CircleElement) {
      setRadius(selectedElement.getRadius() ?? DEFAULT_CIRCLE_PROPS.radius);
      setFillColor(selectedElement.getFill() ?? DEFAULT_CIRCLE_PROPS.fillColor);
      const elementOpacity = selectedElement.getOpacity();
      // Convert 0–1 element opacity into 0–100 UI percentage
      setOpacity(elementOpacity != null ? elementOpacity * 100 : DEFAULT_CIRCLE_PROPS.opacity);
      setStrokeColor(selectedElement.getStrokeColor() ?? DEFAULT_CIRCLE_PROPS.strokeColor);
      setLineWidth(selectedElement.getLineWidth() ?? DEFAULT_CIRCLE_PROPS.lineWidth);
    }
  }, [selectedElement]);

  return {
    radius,
    fillColor,
    opacity,
    strokeColor,
    lineWidth,
    operation: selectedElement instanceof CircleElement ? "Apply Changes": "Add Circle",
    setRadius: handleRadiusChange,
    setFillColor: handleFillColorChange,
    setOpacity: handleOpacityChange,
    setStrokeColor: handleStrokeColorChange,
    setLineWidth: handleLineWidthChange,
    handleApplyChanges,
  };
};
