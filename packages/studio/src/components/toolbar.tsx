import { 
  Type, 
  Upload, 
  MonitorPlay,
  Circle, 
  MessageSquare,
  Plus,
  Square
} from 'lucide-react'
import { useEditor } from '../hooks/useEditor'
import type { ToolCategory } from '../types'

const toolCategories: ToolCategory[] = [
  { id: 'text', name: 'Text', icon: 'Type', description: 'Add text elements', shortcut: 'T' },
  { id: 'media', name: 'Media', icon: 'Video', description: 'Media' },
  { id: 'icon', name: 'Icon', icon: 'Icon', description: 'Icon Element', shortcut: 'I' },
  { id: 'circle', name: 'Circle', icon: 'Circle', description: 'Circle Element', shortcut: 'C' },
  { id: 'rect', name: 'Rect', icon: 'Rect', description: 'Rect Element' },
  { id: 'subtitle', name: 'Subtitles', icon: 'MessageSquare', description: 'Manage subtitles', shortcut: 'S' },
  { id: 'add', name: 'Track', icon: 'Plus', description: 'Add new elements' },
  { id: 'upload', name: 'Upload', icon: 'Upload', description: 'Import media files' },
]

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Plus': return Plus
    case 'Type': return Type
    case 'Upload': return Upload
    case 'Square': return Square
    case 'Media': return MonitorPlay
    case 'Circle': return Circle
    case 'Rect': return Square
    case 'MessageSquare': return MessageSquare
    default: return Plus
  }
}

export function Toolbar() {
  const { state, dispatch } = useEditor()

  const handleToolSelect = (toolId: string) => {
    dispatch({ type: 'select_tool', tool: toolId as any })
  }

  return (
    <div className="w-16 bg-gray-900 border-r border-gray-700 flex flex-col items-center py-4 space-y-2">
      {toolCategories.map((tool) => {
        const Icon = getIcon(tool.icon)
        const isSelected = state.selectedTool === tool.id
        
        return (
          <button
            key={tool.id}
            onClick={() => handleToolSelect(tool.id)}
            className={`
              w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-all duration-200
              ${isSelected 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }
            `}
            title={`${tool.name}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px]">{tool.name}</span>
          </button>
        )
      })}
    </div>
  )
}
