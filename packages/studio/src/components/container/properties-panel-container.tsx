import { ElementProps } from "../properties/element-props";
import { TextEffects } from "../properties/text-effects";
import { Animation } from "../properties/animation";
import { VideoElement, type TrackElement } from "@twick/timeline";
import { PlaybackPropsPanel } from "../properties/playback-props";
import { GenerateCaptionsPanel } from "../properties/generate-captions";
import { ICaptionGenerationPollingResponse, CaptionEntry } from "../../types";

interface PropertiesPanelContainerProps {
  selectedProp: string;
  selectedElement: TrackElement | null;
  updateElement: (element: TrackElement) => void;
  addCaptionsToTimeline: (captions: CaptionEntry[]) => void;
  onGenerateCaptions: (videoElement: VideoElement) => Promise<string | null>;
  getCaptionstatus: (reqId: string) => Promise<ICaptionGenerationPollingResponse>;
}

export function PropertiesPanelContainer({
  selectedProp,
  selectedElement,
  updateElement,
  addCaptionsToTimeline,
  onGenerateCaptions,
  getCaptionstatus,
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
        selectedProp === "generate-captions" && (
          <GenerateCaptionsPanel
            selectedElement={selectedElement}
            addCaptionsToTimeline={addCaptionsToTimeline}
            onGenerateCaptions={onGenerateCaptions}
            getCaptionstatus={getCaptionstatus}
          />
        )
      }
    </>
  );
}
