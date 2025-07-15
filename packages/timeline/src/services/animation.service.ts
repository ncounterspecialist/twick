import {
  TimelineElement,
  AnimationOptions,
  TextEffectOptions,
} from "../types";
import {
  TIMELINE_ELEMENT_TYPE,
} from "../helpers/constants";
import { TimelineDataService } from "./timeline-data.service";

/**
 * Internal service for managing animations and text effects
 * Used internally by the singleton TimelineService
 */
export class AnimationService {
  constructor(private dataService: TimelineDataService) {}

  setElementAnimation(options: AnimationOptions): {
    timelineId: string;
    elementId: string;
    element: TimelineElement | null;
    version: number;
  } {
    const { timelineId, elementId, animation } = options;

    const element = this.dataService.getElement(elementId);
    if (!element) {
      return {
        timelineId,
        elementId,
        element: null,
        version: this.dataService.getTimelineData()?.version || 0,
      };
    }

    const updatedElement = {
      ...element,
      animation: animation || undefined,
    };

    const result = this.dataService.updateElement(timelineId, elementId, updatedElement);
    return {
      timelineId: result.timelineId,
      elementId: result.elementId,
      element: result.element,
      version: result.version,
    };
  }

  setTextEffect(options: TextEffectOptions): {
    timelineId: string;
    elementId: string;
    element: TimelineElement | null;
    version: number;
  } {
    const { timelineId, elementId, textEffect } = options;

    const element = this.dataService.getElement(elementId);
    if (!element || element.type !== TIMELINE_ELEMENT_TYPE.TEXT) {
      return {
        timelineId,
        elementId,
        element: null,
        version: this.dataService.getTimelineData()?.version || 0,
      };
    }

    const updatedElement = {
      ...element,
      textEffect: textEffect || undefined,
    };

    const result = this.dataService.updateElement(timelineId, elementId, updatedElement);
    return {
      timelineId: result.timelineId,
      elementId: result.elementId,
      element: result.element,
      version: result.version,
    };
  }

  removeAnimation(timelineId: string, elementId: string): {
    timelineId: string;
    elementId: string;
    element: TimelineElement | null;
    version: number;
  } {
    return this.setElementAnimation({
      timelineId,
      elementId,
      animation: null,
    });
  }

  removeTextEffect(timelineId: string, elementId: string): {
    timelineId: string;
    elementId: string;
    element: TimelineElement | null;
    version: number;
  } {
    return this.setTextEffect({
      timelineId,
      elementId,
      textEffect: null,
    });
  }
} 