import { waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

/**
 * StreamWordEffect animates text appearing word by word,
 * creating a smooth "typing" or "streaming" effect.
 *
 * Behavior:
 * - Optionally waits for a delay before starting.
 * - Clears the text initially and preserves the original size.
 * - Reveals one word at a time with a consistent interval.
 *
 * @param elementRef - Reference to the text element to animate.
 * @param duration - Total duration of the animation.
 * @param delay - Optional delay before starting.
 * @param bufferTime - Time reserved at the end of animation (default: 0.1).
 */
export const StreamWordEffect = {
  name: "stream-word",

  /**
   * Generator function controlling the word streaming effect.
   */
  *run({
    elementRef,
    duration,
    delay,
    bufferTime = 0.1,
  }: TextEffectParams) {
    // Retrieve the full text content
    const fullText = elementRef().text();

    // Store the element's size to avoid resizing during animation
    const size = elementRef().size();

    // Split the text into words
    const words = fullText.split(" ");

    // Clear the text and set fixed size
    elementRef().setText("");
    elementRef().size(size);

    // Wait for optional delay before starting
    if (delay) {
      yield* waitFor(delay);
    }

    // Align text to the left
    elementRef().textAlign("left");

    // Calculate the interval between words
    let timeInterval =(duration - bufferTime) / words.length;

    // Reveal each word one at a time
    for (let i = 0; i < words.length; i++) {
      yield* waitFor(timeInterval);
      elementRef().setText(words.slice(0, i + 1).join(" "));
    }
  },
};
