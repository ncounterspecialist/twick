import { Timeline, TimelineElement, TimelineData } from "./timeline.types";
import { Animation, TextEffect, ImageProps, VideoProps, AudioProps, TextProps } from "./element.types";

export interface TimelineServiceConfig {
  videoSize: {
    width: number;
    height: number;
  };
  onTimelineUpdate?: (data: TimelineData) => void;
  onSelectionChange?: (item: TimelineElement | Timeline | null) => void;
  onOperationComplete?: (operation: string, data: any) => void;
}

export interface AddElementOptions {
  timelineId: string;
  type: string;
  props: ImageProps | VideoProps | AudioProps | TextProps | any;
  s: number;
  e?: number;
  name?: string;
}

export interface EditElementOptions {
  timelineId: string;
  elementId: string;
  updates: Partial<TimelineElement>;
  noSelection?: boolean;
}

export interface AddTimelineOptions {
  type: string;
  name: string;
  allowOverlap?: boolean;
  props?: any;
}

export interface AnimationOptions {
  timelineId: string;
  elementId: string;
  animation: Animation | null;
}

export interface TextEffectOptions {
  timelineId: string;
  elementId: string;
  textEffect: TextEffect | null;
} 