/**
 * PropsToolbar Component
 *
 * A vertical toolbar that provides quick access to different property sections
 * for the selected element. Displays icons for each section.
 *
 * @component
 * @param {Object} props
 * @param {TrackElement} props.selectedElement - The currently selected element to display properties for
 * @param {string} props.selectedProp - The currently selected property to display
 * @param {Function} props.setSelectedProp - The function to set the currently selected property
 *
 * @example
 * ```tsx
 * <PropsToolbar
 *   selectedElement={someElement}
 *   selectedProp={someProp}
 *   setSelectedProp={someFunction}
 * />
 * ```
 */

import {
  Type,
  Image,
  Music,
  Infinity,
  Zap,
  MessageSquare,
  Plus,
  Settings,
  SparklesIcon,
} from "lucide-react";
import type { ToolCategory } from "../types";
import {
  AudioElement,
  CaptionElement,
  CircleElement,
  IconElement,
  ImageElement,
  RectElement,
  TextElement,
  TrackElement,
  VideoElement,
} from "@twick/timeline";
import { useEffect, useMemo } from "react";

const propsCategories: Map<string, ToolCategory> = new Map([
  [
    "element-props",
    {
      id: "element-props",
      name: "Properties",
      icon: "Settings",
      description: "Element Properties",
    },
  ],
  [
    "animations",
    {
      id: "animations",
      name: "Animations",
      icon: "Zap",
      description: "Animations",
    },
  ],
  [
    "text-effects",
    {
      id: "text-effects",
      name: "Text Effects",
      icon: "SparklesIcon",
      description: "Text Effects",
    },
  ],
  [
    "color-effects",
    {
      id: "color-effects",
      name: "Color Effects",
      icon: "Image",
      description: "Color Effects",
    },
  ],
  [
    "playback-props",
    {
      id: "playback-props",
      name: "Playback Props",
      icon: "Music",
      description: "Playback Properties",
    },
  ],
  [
    "subtitle-style",
    {
      id: "subtitle-style",
      name: "Subtitle Style",
      icon: "MessageSquare",
      description: "Subtitle Style",
    },
  ],
]);

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Type":
      return Type;
    case "Infinity":
      return Infinity;
    case "Image":
      return Image;
    case "Music":
      return Music;
    case "MessageSquare":
      return MessageSquare;
    case "Settings":
      return Settings;
    case "SparklesIcon":
      return SparklesIcon;
    case "Zap":
      return Zap;
    default:
      return Plus;
  }
};

export function PropsToolbar({
  selectedElement,
  selectedProp,
  setSelectedProp,
}: {
  selectedElement: TrackElement | null;
  selectedProp: string;
  setSelectedProp: (prop: string) => void;
}) {
  const availableSections = useMemo(() => {
    const sections: ToolCategory[] = [];
    if (selectedElement instanceof TextElement) {
      sections.push(propsCategories.get("element-props")!);
      sections.push(propsCategories.get("animations")!);
      sections.push(propsCategories.get("text-effects")!);
    } else if (selectedElement instanceof ImageElement) {
      sections.push(propsCategories.get("element-props")!);
      sections.push(propsCategories.get("animations")!);
      sections.push(propsCategories.get("color-effects")!);
    } else if (selectedElement instanceof VideoElement) {
      sections.push(propsCategories.get("element-props")!);
      sections.push(propsCategories.get("animations")!);
      sections.push(propsCategories.get("color-effects")!);
      sections.push(propsCategories.get("playback-props")!);
    } else if (selectedElement instanceof AudioElement) {
      sections.push(propsCategories.get("element-props")!);
      sections.push(propsCategories.get("playback-props")!);
    } else if (selectedElement instanceof CircleElement) {
      sections.push(propsCategories.get("element-props")!);
      sections.push(propsCategories.get("animations")!);
    } else if (selectedElement instanceof RectElement) {
      sections.push(propsCategories.get("element-props")!);
      sections.push(propsCategories.get("animations")!);
    } else if (selectedElement instanceof IconElement) {
      sections.push(propsCategories.get("element-props")!);
      sections.push(propsCategories.get("animations")!);
    } else if (selectedElement instanceof CaptionElement) {
      sections.push(propsCategories.get("element-props")!);
      sections.push(propsCategories.get("animations")!);
      sections.push(propsCategories.get("subtitle-style")!);
    }
    return sections;
  }, [selectedElement]);

  useEffect(() => {
    if (availableSections?.length) {
      if (
        availableSections.map((section) => section.id).indexOf(selectedProp) ===
        -1
      ) {
        setSelectedProp(availableSections[0].id);
      }
    }
  }, [availableSections]);
  
  return (
    <div className="sidebar">
      {/* Main Tools */}
      {availableSections.map((tool) => {
        const Icon = getIcon(tool.icon);
        const isSelected = selectedProp === tool.id;
        return (
          <div
            key={tool.id}
            onClick={() => setSelectedProp(tool.id)}
            className={`toolbar-btn ${isSelected ? "active" : ""}`}
            title={`${tool.name}${tool.shortcut ? ` (${tool.shortcut})` : ""}`}
          >
            <Icon className="icon-sm" />
            <span className="props-toolbar-label">{tool.name}</span>
          </div>
        );
      })}
    </div>
  );
}
