import type { PanelProps } from "../../types";
import { VideoPanel } from "../element-panel/video-panel";
import { useVideoPanel } from "../../hooks/use-video-panel";

export function VideoPanelContainer(props: PanelProps) {
  const videoPanelProps = useVideoPanel({
    selectedElement: props.selectedElement ?? null,
    addElement: props.addElement!,
    updateElement: props.updateElement!,
  });
  return <VideoPanel {...videoPanelProps} />;
}
