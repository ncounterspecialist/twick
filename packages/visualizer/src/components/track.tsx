/**
 * Track component that handles the creation and management of different types of tracks
 * including video, audio, captions, scenes, and elements.
 */

import { Layout, Rect, View2D, Audio, Img, Txt } from "@twick/2d";
import { VisualizerTrack, WatermarkInput } from "../helpers/types";
import { all, createRef, ThreadGenerator, waitFor } from "@twick/core";
import {
  CAPTION_STYLE,
  DEFAULT_CAPTION_COLORS,
  DEFAULT_CAPTION_FONT,
} from "../helpers/constants";
import { logger } from "../helpers/log.utils";
import elementController from "../controllers/element.controller";
import watermarkController from "../controllers/watermark.controller";
import { getCaptionStyleHandler } from "../caption-styles";

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
  view.add(<Layout size={"100%"} ref={frameRef} />);
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
  const defaultCapStyle = "highlight_bg";

  const applyToAll = tProps?.applyToAll ?? false;

  const trackDefaultProps =
    (CAPTION_STYLE[tProps?.capStyle ?? defaultCapStyle] || CAPTION_STYLE[defaultCapStyle] || {}).word || {};

  for (const element of track.elements) {
    const eProps = element.props;
    const resolvedCapStyle = eProps?.capStyle ?? tProps?.capStyle ?? defaultCapStyle;
    const rectStyle =
      (CAPTION_STYLE[resolvedCapStyle] || CAPTION_STYLE[defaultCapStyle] || {}).rect ||
      {};
    // Cast alignItems/justifyContent as any to satisfy RectProps
    const mappedRectStyle = {
      ...rectStyle,
      justifyContent: rectStyle.justifyContent as any,
      alignItems: rectStyle.alignItems as any,
    };

    const phraseColors = applyToAll ? tProps?.colors : eProps?.colors ?? tProps?.colors ?? DEFAULT_CAPTION_COLORS;

    const resolvedFont = applyToAll ? tProps?.font : eProps?.font ?? tProps?.font ?? DEFAULT_CAPTION_FONT;
    const defaults = trackDefaultProps as { fontFamily?: string; fontSize?: number; fontWeight?: number };
    const phraseProps = {
      ...trackDefaultProps,
      ...(tProps?.captionProps || {}),
      colors: phraseColors,
      font: resolvedFont,
      fontFamily: resolvedFont?.family ?? defaults?.fontFamily ?? DEFAULT_CAPTION_FONT.family,
      fontSize: resolvedFont?.size ?? defaults?.fontSize ?? DEFAULT_CAPTION_FONT.size,
      fontWeight: resolvedFont?.weight ?? defaults?.fontWeight ?? DEFAULT_CAPTION_FONT.weight,
      fill: phraseColors.text,
      bgColor: phraseColors.bgColor,
      bgOpacity: tProps?.bgOpacity ?? 1,
    };

    yield* waitFor(element?.s - prevTime);
    const phraseRef = createRef<any>();
    captionTrackRef().add(
      <Rect
        ref={phraseRef}
        key={element.id}
        {...mappedRectStyle}
        x={applyToAll ? tProps?.x : eProps?.x ?? tProps?.x}
        y={applyToAll ? tProps?.y : eProps?.y ?? tProps?.y}
        layout
      />
    );
    // Allow styles to tweak how phrase-level props are interpreted.
    // For classic outline, use explicit outlineColor so it is independent
    // from per-word highlight color.
    const styledPhraseProps = {
      ...phraseProps,
      ...(resolvedCapStyle === "outline_only" && phraseColors?.outlineColor
        ? { stroke: phraseColors.outlineColor }
        : {}),
    };

    const styleHandler = getCaptionStyleHandler(resolvedCapStyle ?? "");
    if (styleHandler?.preparePhraseContainer) {
      styleHandler.preparePhraseContainer({
        phraseRef,
        phraseProps: styledPhraseProps,
      });
    }
    yield* elementController.get("caption")?.create({
      containerRef: phraseRef,
      caption: {
        ...element,
        t: element.t ?? "",
        capStyle: eProps?.capStyle ?? tProps?.capStyle,
        props: styledPhraseProps,
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
  view.add(<Layout size={"100%"} ref={frameRef} />);
  for (const sceneElement of track.elements || []) {
    yield* elementController.get("scene")?.create({
      containerRef: frameRef,
      element: sceneElement,
      view,
      containerProps: track.containerProps,
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
      const handler = elementController.get(element.type);
      if (handler) {
        sequence.push(
          handler.create({
            containerRef: elementTrackRef,
            element,
            view,
          })
        );
      }
    }
  } catch (error) {
    logger("Error creating element track", error);
  }

  yield* all(...sequence);
  yield elementTrackRef().remove();
}

/**
 * Creates a watermark overlay on top of all tracks.
 * Dispatches to the registered watermark renderer by type (text | image).
 * Added last to ensure it renders on top of all content.
 */
export function* makeWatermarkTrack({
  view,
  watermark,
  duration,
}: {
  view: View2D;
  watermark: WatermarkInput;
  duration: number;
}) {
  if (duration <= 0) return;

  // Add watermark after other tracks have started (ensures it renders on top)
  yield* waitFor(0.001);

  const renderer = watermarkController.get(watermark.type);
  if (renderer) {
    yield* renderer.render({ view, watermark, duration });
  }
}
