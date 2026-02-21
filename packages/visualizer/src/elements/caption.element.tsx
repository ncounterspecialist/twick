import { CaptionProps, ElementParams } from "../helpers/types";
import { ThreadGenerator } from "@twick/core";
import { splitPhraseTiming } from "../helpers/caption.utils";
import { getCaptionStyleHandler, getDefaultCaptionStyleHandler } from "../caption-styles";

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
    const words = splitPhraseTiming(caption);
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
