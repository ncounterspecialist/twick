import { Vector2 } from "@revideo/core";
import { AnimationParams } from "../helpers/types";
import { getTimingFunction } from "../helpers/timing.utils";

export const PhotoZoomAnimation = {
  name: "photo-zoom",
  *run({ elementRef, containerRef, mode, duration }: AnimationParams) {
    if (containerRef) {
      const scale = elementRef().scale();
      if (mode === "in") {
        yield* elementRef().scale(
          new Vector2(scale.x * 0.5, scale.y * 0.5),
          duration,
          getTimingFunction("easeInSine")
        );
      }
      if (mode === "out") {
        elementRef().scale(new Vector2(scale.x * 0.5, scale.y * 0.5));
        yield* elementRef().scale(
          new Vector2(scale.x * 1, scale.y * 1),
          duration,
          getTimingFunction("easeOutSine")
        );
      }
    }
  },
};
