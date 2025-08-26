import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Video, Rect } from "@twick/2d";
import { addAnimation, addFrameEffect, fitElement } from "../helpers/element.utils";
import { applyColorFilter } from "../helpers/filters";
import { logger } from "../helpers/log.utils";

/**
 * @group VideoElement
 * @description Professional video content management with effects and animations
 * 
 * VideoElement creates and manages video content in the visualizer scene.
 * Handles video playback, frame effects, animations, and content fitting
 * for professional video presentations and content creation.
 * 
 * ## Key Features
 * 
 * - **Video playback** with start/end timing control
 * - **Frame effects** and animations for visual enhancement
 * - **Object fit options** for content scaling (contain, cover, fill, none)
 * - **Color filters** and media effects for artistic styling
 * - **Automatic cleanup** and resource management
 * - **Synchronization** with other scene elements
 * 
 * ## Use Cases
 * 
 * - **Main content videos**: Primary video content with effects
 * - **Background videos**: Ambient video backgrounds
 * - **Video overlays**: Picture-in-picture style content
 * - **Video transitions**: Smooth scene-to-scene transitions
 * - **Video effects**: Artistic and creative video manipulation
 * 
 * ## Best Practices
 * 
 * - **Format**: Use MP4 with H.264 encoding for best compatibility
 * - **Resolution**: Match scene dimensions or use appropriate object-fit
 * - **Performance**: Optimize video files for web delivery
 * - **Timing**: Set precise start/end times for synchronization
 * - **Effects**: Combine with animations and frame effects for impact
 * 
 * ## Integration Examples
 * 
 * ### Basic Video Element
 * ```js
 * {
 *   id: "main-video",
 *   type: "video",
 *   s: 0, e: 15,
 *   props: {
 *     src: "video.mp4",
 *     width: 1920,
 *     height: 1080
 *   },
 *   objectFit: "cover"
 * }
 * ```
 * 
 * ### Video with Animation
 * ```js
 * {
 *   id: "intro-video",
 *   type: "video",
 *   s: 0, e: 10,
 *   props: { src: "intro.mp4" },
 *   animation: {
 *     name: "fade",
 *     animate: "enter",
 *     duration: 2
 *   },
 *   objectFit: "contain"
 * }
 * ```
 * 
 * ### Video with Frame Effect
 * ```js
 * {
 *   id: "framed-video",
 *   type: "video",
 *   s: 2, e: 20,
 *   props: { src: "content.mp4" },
 *   frameEffects: [{
 *     name: "circle",
 *     s: 2, e: 20,
 *     props: {
 *       frameSize: [500, 500],
 *       frameShape: "circle",
 *       framePosition: { x: 960, y: 540 },
 *       radius: 250,
 *       objectFit: "cover",
 *       transitionDuration: 1.5
 *     }
 *   }]
 * }
 * ```
 * 
 * ### Complex Video Scene
 * ```js
 * // Multi-track video scene with overlays
 * const videoScene = {
 *   backgroundColor: "#000000",
 *   playerId: "video-player",
 *   properties: { width: 1920, height: 1080 },
 *   tracks: [
 *     {
 *       id: "background",
 *       type: "video",
 *       elements: [{
 *         id: "bg-video",
 *         type: "video",
 *         s: 0, e: 30,
 *         props: { src: "background.mp4", opacity: 0.3 },
 *         objectFit: "cover"
 *       }]
 *     },
 *     {
 *       id: "main-content",
 *       type: "video", 
 *       elements: [
 *         {
 *           id: "main-video",
 *           type: "video",
 *           s: 2, e: 25,
 *           props: { src: "main-content.mp4" },
 *           animation: {
 *             name: "fade",
 *             animate: "enter",
 *             duration: 2
 *           },
 *           frameEffects: [{
 *             name: "rect",
 *             s: 2, e: 25,
 *             props: {
 *               frameSize: [800, 600],
 *               frameShape: "rect",
 *               framePosition: { x: 960, y: 540 },
 *               radius: 20,
 *               objectFit: "cover"
 *             }
 *           }]
 *         },
 *         {
 *           id: "video-caption",
 *           type: "caption",
 *           s: 5, e: 20,
 *           t: "Video Caption",
 *           props: {
 *             colors: { text: "#ffffff", background: "rgba(0,0,0,0.7)" },
 *             font: { family: "Arial", size: 36, weight: 600 }
 *           }
 *         }
 *       ]
 *     }
 *   ]
 * };
 * ```
 * 
 * ## 🚀 Performance Tips
 * 
 * - **Preload videos** for smooth playback
 * - **Use appropriate object-fit** to avoid unnecessary scaling
 * - **Optimize video files** for web delivery (compression, format)
 * - **Batch frame effects** for better performance
 * - **Monitor memory usage** with multiple video elements
 * 
 * @param containerRef - Reference to the container element
 * @param element - Video element configuration and properties
 * @param view - The main scene view for rendering
 * 
 * @example
 * ```js
 * // Basic video element
 * {
 *   id: "main-video",
 *   type: "video",
 *   s: 0, e: 15,
 *   props: {
 *     src: "video.mp4",
 *     width: 1920,
 *     height: 1080
 *   },
 *   objectFit: "cover"
 * }
 * 
 * // Video with frame effect and animation
 * {
 *   id: "framed-video",
 *   type: "video",
 *   s: 2, e: 20,
 *   props: { src: "content.mp4" },
 *   animation: {
 *     name: "fade",
 *     animate: "enter",
 *     duration: 2
 *   },
 *   frameEffects: [{
 *     name: "circle",
 *     s: 2, e: 20,
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
export const VideoElement = {
  name: "video",
  
  /**
   * Generator function that creates and manages video elements in the scene.
   * Handles video creation, frame setup, animations, effects, and cleanup.
   *
   * @param params - Element parameters including container reference, element config, and view
   * @returns Generator that controls the video element lifecycle
   * 
   * @example
   * ```js
   * yield* VideoElement.create({
   *   containerRef: mainContainer,
   *   element: videoConfig,
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
        <Video
          ref={frameElementRef}
          key={`child-${element.id}`}
          play={true}
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
      yield frameElementRef().play(false);
      yield frameElementRef().remove();
      yield frameContainerRef().remove();
    }
  },
};
