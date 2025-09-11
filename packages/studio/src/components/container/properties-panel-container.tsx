import { useState } from "react";
import { ElementProps } from "../properties/element-props";
import { TextEffects } from "../properties/text-effects";
import { Animation } from "../properties/animation";
import {
  AudioElement,
  CaptionElement,
  CircleElement,
  IconElement,
  ImageElement,
  RectElement,
  TextElement,
  VideoElement,
  type TrackElement,
} from "@twick/timeline";
import { PlaybackPropsPanel } from "../properties/playback-props";

interface PropertiesPanelContainerProps {
  selectedElement: TrackElement | null;
  updateElement: (element: TrackElement) => void;
}

export function PropertiesPanelContainer({
  selectedElement,
  updateElement,
}: PropertiesPanelContainerProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([]));

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const getAvailableSections = () => {
    const sections = [];

    if (selectedElement instanceof TextElement) {
      sections.push("animations");
      sections.push("text-effects");
    } else if (selectedElement instanceof ImageElement) {
      sections.push("animations");
      sections.push("color-effects");
    } else if (selectedElement instanceof VideoElement) {
      sections.push("animations");
      sections.push("color-effects");
      sections.push("playback-props");
    } else if (selectedElement instanceof AudioElement) {
      sections.push("playback-props");
    } else if (selectedElement instanceof CircleElement) {
      sections.push("animations");
    } else if (selectedElement instanceof RectElement) {
      sections.push("animations");
    } else if (selectedElement instanceof IconElement) {
      sections.push("animations");
    } else if (selectedElement instanceof CaptionElement) {
      sections.push("animations");
      sections.push("subtitle-style");
    }
    return sections;
  };

  const availableSections = getAvailableSections();

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
    <div className="w-72 h-full bg-gradient-to-b from-neutral-800/90 to-neutral-900/80 border-l border-gray-600/40 overflow-y-auto overflow-x-hidden backdrop-blur-xl shadow-2xl">
      <div className="px-3 py-3 border-b border-gray-600/30 bg-gradient-to-r from-purple-600/10 to-transparent">
        <h3 className="text-lg font-bold text-white">Element Properties</h3>
      </div>

      <div className="p-1">
        {/* Element Properties */}
        <ElementProps
          isOpen={openSections.has("all")}
          selectedElement={selectedElement}
          updateElement={updateElement}
          onToggle={() => toggleSection("all")}
        />

        {/* Playback Properties */}
        {availableSections.includes("playback-props") && (
          <PlaybackPropsPanel
            isOpen={openSections.has("playback-props")}
            selectedElement={selectedElement}
            updateElement={updateElement}
            onToggle={() => toggleSection("playback-props")}
          />
        )}

        {/* Text Effects */}
        {availableSections.includes("text-effects") && (
          <TextEffects
            isOpen={openSections.has("text-effects")}
            onToggle={() => toggleSection("text-effects")}
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        )}

        {/* Animations */}
        {availableSections.includes("animations") && (
          <Animation
            isOpen={openSections.has("animations")}
            onToggle={() => toggleSection("animations")}
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        )}
      </div>
    </div>
  );
}
