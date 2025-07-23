import { useMemo, useEffect } from "react";
import { useTimelineContext } from "../context/timeline-context";
import { TimelineEditor } from "../core/editor/timeline.editor";
 
const ENABLE_TIMELINE_EDITOR_REGISTRY = true;
// Global registry to store editor instances per contextId
const editorRegistry: Map<string, TimelineEditor> =
  (typeof window !== "undefined" && ENABLE_TIMELINE_EDITOR_REGISTRY) ?
    (
      ((window as any).timelineEditorRegistry = (window as any).timelineEditorRegistry || new Map<string, TimelineEditor>())
    ) :
    new Map<string, TimelineEditor>();

/**
 * Clean up a specific editor instance
 */
export const cleanupEditor = (contextId: string): void => {
  const editor = editorRegistry.get(contextId);
  if (editor) {
    editor.cleanup();
    editorRegistry.delete(contextId);
  }
};

/**
 * Clean up all editor instances
 */
export const cleanupAllEditors = (): void => {
  editorRegistry.forEach((editor) => {
    editor.cleanup();
  });
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
      existingEditor.getContext().setSelectedItem = setSelectedItem;
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
      setTimelineOperationResult: () => {}, // No longer needed
      setSelectedItem,
      setTimelineAction,
    });

    // Store the new editor in the registry
    editorRegistry.set(contextId, newEditor);
    return newEditor;
  }, [contextId, setLatestProjectVersion, setSelectedItem, setTimelineAction, handleUndo, handleRedo, handleResetHistory]);

  // Listen to timeline actions and handle them in the editor
  useEffect(() => {
    if (timelineAction && timelineAction.type !== 'none') {
      editor.handleTimelineAction(timelineAction.type, timelineAction.payload);
    }
  }, [timelineAction, editor]);

  return editor;
};

export default useTimelineEditor;
