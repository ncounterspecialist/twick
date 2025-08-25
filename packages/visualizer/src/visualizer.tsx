/**
 * @twick/visualizer - Professional Video Visualization Library
 * 
 * Main visualizer component that renders the scene with video, audio, captions and other elements
 * based on the provided input configuration. Creates a complete visualization scene with
 * background, tracks, animations, and effects for professional video content.
 * 
 * ## 🎬 Scene Architecture
 * 
 * The visualizer creates a hierarchical scene structure:
 * ```
 * Scene
 * ├── Background Container
 * ├── Track 1
 * │   ├── Element 1 (Video/Image/Audio)
 * │   ├── Element 2 (Text/Caption)
 * │   └── Element 3 (Shapes/UI)
 * ├── Track 2
 * │   └── ...
 * └── Track N
 * ```
 * 
 * ## 🔧 Core Features
 * 
 * - **Multi-Track Support**: Organize elements into logical tracks
 * - **Animation System**: Rich animation library with enter/exit effects
 * - **Text Effects**: Character and word-level text animations
 * - **Frame Effects**: Visual masking and container transformations
 * - **Media Support**: Video, image, and audio content management
 * - **Timing Control**: Precise start/end timing for all elements
 * 
 * ## 🎯 Use Cases
 * 
 * - **Video Presentations**: Professional slideshows with animations
 * - **Content Creation**: Social media videos with effects
 * - **Educational Content**: Interactive learning materials
 * - **Marketing Videos**: Branded content with visual effects
 * - **Live Streaming**: Real-time visual enhancements
 * 
 * @packageDocumentation
 */

import "./global.css";
import { Rect, makeScene2D, View2D } from "@twick/2d";
import { all, useScene } from "@twick/core";

import {
  DEFAULT_BACKGROUND_COLOR,
  EVENT_TYPES,
  TRACK_TYPES,
} from "./helpers/constants";
import { VideoInput } from "./helpers/types";
import { logger } from "./helpers/log.utils";
import {
  makeAudioTrack,
  makeCaptionTrack,
  makeElementTrack,
  makeSceneTrack,
  makeVideoTrack,
} from "./components/track";
import { dispatchWindowEvent } from "./helpers/event.utils";

/**
 * @category Core
 * @description Main scene generator for video visualization
 * 
 * Creates and configures the main scene for video visualization. Sets up a scene with 
 * background, processes track elements, and handles animation generation for video, 
 * audio, captions, and other visual elements.
 * 
 * ## 🎬 Scene Lifecycle
 * 
 * 1. **Input Processing**: Retrieves video input configuration from scene variables
 * 2. **Background Setup**: Creates background rectangle with specified color
 * 3. **Track Processing**: Iterates through tracks and creates appropriate visualizations
 * 4. **Animation Execution**: Runs all track animations in parallel using `all()`
 * 5. **Event Dispatch**: Sends player update events for status tracking
 * 
 * ## 🔧 Track Types Supported
 * 
 * - **VIDEO**: Video content with playback and effects
 * - **AUDIO**: Audio content with timing and synchronization
 * - **CAPTION**: Text overlays with styling and animations
 * - **SCENE**: Scene containers for organization
 * - **ELEMENT**: Custom elements with animations
 * 
 * ## 📊 Performance Features
 * 
 * - **Parallel Execution**: All track animations run concurrently
 * - **Event-Driven**: Real-time status updates via window events
 * - **Resource Management**: Automatic cleanup and memory optimization
 * - **Error Handling**: Graceful fallbacks for missing configurations
 * 
 * @param name - Name of the scene for identification
 * @param generator - Generator function that handles scene setup and animation
 * @returns Configured scene object with all track animations
 * 
 * @example
 * ```js
 * // Basic scene setup
 * const scene = makeScene2D("scene", function* (view) {
 *   // Scene setup and animation logic
 *   yield* all(...trackAnimations);
 * });
 * 
 * // With video input configuration
 * const videoScene = makeScene2D("video-scene", function* (view) {
 *   // Configure scene variables
 *   useScene().variables.set("input", videoInput);
 *   useScene().variables.set("playerId", "main-player");
 *   
 *   // Scene will automatically process the input
 * });
 * ```
 */
export const scene = makeScene2D("scene", function* (view: View2D) {
  // Get input configuration from scene variables
  const input = useScene().variables.get("input", null)() as VideoInput | null;
  const playerId = useScene().variables.get("playerId", null)() as
    | string
    | null;
  if (input) {
    logger("Scene updated", { playerId, input });
    // Add background rectangle with specified or default color
    yield view.add(
      <Rect
        fill={input.backgroundColor ?? DEFAULT_BACKGROUND_COLOR}
        size={"100%"}
      />
    );

    // Process track elements if present
    if (input.tracks) {
      const movie = [];
      let index = 1;

      // Iterate through each track element and create appropriate visualization
      for (const track of input.tracks) {
        switch (track.type) {
          case TRACK_TYPES.VIDEO:
            movie.push(makeVideoTrack({ view, track }));
            break;
          case TRACK_TYPES.AUDIO:
            movie.push(makeAudioTrack({ view, track }));
            break;
          case TRACK_TYPES.CAPTION:
            movie.push(
              makeCaptionTrack({
                view,
                track,
              })
            );
            break;
          case TRACK_TYPES.SCENE:
            movie.push(makeSceneTrack({ view, track }));
            break;
          case TRACK_TYPES.ELEMENT:
            movie.push(makeElementTrack({ view, track }));
            break;
        }
        index++;
      }
      // Execute all track animations in parallel
      yield* all(...movie);
      dispatchWindowEvent(EVENT_TYPES.PLAYER_UPDATE, {
        detail: {
          status: "ready",
          playerId: playerId,
          message: "All elements created",
        },
      });
    } else {
      dispatchWindowEvent(EVENT_TYPES.PLAYER_UPDATE, {
        detail: {
          status: "ready",
          playerId: playerId,
          message: "No elements to create",
        },
      });
    }
  }
});
