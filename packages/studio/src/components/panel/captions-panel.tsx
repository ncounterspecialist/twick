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

interface CaptionEntry {
  s: number;
  e: number;
  t: string; 
}

export function CaptionsPanel({
  captions,
  addCaption,
  splitCaption,
  deleteCaption,
  updateCaption,
}: {
  captions: CaptionEntry[];
  addCaption: () => void;
  splitCaption: (index: number) => void;
  deleteCaption: (index: number) => void;
  updateCaption: (index: number, caption: CaptionEntry) => void;
}) {

  return (
    <div className="panel-container">
      <h3 className="panel-title">Captions</h3>
      {/* Caption Entries */}
      {captions.map((caption, i) => (
        <div
          key={i}
          className="panel-section gap-2"
        >
          {/* Caption Text Input */}
          <div>
            <input
              type="text"
              placeholder="Enter caption text"
              value={caption.t}
              onChange={(e) => updateCaption(i, { ...caption, t: e.target.value })}
              className="input-dark"
            />
          </div>

          {/* Action Buttons (bottom-right) */}
          <div className="flex-container justify-between">
            <button
              onClick={() => splitCaption(i)}
              className="btn-ghost"
              title="Split caption"
            >
              <Scissors className="icon-sm" />
            </button>
            <button
              onClick={() => deleteCaption(i)}
              className="btn-ghost"
              title="Delete caption"
            >
              <Trash2 className="icon-sm" color="var(--color-red-500)"/>
            </button>
          </div>
        </div>
      ))}

      {/* Common Add Button */}
      <div className="panel-section">
          <button onClick={addCaption} className="btn-primary w-full" title="Add caption">
            Add
          </button>
      </div>
    </div>
  );
}
