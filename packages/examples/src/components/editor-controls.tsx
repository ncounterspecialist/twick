import { PLAYER_STATE, useLivePlayerContext } from "@twick/live-player";
import { TIMELINE_ACTION, TIMELINE_ELEMENT_TYPE, TIMELINE_OPERATION, useTimelineContext } from "@twick/timeline";
import { useEffect, useState } from "react";

const EditorControls = () => {
    const { playerState, setPlayerState } = useLivePlayerContext();
    const { timelineAction, setTimelineOperation } = useTimelineContext();
    const [playButtonText, setPlayButtonText] = useState("Play");
    const addTimeline = () => {
        console.log("addTimeline");
    }
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

    useEffect(() => {
      if(playerState === PLAYER_STATE.PAUSED) {
        setPlayButtonText("Play");
      }
      else if(playerState === PLAYER_STATE.REFRESHING) {
        if (timelineAction.action === TIMELINE_ACTION.SET_LATEST_PROJECT_DATA) {
          setPlayerState(PLAYER_STATE.PLAYING);
        }
      }
      else if(playerState === PLAYER_STATE.PLAYING) {
        setPlayButtonText("Pause");
      }
    }, [timelineAction, playerState]);

    return (
        <div className="flex flex-col gap-2">
              <button onClick={addTimeline}>Timeline</button>
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
              <button onClick={togglePlaying}>
                {playButtonText}
              </button>
            </div>
    )
}

export default EditorControls;
