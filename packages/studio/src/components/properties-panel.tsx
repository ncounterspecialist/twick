import { useEditor } from '../hooks/useEditor'

export function PropertiesPanel() {
  const { state } = useEditor()
  
  // For now, show text properties when text tool is selected
  const showTextProperties = state.selectedTool === 'text'
  
  if (!showTextProperties) {
    return (
      <div className="w-72 bg-gray-900 border-l border-gray-700 p-4">
        <div className="text-sm text-gray-400">Select an element to edit properties</div>
      </div>
    )
  }

  return (
    <div className="w-72 bg-gray-900 border-l border-gray-700 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-white mb-4">Text Properties</h3>
      
      {/* Alignment */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Align</label>
        <div className="flex gap-1">
          {['left', 'center', 'right', 'justify'].map((align) => (
            <button
              key={align}
              className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center text-gray-300 hover:text-white"
              title={`Align ${align}`}
            >
              {align === 'left' && 'L'}
              {align === 'center' && 'C'}
              {align === 'right' && 'R'}
              {align === 'justify' && 'J'}
            </button>
          ))}
        </div>
        <div className="flex gap-1 mt-1">
          {['top', 'middle', 'bottom'].map((valign) => (
            <button
              key={valign}
              className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center text-gray-300 hover:text-white"
              title={`Vertical align ${valign}`}
            >
              {valign === 'top' && 'T'}
              {valign === 'middle' && 'M'}
              {valign === 'bottom' && 'B'}
            </button>
          ))}
        </div>
      </div>

      {/* Position */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1">X</label>
            <input
              type="number"
              defaultValue="35"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Y</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Rotation</label>
            <input
              type="range"
              min="0"
              max="360"
              defaultValue="0"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1">W</label>
            <input
              type="number"
              defaultValue="135"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">H</label>
            <input
              type="number"
              defaultValue="20"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* Radius */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Radius</label>
        <div className="grid grid-cols-4 gap-1">
          {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((corner) => (
            <div key={corner}>
              <label className="block text-xs text-gray-400 mb-1">{corner}</label>
              <input
                type="number"
                defaultValue="0"
                className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Text</label>
        <input
          type="text"
          defaultValue="Pasta Picasso"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
        />
      </div>

      {/* Font */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Font</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <select className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm">
            <option>Mitr</option>
            <option>Arial</option>
            <option>Helvetica</option>
          </select>
          <select className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm">
            <option>Medium</option>
            <option>Regular</option>
            <option>Bold</option>
          </select>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            defaultValue="20"
            className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
          />
          <div className="flex gap-1">
            <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center text-gray-300 hover:text-white" title="Bold">B</button>
            <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center text-gray-300 hover:text-white" title="Italic">I</button>
            <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center text-gray-300 hover:text-white" title="Underline">U</button>
            <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center text-gray-300 hover:text-white" title="Strikethrough">S</button>
          </div>
        </div>
      </div>

      {/* Fill */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Fill</label>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            defaultValue="FFFFFF"
            className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm font-mono"
          />
          <input
            type="number"
            defaultValue="100"
            min="0"
            max="100"
            className="w-16 px-2 py-1 bg-gray-700 rounded text-white text-sm"
          />
          <span className="text-gray-400 text-sm">%</span>
          <button className="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 hover:text-white text-sm">+</button>
        </div>
      </div>

      {/* Color */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded border border-gray-600"></div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="100"
            className="flex-1"
          />
          <span className="text-gray-400 text-sm">100%</span>
        </div>
      </div>

      {/* Border */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Border</label>
        <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 hover:text-white text-sm">+</button>
      </div>
    </div>
  )
}
