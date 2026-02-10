import { RectElement, CircleElement, TrackElement } from "@twick/timeline";

// Dimensions in inspector: Rect and Circle only. Image/Video resize via canvas (dimensions deferred).
import type { PropertiesPanelProps } from "../../types";

/** Normalize rotation to 0-360 range */
function normalizeRotation(deg: number): number {
  const n = ((deg % 360) + 360) % 360;
  return n === 360 ? 0 : n;
}

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

  return (
    <div className="panel-container">
      <div className="panel-title">All Properties</div>
      <div className="panel-section">
        <label className="label-dark">Position</label>
        <div className="flex-container">
          <div>
            <label className="label-small">X</label>
            <input
              type="number"
              value={position.x ?? 0}
              onChange={(e) => handlePositionChange({ x: Number(e.target.value) })}
              className="input-dark"
            />
          </div>
          <div>
            <label className="label-small">Y</label>
            <input
              type="number"
              value={position.y ?? 0}
              onChange={(e) => handlePositionChange({ y: Number(e.target.value) })}
              className="input-dark"
            />
          </div>
        </div>
      </div>

      {/* Dimensions - for rect, circle only; image/video resize via canvas */}
      {hasShapeDimensions && dimensions && (
        <div className="panel-section">
          <label className="label-dark">Dimensions</label>
            <div className="flex-container">
              <div>
                <label className="label-small">W</label>
                <input
                  type="number"
                  min="1"
                  value={Math.round(dimensions.width)}
                  onChange={(e) =>
                    handleDimensionsChange(Number(e.target.value), dimensions!.height)
                  }
                  className="input-dark"
                />
              </div>
              <div>
                <label className="label-small">H</label>
                <input
                  type="number"
                  min="1"
                  value={Math.round(dimensions.height)}
                  onChange={(e) =>
                    handleDimensionsChange(dimensions!.width, Number(e.target.value))
                  }
                  className="input-dark"
                />
              </div>
            </div>
          </div>
      )}

      {/* Opacity */}
      <div className="panel-section">
        <label className="label-dark">Opacity</label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={(opacity ?? 1) * 100}
            onChange={(e) => handleOpacityChange(Number(e.target.value) / 100)}
            className="slider-purple"
          />
          <span className="slider-value">{Math.round((opacity ?? 1) * 100)}%</span>
        </div>
      </div>

      {/* Rotation */}
      <div className="panel-section">
        <div className="flex-container justify-between" style={{ marginBottom: "0.5rem" }}>
          <label className="label-dark" style={{ marginBottom: 0 }}>Rotation</label>
          <div className="flex-container" style={{ gap: "0.25rem" }}>
            <button
              type="button"
              className="btn-icon"
              onClick={() => handleRotationChange(normalizeRotation((rotation ?? 0) - 90))}
              title="Rotate -90°"
            >
              -90°
            </button>
            <button
              type="button"
              className="btn-icon"
              onClick={() => handleRotationChange(normalizeRotation((rotation ?? 0) + 90))}
              title="Rotate +90°"
            >
              +90°
            </button>
          </div>
        </div>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="360"
            value={rotation ?? 0}
            onChange={(e) => handleRotationChange(Number(e.target.value))}
            className="slider-purple"
          />
          <span className="slider-value">{Math.round(rotation ?? 0)}°</span>
        </div>
      </div>
    </div>
  );
}
