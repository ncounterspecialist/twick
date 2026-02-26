import type { CanvasElementHandler } from "../types";
import { ELEMENT_TYPES } from "../helpers/constants";

export const EffectElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.EFFECT,

  async add() {
    // Effect elements are global/post-processing only and do not render
    // any Fabric objects on the editing canvas. Selection and editing
    // are handled via the timeline UI.
    return;
  },
};

