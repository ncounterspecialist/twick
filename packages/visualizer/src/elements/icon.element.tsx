import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Icon } from "@twick/2d";
import { addAnimation } from "../helpers/element.utils";

/**
 * @group IconElement
 * IconElement creates and manages icon elements in the visualizer scene.
 * Handles icon rendering, styling, and animations for UI elements and
 * visual design components.
 *
 * Features:
 * - Icon rendering with custom styling
 * - Size and position control
 * - Color and opacity customization
 * - Animation support
 *
 * @param containerRef - Reference to the container element
 * @param element - Icon element configuration and properties
 * @param view - The main scene view for rendering
 * 
 * @example
 * ```js
 * // Basic icon element
 * {
 *   id: "play-icon",
 *   type: "icon",
 *   s: 0,
 *   e: 20,
 *   props: {
 *     icon: "play",
 *     size: 64,
 *     fill: "#ffffff"
 *   }
 * }
 * 
 * // Icon with animation
 * {
 *   id: "animated-icon",
 *   type: "icon",
 *   s: 2,
 *   e: 15,
 *   props: {
 *     icon: "pause",
 *     size: 48,
 *     fill: "#ff0000",
 *     opacity: 0.8
 *   },
 *   animation: {
 *     name: "fade",
 *     animate: "enter",
 *     duration: 2
 *   }
 * }
 * ```
 */
export const IconElement = {
    name: "icon",

    /**
     * Generator function that creates and manages icon elements in the scene.
     * Handles icon creation, styling, and cleanup.
     *
     * @param params - Element parameters including container reference, element config, and view
     * @returns Generator that controls the icon element lifecycle
     * 
     * @example
     * ```js
     * yield* IconElement.create({
     *   containerRef: mainContainer,
     *   element: iconConfig,
     *   view: sceneView
     * });
     * ```
     */
    *create({ containerRef, element, view }: ElementParams) {
    const elementRef = createRef<any>();
    yield* waitFor(element?.s);
    yield containerRef().add(
      <Icon ref={elementRef} key={element.id} {...element.props} />
    );
    yield* all(
      addAnimation({ elementRef: elementRef, element: element, view }),
      waitFor(Math.max(0, element.e - element.s))
    );
    yield elementRef().remove();
  },
};
