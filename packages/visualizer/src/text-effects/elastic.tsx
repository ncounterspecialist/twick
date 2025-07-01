import { easeOutElastic, waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

export const ElasticEffect = {
  name: "elastic",
  *run({ elementRef,  duration , delay}: TextEffectParams) {
    if(delay) {
      yield* waitFor(delay);
    }
    elementRef().scale(0);
    yield* elementRef().scale(1, duration, easeOutElastic);
  },
};
