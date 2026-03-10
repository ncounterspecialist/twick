import { createRef, waitFor } from "@twick/core";
import { Txt } from "@twick/2d";
import type {
  CaptionStyleHandler,
  RenderWordsParams,
  AnimateWordsParams,
} from "./types";

/**
 * Typewriter: phrase-level, letter-by-letter typing effect.
 * Mirrors the behavior of text-effects/TypewriterEffect but scoped to a
 * single caption phrase. All words in the phrase are rendered as one
 * continuous string and revealed character by character over the phrase
 * duration.
 */
export const typewriterHandler: CaptionStyleHandler = {
  id: "typewriter",

  renderWords({ containerRef, words, caption }: RenderWordsParams) {
    const captionProps = caption.props;
    const phraseText =
      caption.t && caption.t.length > 0
        ? caption.t
        : words.map((w) => w.t).join(" ");

    const textRef = createRef<Txt>();
    containerRef().add(
      <Txt ref={textRef} {...captionProps} text={phraseText} />
    );

    return { refs: [{ textRef }] };
  },

  *animateWords({ words, refs }: AnimateWordsParams) {
    if (!refs.refs.length || !words.length) {
      return;
    }

    const textRef = refs.refs[0].textRef;
    const fullText = textRef().text() ?? "";

    if (!fullText.length) {
      // Nothing to animate; just keep the text as-is.
      return;
    }

    // Compute total phrase duration from word timings.
    const phraseStart = words[0].s;
    const phraseEnd = words[words.length - 1].e;
    const totalDuration = Math.max(0, phraseEnd - phraseStart);

    if (totalDuration <= 0) {
      textRef().text(fullText);
      return;
    }

    // Preserve original size to avoid layout shifts while typing.
    const size = textRef().size();
    textRef().text("");
    textRef().size(size);

    // Left-align for a more natural typing feel.
    textRef().textAlign("left");

    // Reserve a small buffer at the end so the final state is visible.
    const bufferTime = Math.min(totalDuration * 0.1, 0.5);
    const effectiveDuration = Math.max(0.001, totalDuration - bufferTime);
    const interval = effectiveDuration / fullText.length;

    // Small initial pause before the first character.
    yield* waitFor(interval);

    // Reveal each character sequentially.
    for (let i = 0; i < fullText.length; i++) {
      yield* waitFor(interval);
      textRef().text(fullText.substring(0, i + 1));
    }
  },
};
