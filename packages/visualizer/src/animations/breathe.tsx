import { Vector2 } from "@twick/core";
import { AnimationParams } from "../helpers/types";
import { getTimingFunction } from "../helpers/timing.utils";

/**
 * @group BreatheAnimation
 * BreatheAnimation applies a smooth scale in/out effect to simulate a "breathing" motion.
 * Creates gentle pulsing animations that add life and movement to static elements.
 * Perfect for subtle background animations and attention-grabbing effects.
 *
 * Available modes:
 * - "in": Gradually scales down (shrinks) to the target intensity
 * - "out": Starts scaled down, then grows back to original size
 *
 * @param elementRef - Reference to the main element to animate
 * @param containerRef - Optional reference to a container element
 * @param mode - Animation phase ("in" | "out")
 * @param duration - Duration of the scaling animation in seconds
 * @param intensity - Target scale factor (default: 0.5)
 * 
 * @example
 * ```js
 * // Gentle breathing in effect
 * animation: {
 *   name: "breathe",
 *   mode: "in",
 *   duration: 2,
 *   intensity: 0.8
 * }
 * 
 * // Breathing out animation
 * animation: {
 *   name: "breathe",
 *   mode: "out",
 *   duration: 1.5,
 *   intensity: 0.6
 * }
 * ```
 */
export const BreatheAnimation = {
  name: "breathe",

  /**
   * Generator function controlling the breathing scale animation.
   * Handles smooth scaling transitions to create natural breathing motion.
   *
   * @param params - Animation parameters including element references and timing
   * @returns Generator that controls the breathing animation timeline
   * 
   * @example
   * ```js
   * yield* BreatheAnimation.run({
   *   elementRef: myElement,
   *   mode: "in",
   *   duration: 2,
   *   intensity: 0.8
   * });
   * ```
   */
  *run({
    elementRef,
    containerRef,
    mode,
    duration,
    intensity = 0.5,
  }: AnimationParams) {
    // Use containerRef if provided, otherwise fallback to elementRef
    const ref = containerRef ?? elementRef;

    // Get the current scale of the element
    const scale = ref().scale();

    if (mode === "in") {
      // Animate scaling down to (original scale * intensity)
      yield* ref().scale(
        new Vector2(scale.x * intensity, scale.y * intensity),
        duration,
        getTimingFunction("easeInSine")
      );
    }

    if (mode === "out") {
      // Immediately set to scaled down size
      ref().scale(
        new Vector2(scale.x * intensity, scale.y * intensity)
      );
      // Animate scaling back up to original size
      yield* ref().scale(
        new Vector2(scale.x, scale.y),
        duration,
        getTimingFunction("easeOutSine")
      );
    }
  },
};
