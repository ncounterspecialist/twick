import {
  getDecimalNumber,
  TimelineEditor,
  TrackElement,
  Track,
} from "@twick/timeline";
import { ANIMATIONS } from "@twick/video-editor";
import { useEffect, useState } from "react";

const AnimationPanel = ({ editor, selectedItem }: { editor: TimelineEditor, selectedItem: Track | TrackElement | null }) => {
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(
    null
  );
  const [animate, setAnimate] = useState("enter");
  const [direction, setDirection] = useState("up");
  const [mode, setMode] = useState("in");
  //   const [intensity, setIntensity] = useState(1);
  const [interval, setInterval] = useState(1000);

  const [maxInterval, setMaxInterval] = useState(1000);

  const getSelectedAnimationData = () => {
    return ANIMATIONS.find((anim) => anim.name === selectedAnimation);
  };

  const handleAnimate = () => {
    if (!selectedAnimation) return;
    if (selectedItem instanceof TrackElement) {
      const element = selectedItem as TrackElement;
      element.setAnimation({
        name: selectedAnimation,
        animate: animate as "enter" | "exit" | "both",
        direction: direction as "up" | "down" | "left" | "right" | "center",
        mode: mode as "in" | "out",
        interval: getDecimalNumber(interval / 1000),
      });
      editor.updateElementInTrack(element.getTrackId(), element);
    }
  };

  const handleDeleteAnimation = () => {
    if (!selectedAnimation) return;
    if (selectedItem instanceof TrackElement) {
      const element = selectedItem as TrackElement;
      element.setAnimation(undefined);
      editor.updateElementInTrack(element.getTrackId(), element);
    }
  };

  const selectedAnimData = getSelectedAnimationData();

  useEffect(() => {
    if (selectedItem instanceof TrackElement) {
      const element = selectedItem as TrackElement;
      setMaxInterval(element.getDuration());
      const animation = element.getAnimation();
      if (animation) {
        setSelectedAnimation(animation.name);
        setAnimate(animation.animate || "enter");
        setDirection(animation.direction || "up");
        setMode(animation.mode || "in");
        setInterval((animation.interval || 0.5) * 1000);
      }
    }
  }, [selectedItem]);

  if (!(selectedItem instanceof TrackElement)) return null;

  return (
    <div className="p-3 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
      <h2 className="text-lg font-semibold mb-2 text-white">Animations</h2>

      {/* Animation Grid */}
      <div className="grid grid-cols-3 gap-3 mb-2">
        {ANIMATIONS.map((animation) => (
          <div
            key={animation.name}
            className={`border rounded-lg p-1 cursor-pointer transition-colors ${
              selectedAnimation === animation.name
                ? "border-blue-400 bg-blue-900"
                : "border-gray-600 hover:border-gray-500 bg-gray-700"
            }`}
            onClick={() => setSelectedAnimation(animation.name)}
          >
            <div className="w-full h-16 bg-gray-600 rounded mb-2 flex items-center justify-center group">
              <img
                src={animation.getSample()}
                alt={`${animation.name} preview`}
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
              <span className="absolute text-xs capitalize text-gray-300 group-hover:opacity-0 transition-opacity duration-200">
                {animation.name.replace("-", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Animation Controls */}
      {selectedAnimation && (
        <div className="space-y-4">
          <div className="border-t border-gray-600 pt-4">
            <h3 className="text-sm font-medium mb-3 text-white capitalize">
              {selectedAnimation.replace("-", " ")} Settings
            </h3>

            {/* Animate */}
            {selectedAnimData?.options?.animate && (
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Animate
                </label>
                <select
                  value={animate}
                  onChange={(e) => setAnimate(e.target.value)}
                  className="w-full text-xs border border-gray-600 rounded px-2 py-1 bg-gray-700 text-white"
                >
                  {selectedAnimData.options.animate.map((option: string) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Direction */}
            {selectedAnimData?.options?.direction && (
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Direction
                </label>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-full text-xs border border-gray-600 rounded px-2 py-1 bg-gray-700 text-white"
                >
                  {selectedAnimData.options.direction.map((option: string) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Mode */}
            {selectedAnimData?.options?.mode && (
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full text-xs border border-gray-600 rounded px-2 py-1 bg-gray-700 text-white"
                >
                  {selectedAnimData.options.mode.map((option: string) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Intensity */}
            {/* <div className="mb-3">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Intensity: {intensity}
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div> */}

            {/* Interval */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Interval (ms): {interval}
              </label>
              <input
                type="range"
                min={0}
                max={maxInterval * 1000}
                step={100}
                value={interval}
                onChange={(e) => setInterval(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Animate Button */}
            <button
              onClick={handleAnimate}
              className="w-full bg-blue-600 text-white text-sm font-medium mb-4 py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Set Animation
            </button>
            <button
              onClick={handleDeleteAnimation}
              className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Delete Animation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationPanel;
