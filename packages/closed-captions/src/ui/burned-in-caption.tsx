import { useEffect, useRef } from 'react';
import type { CaptionSegmentId } from '../utils/captions/types';

type Props = {
  segmentId: CaptionSegmentId | null;
  text: string;
  onEditText: (segmentId: CaptionSegmentId, nextText: string) => void;
};

export const BurnedInCaption = ({ segmentId, text, onEditText }: Props) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  // Keep the textarea height snug to content.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${Math.min(140, el.scrollHeight)}px`;
  }, [text]);

  if (!segmentId) return null;

  return (
    <div className="ccBurnedInCaption">
      <textarea
        ref={ref}
        className="ccBurnedInCaptionInput"
        value={text}
        onChange={(e) => onEditText(segmentId, e.target.value)}
        spellCheck
      />
    </div>
  );
};

