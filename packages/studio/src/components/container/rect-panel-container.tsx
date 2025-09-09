import type { PanelProps } from "../../types";
import { RectPanel } from "../panel/rect-panel";
import { useRectPanel } from "../../hooks/use-rect-panel";

export function RectPanelContainer(props: PanelProps) {
  const rectPanelProps = useRectPanel({
    selectedElement: props.selectedElement ?? null,
    addElement: props.addElement!,
    updateElement: props.updateElement!,
  });
  return <RectPanel {...rectPanelProps} />;
}
