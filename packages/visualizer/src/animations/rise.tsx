import { all, waitFor, delay } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

/**
 * RiseAnimation combines vertical motion and opacity transitions
 * to create a "rising" (or "falling") appearance/disappearance effect.
 *
 * Available animation modes:
 * - "enter": Starts offset and transparent, moves into position while fading in.
 * - "exit": Waits, then moves out of position while fading out.
 * - "both": Enters, waits, and exits in a continuous sequence.
 *
 * @param elementRef - Reference to the main element to animate.
 * @param containerRef - Optional reference to a container element.
 * @param interval - Duration of movement and opacity transitions (default: 0.25).
 * @param duration - Total duration of the animation.
 * @param animate - Animation phase ("enter" | "exit" | "both").
 * @param direction - Direction to animate ("top" or "bottom").
 * @param intensity - Number of units to offset position vertically (default: 200).
 */
export const RiseAnimation = {
  name: "rise",

  /**
   * Generator function controlling the rise/fall animation.
   */
  *run({
    elementRef,
    containerRef,
    interval = 0.25,
    duration,
    animate,
    direction = "top",
    intensity = 200,
  }: AnimationParams) {
    // Use containerRef if provided, otherwise fallback to elementRef
    const ref = containerRef ?? elementRef;

    // Get the element's current position
    const pos = ref().position();

    if (animate === "enter") {
      // Start fully transparent
      ref().opacity(0);

      if (direction === "top") {
        // Offset element below final position
        ref().y(pos.y + intensity);
        // Animate moving up while fading in
        yield* all(
          ref().opacity(1, interval / 4),
          ref().y(pos.y, interval)
        );
      } else if (direction === "bottom") {
        // Offset element above final position
        ref().y(pos.y - intensity);
        // Animate moving down while fading in
        yield* all(
          ref().opacity(1, interval / 4),
          ref().y(pos.y, interval)
        );
      }
    } else if (animate === "exit") {
      // Wait until exit animation starts
      yield* waitFor(duration - interval);

      if (direction === "top") {
        // Animate moving up while fading out (opacity fades slightly after motion starts)
        yield* all(
          delay((3 * interval) / 4, ref().opacity(0, interval / 4)),
          ref().y(pos.y - intensity, interval)
        );
      } else if (direction === "bottom") {
        // Animate moving down while fading out
        yield* all(
          delay((3 * interval) / 4, ref().opacity(0, interval / 4)),
          ref().y(pos.y + intensity, interval)
        );
      }
    } else if (animate === "both") {
      // Start fully transparent
      ref().opacity(0);

      if (direction === "top") {
        // Enter animation: move up while fading in
        ref().y(pos.y + intensity);
        yield* all(
          ref().opacity(1, interval / 4),
          ref().y(pos.y, interval)
        );
        // Wait for the remaining duration
        yield* waitFor(duration - interval);
        // Exit animation: move up further while fading out
        yield* all(
          delay((3 * interval) / 4, ref().opacity(0, interval / 4)),
          ref().y(pos.y - intensity, interval)
        );
      } else if (direction === "bottom") {
        // Enter animation: move down while fading in
        ref().y(pos.y - intensity);
        yield* all(
          ref().opacity(1, interval / 4),
          ref().y(pos.y, interval)
        );
        // Wait for the remaining duration
        yield* waitFor(duration - interval);
        // Exit animation: move down further while fading out
        yield* all(
          delay((3 * interval) / 4, ref().opacity(0, interval / 4)),
          ref().y(pos.y + intensity, interval)
        );
      }
    }
  },
};
