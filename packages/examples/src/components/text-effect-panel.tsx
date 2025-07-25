import { TrackElement, useTimelineContext } from "@twick/timeline";
import { TEXT_EFFECTS } from "@twick/video-editor";
import { useEffect, useState } from "react";

const TextEffectPanel = () => {
  const [selectedEffect, setSelectedEffect] = useState<string | null>(
    null
  );
  const { selectedItem } = useTimelineContext();

  // const getSelectedEffectData = () => {
  //   return TEXT_EFFECTS.find((effect) => effect.name === selectedEffect);
  // };

  const handleSetTextEffect = () => {
    if (!selectedEffect) return;
    // const element = selectedItem as TrackElement;
    // editor.setTextEffect({
    //   timelineId: element.trackId,
    //   elementId: element.id,
    //   textEffect: {
    //     ...getSelectedEffectData(),
    //   },
    // });
  };

  const handleDeleteTextEffect = () => {
    if (!selectedEffect) return;
    // const element = selectedItem as TimelineElement;
    // editor.setTextEffect({
    //   timelineId: element.trackId,
    //   elementId: element.id,
    //   textEffect: null,
    // });
  };

  useEffect(() => {
      if (selectedItem instanceof TrackElement) {
        // const element = selectedItem as TrackElement;
        // if (element.textEffect) {
        //   setSelectedEffect(element.textEffect.name);
        // }
      }
  }, [selectedItem]);

  if (!(selectedItem instanceof TrackElement)) return null;

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
