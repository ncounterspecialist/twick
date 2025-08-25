import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Audio } from "@twick/2d";
import { addAnimation } from "../helpers/element.utils";
import { logger } from "../helpers/log.utils";

/**
 * @group AudioElement
 * AudioElement creates and manages audio content in the visualizer scene.
 * Handles audio playback, timing, and synchronization for background music,
 * sound effects, and audio narration in video presentations.
 *
 * Features:
 * - Audio playback with start/end timing control
 * - Automatic play/pause management
 * - Resource cleanup and memory management
 * - Synchronization with visual elements
 *
 * @param containerRef - Reference to the container element
 * @param element - Audio element configuration and properties
 * @param view - The main scene view for rendering
 * 
 * @example
 * ```js
 * // Basic audio element
 * {
 *   id: "background-music",
 *   type: "audio",
 *   s: 0,
 *   e: 30,
 *   props: {
 *     src: "music.mp3",
 *     volume: 0.7
 *   }
 * }
 * 
 * // Sound effect with timing
 * {
 *   id: "sound-effect",
 *   type: "audio",
 *   s: 5,
 *   e: 8,
 *   props: {
 *     src: "effect.wav",
 *     volume: 1.0
 *   }
 * }
 * ```
 */
export const AudioElement = {
  name: "audio",

  /**
   * Generator function that creates and manages audio elements in the scene.
   * Handles audio creation, playback control, and cleanup.
   *
   * @param params - Element parameters including container reference, element config, and view
   * @returns Generator that controls the audio element lifecycle
   * 
   * @example
   * ```js
   * yield* AudioElement.create({
   *   containerRef: mainContainer,
   *   element: audioConfig,
   *   view: sceneView
   * });
   * ```
   */
  *create({ containerRef, element, view }: ElementParams) {
    const elementRef = createRef<any>();
    yield* waitFor(element?.s);
    yield containerRef().add(
      <Audio ref={elementRef} key={element.id} play={true} {...element.props} />
    );
    yield* waitFor(Math.max(0, element.e - element.s));
    yield elementRef().play(false);
    yield elementRef().remove();
  },
};
