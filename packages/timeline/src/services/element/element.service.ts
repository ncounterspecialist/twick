import {
  Timeline,
  TimelineElement,
  ImageProps,
  VideoProps,
  AudioProps,
  TextProps,
  AddElementOptions,
  EditElementOptions,
  ServiceErrorCode,
} from "../../types";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";
import { generateShortUuid } from "../../utils/timeline.utils";
import {
  createAudioElement,
  createImageElement,
  createTextElement,
  createVideoElement,
} from "../../utils/element.utils";
import { TimelineDataService } from "../timeline/timeline-data.service";
import { ValidationHelper } from "../../utils/validation";
import { TimelineServiceError } from "../../utils/timeline-service-error";

/**
 * Internal service for managing timeline elements
 * Used internally by the singleton TimelineService
 */
export class ElementService {
  constructor(
    private dataService: TimelineDataService,
    private getConfig: () => {
      videoSize: { width: number; height: number };
    } | null
  ) {}

  async addElement(options: AddElementOptions): Promise<{
    timelineId: string;
    element: TimelineElement;
    version: number;
  }> {
    // Validate input
    ValidationHelper.validateAddElementOptions(options);

    // Check if timeline exists
    const timeline = this.dataService.getTimeline(options.timelineId);
    if (!timeline) {
      throw new Error(`Timeline with ID "${options.timelineId}" not found`);
    }

    const { timelineId, type, props, s, e, name } = options;
    const config = this.getConfig();
    const videoSize = config?.videoSize || { width: 1920, height: 1080 };
    const elementId = `e-${generateShortUuid()}`;

    let newElement: TimelineElement;
    let elementData: any;
    switch (type) {
      case TIMELINE_ELEMENT_TYPE.IMAGE:
        elementData = {
          props: props as ImageProps,
          s,
          e,
          videoSize,
          timelineId,
          id: elementId,
        };
        // Validate image element creation parameters
        ValidationHelper.validateCreateImageElement(elementData);
        const imageElement = await createImageElement(elementData);
        newElement = {
          ...imageElement,
          name: name || "Image",
        };
        break;
      case TIMELINE_ELEMENT_TYPE.VIDEO:
        elementData = {
          props: props as VideoProps,
          s,
          e,
          videoSize,
          timelineId,
          id: elementId,
        };
        // Validate video element creation parameters
        ValidationHelper.validateCreateVideoElement(elementData);

        const videoElement = await createVideoElement(elementData);
        newElement = {
          ...videoElement,
          name: name || "Video",
        };
        break;
      case TIMELINE_ELEMENT_TYPE.AUDIO:
        elementData = {
          props: props as AudioProps,
          s,
          e,
          timelineId,
          id: elementId,
        };
        // Validate audio element creation parameters
        ValidationHelper.validateCreateAudioElement(elementData);

        const audioElement = await createAudioElement(elementData);
        newElement = {
          ...audioElement,
          name: name || "Audio",
        };
        break;
      case TIMELINE_ELEMENT_TYPE.TEXT:
        elementData = {
          props: props as TextProps,
          s,
          e: e || s + 1,
          timelineId,
          id: elementId,
        };
        // Validate text element creation parameters
        ValidationHelper.validateCreateTextElement(elementData);

        const textElement = await createTextElement(elementData);
        newElement = {
          ...textElement,
          name: name || "Text",
        };
        break;
      default:
        elementData = {
          timelineId,
          id: elementId,
          type,
          s,
          e: e || s + 1,
          name: name || "Element",
          props,
        };
        // Validate basic element parameters for custom types
        ValidationHelper.validateCreateElementParams(elementData);
        newElement = {
          ...elementData,
        };
        break;
    }

    return this.dataService.addElementToTimeline(timelineId, newElement);
  }

