/**
 * Element component that handles the creation and management of visual elements
 * with various properties like position, size, rotation, and effects.
 */

import { createRef, waitFor, all, Reference, Color } from "@revideo/core";
import { Audio, Circle, Icon, Img, Rect, Txt, Video } from "@revideo/2d";
import { logger } from "../helpers/log.utils";
import {
  DEFAULT_BACKGROUND_COLOR,
  ELEMENT_TYPES,
  TRANSPARENT_COLOR,
} from "../helpers/constants";
import { fitElement } from "../helpers/element.utils";
import { applyColorFilter } from "../helpers/filters";
import { addFrameEffect } from "./frame-effects";
import { Caption, CaptionProps, VisualizerElement } from "../helpers/types";
import { splitPhraseTiming } from "../helpers/caption.utils";
import { addAnimations } from "./animation";
import textEffectManager from "../helpers/text-effect-manager";


export function* addMediaElement({
  containerRef,
  element,
  mediaType,
  waitOnStart = true,
}: {
  containerRef: Reference<any>;
  element: VisualizerElement;
  mediaType: string;
  waitOnStart?: boolean;
}) {
  if (waitOnStart) {
    yield* waitFor(element.s);
  }
  const frameContainerRef = createRef<any>();
  const frameElementRef = createRef<any>();
  if (mediaType === ELEMENT_TYPES.VIDEO) {
    const frameProps = element.frame || element.props;
    logger(`Adding video element ${element.id}`);
    yield containerRef().add(
      <Rect ref={frameContainerRef} key={element.id} {...frameProps}>
        <Video
          ref={frameElementRef}
          key={`child-${element.id}`}
          {...element.props}
        />
      </Rect>
    );
  } else if (mediaType === ELEMENT_TYPES.IMAGE) {
    logger(`Adding image element ${element.id}`);
    yield containerRef().add(
      <Rect ref={frameContainerRef} key={element.id} {...element.frame}>
        <Img
          ref={frameElementRef}
          key={`child-${element.id}`}
          {...element.props}
        />
      </Rect>
    );
  }
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
      addAnimations({
        elementRef: frameElementRef,
      }),
      addFrameEffect({
        containerRef: frameContainerRef,
        elementRef: frameElementRef,
        frameElement,
      }),
      waitFor(Math.max(0, element.e - element.s))
    );
    if (element.type === ELEMENT_TYPES.VIDEO) {
      yield frameElementRef().playing(false);
    }
    yield frameElementRef().remove();
    yield frameContainerRef().remove();
  }
}

export function* addCaptionElement({
  caption,
  captionProps,
  containerRef,
  capStyle,
}: {
  caption: Caption;
  captionProps: CaptionProps;
  containerRef: Reference<any>;
  capStyle: string;
}) {
  const words = splitPhraseTiming(caption);
  let phraseStart = 0;
  if (words?.length) {
    phraseStart = words[0].s;
  }
  let wordsState: {
    refs: Array<{ bgRef?: Reference<any>; textRef: Reference<any> }>;
    props: CaptionProps[];
    idx: number;
    prevTime: number;
  } = {
    refs: [],
    props: [],
    idx: 0,
    prevTime: phraseStart,
  };

  for (const word of words) {
    wordsState.props.push(captionProps);
    const textRef = createRef<Txt>();
    containerRef().add(
      <Txt ref={textRef} {...captionProps} text={word.t} opacity={0} />
    );
    if (capStyle == "highlight_bg") {
      const bgContainerRef = createRef();
      const childTextRef = createRef();
      containerRef().add(
        <Rect
          ref={bgContainerRef}
          fill={new Color(captionProps.colors.background).alpha(
            captionProps?.bgOpacity ?? 1
          )}
          width={textRef().width() + (captionProps.bgOffsetWidth ?? 30)}
          height={textRef().height() + (captionProps.bgOffsetHeight ?? 10)}
          margin={captionProps.bgMargin ?? [0, -5]}
          radius={captionProps.bgRadius ?? 10}
          padding={captionProps.bgPadding ?? [0, 15]}
          opacity={0}
          alignItems={"center"}
          justifyContent={"center"}
          layout
        >
          <Txt ref={childTextRef} {...captionProps} text={word.t} />
        </Rect>
      );
      textRef().remove();
      wordsState.refs.push({
        bgRef: bgContainerRef,
        textRef: childTextRef,
      });
    } else {
      wordsState.refs.push({
        textRef: textRef,
      });
    }
    wordsState.prevTime = word.e;
    wordsState.idx = wordsState.idx + 1;
  }

  wordsState.prevTime = phraseStart;
  wordsState.idx = 0;

  for (const word of words) {
    if (capStyle == "highlight_bg") {
      yield* wordsState.refs[wordsState.idx]?.bgRef?.().opacity(1, 0);
      yield* waitFor(Math.max(0, word.e - word.s));
      yield* wordsState.refs[wordsState.idx]
        ?.bgRef?.()
        .fill(TRANSPARENT_COLOR, 0);
    } else {
      yield* wordsState.refs[wordsState.idx]?.textRef?.().opacity(1, 0);
      yield* waitFor(Math.max(0, word.e - word.s));
    }
    wordsState.prevTime = word.e;
    wordsState.idx = wordsState.idx + 1;
  }
}

