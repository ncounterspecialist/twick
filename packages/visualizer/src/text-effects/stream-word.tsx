import { waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

export const StreamWordEffect = {
  name: "stream-word",
  *run({ elementRef, interval, duration, delay, bufferTime = 0.1}: TextEffectParams) {
    const fullText = elementRef().text();
    const size = elementRef().size();
    const words = fullText.split(" ");
    elementRef().setText("");
    elementRef().size(size);
    if (delay) {
      yield* waitFor(delay);
    }
    elementRef().textAlign("left");
    let timeInterval = interval ?? (duration - bufferTime) / words.length;
    for (let i = 0; i < words.length; i++) {
      yield* waitFor(timeInterval);
      elementRef().setText(words.slice(0, i + 1).join(" "));
    }
  },
};
