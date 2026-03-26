/**
 * CaptionsPanel Component
 *
 * A presentational panel for managing caption entries in the studio.
 * Renders a list of caption items, each with a text input and two actions:
 * Split and Delete. A single Add button appears below the list.
 *
 * State is controlled by the parent via props; this component is stateless.
 *
 * Entry shape (CaptionEntry):
 * - `s`: start time (seconds)
 * - `e`: end time (seconds)
 * - `t`: caption text
 *
 * Props:
 * - `captions`: CaptionEntry[] — ordered list of captions
 * - `addCaption()`: add a new caption at the end
 * - `splitCaption(index)`: split the caption at `index`
 * - `deleteCaption(index)`: remove the caption at `index`
 * - `updateCaption(index, caption)`: update the caption at `index`
 *
 * @component
 * @example
 * ```tsx
 * <CaptionsPanel
 *   captions={captions}
 *   addCaption={addCaption}
 *   splitCaption={splitCaption}
 *   deleteCaption={deleteCaption}
 *   updateCaption={updateCaption}
 * />
 * ```
 */

import { Trash2, Scissors } from "lucide-react";
import type { CaptionPanelEntry } from "../../types";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00.00";
  const totalMs = Math.round(seconds * 1000);
  const totalSeconds = Math.floor(totalMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const ms = Math.floor((totalMs % 1000) / 10);
  const pad = (n: number, l = 2) => String(n).padStart(l, "0");
  return `${minutes}:${pad(secs)}.${pad(ms)}`;
};

export function CaptionsPanel({
  captions,
  addCaption,
  splitCaption,
  deleteCaption,
  updateCaption,
}: {
  captions: CaptionPanelEntry[];
  addCaption: () => void;
  splitCaption: (index: number) => void | Promise<void>;
  deleteCaption: (index: number) => void;
  updateCaption: (index: number, caption: CaptionPanelEntry) => void;
}) {
  return (
    <div className="panel-container captions-panel">
      {/* Header */}
      <div className="captions-panel-header">
        <h3 className="panel-title">Captions</h3>
        <div className="captions-panel-header-meta">
          {captions.length === 0 ? (
            <span className="captions-panel-count">No captions yet</span>
          ) : null}
          <button
            onClick={addCaption}
            className="btn-primary captions-panel-add-button"
            title="Add caption"
          >
            Add caption
          </button>
        </div>
      </div>

      {/* Caption list */}
      {captions.length === 0 ? (
        <div className="panel-section captions-panel-empty">
          <p className="captions-panel-empty-title">Start your first caption</p>
          <p className="captions-panel-empty-subtitle">
            Use the button above to add the first caption block for the active track.
          </p>
          <button
            onClick={addCaption}
            className="btn-primary captions-panel-empty-button"
            title="Add first caption"
          >
            Add caption
          </button>
        </div>
      ) : (
        <div className="panel-section captions-panel-list">
          {captions.map((caption, i) => {
            return (
              <div
                key={i}
                className="captions-panel-item"
              >
                <div className="captions-panel-item-header">
                  <span className="captions-panel-time captions-panel-time-start">
                    {formatTime(caption.s)}
                  </span>
                  <span className="captions-panel-time captions-panel-time-end">
                    {formatTime(caption.e)}
                  </span>
                  {caption.isCustom ? (
                    <span
                      className="captions-panel-custom"
                      title="This caption overrides track defaults"
                    >
                      Custom
                    </span>
                  ) : null}
                </div>

                <div className="captions-panel-item-body">
                  <textarea
                    placeholder="Enter caption text"
                    value={caption.t}
                    onChange={(e) =>
                      updateCaption(i, { ...caption, t: e.target.value })
                    }
                    className="input-dark captions-panel-textarea"
                  />
                  <div className="captions-panel-actions">
                    <button
                      onClick={() => splitCaption(i)}
                      className="btn-ghost captions-panel-action-button"
                      title="Split caption at midpoint"
                    >
                      <Scissors className="icon-sm" />
                    </button>
                    <button
                      onClick={() => deleteCaption(i)}
                      className="btn-ghost captions-panel-action-button"
                      title="Delete caption"
                    >
                      <Trash2
                        className="icon-sm"
                        color="var(--color-red-500)"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
