import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Rect, Video } from "@twick/2d";
import { addAnimation, addFrameEffect, fitElement } from "../helpers/element.utils";
import { applyColorFilter } from "../helpers/filters";

export const VideoElement = {
  name: "video",
  *create({ containerRef, element, view }: ElementParams) {
    yield* waitFor(element?.s);
    const frameContainerRef = createRef<any>();
    const frameElementRef = createRef<any>();

    yield containerRef().add(
      <Rect ref={frameContainerRef} key={element.id} {...element.frame}>
        <Video
          ref={frameElementRef}
          key={`child-${element.id}`}
          play={true}
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
      yield frameElementRef().play(false);
      yield frameElementRef().remove();
      yield frameContainerRef().remove();
    }
  },
};
