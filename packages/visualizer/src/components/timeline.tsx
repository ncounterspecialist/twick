/**
 * Timeline component that handles the creation and management of different types of timelines
 * including video, audio, captions, scenes, and elements.
 */

import { Layout, Rect, View2D, Audio } from "@revideo/2d";
import { VisualizerTimeline } from "../helpers/types";
import { all, Color, createRef, waitFor } from "@revideo/core";
import { addAudioElement, addCaptionElement, addCircleElement, addIconElement, addMediaElement, addRectElement, addTextElement, makeSceneElements } from "./element";
import { CAPTION_STYLE, DEFAULT_CAPTION_COLORS, DEFAULT_CAPTION_FONT, ELEMENT_TYPES } from "../helpers/constants";
import { logger } from "../helpers/log.utils";

/**
 * Creates a video timeline with specified configuration
 * @param {Object} params - Parameters for video timeline creation
 * @param {View2D} params.view - The 2D view to render the video in
 * @param {VideoTimeline} params.timeline - Video timeline configuration
 * @returns {Generator} Generator function for video timeline animation
 */
export function* makeVideoTimeline({
  view,
  timeline,
}: {
  view: View2D;
  timeline: VisualizerTimeline;
}) {
  const frameRef = createRef<any>();
  let prevTime = 0;
  view.add(<Layout size={"100%"} ref={frameRef} layout />);
  for (const element of timeline.elements || []) {
    yield* waitFor(element?.s - prevTime);
    yield* addMediaElement({
      containerRef: frameRef,
      element,
      mediaType: ELEMENT_TYPES.VIDEO,
      waitOnStart: false,
    });
    prevTime = element.e;
  }
  yield frameRef().remove();
}

/**
 * Creates an audio timeline with specified configuration
 * @param {Object} params - Parameters for audio timeline creation
 * @param {View2D} params.view - The 2D view to render the audio in
 * @param {AudioTimeline} params.timeline - Audio timeline configuration
 * @returns {Generator} Generator function for audio timeline animation
 */
