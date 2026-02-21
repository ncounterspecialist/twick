import { registerCaptionStyle } from "./registry";
import { highlightBgHandler } from "./highlight-bg.handler";
import { wordByWordHandler } from "./word-by-word.handler";
import { wordByWordWithBgHandler } from "./word-by-word-with-bg.handler";
import { outlineOnlyHandler } from "./outline-only.handler";
import { softBoxHandler } from "./soft-box.handler";

/**
 * Register all built-in caption style handlers.
 * Called automatically on first import.
 */
export function registerCaptionStyles(): void {
  registerCaptionStyle(highlightBgHandler);
  registerCaptionStyle(wordByWordHandler);
  registerCaptionStyle(wordByWordWithBgHandler);
  registerCaptionStyle(outlineOnlyHandler);
  registerCaptionStyle(softBoxHandler);
}

// Auto-register on module load so handlers are available
registerCaptionStyles();

export { getCaptionStyleHandler, getDefaultCaptionStyleHandler, registerCaptionStyle } from "./registry";
export type { CaptionStyleHandler, WordRefs, WordTiming } from "./types";
