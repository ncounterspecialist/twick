import { ElementColors } from "./types";

export const INITIAL_TIMELINE_DATA =    {
    timeline: [
      {
        type: "element",
        id: "t-sample",
        name: "sample",
        elements: [
          {
            id: "e-sample",
            timelineId: "t-sample",
            name: "sample",
            type: "text",
            s: 0,
            e: 5,
            props: {
              text: "Twick Video Editor",
              fill: "#FFFFFF",
            },
          },
        ],
      },
    ],
    version: 0,
  }

  export const MIN_DURATION = 0.1;

  export const DRAG_TYPE = {
    START: "start",
    MOVE: "move",
    END: "end",
  };

export const DEFAULT_TIMELINE_ZOOM = 1.5;

export const DEFAULT_ELEMENT_COLORS: ElementColors = {
  fragment: "#111111",
  video: "#4B2E83", // Muted deep violet (primary purple tone)
  caption: "#5C5470", // Faded violet/blue
  image: "#805A38", // Earthy brown-orange
  audio: "#3C665B", // Dark muted teal-green
  text: "#375A7F", // Dusty steel blue
  element: "#6B3A5B", // Muted berry purple
  rect: "#4C3A72", // Desaturated deep indigo
  frameEffect: "#703C57", // Dusty rose/maroon
  filters: "#5A4C82", // Muted twilight purple
  transition: "#7A573A", // Toasted copper
  animation: "#32645C", // Slate pine green
};