/**
 * @group CircleFrameEffect
 * CircleFrameEffect animates a frame transitioning into a circular shape,
 * resizing, repositioning, and optionally fitting its content. Creates a 
 * circular mask around content perfect for profile pictures and artistic presentations.
 *
 * Behavior:
 * - Waits for the specified start time
 * - Resizes and repositions the frame container smoothly
 * - Animates the corner radius to create a perfect circle
 * - Repositions the content element if needed
 * - Optionally fits the element inside the container based on object-fit
 *
 * @param containerRef - Reference to the frame container element
 * @param elementRef - Reference to the content element inside the frame
 * @param initFrameState - Initial size and position state of the element
 * @param frameEffect - Frame transformation configuration and timing
 * 
 * @example
 * ```js
 * // Basic circular frame
 * frameEffects: [{
 *   name: "circle",
 *   s: 0,
 *   e: 10,
 *   props: {
 *     frameSize: [400, 400],
 *     frameShape: "circle",
 *     framePosition: { x: 960, y: 540 },
 *     radius: 200,
 *     objectFit: "cover",
 *     transitionDuration: 1.5
 *   }
 * }]
 * ```
 */

import { all, waitFor } from "@twick/core";
import { getTimingFunction } from "../helpers/timing.utils";
import { fitElement } from "../helpers/element.utils";
import {
  DEFAULT_POSITION,
  DEFAULT_TIMING_FUNCTION,
} from "../helpers/constants";
import { FrameEffectParams } from "../helpers/types";

/**
 * CircleFrameEffect animates a frame transitioning into a circular shape,
 * resizing, repositioning, and optionally fitting its content. Creates a 
 * circular mask around content perfect for profile pictures and artistic presentations.
 *
 * Behavior:
 * - Waits for the specified start time
 * - Resizes and repositions the frame container smoothly
 * - Animates the corner radius to create a perfect circle
 * - Repositions the content element if needed
 * - Optionally fits the element inside the container based on object-fit
 *
 * @param containerRef - Reference to the frame container element
 * @param elementRef - Reference to the content element inside the frame
 * @param initFrameState - Initial size and position state of the element
 * @param frameEffect - Frame transformation configuration and timing
 * 
 * @example
 * ```js
 * // Basic circular frame
 * frameEffects: [{
 *   name: "circle",
 *   s: 0,
 *   e: 10,
 *   props: {
 *     frameSize: [400, 400],
 *     frameShape: "circle",
 *     framePosition: { x: 960, y: 540 },
 *     radius: 200,
 *     objectFit: "cover",
 *     transitionDuration: 1.5
 *   }
 * }]
 * ```
 */
export const CircleFrameEffect = {
  name: "circle",

  /**
   * Generator function controlling the circle frame animation.
   * Handles frame resizing, positioning, corner radius animation, and content fitting.
   *
   * @param params - Frame effect parameters including element references and configuration
   * @returns Generator that controls the circle frame animation timeline
   * 
   * @example
   * ```js
   * yield* CircleFrameEffect.run({
   *   containerRef: frameContainer,
   *   elementRef: contentElement,
   *   initFrameState: initialState,
   *   frameEffect: circleConfig
   * });
   * ```
   */
  *run({
    containerRef,
    elementRef,
    initFrameState,
    frameEffect,
  }: FrameEffectParams) {
    // Wait for the specified start time before starting animation
    yield* waitFor(frameEffect.s);

    const props = frameEffect.props;
    const sequence = [];

    // Animate resizing the container to target size
    sequence.push(
      containerRef().size(
        { x: props.frameSize[0], y: props.frameSize[1] },
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

    // Animate rounding corners to create a circle (radius = half the width)
    sequence.push(
      containerRef().radius(
        props.frameSize[0] / 2,
        props.transitionDuration,
        getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
      )
    );

    // Optionally fit the element inside the resized container
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
