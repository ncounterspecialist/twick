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
    <div className="space-y-3">
      {/* Playback Rate */}
      {/* <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
          <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            Playback Rate
          </h5>
          <input
            type="range"
            min="0.1"
            max="5"
            step={0.1}
            defaultValue={(playbackRate ?? 1)}
            onChange={(e) => handleUpdateElement({ playbackRate: Number(e.target.value) / 100})}
            className="w-full h-1.5 bg-gradient-to-r from-purple-500/30 to-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0.1</span>
            <span>5</span>
          </div>
        </div> */}

      {/* Volume */}
      <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
        <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          Volume
        </h5>
        <input
          type="range"
          min="0"
          max="3"
          step={0.1}
          defaultValue={volume ?? 0}
          onChange={(e) =>
            handleUpdateElement({ volume: Number(e.target.value) })
          }
          className="w-full h-1.5 bg-gradient-to-r from-purple-500/30 to-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>3</span>
        </div>
      </div>
    </div>
  );
}
