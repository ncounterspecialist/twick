/**
 * SubtitlesPanel Component
 * 
 * A panel for managing video subtitles in the studio. Provides functionality
 * for creating, editing, and managing subtitle entries with timing and text.
 * Supports both manual entry and automatic generation (TODO).
 * 
 * @component
 * @example
 * ```tsx
 * <SubtitlesPanel />
 * ```
 * 
 * Features:
 * - Add/delete subtitle entries
 * - Set start/end times
 * - Edit subtitle text
 * - Automatic subtitle generation (planned)
 * - Save subtitles to timeline
 * 
 * Each subtitle entry includes:
 * - Start time (in seconds)
 * - End time (in seconds)
 * - Subtitle text
 * - Delete and save actions
 */

import { useState } from "react";
import { Trash2, Check } from "lucide-react";

interface SubtitleEntry {
  id: string;
  start: number;
  end: number;
  text: string;
}

export function SubtitlesPanel() {
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>([]);

  const handleGenerate = () => {
    // TODO: Generate subtitles automatically
    console.log("Generating subtitles...");
  };

  const handleAdd = () => {
    const newId = (subtitles.length + 1).toString();
    const lastEnd = subtitles.length > 0 ? subtitles[subtitles.length - 1].end : 0;
    const newSubtitle: SubtitleEntry = {
      id: newId,
      start: lastEnd,
      end: lastEnd + 1,
      text: ""
    };
    setSubtitles([...subtitles, newSubtitle]);
  };

  const handleDelete = (id: string) => {
    setSubtitles(subtitles.filter(sub => sub.id !== id));
  };

  const handleSave = (id: string) => {
    // TODO: Save subtitle to timeline or database
    console.log("Saving subtitle:", id);
  };

  const handleUpdateSubtitle = (id: string, field: keyof SubtitleEntry, value: string | number) => {
    setSubtitles(subtitles.map(sub => 
      sub.id === id ? { ...sub, [field]: value } : sub
    ));
  };

  return (
    <div className="panel-container">
      <h3 className="panel-title">Subtitles</h3>

      {/* Top Bar - Action Buttons */}
      <div className="panel-section">
        <div className="flex-container">
          <button
            onClick={handleGenerate}
            className="btn-primary"
          >
            Generate
          </button>
          <button
            onClick={handleAdd}
            className="btn-primary"
          >
            Add
          </button>
        </div>
      </div>

      {/* Subtitle Entries */}
      {subtitles.map((subtitle) => (
        <div
          key={subtitle.id}
          className="panel-section"
        >
          {/* Time Inputs */}
          <div className="flex-container">
            <div>
              <label className="label-small">Start</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={subtitle.start}
                onChange={(e) => handleUpdateSubtitle(subtitle.id, 'start', Number(e.target.value))}
                className="input-dark"
              />
            </div>
            <div>
              <label className="label-small">End</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={subtitle.end}
                onChange={(e) => handleUpdateSubtitle(subtitle.id, 'end', Number(e.target.value))}
                className="input-dark"
              />
            </div>
          </div>

          {/* Subtitle Text Input */}
          <div>
            <label className="label-dark">Subtitle Text</label>
            <input
              type="text"
              placeholder="Enter subtitle text"
              value={subtitle.text}
              onChange={(e) => handleUpdateSubtitle(subtitle.id, 'text', e.target.value)}
              className="input-dark"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex-container justify-between">
            <button
              onClick={() => handleDelete(subtitle.id)}
              className="btn-danger"
              title="Delete subtitle"
            >
              <Trash2 className="icon-sm" />
            </button>
            <button
              onClick={() => handleSave(subtitle.id)}
              className="btn-primary"
              title="Save subtitle"
            >
              <Check className="icon-sm" />
            </button>
          </div>
        </div>
      ))}

      {/* Empty State */}
      {subtitles.length === 0 && (
        <div className="panel-section">
          <div className="empty-state">
            <div className="empty-state-content">
              <p className="empty-state-text">No subtitles yet</p>
              <p className="empty-state-subtext">Click "Add" to create your first subtitle</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
