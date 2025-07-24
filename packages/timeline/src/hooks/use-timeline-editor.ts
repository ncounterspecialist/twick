import { useMemo, useEffect } from "react";
import { useTimelineContext } from "../context/timeline-context";
import { TimelineEditor } from "../core/editor/timeline.editor";
import { TIMELINE_ACTION } from "../utils/constants";
import { TrackJSON } from "../types";
 
const editorRegistry: Map<string, TimelineEditor> = new Map<string, TimelineEditor>();

/**
 * Clean up a specific editor instance
 */
export const cleanupEditor = (contextId: string): void => {
  const editor = editorRegistry.get(contextId);
  if (editor) {
    editorRegistry.delete(contextId);
  }
};

/**
 * Clean up all editor instances
 */
export const cleanupAllEditors = (): void => {
  editorRegistry.clear();
};

/**
 * Get all active editor instances
 */
export const getActiveEditors = (): Map<string, TimelineEditor> => {
  return new Map(editorRegistry);
};

const useTimelineEditor = () => {
  const {
    contextId,
    setTotalDuration,
    setLatestProjectVersion,
    setSelectedItem,
    setTimelineAction,
    setPresent,
    handleUndo,
    handleRedo,
    handleResetHistory,
    timelineAction,
  } = useTimelineContext();

  const editor = useMemo(() => {
    // Check if an editor already exists for this contextId
    let existingEditor = editorRegistry.get(contextId);
    
    if (existingEditor) {
      // Update the existing editor's context with new values
      existingEditor.getContext().setLatestProjectVersion = setLatestProjectVersion;
      existingEditor.getContext().setTimelineAction = setTimelineAction;
      existingEditor.getContext().handleUndo = handleUndo;
      existingEditor.getContext().handleRedo = handleRedo;
      existingEditor.getContext().handleResetHistory = handleResetHistory;
      return existingEditor;
    }

    // Create a new editor instance
    const newEditor = new TimelineEditor({
      contextId,
      setTotalDuration,
      setPresent,
      handleUndo,
      handleRedo,
      handleResetHistory,
      setLatestProjectVersion,
      setTimelineAction,
    });

    // Store the new editor in the registry
    editorRegistry.set(contextId, newEditor);
    return newEditor;
  }, [contextId, setLatestProjectVersion, setSelectedItem, setTimelineAction, handleUndo, handleRedo, handleResetHistory]);

  // Handle timeline actions from context (undo/redo/project data)
  const handleTimelineAction = (action: string, payload: unknown): void => {
    switch (action) {
      case TIMELINE_ACTION.SET_PROJECT_DATA:
        if (payload && typeof payload === 'object' && 'tracks' in payload) {
          const projectPayload = payload as { tracks: TrackJSON[]; version: number };
          editor.loadProject({
            timeline: projectPayload.tracks,
            version: projectPayload.version,
          });
        }
        break;
      case TIMELINE_ACTION.RESET_HISTORY:
        // Handle history reset if needed
        break;
      default:
        // Handle other actions if needed
        break;
    }
  };

  // Listen to timeline actions and handle them
  useEffect(() => {
    if (timelineAction && timelineAction.type !== 'none') {
      handleTimelineAction(timelineAction.type, timelineAction.payload);
    }
  }, [timelineAction, editor]);

  return editor;
};

export default useTimelineEditor;
