import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Circle } from "@twick/2d";
import { addAnimation } from "../helpers/element.utils";

export const CircleElement = {
  name: "circle",
  *create({ containerRef, element, view }: ElementParams) {
    const elementRef = createRef<any>();
    yield* waitFor(element?.s);
    yield containerRef().add(
      <Circle ref={elementRef} key={element.id} {...element.props} />
    );
    yield* all(
      addAnimation({ elementRef: elementRef, element: element, view }),
      waitFor(Math.max(0, element.e - element.s))
    );
    yield elementRef().remove();
  },
};
