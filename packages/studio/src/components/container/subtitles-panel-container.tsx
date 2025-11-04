import { SubtitlesPanel } from "../panel/subtitles-panel";
import { useSubtitlesPanel } from "../../hooks/use-subtitles-panel";

export function SubtitlesPanelContainer() {
  const subtitlesPanelProps = useSubtitlesPanel();
  return <SubtitlesPanel {...subtitlesPanelProps} />;
}