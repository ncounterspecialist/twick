import { RectElement, CircleElement, TrackElement } from "@twick/timeline";
// Dimensions in inspector: Rect and Circle only. Image/Video resize via canvas (dimensions deferred).
import type { PropertiesPanelProps } from "../../types";
import { PropertyRow } from "./property-row";
import { Ruler } from "lucide-react";
import { AccordionItem } from "../shared/accordion-item";
import { useState } from "react";

export function ElementProps({ selectedElement, updateElement }: PropertiesPanelProps) {
  const opacity = selectedElement?.getOpacity() || 1;
  const rotation = selectedElement?.getRotation() || 0;
  const position = selectedElement?.getPosition() || { x: 0, y: 0 };

  const handleRotationChange = (rotation: number) => {
    if (selectedElement) {
      selectedElement.setRotation(rotation);
      updateElement?.(selectedElement as TrackElement);
    }
  }

  const handleOpacityChange = (opacity: number) => {
    if (selectedElement) {
      selectedElement.setOpacity(opacity);
      updateElement?.(selectedElement as TrackElement);
    }
  }
  const handlePositionChange = (props: Record<string, any>) => {
    if (selectedElement) {
      selectedElement.setPosition({ x: props.x ?? 0, y: props.y ?? 0 });
      updateElement?.(selectedElement as TrackElement);
    }
  }

  const handleDimensionsChange = (width?: number, height?: number) => {
    if (!selectedElement) return;
    if (selectedElement instanceof RectElement) {
      const size = selectedElement.getSize();
      selectedElement.setSize({ width: width ?? size.width, height: height ?? size.height });
      updateElement?.(selectedElement as TrackElement);
    } else if (selectedElement instanceof CircleElement) {
      const dims = {
        width: selectedElement.getRadius() * 2,
        height: selectedElement.getRadius() * 2,
      };
      const newDiameter =
        width !== undefined && width !== dims.width ? width : (height ?? dims.height);
      selectedElement.setRadius(newDiameter / 2);
      updateElement?.(selectedElement as TrackElement);
    }
  }

  const hasShapeDimensions =
    selectedElement instanceof RectElement || selectedElement instanceof CircleElement;

  let dimensions: { width: number; height: number } | null = null;
  if (selectedElement instanceof RectElement) {
    dimensions = selectedElement.getSize();
  } else if (selectedElement instanceof CircleElement) {
    const r = selectedElement.getRadius();
    dimensions = { width: r * 2, height: r * 2 };
  }

  const [isTransformOpen, setIsTransformOpen] = useState(false);

  return (
    <div className="panel-container">
      <div className="panel-title">Properties</div>

      <AccordionItem
        title="Transform"
        icon={<Ruler className="icon-sm" />}
        isOpen={isTransformOpen}
        onToggle={() => setIsTransformOpen((open) => !open)}
      >
        <div className="properties-group">
          <div className="property-section">
            <PropertyRow label="Position X">
              <input
                type="number"
                value={position.x ?? 0}
                onChange={(e) =>
                  handlePositionChange({ x: Number(e.target.value) })
                }
                className="input-dark"
              />
            </PropertyRow>
            <PropertyRow label="Position Y">
              <input
                type="number"
                value={position.y ?? 0}
                onChange={(e) =>
                  handlePositionChange({ y: Number(e.target.value) })
                }
                className="input-dark"
              />
            </PropertyRow>
          </div>

          {/* Dimensions - for rect, circle only; image/video resize via canvas */}
          {hasShapeDimensions && dimensions && (
            <div className="property-section">
              <PropertyRow label="Width">
                <input
                  type="number"
                  min={1}
                  value={Math.round(dimensions.width)}
                  onChange={(e) =>
                    handleDimensionsChange(
                      Number(e.target.value),
                      dimensions!.height
                    )
                  }
                  className="input-dark"
                />
              </PropertyRow>
              <PropertyRow label="Height">
                <input
                  type="number"
                  min={1}
                  value={Math.round(dimensions.height)}
                  onChange={(e) =>
                    handleDimensionsChange(
                      dimensions!.width,
                      Number(e.target.value)
                    )
                  }
                  className="input-dark"
                />
              </PropertyRow>
            </div>
          )}

          {/* Opacity */}
          <div className="property-section">
            <PropertyRow
              label="Opacity"
              secondary={
                <span>
                  {Math.round((opacity ?? 1) * 100)}
                  %
                </span>
              }
            >
              <input
                type="range"
                min="0"
                max="100"
                value={(opacity ?? 1) * 100}
                onChange={(e) =>
                  handleOpacityChange(Number(e.target.value) / 100)
                }
                className="slider-purple"
              />
            </PropertyRow>
          </div>

          {/* Rotation */}
          <div className="property-section">
            <PropertyRow
              label="Rotation"
              secondary={
                <span>
                  {Math.round(rotation ?? 0)}
                  °
                </span>
              }
            >
              <input
                type="range"
                min="0"
                max="360"
                value={rotation ?? 0}
                onChange={(e) => handleRotationChange(Number(e.target.value))}
                className="slider-purple"
              />
            </PropertyRow>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
}
