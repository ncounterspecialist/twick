import { ElementTextEffect, TextElement, TimelineEditor, Track, TrackElement } from "@twick/timeline";
import { TEXT_EFFECTS } from "@twick/video-editor";
import { useEffect, useState } from "react";

const TextEffectPanel = ({editor, selectedItem}: {editor: TimelineEditor, selectedItem: Track | TrackElement | null}) => {
  const [selectedEffect, setSelectedEffect] = useState<string | null>(
    null
  );

  const getSelectedEffectData = () => {
    return TEXT_EFFECTS.find((effect) => effect.name === selectedEffect);
  };

  const handleSetTextEffect = () => {
    if (!selectedEffect) return;
    if(selectedItem instanceof TextElement) {
      const element = selectedItem as TextElement;
      const textEffect = ElementTextEffect.fromJSON({
        name: selectedEffect,
        delay: selectedEffectData?.delay,
        duration: Math.min(element?.getDuration() ?? 0, 1)
      })
      element.setTextEffect(textEffect);
      editor.updateElement(element);
    }
  };

  const handleDeleteTextEffect = () => {
    if (!selectedEffect) return;
    if(selectedItem instanceof TextElement) {
      const element = selectedItem as TextElement;
      element.setTextEffect(undefined);
      editor.updateElement(element);
    }
  };

  const selectedEffectData = getSelectedEffectData();

  useEffect(() => {
    if (selectedItem instanceof TextElement) {
      const element = selectedItem as TextElement;
      const textEffect = element.getTextEffect();
      if (textEffect) {
        setSelectedEffect(textEffect.getName());
      }
    }
  }, [selectedItem]);

  if (!(selectedItem instanceof TextElement)) return null;

  return (
    <div className="p-3 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
      <h2 className="text-lg font-semibold mb-2 text-white">Animations</h2>

      {/* Animation Grid */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        {TEXT_EFFECTS.map((effect) => (
          <div
            key={effect.name}
            className={`border rounded-lg p-1 cursor-pointer transition-colors ${
              selectedEffect === effect.name
                ? "border-blue-400 bg-blue-900"
                : "border-gray-600 hover:border-gray-500 bg-gray-700"
            }`}
            onClick={() => setSelectedEffect(effect.name)}
          >
            <div className="w-full h-16 bg-gray-600 rounded mb-2 flex items-center justify-center group">
              <img
                src={effect.getSample()}
                alt={`${effect.name} preview`}
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
              <span className="absolute text-xs capitalize text-gray-300 group-hover:opacity-0 transition-opacity duration-200">
                {effect.name.replace("-", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Animation Controls */}
      {selectedEffect && (
        <div className="space-y-4">
          <div className="border-t border-gray-600 pt-4">
            <h3 className="text-sm font-medium mb-3 text-white capitalize">
              {selectedEffect.replace("-", " ")} Settings
            </h3>
            {/* Animate Button */}
            <button
              onClick={handleSetTextEffect}
              className="w-full bg-blue-600 text-white text-sm font-medium mb-4 py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Set Text Effect
            </button>
            <button
              onClick={handleDeleteTextEffect}
              className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Delete Text Effect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEffectPanel;
