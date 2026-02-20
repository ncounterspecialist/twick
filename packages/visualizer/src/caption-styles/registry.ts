import type { CaptionStyleHandler } from "./types";

const handlers = new Map<string, CaptionStyleHandler>();

const DEFAULT_STYLE_ID = "word_by_word";

/**
 * Register a caption style handler.
 */
export function registerCaptionStyle(handler: CaptionStyleHandler): void {
  handlers.set(handler.id, handler);
}

/**
 * Get handler for a style ID.
 */
export function getCaptionStyleHandler(id: string): CaptionStyleHandler | undefined {
  return handlers.get(id);
}

/**
 * Get default handler when style is unknown or missing.
 */
export function getDefaultCaptionStyleHandler(): CaptionStyleHandler {
  const handler = handlers.get(DEFAULT_STYLE_ID);
  if (!handler) {
    throw new Error(
      `Caption style "${DEFAULT_STYLE_ID}" not registered. Ensure caption-styles are initialized.`
    );
  }
  return handler;
}
