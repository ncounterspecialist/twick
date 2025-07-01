import { all, Reference, waitFor } from "@revideo/core";
import { FrameState, ObjectFit, SizeVector, VisualizerElement } from "./types";
import { OBJECT_FIT } from "./constants";
import textEffectController from "../controllers/text-effect.controller";
import animationController from "../controllers/animation.controller";
import { View2D } from "@revideo/2d";
import frameEffectController from "../controllers/frame-effect.controller";
import { logger } from "./log.utils";

/**
 * Element utilities for the visualizer package.
 * Provides functions for handling element positioning, sizing, and transformations.
 */

/**
 * Fits an element within specified bounds while maintaining aspect ratio
 * @param {Object} params - Parameters for fitting the element
 * @param {Object} params.containerSize - The container size
 * @param {Object} params.elementSize - The element size
 * @param {Object} params.elementRef - The element reference
 * @param {string} [params.objectFit] - The fit mode (contain, cover, fill)
 * @returns {Object} Updated element dimensions
 */
export function* fitElement({
  containerSize,
  elementSize,
  elementRef,
  objectFit,
}: {
  containerSize: SizeVector;
  elementSize: SizeVector;
  elementRef: Reference<any>;
  objectFit?: ObjectFit;
}) {
  const containerAspectRatio = containerSize.x / containerSize.y;
  const elementAspectRatio = elementSize.x / elementSize.y;
  switch (objectFit) {
    case OBJECT_FIT.CONTAIN:
      if (elementAspectRatio > containerAspectRatio) {
        yield elementRef().size({
          x: containerSize.x,
          y: containerSize.x / elementAspectRatio,
        });
        yield elementRef().scale(
          containerSize.x / elementSize.x,
          (containerSize.x * elementAspectRatio) / elementSize.y
        );
      } else {
        yield elementRef().size({
          x: containerSize.y * elementAspectRatio,
          y: containerSize.y,
        });
        yield elementRef().scale(
          (containerSize.y * elementAspectRatio) / elementSize.x,
          containerSize.y / elementSize.y
        );
      }
      break;
    case OBJECT_FIT.COVER:
      if (elementAspectRatio > containerAspectRatio) {
        yield elementRef().size({
          x: containerSize.y * elementAspectRatio,
          y: containerSize.y,
        });
        yield elementRef().scale(
          (containerSize.y * elementAspectRatio) / elementSize.x,
          containerSize.y / elementSize.y
        );
      } else {
        yield elementRef().size({
          x: containerSize.x,
          y: containerSize.x / elementAspectRatio,
        });
        yield elementRef().scale(
          containerSize.x / elementSize.x,
          (containerSize.x * elementAspectRatio) / elementSize.y
        );
      }
      break;
    case OBJECT_FIT.FILL:
      yield elementRef().size(containerSize);
      yield elementRef().scale(
        containerSize.x / elementSize.x,
        containerSize.x / elementSize.y
      );
      break;
    default:
      break;
  }
}

export function* addTextEffect({
  elementRef,
  element,
}: {
  elementRef: Reference<any>;
  element: VisualizerElement;
}) {
  yield elementRef();
  if (element.textEffect) {
    const effect = textEffectController.get(element.textEffect.name);
    if (effect) {
      yield* effect.run({
        elementRef,
        ...element.textEffect,
      });
    }
  }
}

export function* addAnimation({
  elementRef,
  containerRef,
  element,
  view,
}: {
  elementRef: Reference<any>;
  containerRef?: Reference<any>;
  element: VisualizerElement;
  view: View2D;
}) {
  yield elementRef();
  if (element.animation) {
    const animation = animationController.get(element.animation.name);
    if (animation) {
      yield* animation.run({
        elementRef,
        containerRef,
        view,
        duration: element.e - element.s,
        ...element.animation,
      });
    }
  }
}


export function* addFrameEffect({
  containerRef,
  elementRef,
  element,
}: {
  containerRef: Reference<any>;
  elementRef: Reference<any>;
  element: VisualizerElement;
}) {
  let frameEffects = [];
  const initProps = getFrameState({
    containerRef,
    elementRef,
  });

  for (let i = 0; i < element?.frameEffects?.length; i++) {
    const frameEffect = element.frameEffects[i];
    const restore =
      i === element.frameEffects.length - 1 ||
      element.frameEffects[i + 1].s !== frameEffect.e;
      const frameEffectPlugin = frameEffectController.get(frameEffect.name);
      if (frameEffectPlugin) {
        yield* frameEffectPlugin.run({
          containerRef,
          elementRef,
          initFrameState: initProps,
          frameEffect,
        });
        if (restore) {
          yield* restoreFrameState({
              containerRef,
              elementRef,
              duration: frameEffect.e - frameEffect.s,
              element,  
              initProps,
            }) 
        }
        // frameEffects.push(...sequence);
      
      }
  }
  // yield* all(...frameEffects);
}

export function getFrameState({
  containerRef,
  elementRef,
}: {
  containerRef: Reference<any>;
  elementRef: Reference<any>;
}): FrameState {
  return {
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
  }
}

export function* restoreFrameState({
  containerRef,
  elementRef,
  duration,
  element,
  initProps,
}: {
  containerRef: Reference<any>;
  elementRef: Reference<any>;
  duration: number;
  element: VisualizerElement;
  initProps: FrameState;
}) {
  yield* waitFor(duration);
  logger(`restoreFrameState: ${JSON.stringify(initProps)}`);
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
