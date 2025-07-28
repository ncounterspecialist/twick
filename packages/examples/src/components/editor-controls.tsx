import {
  ImageElement,
  VideoElement,
  RectElement,
  TIMELINE_ELEMENT_TYPE,
  Track,
  useTimelineContext,
  useTimelineEditor,
  AudioElement,
} from "@twick/timeline";
import { useRef, useState } from "react";
import FileInput from "../shared/file-input";
import { type MediaItem } from "@twick/video-editor";
import { MediaPanel } from "./media-panel";
import ColorInputDialog from "../shared/color-input";
import AnimationPanel from "./animation-panel";
import TextEffectPanel from "./text-effect-panel";
import { TextElement } from "@twick/timeline";

const videoSize = {
  width: 720,
  height: 1280,
};

const EditorControls = () => {
  let trackCount = useRef(0);
  const [panelType, setPanelType] = useState<
    "media" | "text" | "timeline" | "animation" | "text-effect" | null
  >(null);
  const { selectedItem } = useTimelineContext();
  const editor = useTimelineEditor();
  const [showColorDialog, setShowColorDialog] = useState(false);

  const addTextElement = (_text: string) => {
    if (!(selectedItem instanceof Track)) {
      return;
    }
    const textElement = new TextElement(_text);
    editor.addElementToTrack(selectedItem.getId(), textElement);
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
        editor.loadProject({
          timeline: projectData?.input?.timeline,
          version: projectData?.input?.version,
        });
      } else {
        alert("Invalid project data");
      }
    }
  };

  const addTimeline = () => {
    trackCount.current = trackCount.current + 1;
    editor.addTrack(`Track_${trackCount.current}`);
  };

  const addRectElement = (color: string) => {
    console.log("color", color);
    setShowColorDialog(false);
    if (!(selectedItem instanceof Track)) {
      return;
    }
    const rect = new RectElement(color, { width: 200, height: 200 });
    editor.addElementToTrack(selectedItem.getId(), rect);
  };

  const addMedia = async (element: MediaItem) => {
    if (!(selectedItem instanceof Track)) {
      return;
    }
    switch (element?.type) {
      case TIMELINE_ELEMENT_TYPE.IMAGE:
        const image = new ImageElement(element.url, videoSize);
        await editor.addElementToTrack(selectedItem.getId(), image);
        break;
      case TIMELINE_ELEMENT_TYPE.VIDEO:
        const video = new VideoElement(element.url, videoSize);
        await editor.addElementToTrack(selectedItem.getId(), video);
        break;
      case TIMELINE_ELEMENT_TYPE.AUDIO:
        const audio = new AudioElement(element.url);
        await editor.addElementToTrack(selectedItem.getId(), audio);
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

        <div className="controls-button" onClick={() => setPanelType("media")}>
          Media
        </div>
        <div
          className="controls-button"
          onClick={() => {
            const text = prompt("Enter text:");
            if (text) {
              addTextElement(text);
            }
          }}
        >
          Text
        </div>

        <div
          className="controls-button"
          onClick={() => {
            setShowColorDialog(true);
          }}
        >
          Rect
        </div>

        <div
          className="controls-button"
          onClick={() => setPanelType("text-effect")}
        >
          Text Effect
        </div>

        <div
          className="controls-button"
          onClick={() => setPanelType("animation")}
        >
          Animation
        </div>

        <div className="controls-button" onClick={() => addTimeline()}>
          Timeline
        </div>
      </div>
      {panelType === "media" && <MediaPanel onSelect={addMedia} />}
      {panelType === "animation" && <AnimationPanel editor={editor}/>}
      {panelType === "text-effect" && <TextEffectPanel />}
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
