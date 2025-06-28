import { easeOutElastic, waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

export const ElasticEffect = {
  name: "elastic",
  *run({ ref,  duration , delay}: TextEffectParams) {
    if(delay) {
      yield* waitFor(delay);
    }
    ref().scale(0);
    yield* ref().scale(1, duration, easeOutElastic);
  },
};
