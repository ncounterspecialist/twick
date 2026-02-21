import { Color, createRef, waitFor } from "@twick/core";
import { Rect, Txt } from "@twick/2d";
import { TRANSPARENT_COLOR } from "../helpers/constants";
import { hexToRGB } from "../helpers/utils";
import type { CaptionStyleHandler, RenderWordsParams, AnimateWordsParams } from "./types";

export const highlightBgHandler: CaptionStyleHandler = {
  id: "highlight_bg",

  renderWords({ containerRef, words, caption }) {
    const captionProps = caption.props;
    const refs: Array<{ textRef: ReturnType<typeof createRef<Txt>>; bgRef: ReturnType<typeof createRef<Rect>> }> = [];

    for (const word of words) {
      const textRef = createRef<Txt>();
      containerRef().add(
        <Txt ref={textRef} {...captionProps} text={word.t} opacity={0} />
      );
      const bgContainerRef = createRef<Rect>();
      const childTextRef = createRef<Txt>();
      const _color = new Color({
        ...hexToRGB(captionProps.colors.bgColor ?? "#444444"),
        a: captionProps?.bgOpacity ?? 1,
      });
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
      refs.push({ textRef: childTextRef, bgRef: bgContainerRef });
    }

    return { refs };
  },

  *animateWords({ words, refs }) {
    for (let i = 0; i < words.length; i++) {
      const r = refs.refs[i];
      const bgRef = r.bgRef;
      if (bgRef) {
        yield* bgRef().opacity(1, 0);
        yield* waitFor(Math.max(0, words[i].e - words[i].s));
        yield* bgRef().fill(TRANSPARENT_COLOR, 0);
      }
    }
  },
};
