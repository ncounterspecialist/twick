import { all, delay, Vector2, waitFor } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

/**
 * SuccessionAnimation combines scaling and opacity transitions
 * to create an appearing and disappearing zoom effect.
 *
 * Available animation modes:
 * - "enter": Starts scaled down and transparent, then scales up while fading in.
 * - "exit": Waits, then scales down while fading out.
 * - "both": Scales up and fades in, waits, then scales down and fades out.
 *
 * @param elementRef - Reference to the main element to animate.
 * @param containerRef - Optional reference to a container element.
 * @param interval - Duration of scaling and opacity transitions.
 * @param duration - Total duration of the animation.
 * @param animate - Animation phase ("enter" | "exit" | "both").
 */
export const SuccessionAnimation = {
  name: "succession",

  /**
   * Generator function controlling the succession animation.
   */
  *run({
    elementRef,
    containerRef,
    interval,
    duration,
    animate,
  }: AnimationParams) {
    // Use containerRef if provided, otherwise fallback to elementRef
    const ref = containerRef ?? elementRef;

    // Capture the element's original scale
    const scale = ref().scale();

    let animationInterval = Math.min(interval, duration);
    if (animate === "enter") {
      // Start fully transparent and scaled down to 50%
      ref().opacity(0);
      ref().scale(new Vector2(scale.x / 2, scale.y / 2));
      // Animate scaling up to original size and fading in
      yield* all(
        ref().scale(scale, animationInterval),
        ref().opacity(1, animationInterval / 2)
      );

    } else if (animate === "exit") {
      // Wait until exit animation should start
      yield* waitFor(duration - animationInterval);
      // Animate scaling down to 50% and fading out (opacity starts after half the interval)
      yield* all(
        ref().scale(new Vector2(scale.x / 2, scale.y / 2), animationInterval),
        delay(animationInterval / 2, ref().opacity(0, animationInterval / 2))
      );

    } else if (animate === "both") {
      animationInterval = Math.min(interval, duration/2);
      // Start fully transparent and scaled down to 50%
      ref().opacity(0);
      ref().scale(new Vector2(scale.x / 2, scale.y / 2));
      // Animate scaling up and fading in
      yield* all(
        ref().scale(scale, animationInterval),
        ref().opacity(1, animationInterval / 2)
      );
      // Wait for the remaining duration
      yield* waitFor(duration - animationInterval);
      // Animate scaling down and fading out
      yield* all(
        ref().scale(new Vector2(scale.x / 2, scale.y / 2), animationInterval),
        delay(animationInterval / 2, ref().opacity(0, animationInterval / 2))
      );
    }
  },
};
