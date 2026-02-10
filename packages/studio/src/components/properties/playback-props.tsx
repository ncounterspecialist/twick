import { linearToDb, dbToLinear, MIN_DB, MAX_DB } from "../../helpers/volume-db";
import type { PropertiesPanelProps } from "../../types";

export function PlaybackPropsPanel({
  selectedElement,
  updateElement,
}: PropertiesPanelProps) {
  const elementProps = selectedElement?.getProps() || {};
  const volumeLinear = elementProps.volume ?? 1;
  const volumeDb = linearToDb(volumeLinear);

  const handleUpdateElement = (props: Record<string, any>) => {
    if (selectedElement) {
      updateElement?.(selectedElement?.setProps({ ...elementProps, ...props }));
    }
  };

  const handleVolumeDbChange = (db: number) => {
    handleUpdateElement({ volume: dbToLinear(db) });
  };

  return (
    <div className="panel-container">
      <div className="panel-title">Playback Properties</div>
      {/* Volume (dB) */}
      <div className="panel-section">
        <label className="label-dark">Volume</label>
        <div className="slider-container">
          <input
            type="range"
            min={MIN_DB}
            max={MAX_DB}
            step={1}
            value={volumeDb}
            onChange={(e) => handleVolumeDbChange(Number(e.target.value))}
            className="slider-purple"
          />
          <span className="slider-value">
            {volumeDb <= MIN_DB ? "−∞" : `${Math.round(volumeDb)} dB`}
          </span>
        </div>
      </div>
    </div>
  );
}
