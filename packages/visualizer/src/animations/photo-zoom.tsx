import { Vector2 } from "@revideo/core";
import { AnimationParams } from "../helpers/types";
import { logger } from "../helpers/log.utils";

export const PhotoZoomAnimation = {
  name: "photo-zoom",
  *run({ elementRef, containerRef, mode, duration, intensity = 1.5 }: AnimationParams) {
    if (containerRef) {
      const elementScale = elementRef().scale();
      logger(`Running photo zoom animation ${elementScale.x} ${elementScale.y}`);

      if (mode === "in") {
        yield elementRef().scale(new Vector2(elementScale.x * intensity, elementScale.y * intensity));
        yield* elementRef().scale(
          new Vector2(elementScale.x, elementScale.y),
          duration
        );
      }
      if (mode === "out") {
        elementRef().scale(new Vector2(elementScale.x, elementScale.y));
        yield* elementRef().scale(
          new Vector2(elementScale.x * intensity, elementScale.y * intensity),
          duration
        );
      }
    }
  },
};
