import { Timeline, TimelineElement } from "../types";
import { DEFAULT_ELEMENT_COLORS, ElementColors } from "./constants";

export let ELEMENT_COLORS: ElementColors = { ...DEFAULT_ELEMENT_COLORS };

export const setElementColors = (colors: Partial<ElementColors>) => {
  ELEMENT_COLORS = {
    ...DEFAULT_ELEMENT_COLORS,
    ...colors,
  };
};
export function formatTime(seconds: number) {
  const ms = Math.floor((seconds % 1) * 1000)
    .toString()
    .padStart(3, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  const m = Math.floor(seconds / 60).toString();
  return `${m}:${s}.${ms}`;
}

export const getDecimalNumber = (num: number, precision = 3) => {
  return Number(num.toFixed(precision));
};

export function getTotalDuration(timeline: Timeline[]) {
  return (timeline || []).reduce(
    (maxDuration, timeline) =>
      Math.max(
        maxDuration,
        (timeline?.elements || []).reduce(
          (timelineDuration, element) => Math.max(timelineDuration, element.e),
          0
        )
      ),
    0
  );
}

export function generateShortUuid(): string {
  return "xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getCurrentElements = (
  currentTime: number,
  timeline: Timeline[]
) => {
  const currentElements: Array<TimelineElement & { timelineType?: string }> =
    [];
  if (timeline?.length) {
    for (let i = 0; i < timeline.length; i++) {
      if (timeline[i]) {
        for (let j = 0; j < timeline[i].elements.length; j++) {
          const element = timeline[i].elements[j];
          if ((element.s <= currentTime) && element.e >= currentTime) {
            currentElements.push({
              ...element,
              timelineId: timeline[i].id,
              timelineType: timeline[i].type,
            });
          }
        }
      }
    }
  }
  return currentElements;
}; 

export const isTimelineId = (id: string) => id.startsWith("t-");