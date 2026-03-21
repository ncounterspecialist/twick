import type { CaptionDoc } from '../captions/types';

type QualityWarning = {
  id: string;
  level: 'warn' | 'info';
  message: string;
};

export const buildMockQualitySummary = (doc: CaptionDoc) => {
  const allWords = doc.segments.flatMap((s) => s.words);
  const totalWordCount = allWords.length;
  const lowConfidenceWordCount = allWords.filter((w) => w.confidence < 0.8).length;

  const overallConfidencePct =
    totalWordCount === 0 ? 100 : Math.round(((totalWordCount - lowConfidenceWordCount) / totalWordCount) * 100);

  const warnings: QualityWarning[] = [];

  // ADA-style heuristics (demo-only):
  // - reading speed too high (characters per second)
  // - very short captions (< 500ms)
  for (const seg of doc.segments) {
    const durationSec = Math.max(0.001, (seg.endMs - seg.startMs) / 1000);
    const cps = seg.text.replace(/\s+/g, ' ').trim().length / durationSec;
    if (cps > 22) {
      warnings.push({
        id: `cps_${seg.id}`,
        level: 'warn',
        message: `High reading speed (${Math.round(cps)} chars/sec) - consider splitting or extending duration.`,
      });
    }
    if (seg.endMs - seg.startMs < 500) {
      warnings.push({
        id: `short_${seg.id}`,
        level: 'warn',
        message: 'Caption duration is very short (< 0.5s) - may fail readability checks.',
      });
    }
  }

  // Ordering / overlap quick checks
  const ordered = doc.segments.slice().sort((a, b) => a.startMs - b.startMs);
  for (let i = 1; i < ordered.length; i += 1) {
    if (ordered[i].startMs < ordered[i - 1].endMs) {
      warnings.push({
        id: `overlap_${ordered[i - 1].id}_${ordered[i].id}`,
        level: 'warn',
        message: 'Captions overlap in time - may fail compliance export validation.',
      });
      break;
    }
  }

  return {
    overallConfidencePct,
    totalWordCount,
    lowConfidenceWordCount,
    warnings,
  };
};

