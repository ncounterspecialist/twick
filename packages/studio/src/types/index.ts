import type { ProjectJSON, Size, TrackElement } from "@twick/timeline"
import { VideoEditorConfig } from "@twick/video-editor"

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

export interface VideoSettings {
  outFile: string;
  fps: number;
  resolution: {
    width: number;
    height: number;
  };
}

export interface Result {
  status: boolean;
  message: string;
  result?: any;
}

export interface StudioConfig extends VideoEditorConfig {
  saveProject?: (project: ProjectJSON, fileName: string) => Promise<Result>;
  loadProject?: () => Promise<ProjectJSON>;
  exportVideo? : (project: ProjectJSON, videoSettings: VideoSettings) => Promise<Result>;
}

export interface PanelProps {
  selectedElement?: TrackElement | null;
  videoResolution: Size,
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

export interface ToolCategory {
  id: string
  name: string
  icon: string
  description: string
  shortcut?: string
}
