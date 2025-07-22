import { useMemo } from "react";
import { useTimelineContext } from "../context/timeline-context";
import { TimelineEditor } from "../components/timeline.editor";

const useTimelineEditor = () => {
  const {
    contextId,
    setLatestProjectVersion,
    setTimelineOperationResult,
  } = useTimelineContext();

  const editor = useMemo(() => {
    return new TimelineEditor({
      contextId,
      setLatestProjectVersion,
      setTimelineOperationResult,
    });
  }, [contextId]);


  return editor;
};

export default useTimelineEditor;
