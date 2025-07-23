import { ServiceErrorCode } from "../types";
import { Timeline, TimelineElement, ImageProps, VideoProps, AudioProps, TextProps } from "../types";
import { canSplitElement } from "./element.utils";
import { TimelineServiceError } from "./timeline-service-error";

const isNil = (value: any) => value === undefined || value === null;
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
  static validateAddElementOptions(options: {
    timelineId: string;
    type: string;
    s: number;
    e?: number;
  }): void {
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

  /**
   * Validates common create element parameters
   */
  static validateCreateElementParams({
    timelineId,
    id,
    s,
    e,
  }: {
    timelineId: string;
    id: string;
    s: number;
    e?: number;
  }): void {
    this.validateTimelineId(timelineId);
    this.validateElementId(id);

    if (typeof s !== 'number' || s < 0) {
      throw new TimelineServiceError(
        'Start time (s) must be a non-negative number',
        ServiceErrorCode.ELEMENT_TIMING_INVALID,
        { s }
      );
    }

    if (e !== undefined && (typeof e !== 'number' || e <= s)) {
      throw new TimelineServiceError(
        'End time (e) must be a number greater than start time',
        ServiceErrorCode.ELEMENT_TIMING_INVALID,
        { s, e }
      );
    }
  }

  /**
   * Validates video size object
   */
  static validateVideoSize(videoSize: { width: number; height: number }): void {
    if (!videoSize || typeof videoSize !== 'object') {
      throw new TimelineServiceError(
        'Video size must be a valid object',
        ServiceErrorCode.INVALID_INPUT,
        { videoSize }
      );
    }

    if (typeof videoSize.width !== 'number' || videoSize.width <= 0) {
      throw new TimelineServiceError(
        'Video size width must be a positive number',
        ServiceErrorCode.INVALID_INPUT,
        { width: videoSize.width }
      );
    }

    if (typeof videoSize.height !== 'number' || videoSize.height <= 0) {
      throw new TimelineServiceError(
        'Video size height must be a positive number',
        ServiceErrorCode.INVALID_INPUT,
        { height: videoSize.height }
      );
    }
  }

  /**
   * Validates image element props
   */
  static validateImageElementProps(props: ImageProps): void {
    if (!props || typeof props !== 'object') {
      throw new TimelineServiceError(
        'Image props must be a valid object',
        ServiceErrorCode.INVALID_INPUT,
        { props }
      );
    }

    if (!props.src || typeof props.src !== 'string') {
      throw new TimelineServiceError(
        'Image src is required and must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { src: props.src }
      );
    }

    if (props.mediaFilter && typeof props.mediaFilter !== 'string') {
      throw new TimelineServiceError(
        'Image mediaFilter must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { mediaFilter: props.mediaFilter }
      );
    }
  }

  /**
   * Validates video element props
   */
  static validateVideoElementProps(props: VideoProps): void {
    if (isNil(props) || typeof props !== 'object') {
      throw new TimelineServiceError(
        'Video props must be a valid object',
        ServiceErrorCode.INVALID_INPUT,
        { props }
      );
    }

    if (isNil(props.src) || typeof props.src !== 'string') {
      throw new TimelineServiceError(
        'Video src is required and must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { src: props.src }
      );
    }

    if (!isNil(props.play) && typeof props.play !== 'boolean') {
      throw new TimelineServiceError(
        'Video play must be a boolean',
        ServiceErrorCode.INVALID_INPUT,
        { play: props.play }
      );
    }

    if (!isNil(props.playbackRate) && (typeof props.playbackRate !== 'number' || props.playbackRate <= 0)) {
      throw new TimelineServiceError(
        'Video playbackRate must be a positive number',
        ServiceErrorCode.INVALID_INPUT,
        { playbackRate: props.playbackRate }
      );
    }

    if (!isNil(props.time) && typeof props.time !== 'number') {
      throw new TimelineServiceError(
        'Video time must be a number',
        ServiceErrorCode.INVALID_INPUT,
        { time: props.time }
      );
    }

    if (!isNil(props.mediaFilter) && typeof props.mediaFilter !== 'string') {
      throw new TimelineServiceError(
        'Video mediaFilter must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { mediaFilter: props.mediaFilter }
      );
    }

    if (!isNil(props.volume) && (typeof props.volume !== 'number' || props.volume < 0 || props.volume > 1)) {
      throw new TimelineServiceError(
        'Video volume must be a number between 0 and 1',
        ServiceErrorCode.INVALID_INPUT,
        { volume: props.volume }
      );
    }
  }

  /**
   * Validates audio element props
   */
  static validateAudioElementProps(props: AudioProps): void {
    if (isNil(props) || typeof props !== 'object') {
      throw new TimelineServiceError(
        'Audio props must be a valid object',
        ServiceErrorCode.INVALID_INPUT,
        { props }
      );
    }

    if (isNil(props.src) || typeof props.src !== 'string') {
      throw new TimelineServiceError(
        'Audio src is required and must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { src: props.src }
      );
    }

    if (!isNil(props.volume) && (typeof props.volume !== 'number' || props.volume < 0 || props.volume > 1)) {
      throw new TimelineServiceError(
        'Audio volume must be a number between 0 and 1',
        ServiceErrorCode.INVALID_INPUT,
        { volume: props.volume }
      );
    }

    if (!isNil(props.loop) && typeof props.loop !== 'boolean') {
      throw new TimelineServiceError(
        'Audio loop must be a boolean',
        ServiceErrorCode.INVALID_INPUT,
        { loop: props.loop }
      );
    }
  }

  /**
   * Validates text element props
   */
  static validateTextElementProps(props: TextProps): void {
      if (isNil(props) || typeof props !== 'object') {
      throw new TimelineServiceError(
        'Text props must be a valid object',
        ServiceErrorCode.INVALID_INPUT,
        { props }
      );
    }

    if (isNil(props.text) || typeof props.text !== 'string') {
      throw new TimelineServiceError(
        'Text content is required and must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { text: props.text }
      );
    }

    if (!isNil(props.fill) && typeof props.fill !== 'string') {
      throw new TimelineServiceError(
        'Text fill must be a valid color in hex format',
        ServiceErrorCode.INVALID_INPUT,
        { fill: props.fill }
      );
    }

    if (!isNil(props.rotation) && typeof props.rotation !== 'number') {
      throw new TimelineServiceError(
        'Text rotation must be a number',
        ServiceErrorCode.INVALID_INPUT,
        { rotation: props.rotation }
      );
    }

    if (!isNil(props.fontSize) && (typeof props.fontSize !== 'number' || props.fontSize <= 0)) {
      throw new TimelineServiceError(
        'Text fontSize must be a positive number',
        ServiceErrorCode.INVALID_INPUT,
        { fontSize: props.fontSize }
      );
    }

    if (!isNil(props.fontFamily) && typeof props.fontFamily !== 'string') {
      throw new TimelineServiceError(
        'Text fontFamily must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { fontFamily: props.fontFamily }
      );
    }

    if (!isNil(props.fontWeight) && typeof props.fontWeight !== 'number') {
      throw new TimelineServiceError(
        'Text fontWeight must be a number',
        ServiceErrorCode.INVALID_INPUT,
        { fontWeight: props.fontWeight }
      );
    }

    if (!isNil(props.fontStyle) && typeof props.fontStyle !== 'string') {
      throw new TimelineServiceError(
        'Text fontStyle must be a string',
        ServiceErrorCode.INVALID_INPUT,
        { fontStyle: props.fontStyle }
      );
    }

    const validTextAlignValues = ['left', 'center', 'right'];
    if (!isNil(props.textAlign) && !validTextAlignValues.includes(props.textAlign!)) {
      throw new TimelineServiceError(
        'Text textAlign must be one of: left, center, right',
        ServiceErrorCode.INVALID_INPUT,
        { textAlign: props.textAlign }
      );
    }
  }

  /**
   * Validates complete image element creation parameters
   */
  static validateCreateImageElement(params: {
    props: ImageProps;
    s: number;
    e?: number;
    videoSize: { width: number; height: number };
    timelineId: string;
    id: string;
  }): void {
    this.validateCreateElementParams(params);
    this.validateVideoSize(params.videoSize);
    this.validateImageElementProps(params.props);
  }

  /**
   * Validates complete video element creation parameters
   */
  static validateCreateVideoElement(params: {
    props: VideoProps;
    s: number;
    e?: number;
    videoSize: { width: number; height: number };
    timelineId: string;
    id: string;
  }): void {
    this.validateCreateElementParams(params);
    this.validateVideoSize(params.videoSize);
    this.validateVideoElementProps(params.props);
  }

  /**
   * Validates complete audio element creation parameters
   */
  static validateCreateAudioElement(params: {
    props: AudioProps;
    s: number;
    e?: number;
    timelineId: string;
    id: string;
  }): void {
    this.validateCreateElementParams(params);
    this.validateAudioElementProps(params.props);
  }

  /**
   * Validates complete text element creation parameters
   */
  static validateCreateTextElement(params: {
    props: TextProps;
    s: number;
    e?: number;
    timelineId: string;
    id: string;
  }): void {
    this.validateCreateElementParams(params);
    this.validateTextElementProps(params.props);
  }
}
