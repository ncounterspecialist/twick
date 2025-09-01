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

export interface TimelineElement {
  id: string
  type: 'video' | 'image' | 'audio'
  startTime: number
  endTime: number
  mediaId: string
  volume: number
  muted: boolean
}

export interface Track {
  id: string
  name: string
  type: 'video' | 'audio' | 'text'
  elements: TimelineElement[]
  locked: boolean
  visible: boolean
  volume: number
  muted: boolean
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

export interface EditorState {
  currentTime: number
  isPlaying: boolean
  selectedElements: string[]
  zoom: number
  showGrid: boolean
  showRulers: boolean
  snapToGrid: boolean
  snapToElements: boolean
}
