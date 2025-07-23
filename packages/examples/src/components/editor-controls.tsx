import {
  TIMELINE_ELEMENT_TYPE,
  useTimelineContext,
  useTimelineEditor,
  type TimelineElement,
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

  const addTextElement = (text: string) => {
    const timelineId = getSelectedTimelineId();
    if (!timelineId) {
      return;
    }
    editor.addElement({
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
        editor.loadProject(projectData?.input?.timeline || [], projectData?.input?.version || 0);
      } else {
        alert("Invalid project data");
      }
    }
  };

  const addTimeline = () => {
    editor.addNewTimeline({ name: "New Timeline" });
  };

  const addRectElement = (color: string) => {
    console.log("color", color);
    setShowColorDialog(false);
    const timelineId = getSelectedTimelineId();
    if (!timelineId) {
      return;
    }
    editor.addElement({
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
        editor.addElement({
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
        editor.addElement({
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
      case TIMELINE_ELEMENT_TYPE.AUDIO:
        editor.addElement({
          timelineId,
          element: {
            type: TIMELINE_ELEMENT_TYPE.AUDIO,
            props: {
              src: element.url,
            },
          },
        });
        break;
    }
  };

  return (
    <div className="twick-editor-controls">
      <div className="twick-editor-controls-header">
        <button
          className={`twick-editor-control-button ${
            panelType === "media" ? "active" : ""
          }`}
          onClick={() => setPanelType(panelType === "media" ? null : "media")}
        >
          Media
        </button>
        <button
          className={`twick-editor-control-button ${
            panelType === "text" ? "active" : ""
          }`}
          onClick={() => setPanelType(panelType === "text" ? null : "text")}
        >
          Text
        </button>
        <button
          className={`twick-editor-control-button ${
            panelType === "timeline" ? "active" : ""
          }`}
          onClick={() => setPanelType(panelType === "timeline" ? null : "timeline")}
        >
          Timeline
        </button>
        <button
          className={`twick-editor-control-button ${
            panelType === "animation" ? "active" : ""
          }`}
          onClick={() => setPanelType(panelType === "animation" ? null : "animation")}
        >
          Animation
        </button>
        <button
          className={`twick-editor-control-button ${
            panelType === "text-effect" ? "active" : ""
          }`}
          onClick={() => setPanelType(panelType === "text-effect" ? null : "text-effect")}
        >
          Text Effect
        </button>
      </div>

      <div className="twick-editor-controls-content">
        {panelType === "media" && (
          <MediaPanel onSelect={addMedia} />
        )}
        {panelType === "text" && (
          <div className="twick-editor-text-panel">
            <button
              className="twick-editor-button"
              onClick={() => addTextElement("Sample Text")}
            >
              Add Text
            </button>
            <button
              className="twick-editor-button"
              onClick={() => setShowColorDialog(true)}
            >
              Add Rectangle
            </button>
          </div>
        )}
        {panelType === "timeline" && (
          <div className="twick-editor-timeline-panel">
            <button
              className="twick-editor-button"
              onClick={addTimeline}
            >
              Add Timeline
            </button>
            <FileInput
              id="project-file-input"
              acceptFileTypes={["application/json"]}
              onFileLoad={loadProject}
              buttonText="Load Project"
            />
          </div>
        )}
        {panelType === "animation" && <AnimationPanel />}
        {panelType === "text-effect" && <TextEffectPanel />}
      </div>

      {showColorDialog && (
        <ColorInputDialog
          onColorSelect={addRectElement}
          onCancel={() => setShowColorDialog(false)}
        />
      )}
    </div>
  );
};

export default EditorControls;
