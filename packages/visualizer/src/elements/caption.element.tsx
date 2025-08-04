import { CaptionProps, ElementParams } from "../helpers/types";
import { Color, createRef, Reference, waitFor } from "@twick/core";
import { Rect, Txt } from "@twick/2d";
import { splitPhraseTiming } from "../helpers/caption.utils";
import { TRANSPARENT_COLOR } from "../helpers/constants";
import { hexToRGB } from "../helpers/utils";

export const CaptionElement = {
  name: "caption",
  *create({ containerRef, caption }: ElementParams) {
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
      wordsState.props.push(caption.props);
      const textRef = createRef<Txt>();
      const captionProps = caption.props;
      containerRef().add(
        <Txt ref={textRef} {...captionProps} text={word.t} opacity={0} />
      );
      if (caption.capStyle == "highlight_bg") {
        const bgContainerRef = createRef();
        const childTextRef = createRef();
        const _color = new Color({...hexToRGB(captionProps.colors.background), a: captionProps?.bgOpacity ?? 1});
        containerRef().add(
          <Rect
            ref={bgContainerRef}
            fill={_color}
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
      if (caption.capStyle == "highlight_bg") {
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
  },
};
