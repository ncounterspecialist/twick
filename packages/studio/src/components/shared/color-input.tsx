import { useState } from "react";

const ColorInputDialog = ({ onColorSelect, onCancel }: { onColorSelect: (color: string) => void; onCancel: () => void }) => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-title">Select Background Color</div>
        <div className="properties-group">
          <div className="color-container">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="color-picker"
            />
          </div>
          <div className="flex-container justify-end">
            <button
              onClick={onCancel}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              onClick={() => onColorSelect(selectedColor)}
              className="btn-primary"
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