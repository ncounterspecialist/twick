/**
 * SubtitlesPanel Component
 *
 * A presentational panel for managing subtitle entries in the studio.
 * Renders a list of subtitle items, each with a text input and two actions:
 * Split and Delete. A single Add button appears below the list.
 *
 * State is controlled by the parent via props; this component is stateless.
 *
 * Entry shape (SubtitleEntry):
 * - `s`: start time (seconds)
 * - `e`: end time (seconds)
 * - `t`: subtitle text
 *
 * Props:
 * - `subtitles`: SubtitleEntry[] — ordered list of subtitles
 * - `addSubtitle()`: add a new subtitle at the end
 * - `splitSubtitle(index)`: split the subtitle at `index`
 * - `deleteSubtitle(index)`: remove the subtitle at `index`
 * - `updateSubtitle(index, subtitle)`: update the subtitle at `index`
 *
 * @component
 * @example
 * ```tsx
 * <SubtitlesPanel
 *   subtitles={subtitles}
 *   addSubtitle={addSubtitle}
 *   splitSubtitle={splitSubtitle}
 *   deleteSubtitle={deleteSubtitle}
 *   updateSubtitle={updateSubtitle}
 * />
 * ```
 */

import { Trash2, Scissors } from "lucide-react";

interface SubtitleEntry {
  s: number;
  e: number;
  t: string; 
}

export function SubtitlesPanel({
  subtitles,
  addSubtitle,
  splitSubtitle,
  deleteSubtitle,
  updateSubtitle,
}: {
  subtitles: SubtitleEntry[];
  addSubtitle: () => void;
  splitSubtitle: (index: number) => void;
  deleteSubtitle: (index: number) => void;
  updateSubtitle: (index: number, subtitle: SubtitleEntry) => void;
}) {

  return (
    <div className="panel-container">
      <h3 className="panel-title">Subtitles</h3>

      {/* Subtitle Entries */}
      {subtitles.map((subtitle, i) => (
        <div
          key={i}
          className="panel-section gap-2"
        >
          {/* Subtitle Text Input */}
          <div>
            <input
              type="text"
              placeholder="Enter subtitle text"
              value={subtitle.t}
              onChange={(e) => updateSubtitle(i, { ...subtitle, t: e.target.value })}
              className="input-dark"
            />
          </div>

          {/* Action Buttons (bottom-right) */}
          <div className="flex-container justify-between">
            <button
              onClick={() => splitSubtitle(i)}
              className="btn-ghost"
              title="Split subtitle"
            >
              <Scissors className="icon-sm" />
            </button>
            <button
              onClick={() => deleteSubtitle(i)}
              className="btn-ghost"
              title="Delete subtitle"
            >
              <Trash2 className="icon-sm" color="var(--color-red-500)"/>
            </button>
          </div>
        </div>
      ))}

      {/* Common Add Button */}
      <div className="panel-section">
          <button onClick={addSubtitle} className="btn-primary w-full" title="Add subtitle">
            Add
          </button>
      </div>
    </div>
  );
}
