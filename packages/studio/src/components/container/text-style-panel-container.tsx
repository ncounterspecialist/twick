import type { TrackElement } from "@twick/timeline";
import { TextStylePanel } from "../panel/text-style-panel";

interface TextStylePanelContainerProps {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

export function TextStylePanelContainer({ addElement }: TextStylePanelContainerProps) {
  return (
    <TextStylePanel
      addElement={addElement}
    />
  );
}

