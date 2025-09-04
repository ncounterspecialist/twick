import { useState } from "react";

export function TextPanel() {
  const [textContent, setTextContent] = useState("Sample");
  const [fontSize, setFontSize] = useState(48);
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textColor, setTextColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#ffffff");
  const [applyShadow, setApplyShadow] = useState(true);
  const [strokeWidth, setStrokeWidth] = useState(0);

  const fonts = ["Poppins", "Arial", "Helvetica", "Times New Roman", "Georgia", "Roboto", "Open Sans"];

  const handleApplyChanges = () => {
    // TODO: Apply text changes to selected text element
    console.log("Applying text changes:", {
      textContent,
      fontSize,
      selectedFont,
      isBold,
      isItalic,
      textColor,
      strokeColor,
      applyShadow,
      strokeWidth
    });
  };

  return (
    <div className="w-72 bg-neutral-800/80 border-l border-gray-600/50 p-4 overflow-y-auto overflow-x-hidden backdrop-blur-md shadow-l">
      <h3 className="text-xl font-bold text-white mb-6">Text Element</h3>

      {/* Text Content */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Text Content</label>
        <input
          type="text"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          className="w-full bg-neutral-700/50 border border-gray-600 rounded-lg text-white text-sm px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      {/* Font Size */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Font Size</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="8"
            max="120"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="flex-1 h-2 bg-gradient-to-r from-purple-500 to-neutral-600 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <span className="text-white text-sm font-medium min-w-[50px]">{fontSize}px</span>
        </div>
      </div>

      {/* Font */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Font</label>
        <div className="flex items-center gap-2">
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="flex-1 bg-neutral-700/50 border border-gray-600 rounded-lg text-white text-sm px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
          <button
            onClick={() => setIsBold(!isBold)}
            className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
              isBold 
                ? 'bg-purple-600 border-purple-500 text-white' 
                : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-500'
            }`}
          >
            <span className="font-bold">B</span>
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
              isItalic 
                ? 'bg-purple-600 border-purple-500 text-white' 
                : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-500'
            }`}
          >
            <span className="italic">I</span>
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-3">Colors</label>
        <div className="space-y-3">
          {/* Text Color */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-6 h-6 rounded border border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1 bg-neutral-700/50 border border-gray-600 rounded-lg text-white text-xs px-2 py-1 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm"
              />
            </div>
          </div>
          
          {/* Stroke Color */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Stroke Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="w-6 h-6 rounded border border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="flex-1 bg-neutral-700/50 border border-gray-600 rounded-lg text-white text-xs px-2 py-1 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Apply Shadow */}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="applyShadow"
              checked={applyShadow}
              onChange={(e) => setApplyShadow(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-neutral-700 border-gray-600 focus:ring-purple-500 focus:ring-2"
            />
            <label htmlFor="applyShadow" className="text-sm text-gray-300">Apply Shadow</label>
          </div>
        </div>
      </div>

      {/* Stroke Width */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Stroke Width</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="flex-1 h-2 bg-neutral-600 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <span className="text-white text-sm font-medium min-w-[30px]">{strokeWidth}</span>
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
