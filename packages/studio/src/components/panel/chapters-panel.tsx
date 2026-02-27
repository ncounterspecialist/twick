import React, { useMemo, useState } from "react";
import { useTimelineContext, type ChapterMarker } from "@twick/timeline";
import { useLivePlayerContext } from "@twick/live-player";
import type { PanelProps } from "../../types";

const sortChapters = (chapters: ChapterMarker[]): ChapterMarker[] =>
  [...chapters].sort((a, b) => a.time - b.time);

export const ChaptersPanel = (_props: PanelProps): React.ReactElement => {
  const { editor, present } = useTimelineContext();
  const { getCurrentTime } = useLivePlayerContext();
  const [title, setTitle] = useState("");

  const chapters = useMemo(
    () => sortChapters(present?.metadata?.chapters ?? []),
    [present?.metadata?.chapters]
  );

  const persistChapters = (nextChapters: ChapterMarker[]) => {
    const metadata = editor.getMetadata() ?? {};
    editor.setMetadata({
      ...metadata,
      chapters: sortChapters(nextChapters),
    });
  };

  const addChapter = () => {
    if (!title.trim()) return;
    const time = getCurrentTime();
    const next: ChapterMarker = {
      id: `chapter-${Date.now()}`,
      title: title.trim(),
      time,
    };
    persistChapters([...(chapters || []), next]);
    setTitle("");
  };

  const removeChapter = (id: string) => {
    persistChapters(chapters.filter((chapter) => chapter.id !== id));
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h3>Chapters</h3>
      </div>
      <div className="panel-content" style={{ display: "grid", gap: "10px" }}>
        <input
          className="search-input"
          placeholder="Chapter title at current playhead"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn-primary" onClick={addChapter}>
          Add Chapter At Playhead
        </button>
        <div style={{ display: "grid", gap: "8px" }}>
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="btn-ghost"
              style={{
                width: "100%",
                height: "auto",
                justifyContent: "space-between",
                padding: "8px 10px",
              }}
            >
              <span>
                {Math.floor(chapter.time)}s - {chapter.title}
              </span>
              <button
                className="btn-ghost"
                style={{ padding: "2px 6px" }}
                onClick={() => removeChapter(chapter.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
