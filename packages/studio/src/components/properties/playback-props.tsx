import type { PropertiesPanelProps } from "../../types";
export function PlaybackPropsPanel({
  selectedElement,
  updateElement,
}: PropertiesPanelProps) {
  const elementProps = selectedElement?.getProps() || {};
  const { volume } = elementProps;

  const handleUpdateElement = (props: Record<string, any>) => {
    if (selectedElement) {
      updateElement?.(selectedElement?.setProps({ ...elementProps, ...props }));
    }
  };
  return (
    <div className="panel-container">
      <div className="panel-title">Playback Properties</div>
      {/* Volume */}
      <div className="panel-section">
        <label className="label-dark">Volume</label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="3"
            step={0.1}
            value={volume ?? 0}
            onChange={(e) =>
              handleUpdateElement({ volume: Number(e.target.value) })
            }
            className="slider-purple"
          />
          <span className="slider-value">{volume ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
