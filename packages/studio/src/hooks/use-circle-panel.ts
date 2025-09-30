import { useEffect, useState } from "react";
import { CircleElement, TrackElement } from "@twick/timeline";

export const DEFAULT_CIRCLE_PROPS = {
  radius: 50,
  fillColor: "#3b82f6",
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
  const [opacity, setOpacity] = useState(DEFAULT_CIRCLE_PROPS.opacity);
  const [strokeColor, setStrokeColor] = useState(DEFAULT_CIRCLE_PROPS.strokeColor);
  const [lineWidth, setLineWidth] = useState(DEFAULT_CIRCLE_PROPS.lineWidth);

  const handleApplyChanges = () => {
    let circleElement;
    if (selectedElement instanceof CircleElement) {
      circleElement = selectedElement;
      circleElement.setRadius(radius);
      circleElement.setFill(fillColor);
      circleElement.setOpacity(opacity);
      circleElement.setStrokeColor(strokeColor);
      circleElement.setLineWidth(lineWidth);
      updateElement?.(circleElement);
    } else {
      circleElement = new CircleElement(fillColor, radius)
        .setOpacity(opacity)
        .setStrokeColor(strokeColor)
        .setLineWidth(lineWidth);
      addElement?.(circleElement);
    }
  };

  useEffect(() => {
    if (selectedElement instanceof CircleElement) {
      setRadius(selectedElement.getRadius() ?? DEFAULT_CIRCLE_PROPS.radius);
      setFillColor(selectedElement.getFill() ?? DEFAULT_CIRCLE_PROPS.fillColor);
      setOpacity(selectedElement.getOpacity() ?? DEFAULT_CIRCLE_PROPS.opacity);
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
    setRadius,
    setFillColor,
    setOpacity,
    setStrokeColor,
    setLineWidth,
    handleApplyChanges,
  };
};
