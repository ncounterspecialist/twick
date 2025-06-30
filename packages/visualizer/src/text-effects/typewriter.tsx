import { waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

export const TypewriterEffect = {
  name: "typewriter",
  *run({ elementRef, interval, duration, delay, bufferTime = 0.1}: TextEffectParams) {
    const fullText = elementRef().text();
    const size = elementRef().size();
    elementRef().setText("");
    elementRef().size(size);
    elementRef().textAlign("left");
    if (delay) {
      yield* waitFor(delay);
    }
    let timeInterval = interval ?? (duration - bufferTime) / fullText.length;
    yield* waitFor(timeInterval);
    for (let i = 0; i < fullText.length; i++) {
      yield* waitFor(timeInterval);
      elementRef().setText(fullText.substring(0, i + 1));
    }
  }
};