  editElement(options: EditElementOptions): {
    timelineId: string;
    elementId: string;
    element: TimelineElement;
    version: number;
  } {
    const { timelineId, elementId, updates } = options;

    // Validate basic IDs
    ValidationHelper.validateTimelineId(
      timelineId,
      (id) => !!this.dataService.getTimeline(id)
    );
    ValidationHelper.validateElementId(
      elementId,
      (id) => !!this.dataService.getElement(id)
    );

    // Validate updates object
    if (!updates || typeof updates !== "object") {
      throw new TimelineServiceError(
        "Updates must be a valid object",
        ServiceErrorCode.INVALID_INPUT,
        { updates }
      );
    }

    // Get the current element to validate against
    const currentElement = this.dataService.getElement(elementId);
    if (!currentElement) {
      throw new TimelineServiceError(
        `Element with ID "${elementId}" not found`,
        ServiceErrorCode.ELEMENT_NOT_FOUND,
        { elementId }
      );
    }

    // Validate timing updates
    if (updates.s !== undefined) {
      if (typeof updates.s !== "number" || updates.s < 0) {
        throw new TimelineServiceError(
          "Start time (s) must be a non-negative number",
          ServiceErrorCode.ELEMENT_TIMING_INVALID,
          { s: updates.s }
        );
      }

      // If end time is also being updated, validate the relationship
      const endTime = updates.e !== undefined ? updates.e : currentElement.e;
      if (updates.s >= endTime) {
        throw new TimelineServiceError(
          "Start time must be less than end time",
          ServiceErrorCode.ELEMENT_TIMING_INVALID,
          { s: updates.s, e: endTime }
        );
      }
    }

    if (updates.e !== undefined) {
      if (typeof updates.e !== "number") {
        throw new TimelineServiceError(
          "End time (e) must be a number",
          ServiceErrorCode.ELEMENT_TIMING_INVALID,
          { e: updates.e }
        );
      }

      // Validate against start time
      const startTime = updates.s !== undefined ? updates.s : currentElement.s;
      if (updates.e <= startTime) {
        throw new TimelineServiceError(
          "End time must be greater than start time",
          ServiceErrorCode.ELEMENT_TIMING_INVALID,
          { s: startTime, e: updates.e }
        );
      }
    }

    // Validate props updates based on element type
    if (updates.props) {
      const elementType = updates.type || currentElement.type;

      switch (elementType) {
        case TIMELINE_ELEMENT_TYPE.IMAGE:
          // Only validate if we have a complete ImageProps object or it's a partial update
          if (typeof updates.props === "object") {
            const mergedProps = { ...currentElement.props, ...updates.props };
            try {
              ValidationHelper.validateImageElementProps(
                mergedProps as ImageProps
              );
            } catch (error) {
              // Re-throw with more context for partial updates
              if (error instanceof TimelineServiceError) {
                throw new TimelineServiceError(
                  `Invalid image props update: ${error.message}`,
                  error.code,
                  { elementId, updates: updates.props }
                );
              }
              throw error;
            }
          }
          break;

        case TIMELINE_ELEMENT_TYPE.VIDEO:
          if (typeof updates.props === "object") {
            const mergedProps = { ...currentElement.props, ...updates.props };
            try {
              ValidationHelper.validateVideoElementProps(
                mergedProps as VideoProps
              );
            } catch (error) {
              if (error instanceof TimelineServiceError) {
                throw new TimelineServiceError(
                  `Invalid video props update: ${error.message}`,
                  error.code,
                  { elementId, updates: updates.props }
                );
              }
              throw error;
            }
          }
          break;

        case TIMELINE_ELEMENT_TYPE.AUDIO:
          if (typeof updates.props === "object") {
            const mergedProps = { ...currentElement.props, ...updates.props };
            try {
              ValidationHelper.validateAudioElementProps(
                mergedProps as AudioProps
              );
            } catch (error) {
              if (error instanceof TimelineServiceError) {
                throw new TimelineServiceError(
                  `Invalid audio props update: ${error.message}`,
                  error.code,
                  { elementId, updates: updates.props }
                );
              }
              throw error;
            }
          }
          break;

        case TIMELINE_ELEMENT_TYPE.TEXT:
          if (typeof updates.props === "object") {
            const mergedProps = { ...currentElement.props, ...updates.props };
            try {
              ValidationHelper.validateTextElementProps(
                mergedProps as TextProps
              );
            } catch (error) {
              if (error instanceof TimelineServiceError) {
                throw new TimelineServiceError(
                  `Invalid text props update: ${error.message}`,
                  error.code,
                  { elementId, updates: updates.props }
                );
              }
              throw error;
            }
          }
          break;
      }
    }

    // Validate element ID if it's being updated
    if (updates.id !== undefined) {
      ValidationHelper.validateElementId(updates.id);
    }

    // Validate timeline ID if it's being updated
    if (updates.timelineId !== undefined) {
      ValidationHelper.validateTimelineId(
        updates.timelineId,
        (id) => !!this.dataService.getTimeline(id)
      );
    }

    return this.dataService.updateElement(timelineId, elementId, updates);
  }

