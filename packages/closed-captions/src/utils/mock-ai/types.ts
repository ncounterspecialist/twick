import type { CaptionSegmentId } from '../captions/types';

export type LowConfidenceWordInsight = {
  segmentId: CaptionSegmentId;
  wordText: string;
  wordStartMs: number;
  confidence: number;
  label: 'low' | 'review';
};

export type MockDocInsights = {
  lowConfidenceWords: LowConfidenceWordInsight[];
};

export type MockSuggestion = {
  id: string;
  title: string;
  before: string;
  after: string;
};

export type MockSegmentInsights = {
  suggestions: MockSuggestion[];
};

