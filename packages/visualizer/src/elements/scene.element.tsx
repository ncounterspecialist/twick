import { ElementParams } from "../helpers/types";
import { createRef } from "@revideo/core";
import { Rect } from "@revideo/2d";
import { DEFAULT_BACKGROUND_COLOR, ELEMENT_TYPES } from "../helpers/constants";
import { ImageElement } from "./image.element";
import { VideoElement } from "./video.element";

export const SceneElement = {
  name: "scene",
  *create({ containerRef, element, view }: ElementParams) {
    const mediaContainerRef = createRef<any>();
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
