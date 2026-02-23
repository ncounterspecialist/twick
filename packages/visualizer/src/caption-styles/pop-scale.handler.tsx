import { createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import type { CaptionStyleHandler, RenderWordsParams, AnimateWordsParams } from "./types";

const POP_DURATION = 0.2;

/**
 * Pop: words pop in with a quick opacity fade (same ref/animate pattern as word_by_word).
 * Scale-based bounce can be added later if Txt scale API is confirmed in this engine.
 */
export const popScaleHandler: CaptionStyleHandler = {
  id: "pop_scale",

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
      yield* refs.refs[i].textRef().opacity(1, POP_DURATION);
      yield* waitFor(Math.max(0, words[i].e - words[i].s - POP_DURATION));
    }
  },
};
