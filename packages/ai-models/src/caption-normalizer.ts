import type { TimedTextSegment } from "./orchestration-types";

export interface LegacyCaptionEntry {
  t: string;
  s: number;
  e: number;
  w?: number[];
}

/**
 * Normalize legacy caption entries (milliseconds) into TimedTextSegment.
 */
export function normalizeCaptionEntries(
  captions: LegacyCaptionEntry[]
): TimedTextSegment[] {
  return captions
    .map((caption) => {
      const startMs = Math.max(0, caption.s ?? 0);
      const endMs = Math.max(startMs, caption.e ?? startMs);
      return {
        text: caption.t ?? "",
        startMs,
        endMs,
        ...(caption.w ? { wordStartMs: caption.w } : {}),
      };
    })
    .sort((a, b) => a.startMs - b.startMs);
}
