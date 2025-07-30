import { useLivePlayerContext } from "@twick/live-player";
import {
  TrackElement,
  Track,
  useTimelineContext,
  VideoElement,
  AudioElement,
} from "@twick/timeline";
import { useMemo } from "react";
import { DRAG_TYPE } from "../helpers/constants";

export const useTimelineManager = () => {
  const {
    selectedItem,
    changeLog,
    setSelectedItem,
    totalDuration,
    editor,
  } = useTimelineContext();
  const onElementDrag = ({
    element,
    dragType,
    updates,
  }: {
    updates: { start: number; end: number };
    element: TrackElement;
    dragType: string;
  }) => {
    if (dragType === DRAG_TYPE.START) {
      if (element instanceof VideoElement || element instanceof AudioElement) {
        const elementProps = element.getProps();
        const delta =
          updates.start -
          element.getStart() * (elementProps?.playbackRate || 1);

        if (element instanceof AudioElement) {
          (element as AudioElement).setStartAt(element.getStartAt() + delta);
        } else {
          (element as VideoElement).setStartAt(element.getStartAt() + delta);
        }
      }
    }
    element.setStart(updates.start);
    element.setEnd(updates.end);
    editor.updateElement(element);
  };

  // Get timeline data from editor
  const timelineData = useMemo(() => {
      const timelineDataFromEditor = editor.getTimelineData();
      // console.log(changeLog, timelineDataFromEditor);
      return timelineDataFromEditor;
  }, [changeLog]);

  const { setSeekTime, setCurrentTime } = useLivePlayerContext();

  const onReorder = (reorderedItems: Track[]) => {
    editor.reorderTracks(reorderedItems);
  };

  const onSeek = (time: number) => {
    setCurrentTime(time);
    setSeekTime(time);
  };

  const onSelectionChange = (selectedItem: TrackElement | Track | null) => {
    setSelectedItem(selectedItem);
  };

  return {
    timelineData,
    onElementDrag,
    onReorder,
    onSeek,
    onSelectionChange,
    selectedItem,
    totalDuration,
  };
};
