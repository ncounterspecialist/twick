import type { CaptionDoc, CaptionSegment } from '../captions/types';
import type { MockDocInsights, MockSegmentInsights, MockSuggestion } from './types';
import { hashToUnit } from '../mockWords/hash';

export const buildMockInsightsForDoc = (doc: CaptionDoc): MockDocInsights => {
  const lowConfidenceWords = doc.segments.flatMap((seg) =>
    seg.words
      .filter((w) => w.confidence < 0.8)
      .map((w) => ({
        segmentId: seg.id,
        wordText: w.text,
        wordStartMs: w.startMs,
        confidence: w.confidence,
        label: w.confidence < 0.65 ? ('low' as const) : ('review' as const),
      }))
  );

  lowConfidenceWords.sort((a, b) => a.confidence - b.confidence);
  return { lowConfidenceWords };
};

export const buildMockInsightsForSegment = (seg: CaptionSegment): MockSegmentInsights => {
  const suggestions: MockSuggestion[] = [];
  const text = seg.text;

  if (/\bhtml\b/i.test(text) && !/\bHTML\b/.test(text)) {
    suggestions.push({
      id: `sug_${seg.id}_html`,
      title: 'Apply brand casing',
      before: text,
      after: text.replace(/\bhtml\b/gi, 'HTML'),
    });
  }

  if (/\bjavascript\b/i.test(text) && !/\bJavaScript\b/.test(text)) {
    suggestions.push({
      id: `sug_${seg.id}_js`,
      title: 'Normalize proper noun',
      before: text,
      after: text.replace(/\bjavascript\b/gi, 'JavaScript'),
    });
  }

  const trimmed = text.trim();
  if (trimmed && !/[.!?]$/.test(trimmed)) {
    suggestions.push({
      id: `sug_${seg.id}_punct`,
      title: 'Add punctuation',
      before: text,
      after: `${trimmed}.`,
    });
  }

  // Add at most one extra “rewrite” suggestion for demo variety.
  const u = hashToUnit(seg.id);
  if (suggestions.length < 3 && u > 0.82) {
    suggestions.push({
      id: `sug_${seg.id}_clarity`,
      title: 'Improve clarity (demo)',
      before: text,
      after: text.replace(/\breally\b/gi, 'actually').replace(/\s+/g, ' ').trim(),
    });
  }

  return { suggestions };
};

