export type CaptionSegmentId = string;

export type CaptionFlag = 'LOW_CONFIDENCE' | 'BRAND_WARNING';

export type CaptionWord = {
  text: string;
  startMs: number;
  endMs: number;
  confidence: number; // 0..1
};

export type CaptionSegment = {
  id: CaptionSegmentId;
  startMs: number;
  endMs: number;
  text: string;
  speaker?: string;
  words: CaptionWord[];
  flags: CaptionFlag[];
};

export type CaptionDoc = {
  segments: CaptionSegment[];
};

export type EditorActionResult = {
  doc: CaptionDoc;
  selectedId?: CaptionSegmentId | null;
  meta?: Record<string, unknown>;
};

