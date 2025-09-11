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
    <div className="w-72 h-full bg-neutral-800/80 border-l border-gray-600/50 p-3 overflow-y-auto overflow-x-hidden backdrop-blur-md shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6">Subtitles</h3>

      {/* Top Bar - Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleGenerate}
          className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        >
          Generate
        </button>
        <button
          onClick={handleAdd}
          className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-medium py-2 px-4 rounded-lg border-2 border-purple-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        >
          Add
        </button>
      </div>

      {/* Subtitle Entries */}
      <div className="space-y-4">
        {subtitles.map((subtitle) => (
          <div
            key={subtitle.id}
            className="bg-neutral-700/50 border border-gray-600 rounded-lg p-3"
          >
            {/* Time Inputs */}
            <div className="flex gap-3 mb-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">Start</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={subtitle.start}
                  onChange={(e) => handleUpdateSubtitle(subtitle.id, 'start', Number(e.target.value))}
                  className="w-full bg-neutral-800/80 border border-gray-600 rounded-lg text-white text-sm px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">End</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={subtitle.end}
                  onChange={(e) => handleUpdateSubtitle(subtitle.id, 'end', Number(e.target.value))}
                  className="w-full bg-neutral-800/80 border border-gray-600 rounded-lg text-white text-sm px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Subtitle Text Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="subtitle"
                value={subtitle.text}
                onChange={(e) => handleUpdateSubtitle(subtitle.id, 'text', e.target.value)}
                className="w-full bg-neutral-800/80 border border-gray-600 rounded-lg text-white text-sm px-3 py-2 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            {/* Action Icons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleDelete(subtitle.id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                title="Delete subtitle"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSave(subtitle.id)}
                className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all duration-200"
                title="Save subtitle"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {subtitles.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>No subtitles yet</p>
          <p className="text-sm mt-2">Click "Add" to create your first subtitle</p>
        </div>
      )}
    </div>
  );
}
