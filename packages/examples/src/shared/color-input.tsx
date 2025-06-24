import { useState } from "react";

const ColorInputDialog = ({ onColorSelect, onCancel }: { onColorSelect: (color: string) => void; onCancel: () => void }) => {
  const [selectedColor, setSelectedColor] = useState('#ff0000');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-black">Select Background Color</h3>
        <div className="flex flex-col gap-4">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded cursor-pointer"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-slate-200 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onColorSelect(selectedColor)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorInputDialog;