import { ElementProps } from "../properties/element-props";
import { TextEffects } from "../properties/text-effects";
import { Animation } from "../properties/animation";
import { type TrackElement } from "@twick/timeline";
import { PlaybackPropsPanel } from "../properties/playback-props";
import { PropContainer } from "../shared/prop-container";
import { Music, Settings, SparklesIcon, Zap } from "lucide-react";

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
      <div className="w-72 h-full bg-gradient-to-b from-neutral-800/90 to-neutral-900/80 border-l border-gray-600/40 overflow-y-auto overflow-x-hidden backdrop-blur-xl shadow-2xl">
        <div className="px-3 py-3 border-b border-gray-600/30 bg-gradient-to-r from-purple-600/10 to-transparent">
          <h3 className="text-lg font-bold text-white">
            Select Element to see properties
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="w-72 h-full bg-gradient-to-b from-neutral-800/90 to-neutral-900/80 border-l border-gray-600/40 overflow-y-hidden overflow-x-hidden backdrop-blur-xl shadow-2xl">
      {/* Element Properties */}
      {selectedProp === "element-props" && (
        <PropContainer
          title="All Properties"
          icon={<Settings className="w-4 h-4" />}
        >
          <ElementProps
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        </PropContainer>
      )}

      {/* Playback Properties */}
      {selectedProp === "playback-props" && (
        <PropContainer
          title="Playback Properties"
          icon={<Music className="w-4 h-4" />}
        >
          <PlaybackPropsPanel
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        </PropContainer>
      )}

      {/* Text Effects */}
      {selectedProp === "text-effects" && (
        <PropContainer
          title="Text Effects"
          icon={<SparklesIcon className="w-4 h-4" />}
        >
          <TextEffects
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        </PropContainer>
      )}

      {/* Animations */}
      {selectedProp === "animations" && (
        <PropContainer title="Animations" icon={<Zap className="w-4 h-4" />}>
          <Animation
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        </PropContainer>
      )}
    </div>
  );
}
