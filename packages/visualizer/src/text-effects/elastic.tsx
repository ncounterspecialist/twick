import { easeOutElastic, waitFor } from "@twick/core";
import { TextEffectParams } from "../helpers/types";

/**
 * @group ElasticEffect
 * ElasticEffect applies a scaling animation to text elements with an elastic easing 
 * curve for a "pop" or "bounce" effect. Creates playful, attention-grabbing text 
 * animations that bounce into view with natural physics.
 *
 * Behavior:
 * - Optionally waits for a delay
 * - Starts at zero scale (invisible)
 * - Scales up to full size with an elastic bounce
 *
 * @param elementRef - Reference to the text element to animate
 * @param duration - Duration of the scaling animation in seconds
 * @param delay - Optional delay before the animation starts in seconds
 * 
 * @example
 * ```js
 * // Basic elastic bounce
 * textEffect: {
 *   name: "elastic",
 *   duration: 1.5,
 *   delay: 0.5
 * }
 * 
 * // Quick elastic pop
 * textEffect: {
 *   name: "elastic",
 *   duration: 0.8
 * }
 * ```
 */
export const ElasticEffect = {
  name: "elastic",

  /**
   * Generator function controlling the elastic text scaling effect.
   * Handles elastic bounce animations for text elements with natural physics.
   *
   * @param params - Text effect parameters including element reference and timing
   * @returns Generator that controls the elastic animation timeline
   * 
   * @example
   * ```js
   * yield* ElasticEffect.run({
   *   elementRef: textElement,
   *   duration: 1.5,
   *   delay: 0.5
   * });
   * ```
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
