import { useState } from "react";

export function CirclePanel() {
  const [radius, setRadius] = useState(50);
  const [fillColor, setFillColor] = useState("#3b82f6");
  const [opacity, setOpacity] = useState(100);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(0);

  const handleApplyChanges = () => {
    // TODO: Apply circle changes to selected circle element
    console.log("Applying circle changes:", {
      radius,
      fillColor,
      opacity,
      strokeColor,
      lineWidth
    });
  };

  return (
    <div className="w-72 bg-neutral-800/80 border-l border-gray-600/50 p-4 overflow-y-auto overflow-x-hidden backdrop-blur-md shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6">Circle</h3>

      {/* Radius */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Radius</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="10"
            max="200"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="flex-1 h-2 bg-neutral-600 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <span className="text-white text-sm font-medium min-w-[50px]">{radius}px</span>
        </div>
      </div>

      {/* Fill Color */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Fill Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            className="w-6 h-6 rounded border border-gray-600 cursor-pointer"
          />
          <div 
            className="flex-1 h-8 rounded-lg border border-gray-600"
            style={{ backgroundColor: fillColor }}
          />
        </div>
      </div>

      {/* Opacity */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Opacity</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="flex-1 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <span className="text-white text-sm font-medium min-w-[50px]">{opacity}%</span>
        </div>
      </div>

      {/* Stroke Color */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Stroke Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="w-6 h-6 rounded border border-gray-600 cursor-pointer"
          />
          <div 
            className="flex-1 h-8 rounded-lg border-2 border-white"
            style={{ backgroundColor: strokeColor }}
          />
        </div>
      </div>

      {/* Line Width */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Line Width</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="flex-1 h-2 bg-neutral-600 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <span className="text-white text-sm font-medium min-w-[50px]">{lineWidth}px</span>
        </div>
      </div>

      {/* Apply Changes Button */}
      <div className="mt-8">
        <button
          onClick={handleApplyChanges}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}
