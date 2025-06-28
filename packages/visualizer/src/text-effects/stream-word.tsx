import { waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

export const StreamWordEffect = {
  name: "stream-word",
  *run({ ref, interval, duration, delay, bufferTime = 0.1}: TextEffectParams) {
    const fullText = ref().text();
    const size = ref().size();
    const words = fullText.split(" ");
    ref().setText("");
    ref().size(size);
    if (delay) {
      yield* waitFor(delay);
    }
    ref().textAlign("left");
    let timeInterval = interval ?? (duration - bufferTime) / words.length;
    for (let i = 0; i < words.length; i++) {
      yield* waitFor(timeInterval);
      ref().setText(words.slice(0, i + 1).join(" "));
    }
  },
};
