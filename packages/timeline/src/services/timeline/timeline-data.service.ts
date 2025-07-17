import {
  Timeline,
  TimelineElement,
  TimelineData,
  TimelineServiceConfig,
} from "../../types";
import { getTotalDuration } from "../../utils/timeline.utils";
import { ValidationHelper } from "../../utils/validation";

/**
 * Internal service for managing timeline data state
 * Used internally by the singleton TimelineService
 */
export class TimelineDataService {
  private timelineData: TimelineData | null = null;
  private elementKeyMap: Record<string, TimelineElement> = {};
  private timelinePropsMap: Record<string, any> = {};
  private config: TimelineServiceConfig | null = null;

  constructor() {}

  initialize(config: TimelineServiceConfig): void {
    this.config = config;
  }

  getTimelineData(): TimelineData | null {
    return this.timelineData;
  }

  getTimeline(timelineId: string): Timeline | undefined {
    ValidationHelper.validateTimelineId(timelineId);  
    return this.timelineData?.timeline.find(
      (t: Timeline) => t.id === timelineId
    );
  }

  getAllTimelines(): Timeline[] {
    return this.timelineData?.timeline || [];
  }

  getElement(elementId: string): TimelineElement | undefined {
    ValidationHelper.validateElementId(elementId);
    return this.elementKeyMap[elementId];
  }

  getTimelineProps(timelineId: string): any {
    return this.timelinePropsMap[timelineId];
  }

  getTotalDuration(): number {
    return this.timelineData?.timeline
      ? getTotalDuration(this.timelineData.timeline)
      : 0;
  }

  getConfig(): TimelineServiceConfig | null {
    return this.config;
  }

  setTimeline(timeline: Timeline[], version?: number): TimelineData {
    const updatedVersion = version ?? (this.timelineData?.version || 0) + 1;
    const updatedTimelineData = {
      timeline: timeline,
      version: updatedVersion,
    };

    this.updateMaps(timeline);
    this.timelineData = updatedTimelineData;
    this.config?.onTimelineUpdate?.(updatedTimelineData);
    return updatedTimelineData as TimelineData;
  }

  addTimeline(timeline: Timeline): {
    timelineId: string;
    timeline: Timeline;
    version: number;
  } {
    const updatedTimelines = [...(this.timelineData?.timeline || []), timeline];
    const timelineData = this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(timeline);
    return {
      timelineId: timeline.id,
      timeline: timeline,
      version: timelineData.version,
    };
  }

  updateTimeline(
    timelineId: string,
    updates: Partial<Timeline>
  ): { timelineId: string; timeline: Timeline | undefined; version: number } {
    let updatedTimeline: Timeline | undefined;
    const updatedTimelines =
      this.timelineData?.timeline?.map((timeline: Timeline) => {
        if (timeline.id === timelineId) {
          updatedTimeline = { ...timeline, ...updates };
          this.timelinePropsMap[timelineId] = updatedTimeline.props;
          return updatedTimeline;
        }
        return timeline;
      }) || [];
    
    const timelineData = this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(updatedTimeline || null);
    return { timelineId, timeline: updatedTimeline, version: timelineData.version };
  }

  deleteTimeline(timelineId: string): { timelineId: string; version: number } {
    // Clean up element maps for this timeline
    this.timelineData?.timeline
      ?.find((timeline) => timeline.id === timelineId)
      ?.elements.forEach((element) => {
        delete this.elementKeyMap[element.id];
      });

    const updatedTimelines =
      this.timelineData?.timeline?.filter(
        (timeline) => timeline.id !== timelineId
      ) || [];
    
    delete this.timelinePropsMap[timelineId];
    const timelineData = this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(null);
    return { timelineId: timelineId, version: timelineData.version };
  }

  updateElement(
    timelineId: string,
    elementId: string,
    updates: Partial<TimelineElement>
  ): { timelineId: string; elementId: string; element: TimelineElement; version: number } {
    const updatedTimelines =
      this.timelineData?.timeline?.map((timeline: Timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              elements: timeline.elements.map((el) => {
                if (el.id === elementId) {
                  const updatedElement = { ...el, ...updates };
                  this.elementKeyMap[elementId] = updatedElement;
                  return updatedElement;
                }
                return el;
              }),
            }
          : timeline
      ) || [];

    const timelineData = this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(this.elementKeyMap[elementId]);
    return {
      timelineId,
      elementId,
      element: this.elementKeyMap[elementId],
      version: timelineData.version,
    };
  }

  addElementToTimeline(
    timelineId: string,
    element: TimelineElement
  ): { timelineId: string; element: TimelineElement; version: number } {
    this.elementKeyMap[element.id] = element;

    const updatedTimelines =
      this.timelineData?.timeline?.map((timeline: Timeline) =>
        timeline.id === timelineId
          ? { ...timeline, elements: [...timeline.elements, element] }
          : timeline
      ) || [];

    const timelineData = this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(element);
    return { timelineId, element, version: timelineData.version };
  }

  removeElementFromTimeline(
    timelineId: string,
    elementId: string
  ): { timelineId: string; elementId: string; version: number } {
    delete this.elementKeyMap[elementId];

    const updatedTimelines =
      this.timelineData?.timeline?.map((timeline: Timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              elements: timeline.elements.filter((el) => el.id !== elementId),
            }
          : timeline
      ) || [];

    const timelineData = this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(null);
    return { timelineId, elementId, version: timelineData.version };
  }

  private updateMaps(timeline: Timeline[]): void {
    this.timelinePropsMap = {};
    this.elementKeyMap = {};
    timeline.forEach((timeline: Timeline) => {
      this.timelinePropsMap[timeline.id] = timeline.props;
      timeline.elements.forEach((element) => {
        this.elementKeyMap[element.id] = element;
      });
    });
  }
} 