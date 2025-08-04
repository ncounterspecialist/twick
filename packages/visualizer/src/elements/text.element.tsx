import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import { addAnimation, addTextEffect } from "../helpers/element.utils";

export const TextElement = {
    name: "text",
    *create({ containerRef, element, view }: ElementParams) { 
    const elementRef = createRef<any>();

    yield* waitFor(element?.s);
    yield containerRef().add(
      <Txt
        ref={elementRef}
        key={element.id}
        text={element.t}
        {...element.props}
      />
    );
    yield* all(
      addAnimation({ elementRef: elementRef, element: element, view }),
      addTextEffect({ elementRef: elementRef, element: element }),
      waitFor(Math.max(0, element.e - element.s))
    );
    yield elementRef().remove();
}
  }
  