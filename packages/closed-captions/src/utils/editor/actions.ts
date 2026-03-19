import { computeSegmentFlags } from '../flags/flags';
import { buildWordsForSegment } from '../mockWords/buildWordsForSegment';
import type { CaptionDoc, CaptionSegment, CaptionSegmentId, EditorActionResult } from '../captions/types';
import { segmentIdFromIndex } from '../captions/segmentId';

const MIN_DURATION_MS = 200;

const cloneDoc = (doc: CaptionDoc): CaptionDoc => ({
  segments: doc.segments.map((s) => ({
    ...s,
    words: s.words.map((w) => ({ ...w })),
    flags: [...s.flags],
  })),
});

const rehydrateSegment = (seg: CaptionSegment): CaptionSegment => {
  const words = buildWordsForSegment(seg);
  const flags = computeSegmentFlags({ ...seg, words });
  return { ...seg, words, flags };
};

export const applyUpdateTiming = (
  doc: CaptionDoc,
  id: CaptionSegmentId,
  updates: { startMs: number; endMs: number },
  bounds?: { minMs?: number; maxMs?: number }
): EditorActionResult => {
  const next = cloneDoc(doc);
  const idx = next.segments.findIndex((s) => s.id === id);
  if (idx === -1) return { doc };

  const minMs = bounds?.minMs ?? 0;
  const maxMs = bounds?.maxMs ?? Number.POSITIVE_INFINITY;

  let startMs = Math.max(minMs, updates.startMs);
  let endMs = Math.min(maxMs, updates.endMs);
  if (endMs - startMs < MIN_DURATION_MS) {
    endMs = Math.min(maxMs, startMs + MIN_DURATION_MS);
    startMs = Math.max(minMs, endMs - MIN_DURATION_MS);
  }

  next.segments[idx] = rehydrateSegment({ ...next.segments[idx], startMs, endMs });
  next.segments.sort((a, b) => a.startMs - b.startMs);
  return { doc: next, selectedId: id };
};

export const applyRevert = (baseline: CaptionDoc): EditorActionResult => {
  const doc = cloneDoc(baseline);
  return { doc, selectedId: doc.segments[0]?.id ?? null };
};

export const applyEditText = (doc: CaptionDoc, id: CaptionSegmentId, nextText: string): EditorActionResult => {
  const next = cloneDoc(doc);
  const idx = next.segments.findIndex((s) => s.id === id);
  if (idx === -1) return { doc };
  next.segments[idx] = rehydrateSegment({ ...next.segments[idx], text: nextText });
  return { doc: next, selectedId: id };
};

export const applyFindNext = (
  doc: CaptionDoc,
  selectedId: CaptionSegmentId | null,
  query: string
): EditorActionResult => {
  const q = query.trim();
  if (!q) return { doc, selectedId };
  const startIdx = selectedId ? doc.segments.findIndex((s) => s.id === selectedId) : -1;
  const segments = doc.segments;
  const n = segments.length;
  if (n === 0) return { doc, selectedId: null };

  for (let offset = 1; offset <= n; offset += 1) {
    const i = (startIdx + offset + n) % n;
    if (segments[i].text.toLowerCase().includes(q.toLowerCase())) {
      return { doc, selectedId: segments[i].id };
    }
  }
  return { doc, selectedId: null };
};

export const applyFindPrevious = (
  doc: CaptionDoc,
  selectedId: CaptionSegmentId | null,
  query: string
): EditorActionResult => {
  const q = query.trim();
  if (!q) return { doc, selectedId };
  const startIdx = selectedId ? doc.segments.findIndex((s) => s.id === selectedId) : -1;
  const segments = doc.segments;
  const n = segments.length;
  if (n === 0) return { doc, selectedId: null };

  for (let offset = 1; offset <= n; offset += 1) {
    const i = (startIdx - offset + n) % n;
    if (segments[i].text.toLowerCase().includes(q.toLowerCase())) {
      return { doc, selectedId: segments[i].id };
    }
  }
  return { doc, selectedId: null };
};

export const applyReplaceOne = (
  doc: CaptionDoc,
  id: CaptionSegmentId,
  findText: string,
  replaceText: string
): EditorActionResult => {
  const f = findText;
  if (!f) return { doc, selectedId: id };
  const seg = doc.segments.find((s) => s.id === id);
  if (!seg) return { doc, selectedId: id };
  const idx = seg.text.toLowerCase().indexOf(f.toLowerCase());
  if (idx === -1) return { doc, selectedId: id };
  const nextText = seg.text.slice(0, idx) + replaceText + seg.text.slice(idx + f.length);
  return applyEditText(doc, id, nextText);
};

export const applyReplaceAll = (
  doc: CaptionDoc,
  findText: string,
  replaceText: string
): EditorActionResult => {
  const f = findText.trim();
  if (!f) return { doc, meta: { replacedCount: 0 } };
  let replacedCount = 0;
  const next = cloneDoc(doc);

  next.segments = next.segments.map((seg) => {
    const re = new RegExp(escapeRegExp(f), 'gi');
    const matches = seg.text.match(re);
    if (!matches) return seg;
    replacedCount += matches.length;
    const nextText = seg.text.replace(re, replaceText);
    return rehydrateSegment({ ...seg, text: nextText });
  });

  return { doc: next, meta: { replacedCount } };
};

