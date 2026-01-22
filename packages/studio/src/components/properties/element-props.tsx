import { TrackElement } from "@twick/timeline";
import type { PropertiesPanelProps } from "../../types";

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
        <label className="label-dark">Rotation</label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="360"
            value={rotation ?? 0}
            onChange={(e) => handleRotationChange(Number(e.target.value))}
            className="slider-purple"
          />
          <span className="slider-value">{rotation ?? 0}°</span>
        </div>
      </div>
    </div>
  );
}
