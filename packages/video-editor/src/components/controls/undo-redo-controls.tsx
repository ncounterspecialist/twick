import { useTimelineContext, useTimelineEditor } from "@twick/timeline";
import { Undo2, Redo2 } from "lucide-react";

export const UndoRedoControls = () => {
  const { canUndo, canRedo } = useTimelineContext();
  const editor = useTimelineEditor();

  return (
    <div className="undo-redo-controls">
      <button
        className={`control-btn${canUndo ? " active" : " btn-disabled"}`}
        onClick={editor.undo}
        aria-label="Undo last action"
      >
        <Undo2 size={18} strokeWidth={2} />
      </button>

      <button
        onClick={editor.redo}
        aria-label="Redo last undone action"
        className={`control-btn${canRedo ? " active" : " btn-disabled"}`}
      >
        <Redo2 size={18} strokeWidth={2} />
      </button>
    </div>
  );
};
