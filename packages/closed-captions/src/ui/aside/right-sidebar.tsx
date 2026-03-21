import type { CaptionDoc, CaptionSegmentId } from '../../utils/captions/types';
import { buildMockQualitySummary } from '../../utils/mock-ai/quality';
import type { MockDocInsights, MockSegmentInsights } from '../../utils/mock-ai/types';
import AISuggestionPanel from '../panels/ai-suggestion.panel';
import QualityPanel from '../panels/quality.panel';

export const RightSidebar = ({
  doc,
  mockDocInsights,
  mockSegmentInsights,
  selectedId,
  onAcceptSuggestion,
}: {
  doc: CaptionDoc | null;
  selectedId: CaptionSegmentId | null;
  mockDocInsights: MockDocInsights | null;
  mockSegmentInsights: MockSegmentInsights | null;
  onAcceptSuggestion: (nextText: string) => void;
}) => {
  const mockQuality = doc ? buildMockQualitySummary(doc) : null;
  return (
    <aside className="ccRight">
      <AISuggestionPanel
        doc={doc}
        selectedId={selectedId}
        docInsights={mockDocInsights}
        segmentInsights={mockSegmentInsights}
        onApplySuggestion={(segmentId, nextText) => {
          // For demo UX: only apply if the suggestion is for the currently selected caption.
          if (!selectedId || segmentId !== selectedId) return;
          onAcceptSuggestion(nextText);
        }}
      />
      <QualityPanel quality={mockQuality} />
    </aside>
  );
};

