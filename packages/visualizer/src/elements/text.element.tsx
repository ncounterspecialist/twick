import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@revideo/core";
import { Txt } from "@revideo/2d";
import { addAnimations, addTextEffect } from "../helpers/element.utils";
import { logger } from "../helpers/log.utils";

export const TextElement = {
    name: "text",
    *create({ containerRef, element, view }: ElementParams) { 
    const elementRef = createRef<any>();
    logger(`Adding text element ${element.id}`);

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
      addAnimations({ elementRef: elementRef, element: element, view }),
      addTextEffect({ elementRef: elementRef, element: element }),
      waitFor(Math.max(0, element.e - element.s))
    );
    yield elementRef().remove();
}
  }
  