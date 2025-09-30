import type { PropertiesPanelProps } from "../../types";

export function ElementProps({ selectedElement, updateElement }: PropertiesPanelProps) {
  const elementProps = selectedElement?.getProps() || {};
  const {x, y, opacity, rotation} = elementProps;

  const handleUpdateElement = (props: Record<string, any>) => {
    if(selectedElement) {
      updateElement?.(selectedElement?.setProps({...elementProps,...props}));
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
              value={x ?? 0}
              onChange={(e) => handleUpdateElement({ x: Number(e.target.value)})}
              className="input-dark"
            />
          </div>
          <div>
            <label className="label-small">Y</label>
            <input
              type="number"
              value={y ?? 0}
              onChange={(e) => handleUpdateElement({ y: Number(e.target.value)})}
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
            onChange={(e) => handleUpdateElement({ opacity: Number(e.target.value) / 100})}
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
            onChange={(e) => handleUpdateElement({ rotation: Number(e.target.value)})}
            className="slider-purple"
          />
          <span className="slider-value">{rotation ?? 0}°</span>
        </div>
      </div>
    </div>
  );
}
