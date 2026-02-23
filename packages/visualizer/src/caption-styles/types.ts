import type { Reference, ThreadGenerator } from "@twick/core";
import type { Rect, Txt } from "@twick/2d";
import type { Caption, CaptionProps } from "../helpers/types";

/**
 * Word timing from splitPhraseTiming.
 */
export interface WordTiming {
  t: string;
  s: number;
  e: number;
}

/**
 * Refs returned by renderWords for animation.
 * - textRef: main text element (required).
 * - bgRef: optional background rect (e.g. highlight_bg).
 * - highlightRef: optional overlay Txt in highlight color (e.g. karaoke current word).
 * - prefixRefs: optional refs per character-step for letter-by-letter reveal (e.g. typewriter).
 */
export interface WordRefs {
  refs: Array<{
    textRef: Reference<Txt>;
    bgRef?: Reference<Rect>;
    highlightRef?: Reference<Txt>;
    prefixRefs?: Reference<Txt>[];
  }>;
}

/**
 * Parameters for renderWords.
 */
export interface RenderWordsParams {
  containerRef: Reference<Rect>;
  words: WordTiming[];
  caption: Caption & { props: CaptionProps };
}

/**
 * Parameters for animateWords.
 */
export interface AnimateWordsParams {
  words: WordTiming[];
  refs: WordRefs;
  caption: Caption & { props: CaptionProps };
}

/**
 * Parameters for preparePhraseContainer (optional hook for phrase-level styling).
 */
export interface PreparePhraseContainerParams {
  phraseRef: Reference<Rect>;
  phraseProps: CaptionProps;
}

/**
 * Caption style handler contract.
 * Each style implements its own rendering and animation logic.
 */
export interface CaptionStyleHandler {
  readonly id: string;

  /**
   * Build word elements into container. Returns refs needed for animation.
   */
  renderWords(params: RenderWordsParams): WordRefs;

  /**
   * Generator: animate words over time.
   */
  animateWords(params: AnimateWordsParams): ThreadGenerator;

  /**
   * Optional: customize phrase container before words are rendered (e.g. fill background).
   */
  preparePhraseContainer?(params: PreparePhraseContainerParams): void;
}
