import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Img, Rect } from "@twick/2d";
import { addAnimation, addFrameEffect, fitElement } from "../helpers/element.utils";
import { applyColorFilter } from "../helpers/filters";
import { logger } from "../helpers/log.utils";

/**
 * @group ImageElement
 * ImageElement creates and manages image content in the visualizer scene.
 * Handles image rendering, frame effects, animations, and content fitting
 * for professional image presentations and content creation.
 *
 * Features:
 * - Image rendering with start/end timing control
 * - Frame effects and animations
 * - Object fit options for content scaling
 * - Color filters and media effects
 * - Automatic cleanup and resource management
 *
 * @param containerRef - Reference to the container element
 * @param element - Image element configuration and properties
 * @param view - The main scene view for rendering
 * 
 * @example
 * ```js
 * // Basic image element
 * {
 *   id: "main-image",
 *   type: "image",
 *   s: 0,
 *   e: 15,
 *   props: {
 *     src: "image.jpg",
 *     width: 1920,
 *     height: 1080
 *   },
 *   objectFit: "cover"
 * }
 * 
 * // Image with frame effect and animation
 * {
 *   id: "framed-image",
 *   type: "image",
 *   s: 2,
 *   e: 20,
 *   props: { 
 *     src: "content.jpg",
 *     mediaFilter: "sepia"
 *   },
 *   animation: {
 *     name: "fade",
 *     animate: "enter",
 *     duration: 2
 *   },
 *   frameEffects: [{
 *     name: "circle",
 *     s: 2,
 *     e: 20,
 *     props: {
 *       frameSize: [500, 500],
 *       frameShape: "circle",
 *       framePosition: { x: 960, y: 540 },
 *       radius: 250,
 *       objectFit: "cover"
 *     }
 *   }]
 * }
 * ```
 */
export const ImageElement = {
  name: "image",

  /**
   * Generator function that creates and manages image elements in the scene.
   * Handles image creation, frame setup, animations, effects, and cleanup.
   *
   * @param params - Element parameters including container reference, element config, and view
   * @returns Generator that controls the image element lifecycle
   * 
   * @example
   * ```js
   * yield* ImageElement.create({
   *   containerRef: mainContainer,
   *   element: imageConfig,
   *   view: sceneView
   * });
   * ```
   */
  *create({ containerRef, element, view }: ElementParams) {
    yield* waitFor(element?.s);
    const frameContainerRef = createRef<any>();
    const frameElementRef = createRef<any>();

    yield containerRef().add(
      <Rect ref={frameContainerRef} key={element.id} {...element.frame}>
        <Img
          ref={frameElementRef}
          key={`child-${element.id}`}
          {...element.props}
        />
      </Rect>
    );
    if (frameContainerRef()) {
      yield fitElement({
        elementRef: frameElementRef,
        containerSize: frameContainerRef().size(),
        elementSize: frameElementRef().size(),
        objectFit: element.objectFit,
      });

      if (element?.props?.mediaFilter) {
        applyColorFilter(frameElementRef, element.props.mediaFilter);
      }

      yield* all(
        addAnimation({
          elementRef: frameElementRef,
          containerRef: frameContainerRef,
          element: element,
          view,
        }),
        addFrameEffect({
          containerRef: frameContainerRef,
          elementRef: frameElementRef,
          element,
        }),
        waitFor(Math.max(0, element.e - element.s))
      );
      yield frameElementRef().remove();
      yield frameContainerRef().remove();
    }
  },
};
