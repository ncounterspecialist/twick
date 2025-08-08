/**
 * Track component that handles the creation and management of different types of tracks
 * including video, audio, captions, scenes, and elements.
 */

import { Layout, Rect, View2D, Audio } from "@twick/2d";
import { VisualizerTrack } from "../helpers/types";
import { all, Color, createRef, ThreadGenerator, waitFor } from "@twick/core";
import {
  CAPTION_STYLE,
  DEFAULT_CAPTION_COLORS,
  DEFAULT_CAPTION_FONT,
} from "../helpers/constants";
import { logger } from "../helpers/log.utils";
import elementController from "../controllers/element.controller";
import { hexToRGB } from "../helpers/utils";

/**
 * Creates a video track with specified configuration
 * @param {Object} params - Parameters for video track creation
 * @param {View2D} params.view - The 2D view to render the video in
 * @param {VideoTrack} params.track - Video track configuration
 * @returns {Generator} Generator function for video track animation
 */
export function* makeVideoTrack({
  view,
  track,
}: {
  view: View2D;
  track: VisualizerTrack;
}) {
  const frameRef = createRef<any>();
  let prevTime = 0;
  view.add(<Layout size={"100%"} ref={frameRef} layout />);
  for (const element of track.elements || []) {
    yield* waitFor(element?.s - prevTime);
    yield* elementController.get("video")?.create({
      containerRef: frameRef,
      element,
      view,
    });
    prevTime = element.e;
  }
  yield frameRef().remove();
}

/**
 * Creates an audio track with specified configuration
 * @param {Object} params - Parameters for audio track creation
 * @param {View2D} params.view - The 2D view to render the audio in
 * @param {AudioTrack} params.track - Audio track configuration
 * @returns {Generator} Generator function for audio track animation
 */
export function* makeAudioTrack({
  view,
  track,
}: {
  view: View2D;
  track: VisualizerTrack;
}) {
  let prevTime = 0;
  for (const audioElement of track.elements) {
    const audioRef = createRef<any>();
    yield* waitFor(audioElement?.s - prevTime);
    prevTime = audioElement?.e;
    logger(`Adding audio element ${audioElement.id}`);
    view.add(
      <Audio ref={audioRef} key={audioElement.id} {...audioElement.props} />
    );
    yield* waitFor(Math.max(0, audioElement.e - audioElement.s));
    yield audioRef().playing(false);
    yield audioRef().remove();
  }
}

/**
 * Creates a caption track with specified configuration
 * @param {Object} params - Parameters for caption track creation
 * @param {View2D} params.view - The 2D view to render the caption in
 * @param {CaptionTrack} params.track - Caption track configuration
 * @returns {Generator} Generator function for caption track animation
 */
export function* makeCaptionTrack({
  view,
  track,
}: {
  view: View2D;
  track: VisualizerTrack;
}) {
  let prevTime = 0;
  const captionTrackRef = createRef<any>();
  view.add(<Layout size={"100%"} ref={captionTrackRef} />);

  const tProps = track?.props;

  const trackDefaultProps =
    (CAPTION_STYLE[tProps?.capStyle ?? ""] || {}).word || {};

  for (const element of track.elements) {
    const eProps = element.props;
    const rectStyle =
      (CAPTION_STYLE[eProps?.capStyle ?? tProps?.capStyle ?? ""] || {}).rect ||
      {};
    // Cast alignItems/justifyContent as any to satisfy RectProps
    const mappedRectStyle = {
      ...rectStyle,
      justifyContent: rectStyle.justifyContent as any,
      alignItems: rectStyle.alignItems as any,
    };
    const phraseProps = {
      ...trackDefaultProps,
      colors: {
        text:
          eProps?.colors?.text ??
          tProps?.colors?.text ??
          DEFAULT_CAPTION_COLORS.text,
        background:
          eProps?.colors?.background ??
          tProps?.colors?.background ??
          DEFAULT_CAPTION_COLORS.background,
      },
      font: {
        family:
          eProps?.font?.family ??
          tProps?.font?.family ??
          DEFAULT_CAPTION_FONT.family,
        size:
          eProps?.font?.size ?? tProps?.font?.size ?? DEFAULT_CAPTION_FONT.size,
        weight:
          eProps?.font?.weight ??
          tProps?.font?.weight ??
          DEFAULT_CAPTION_FONT.weight,
      },
      fill:
        eProps?.colors?.text ??
        tProps?.colors?.text ??
        DEFAULT_CAPTION_COLORS.text,
      bgColor:
        eProps?.colors?.background ??
        tProps?.colors?.background ??
        DEFAULT_CAPTION_COLORS.background,
      bgOpacity: eProps?.bgOpacity ?? tProps?.bgOpacity ?? 1,
      ...(tProps?.captionProps || {}),
    };

    yield* waitFor(element?.s - prevTime);
    const phraseRef = createRef<any>();
    captionTrackRef().add(
      <Rect
        ref={phraseRef}
        key={element.id}
        {...mappedRectStyle}
        x={eProps?.x ?? tProps?.x}
        y={eProps?.y ?? tProps?.y}
        layout
      />
    );
    if (tProps?.capStyle === "word_by_word_with_bg") {
      const _color = new Color({...hexToRGB(phraseProps.bgColor), a: phraseProps?.bgOpacity ?? 1});
      phraseRef().fill(_color);
    }
    yield* elementController.get("caption")?.create({
      containerRef: phraseRef,
      caption: {
        ...element,
        t: element.t ?? "",
        capStyle: eProps?.capStyle ?? tProps?.capStyle,
        props: phraseProps,
      },
      view,
    });
    prevTime = element.e;
    yield phraseRef().remove();
  }
}

/**
 * Creates a scene track with specified configuration
 * @param {Object} params - Parameters for scene track creation
 * @param {View2D} params.view - The 2D view to render the scene in
 * @param {SceneTrack} params.track - Scene track configuration
 * @returns {Generator} Generator function for scene track animation
 */
export function* makeSceneTrack({
  view,
  track,
}: {
  view: View2D;
  track: VisualizerTrack;
}) {
  const frameRef = createRef<any>();
  view.add(<Layout size={"100%"} ref={frameRef} layout />);
  for (const sceneElement of track.elements || []) {
    yield* elementController.get("scene")?.create({
      containerRef: frameRef,
      element: sceneElement,
      view,
    });
  }
  yield frameRef().remove();
}

/**
 * Creates an element track with specified configuration
 * @param {Object} params - Parameters for element track creation
 * @param {View2D} params.view - The 2D view to render the element in
 * @param {ElementTrack} params.track - Element track configuration
 * @returns {Generator} Generator function for element track animation
 */
export function* makeElementTrack({
  view,
  track,
}: {
  view: View2D;
  track: VisualizerTrack;
}) {
  const elementTrackRef = createRef<any>();
  view.add(<Layout size={"100%"} ref={elementTrackRef} />);

  const sequence: ThreadGenerator[] = [];
  try {
    for (const element of track.elements) {
      sequence.push(
        elementController.get(element.type)?.create({
          containerRef: elementTrackRef,
          element,
          view,
        })
      );
    }
  } catch (error) {
    logger("Error creating element track", error);
  }
  
  yield* all(...sequence);
  yield elementTrackRef().remove();
}
