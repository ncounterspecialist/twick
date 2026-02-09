import type { ProjectJSON, Size, TrackElement, VideoElement } from "@twick/timeline"
import type { CanvasConfig, VideoEditorConfig } from "@twick/video-editor"

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

/**
 * Subtitle entry format used for timeline integration
 */
export interface SubtitleEntry {
  s: number; // start time in seconds
  e: number; // end time in seconds
  t: string; // subtitle text
}

/**
 * Response from POST /generate-subtitles
 */
export interface GenerateSubtitlesResponse {
  reqId: string;
}

export interface RequestStatus {
  status: "pending" | "completed" | "failed";
}

/**
 * Response from GET /request-status when status is pending
 */
export interface RequestStatusPending {
  status: "pending";
}

/**
 * Response from GET /request-status when status is ready
 */
export interface RequestStatusCompleted {
  status: "completed";
  subtitles: SubtitleEntry[];
}

/**
 * Union type for request status responses
 */
export type RequestStatusResponse = RequestStatusPending | RequestStatusCompleted;

export interface ISubtitleGenerationPollingResponse {
  status: "pending" | "completed" | "failed";
  subtitles?: SubtitleEntry[];
  error?: string;
}

export interface ISubtitleGenerationService {
  generateSubtitles: (
    videoElement: VideoElement,
    project: ProjectJSON
  ) => Promise<string>;

  updateProjectWithSubtitles: (
    subtitles: SubtitleEntry[]
  ) => ProjectJSON;

  generateSubtitleVideo?: (
    videoUrl: string,
    videoSize?: { width: number; height: number }
  ) => Promise<string>;

  getRequestStatus: (
    reqId: string
  ) => Promise<ISubtitleGenerationPollingResponse>;
}

export interface StudioConfig extends VideoEditorConfig {
  /** Canvas behavior options (e.g. enableShiftAxisLock). Same as editorConfig.canvasConfig in TwickEditor. */
  canvasConfig?: CanvasConfig;
  saveProject?: (project: ProjectJSON, fileName: string) => Promise<Result>;
  loadProject?: () => Promise<ProjectJSON>;
  /**
   * Subtitle generation service for polling-based async subtitle generation
   * Implement this in your application code to provide API endpoints
   */
  subtitleGenerationService?: ISubtitleGenerationService;
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
