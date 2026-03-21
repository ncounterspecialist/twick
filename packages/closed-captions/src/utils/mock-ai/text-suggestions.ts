import type { CaptionSegment, CaptionSegmentId } from '../captions/types';

export type SuggestionType = 'grammar' | 'glossary' | 'technical' | 'spelling';

export type TextSuggestion = {
  id: string;
  segmentId: CaptionSegmentId;
  originalText: string;
  replacements: string[];
  type: SuggestionType;
};

/**
 * Demo: mock AI suggestions for caption text.
 * - Grammar: "you're" → "you are"
 * - Glossary: "SERN" → "CERN"
 * - Technical: "p for paragraph" → "<p> for a paragraph"; "old description" → "alt description"
 * - Spelling (US→UK, from html-in-100-seconds.srt): organized→organised, standardized→standardised, etc.
 */
function getMockRules(): Array<{ pattern: RegExp | string; replacements: string[]; type: SuggestionType }> {
  return [
    // Glossary (from SRT: SERN → CERN)
    { pattern: /\bSERN\b/g, replacements: ['CERN'], type: 'glossary' },
    // Technical (from SRT: shorthand for tags + accessibility)
    { pattern: /\bp for paragraph\b/gi, replacements: ['<p> for a paragraph', "'p' for a paragraph"], type: 'technical' },
    { pattern: /\bh for heading\b/gi, replacements: ['<h1> for a heading', "'h' for a heading"], type: 'technical' },
    { pattern: /\ba for\s+(?:anchor|link)\b/gi, replacements: ['<a> for anchor', "'a' for anchor"], type: 'technical' },
    { pattern: /\bold description\b/gi, replacements: ['alt description'], type: 'technical' },
    // Spelling US → UK (from html-in-100-seconds.srt)
    { pattern: /\borganized\b/gi, replacements: ['organised'], type: 'spelling' },
    { pattern: /\bunorganized\b/gi, replacements: ['unorganised'], type: 'spelling' },
    { pattern: /\bstandardized\b/gi, replacements: ['standardised'], type: 'spelling' },
    { pattern: /\bgeneralized\b/gi, replacements: ['generalised'], type: 'spelling' },
    { pattern: /\bbehavior\b/gi, replacements: ['behaviour'], type: 'spelling' },
    { pattern: /\bcustomize\b/gi, replacements: ['customise'], type: 'spelling' },
    // Grammar / contractions / typos
    { pattern: /\byou're\b/gi, replacements: ['you are'], type: 'grammar' },
    { pattern: /\brecieve\b/gi, replacements: ['receive', 'receives', 'receipt'], type: 'grammar' },
    { pattern: /\boccured\b/gi, replacements: ['occurred'], type: 'grammar' },
    { pattern: /\bteh\b/gi, replacements: ['the'], type: 'grammar' },
    { pattern: /\bit's\b/gi, replacements: ['it is'], type: 'grammar' },
    { pattern: /\bdon't\b/gi, replacements: ['do not'], type: 'grammar' },
    { pattern: /\bcan't\b/gi, replacements: ['cannot'], type: 'grammar' },
    { pattern: /\bwon't\b/gi, replacements: ['will not'], type: 'grammar' },
  ];
}

function escapeForRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Returns all mock suggestions for a segment's text.
 * Each suggestion has a unique id (segmentId + type + index) so Ignore can hide it.
 */
export function getMockSuggestionsForSegment(segment: CaptionSegment): TextSuggestion[] {
  const out: TextSuggestion[] = [];
  const text = segment.text;
  const rules = getMockRules();

  rules.forEach((rule, ruleIdx) => {
    const regex = typeof rule.pattern === 'string' ? new RegExp(escapeForRegex(rule.pattern), 'gi') : rule.pattern;
    let m: RegExpExecArray | null;
    regex.lastIndex = 0;
    while ((m = regex.exec(text)) !== null) {
      const originalText = m[0];
      out.push({
        id: `sug_${segment.id}_${rule.type}_${ruleIdx}_${m.index}`,
        segmentId: segment.id,
        originalText,
        replacements: rule.replacements,
        type: rule.type,
      });
    }
  });

  return out;
}

/**
 * Returns suggestions for a segment, excluding any whose id is in ignoredIds.
 */
export function getActiveSuggestionsForSegment(
  segment: CaptionSegment,
  ignoredIds: Set<string>
): TextSuggestion[] {
  return getMockSuggestionsForSegment(segment).filter((s) => !ignoredIds.has(s.id));
}

/**
 * Splits segment text into parts: [{ text, suggestion?: TextSuggestion }].
 * Used to render text with red underlines on suggested parts.
 */
export function getTextPartsWithSuggestions(
  text: string,
  suggestions: TextSuggestion[]
): Array<{ text: string; suggestion: TextSuggestion | null }> {
  if (suggestions.length === 0) return [{ text, suggestion: null }];

  const parts: Array<{ start: number; end: number; suggestion: TextSuggestion }> = [];
  suggestions.forEach((s) => {
    const idx = text.toLowerCase().indexOf(s.originalText.toLowerCase());
    if (idx !== -1) parts.push({ start: idx, end: idx + s.originalText.length, suggestion: s });
  });

  parts.sort((a, b) => a.start - b.start);
  const merged: Array<{ start: number; end: number; suggestion: TextSuggestion }> = [];
  parts.forEach((p) => {
    if (merged.length && p.start < merged[merged.length - 1].end) return;
    merged.push(p);
  });

  const result: Array<{ text: string; suggestion: TextSuggestion | null }> = [];
  let pos = 0;
  merged.forEach(({ start, end, suggestion }) => {
    if (start > pos) result.push({ text: text.slice(pos, start), suggestion: null });
    result.push({ text: text.slice(start, end), suggestion });
    pos = end;
  });
  if (pos < text.length) result.push({ text: text.slice(pos), suggestion: null });
  return result;
}
