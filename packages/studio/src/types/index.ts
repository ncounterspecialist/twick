import type { TrackElement } from "@twick/timeline"

export interface MediaItem {
  id: string
  name: string
  type: 'video' | 'image' | 'audio'
  url: string
  thumbnail?: string
  duration?: number
  size: number
  width?: number
  height?: number
  createdAt: Date
}

export interface PanelProps {
  selectedElement?: TrackElement | null;
  addElement?: (item: TrackElement) => void;
  updateElement?: (item: TrackElement) => void;
}

export interface PropertiesPanelProps {
  selectedElement?: TrackElement | null;
  updateElement?: (element: TrackElement) => void;
}

export interface TextElement {
  id: string
  text: string
  font: string
  fontSize: number
  fontWeight: 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  textDecoration: 'none' | 'underline' | 'line-through'
  color: string
  backgroundColor?: string
  alignment: 'left' | 'center' | 'right' | 'justify'
  verticalAlignment: 'top' | 'middle' | 'bottom'
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
  borderRadius: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number }
  border?: {
    width: number
    color: string
    style: 'solid' | 'dashed' | 'dotted'
  }
  shadow?: {
    x: number
    y: number
    blur: number
    color: string
  }
}

export interface TimelineElement {
  id: string
  type: 'video' | 'image' | 'audio' | 'text'
  startTime: number
  endTime: number
  mediaId?: string
  textElement?: TextElement
  volume: number
  muted: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
  opacity: number
  effects: string[]
}

export interface Track {
  id: string
  name: string
  type: 'video' | 'audio' | 'text' | 'subtitle'
  elements: TimelineElement[]
  locked: boolean
  visible: boolean
  volume: number
  muted: boolean
  height: number
  color: string
}

export interface Timeline {
  id: string
  name: string
  tracks: Track[]
  duration: number
  fps: number
  width: number
  height: number
  backgroundColor: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  timeline: Timeline
  mediaLibrary: MediaItem[]
  settings: ProjectSettings
  createdAt: Date
  updatedAt: Date
}

export interface ProjectSettings {
  autoSave: boolean
  autoSaveInterval: number
  defaultDuration: number
  defaultFps: number
  defaultResolution: {
    width: number
    height: number
  }
}

export interface StudioState {
  currentTime: number
  isPlaying: boolean
  selectedElements: string[]
  zoom: number
  showGrid: boolean
  showRulers: boolean
  snapToGrid: boolean
  snapToElements: boolean
  selectedTool: 'select' | 'text' | 'icon' | 'rect' | 'circle' | 'video' | 'audio' | 'image' | 'record' | 'subtitle' | 'track'
  viewMode: 'grid' | 'list'
}

export interface ToolCategory {
  id: string
  name: string
  icon: string
  description: string
  shortcut?: string
}
