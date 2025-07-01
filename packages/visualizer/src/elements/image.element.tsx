import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@revideo/core";
import { Img, Rect } from "@revideo/2d";
import { addAnimation, addFrameEffect, fitElement } from "../helpers/element.utils";
import { logger } from "../helpers/log.utils";
import { applyColorFilter } from "../helpers/filters";

export const ImageElement = {
  name: "image",
  *create({ containerRef, element, view }: ElementParams) {
    logger(`Adding image element ${element.id}`);
    const frameContainerRef = createRef<any>();
    const frameElementRef = createRef<any>();

    yield containerRef().add(
      <Rect ref={frameContainerRef} key={element.id} {...element.frame}>
        <Img
          ref={frameElementRef}
          key={`child-${element.id}`}
          {...element.props}
        />
      </Rect>
    );
    if (frameContainerRef()) {
      yield fitElement({
        elementRef: frameElementRef,
        containerSize: frameContainerRef().size(),
        elementSize: frameElementRef().size(),
        objectFit: element.objectFit,
      });

      if (element?.props?.mediaFilter) {
        applyColorFilter(frameElementRef, element.props.mediaFilter);
      }

      yield* all(
        addAnimation({
          elementRef: frameElementRef,
          containerRef: frameContainerRef,
          element: element,
          view,
        }),
        addFrameEffect({
          containerRef: frameContainerRef,
          elementRef: frameElementRef,
          element,
        }),
        waitFor(Math.max(0, element.e - element.s))
      );
      yield frameElementRef().remove();
      yield frameContainerRef().remove();
    }
  },
};
