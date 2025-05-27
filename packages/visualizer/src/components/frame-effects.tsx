/**
 * Frame effects component that handles the application of various visual effects
 * to frames and elements in the scene.
 */

import { all, Reference, waitFor } from "@revideo/core";
import { getTimingFunction } from "../helpers/timing.utils";
import { fitElement } from "../helpers/element.utils";
import { DEFAULT_POSITION, DEFAULT_TIMING_FUNCTION, FRAME_SHAPE } from "../helpers/constants";
import { FrameEffect } from "../helpers/types";
import { View2D } from "@revideo/2d";
import { createSignal } from "@revideo/core";
import { logger } from "../helpers/log.utils";

/**
 * Applies frame effects to a view or element
 * @param {Object} params - Parameters for applying frame effects
 * @param {View2D} params.view - The 2D view to apply effects to
 * @param {FrameEffect[]} params.effects - Array of effects to apply
 * @returns {void}
 */
export function applyFrameEffects({ view, effects }: { view: View2D; effects: FrameEffect[] }) {
  // ... existing code ...
}

export function* addFrameEffect({
  containerRef,
  elementRef,
  frameElement,
}: {
  containerRef: Reference<any>;
  elementRef: Reference<any>;
  frameElement: any;
}) {
  let frameEffects = [];
  const initProps = {
    frame: {
      size: containerRef().size(),
      pos: containerRef().position(),
      radius: containerRef().radius(),
      scale: containerRef().scale(),
      rotation: containerRef().rotation(),
    },
    element: {
      size: containerRef().size(),
      pos: elementRef().position(),
      scale: elementRef().scale(),
    },
  };

  for (let i = 0; i < frameElement?.frameEffects?.length; i++) {
    const frameEffect = frameElement.frameEffects[i];
    const restore =
      i === frameElement.frameEffects.length - 1 ||
      frameElement.frameEffects[i + 1].s !== frameEffect.e;
    frameEffects.push(
      getFrameEffect({
        containerRef,
        elementRef,
        frameEffect,
        element: frameElement,
        restore,
        initProps,
      })
    );
  }
  yield* all(...frameEffects);
}

function* getFrameEffect({
  containerRef,
  elementRef,
  frameEffect,
  element,
  initProps,
  restore = true,
}: {
  containerRef: Reference<any>;
  elementRef: Reference<any>;
  frameEffect: FrameEffect;
  element: any;
  initProps: any;
  restore?: boolean;
}) {
  yield* waitFor(frameEffect.s);
  const props = frameEffect.props;
  const sequence = [];

  if (restore) {
    sequence.push(
      restoreState({
        containerRef,
        elementRef,
        frameEffect,
        element,
        initProps,
      })
    );
  }

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

  switch (props.frameShape) {
    case FRAME_SHAPE.CIRCLE:
      sequence.push(
        containerRef().radius(
          props.frameSize[0] / 2,
          props.transitionDuration,
          getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
        )
      );
      break;
    default:
      sequence.push(
        containerRef().radius(
          props.radius ?? 0,
          props.transitionDuration,
          getTimingFunction(props.transitionEasing ?? DEFAULT_TIMING_FUNCTION)
        )
      );
  }

  if (props.objectFit) {
    sequence.push(
      fitElement({
        elementRef,
        containerSize: { x: props.frameSize[0], y: props.frameSize[1] },
        elementSize: initProps.element.size,
        objectFit: props.objectFit,
      })
    );
  }
  yield* all(...sequence);
}

function* restoreState({
  containerRef,
  elementRef,
  frameEffect,
  element,
  initProps,
}: {
  containerRef: Reference<any>;
  elementRef: Reference<any>;
  frameEffect: any;
  element: any;
  initProps: any;
}) {
  yield* waitFor(frameEffect.e - frameEffect.s);
  let sequence = [];
  sequence.push(containerRef().size(initProps.frame.size));
  sequence.push(containerRef().position(initProps.frame.pos));
  sequence.push(containerRef().scale(initProps.frame.scale));
  sequence.push(containerRef().rotation(initProps.frame.rotation));
  sequence.push(containerRef().radius(initProps.frame.radius));
  sequence.push(elementRef().size(initProps.element.size));
  sequence.push(elementRef().position(initProps.element.pos));
  sequence.push(elementRef().scale(initProps.element.scale));
  sequence.push(
    fitElement({
      elementRef,
      containerSize: initProps.frame.size,
      elementSize: initProps.element.size,
      objectFit: element.objectFit ?? "none",
    })
  );
  yield* all(...sequence);
}
