/**
 * @group RectFrameEffect
 * RectFrameEffect applies frame transformations such as resizing, repositioning, 
 * rounding corners, and optionally fitting the element within the frame according 
 * to an object-fit mode. Creates rectangular masks and containers for content 
 * presentation with smooth transitions.
 *
 * Behavior:
 * - Waits for the specified start time
 * - Resizes and repositions the container and element smoothly
 * - Adjusts corner radius if provided
 * - Optionally fits the element inside the container
 *
 * @param containerRef - Reference to the frame container element
 * @param elementRef - Reference to the content element inside the frame
 * @param initFrameState - Initial size and position state of the element
 * @param frameEffect - Frame transformation configuration and timing
 * 
 * @example
 * ```js
 * // Basic rectangular frame
 * frameEffects: [{
 *   name: "rect",
 *   s: 0,
 *   e: 10,
 *   props: {
 *     frameSize: [600, 400],
 *     frameShape: "rect",
 *     framePosition: { x: 960, y: 540 },
 *     radius: 20,
 *     objectFit: "cover",
 *     transitionDuration: 1.5
 *   }
 * }]
 * 
 * // Rounded rectangle frame
 * frameEffects: [{
 *   name: "rect",
 *   s: 2,
 *   e: 15,
 *   props: {
 *     frameSize: [800, 600],
 *     frameShape: "rect",
 *     framePosition: { x: 960, y: 540 },
 *     radius: 50,
 *     objectFit: "contain",
 *     transitionDuration: 2
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
 * RectFrameEffect applies frame transformations such as resizing, repositioning, 
 * rounding corners, and optionally fitting the element within the frame according 
 * to an object-fit mode. Creates rectangular masks and containers for content 
 * presentation with smooth transitions.
 *
 * Behavior:
 * - Waits for the specified start time
 * - Resizes and repositions the container and element smoothly
 * - Adjusts corner radius if provided
 * - Optionally fits the element inside the container
 *
 * @param containerRef - Reference to the frame container element
 * @param elementRef - Reference to the content element inside the frame
 * @param initFrameState - Initial size and position state of the element
 * @param frameEffect - Frame transformation configuration and timing
 * 
 * @example
 * ```js
 * // Basic rectangular frame
 * frameEffects: [{
 *   name: "rect",
 *   s: 0,
 *   e: 10,
 *   props: {
 *     frameSize: [600, 400],
 *     frameShape: "rect",
 *     framePosition: { x: 960, y: 540 },
 *     radius: 20,
 *     objectFit: "cover",
 *     transitionDuration: 1.5
 *   }
 * }]
 * 
 * // Rounded rectangle frame
 * frameEffects: [{
 *   name: "rect",
 *   s: 2,
 *   e: 15,
 *   props: {
 *     frameSize: [800, 600],
 *     frameShape: "rect",
 *     framePosition: { x: 960, y: 540 },
 *     radius: 50,
 *     objectFit: "contain",
 *     transitionDuration: 2
 *   }
 * }]
 * ```
 */
export const RectFrameEffect = {
  name: "rect",

  /**
   * Generator function controlling the frame resizing and positioning animation.
   * Handles rectangular frame transformations with smooth transitions and content fitting.
   *
   * @param params - Frame effect parameters including element references and configuration
   * @returns Generator that controls the rectangular frame animation timeline
   * 
   * @example
   * ```js
   * yield* RectFrameEffect.run({
   *   containerRef: frameContainer,
   *   elementRef: contentElement,
   *   initFrameState: initialState,
   *   frameEffect: rectConfig
   * });
   * ```
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
