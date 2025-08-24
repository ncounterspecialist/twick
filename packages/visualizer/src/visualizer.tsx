/**
 * Main visualizer component that renders the scene with video, audio, captions and other elements
 * based on the provided input configuration.
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
 * Creates and configures the main scene for video visualization.
 * Sets up a scene with background, processes track elements, and handles
 * animation generation for video, audio, captions, and other visual elements.
 *
 * @param name - Name of the scene
 * @param generator - Generator function that handles scene setup and animation
 * @returns Configured scene object
 * 
 * @example
 * ```js
 * const scene = makeScene2D("scene", function* (view) {
 *   // Scene setup and animation logic
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
