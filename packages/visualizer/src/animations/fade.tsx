import { waitFor } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

export const FadeAnimation = {
  name: "fade",
  *run({ elementRef, containerRef, interval, duration, animate }: AnimationParams) {
    const ref = containerRef ?? elementRef;
    if (animate === "enter") {
      ref().opacity(0);
      yield* ref().opacity(1, interval);  
    } else if (animate === "exit") {
      yield* waitFor(duration - interval);
      yield* ref().opacity(0, interval);
    } else if (animate === "both") {
      ref().opacity(0);
      yield* ref().opacity(1, interval);
      yield* waitFor(duration - interval);
      yield* ref().opacity(0, interval);
    }
  },
};
