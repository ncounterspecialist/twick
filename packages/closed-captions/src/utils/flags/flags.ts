import type { CaptionFlag, CaptionSegment } from '../captions/types';

export const computeSegmentFlags = (seg: CaptionSegment): CaptionFlag[] => {
  const flags = new Set<CaptionFlag>();
  if (seg.words.some((w) => w.confidence < 0.8)) flags.add('LOW_CONFIDENCE');
  // Demo-only heuristic brand flag: all-caps tokens or weird casing.
  if (/\bhtml\b/i.test(seg.text) && !/\bHTML\b/.test(seg.text)) flags.add('BRAND_WARNING');
  return Array.from(flags);
};

