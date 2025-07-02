import { easeOutElastic, waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

/**
 * ElasticEffect applies a scaling animation to text elements
 * with an elastic easing curve for a "pop" or "bounce" effect.
 *
 * Behavior:
 * - Optionally waits for a delay.
 * - Starts at zero scale (invisible).
 * - Scales up to full size with an elastic bounce.
 *
 * @param elementRef - Reference to the text element to animate.
 * @param duration - Duration of the scaling animation.
 * @param delay - Optional delay before the animation starts.
 */
export const ElasticEffect = {
  name: "elastic",

  /**
   * Generator function controlling the elastic text scaling effect.
   */
  *run({
    elementRef,
    duration,
    delay,
  }: TextEffectParams) {
    // If a delay is specified, wait before starting the animation
    if (delay) {
      yield* waitFor(delay);
    }

    // Instantly set scale to 0 (invisible)
    elementRef().scale(0);

    // Animate scaling up to full size using elastic easing
    yield* elementRef().scale(1, duration, easeOutElastic);
  },
};