  deleteElement(
    timelineId: string,
    elementId: string
  ): { timelineId: string; elementId: string; version: number } {
    // Validate timeline and element IDs with existence checks
    ValidationHelper.validateTimelineId(
      timelineId,
      (id) => !!this.dataService.getTimeline(id)
    );
    ValidationHelper.validateElementId(
      elementId,
      (id) => !!this.dataService.getElement(id)
    );

    // Verify element belongs to the specified timeline
    const element = this.dataService.getElement(elementId);
    if (element && element.timelineId !== timelineId) {
      throw new TimelineServiceError(
        `Element "${elementId}" does not belong to timeline "${timelineId}"`,
        ServiceErrorCode.ELEMENT_INVALID,
        { elementId, timelineId, actualTimelineId: element.timelineId }
      );
    }

    return this.dataService.removeElementFromTimeline(timelineId, elementId);
  }

  splitElement(
    timelineId: string,
    elementId: string,
    splitTime: number
  ): { version: number } | undefined {
    const element = this.dataService.getElement(elementId);
    if (!element) {
      throw new TimelineServiceError(
        "Element not found",
        ServiceErrorCode.ELEMENT_NOT_FOUND,
        { elementId }
      );
    }

    ValidationHelper.validateSplitOperation(elementId, splitTime, element);
    let split1: TimelineElement;
    let split2: TimelineElement;

    switch (element.type) {
      case TIMELINE_ELEMENT_TYPE.CAPTION:
        const originalText = element.name || "";
        const originalTextArray = originalText.split(" ");
        if (originalTextArray?.length < 2) {
          return;
        }
        const percentage = (splitTime - element.s) / (element.e - element.s);
        split1 = {
          ...element,
          id: `e-${generateShortUuid()}`,
          s: element.s,
          e: splitTime,
          name: originalTextArray
            .slice(0, Math.floor(originalTextArray.length * percentage))
            .join(" "),
        };
        split2 = {
          ...element,
          id: `e-${generateShortUuid()}`,
          s: splitTime,
          e: element.e,
          name: originalTextArray
            .slice(
              Math.floor(originalTextArray.length * percentage),
              originalTextArray.length
            )
            .join(" "),
        };
        break;
      default:
        split1 = {
          ...element,
          id: `e-${generateShortUuid()}`,
          s: element.s,
          e: splitTime,
        };
        split2 = {
          ...element,
          id: `e-${generateShortUuid()}`,
          s: splitTime,
          e: element.e,
          props: {
            ...(element.props || {}),
            time: (element.props?.time || 0) + (splitTime - element.s),
          },
        };
        break;
    }

    // Remove original element and add split elements
    this.dataService.removeElementFromTimeline(timelineId, elementId);
    this.dataService.addElementToTimeline(timelineId, split1);
    const result = this.dataService.addElementToTimeline(timelineId, split2);

    return { version: result.version };
  }

  async addSoloElement({
    currentTime,
    timelineId,
    element,
  }: {
    currentTime: number;
    timelineId: string;
    element: TimelineElement;
  }): Promise<{
    timelineId: string;
    element: TimelineElement;
    version: number;
  }> {
    const soloElement: TimelineElement = {
      id: `e-${generateShortUuid()}`,
      type: element.type,
      name: element.name,
      s: currentTime,
      e: currentTime + 1,
      timelineId: element.timelineId,
      props: element.props,
    };

    let elementTimelineId = timelineId;
    if (elementTimelineId) {
      const selectedTimeline = this.dataService.getTimeline(timelineId);
      if (selectedTimeline?.type === TIMELINE_ELEMENT_TYPE.VIDEO) {
        soloElement.timelineId = elementTimelineId;
        return await this.addElement({
          timelineId: elementTimelineId,
          type: soloElement.type,
          props: soloElement.props,
          s: soloElement.s,
          e: soloElement.e,
          name: soloElement.name,
        });
      }
    }

    // Create new timeline for solo element
    elementTimelineId = `t-${generateShortUuid()}`;
    soloElement.timelineId = elementTimelineId;
    const newTimeline: Timeline = {
      id: elementTimelineId,
      type: "element",
      name: "element",
      elements: [soloElement],
    };

    const data = this.dataService.addTimeline(newTimeline);
    return {
      timelineId: elementTimelineId,
      element: soloElement,
      version: data.version,
    };
  }

  getElement(elementId: string): TimelineElement | undefined {
    return this.dataService.getElement(elementId);
  }
}
