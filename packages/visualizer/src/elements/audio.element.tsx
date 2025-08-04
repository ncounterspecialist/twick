import { ElementParams } from "../helpers/types";
import { createRef, waitFor } from "@twick/core";
import { Audio } from "@twick/2d";

export const AudioElement = {
  name: "audio",
  *create({ containerRef, element, view }: ElementParams) {
    const elementRef = createRef<any>();
    yield* waitFor(element?.s);
    yield containerRef().add(
      <Audio ref={elementRef} key={element.id} {...element.props} />
    );
    yield* waitFor(Math.max(0, element.e - element.s));
    yield elementRef().playing(false);
    yield elementRef().remove();
  },
};
