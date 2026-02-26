import type { ElementJSON, ProjectJSON } from "../types";

type CaptionLike = {
  s: number;
  e: number;
  text: string;
};

const pad = (n: number, size = 2): string => String(n).padStart(size, "0");

const toSrtTime = (seconds: number): string => {
  const totalMs = Math.max(0, Math.floor(seconds * 1000));
  const ms = totalMs % 1000;
  const totalSec = Math.floor(totalMs / 1000);
  const sec = totalSec % 60;
  const totalMin = Math.floor(totalSec / 60);
  const min = totalMin % 60;
  const hrs = Math.floor(totalMin / 60);
  return `${pad(hrs)}:${pad(min)}:${pad(sec)},${pad(ms, 3)}`;
};

const toVttTime = (seconds: number): string => {
  const totalMs = Math.max(0, Math.floor(seconds * 1000));
  const ms = totalMs % 1000;
  const totalSec = Math.floor(totalMs / 1000);
  const sec = totalSec % 60;
  const totalMin = Math.floor(totalSec / 60);
  const min = totalMin % 60;
  const hrs = Math.floor(totalMin / 60);
  return `${pad(hrs)}:${pad(min)}:${pad(sec)}.${pad(ms, 3)}`;
};

const getCaptionText = (element: ElementJSON): string => {
  const fromTextField = typeof element.t === "string" ? element.t : "";
  const fromProps =
    typeof element.props?.text === "string" ? element.props.text : "";
  return (fromTextField || fromProps).trim();
};

export const getCaptionElements = (
  project: ProjectJSON,
  language?: string
): CaptionLike[] => {
  const captions = (project.tracks || [])
    .filter((track) => {
      if (track.type !== "caption") return false;
      if (!language) return true;
      return (track.language || "default") === language;
    })
    .flatMap((track) => track.elements || [])
    .filter((element) => element.type === "caption")
    .map((element) => ({
      s: element.s,
      e: element.e,
      text: getCaptionText(element),
    }))
    .filter((caption) => caption.text && caption.e > caption.s)
    .sort((a, b) => a.s - b.s);

  return captions;
};

export const getCaptionLanguages = (project: ProjectJSON): string[] => {
  const languages = (project.tracks || [])
    .filter((track) => track.type === "caption")
    .map((track) => track.language || "default");
  return [...new Set(languages)];
};

export const exportCaptionsAsSRT = (
  project: ProjectJSON,
  language?: string
): string => {
  const captions = getCaptionElements(project, language);
  return captions
    .map(
      (caption, index) =>
        `${index + 1}\n${toSrtTime(caption.s)} --> ${toSrtTime(caption.e)}\n${
          caption.text
        }\n`
    )
    .join("\n");
};

export const exportCaptionsAsVTT = (
  project: ProjectJSON,
  language?: string
): string => {
  const captions = getCaptionElements(project, language);
  const body = captions
    .map(
      (caption) =>
        `${toVttTime(caption.s)} --> ${toVttTime(caption.e)}\n${caption.text}\n`
    )
    .join("\n");
  return `WEBVTT\n\n${body}`.trimEnd();
};
