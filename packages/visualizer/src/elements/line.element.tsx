import { ElementParams } from "../helpers/types";
import { RectElement } from "./rect.element";

/**
 * LineElement: visualizer representation for line/segment shapes.
 * Uses the same renderer as RectElement so width/height/fill/rotation
 * map directly to the exported video.
 */
export const LineElement = {
  name: "line",

  *create(params: ElementParams) {
    // Delegate to RectElement to reuse rendering and animation behavior.
    yield* RectElement.create(params);
  },
};

