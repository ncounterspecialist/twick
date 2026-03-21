import type { CaptionDoc, CaptionSegment } from './types';
import { buildWordsForSegment } from '../mock-words/build-words-for-segment';
import { segmentIdFromIndex } from './segment-id';
import { computeSegmentFlags } from '../flags/flags';

const parseTimeToMs = (raw: string) => {
  // SRT: HH:MM:SS,mmm
  const m = raw.trim().match(/^(\d\d):(\d\d):(\d\d),(\d\d\d)$/);
  if (!m) return 0;
  const [, hh, mm, ss, ms] = m;
  return (
    Number(hh) * 3600 * 1000 +
    Number(mm) * 60 * 1000 +
    Number(ss) * 1000 +
    Number(ms)
  );
};

export const parseSrt = (srt: string): CaptionDoc => {
  const blocks = srt
    .replace(/\r/g, '')
    .split(/\n\n+/g)
    .map((b) => b.trim())
    .filter(Boolean);

  const segments: CaptionSegment[] = [];

  for (let i = 0; i < blocks.length; i += 1) {
    const lines = blocks[i].split('\n').map((l) => l.trim());
    if (lines.length < 2) continue;

    const timeLineIdx = lines.findIndex((l) => l.includes('-->'));
    if (timeLineIdx === -1) continue;
    const timeLine = lines[timeLineIdx];
    const [startRaw, endRaw] = timeLine.split('-->').map((t) => t.trim());
    const startMs = parseTimeToMs(startRaw);
    const endMs = parseTimeToMs(endRaw);

    const textLines = lines.slice(timeLineIdx + 1).filter(Boolean);
    const rawText = textLines.join(' ').replace(/\s+/g, ' ').trim();
    const speakerMatch = rawText.match(/^\[<([^>]+)>]\s*/);
    const speaker = speakerMatch?.[1]?.trim() || undefined;
    const text = speakerMatch ? rawText.replace(/^\[<([^>]+)>]\s*/, '').trim() : rawText;

    const seg: CaptionSegment = {
      id: segmentIdFromIndex(i),
      startMs,
      endMs,
      text,
      speaker,
      words: [],
      flags: [],
    };

    seg.words = buildWordsForSegment(seg);
    seg.flags = computeSegmentFlags(seg);

    segments.push(seg);
  }

  return { segments };
};

