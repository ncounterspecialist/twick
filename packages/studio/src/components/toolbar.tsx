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
  { id: 'caption', name: 'Captions', icon: 'MessageSquare', description: 'Manage captions', shortcut: 'S' },
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
    <div className="sidebar">
      {/* Main Tools */}
      {toolCategories.map((tool) => {
        const Icon = getIcon(tool.icon)
        const isSelected = selectedTool === tool.id
        
        const tooltipText = `${tool.name}${tool.shortcut ? ` (${tool.shortcut})` : ''}`;
        return (
          <div
            key={tool.id}
            onClick={() => handleToolSelect(tool.id)}
            className={`toolbar-btn ${isSelected ? 'active' : ''}`}
            title={tooltipText}
            data-tooltip={tooltipText}
          >
            <Icon className="icon-sm" />
            <span className="toolbar-label">
              {tool.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