export function* makeAudioTimeline({
  view,
  timeline,
}: {
  view: View2D;
  timeline: VisualizerTimeline;
}) {
  let prevTime = 0;
  for (const audioElement of timeline.elements) {
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
 * Creates a caption timeline with specified configuration
 * @param {Object} params - Parameters for caption timeline creation
 * @param {View2D} params.view - The 2D view to render the caption in
 * @param {CaptionTimeline} params.timeline - Caption timeline configuration
 * @returns {Generator} Generator function for caption timeline animation
 */
export function* makeCaptionTimeline({ view, timeline }: { view: View2D; timeline: VisualizerTimeline }) {
  let prevTime = 0;
  const captionTimelineRef = createRef<any>();
  view.add(<Layout size={"100%"} ref={captionTimelineRef} />);

  const tProps = timeline?.props;

  const timelineDefaultProps = (CAPTION_STYLE[tProps?.capStyle ?? ""] || {}).word || {};

  for (const element of timeline.elements) {
    const eProps = element.props;
    const rectStyle = (CAPTION_STYLE[eProps?.capStyle ?? tProps?.capStyle ?? ""] || {}).rect || {};
    // Cast alignItems/justifyContent as any to satisfy RectProps
    const mappedRectStyle = {
      ...rectStyle,
      justifyContent: rectStyle.justifyContent as any,
      alignItems: rectStyle.alignItems as any,
    };
    const phraseProps = {
      ...timelineDefaultProps,
      colors: {
        text: eProps?.colors?.text ?? tProps?.colors?.text ?? DEFAULT_CAPTION_COLORS.text,
        background: eProps?.colors?.background ?? tProps?.colors?.background ?? DEFAULT_CAPTION_COLORS.background,
      },
      font: {
        family: eProps?.font?.family ?? tProps?.font?.family ?? DEFAULT_CAPTION_FONT.family,
        size: eProps?.font?.size ?? tProps?.font?.size ?? DEFAULT_CAPTION_FONT.size,
        weight: eProps?.font?.weight ?? tProps?.font?.weight ?? DEFAULT_CAPTION_FONT.weight
      },
      fill: eProps?.colors?.text ?? tProps?.colors?.text ?? DEFAULT_CAPTION_COLORS.text,
      bgColor: eProps?.colors?.background ?? tProps?.colors?.background ??DEFAULT_CAPTION_COLORS.background,
      bgOpacity: eProps?.bgOpacity ?? tProps?.bgOpacity ?? 1,
      ...(tProps?.captionProps || {}),
    };

    yield* waitFor(element?.s - prevTime);
    const phraseRef = createRef<any>();
    captionTimelineRef().add(
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
      phraseRef().fill(
        new Color(phraseProps.bgColor).alpha(phraseProps.bgOpacity)
      );
    }
    yield* addCaptionElement({
      caption: {...element, t: element.t ?? ""},
      captionProps: phraseProps,
      containerRef: phraseRef,
      capStyle: eProps?.capStyle ?? tProps?.capStyle,
    });
    prevTime = element.e;
    yield phraseRef().remove();
  }
}

/**
 * Creates a scene timeline with specified configuration
 * @param {Object} params - Parameters for scene timeline creation
 * @param {View2D} params.view - The 2D view to render the scene in
 * @param {SceneTimeline} params.timeline - Scene timeline configuration
 * @returns {Generator} Generator function for scene timeline animation
 */
export function* makeSceneTimeline({ view, timeline }: { view: View2D; timeline: VisualizerTimeline }) {
  const frameRef = createRef<any>();
  let prevTime = 0;
  view.add(<Layout size={"100%"} ref={frameRef} layout />);
  for (const sceneElement of timeline.elements || []) {
    yield* waitFor(sceneElement?.s - prevTime);
    yield* makeSceneElements({
      containerRef: frameRef,
      element: sceneElement,
    });
    prevTime = sceneElement.e;
  }
  yield frameRef().remove();
}

/**
 * Creates an element timeline with specified configuration
 * @param {Object} params - Parameters for element timeline creation
 * @param {View2D} params.view - The 2D view to render the element in
 * @param {ElementTimeline} params.timeline - Element timeline configuration
 * @returns {Generator} Generator function for element timeline animation
 */
export function* makeElementTimeline({ view, timeline }: { view: View2D; timeline: VisualizerTimeline }) {
  const elementTimelineRef = createRef<any>();
  view.add(<Layout size={"100%"} ref={elementTimelineRef} />);

  const sequence = [];
  for (const element of timeline.elements) {
    switch (element.type) {
      case ELEMENT_TYPES.RECT:
        sequence.push(
          addRectElement({ containerRef: elementTimelineRef, element })
        );
        break;
      case ELEMENT_TYPES.TEXT:
        sequence.push(
          addTextElement({ containerRef: elementTimelineRef, element })
        );
        break;
      case ELEMENT_TYPES.IMAGE:
        sequence.push(
          addMediaElement({
            containerRef: elementTimelineRef,
            element,
            mediaType: ELEMENT_TYPES.IMAGE,
          })
        );
        break;
      case ELEMENT_TYPES.VIDEO:
        sequence.push(
          addMediaElement({
            containerRef: elementTimelineRef,
            element,
            mediaType: ELEMENT_TYPES.VIDEO,
          })
        );
        break;
      case ELEMENT_TYPES.AUDIO:
        sequence.push(
          addAudioElement({ containerRef: elementTimelineRef, element })
        );
        break;
      case ELEMENT_TYPES.CIRCLE:
        sequence.push(
          addCircleElement({ containerRef: elementTimelineRef, element })
        );
        break;
      case ELEMENT_TYPES.ICON:
        sequence.push(
          addIconElement({ containerRef: elementTimelineRef, element })
        );
        break;
    }
  }
  yield* all(...sequence);
  yield elementTimelineRef().remove();
}
