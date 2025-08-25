import { ElementParams } from "../helpers/types";
import { createRef, waitFor } from "@twick/core";
import { Rect } from "@twick/2d";
import { DEFAULT_BACKGROUND_COLOR, ELEMENT_TYPES } from "../helpers/constants";
import { ImageElement } from "./image.element";
import { VideoElement } from "./video.element";
import { logger } from "../helpers/log.utils";

/**
 * @group SceneElement
 * SceneElement creates and manages scene container elements in the visualizer.
 * Handles scene setup, background configuration, and container management
 * for organizing visual content and elements.
 *
 * Features:
 * - Scene container creation and management
 * - Background and environment setup
 * - Element organization and grouping
 * - Scene-level animations and effects
 *
 * @param containerRef - Reference to the container element
 * @param element - Scene element configuration and properties
 * @param view - The main scene view for rendering
 * 
 * @example
 * ```js
 * // Basic scene element
 * {
 *   id: "main-scene",
 *   type: "scene",
 *   s: 0,
 *   e: 30,
 *   props: {
 *     backgroundColor: "#000000",
 *     width: 1920,
 *     height: 1080
 *   }
 * }
 * 
 * // Scene with background and effects
 * {
 *   id: "animated-scene",
 *   type: "scene",
 *   s: 0,
 *   e: 60,
 *   props: {
 *     backgroundColor: "linear-gradient(45deg, #ff0000, #00ff00)",
 *     width: 1920,
 *     height: 1080,
 *     opacity: 0.9
 *   },
 *   animation: {
 *     name: "fade",
 *     animate: "enter",
 *     duration: 3
 *   }
 * }
 * ```
 */
export const SceneElement = {
    name: "scene",

    /**
     * Generator function that creates and manages scene elements.
     * Handles scene creation, setup, and cleanup.
     *
     * @param params - Element parameters including container reference, element config, and view
     * @returns Generator that controls the scene element lifecycle
     * 
     * @example
     * ```js
     * yield* SceneElement.create({
     *   containerRef: mainContainer,
     *   element: sceneConfig,
     *   view: sceneView
     * });
     * ```
     */
    *create({ containerRef, element, view }: ElementParams) {
        yield* waitFor(element?.s);
        const mediaContainerRef = createRef<any>();
        logger(`SceneElement: ${JSON.stringify(element)}`);
        yield containerRef().add(
            <Rect
                ref={mediaContainerRef}
                fill={element.backgroundColor ?? DEFAULT_BACKGROUND_COLOR}
                size={"100%"}
            />
        );
        if (element.type === ELEMENT_TYPES.IMAGE) {
            yield* ImageElement.create({ containerRef, element, view });
        } else if (element.type === ELEMENT_TYPES.VIDEO) {
            yield* VideoElement.create({ containerRef, element, view });
        }
        yield mediaContainerRef().remove();
    },
};
