import { createPortal } from 'react-dom';
import type { TextSuggestion } from '../../utils/mockAi/textSuggestions';

const POPOVER_OFFSET = 6;

type SuggestionPopoverProps = {
  suggestions: TextSuggestion[];
  anchorRect: DOMRect | null;
  isOpen: boolean;
  onApply: (suggestion: TextSuggestion, replacement: string) => void;
  onIgnore: (id: string) => void;
  onPopoverMouseEnter: () => void;
  onPopoverMouseLeave: () => void;
};

export function SuggestionPopover({
  suggestions,
  anchorRect,
  isOpen,
  onApply,
  onIgnore,
  onPopoverMouseEnter,
  onPopoverMouseLeave,
}: SuggestionPopoverProps) {
  if (!isOpen || suggestions.length === 0 || !anchorRect) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    left: anchorRect.left,
    top: anchorRect.bottom + POPOVER_OFFSET,
    zIndex: 10000,
    minWidth: 200,
    maxWidth: 360,
  };

  const popover = (
    <div
      className="ccSuggestionPopover"
      style={style}
      onMouseEnter={onPopoverMouseEnter}
      onMouseLeave={onPopoverMouseLeave}
      role="tooltip"
    >
      <div className="ccSuggestionPopoverHeader">
        <span className="ccSuggestionPopoverHeaderIcon">AI</span>
        <span className="ccSuggestionPopoverHeaderTitle">Did you mean:</span>
      </div>
      <ul className="ccSuggestionPopoverItems">
        {suggestions.map((sug) => (
          <li key={sug.id} className="ccSuggestionPopoverItem">
            <span className="ccSuggestionUnderline">{sug.originalText}</span>
            <span className="ccSuggestionPopoverLabel"> → </span>
            <div className="ccSuggestionPopoverActions">
              {sug.replacements.map((rep) => (
                <button
                  key={rep}
                  type="button"
                  className="ccSuggestionApplyBtn"
                  onClick={() => onApply(sug, rep)}
                >
                  Apply &quot;{rep}&quot;
                </button>
              ))}
              <button
                type="button"
                className="ccSuggestionIgnoreBtn"
                onClick={() => onIgnore(sug.id)}
                title="Mark as correct"
              >
                Ignore
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return createPortal(popover, document.body);
}
