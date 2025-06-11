import { PLAYER_STATE, useLivePlayerContext } from "@twick/live-player";
import { TIMELINE_ACTION, TIMELINE_ELEMENT_TYPE, TIMELINE_OPERATION, useTimelineContext } from "@twick/timeline";
import { useEffect, useState } from "react";
import FileInput from "../shared/file-input";

const EditorControls = () => {
    const { playerState, setPlayerState} = useLivePlayerContext();
    const { timelineAction, setTimelineOperation } = useTimelineContext();
    const [playButtonText, setPlayButtonText] = useState("Play");
    const addElement = (type: string) => {
        console.log("addElement", type);
    }

    const togglePlaying = () => {
        if (playerState === PLAYER_STATE.PLAYING) {
            setPlayButtonText("Play");
            setPlayerState(PLAYER_STATE.PAUSED);
        } else if(playerState === PLAYER_STATE.PAUSED) {
            setPlayButtonText("Loading");
            setPlayerState(PLAYER_STATE.REFRESHING);
            setTimelineOperation(TIMELINE_OPERATION.FETCH_LATEST_PROJECT_DATA, null);
        } 
    }

    const loadProject = (content: any) => {
      if(typeof content === "string") {
        const contentData = JSON.parse(content);
        let projectData;
        if(contentData?.arguments) {
          projectData = contentData.arguments;
        }
        else {
          projectData = contentData;
        }
        if(projectData?.input) {
          setTimelineOperation(TIMELINE_OPERATION.LOAD_PROJECT, projectData?.input);
        } else {
          alert("Invalid project data");
        }
      }
    }

    const addTimeline = () => {
      setTimelineOperation(TIMELINE_OPERATION.ADD_NEW_TIMELINE, undefined);
    }

    useEffect(() => {
      if(playerState === PLAYER_STATE.PAUSED) {
        setPlayButtonText("Play");
      }
      else if(playerState === PLAYER_STATE.REFRESHING) {
        if (timelineAction.action === TIMELINE_ACTION.UPDATE_PROJECT_DATA) {
          setPlayerState(PLAYER_STATE.PLAYING);
        }
      }
      else if(playerState === PLAYER_STATE.PLAYING) {
        setPlayButtonText("Pause");
      }
    }, [timelineAction, playerState]);

    return (
        <div className="flex flex-col gap-2">
            <FileInput acceptFileTypes={["application/json"]} onFileLoad={loadProject} buttonText="Load Project" />
              <button onClick={() => addElement(TIMELINE_ELEMENT_TYPE.IMAGE)}>
                Image
              </button>
              <button onClick={() => addElement(TIMELINE_ELEMENT_TYPE.TEXT)}>
                Text
              </button>
              <button onClick={() => addElement(TIMELINE_ELEMENT_TYPE.AUDIO)}>
                Audio
              </button>
              <button onClick={() => addElement(TIMELINE_ELEMENT_TYPE.VIDEO)}>
                Video
              </button>
              <button onClick={() => addTimeline()}>
                Add Timeline
              </button>
              <button onClick={togglePlaying}>
                {playButtonText}
              </button>
            </div>
    )
}

export default EditorControls;
