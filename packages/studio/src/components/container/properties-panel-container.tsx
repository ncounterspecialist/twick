import { ElementProps } from "../properties/element-props";
import { TextEffects } from "../properties/text-effects";
import { Animation } from "../properties/animation";
import { VideoElement, type TrackElement } from "@twick/timeline";
import { PlaybackPropsPanel } from "../properties/playback-props";
import { GenerateSubtitlesPanel } from "../properties/generate-subtitles";
import { StudioConfig, SubtitleEntry } from "../../types";

interface PropertiesPanelContainerProps {
  selectedProp: string;
  selectedElement: TrackElement | null;
  updateElement: (element: TrackElement) => void;
  generateSubtitles: (videoElement: VideoElement) => Promise<string | null>;
  addSubtitlesToTimeline: (subtitles: SubtitleEntry[]) => void;
  studioConfig?: StudioConfig;
}

export function PropertiesPanelContainer({
  selectedProp,
  selectedElement,
  updateElement,
  generateSubtitles,
  addSubtitlesToTimeline,
  studioConfig,
}: PropertiesPanelContainerProps) {
  if (!selectedElement) {
    return (
      <div className="panel-container">
        <div className="properties-header">
          <h3 className="properties-title">Select Element to see properties</h3>
        </div>
      </div>
    );
  }

  if (selectedElement.getType() === "caption") {
    return (
      <div className="panel-container">
        <div className="properties-header">
          <h3 className="properties-title">Not available for sub-title</h3>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Element Properties */}
      {selectedProp === "element-props" && (
        <ElementProps
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
      )}

      {/* Playback Properties */}
      {selectedProp === "playback-props" && (
        <PlaybackPropsPanel
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
      )}

      {/* Text Effects */}
      {selectedProp === "text-effects" && (
        <TextEffects
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
      )}

      {/* Animations */}
      {selectedProp === "animations" && (
        <Animation
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
      )}
      {
        selectedProp === "generate-subtitles" && (
          <GenerateSubtitlesPanel
            selectedElement={selectedElement}
            generateSubtitles={generateSubtitles}
            addSubtitlesToTimeline={addSubtitlesToTimeline}
            studioConfig={studioConfig}
          />
        )
      }
    </>
  );
}
