import { CaptionProps, ElementParams } from "../helpers/types";
import { ThreadGenerator } from "@twick/core";
import { splitPhraseTiming } from "../helpers/caption.utils";
import { getCaptionStyleHandler, getDefaultCaptionStyleHandler } from "../caption-styles";

function computeWordTimings(caption: ElementParams["caption"]) {
  if (!caption) {
    return [];
  }

  const text = caption.t ?? "";
  const baseWords = text.split(" ").filter((w) => w.length > 0);
  if (!baseWords.length) {
    return [];
  }

  // wordsMs is stored in milliseconds (absolute along the media timeline).
  const wordsMs: number[] | undefined = (caption as any)?.props?.wordsMs;

  if (!Array.isArray(wordsMs) || wordsMs.length < baseWords.length) {
    // Fallback: proportional split across phrase duration.
    return splitPhraseTiming(caption);
  }

  const phraseEndSec = caption.e;

  return baseWords.map((word, index) => {
    const startMs = wordsMs[index];
    const endMs =
      index + 1 < wordsMs.length ? wordsMs[index + 1] : phraseEndSec * 1000;

    const startSec = startMs / 1000;
    const endSec = endMs / 1000;

    return {
      t: word,
      s: startSec,
      e: endSec,
    };
  });
}

/**
 * @group CaptionElement
 * CaptionElement creates and manages styled text overlays in the visualizer scene.
 * Delegates rendering and animation to registered caption style handlers.
 *
 * @param containerRef - Reference to the container element
 * @param caption - Caption configuration including text, styling, and timing
 */
export const CaptionElement = {
  name: "caption",

  *create({ containerRef, caption, containerProps }: ElementParams): ThreadGenerator {
    const words = computeWordTimings(caption);
    if (!words?.length) return;

    const handler =
      getCaptionStyleHandler(caption.capStyle ?? "") ?? getDefaultCaptionStyleHandler();

    containerRef().maxWidth(containerProps?.maxWidth ?? "95%");
    containerRef().wrap(containerProps?.wrap ?? "wrap");
    containerRef().justifyContent(containerProps?.justifyContent ?? "center");
    containerRef().alignItems(containerProps?.alignItems ?? "center");

    const captionWithProps = {
      ...caption,
      props: caption.props ?? ({} as CaptionProps),
    };

    const refs = handler.renderWords({
      containerRef,
      words,
      caption: captionWithProps,
    });

    yield* handler.animateWords({
      words,
      refs,
      caption: captionWithProps,
    });
  },
};
