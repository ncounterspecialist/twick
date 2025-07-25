import { ElementParams } from "../helpers/types";
import { createRef, waitFor } from "@revideo/core";
import { Rect } from "@revideo/2d";
import { DEFAULT_BACKGROUND_COLOR, ELEMENT_TYPES } from "../helpers/constants";
import { ImageElement } from "./image.element";
import { VideoElement } from "./video.element";
import { logger } from "../helpers/log.utils";

export const SceneElement = {
  name: "scene",
  *create({ containerRef, element, view }: ElementParams) {
    yield* waitFor(element?.s);
    const mediaContainerRef = createRef<any>();
    logger(`SceneElement: ${JSON.stringify(element)}`);
    yield containerRef().add(
      <Rect
        ref={mediaContainerRef}
        fill={element.backgroundColor ?? DEFAULT_BACKGROUND_COLOR}
        size={"100%"}
      />
    );
    if (element.type === ELEMENT_TYPES.IMAGE) {
      yield* ImageElement.create({ containerRef, element, view });
    } else if (element.type === ELEMENT_TYPES.VIDEO) {
      yield* VideoElement.create({ containerRef, element, view });
    }
    yield mediaContainerRef().remove();
  },
};
