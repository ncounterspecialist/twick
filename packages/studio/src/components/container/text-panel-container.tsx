import { TrackElement } from "@twick/timeline";
import { TextPanel } from "../panel/text-panel";
import { useTextPanel } from "../../hooks/use-text-panel";

interface TextPanelContainerProps {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

export function TextPanelContainer(props: TextPanelContainerProps) {
  const textPanelProps = useTextPanel(props);
  return <TextPanel {...textPanelProps} />;
}
