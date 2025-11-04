import { ElementProps } from "../properties/element-props";
import { TextEffects } from "../properties/text-effects";
import { Animation } from "../properties/animation";
import { type TrackElement } from "@twick/timeline";
import { PlaybackPropsPanel } from "../properties/playback-props";

interface PropertiesPanelContainerProps {
  selectedProp: string;
  selectedElement: TrackElement | null;
  updateElement: (element: TrackElement) => void;
}

export function PropertiesPanelContainer({
  selectedProp,
  selectedElement,
  updateElement,
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
    </>
  );
}
