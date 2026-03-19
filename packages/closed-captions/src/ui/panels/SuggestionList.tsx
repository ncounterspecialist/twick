import type { TextSuggestion } from '../../utils/mockAi/textSuggestions';

type SuggestionListProps = {
  suggestions: TextSuggestion[];
  onApply: (suggestion: TextSuggestion, replacement: string) => void;
  onIgnore: (suggestionId: string) => void;
};

export function SuggestionList({ suggestions, onApply, onIgnore }: SuggestionListProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="ccSuggestionList">
      <div className="ccSuggestionListHeader">
        <span className="ccSuggestionListHeaderIcon">AI</span>
        <span className="ccSuggestionListHeaderTitle">Suggestions</span>
      </div>
      <ul className="ccSuggestionListItems">
        {suggestions.map((sug) => (
          <li key={sug.id} className="ccSuggestionListItem">
            <span className="ccSuggestionUnderline">{sug.originalText}</span>
            <span className="ccSuggestionListLabel"> → </span>
            <div className="ccSuggestionListActions">
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
}
