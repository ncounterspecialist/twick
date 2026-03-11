import { all, Color, createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import { hexToRGB } from "../helpers/utils";
import type { CaptionStyleHandler, RenderWordsParams, AnimateWordsParams } from "./types";

export const softBoxHandler: CaptionStyleHandler = {
  id: "soft_box",

  renderWords({ containerRef, words, caption }) {
    const captionProps = caption.props;
    const refs: Array<{ textRef: ReturnType<typeof createRef<Txt>> }> = [];

    for (const word of words) {
      const textRef = createRef<Txt>();
      containerRef().add(
        <Txt ref={textRef} {...captionProps} text={word.t} opacity={0} />
      );
      refs.push({ textRef });
    }

    return { refs };
  },

  *animateWords({ words, refs, caption }) {
    const textColor = caption.props.colors?.text;
    const highlightColor = caption.props.colors?.highlight ?? textColor;
    for (let i = 0; i < words.length; i++) {
      if (i > 0) {
        yield* all(refs.refs[i-1].textRef().lineWidth(0, 0), refs.refs[i-1].textRef().fill(textColor, 0));

      }
      yield* all(
        refs.refs[i].textRef().fill(highlightColor, 0),
        refs.refs[i].textRef().opacity(1, 0));
      yield* waitFor(Math.max(0, words[i].e - words[i].s));
    }
  },

  preparePhraseContainer({ phraseRef, phraseProps }) {
    const opacity = Math.min(phraseProps?.bgOpacity ?? 0.6, 0.7);
    const bgColor = phraseProps.colors?.bgColor ?? "#333333";
    const _color = new Color({
      ...hexToRGB(bgColor),
      a: opacity,
    });
    phraseRef().fill(_color);
  },
};
