import { createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import type { CaptionStyleHandler, RenderWordsParams, AnimateWordsParams } from "./types";

export const wordByWordHandler: CaptionStyleHandler = {
  id: "word_by_word",

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
