import { createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import type { CaptionStyleHandler, RenderWordsParams, AnimateWordsParams } from "./types";

export const outlineOnlyHandler: CaptionStyleHandler = {
  id: "outline_only",

  renderWords({ containerRef, words, caption }) {
    const captionProps = caption.props;
    const refs: Array<{ textRef: ReturnType<typeof createRef<Txt>> }> = [];


    for (const word of words) {
      const textRef = createRef<Txt>();
      containerRef().add(
        <Txt ref={textRef} {...captionProps} text={word.t} opacity={1} lineWidth={0}/>
      );
      refs.push({ textRef });
    }

    return { refs };
  },

  *animateWords({ words, refs, caption }) {
    for (let i = 0; i < words.length; i++) {
      if(i > 0) {
        yield* refs.refs[i-1].textRef().lineWidth(0, 0);
      }
      yield* refs.refs[i].textRef().lineWidth((caption.props.lineWidth ?? 0.4)*5, 0);
      yield* waitFor(Math.max(0, words[i].e - words[i].s));
    }
  },
};
