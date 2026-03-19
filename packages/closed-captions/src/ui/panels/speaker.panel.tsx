import { useState } from 'react';
import { UserPen, UserX } from 'lucide-react';

type Props = {
  selectionCount: number;
  selectionSpeaker: string;
  onSetSpeakerForSelected: (speaker: string) => void;
  onRemoveSpeakerForSelected: () => void;
};

export const SpeakerPanel = ({
  selectionCount,
  selectionSpeaker,
  onSetSpeakerForSelected,
  onRemoveSpeakerForSelected,
}: Props) => {
  const [speakerDraft, setSpeakerDraft] = useState('');

  return (
    <div className="ccSpeakerPanel">
      <div className="ccSpeakerPanelHeader">
        <div className="ccSpeakerPanelTitle">Speaker</div>
        <div className="ccSpeakerPanelMeta">
          {selectionCount ? `${selectionCount} selected` : 'Select captions'}
        </div>
      </div>
      <div className="ccSpeakerPanelRow">
        <input
          className="ccInput"
          placeholder={selectionSpeaker ? `Current: ${selectionSpeaker}` : 'Set speaker (e.g. Narrator)'}
          value={speakerDraft}
          onChange={(e) => setSpeakerDraft(e.target.value)}
          disabled={selectionCount === 0}
        />
        <button
          className="ccGhostIconBtn"
          disabled={selectionCount === 0 || !speakerDraft.trim()}
          onClick={() => {
            onSetSpeakerForSelected(speakerDraft);
            setSpeakerDraft('');
          }}
          title="Apply speaker"
        >
          <UserPen size={16} />
        </button>
        <button
          className="ccGhostIconBtn"
          disabled={selectionCount === 0}
          onClick={onRemoveSpeakerForSelected}
          title="Remove speaker"
        >
          <UserX size={16} />
        </button>
      </div>
    </div>
  );
};
