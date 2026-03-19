import type { CaptionSegment, CaptionWord } from '../captions/types';
import { hashToUnit } from './hash';

const tokenize = (text: string) =>
  text
    .replace(/[^\w\s'-]/g, ' ')
    .split(/\s+/g)
    .map((t) => t.trim())
    .filter(Boolean);

export const buildWordsForSegment = (seg: CaptionSegment): CaptionWord[] => {
  const words = tokenize(seg.text);
  const durationMs = Math.max(200, seg.endMs - seg.startMs);
  const perWord = Math.max(80, Math.floor(durationMs / Math.max(1, words.length)));

  return words.map((w, i) => {
    const startMs = seg.startMs + i * perWord;
    const endMs = i === words.length - 1 ? seg.endMs : Math.min(seg.endMs, startMs + perWord);
    const u = hashToUnit(`${seg.id}:${w}:${i}`);
    // Skew so most words are high confidence with a few lows.
    const confidence = Math.min(0.99, Math.max(0.35, 0.55 + 0.45 * u));
    return { text: w, startMs, endMs, confidence };
  });
};

