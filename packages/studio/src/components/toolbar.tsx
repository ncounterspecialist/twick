/**
 * Toolbar Component
 * 
 * A vertical toolbar that provides quick access to different editing tools
 * and media types. Displays icons with labels and optional keyboard shortcuts.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.selectedTool - Currently selected tool ID
 * @param {(tool: string) => void} props.setSelectedTool - Callback to update selected tool
 * 
 * @example
 * ```tsx
 * <Toolbar
 *   selectedTool="text"
 *   setSelectedTool={(tool) => console.log(`Selected ${tool}`)}
 * />
 * ```
 */

import { 
  Type, 
  Upload, 
  Video,
  Image, 
  Music,
  Circle,
  Infinity, 
  MessageSquare,
  Plus,
  Square,
} from 'lucide-react'
import type { ToolCategory } from '../types'

const toolCategories: ToolCategory[] = [
  { id: 'video', name: 'Video', icon: 'Video', description: 'Video' },
  { id: 'image', name: 'Image', icon: 'Image', description: 'Image' },
  { id: 'audio', name: 'Audio', icon: 'Audio', description: 'Audio' },
  { id: 'text', name: 'Text', icon: 'Type', description: 'Add text elements', shortcut: 'T' },
  { id: 'icon', name: 'Icons', icon: 'Icon', description: 'Icon Element', shortcut: 'I' },
  { id: 'circle', name: 'Circle', icon: 'Circle', description: 'Circle Element', shortcut: 'C' },
  { id: 'rect', name: 'Rect', icon: 'Rect', description: 'Rect Element' },
  { id: 'subtitle', name: 'Subtitles', icon: 'MessageSquare', description: 'Manage subtitles', shortcut: 'S' },
]

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Plus': return Plus
    case 'Type': return Type
    case 'Icon': return Infinity
    case 'Upload': return Upload
    case 'Square': return Square
    case 'Image': return Image
    case 'Video': return Video
    case 'Audio': return Music
    case 'Circle': return Circle
    case 'Rect': return Square
    case 'MessageSquare': return MessageSquare
    default: return Plus
  }
}

export function Toolbar({ selectedTool, setSelectedTool }: { selectedTool: string, setSelectedTool: (tool: string) => void }) {

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
  }

  return (
    <div className="w-16 bg-neutral/80 border-r border-gray-300/50 flex flex-col items-center py-4 space-y-3 justify-start backdrop-blur-md shadow-lg">
      {/* Main Tools */}
      {toolCategories.map((tool) => {
        const Icon = getIcon(tool.icon)
        const isSelected = selectedTool === tool.id
        
        return (
          <button
            key={tool.id}
            onClick={() => handleToolSelect(tool.id)}
            className={`
              toolbar-btn group ${
                isSelected 
                  ? 'active' 
                  : ''
              }
            `}
            title={`${tool.name}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] mt-1 transition-opacity duration-200">
              {tool.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
