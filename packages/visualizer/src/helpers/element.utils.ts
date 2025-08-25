import { all, Reference, waitFor } from "@twick/core";
import { FrameState, ObjectFit, SizeVector, VisualizerElement } from "./types";
import { OBJECT_FIT } from "./constants";
import textEffectController from "../controllers/text-effect.controller";
import animationController from "../controllers/animation.controller";
import { View2D } from "@twick/2d";
import frameEffectController from "../controllers/frame-effect.controller";
import { logger } from "./log.utils";

/**
 * Element utilities for the visualizer package.
 * Provides functions for handling element positioning, sizing, and transformations
 * to ensure proper content display and visual effects.
 */

/**
 * Fits an element within specified bounds while maintaining aspect ratio.
 * Handles different object-fit modes for proper content scaling and positioning.
 *
 * @param containerSize - The container size dimensions
 * @param elementSize - The element size dimensions
 * @param elementRef - The element reference to modify
 * @param objectFit - The fit mode (contain, cover, fill, none)
 * @returns Generator that controls the element fitting process
 * 
 * @example
 * ```js
 * yield* fitElement({
 *   containerSize: { x: 800, y: 600 },
 *   elementSize: { x: 1920, y: 1080 },
 *   elementRef: videoElement,
 *   objectFit: "cover"
 * });
 * ```
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

/**
 * Adds text effects to an element based on its configuration.
 * Applies text animations like typewriter, stream word, or elastic effects.
 *
 * @param elementRef - Reference to the text element
 * @param element - Element configuration containing text effect settings
 * @returns Generator that controls the text effect animation
 * 
 * @example
 * ```js
 * yield* addTextEffect({
 *   elementRef: textElement,
 *   element: {
 *     textEffect: {
 *       name: "typewriter",
 *       duration: 3,
 *       interval: 0.1
 *     }
 *   }
 * });
 * ```
 */
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
        duration: element.e - element.s,
        ...element.textEffect,
      });
    }
  }
}

/**
 * Adds animations to an element based on its configuration.
 * Applies entrance, exit, or transition animations to elements.
 *
 * @param elementRef - Reference to the element to animate
 * @param containerRef - Optional reference to the container element
 * @param element - Element configuration containing animation settings
 * @param view - The main scene view for rendering
 * @returns Generator that controls the animation timeline
 * 
 * @example
 * ```js
 * yield* addAnimation({
 *   elementRef: videoElement,
 *   containerRef: frameContainer,
 *   element: {
 *     animation: {
 *       name: "fade",
 *       animate: "enter",
 *       duration: 2,
 *       direction: "center"
 *     }
 *   },
 *   view: sceneView
 * });
 * ```
 */
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


/**
 * Adds frame effects to an element based on its configuration.
 * Applies visual masks and containers like circular or rectangular frames.
 *
 * @param containerRef - Reference to the frame container element
 * @param elementRef - Reference to the content element inside the frame
 * @param element - Element configuration containing frame effect settings
 * @returns Generator that controls the frame effect timeline
 * 
 * @example
 * ```js
 * yield* addFrameEffect({
 *   containerRef: frameContainer,
 *   elementRef: contentElement,
 *   element: {
 *     frameEffects: [{
 *       name: "circle",
 *       s: 0,
 *       e: 10,
 *       props: {
 *         frameSize: [400, 400],
 *         frameShape: "circle",
 *         framePosition: { x: 960, y: 540 },
 *         radius: 200,
 *         objectFit: "cover"
 *       }
 *     }]
 *   }
 * });
 * ```
 */
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
