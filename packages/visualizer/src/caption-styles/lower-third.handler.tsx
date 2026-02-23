import { Color, createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import { hexToRGB } from "../helpers/utils";
import type { CaptionStyleHandler, RenderWordsParams, AnimateWordsParams } from "./types";

/**
 * Lower third: broadcast-style bar. Same word-by-word animation as word_by_word;
 * preparePhraseContainer gives the phrase a bar background (mirrors soft_box pattern).
 */
export const lowerThirdHandler: CaptionStyleHandler = {
  id: "lower_third",

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

  *animateWords({ words, refs }) {
    for (let i = 0; i < words.length; i++) {
      yield* refs.refs[i].textRef().opacity(1, 0);
      yield* waitFor(Math.max(0, words[i].e - words[i].s));
    }
  },

  preparePhraseContainer({ phraseRef, phraseProps }) {
    const opacity = Math.min(phraseProps?.bgOpacity ?? 0.75, 0.85);
    const bgColor = phraseProps.colors?.bgColor ?? "#1a1a1a";
    const _color = new Color({
      ...hexToRGB(bgColor),
      a: opacity,
    });
    phraseRef().fill(_color);
  },
};