export const applySplitAt = (doc: CaptionDoc, id: CaptionSegmentId, splitMs: number): EditorActionResult => {
  const next = cloneDoc(doc);
  const idx = next.segments.findIndex((s) => s.id === id);
  if (idx === -1) return { doc };
  const seg = next.segments[idx];
  const t = Math.max(seg.startMs + 80, Math.min(seg.endMs - 80, splitMs));
  if (t <= seg.startMs || t >= seg.endMs) return { doc: next, selectedId: id };

  const tokens = seg.text.split(/\s+/g).filter(Boolean);
  const pivot = Math.max(1, Math.min(tokens.length - 1, Math.floor(tokens.length / 2)));
  const leftText = tokens.slice(0, pivot).join(' ');
  const rightText = tokens.slice(pivot).join(' ');

  const left: CaptionSegment = rehydrateSegment({
    ...seg,
    endMs: t,
    text: leftText || seg.text,
  });

  const right: CaptionSegment = rehydrateSegment({
    ...seg,
    id: segmentIdFromIndex(next.segments.length + 1),
    startMs: t,
    text: rightText || seg.text,
  });

  next.segments.splice(idx, 1, left, right);
  next.segments.sort((a, b) => a.startMs - b.startMs);
  return { doc: next, selectedId: right.id };
};

export const applyMergeNext = (doc: CaptionDoc, id: CaptionSegmentId): EditorActionResult => {
  const next = cloneDoc(doc);
  const idx = next.segments.findIndex((s) => s.id === id);
  if (idx === -1) return { doc };
  const seg = next.segments[idx];
  const nextSeg = next.segments[idx + 1];
  if (!nextSeg) return { doc: next, selectedId: id };

  const merged: CaptionSegment = rehydrateSegment({
    ...seg,
    endMs: Math.max(seg.endMs, nextSeg.endMs),
    text: `${seg.text} ${nextSeg.text}`.replace(/\s+/g, ' ').trim(),
  });

  next.segments.splice(idx, 2, merged);
  return { doc: next, selectedId: merged.id };
};

export const applyMergeGroup = (doc: CaptionDoc, ids: CaptionSegmentId[]): EditorActionResult => {
  if (ids.length < 2) return { doc, selectedId: ids[0] ?? null };
  const next = cloneDoc(doc);
  const idSet = new Set(ids);
  const ordered = next.segments.slice().sort((a, b) => a.startMs - b.startMs);
  const selected = ordered.filter((s) => idSet.has(s.id));
  if (selected.length < 2) return { doc: next, selectedId: ids[0] ?? null };

  const first = selected[0];
  const last = selected[selected.length - 1];
  const mergedText = selected
    .map((s) => s.text)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  const merged: CaptionSegment = rehydrateSegment({
    ...first,
    startMs: first.startMs,
    endMs: last.endMs,
    text: mergedText,
  });

  next.segments = ordered.filter((s) => !idSet.has(s.id));
  next.segments.push(merged);
  next.segments.sort((a, b) => a.startMs - b.startMs);
  return { doc: next, selectedId: merged.id };
};

export const applyDeleteMany = (doc: CaptionDoc, ids: CaptionSegmentId[]): EditorActionResult => {
  const next = cloneDoc(doc);
  const idSet = new Set(ids);
  next.segments = next.segments.filter((s) => !idSet.has(s.id));
  const selectedId = next.segments[0]?.id ?? null;
  return { doc: next, selectedId };
};

export const applySetSpeakerMany = (
  doc: CaptionDoc,
  ids: CaptionSegmentId[],
  speaker: string | null
): EditorActionResult => {
  const next = cloneDoc(doc);
  const idSet = new Set(ids);
  next.segments = next.segments.map((seg) =>
    idSet.has(seg.id)
      ? {
          ...seg,
          speaker: speaker && speaker.trim() ? speaker.trim() : undefined,
        }
      : seg
  );
  const selectedId = ids[0] ?? next.segments[0]?.id ?? null;
  return { doc: next, selectedId };
};

export const applyDelete = (doc: CaptionDoc, id: CaptionSegmentId): EditorActionResult => {
  const next = cloneDoc(doc);
  const idx = next.segments.findIndex((s) => s.id === id);
  if (idx === -1) return { doc };
  next.segments.splice(idx, 1);
  const selectedId = next.segments[idx]?.id ?? next.segments[idx - 1]?.id ?? null;
  return { doc: next, selectedId };
};

export const applyAddAfter = (doc: CaptionDoc, afterId: CaptionSegmentId | null): EditorActionResult => {
  const next = cloneDoc(doc);
  const idx = afterId ? next.segments.findIndex((s) => s.id === afterId) : -1;
  const base = idx >= 0 ? next.segments[idx] : next.segments[next.segments.length - 1];
  const startMs = base ? base.endMs + 120 : 0;
  const endMs = startMs + 1500;
  const seg: CaptionSegment = rehydrateSegment({
    id: segmentIdFromIndex(next.segments.length + 1),
    startMs,
    endMs,
    text: 'New caption...',
    speaker: base?.speaker,
    words: [],
    flags: [],
  });
  next.segments.splice(idx + 1, 0, seg);
  return { doc: next, selectedId: seg.id };
};

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

