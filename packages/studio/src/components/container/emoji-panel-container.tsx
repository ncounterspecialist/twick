import { EmojiElement, TextElement } from "@twick/timeline";
import type { PanelProps } from "../../types";
import { EMOJI_CATALOG, type EmojiAsset } from "../../helpers/emoji-catalog";
import { EmojiPanel } from "../panel/emoji-panel";

export function EmojiPanelContainer({ addElement, videoResolution }: PanelProps) {
  const emojiFallbackFont =
    "Poppins, Noto Color Emoji, Apple Color Emoji, Segoe UI Emoji, sans-serif";

  const canLoadEmojiImage = async (url: string): Promise<boolean> =>
    new Promise((resolve) => {
      let settled = false;
      const done = (value: boolean) => {
        if (settled) return;
        settled = true;
        resolve(value);
      };
      const img = new Image();
      img.onload = () => done(true);
      img.onerror = () => done(false);
      img.src = url;
      window.setTimeout(() => done(false), 3000);
    });

  const handleSelection = async (item: EmojiAsset) => {
    if (!addElement) return;
    const canUseImage = await canLoadEmojiImage(item.imageUrl);

    if (canUseImage) {
      const element = new EmojiElement(item.emoji, item.imageUrl, videoResolution)
        .setName(`Emoji ${item.emoji}`)
        .setEnd(5);
      await addElement(element);
      return;
    }

    const fallbackText = new TextElement(item.emoji)
      .setName(`Emoji ${item.emoji} (fallback)`)
      .setFontFamily(emojiFallbackFont)
      .setFontSize(Math.round(videoResolution.height * 0.12))
      .setFill("#FFFFFF")
      .setLineWidth(0)
      .setEnd(5);
    await addElement(fallbackText);
  };

  return <EmojiPanel items={EMOJI_CATALOG} onItemSelect={handleSelection} />;
}
