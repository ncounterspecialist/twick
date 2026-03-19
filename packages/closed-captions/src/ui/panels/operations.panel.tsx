import { useState } from 'react';
import type { CaptionDoc } from '../../utils/captions/types';
import { SpeakerPanel } from './speaker.panel';

type Props = {
  doc: CaptionDoc | null;
  findText: string;
  replaceText: string;
  onChangeFindText: (text: string) => void;
  onChangeReplaceText: (text: string) => void;
  onFindNext: () => void;
  onFindPrevious: () => void;
  onReplaceOne: () => void;
  onReplaceAll: () => void;   
  selectionCount: number;
  selectionSpeaker: string;
  onSetSpeakerForSelected: (speaker: string) => void;
  onRemoveSpeakerForSelected: () => void;
};

type OperationMode = 'findReplace' | 'speaker';

export const OperationsPanel = ({
  doc,
  findText,
  replaceText,
  onChangeFindText,
  onChangeReplaceText,
  onFindNext,
  onFindPrevious,
  onReplaceOne,
  onReplaceAll,
  selectionCount,
  selectionSpeaker,
  onSetSpeakerForSelected,
  onRemoveSpeakerForSelected,
}: Props) => {
  const [mode, setMode] = useState<OperationMode>('findReplace');
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="ccPanel ccOperationsPanel">
      <div className="ccOperationsHeaderRow">
        <div className="ccPanelTitle" style={{ marginBottom: 0 }}>
          Operations
        </div>
        {!isCollapsed && (
          <div className="ccCaptionSubPanelToggle">
            <button
              type="button"
              className={['ccCaptionSubPanelBtn', mode === 'findReplace' ? 'isActive' : ''].join(' ')}
              onClick={() => setMode('findReplace')}
            >
              Find / Replace
            </button>
            <button
              type="button"
              className={['ccCaptionSubPanelBtn', mode === 'speaker' ? 'isActive' : ''].join(' ')}
              onClick={() => setMode('speaker')}
            >
              Set speaker
            </button>
          </div>
        )}
        <button
          className="ccGhostIconBtn"
          type="button"
          onClick={() => setIsCollapsed((v) => !v)}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '+' : '−'}
        </button>
      </div>

      {!isCollapsed && (
        mode === 'findReplace' ? (
          <>
            <div className="ccInputRow">
              <input
                className="ccInput"
                placeholder="Find..."
                value={findText}
                onChange={(e) => onChangeFindText(e.target.value)}
              />
              <input
                className="ccInput"
                placeholder="Replace..."
                value={replaceText}
                onChange={(e) => onChangeReplaceText(e.target.value)}
              />
            </div>
            <div className="ccBtnRow flex-end">
              <button className="ccBtnSmall" disabled={!findText || !doc} onClick={onFindPrevious}>Previous</button>
              <button className="ccBtnSmall" disabled={!findText || !doc} onClick={onFindNext}>
                Next
              </button>
              <button className="ccBtnSmall" disabled={!findText || !doc} onClick={onReplaceOne}>
                Replace
              </button>
              <button className="ccBtnSmall" disabled={!findText || !doc} onClick={onReplaceAll}>
                All
              </button>
            </div>
          </>
        ) : (
          <SpeakerPanel
            selectionCount={selectionCount}
            selectionSpeaker={selectionSpeaker}
            onSetSpeakerForSelected={onSetSpeakerForSelected}
            onRemoveSpeakerForSelected={onRemoveSpeakerForSelected}
          />
        )
      )}
    </div>
  );
};
