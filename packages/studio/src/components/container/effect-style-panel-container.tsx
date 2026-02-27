import type { TrackElement } from "@twick/timeline";
import { EffectStylePanel } from "../panel/effect-style-panel";

interface EffectStylePanelContainerProps {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

export function EffectStylePanelContainer({
  selectedElement,
  addElement,
  updateElement,
}: EffectStylePanelContainerProps) {
  return (
    <EffectStylePanel
      selectedElement={selectedElement}
      addElement={addElement}
      updateElement={updateElement}
    />
  );
}

