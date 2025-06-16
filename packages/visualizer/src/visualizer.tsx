/**
 * Main visualizer component that renders the scene with video, audio, captions and other elements
 * based on the provided input configuration.
 */

import "./global.css";
import { Rect, makeScene2D, View2D } from "@revideo/2d";
import { all, useScene } from "@revideo/core";

import { DEFAULT_BACKGROUND_COLOR, TIMELINE_TYPES } from "./helpers/constants";
import { VideoInput } from "./helpers/types";
import { logger } from "./helpers/log.utils";
import {
  makeAudioTimeline,
  makeCaptionTimeline,
  makeElementTimeline,
  makeSceneTimeline,
  makeVideoTimeline,
} from "./components/timeline";

/**
 * Creates and configures the main scene for video visualization
 * @param {string} name - Name of the scene
 * @param {Function} generator - Generator function that handles scene setup and animation
 * @returns {Scene2D} Configured scene object
 */
export const scene = makeScene2D("scene", function* (view: View2D) {
  // Get input configuration from scene variables
  const input = useScene().variables.get("input", null)() as VideoInput | null;
  
  if (input) {
    logger("Scene updated", input);
    
    // Add background rectangle with specified or default color
    yield view.add(
      <Rect
        fill={input.backgroundColor ?? DEFAULT_BACKGROUND_COLOR}
        size={"100%"}
      />
    );

    // Process timeline elements if present
    if (input.timeline) {
      const movie = [];
      let index = 1;

      // Iterate through each timeline element and create appropriate visualization
      for (const timeline of input.timeline) {
        switch (timeline.type) {
          case TIMELINE_TYPES.VIDEO:
            movie.push(makeVideoTimeline({ view, timeline }));
            break;
          case TIMELINE_TYPES.AUDIO:
            movie.push(makeAudioTimeline({ view, timeline }));
            break;
          case TIMELINE_TYPES.CAPTION:
            movie.push(
              makeCaptionTimeline({
                view,
                timeline,
              })
            );
            break;
          case TIMELINE_TYPES.SCENE:
            movie.push(makeSceneTimeline({ view, timeline }));
            break;
          case TIMELINE_TYPES.ELEMENT:
            movie.push(makeElementTimeline({ view, timeline }));
            break;
        }
        index++;
      }
      
      // Execute all timeline animations in parallel
      yield* all(...movie);
    }
  }
});
