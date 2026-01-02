import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import { addAnimation, addTextEffect } from "../helpers/element.utils";
import { logger } from "../helpers/log.utils";

/**
 * @group TextElement
 * TextElement creates and manages text content in the visualizer scene.
 * Handles text rendering, animations, and text effects for dynamic
 * text presentations and content creation.
 *
 * Features:
 * - Text rendering with custom styling and fonts
 * - Text animations and effects
 * - Timing control and synchronization
 * - Automatic cleanup and resource management
 *
 * @param containerRef - Reference to the container element
 * @param element - Text element configuration and properties
 * @param view - The main scene view for rendering
 * 
 * @example
 * ```js
 * // Basic text element
 * {
 *   id: "welcome-text",
 *   type: "text",
 *   s: 0,
 *   e: 10,
 *   t: "Welcome to our presentation!",
 *   props: {
 *     fill: "#ffffff",
 *     fontSize: 48,
 *     fontFamily: "Arial"
 *   }
 * }
 * 
 * // Text with animation and effects
 * {
 *   id: "animated-text",
 *   type: "text",
 *   s: 2,
 *   e: 15,
 *   t: "Animated text content",
 *   props: {
 *     fill: "#ff0000",
 *     fontSize: 36,
 *     fontFamily: "Helvetica"
 *   },
 *   animation: {
 *     name: "fade",
 *     animate: "enter",
 *     duration: 2
 *   },
 *   textEffect: {
 *     name: "typewriter",
 *     duration: 3
 *   }
 * }
 * ```
 */
export const TextElement = {
    name: "text",

    /**
     * Generator function that creates and manages text elements in the scene.
     * Handles text creation, animations, effects, and cleanup.
     *
     * @param params - Element parameters including container reference, element config, and view
     * @returns Generator that controls the text element lifecycle
     * 
     * @example
     * ```js
     * yield* TextElement.create({
     *   containerRef: mainContainer,
     *   element: textConfig,
     *   view: sceneView
     * });
     * ```
     */
    *create({ containerRef, element, view }: ElementParams) { 
    const elementRef = createRef<any>();

    yield* waitFor(element?.s);
    yield containerRef().add(
      <Txt
        ref={elementRef}
        key={element.id}
        text={element.t}
        textWrap={element.props?.textWrap ?? true}
        textAlign={element.props?.textAlign ?? "center"}
        {...element.props}
      />
    );
    yield* all(
      addAnimation({ elementRef: elementRef, element: element, view }),
      addTextEffect({ elementRef: elementRef, element: element }),
      waitFor(Math.max(0, element.e - element.s))
    );
    yield elementRef().remove();
}
  }
  