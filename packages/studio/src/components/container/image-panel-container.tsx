import type { PanelProps } from "../../types";
import { ImagePanel } from "../panel/image-panel";
import { useImagePanel } from "../../hooks/use-image-panel";

export function ImagePanelContainer(props: PanelProps) {
  const imagePanelProps = useImagePanel({
    selectedElement: props.selectedElement ?? null,
    addElement: props.addElement!,
    updateElement: props.updateElement!,
  });
  return <ImagePanel {...imagePanelProps} />;
}
