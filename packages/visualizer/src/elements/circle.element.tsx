import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Circle } from "@twick/2d";
import { addAnimation } from "../helpers/element.utils";

/**
 * @group CircleElement
 * CircleElement creates and manages circular shape elements in the visualizer scene.
 * Handles circle rendering, styling, and animations for UI elements and
 * visual design components.
 *
 * Features:
 * - Circle rendering with custom styling
 * - Radius and position control
 * - Color and border customization
 * - Animation support
 *
 * @param containerRef - Reference to the container element
 * @param element - Circle element configuration and properties
 * @param view - The main scene view for rendering
 * 
 * @example
 * ```js
 * // Basic circle element
 * {
 *   id: "background-circle",
 *   type: "circle",
 *   s: 0,
 *   e: 20,
 *   props: {
 *     radius: 100,
 *     fill: "#000000",
 *     opacity: 0.5
 *   }
 * }
 * 
 * // Circle with animation
 * {
 *   id: "animated-circle",
 *   type: "circle",
 *   s: 2,
 *   e: 15,
 *   props: {
 *     radius: 50,
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
export const CircleElement = {
    name: "circle",

    /**
     * Generator function that creates and manages circle elements in the scene.
     * Handles circle creation, styling, and cleanup.
     *
     * @param params - Element parameters including container reference, element config, and view
     * @returns Generator that controls the circle element lifecycle
     * 
     * @example
     * ```js
     * yield* CircleElement.create({
     *   containerRef: mainContainer,
     *   element: circleConfig,
     *   view: sceneView
     * });
     * ```
     */
    *create({ containerRef, element, view }: ElementParams) {
    const elementRef = createRef<any>();
    yield* waitFor(element?.s);
    yield containerRef().add(
      <Circle ref={elementRef} key={element.id} {...element.props} />
    );
    yield* all(
      addAnimation({ elementRef: elementRef, element: element, view }),
      waitFor(Math.max(0, element.e - element.s))
    );
    yield elementRef().remove();
  },
};
