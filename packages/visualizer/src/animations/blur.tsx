import { waitFor } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

export const BlurAnimation = {
  name: "blur",
  *run({
    elementRef,
    containerRef,
    interval,
    duration,
    intensity = 25,
    animate,
  }: AnimationParams) {
    const ref = containerRef ?? elementRef;
    if (animate === "enter") {
      ref().filters.blur(intensity);
      yield* ref().filters.blur(0, interval);
    } else if (animate === "exit") {
      yield* waitFor(duration - interval);
      yield* ref().filters.blur(intensity, interval);
    } else if (animate === "both") {
      ref().filters.blur(intensity);
      yield* ref().filters.blur(0, interval);
      yield* waitFor(duration - interval);
      yield* ref().filters.blur(intensity, interval);
    }
  },
};
