import { waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

export const EraseEffect = {
  name: "erase",
  *run({ elementRef, interval, duration, delay, bufferTime = 0.1 }: TextEffectParams) {
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
    for (let i = fullText.length; i >= 0; i--) {
      yield* waitFor(timeInterval);
      elementRef().setText(fullText.substring(0, i));
    }
  },
};
