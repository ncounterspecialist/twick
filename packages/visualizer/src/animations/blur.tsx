import { waitFor } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

export const BlurAnimation = {
  name: "blur",
  *run({
    elementRef,
    containerRef,
    interval,
    duration,
    animate,
  }: AnimationParams) {
    const ref = containerRef ?? elementRef;
    if (animate === "enter") {
      ref().filters.blur(25);
      yield* ref().filters.blur(0, interval);
    } else if (animate === "exit") {
      yield* waitFor(duration - interval);
      yield* ref().filters.blur(25, interval);
    } else if (animate === "both") {
      ref().filters.blur(25);
      yield* ref().filters.blur(0, interval);
      yield* waitFor(duration - interval);
      yield* ref().filters.blur(25, interval);
    }
  },
};
