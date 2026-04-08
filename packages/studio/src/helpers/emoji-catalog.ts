export interface EmojiAsset {
  emoji: string;
  label: string;
  imageUrl: string;
  category: EmojiCategory;
}

export type EmojiCategory =
  | "Smileys"
  | "Symbols"
  | "Objects"
  | "Hands"
  | "Media";

const SUPPORTED_EMOJIS: Array<{ emoji: string; category: EmojiCategory }> = [
  { emoji: "😀", category: "Smileys" },
  { emoji: "😁", category: "Smileys" },
  { emoji: "😂", category: "Smileys" },
  { emoji: "🤣", category: "Smileys" },
  { emoji: "😍", category: "Smileys" },
  { emoji: "🤩", category: "Smileys" },
  { emoji: "😎", category: "Smileys" },
  { emoji: "🥳", category: "Smileys" },
  { emoji: "🤯", category: "Smileys" },
  { emoji: "🤔", category: "Smileys" },
  { emoji: "😅", category: "Smileys" },
  { emoji: "😮", category: "Smileys" },
  { emoji: "🥹", category: "Smileys" },
  { emoji: "🔥", category: "Symbols" },
  { emoji: "✨", category: "Symbols" },
  { emoji: "⭐", category: "Symbols" },
  { emoji: "💥", category: "Symbols" },
  { emoji: "💯", category: "Symbols" },
  { emoji: "✅", category: "Symbols" },
  { emoji: "❌", category: "Symbols" },
  { emoji: "⚡", category: "Symbols" },
  { emoji: "❤️", category: "Symbols" },
  { emoji: "🏆", category: "Objects" },
  { emoji: "💡", category: "Objects" },
  { emoji: "📈", category: "Objects" },
  { emoji: "📣", category: "Objects" },
  { emoji: "🧠", category: "Objects" },
  { emoji: "👀", category: "Objects" },
  { emoji: "🤖", category: "Objects" },
  { emoji: "👍", category: "Hands" },
  { emoji: "👏", category: "Hands" },
  { emoji: "🙌", category: "Hands" },
  { emoji: "🤝", category: "Hands" },
  { emoji: "🙏", category: "Hands" },
  { emoji: "🚀", category: "Media" },
  { emoji: "🎯", category: "Media" },
  { emoji: "🎉", category: "Media" },
  { emoji: "🎬", category: "Media" },
  { emoji: "🎥", category: "Media" },
  { emoji: "🎧", category: "Media" },
];

const CDN_BASE = "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72";

function toCodePointString(emoji: string): string {
  return Array.from(emoji)
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join("-");
}

export const EMOJI_CATEGORIES: Array<EmojiCategory | "All"> = [
  "All",
  "Smileys",
  "Symbols",
  "Objects",
  "Hands",
  "Media",
];

export const EMOJI_CATALOG: EmojiAsset[] = SUPPORTED_EMOJIS.map(
  ({ emoji, category }) => ({
    emoji,
    category,
    label: emoji,
    imageUrl: `${CDN_BASE}/${toCodePointString(emoji)}.png`,
  })
);
