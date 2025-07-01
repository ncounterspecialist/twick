/**
 * Frame effects component that handles the application of various visual effects
 * to frames and elements in the scene.
 */

import { all, waitFor } from "@revideo/core";
import { getTimingFunction } from "../helpers/timing.utils";
import { fitElement } from "../helpers/element.utils";
import {
  DEFAULT_POSITION,
  DEFAULT_TIMING_FUNCTION,
} from "../helpers/constants";
import { FrameEffectParams } from "../helpers/types";

export const RectFrameEffect = {
  name: "rect",
  *run({
    containerRef,
    elementRef,
    initFrameState,
    frameEffect,
  }: FrameEffectParams) {
    yield* waitFor(frameEffect.s);
    const props = frameEffect.props;
    const sequence = [];

    sequence.push(
      containerRef().size(
        props.frameSize,
        props.transitionDuration,
        getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
      )
    );

    sequence.push(
      containerRef().position(
        props.framePosition ?? { x: 0, y: 0 },
        props.transitionDuration,
        getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
      )
    );

    sequence.push(
      elementRef().position(
        props.elementPosition ?? DEFAULT_POSITION,
        props.transitionDuration,
        getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
      )
    );

    sequence.push(
      containerRef().radius(
        props.radius ?? 0,
        props.transitionDuration,
        getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
      )
    );

    if (props.objectFit) {
      sequence.push(
        fitElement({
          elementRef,
          containerSize: { x: props.frameSize[0], y: props.frameSize[1] },
          elementSize: initFrameState.element.size,
          objectFit: props.objectFit,
        })
      );
    }
    yield* all(...sequence);
  },
};
