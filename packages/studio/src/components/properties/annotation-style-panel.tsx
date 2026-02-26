import { useEffect, useState } from "react";
import {
  ArrowElement,
  LineElement,
  RectElement,
  CircleElement,
  type TrackElement,
} from "@twick/timeline";
import { Palette } from "lucide-react";
import { AccordionItem } from "../shared/accordion-item";
import type { PropertiesPanelProps } from "../../types";

/** Parse fill to hex for color input; supports #hex and rgba(). */
function fillToHex(fill: string | undefined): string {
  if (!fill) return "#f59e0b";
  if (fill.startsWith("#")) return fill.slice(0, 7);
  const rgba = fill.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgba) {
    const r = Number(rgba[1]).toString(16).padStart(2, "0");
    const g = Number(rgba[2]).toString(16).padStart(2, "0");
    const b = Number(rgba[3]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
  return "#f59e0b";
}

type ShapeElement = ArrowElement | LineElement | RectElement | CircleElement;

function isShapeElement(
  el: TrackElement | null | undefined
): el is ShapeElement {
  return (
    el != null &&
    (el instanceof ArrowElement ||
      el instanceof LineElement ||
      el instanceof RectElement ||
      el instanceof CircleElement)
  );
}

export function AnnotationStylePanel({
  selectedElement,
  updateElement,
}: PropertiesPanelProps) {
  const [styleOpen, setStyleOpen] = useState(true);
  const [fill, setFill] = useState("#f59e0b");
  const [opacity, setOpacity] = useState(1);
  const [radius, setRadius] = useState<number | null>(null);
  const [thickness, setThickness] = useState<number | null>(null);

  const shape = isShapeElement(selectedElement) ? selectedElement : null;

  useEffect(() => {
    if (!shape) return;

    const props = shape.getProps();
    // Resolve fill
    const currentFill =
      props?.fill ??
      (shape instanceof RectElement || shape instanceof CircleElement
        ? shape.getFill()
        : undefined);
    setFill(fillToHex(currentFill));

    // Opacity
    setOpacity(shape.getOpacity() ?? 1);

    // Radius / thickness defaults by type
    if (shape instanceof RectElement) {
      setRadius(shape.getCornerRadius());
      setThickness(null);
    } else if (shape instanceof CircleElement) {
      setRadius(shape.getRadius());
      setThickness(null);
    } else if (shape instanceof LineElement) {
      setThickness(props?.height ?? 4);
      setRadius(props?.radius ?? 4);
    } else if (shape instanceof ArrowElement) {
      setRadius(props?.radius ?? 4);
      setThickness(null);
    }
  }, [shape, selectedElement?.getId()]);

  const handleFillChange = (value: string) => {
    if (!shape) return;
    setFill(value);
    const props = shape.getProps();

    if (shape instanceof RectElement || shape instanceof CircleElement) {
      shape.setFill(value);
    } else {
      shape.setProps({ ...props, fill: value });
    }

    updateElement?.(shape);
  };

  const handleOpacityChange = (value: number) => {
    if (!shape) return;
    setOpacity(value);
    shape.setOpacity(value);
    updateElement?.(shape);
  };

  const handleRadiusChange = (value: number) => {
    if (!shape) return;
    setRadius(value);
    if (shape instanceof RectElement) {
      shape.setCornerRadius(value);
    } else if (shape instanceof CircleElement) {
      shape.setRadius(value);
    } else {
      const props = shape.getProps();
      shape.setProps({ ...props, radius: value });
    }
    updateElement?.(shape);
  };

  const handleThicknessChange = (value: number) => {
    if (!shape || !(shape instanceof LineElement)) return;
    setThickness(value);
    const props = shape.getProps();
    shape.setProps({ ...props, height: value, lineWidth: value });
    updateElement?.(shape);
  };

  if (!shape) return null;

  return (
    <div className="panel-container">
      <AccordionItem
        title="Shape style"
        icon={<Palette className="icon-sm" />}
        isOpen={styleOpen}
        onToggle={() => setStyleOpen((open) => !open)}
      >
        <div className="properties-group">
          <div className="panel-section">
            <label className="label-dark">Color</label>
            <div className="color-control">
              <label className="label-small">Fill</label>
              <div className="color-inputs">
                <input
                  type="color"
                  value={fill}
                  onChange={(e) => handleFillChange(e.target.value)}
                  className="color-picker"
                />
                <input
                  type="text"
                  value={fill}
                  onChange={(e) => handleFillChange(e.target.value)}
                  className="color-text"
                />
              </div>
            </div>
          </div>
          <div className="panel-section">
            <label className="label-dark">Opacity</label>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={Math.round(opacity * 100)}
                onChange={(e) =>
                  handleOpacityChange(Number(e.target.value) / 100)
                }
                className="slider-purple"
              />
              <span className="slider-value">{Math.round(opacity * 100)}%</span>
            </div>
          </div>

          {/* Radius for box/circle/arrow/line (where applicable) */}
          {radius !== null && (
            <div className="panel-section">
              <label className="label-dark">
                {shape instanceof CircleElement ? "Radius (size)" : "Corner radius"}
              </label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="1"
                  value={radius}
                  onChange={(e) => handleRadiusChange(Number(e.target.value))}
                  className="slider-purple"
                />
                <span className="slider-value">{Math.round(radius)}</span>
              </div>
            </div>
          )}

          {/* Thickness for line */}
          {thickness !== null && shape instanceof LineElement && (
            <div className="panel-section">
              <label className="label-dark">Thickness</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={thickness}
                  onChange={(e) =>
                    handleThicknessChange(Number(e.target.value))
                  }
                  className="slider-purple"
                />
                <span className="slider-value">
                  {Math.round(thickness)} px
                </span>
              </div>
            </div>
          )}
        </div>
      </AccordionItem>
    </div>
  );
}