export function* makeSceneElements({
  containerRef,
  element,
}: {
  containerRef: Reference<any>;
  element: VisualizerElement;
}) {
  switch (element.type) {
    case ELEMENT_TYPES.RECT:
      yield* addSceneRectElement({ containerRef, element });
      break;
    case ELEMENT_TYPES.IMAGE:
    case ELEMENT_TYPES.VIDEO:
      const mediaContainerRef = createRef<any>();
      yield containerRef().add(
        <Rect
          ref={mediaContainerRef}
          fill={element.backgroundColor ?? DEFAULT_BACKGROUND_COLOR}
          size={"100%"}
        />
      );
      yield* addMediaElement({
        containerRef: mediaContainerRef,
        element,
        mediaType: element.type,
        waitOnStart: false,
      });
      yield mediaContainerRef().remove();
      break;
    default:
      yield* waitFor(Math.max(0, element.e - element.s));
      break;
  }
}

function* addSceneRectElement({
  containerRef,
  element,
}: {
  containerRef: Reference<any>;
  element: VisualizerElement;
}) {
  const elementRef = createRef<any>();
  let sequence: any[] = [];
  yield containerRef().add(
    <Rect ref={elementRef} key={element.id} {...element.props}></Rect>
  );
  for (const childElement of element.elements || []) {
    sequence.push(
      makeSceneElements({
        containerRef: elementRef,
        element: childElement,
      })
    );
  }

  yield* all(
    ...sequence,
    addAnimations({
      elementRef,
    }),
    waitFor(Math.max(0, element.e - element.s))
  );
  yield elementRef().remove();
}

export function* addRectElement({
  containerRef,
  element,
}: {
  containerRef: Reference<any>;
  element: VisualizerElement;
}) {
  const elementRef = createRef<any>();
  yield* waitFor(element?.s);
  yield containerRef().add(
    <Rect ref={elementRef} key={element.id} {...element.props} />
  );
  yield* all(
    addAnimations({ elementRef: elementRef }),
    waitFor(Math.max(0, element.e - element.s))
  );
  yield elementRef().remove();
}

export function* addTextElement({
  containerRef,
  element,
}: {
  containerRef: Reference<any>;
  element: VisualizerElement;
}) {
  const elementRef = createRef<any>();
  yield* waitFor(element?.s);
  yield containerRef().add(
    <Txt
      ref={elementRef}
      key={element.id}
      text={element.t}
      {...element.props}
    />
  );
  yield* all(
    addAnimations({ elementRef: elementRef }),
    addTextEffect({ elementRef: elementRef, element: element }),
    waitFor(Math.max(0, element.e - element.s))
  );
  yield elementRef().remove();
}

export function* addCircleElement({
  containerRef,
  element,
}: {
  containerRef: Reference<any>;
  element: VisualizerElement;
}) {
  const elementRef = createRef<any>();
  yield* waitFor(element?.s);
  yield containerRef().add(
    <Circle ref={elementRef} key={element.id} {...element.props} />
  );
  yield* all(
    addAnimations({ elementRef: elementRef }),
    waitFor(Math.max(0, element.e - element.s))
  );
  yield elementRef().remove();
}

export function* addIconElement({
  containerRef,
  element,
}: {
  containerRef: Reference<any>;
  element: VisualizerElement;
}) {
  const elementRef = createRef<any>();
  yield* waitFor(element?.s);
  yield containerRef().add(
    <Icon ref={elementRef} key={element.id} {...element.props} />
  );
  yield* all(
    addAnimations({ elementRef: elementRef }),
    waitFor(Math.max(0, element.e - element.s))
  );
  yield elementRef().remove();
}

export function* addAudioElement({
  containerRef,
  element,
}: {
  containerRef: Reference<any>;
  element: VisualizerElement;
}) {
  const elementRef = createRef<any>();
  yield* waitFor(element?.s);
  yield containerRef().add(
    <Audio ref={elementRef} key={element.id} {...element.props} />
  );
  yield* waitFor(Math.max(0, element.e - element.s));
  yield elementRef().playing(false);
  yield elementRef().remove();
}


export function* addTextEffect({ elementRef, element }: { elementRef: Reference<any>; element: VisualizerElement;}) {
  yield elementRef();
  if (element.textEffect) {
    const effect = textEffectManager.get(element.textEffect.name);
    if (effect) {
      yield* (effect.run({
        ref: elementRef,
        ...element.textEffect,
      }));
    }
  }
}