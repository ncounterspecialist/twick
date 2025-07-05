import { waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

/**
 * TypewriterEffect animates text appearing one character at a time,
 * mimicking the behavior of a classic typewriter.
 *
 * Behavior:
 * - Optionally waits for a delay before starting.
 * - Clears the text initially and preserves the element's original size.
 * - Reveals one character at a time at a consistent interval.
 *
 * @param elementRef - Reference to the text element to animate.
 * @param duration - Total duration of the animation.
 * @param delay - Optional delay before starting.
 * @param bufferTime - Time reserved at the end of animation (default: 0.1).
 */
export const TypewriterEffect = {
  name: "typewriter",

  /**
   * Generator function controlling the character-by-character typing animation.
   */
  *run({
    elementRef,
    duration,
    delay,
    bufferTime = 0.1,
  }: TextEffectParams) {
    // Retrieve the full text content
    const fullText = elementRef().text();

    // Store the element's size to prevent resizing during animation
    const size = elementRef().size();

    // Clear the text and set fixed size
    elementRef().setText("");
    elementRef().size(size);

    // Align text to the left for consistent typing effect
    elementRef().textAlign("left");

    // Wait for an optional initial delay
    if (delay) {
      yield* waitFor(delay);
    }

    let timeInterval =(duration - bufferTime) / fullText.length;

    // Wait briefly before starting typing
    yield* waitFor(timeInterval);

    // Reveal each character one by one
    for (let i = 0; i < fullText.length; i++) {
      yield* waitFor(timeInterval);
      elementRef().setText(fullText.substring(0, i + 1));
    }
  },
};
