import { all, waitFor, delay } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

export const RiseAnimation = {
  name: "rise",
  *run({
    elementRef,
    containerRef,
    interval = 0.25,
    duration,
    animate,
    direction = "top",
    intensity = 200,
  }: AnimationParams) {
    const ref = containerRef ?? elementRef;
    const pos = ref().position();
    if (animate === "enter") {
      ref().opacity(0);
      if (direction === "top") {
        ref().y(pos.y + intensity);
        yield* all(ref().opacity(1, interval / 4), ref().y(pos.y, interval));
      } else if (direction === "bottom") {
        ref().y(pos.y - intensity);
        yield* all(ref().opacity(1, interval / 4), ref().y(pos.y, interval));
      }
    } else if (animate === "exit") {
      yield* waitFor(duration - interval);
      if (direction === "top") {
        yield* all(
          delay((3 * interval) / 4, ref().opacity(0, interval / 4)),
          ref().y(pos.y - intensity, interval)
        );
      } else if (direction === "bottom") {
        yield* all(
          delay((3 * interval) / 4, ref().opacity(0, interval / 4)),
          ref().y(pos.y + intensity, interval)
        );
      }
    } else if (animate === "both") {
      ref().opacity(0);
      if (direction === "top") {
        ref().y(pos.y + intensity);
        yield* all(ref().opacity(1, interval / 4), ref().y(pos.y, interval));
        yield* waitFor(duration - interval);
        yield* all(
          delay((3 * interval) / 4, ref().opacity(0, interval / 4)),
          ref().y(pos.y - intensity, interval)
        );
      } else if (direction === "bottom") {
        ref().y(pos.y - intensity);
        yield* all(ref().opacity(1, interval / 4), ref().y(pos.y, interval));
        yield* waitFor(duration - interval);
        yield* all(
          delay((3 * interval) / 4, ref().opacity(0, interval / 4)),
          ref().y(pos.y + intensity, interval)
        );
      }
    }
  },
};
