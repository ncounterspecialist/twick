import { CaptionProps, ElementParams } from "../helpers/types";
import { Color, createRef, Reference, waitFor } from "@twick/core";
import { Rect, Txt } from "@twick/2d";
import { splitPhraseTiming } from "../helpers/caption.utils";
import { TRANSPARENT_COLOR } from "../helpers/constants";
import { hexToRGB } from "../helpers/utils";

/**
 * @group CaptionElement
 * CaptionElement creates and manages styled text overlays in the visualizer scene.
 * Handles caption rendering, text effects, background styling, and timing
 * for professional video presentations and content creation.
 *
 * Features:
 * - Styled text with custom fonts, colors, and backgrounds
 * - Word-by-word timing and animation
 * - Background highlighting and styling options
 * - Text effects and animations
 * - Automatic timing and synchronization
 *
 * @param containerRef - Reference to the container element
 * @param caption - Caption configuration including text, styling, and timing
 * 
 * @example
 * ```js
 * // Basic caption
 * {
 *   id: "welcome-caption",
 *   type: "caption",
 *   s: 2,
 *   e: 8,
 *   t: "Welcome to our presentation!",
 *   props: {
 *     colors: {
 *       text: "#ffffff",
 *       background: "rgba(0,0,0,0.7)"
 *     },
 *     font: {
 *       family: "Arial",
 *       size: 48,
 *       weight: 600
 *     }
 *   }
 * }
 * 
 * // Caption with background highlighting
 * {
 *   id: "highlighted-caption",
 *   type: "caption",
 *   s: 3,
 *   e: 10,
 *   t: "Important information",
 *   capStyle: "highlight_bg",
 *   props: {
 *     colors: {
 *       text: "#ffffff",
 *       background: "rgba(255,0,0,0.8)"
 *     },
 *     font: {
 *       family: "Helvetica",
 *       size: 36,
 *       weight: 700
 *     },
 *     bgOpacity: 0.9,
 *     bgOffsetWidth: 20,
 *     bgOffsetHeight: 10,
 *     bgMargin: [10, 5],
 *     bgRadius: 15,
 *     bgPadding: [20, 15]
 *   }
 * }
 * ```
 */
export const CaptionElement = {
  name: "caption",
  
  /**
   * Generator function that creates and manages caption elements in the scene.
   * Handles caption creation, word timing, styling, and text effects.
   *
   * @param params - Element parameters including container reference and caption config
   * @returns Generator that controls the caption element lifecycle
   * 
   * @example
   * ```js
   * yield* CaptionElement.create({
   *   containerRef: mainContainer,
   *   caption: captionConfig
   * });
   * ```
   */
  *create({ containerRef, caption, containerProps }: ElementParams) {
    const words = splitPhraseTiming(caption);
    let phraseStart = 0;
    if (words?.length) {
      phraseStart = words[0].s;
    }
    let wordsState: {
      refs: Array<{ bgRef?: Reference<any>; textRef: Reference<any> }>;
      props: CaptionProps[];
      idx: number;
      prevTime: number;
    } = {
      refs: [],
      props: [],
      idx: 0,
      prevTime: phraseStart,
    };

    // Set container properties
    containerRef().maxWidth(containerProps?.maxWidth ?? "95%");
    containerRef().wrap(containerProps?.wrap ?? "wrap");
    containerRef().justifyContent(containerProps?.justifyContent ?? "center");
    containerRef().alignItems(containerProps?.alignItems ?? "center");

    for (const word of words) {
      wordsState.props.push(caption.props);
      const textRef = createRef<Txt>();
      const captionProps = caption.props;
      containerRef().add(
        <Txt ref={textRef} {...captionProps} text={word.t} opacity={0} />
      );
      if (caption.capStyle == "highlight_bg") {
        const bgContainerRef = createRef();
        const childTextRef = createRef();
        const _color = new Color({...hexToRGB(captionProps.colors.bgColor), a: captionProps?.bgOpacity ?? 1});
        containerRef().add(
          <Rect
            ref={bgContainerRef}
            fill={_color}
            width={textRef().width() + (captionProps.bgOffsetWidth ?? 30)}
            height={textRef().height() + (captionProps.bgOffsetHeight ?? 10)}
            margin={captionProps.bgMargin ?? [0, -5]}
            radius={captionProps.bgRadius ?? 10}
            padding={captionProps.bgPadding ?? [0, 15]}
            opacity={0}
            alignItems={"center"}
            justifyContent={"center"}
            layout
          >
            <Txt ref={childTextRef} {...captionProps} text={word.t} />
          </Rect>
        );
        textRef().remove();
        wordsState.refs.push({
          bgRef: bgContainerRef,
          textRef: childTextRef,
        });
      } else {
        wordsState.refs.push({
          textRef: textRef,
        });
      }
      wordsState.prevTime = word.e;
      wordsState.idx = wordsState.idx + 1;
    }

    wordsState.prevTime = phraseStart;
    wordsState.idx = 0;

    for (const word of words) {
      if (caption.capStyle == "highlight_bg") {
        yield* wordsState.refs[wordsState.idx]?.bgRef?.().opacity(1, 0);
        yield* waitFor(Math.max(0, word.e - word.s));
        yield* wordsState.refs[wordsState.idx]
          ?.bgRef?.()
          .fill(TRANSPARENT_COLOR, 0);
      } else {
        yield* wordsState.refs[wordsState.idx]?.textRef?.().opacity(1, 0);
        yield* waitFor(Math.max(0, word.e - word.s));
      }
      wordsState.prevTime = word.e;
      wordsState.idx = wordsState.idx + 1;
    }
  },
};
