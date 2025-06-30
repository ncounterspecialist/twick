import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@revideo/core";
import { Rect, Video } from "@revideo/2d";
import { addAnimations, fitElement } from "../helpers/element.utils";
import { logger } from "../helpers/log.utils";
import { addFrameEffect } from "../components/frame-effects";
import { applyColorFilter } from "../helpers/filters";

export const VideoElement = {
  name: "video",
  *create({ containerRef, element, view }: ElementParams) {
    logger(`Adding image element ${element.id}`);
    const frameContainerRef = createRef<any>();
    const frameElementRef = createRef<any>();

    yield containerRef().add(
      <Rect ref={frameContainerRef} key={element.id} {...element.frame}>
        <Video
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
        addAnimations({
          elementRef: frameElementRef,
          element: element,
          view,
        }),
        addFrameEffect({
          containerRef: frameContainerRef,
          elementRef: frameElementRef,
          frameElement,
        }),
        waitFor(Math.max(0, element.e - element.s))
      );
      yield frameElementRef().playing(false);
      yield frameElementRef().remove();
      yield frameContainerRef().remove();
    }
  },
};
