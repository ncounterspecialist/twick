import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Rect } from "@twick/2d";
import { addAnimation } from "../helpers/element.utils";
import { logger } from "../helpers/log.utils";

/**
 * @group RectElement
 * RectElement creates and manages rectangular shape elements in the visualizer scene.
 * Handles rectangle rendering, styling, and animations for UI elements and
 * visual design components.
 *
 * Features:
 * - Rectangle rendering with custom styling
 * - Size and position control
 * - Color and border customization
 * - Animation support
 *
 * @param containerRef - Reference to the container element
 * @param element - Rectangle element configuration and properties
 * @param view - The main scene view for rendering
 * 
 * @example
 * ```js
 * // Basic rectangle element
 * {
 *   id: "background-rect",
 *   type: "rect",
 *   s: 0,
 *   e: 20,
 *   props: {
 *     width: 800,
 *     height: 600,
 *     fill: "#000000",
 *     opacity: 0.5
 *   }
 * }
 * 
 * // Rectangle with animation
 * {
 *   id: "animated-rect",
 *   type: "rect",
 *   s: 2,
 *   e: 15,
 *   props: {
 *     width: 400,
 *     height: 300,
 *     fill: "#ff0000",
 *     stroke: "#ffffff",
 *     strokeWidth: 2
 *   },
 *   animation: {
 *     name: "fade",
 *     animate: "enter",
 *     duration: 2
 *   }
 * }
 * ```
 */
export const RectElement = {
    name: "rect",

    /**
     * Generator function that creates and manages rectangle elements in the scene.
     * Handles rectangle creation, styling, and cleanup.
     *
     * @param params - Element parameters including container reference, element config, and view
     * @returns Generator that controls the rectangle element lifecycle
     * 
     * @example
     * ```js
     * yield* RectElement.create({
     *   containerRef: mainContainer,
     *   element: rectConfig,
     *   view: sceneView
     * });
     * ```
     */
    *create({ containerRef, element, view }: ElementParams) {
    const elementRef = createRef<any>();
    yield* waitFor(element?.s);
    logger(`RectElement: ${JSON.stringify(element)}`);
    yield containerRef().add(
      <Rect ref={elementRef} key={element.id} {...element.props}/>
    );
    yield* all(
      addAnimation({ elementRef: elementRef, element: element, view }),
      waitFor(Math.max(0, element.e - element.s))
    );
    yield elementRef().remove();
  },
};
