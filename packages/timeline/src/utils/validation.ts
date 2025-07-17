import { ServiceErrorCode } from "../types";
import { Timeline, TimelineElement, AddElementOptions } from "../types";
import { canSplitElement } from "./element.utils";
import { TimelineServiceError } from "./timeline-service-error";

/**
 * Validation helpers for timeline operations
 */
export class ValidationHelper {
  /**
   * Validates timeline ID format and existence check callback
   */
  static validateTimelineId(
    timelineId: string,
    existsCheck?: (id: string) => boolean
  ): void {
    if (!timelineId || typeof timelineId !== 'string') {
      throw new TimelineServiceError(
        'Timeline ID is required and must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { timelineId }
      );
    }

    if (!timelineId.startsWith('t-')) {
      throw new TimelineServiceError(
        'Timeline ID must start with "t-"',
        ServiceErrorCode.TIMELINE_INVALID,
        { timelineId }
      );
    }

    if (existsCheck && !existsCheck(timelineId)) {
      throw new TimelineServiceError(
        `Timeline with ID "${timelineId}" not found`,
        ServiceErrorCode.TIMELINE_NOT_FOUND,
        { timelineId }
      );
    }
  }

  /**
   * Validates element ID format and existence
   */
  static validateElementId(
    elementId: string,
    existsCheck?: (id: string) => boolean
  ): void {
    if (!elementId || typeof elementId !== 'string') {
      throw new TimelineServiceError(
        'Element ID is required and must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { elementId }
      );
    }

    if (!elementId.startsWith('e-')) {
      throw new TimelineServiceError(
        'Element ID must start with "e-"',
        ServiceErrorCode.ELEMENT_INVALID,
        { elementId }
      );
    }

    if (existsCheck && !existsCheck(elementId)) {
      throw new TimelineServiceError(
        `Element with ID "${elementId}" not found`,
        ServiceErrorCode.ELEMENT_NOT_FOUND,
        { elementId }
      );
    }
  }

  /**
   * Validates timeline object structure
   */
  static validateTimeline(timeline: Timeline): void {
    if (!timeline || typeof timeline !== 'object') {
      throw new TimelineServiceError(
        'Timeline must be a valid object',
        ServiceErrorCode.TIMELINE_INVALID,
        { timeline }
      );
    }

    this.validateTimelineId(timeline.id);

    if (!timeline.type || typeof timeline.type !== 'string') {
      throw new TimelineServiceError(
        'Timeline type is required and must be a string',
        ServiceErrorCode.TIMELINE_INVALID,
        { timeline: timeline.id }
      );
    }

    if (!timeline.name || typeof timeline.name !== 'string') {
      throw new TimelineServiceError(
        'Timeline name is required and must be a string',
        ServiceErrorCode.TIMELINE_INVALID,
        { timeline: timeline.id }
      );
    }

    if (!Array.isArray(timeline.elements)) {
      throw new TimelineServiceError(
        'Timeline elements must be an array',
        ServiceErrorCode.TIMELINE_INVALID,
        { timeline: timeline.id }
      );
    }

    // Validate each element in the timeline
    timeline.elements.forEach(element => this.validateTimelineElement(element));
  }

  /**
   * Validates timeline element structure
   */
  static validateTimelineElement(element: TimelineElement): void {
    if (!element || typeof element !== 'object') {
      throw new TimelineServiceError(
        'Timeline element must be a valid object',
        ServiceErrorCode.ELEMENT_INVALID,
        { element }
      );
    }

    this.validateElementId(element.id);

    if (!element.type || typeof element.type !== 'string') {
      throw new TimelineServiceError(
        'Element type is required and must be a string',
        ServiceErrorCode.ELEMENT_INVALID,
        { element: element.id }
      );
    }

    if (typeof element.s !== 'number' || element.s < 0) {
      throw new TimelineServiceError(
        'Element start time (s) must be a non-negative number',
        ServiceErrorCode.ELEMENT_TIMING_INVALID,
        { element: element.id, start: element.s }
      );
    }

    if (typeof element.e !== 'number' || element.e <= element.s) {
      throw new TimelineServiceError(
        'Element end time (e) must be a number greater than start time',
        ServiceErrorCode.ELEMENT_TIMING_INVALID,
        { element: element.id, start: element.s, end: element.e }
      );
    }

    if (!element.timelineId || typeof element.timelineId !== 'string') {
      throw new TimelineServiceError(
        'Element timelineId is required and must be a string',
        ServiceErrorCode.ELEMENT_INVALID,
        { element: element.id }
      );
    }
  }

  /**
   * Validates add element options
   */
  static validateAddElementOptions(options: AddElementOptions): void {
    if (!options || typeof options !== 'object') {
      throw new TimelineServiceError(
        'Add element options must be a valid object',
        ServiceErrorCode.INVALID_INPUT,
        { options }
      );
    }

    this.validateTimelineId(options.timelineId);

    if (!options.type || typeof options.type !== 'string') {
      throw new TimelineServiceError(
        'Element type is required and must be a string',
        ServiceErrorCode.ELEMENT_INVALID,
        { options }
      );
    }

    if (typeof options.s !== 'number' || options.s < 0) {
      throw new TimelineServiceError(
        'Element start time must be a non-negative number',
        ServiceErrorCode.ELEMENT_TIMING_INVALID,
        { s: options.s }
      );
    }

    if (options.e && (typeof options.e !== 'number' || options.e <= options.s)) {
      throw new TimelineServiceError(
        'Element end time must be a number greater than start time',
        ServiceErrorCode.ELEMENT_TIMING_INVALID,
        { s: options.s, e: options.e }
      );
    }
  }

  /**
   * Validates split operation parameters
   */
  static validateSplitOperation(
    elementId: string,
    splitTime: number,
    element: TimelineElement
  ): void {
    this.validateElementId(elementId);

    if (typeof splitTime !== 'number' || splitTime < 0) {
      throw new TimelineServiceError(
        'Split time must be a non-negative number',
        ServiceErrorCode.ELEMENT_TIMING_INVALID,
        { elementId, splitTime }
      );
    }

    if(!canSplitElement(element)) {
      throw new TimelineServiceError(
        'Split element can only be done on video, audio or caption elements',
        ServiceErrorCode.ELEMENT_INVALID,
        { 
          elementId, 
          splitTime, 
          elementStart: element.s, 
          elementEnd: element.e 
        }
      );
    }
      if (splitTime <= element.s || splitTime >= element.e) {
        throw new TimelineServiceError(
          'Split time must be between element start and end times',
          ServiceErrorCode.ELEMENT_TIMING_INVALID,
          { 
            elementId, 
            splitTime, 
            elementStart: element.s, 
            elementEnd: element.e 
          }
        );
      }
  }

  /**
   * Validates service initialization
   */
  static validateServiceInitialized(isInitialized: boolean): void {
    if (!isInitialized) {
      throw new TimelineServiceError(
        'Service is not initialized. Call initialize() first.',
        ServiceErrorCode.SERVICE_NOT_INITIALIZED
      );
    }
  }
} 