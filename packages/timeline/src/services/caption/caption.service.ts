import {
  Timeline,
  TimelineElement,
  CaptionProps,
} from "../../types";
import { generateShortUuid } from "../../utils/timeline.utils";
import { TimelineDataService } from "../timeline/timeline-data.service";

/**
 * Internal service for managing captions
 * Used internally by the singleton TimelineService
 */
export class CaptionService {
  constructor(private dataService: TimelineDataService) {}

  updateCaptionTimeline(captionData: any): {
    timelineId: string;
    timeline: Timeline | undefined;
    version: number;
  } {
    const existingTimeline = this.dataService.getAllTimelines().find(
      ({ type }) => type === "caption"
    );
    
    let timelineId: string;
    if (existingTimeline) {
      // Clean up existing elements
      for (const element of existingTimeline.elements) {
        this.dataService.removeElementFromTimeline(existingTimeline.id, element.id);
      }
      timelineId = existingTimeline.id;
    } else {
      timelineId = `t-${generateShortUuid()}`;
    }

    const captionTimeline: Timeline = {
      id: timelineId,
      type: "caption",
      name: "caption",
      props: captionData.props,
      elements: (captionData.captions || []).map((caption: any) => {
        const phraseElement: TimelineElement = {
          id: caption.id || `e-${generateShortUuid()}`,
          type: "caption",
          s: caption.s,
          e: caption.e,
          timelineId: timelineId,
          name: caption.t,
          props: caption.props ? caption.props : undefined,
        };
        return phraseElement;
      }),
    };

    if (existingTimeline) {
      return this.dataService.updateTimeline(timelineId, captionTimeline);
    } else {
      return this.dataService.addTimeline(captionTimeline);
    }
  }

  editCaptionProps({
    timelineId,
    elementId,
    updates,
    captionProps,
    applyPropsToAllSubtitle,
  }: {
    timelineId: string;
    elementId: string;
    updates: Partial<TimelineElement>;
    captionProps: CaptionProps;
    applyPropsToAllSubtitle: boolean;
  }): {
    timelineId: string;
    elementId: string;
    element: TimelineElement | undefined;
    updatedCaptionProps: CaptionProps | undefined;
    version: number;
  } {
    const element = this.dataService.getElement(elementId);
    if (!element) {
      return {
        timelineId,
        elementId,
        element: undefined,
        updatedCaptionProps: undefined,
        version: this.dataService.getTimelineData()?.version || 0,
      };
    }

    const finalPropUpdates: Record<string, any> = {};
    const finalCaptionProps = { ...(captionProps as Record<string, any>) };

    if (updates.props) {
      Object.keys(updates.props).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(finalCaptionProps, prop)) {
          switch (prop) {
            case "pos":
              if (
                finalCaptionProps.pos?.x !== (updates.props as any)?.pos?.x ||
                finalCaptionProps.pos?.y !== (updates.props as any)?.pos?.y
              ) {
                if (applyPropsToAllSubtitle) {
                  finalCaptionProps.pos = (updates.props as any).pos;
                } else {
                  finalPropUpdates.pos = (updates.props as any).pos;
                }
              }
              break;
            case "font":
              {
                if (
                  finalCaptionProps.font?.size !==
                    (updates.props as any)?.font?.size ||
                  finalCaptionProps.font?.family !==
                    (updates.props as any)?.font?.family
                ) {
                  if (applyPropsToAllSubtitle) {
                    finalCaptionProps.font = {
                      ...finalCaptionProps.font,
                      ...(updates.props as any).font,
                    };
                  } else {
                    finalPropUpdates.font = (updates.props as any).font;
                  }
                }
              }
              break;
            case "colors":
              {
                if (
                  finalCaptionProps.colors?.text !==
                    (updates.props as any)?.colors?.text ||
                  finalCaptionProps.colors?.highlight !==
                    (updates.props as any)?.colors?.highlight ||
                  finalCaptionProps.colors?.bgColor !==
                    (updates.props as any)?.colors?.bgColor
                ) {
                  if (applyPropsToAllSubtitle) {
                    finalCaptionProps.colors = {
                      ...finalCaptionProps.colors,
                      ...(updates.props as any).colors,
                    };
                  } else {
                    finalPropUpdates.colors = (updates.props as any).colors;
                  }
                }
              }
              break;
            case "capStyle": {
              if (
                finalCaptionProps.capStyle !== (updates.props as any)?.capStyle
              ) {
                if (applyPropsToAllSubtitle) {
                  finalCaptionProps.capStyle = (updates.props as any).capStyle;
                } else {
                  finalPropUpdates.capStyle = (updates.props as any).capStyle;
                }
              }
            }
          }
        } else {
          finalPropUpdates[prop] = (updates.props as any)[prop];
        }
      });
    }

    // Update timeline props if applying to all subtitles
    if (applyPropsToAllSubtitle) {
      this.dataService.updateTimeline(timelineId, { props: finalCaptionProps });
      
      // Update all elements in the timeline
      const timeline = this.dataService.getTimeline(timelineId);
      if (timeline) {
        timeline.elements.forEach((el) => {
          if (el.id !== elementId) {
            this.dataService.updateElement(timelineId, el.id, { props: finalPropUpdates });
          }
        });
      }
    }

    // Update the specific element
    const result = this.dataService.updateElement(timelineId, elementId, {
      ...updates,
      props: finalPropUpdates,
    });

    return {
      timelineId: result.timelineId,
      elementId: result.elementId,
      element: result.element,
      updatedCaptionProps: applyPropsToAllSubtitle ? finalCaptionProps as CaptionProps : undefined,
      version: result.version,
    };
  }
} 