import { waitFor } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

/**
 * BlurAnimation applies a blur effect to an element or its container
 * during enter, exit, or both animations.
 *
 * Available animation modes:
 * - "enter": Starts blurred and gradually becomes clear.
 * - "exit": Starts clear and gradually becomes blurred.
 * - "both": Blurs in, clears, then blurs out.
 *
 * @param elementRef - Reference to the main element.
 * @param containerRef - Optional reference to a container element.
 * @param interval - Duration (in frames or ms) of each blur transition.
 * @param duration - Total duration of the animation.
 * @param intensity - Maximum blur strength (default: 25).
 * @param animate - Animation phase ("enter" | "exit" | "both").
 */
export const BlurAnimation = {
  name: "blur",

  /**
   * Generator function controlling the blur animation.
   */
  *run({
    elementRef,
    containerRef,
    interval,
    duration,
    intensity = 25,
    animate,
  }: AnimationParams) {
    // Choose containerRef if provided; otherwise, fallback to elementRef
    const ref = containerRef ?? elementRef;

    if (animate === "enter") {
      // Start fully blurred
      ref().filters.blur(intensity);
      // Animate to no blur over 'interval'
      yield* ref().filters.blur(0, interval);
    } else if (animate === "exit") {
      // Wait for the time before exit animation starts
      yield* waitFor(duration - interval);
      // Animate from no blur to full blur over 'interval'
      yield* ref().filters.blur(intensity, interval);
    } else if (animate === "both") {
      // Start fully blurred
      ref().filters.blur(intensity);
      // Animate to no blur
      yield* ref().filters.blur(0, interval);
      // Wait until exit animation
      yield* waitFor(duration - interval);
      // Animate to full blur again
      yield* ref().filters.blur(intensity, interval);
    }
  },
};
