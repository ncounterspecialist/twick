import { ElementProps } from "../properties/element-props";
import { TextEffects } from "../properties/text-effects";
import { Animation } from "../properties/animation";
import { VideoElement, type TrackElement } from "@twick/timeline";
import { PlaybackPropsPanel } from "../properties/playback-props";
import { GenerateSubtitlesPanel } from "../properties/generate-subtitles";
import { ISubtitleGenerationPollingResponse, SubtitleEntry } from "../../types";

interface PropertiesPanelContainerProps {
  selectedProp: string;
  selectedElement: TrackElement | null;
  updateElement: (element: TrackElement) => void;
  addSubtitlesToTimeline: (subtitles: SubtitleEntry[]) => void;
  onGenerateSubtitles: (videoElement: VideoElement) => Promise<string | null>;
  getSubtitleStatus: (reqId: string) => Promise<ISubtitleGenerationPollingResponse>;
}

export function PropertiesPanelContainer({
  selectedProp,
  selectedElement,
  updateElement,
  addSubtitlesToTimeline,
  onGenerateSubtitles,
  getSubtitleStatus,
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
            addSubtitlesToTimeline={addSubtitlesToTimeline}
            onGenerateSubtitles={onGenerateSubtitles}
            getSubtitleStatus={getSubtitleStatus}
          />
        )
      }
    </>
  );
}
