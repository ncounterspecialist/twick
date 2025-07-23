import { TIMELINE_ELEMENT_TYPE, useTimelineContext, useTimelineEditor, type TimelineElement } from "@twick/timeline";
import { TEXT_EFFECTS } from "@twick/video-editor";
import { useEffect, useState } from "react";

const TextEffectPanel = () => {
  const [selectedEffect, setSelectedEffect] = useState<string | null>(
    null
  );
  const { selectedItem } = useTimelineContext();
  const editor = useTimelineEditor();

  const getSelectedEffectData = () => {
    return TEXT_EFFECTS.find((effect) => effect.name === selectedEffect);
  };

  const handleSetTextEffect = () => {
    if (!selectedEffect) return;
    const element = selectedItem as TimelineElement;
    editor.setTextEffect({
      timelineId: element.timelineId,
      elementId: element.id,
      textEffect: {
        ...getSelectedEffectData(),
      },
    });
  };

  const handleDeleteTextEffect = () => {
    if (!selectedEffect) return;
    const element = selectedItem as TimelineElement;
    editor.setTextEffect({
      timelineId: element.timelineId,
      elementId: element.id,
      textEffect: null,
    });
  };

  useEffect(() => {
    if (selectedItem?.id?.startsWith("e-")) {
      const element = selectedItem as TimelineElement;
      if (element.textEffect) {
        setSelectedEffect(element.textEffect.name);
      }
    }
  }, [selectedItem]);

  if (!(selectedItem?.id?.startsWith("e-") && selectedItem?.type === TIMELINE_ELEMENT_TYPE.TEXT)) return null;

  return (
    <div className="twick-text-effect-panel">
      <div className="twick-text-effect-header">
        <h3>Text Effects</h3>
      </div>
      <div className="twick-text-effect-content">
        <div className="twick-text-effect-select">
          <label>Text Effect:</label>
          <select
            value={selectedEffect || ""}
            onChange={(e) => setSelectedEffect(e.target.value)}
          >
            <option value="">Select Effect</option>
            {TEXT_EFFECTS.map((effect) => (
              <option key={effect.name} value={effect.name}>
                {effect.name}
              </option>
            ))}
          </select>
        </div>

        {selectedEffect && (
          <div className="twick-text-effect-actions">
            <button onClick={handleSetTextEffect}>Apply Effect</button>
            <button onClick={handleDeleteTextEffect}>Remove Effect</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextEffectPanel;
