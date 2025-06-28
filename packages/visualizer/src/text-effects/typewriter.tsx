import { waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

export const TypewriterEffect = {
  name: "typewriter",
  *run({ ref, interval, duration, delay, bufferTime = 0.1}: TextEffectParams) {
    const fullText = ref().text();
    const size = ref().size();
    ref().setText("");
    ref().size(size);
    ref().textAlign("left");
    if (delay) {
      yield* waitFor(delay);
    }
    let timeInterval = interval ?? (duration - bufferTime) / fullText.length;
    yield* waitFor(timeInterval);
    for (let i = 0; i < fullText.length; i++) {
      yield* waitFor(timeInterval);
      ref().setText(fullText.substring(0, i + 1));
    }
  }
};
