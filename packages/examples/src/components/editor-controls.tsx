import { PLAYER_STATE, useLivePlayerContext } from "@twick/live-player";
import {
  TIMELINE_ELEMENT_TYPE,
  TIMELINE_OPERATION,
  useTimelineContext,
  type TimelineElement,
} from "@twick/timeline";
import { useEffect, useState } from "react";
import FileInput from "../shared/file-input";
import { usePlayerControl, type MediaItem } from "@twick/video-editor";
import { MediaPanel } from "./media-panel";
import ColorInputDialog from "../shared/color-input";

const EditorControls = () => {
  const { playerState } = useLivePlayerContext();
  const [panelType, setPanelType] = useState<
    "media" | "text" | "timeline" | null
  >(null);
  const { setTimelineOperation, selectedItem } = useTimelineContext();
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [playButtonText, setPlayButtonText] = useState("Play");
  const { togglePlaying } = usePlayerControl();

  const addTextElement = (text: string) => {
    const timelineId = getSelectedTimelineId();
    if (!timelineId) {
      return;
    }
    setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
      timelineId,
      element: {
        type: TIMELINE_ELEMENT_TYPE.TEXT,
        props: {
          text: text,
        },
      },
    });
  }
  const loadProject = ({ content }: any) => {
    if (typeof content === "string") {
      const contentData = JSON.parse(content);
      let projectData;
      if (contentData?.arguments) {
        projectData = contentData.arguments;
      } else {
        projectData = contentData;
      }
      if (projectData?.input) {
        setTimelineOperation(
          TIMELINE_OPERATION.LOAD_PROJECT,
          projectData?.input
        );
      } else {
        alert("Invalid project data");
      }
    }
  };

  const addTimeline = () => {
    setTimelineOperation(TIMELINE_OPERATION.ADD_NEW_TIMELINE, undefined);
  };

  const addRectElement = (color: string) => {
    console.log("color", color);
    setShowColorDialog(false);
    const timelineId = getSelectedTimelineId();
    if (!timelineId) {
      return;
    }
    setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
      timelineId,
      element: {
        type: TIMELINE_ELEMENT_TYPE.RECT,
        props: {
          fill: color,
          width: 200,
          height: 200,
        },
      },
    });
    
  }

  const getSelectedTimelineId = () => {
    if (!selectedItem) {
      alert("Please select a timeline/element to add an element");
      return;
    }
    return selectedItem.id.startsWith("t-")
      ? selectedItem.id
      : (selectedItem as TimelineElement).timelineId;
  };

  const addMedia = (element: MediaItem) => {
    const timelineId = getSelectedTimelineId();
    if (!timelineId) {
      return;
    }
    switch (element?.type) {
      case TIMELINE_ELEMENT_TYPE.IMAGE:
        setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
          timelineId,
          element: {
            type: TIMELINE_ELEMENT_TYPE.IMAGE,
            objectFit: "contain",
            props: {
              src: element.url,
            },
          },
        });
        break;
      case TIMELINE_ELEMENT_TYPE.VIDEO:
        setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
          timelineId,
          element: {
            type: TIMELINE_ELEMENT_TYPE.VIDEO,
            objectFit: "contain",
            props: {
              src: element.url,
            },
          },
        });
        break;
    }
  };

  useEffect(() => {
    if (playerState === PLAYER_STATE.PAUSED) {
      setPlayButtonText("Play");
    } else if (playerState === PLAYER_STATE.REFRESHING) {
      setPlayButtonText("Loading");
    } else if (playerState === PLAYER_STATE.PLAYING) {
      setPlayButtonText("Pause");
    }
  }, [playerState]);

  return (
    <div className="flex flex-row gap-2 p-2">
      <div className="flex flex-col gap-2 p-2">
        <FileInput
          id="project-file-input"
          acceptFileTypes={["application/json"]}
          onFileLoad={loadProject}
          buttonText="Load"
        />

        <div className="controls-button" onClick={() => setPanelType("media")}>Add Media</div>
        <div className="controls-button"
          onClick={() => {
            const text = prompt("Enter text:");
            if (text) {
              addTextElement(text);
            }
          }}
        >
          Add Text
        </div>

        <div className="controls-button"
          onClick={() => {
            setShowColorDialog(true);
          }}
        >
          Add Rect
        </div>

        <div className="controls-button" onClick={() => addTimeline()}>Add Timeline</div>

        <div className="flex flex-col-reverse h-full">
          <div className="controls-button" onClick={togglePlaying}>{playButtonText}</div>
        </div>
      </div>
      {panelType === "media" && <MediaPanel onSelect={addMedia} />}
      {showColorDialog && <ColorInputDialog onColorSelect={addRectElement} onCancel={() => setShowColorDialog(false)} />}
    </div>
  );
};

export default EditorControls;
