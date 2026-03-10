import { all, Color, createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import { hexToRGB } from "../helpers/utils";
import type { CaptionStyleHandler, RenderWordsParams, AnimateWordsParams } from "./types";

const INACTIVE_OPACITY = 0.45;


export const karaokeWordHandler: CaptionStyleHandler = {
  id: "karaoke-word",

  renderWords({ containerRef, words, caption }) {
    const captionProps = caption.props;

    const refs: Array<{ textRef: ReturnType<typeof createRef<Txt>> }> = [];

    for (const word of words) {
      const textRef = createRef<Txt>();
      containerRef().add(
        <Txt
          ref={textRef}
          {...captionProps}
          text={word.t}
          opacity={INACTIVE_OPACITY}
        />
      );
      refs.push({ textRef });
    }

    return { refs };
  },

  *animateWords({ words, refs, caption }) {
    for (let i = 0; i < words.length; i++) {
      if (i > 0) {
        yield* refs.refs[i - 1].textRef().opacity(INACTIVE_OPACITY, 0);
      }
      yield* refs.refs[i].textRef().opacity(1, 0);
      yield* waitFor(Math.max(0, words[i].e - words[i].s));
    }
  },
};
