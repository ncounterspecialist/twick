import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Img, Rect } from "@twick/2d";
import { addAnimation, fitElement } from "../helpers/element.utils";

export const EmojiElement = {
  name: "emoji",

  *create({ containerRef, element, view }: ElementParams) {
    yield* waitFor(element?.s);
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

      yield* all(
        addAnimation({
          elementRef: frameElementRef,
          containerRef: frameContainerRef,
          element: element,
          view,
        }),
        waitFor(Math.max(0, element.e - element.s))
      );
      yield frameElementRef().remove();
      yield frameContainerRef().remove();
    }
  },
};
