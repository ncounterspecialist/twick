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
  MessageSquare,
  Plus,
  Square,
  Wand2,
  File,
} from 'lucide-react'
import type { ToolCategory } from '../types'

const defaultToolCategories: ToolCategory[] = [
  // { id: 'templates', name: 'Templates', icon: 'Plus', description: 'Start from a project template' },
  // { id: 'record', name: 'Record', icon: 'Upload', description: 'Record screen and import clip' },
  { id: 'video', name: 'Video', icon: 'Video', description: 'Add a video element' },
  { id: 'image', name: 'Image', icon: 'Image', description: 'Add an image element' },
  { id: 'audio', name: 'Audio', icon: 'Audio', description: 'Add an audio element' },
  { id: 'text', name: 'Text', icon: 'Type', description: 'Add text elements' },
  { id: 'text-style', name: 'Text Style', icon: 'Type', description: 'Apply text style presets' },
  { id: 'shapes', name: 'Shapes', icon: 'Square', description: 'Add lines, arrows, boxes, and circles' },
  // { id: 'chapters', name: 'Chapters', icon: 'File', description: 'Manage chapter markers' },
  // { id: 'script', name: 'Script', icon: 'Type', description: 'Build timeline from a script outline' },
  { id: 'caption', name: 'Caption', icon: 'MessageSquare', description: 'Manage captions'},
  { id: 'generate-media', name: 'Generate', icon: 'Wand2', description: 'Generate image or video with AI'},
]

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Plus': return Plus
    case 'Type': return Type
    case 'Upload': return Upload
    case 'Square': return Square
    case 'Image': return Image
    case 'Video': return Video
    case 'Audio': return Music
    case 'Circle': return Circle
    case 'Rect': return Square
    case 'MessageSquare': return MessageSquare
    case 'Wand2': return Wand2
    case 'File': return File
    default: return Plus
  }
}

export function Toolbar({
  selectedTool,
  setSelectedTool,
  customTools = [],
  hiddenTools = [],
}: {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  customTools?: ToolCategory[];
  hiddenTools?: string[];
}) {

  const mergedTools = [...defaultToolCategories, ...customTools].filter(
    (tool) => !hiddenTools.includes(tool.id)
  );
  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
  }

  return (
    <div className="sidebar">
      {/* Main Tools */}
      {mergedTools.map((tool) => {
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
