import type { PanelProps } from "../../types";
import { CirclePanel } from "../element-panel/circle-panel";
import { useCirclePanel } from "../../hooks/use-circle-panel";

export function CirclePanelContainer(props: PanelProps) {
  const circlePanelProps = useCirclePanel({
    selectedElement: props.selectedElement ?? null,
    addElement: props.addElement!,
    updateElement: props.updateElement!,
  });
  return <CirclePanel {...circlePanelProps} />;
}