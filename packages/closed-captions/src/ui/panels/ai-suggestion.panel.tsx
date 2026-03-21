import { useState } from 'react';
import type { CaptionDoc, CaptionSegmentId } from '../../utils/captions/types';
import type { MockDocInsights, MockSegmentInsights } from '../../utils/mock-ai/types';

type Props = {
  doc: CaptionDoc | null;
  selectedId: CaptionSegmentId | null;
  docInsights: MockDocInsights | null;
  segmentInsights: MockSegmentInsights | null;
  onApplySuggestion: (segmentId: CaptionSegmentId, nextText: string) => void;
};

const getCaptionIndexById = (doc: CaptionDoc | null) => {
  const map = new Map<CaptionSegmentId, number>();
  if (!doc) return map;
  const ordered = doc.segments.slice().sort((a, b) => a.startMs - b.startMs);
  ordered.forEach((s, i) => map.set(s.id, i + 1));
  return map;
};

const AISuggestionPanel = ({ doc, selectedId, docInsights, segmentInsights, onApplySuggestion }: Props) => {
  const indexById = getCaptionIndexById(doc);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const selectedCaptionIndex = selectedId ? indexById.get(selectedId) : undefined;
  const selectedSuggestions = segmentInsights?.suggestions ?? [];

  return (
    <div className={['ccPanel', 'ccRightPanel', isCollapsed ? '' : 'isExpanded'].join(' ')}>
      <div className="ccPanelHeaderRow">
        <div className="ccPanelTitle" style={{ marginBottom: 0 }}>
          AI Suggestions
        </div>
        <button className="ccGhostIconBtn" type="button" onClick={() => setIsCollapsed((v) => !v)}>
          {isCollapsed ? '+' : '−'}
        </button>
      </div>

      {isCollapsed ? null : (
        <div className="ccRightPanelBody">
          <div className="ccInspectorSection">
            <div className="ccInspectorHeading">Caption suggestions</div>
            <div className="ccHint">Select a caption to view and apply caption-level suggestions.</div>

            {!doc || !selectedId ? (
              <div className="ccEmpty">Select a caption to see suggestions.</div>
            ) : selectedSuggestions.length === 0 ? (
              <div className="ccEmpty">No caption-level suggestions for caption #{selectedCaptionIndex ?? '?'}.</div>
            ) : (
              <div className="ccInspectorList">
                {selectedSuggestions.map((sug) => (
                  <div key={sug.id} className="ccInspectorRow">
                    <div className="ccInspectorBadge">caption</div>
                    <div className="ccInspectorText">
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <b>#{selectedCaptionIndex ?? '?'}</b>
                        <span>{sug.title}</span>
                      </div>
                      <div style={{ marginTop: 6 }}>
                        <button
                          className="ccGhostBtn"
                          type="button"
                          onClick={() => onApplySuggestion(selectedId, sug.after)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="ccInspectorSection">
            <div className="ccInspectorHeading">Word flags (confidence)</div>
            <div className="ccHint">
              Words below the threshold are flagged for review. Demo uses deterministic confidence scores.
            </div>

            {!docInsights ? (
              <div className="ccEmpty">Import to see insights.</div>
            ) : docInsights.lowConfidenceWords.length === 0 ? (
              <div className="ccEmpty">No low-confidence words in this demo.</div>
            ) : (
              <div className="ccInspectorList">
                {docInsights.lowConfidenceWords.map((w) => {
                  const idx = indexById.get(w.segmentId);
                  return (
                    <div key={`${w.segmentId}-${w.wordStartMs}`} className="ccInspectorRow">
                      <div className="ccInspectorBadge">word</div>
                      <div className="ccInspectorText">
                        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                          <b>#{idx ?? '?'}</b>
                          <span>
                            <b>{w.wordText}</b> — confidence {Math.round(w.confidence * 100)}% ({w.label})
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestionPanel;