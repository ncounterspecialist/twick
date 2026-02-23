import { createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import type { CaptionStyleHandler, RenderWordsParams, AnimateWordsParams } from "./types";

/**
 * Typewriter: words appear one by one (same pattern as word_by_word).
 * Letter-by-letter would require a wrapper per word so prefixes overlay; follow highlight-bg structure if adding later.
 */
export const typewriterHandler: CaptionStyleHandler = {
  id: "typewriter",

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
};
