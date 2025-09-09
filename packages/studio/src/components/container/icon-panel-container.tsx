import type { PanelProps } from "../../types";
import { IconPanel } from "../panel/icon-panel";
import { useIconPanel } from "../../hooks/use-icon-panel";

export function IconPanelContainer(props: PanelProps) {
  const iconPanelProps = useIconPanel({
    selectedElement: props.selectedElement ?? null,
    addElement: props.addElement!,
    updateElement: props.updateElement!,
  });
  return <IconPanel {...iconPanelProps} />;
}