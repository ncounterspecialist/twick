import {
  isTrackId,
  TIMELINE_ELEMENT_TYPE,
  TrackElement,
  useTimelineContext,
  useTimelineEditor,
} from "@twick/timeline";
import { useState } from "react";
import FileInput from "../shared/file-input";
import { type MediaItem } from "@twick/video-editor";
import { MediaPanel } from "./media-panel";
import ColorInputDialog from "../shared/color-input";
import AnimationPanel from "./animation-panel";
import TextEffectPanel from "./text-effect-panel";

const EditorControls = () => {
  const [panelType, setPanelType] = useState<
    "media" | "text" | "timeline" | "animation" | "text-effect" | null
  >(null);
  const { selectedItem } = useTimelineContext();
  const editor = useTimelineEditor();
  const [showColorDialog, setShowColorDialog] = useState(false);

  const addTextElement = (_text: string) => {
    const timelineId = getSelectedTimelineId();
    if (!timelineId) {
      return;
    }
    // setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
    //   timelineId,
    //   element: {
    //     type: TIMELINE_ELEMENT_TYPE.TEXT,
    //     props: {
    //       text: text,
    //     },
    //   },
    // });
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
        editor.loadProject({
          timeline: projectData?.input?.timeline,
          version: projectData?.input?.version,
        });
        // setTimelineOperation(
        //   TIMELINE_OPERATION.LOAD_PROJECT,
        //   projectData?.input
        // );
      } else {
        alert("Invalid project data");
      }
    }
  };

  const addTimeline = () => {
    // setTimelineOperation(TIMELINE_OPERATION.ADD_NEW_TIMELINE, undefined);
  };

  const addRectElement = (color: string) => {
    console.log("color", color);
    setShowColorDialog(false);
    const timelineId = getSelectedTimelineId();
    if (!timelineId) {
      return;
    }
    // setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
    //   timelineId,
    //   element: {
    //     type: TIMELINE_ELEMENT_TYPE.RECT,
    //     props: {
    //       fill: color,
    //       width: 200,
    //       height: 200,
    //     },
    //   },
    // });
    
  }

  const getSelectedTimelineId = () => {
    if (!selectedItem) {
      alert("Please select a timeline/element to add an element");
      return;
    }
    return isTrackId(selectedItem.getId())
      ? selectedItem.getId()
      : (selectedItem as TrackElement).getTrackId();
  };

  const addMedia = (element: MediaItem) => {
    const timelineId = getSelectedTimelineId();
    if (!timelineId) {
      return;
    }
    switch (element?.type) {
      case TIMELINE_ELEMENT_TYPE.IMAGE:
        // setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
        //   timelineId,
        //   element: {
        //     type: TIMELINE_ELEMENT_TYPE.IMAGE,
        //     objectFit: "contain",
        //     props: {
        //       src: element.url,
        //     },
        //   },
        // });
        break;
      case TIMELINE_ELEMENT_TYPE.VIDEO:
        // setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
        //   timelineId,
        //   element: {
        //     type: TIMELINE_ELEMENT_TYPE.VIDEO,
        //     objectFit: "contain",
        //     props: {
        //       src: element.url,
        //     },
        //   },
        // });
        break;
      case TIMELINE_ELEMENT_TYPE.AUDIO:
          // setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
          //   timelineId,
          //   element: {
          //     type: TIMELINE_ELEMENT_TYPE.AUDIO,
          //     props: {
          //       src: element.url,
          //     },
          //   },
          // });
          break;
    }
  };

  return (
    <div className="flex flex-row gap-2 p-2">
      <div className="flex flex-col gap-2 p-2">
        <FileInput
          id="project-file-input"
          acceptFileTypes={["application/json"]}
          onFileLoad={loadProject}
          buttonText="Load"
        />

        <div className="controls-button" onClick={() => setPanelType("media")}>Media</div>
        <div className="controls-button"
          onClick={() => {
            const text = prompt("Enter text:");
            if (text) {
              addTextElement(text);
            }
          }}
        >
          Text
        </div>

        <div className="controls-button"
          onClick={() => {
            setShowColorDialog(true);
          }}
        >
          Rect
        </div>

        <div className="controls-button" onClick={() => setPanelType("text-effect")}>Text Effect</div>

        <div className="controls-button" onClick={() => setPanelType("animation")}>Animation</div>

        <div className="controls-button" onClick={() => addTimeline()}>Timeline</div>

      </div>
      {panelType === "media" && <MediaPanel onSelect={addMedia} />}
      {panelType === "animation" && <AnimationPanel />}
      {panelType === "text-effect" && <TextEffectPanel />}
      {showColorDialog && <ColorInputDialog onColorSelect={addRectElement} onCancel={() => setShowColorDialog(false)} />}
    </div>
  );
};

export default EditorControls;