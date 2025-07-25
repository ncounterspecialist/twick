import { useLivePlayerContext } from "@twick/live-player";
import {
  TrackElement,
  Track,
  useTimelineContext,
  useTimelineEditor,
} from "@twick/timeline";
import { useMemo } from "react";

export const useTimelineManager = () => {
  const { selectedItem, latestProjectVersion, setSelectedItem, totalDuration } =
    useTimelineContext();
  const editor = useTimelineEditor();

  // Get timeline data from editor
  const timelineData = useMemo(
    () => {
        const _td = editor.getTimelineData();
        console.log(latestProjectVersion, _td);
        return _td;
    },
    [latestProjectVersion]
  );

  const { setSeekTime, setCurrentTime } = useLivePlayerContext();

  const onReorder = (reorderedItems: Track[]) => {
    console.log(reorderedItems, timelineData);
    // editor.loadProject({
    //   timeline: reorderedItems,
    //   version: (timelineData?.version ?? 0) + 1,
    // });
  };

  const onSeek = (time: number) => {
    setCurrentTime(time);
    setSeekTime(time);
  };

  const onSelectionChange = (selectedItem: TrackElement | Track | null) => {
    setSelectedItem(selectedItem);
  };

  const onEdit = (
    _timelineId: string,
    _elementId: string,
    _updates: any
  ) => {
    // editor.updateElement({
    //   timelineId,
    //   elementId,
    //   updates,
    // });
  };

  return {
    onEdit,
    onSeek,
    onReorder,
    onSelectionChange,
    timelineData,
    selectedItem,
    totalDuration,
  };
};
