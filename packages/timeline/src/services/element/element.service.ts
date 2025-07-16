import {
  Timeline,
  TimelineElement,
  ImageProps,
  VideoProps,
  AudioProps,
  TextProps,
  AddElementOptions,
  EditElementOptions,
} from "../../types";
import {
  TIMELINE_ELEMENT_TYPE,
} from "../../utils/constants";
import { generateShortUuid } from "../../utils/timeline.utils";
import {
  createAudioElement,
  createImageElement,
  createTextElement,
  createVideoElement,
} from "../../utils/element.utils";
import { TimelineDataService } from "../timeline/timeline-data.service";
import { ServiceResult, ServiceResultHelper } from "../../utils/service-results";
import { ValidationHelper } from "../../utils/validation";

/**
 * Internal service for managing timeline elements
 * Used internally by the singleton TimelineService
 */
export class ElementService {
  constructor(
    private dataService: TimelineDataService,
    private getConfig: () => { videoSize: { width: number; height: number } } | null
  ) {}

  async addElement(options: AddElementOptions): Promise<{
    timelineId: string;
    element: TimelineElement;
    version: number;
  }> {
    try {
      // Validate input
      ValidationHelper.validateAddElementOptions(options);
    } catch (error) {
      console.warn('Invalid add element options:', error);
      throw error;
    }
    
    // Check if timeline exists
    const timeline = this.dataService.getTimeline(options.timelineId);
    if (!timeline) {
      throw new Error(`Timeline with ID "${options.timelineId}" not found`);
    }

    const { timelineId, type, props, s , e, name } = options;
    const config = this.getConfig();
    const videoSize = config?.videoSize || { width: 1920, height: 1080 };

    let newElement: TimelineElement;

    switch (type) {
      case TIMELINE_ELEMENT_TYPE.IMAGE:
        const imageElement = await createImageElement({
          props: props as ImageProps,
          s,
          e,
          videoSize,
          timelineId,
          id: `e-${generateShortUuid()}`,
        });
        newElement = {
          ...imageElement,
          name: name || "Image",
        };
        break;
      case TIMELINE_ELEMENT_TYPE.VIDEO:
        const videoElement = await createVideoElement({
          props: props as VideoProps,
          s,
          e,
          videoSize,
          timelineId,
          id: `e-${generateShortUuid()}`,
        });
        newElement = {
          ...videoElement,
          name: name || "Video",
        };
        break;
      case TIMELINE_ELEMENT_TYPE.AUDIO:
        const audioElement = await createAudioElement({
          props: props as AudioProps,
          s,
          e,
          timelineId,
          id: `e-${generateShortUuid()}`,
        });
        newElement = {
          ...audioElement,
          name: name || "Audio",
        };
        break;
      case TIMELINE_ELEMENT_TYPE.TEXT:
        const textElement = await createTextElement({
          props: props as TextProps,
          s,
          e: e || s + 1,
          timelineId,
          id: `e-${generateShortUuid()}`,
        });
        newElement = {
          ...textElement,
          name: name || "Text",
        };
        break;
      default:
        newElement = {
          id: `e-${generateShortUuid()}`,
          type,
          s,
          e: e || s + 1,
          timelineId,
          name: name || "Element",
          props,
        };
        break;
    }

    return this.dataService.addElementToTimeline(timelineId, newElement);
  }

  async addElementSafe(options: AddElementOptions): Promise<ServiceResult<{
    timelineId: string;
    element: TimelineElement;
    version: number;
  }>> {
    try {
      const result = await this.addElement(options);
      return ServiceResultHelper.success(result);
    } catch (error) {
      return ServiceResultHelper.fromError(error as Error);
    }
  }

  editElement(options: EditElementOptions): {
    timelineId: string;
    elementId: string;
    element: TimelineElement;
    version: number;
  } {
    const { timelineId, elementId, updates } = options;
    return this.dataService.updateElement(timelineId, elementId, updates);
  }

  deleteElement(
    timelineId: string,
    elementId: string
  ): { timelineId: string; elementId: string; version: number } {
    return this.dataService.removeElementFromTimeline(timelineId, elementId);
  }

  splitElement(timelineId: string, elementId: string, splitTime: number): { version: number } | undefined {
    const element = this.dataService.getElement(elementId);
    if (!element || element.s > splitTime || element.e < splitTime) {
      return;
    }

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