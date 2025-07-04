import {
  Timeline,
  TimelineElement,
  TimelineData,
  ImageProps,
  VideoProps,
  AudioProps,
  TextProps,
  TimelineServiceConfig,
  AddElementOptions,
  EditElementOptions,
  AnimationOptions,
  CaptionProps,
} from "../types";
import {
  TIMELINE_ELEMENT_TYPE,
} from "../helpers/constants";
import { getTotalDuration, generateShortUuid } from "../helpers/timeline.utils";
import {
  createAudioElement,
  createImageElement,
  createTextElement,
  createVideoElement,
} from "../helpers/element.utils";

class TimelineService {
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
    return this.timelineData?.timeline.find(
      (t: Timeline) => t.id === timelineId
    );
  }

  getAllTimelines(): Timeline[] {
    return this.timelineData?.timeline || [];
  }

  setTimeline = (timeline: Timeline[], version?: number) => {
    const updatedVersion = version ?? (this.timelineData?.version || 0) + 1;
    const updatedTimelineData = {
      timeline: timeline,
      version: updatedVersion,
    };

    this.timelinePropsMap = {};
    this.elementKeyMap = {};
    timeline.forEach((timeline) => {
      this.timelinePropsMap[timeline.id] = timeline.props;
      timeline.elements.forEach((element) => {
        this.elementKeyMap[element.id] = element;
      });
    });
    this.timelineData = updatedTimelineData;
    this.config?.onTimelineUpdate?.(updatedTimelineData);
    return updatedTimelineData as TimelineData;
  };

  // Create a new timeline
  addTimeline = (timeline: Timeline) => {
    const updatedTimelines = [...(this.timelineData?.timeline || []), timeline];
    this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(timeline);
    return {
      timelineId: timeline.id,
      timeline: timeline,
      version: this.timelineData?.version,
    };
  };

  editTimeline(
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
    const { version } = this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(updatedTimeline || null);
    return { timelineId, timeline: updatedTimeline, version };
  }

  // Delete a timeline
  deleteTimeline = (timelineId: string) => {
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
    const version = this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(null);
    return { timelineId: timelineId, version };
  };

  addNewTimeline = (timelineData: Timeline | undefined) => {
    const newTimelineId = `t-${generateShortUuid()}`;
    const newTimeline: Timeline = {
      id: newTimelineId,
      type: "element",
      name: "element",
      ...timelineData,
      elements: timelineData?.elements?.length
        ? timelineData.elements.map((element) => {
            const newElement = {
              ...element,
              id: element.id || `e-${generateShortUuid()}`,
              timelineId: newTimelineId,
            };
            this.elementKeyMap[newElement.id] = newElement;
            return newElement;
          })
        : [],
    };
    this.config?.onSelectionChange?.(newTimeline);
    return this.addTimeline(newTimeline);
  };

  updateCaptionTimeline = (captionData: any) => {
    const existingTimeline = (this.timelineData?.timeline || []).find(
      ({ type }) => type == "caption"
    );
    let timelineId;
    if (existingTimeline) {
      for (const element of existingTimeline.elements) {
        delete this.elementKeyMap[element.id];
      }
      timelineId = existingTimeline.id;
    } else {
      timelineId = `t-${generateShortUuid()}`;
    }

    const captionTimeline = {
      id: timelineId,
      type: "caption",
      name: "caption",
      props: captionData.props,
      elements: (captionData.captions || []).map((caption: any) => {
        const phraseElement = {
          id: caption.id || `e-${generateShortUuid()}`,
          type: "caption",
          s: caption.s,
          e: caption.e,
          timelineId: timelineId,
          name: caption.t,
          props: caption.props ? caption.props : undefined,
        };
        this.elementKeyMap[phraseElement.id] = phraseElement;
        return phraseElement;
      }),
    };
    if (existingTimeline) {
      return this.editTimeline(timelineId, captionTimeline);
    } else {
      return this.addTimeline(captionTimeline);
    }
  };

  // Element Management
  async addElement(options: AddElementOptions): Promise<{
    timelineId: string;
    element: TimelineElement;
    version: number;
  }> {
    const { timelineId, type, props, timing, name } = options;

    let newElement: TimelineElement;

    switch (type) {
      case TIMELINE_ELEMENT_TYPE.IMAGE:
        const imageElement = await createImageElement({
          props: props as ImageProps,
          timing,
          videoSize: this.config!.videoSize,
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
          timing,
          videoSize: this.config!.videoSize,
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
          timing,
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
          timing,
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
          s: timing.s,
          e: timing.e || timing.s + 1,
          timelineId,
          name: name || "Element",
          props,
        };
        break;
    }

    this.elementKeyMap[newElement.id] = newElement;

    const updatedTimelines =
      this.timelineData?.timeline?.map((timeline: Timeline) =>
        timeline.id === timelineId
          ? { ...timeline, elements: [...timeline.elements, newElement] }
          : timeline
      ) || [];

    const { version } = this.setTimeline(updatedTimelines);

    this.config?.onSelectionChange?.(newElement);
    return { timelineId, element: newElement, version };
  }

  editElement(options: EditElementOptions): {
    timelineId: string;
    elementId: string;
    element: TimelineElement;
    version: number;
  } {
    const { timelineId, elementId, updates } = options;

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

    const { version } = this.setTimeline(updatedTimelines);

    this.config?.onSelectionChange?.(this.elementKeyMap[elementId]);
    return {
      timelineId,
      elementId,
      element: this.elementKeyMap[elementId],
      version,
    };
  }

  deleteElement(
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

    const { version } = this.setTimeline(updatedTimelines);

    this.config?.onSelectionChange?.(null);
    return { timelineId, elementId, version };
  }

  // Edit an element in a timeline
  splitElement = (timelineId: string, elementId: string, splitTime: number) => {
    const element = this.elementKeyMap[elementId];
    if (!element || element.s > splitTime || element.e < splitTime) {
      return;
    }

    let split1;
    let split2;
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

    const updatedTimelines =
      this.timelineData?.timeline?.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              elements: timeline.elements
                .map((el) => {
                  if (el.id === element.id) {
                    return [split1, split2];
                  }
                  return el;
                })
                .flat(),
            }
          : timeline
      ) || [];
    delete this.elementKeyMap[element.id];
    this.elementKeyMap[split1.id] = split1;
    this.elementKeyMap[split2.id] = split2;
    this.config?.onSelectionChange?.(split1);
    const version = this.setTimeline(updatedTimelines);
    return { version };
  };

  editCaptionProps = ({
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
  }) => {
    const element = this.elementKeyMap[elementId];
    if (!element) {
      return {
        timelineId,
        elementId,
        element: undefined,
        updatedCaptionProps: undefined,
        version: this.timelineData?.version,
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

    const updatedTimelines =
      this.timelineData?.timeline?.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              props: finalCaptionProps,
              elements: timeline.elements.map((el) => {
                let changedElement;
                if (el.id === elementId) {
                  changedElement = {
                    ...el,
                    ...updates,
                    props: finalPropUpdates,
                  };
                  this.elementKeyMap[el.id] = changedElement;
                } else {
                  if (applyPropsToAllSubtitle) {
                    changedElement = { ...el, props: finalPropUpdates };
                    this.elementKeyMap[el.id] = changedElement;
                  } else {
                    changedElement = el;
                  }
                }
                return changedElement;
              }),
            }
          : timeline
      ) || [];

    const { version } = this.setTimeline(updatedTimelines);

    return {
      timelineId,
      elementId,
      element: this.elementKeyMap[elementId],
      updatedCaptionProps: applyPropsToAllSubtitle
        ? finalCaptionProps
        : undefined,
      version,
    };
  };

  // Animation Management
  setElementAnimation(options: AnimationOptions): {
    timelineId: string;
    elementId: string;
    element: TimelineElement | null;
    version: number;
  } {
    const { timelineId, elementId, animation } = options;

    const updatedTimelines =
      this.timelineData?.timeline?.map((timeline: Timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              elements: timeline.elements.map((el) => {
                if (el.id === elementId) {
                  const updatedElement = {
                    ...el,
                    animation: animation || undefined,
                  };
                  this.elementKeyMap[elementId] = updatedElement;
                  return updatedElement;
                }
                return el;
              }),
            }
          : timeline
      ) || [];

    const { version } = this.setTimeline(updatedTimelines);
    this.config?.onSelectionChange?.(this.elementKeyMap[elementId]);
    return {
      timelineId,
      elementId,
      element: this.elementKeyMap[elementId],
      version,
    };
  }

  // add solo element
  addSoloElement = async ({
    currentTime,
    timelineId,
    element,
  }: {
    currentTime: number;
    timelineId: string;
    element: TimelineElement;
  }) => {
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
      const selectedTimeline = this.timelineData?.timeline?.find(
        (timeline) => timeline.id === timelineId
      );
      if (selectedTimeline?.type === TIMELINE_ELEMENT_TYPE.VIDEO) {
        soloElement.timelineId = elementTimelineId;

        this.elementKeyMap[soloElement.id] = soloElement;
        return await this.addElement({
          timelineId: elementTimelineId,
          type: soloElement.type,
          props: soloElement.props,
          timing: { s: soloElement.s, e: soloElement.e },
          name: soloElement.name,
        });
      }
    }
    elementTimelineId = `t-${generateShortUuid()}`;
    soloElement.timelineId = elementTimelineId;
    const newTimeline: Timeline = {
      id: elementTimelineId,
      type: "element",
      name: "element",
      elements: [soloElement],
    };
    this.elementKeyMap[soloElement.id] = soloElement;
    const data = this.addTimeline(newTimeline);
    this.config?.onSelectionChange?.(soloElement);
    return {
      timelineId: elementTimelineId,
      element: soloElement,
      version: data.version,
    };
  };

  // Utility Methods
  getElement(elementId: string): TimelineElement | undefined {
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

  updateMaps(timeline: Timeline[]): void {
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

const timelineService = new TimelineService();
export default timelineService;
