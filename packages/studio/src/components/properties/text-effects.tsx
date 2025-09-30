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
    <div className="panel-container">
      <div className="panel-title">Text Effects</div>
      {/* Text Effect Selection */}
      <div className="panel-section">
        <label className="label-dark">Text Effect Type</label>
        <select
          value={currentEffect?.getName() || ""}
          onChange={(e) => handleUpdateEffect({ name: e.target.value })}
          className="select-dark w-full"
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
        <>
          {/* Delay */}
          <div className="panel-section">
            <label className="label-dark">Delay (seconds)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={currentEffect.getDelay() ?? 0}
              onChange={(e) =>
                handleUpdateEffect({ delay: Number(e.target.value) })
              }
              className="input-dark"
            />
          </div>

          {/* Duration */}
          <div className="panel-section">
            <label className="label-dark">Duration (seconds)</label>
            <input
              type="number"
              min="0.1"
              max="10"
              step="0.1"
              value={currentEffect.getDuration() ?? 1}
              onChange={(e) =>
                handleUpdateEffect({ duration: Number(e.target.value) })
              }
              className="input-dark"
            />
          </div>

          {/* Buffer Time */}
          <div className="panel-section">
            <label className="label-dark">Buffer Time (seconds)</label>
            <input
              type="number"
              min="0.05"
              max="1"
              step="0.05"
              value={currentEffect.getBufferTime() ?? 0.1}
              onChange={(e) =>
                handleUpdateEffect({ bufferTime: Number(e.target.value) })
              }
              className="input-dark"
            />
          </div>
        </>
      )}
    </div>
  );
}
