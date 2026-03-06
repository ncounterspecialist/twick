import type { ProjectJSON, ProjectMetadata, Size, TrackJSON } from "@twick/timeline";

export interface CaptionSegmentMs {
  t: string;
  s: number;
  e: number;
  w?: number[];
  metadata?: Record<string, unknown>;
}

export interface CaptionTrackStyle {
  capStyle?: string;
  font?: {
    size?: number;
    weight?: number;
    family?: string;
  };
  colors?: {
    text?: string;
    highlight?: string;
    bgColor?: string;
  };
  lineWidth?: number;
  stroke?: string;
  fontWeight?: number;
  shadowOffset?: [number, number];
  shadowColor?: string;
  shadowBlur?: number;
  x?: number;
  y?: number;
  applyToAll?: boolean;
  [key: string]: unknown;
}

export interface CaptionTrackBuildInput {
  captions: CaptionSegmentMs[];
  trackId?: string;
  trackName?: string;
  language?: string;
  style?: CaptionTrackStyle;
  idFactory?: () => string;
}

export interface CaptionProjectBuildInput {
  captions: CaptionSegmentMs[];
  videoUrl: string;
  durationSec: number;
  videoSize?: Size;
  captionTrack?: {
    id?: string;
    name?: string;
    language?: string;
    style?: CaptionTrackStyle;
  };
  metadata?: ProjectMetadata;
}

export interface CaptionProjectApplyInput {
  captions: CaptionSegmentMs[];
  insertionStartSec?: number;
  insertionEndSec?: number;
  captionTrackId?: string;
  captionTrackName?: string;
  captionTrackLanguage?: string;
  captionTrackStyle?: CaptionTrackStyle;
}

export interface ApplyCaptionToEditorInput {
  captions: CaptionSegmentMs[];
  insertionStartSec: number;
  insertionEndSec?: number;
  captionTrackId?: string;
  captionTrackName?: string;
  captionTrackLanguage?: string;
  captionTrackStyle?: CaptionTrackStyle;
}

export interface TemplateTrackSpec {
  id?: string;
  name?: string;
  type?: string;
  language?: string;
  props?: Record<string, unknown>;
  elements: TrackJSON["elements"];
}

export interface TemplateSpec {
  width?: number;
  height?: number;
  version?: number;
  backgroundColor?: string;
  metadata?: ProjectMetadata;
  tracks: TemplateTrackSpec[];
}

export type WorkflowProjectJSON = ProjectJSON & {
  properties?: {
    width: number;
    height: number;
  };
};
