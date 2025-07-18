import { useTimelineContext } from "@twick/timeline";
import { Undo2, Redo2 } from "lucide-react";

export const UndoRedoControls = () => {
  const { canUndo, canRedo, undo, redo } = useTimelineContext();

  return (
    <div className="undo-redo-controls">
      <button
        className={`control-btn${canUndo ? " active" : " btn-disabled"}`}
        onClick={undo}
        aria-label="Undo last action"
      >
        <Undo2 size={18} strokeWidth={2} />
      </button>

      <button
        onClick={redo}
        aria-label="Redo last undone action"
        className={`control-btn${canRedo ? " active" : " btn-disabled"}`}
      >
        <Redo2 size={18} strokeWidth={2} />
      </button>
    </div>
  );
};
