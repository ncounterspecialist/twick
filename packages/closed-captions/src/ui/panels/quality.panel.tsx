import { useState } from 'react';
import { buildMockQualitySummary } from '../../utils/mockAi/quality';

type QualitySummary = ReturnType<typeof buildMockQualitySummary>;

const QualityPanel = ({ quality }: { quality: QualitySummary | null }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div className={['ccPanel', 'ccRightPanel', isCollapsed ? '' : 'isExpanded'].join(' ')}>
      <div className="ccPanelHeaderRow">
        <div className="ccPanelTitle" style={{ marginBottom: 0 }}>
          SRT Quality (ADA-style checks)
        </div>
        <button className="ccGhostIconBtn" type="button" onClick={() => setIsCollapsed((v) => !v)}>
          {isCollapsed ? '+' : '−'}
        </button>
      </div>

      {isCollapsed ? null : (
        <div className="ccRightPanelBody">
          {!quality ? (
            <div className="ccEmpty">Import an SRT to compute an overall score.</div>
          ) : (
            <>
              <div className="ccScoreRow">
                <div className="ccScoreLabel">Overall Confidence</div>
                <div className="ccScoreValue">{quality.overallConfidencePct}%</div>
              </div>
              <div className="ccScoreMeta">
                {quality.lowConfidenceWordCount} low-confidence word(s) out of {quality.totalWordCount}
              </div>

              <div className="ccInspectorSection">
                <div className="ccInspectorHeading">Warnings</div>
                {quality.warnings.length === 0 ? (
                  <div className="ccEmpty">No warnings detected in demo checks.</div>
                ) : (
                  <div className="ccInspectorList">
                    {quality.warnings.map((w) => (
                      <div key={w.id} className="ccInspectorRow">
                        <div className="ccInspectorBadge">{w.level}</div>
                        <div className="ccInspectorText">{w.message}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
  </div>
  );
};

export default QualityPanel;