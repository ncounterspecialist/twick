import { waitFor } from "@twick/core";
import { TextEffectParams } from "../helpers/types";

/**
 * @group TypewriterEffect
 * TypewriterEffect animates text appearing one character at a time, mimicking the
 * behavior of a classic typewriter. Creates a nostalgic, engaging text animation
 * that draws attention to important content.
 *
 * Behavior:
 * - Optionally waits for a delay before starting
 * - Clears the text initially and preserves the element's original size
 * - Reveals one character at a time at a consistent interval
 *
 * @param elementRef - Reference to the text element to animate
 * @param duration - Total duration of the animation in seconds
 * @param delay - Optional delay before starting in seconds
 * @param bufferTime - Time reserved at the end of animation in seconds
 * 
 * @example
 * ```js
 * // Basic typewriter effect
 * textEffect: {
 *   name: "typewriter",
 *   duration: 3,
 *   interval: 0.1
 * }
 * 
 * // With delay and buffer time
 * textEffect: {
 *   name: "typewriter",
 *   duration: 5,
 *   delay: 1,
 *   bufferTime: 0.5
 * }
 * ```
 */
export const TypewriterEffect = {
  name: "typewriter",

  /**
   * Generator function controlling the character-by-character typing animation.
   * Handles text clearing, character revelation, and timing for the typewriter effect.
   *
   * @param params - Text effect parameters including element reference and timing
   * @returns Generator that controls the typewriter animation timeline
   * 
   * @example
   * ```js
   * yield* TypewriterEffect.run({
   *   elementRef: textElement,
   *   duration: 3,
   *   delay: 0.5,
   *   bufferTime: 0.1
   * });
   * ```
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
