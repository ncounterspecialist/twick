import { Color, createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import { hexToRGB } from "../helpers/utils";
import type { CaptionStyleHandler, RenderWordsParams, AnimateWordsParams } from "./types";

const INACTIVE_OPACITY = 0.5;

/**
 * Karaoke: all words visible; current word switches to highlight color (one Txt per word, animate fill).
 * Same ref/animate pattern as word_by_word; no overlay needed.
 */
export const karaokeHandler: CaptionStyleHandler = {
  id: "karaoke",

  renderWords({ containerRef, words, caption }) {
    const captionProps = caption.props;
    const textColor = captionProps.colors?.text ?? "#ffffff";
    const refs: Array<{ textRef: ReturnType<typeof createRef<Txt>> }> = [];

    for (const word of words) {
      const textRef = createRef<Txt>();
      containerRef().add(
        <Txt
          ref={textRef}
          {...captionProps}
          fill={textColor}
          text={word.t}
          opacity={INACTIVE_OPACITY}
        />
      );
      refs.push({ textRef });
    }

    return { refs };
  },

  *animateWords({ words, refs, caption }) {
    const textColor = caption.props.colors?.text ?? "#ffffff";
    const highlightColor = caption.props.colors?.highlight ?? "#ff4081";
    const textColorObj = new Color({ ...hexToRGB(textColor), a: 1 });
    const highlightColorObj = new Color({ ...hexToRGB(highlightColor), a: 1 });
    const n = refs.refs.length;

    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < n; j++) {
        refs.refs[j].textRef().opacity(INACTIVE_OPACITY);
        refs.refs[j].textRef().fill(textColorObj);
      }
      refs.refs[i].textRef().opacity(1);
      refs.refs[i].textRef().fill(highlightColorObj, 0);
      yield* waitFor(Math.max(0, words[i].e - words[i].s));
    }
    for (let j = 0; j < n; j++) {
      refs.refs[j].textRef().opacity(INACTIVE_OPACITY);
      refs.refs[j].textRef().fill(textColorObj);
    }
  },
};
