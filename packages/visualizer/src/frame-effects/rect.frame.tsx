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

/**
 * RectFrameEffect applies frame transformations such as resizing,
 * repositioning, rounding corners, and optionally fitting the element
 * within the frame according to an object-fit mode.
 *
 * Behavior:
 * - Waits for the specified start time.
 * - Resizes and repositions the container and element smoothly.
 * - Adjusts corner radius if provided.
 * - Optionally fits the element inside the container.
 *
 * @param containerRef - Reference to the frame container element.
 * @param elementRef - Reference to the content element inside the frame.
 * @param initFrameState - Initial size and position state of the element.
 * @param frameEffect - Frame transformation configuration and timing.
 */
export const RectFrameEffect = {
  name: "rect",

  /**
   * Generator function controlling the frame resizing and positioning animation.
   */
  *run({
    containerRef,
    elementRef,
    initFrameState,
    frameEffect,
  }: FrameEffectParams) {
    // Wait until the effect start time
    yield* waitFor(frameEffect.s);

    const props = frameEffect.props;
    const sequence = [];

    // Animate resizing the container
    sequence.push(
      containerRef().size(
        props.frameSize,
        props.transitionDuration,
        getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
      )
    );

    // Animate repositioning the container
    sequence.push(
      containerRef().position(
        props.framePosition ?? { x: 0, y: 0 },
        props.transitionDuration,
        getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
      )
    );

    // Animate repositioning the element inside the container
    sequence.push(
      elementRef().position(
        props.elementPosition ?? DEFAULT_POSITION,
        props.transitionDuration,
        getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
      )
    );

    // Animate corner radius if specified
    sequence.push(
      containerRef().radius(
        props.radius ?? 0,
        props.transitionDuration,
        getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
      )
    );

    // Optionally fit the element within the container based on object-fit
    if (props.objectFit) {
      sequence.push(
        fitElement({
          elementRef,
          containerSize: {
            x: props.frameSize[0],
            y: props.frameSize[1],
          },
          elementSize: initFrameState.element.size,
          objectFit: props.objectFit,
        })
      );
    }

    // Run all animations in parallel
    yield* all(...sequence);
  },
};
