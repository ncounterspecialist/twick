import { CaptionsPanel } from "../panel/captions-panel";
import { useCaptionsPanel } from "../../hooks/use-captions-panel";

export function CaptionsPanelContainer() {
  const captionsPanelProps = useCaptionsPanel();
  return <CaptionsPanel {...captionsPanelProps} />;
}