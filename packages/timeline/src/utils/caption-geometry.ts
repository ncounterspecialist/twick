/**
 * Utility helpers for deriving caption geometry from font settings.
 *
 * These helpers are intentionally lightweight and numeric-only so they can be
 * safely shared between timeline, Studio, workflow, canvas, and visualizer.
 */

import { CAPTION_STYLE } from "./constants";

export interface CaptionGeometry {
  /**
   * Stroke line width for caption text.
   * This is scaled relative to the font size to keep outlines proportional.
   */
  lineWidth: number;

  /**
   * Rect-level layout properties used by caption phrase containers.
   * Currently only drives horizontal gap between words, but can be extended
   * in a backwards-compatible way.
   */
  rectProps: {
    gap: number;
  };
}

/**
 * Compute caption geometry (stroke width and rect gap) from a font size.
 *
 * The current implementation uses a simple proportional mapping so that:
 * - Stroke width stays visually subtle across sizes
 * - Horizontal gaps scale with the font to avoid overcrowding or excessive spacing
 *
 * This function is the single source of truth for caption stroke + rect layout.
 */
export function computeCaptionGeometry(
  fontSize: number,
  captionStyle: string,
): CaptionGeometry {
  const safeFontSize = fontSize ?? 8;

  // Keep stroke width subtle and proportional to font size.
  // For the common 46px captions this yields ~0.69, matching existing defaults.
  const lineWidth = 
    captionStyle === CAPTION_STYLE.WORD_BG_HIGHLIGHT
      ? 0.1 
        : parseFloat((safeFontSize * 0.05).toFixed(3));
      

  // Gap scales with font size so spacing feels consistent at different sizes.
  // For 46px this yields 0 between words for highlight_bg and 9.2px for word_by_word.
  const gap =
    captionStyle === CAPTION_STYLE.WORD_BG_HIGHLIGHT
      ? 0
      : Math.round(safeFontSize * 0.2);

  return {
    lineWidth,
    rectProps: {
      gap,
    },
  };
}
