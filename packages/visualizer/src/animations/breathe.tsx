import { Vector2 } from "@revideo/core";
import { logger } from "../helpers/log.utils";
import { AnimationParams } from "../helpers/types";
import { getTimingFunction } from "../helpers/timing.utils";

export const BreatheAnimation = {
  name: "breathe",
  *run({ elementRef, containerRef, mode, duration }: AnimationParams) {
    const ref = containerRef ?? elementRef;
    const scale = ref().scale();
    if (mode === "in") {
      yield* ref().scale(new Vector2(scale.x * 0.5, scale.y * 0.5), duration, getTimingFunction("easeInSine"));
    }
    if (mode === "out") {
      ref().scale(new Vector2(scale.x * 0.5, scale.y * 0.5));
      yield* ref().scale(new Vector2(scale.x * 1, scale.y * 1), duration, getTimingFunction("easeOutSine"));
    }
  },
};
