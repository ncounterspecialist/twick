import { PLAYER_STATE, useLivePlayerContext } from "@twick/live-player";
import {
  TIMELINE_ELEMENT_TYPE,
  TIMELINE_OPERATION,
  useTimelineContext,
  type TimelineElement,
} from "@twick/timeline";
import { useEffect, useState } from "react";
import FileInput from "../shared/file-input";
import { usePlayerControl } from "@twick/video-editor";

const EditorControls = () => {
  const { playerState } = useLivePlayerContext();
  const { setTimelineOperation, selectedItem } = useTimelineContext();
  const [playButtonText, setPlayButtonText] = useState("Play");
  const { togglePlaying } = usePlayerControl();

  const addElement = (type: string, input: any) => {
    if (!selectedItem) {
      alert("Please select a timeline/element to add an element");
      return;
    }
    const timelineId = selectedItem.id.startsWith("t-")
      ? selectedItem.id
      : (selectedItem as TimelineElement).timelineId;
    switch (type) {
      case TIMELINE_ELEMENT_TYPE.IMAGE:
        setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
          timelineId,
          element: {
            type: TIMELINE_ELEMENT_TYPE.IMAGE,
            objectFit: "contain",
            props: {
              src: input.blobUrl,
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
              src: input.blobUrl,
            },
          },
        });
        break;
      case TIMELINE_ELEMENT_TYPE.TEXT:
          setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
            timelineId,
            element: {
              type: TIMELINE_ELEMENT_TYPE.TEXT,
              props: {
                text: input.text,
              },
            },
          });
          break;
  
    }
  };

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
    <div className="flex flex-col gap-2 p-2">
      <FileInput
        id="project-file-input"
        acceptFileTypes={["application/json"]}
        onFileLoad={loadProject}
        buttonText="Load Project"
      />
      <FileInput
        id="image-file-input"
        acceptFileTypes={["image/png", "image/jpeg"]}
        onFileLoad={(content) =>
          addElement(TIMELINE_ELEMENT_TYPE.IMAGE, content)
        }
        buttonText="Add Image"
      />
      <FileInput
        id="image-video-input"
        acceptFileTypes={["video/mp4"]}
        onFileLoad={(content) =>
          addElement(TIMELINE_ELEMENT_TYPE.VIDEO, content)
        }
        buttonText="Add Video"
      />
      <button onClick={() => {
        const text = prompt("Enter text:");
        if (text) {
          addElement(TIMELINE_ELEMENT_TYPE.TEXT, { text });
        }
      }}>
        Add Text
      </button>

      <button onClick={() => addTimeline()}>
        Add Timeline
      </button>

      <div className="flex flex-col-reverse h-full">
        <button onClick={togglePlaying}>{playButtonText}</button>
      </div>

    </div>
  );
};

export default EditorControls;
