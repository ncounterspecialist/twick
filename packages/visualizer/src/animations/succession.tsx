import { all, delay, Vector2, waitFor } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

export const SuccessionAnimation = {
  name: "succession",
  *run({ elementRef, containerRef, interval, duration, animate }: AnimationParams) {
    const ref = containerRef ?? elementRef;
    const scale = ref().scale();
    if (animate === "enter") {
      ref().opacity(0);
      ref().scale(new Vector2(scale.x/2, scale.y/2));
      yield* all(ref().scale(scale, interval), ref().opacity(1, interval/2));
    } else if (animate === "exit") {
      yield* waitFor(duration - interval);
      yield* all(ref().scale(new Vector2(scale.x/2, scale.y/2), interval), delay(interval/2, ref().opacity(0, interval/2)));
    } else if (animate === "both") {
      ref().opacity(0);
      ref().scale(new Vector2(scale.x/2, scale.y/2));
      yield* all(ref().scale(scale, interval), ref().opacity(1, interval/2));
      yield* waitFor(duration - interval);
      yield* all(ref().scale(new Vector2(scale.x/2, scale.y/2), interval), delay(interval/2, ref().opacity(0, interval/2)));
    }
  },
};
