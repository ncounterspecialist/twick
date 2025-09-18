import { TEXT_EFFECTS } from "@twick/video-editor";
import { ElementTextEffect, TextElement } from "@twick/timeline";
import type { PropertiesPanelProps } from "../../types";

export function TextEffects({
  selectedElement,
  updateElement,
}: PropertiesPanelProps) {
  if (!(selectedElement instanceof TextElement)) return null;

  const currentEffect = selectedElement.getTextEffect();

  const handleUpdateEffect = (props: {
    name?: string;
    delay?: number;
    duration?: number;
    bufferTime?: number;
  }) => {
    if (!selectedElement || !(selectedElement instanceof TextElement)) return;

    let effect = currentEffect;

    // If name is provided and empty, remove effect
    if (props.name === "") {
      selectedElement.setTextEffect(undefined);
      updateElement?.(selectedElement);
      return;
    }

    // Create new effect if none exists or name is changing
    if (!effect || (props.name && props.name !== effect.getName())) {
      effect = new ElementTextEffect(
        props.name || currentEffect?.getName() || TEXT_EFFECTS[0].name
      );
      // Set default values for new effect
      effect.setDelay(0);
      effect.setDuration(1);
      effect.setBufferTime(0.1);
    }

    // Update effect properties
    if (props.delay !== undefined) effect.setDelay(props.delay);
    if (props.duration !== undefined) effect.setDuration(props.duration);
    if (props.bufferTime !== undefined) effect.setBufferTime(props.bufferTime);

    // Update element with new/modified effect
    selectedElement.setTextEffect(effect);
    updateElement?.(selectedElement);
  };

  return (
    <div className="space-y-3">
      {/* Text Effect Selection */}
      <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
        <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          Text Effect Type
        </h5>
        <select
          value={currentEffect?.getName() || ""}
          onChange={(e) => handleUpdateEffect({ name: e.target.value })}
          className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
        >
          <option value="">No Effect</option>
          {TEXT_EFFECTS.map((effect) => (
            <option key={effect.name} value={effect.name}>
              {effect.name.charAt(0).toUpperCase() + effect.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Text Effect Options */}
      {currentEffect && (
        <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
          <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            Effect Options
          </h5>
          <div className="space-y-2">
            {/* Delay */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Delay (seconds)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={currentEffect.getDelay() ?? 0}
                onChange={(e) =>
                  handleUpdateEffect({ delay: Number(e.target.value) })
                }
                className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Duration (seconds)
              </label>
              <input
                type="number"
                min="0.1"
                max="10"
                step="0.1"
                value={currentEffect.getDuration() ?? 1}
                onChange={(e) =>
                  handleUpdateEffect({ duration: Number(e.target.value) })
                }
                className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
              />
            </div>

            {/* Buffer Time */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Buffer Time (seconds)
              </label>
              <input
                type="number"
                min="0.05"
                max="1"
                step="0.05"
                value={currentEffect.getBufferTime() ?? 0.1}
                onChange={(e) =>
                  handleUpdateEffect({ bufferTime: Number(e.target.value) })
                }
                className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
