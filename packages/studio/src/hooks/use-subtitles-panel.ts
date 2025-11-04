import { useState, useEffect, useRef } from "react";
import { CAPTION_STYLE, CaptionElement, Track, useTimelineContext } from "@twick/timeline";
import { CAPTION_PROPS } from "../helpers/constant";

interface SubtitleEntry {
  s: number;
  e: number;
  t: string;
}

export const useSubtitlesPanel = () => {
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>([]);
  const subtitlesTrack = useRef<Track | null>(null);
  const { editor } = useTimelineContext();

  const fetchSubtitles = async () => {
    const editorSubtitlesTrack = editor.getSubtiltesTrack();
    if (editorSubtitlesTrack) {
      subtitlesTrack.current = editorSubtitlesTrack;
      setSubtitles(
        editorSubtitlesTrack.getElements().map((element) => ({
          s: element.getStart(),
          e: element.getEnd(),
          t: (element as CaptionElement).getText(),
        }))
      );
    }
  };

  useEffect(() => {
    fetchSubtitles();
  }, []);

  const checkSubtitlesTrack = () => {
    if (!subtitlesTrack.current) {
      subtitlesTrack.current = editor.addTrack("Subtitles", "caption");
      const props: Record<string, any> = {
        capStyle: CAPTION_STYLE.WORD_BG_HIGHLIGHT,
        ...CAPTION_PROPS[CAPTION_STYLE.WORD_BG_HIGHLIGHT],
        x: 0,
        y: 200,
        applyToAll: true,
      };
      subtitlesTrack.current?.setProps(props);
    }
  };

  const addSubtitle = () => {
    const newSubtitle: SubtitleEntry = { s: 0, e: 0, t: "New Subtitle" };
    if (subtitles.length > 0) {
      newSubtitle.s = subtitles[subtitles.length - 1].e;
    }
    newSubtitle.e = newSubtitle.s + 1;
    setSubtitles([...subtitles, newSubtitle]);
    checkSubtitlesTrack();
    const captionElement = new CaptionElement(
      newSubtitle.t,
      newSubtitle.s,
      newSubtitle.e
    );
    editor.addElementToTrack(subtitlesTrack.current as Track, captionElement);
  };

  const splitSubtitle = async (index: number) => {
    if (subtitlesTrack.current) {
      const element = subtitlesTrack.current.getElements()[
        index
      ] as CaptionElement;
      const splitResult = await editor.splitElement(
        element,
        element.getStart() + element.getDuration() / 2
      );
      if (splitResult.success) {
        fetchSubtitles();
      }
    }
  };

  const deleteSubtitle = (index: number) => {
    setSubtitles(subtitles.filter((_, i) => i !== index));
    if (subtitlesTrack.current) {
      editor.removeElement(subtitlesTrack.current.getElements()[index]);
    }
  };

  const updateSubtitle = (index: number, subtitle: SubtitleEntry) => {
    setSubtitles(subtitles.map((sub, i) => (i === index ? subtitle : sub)));
    if (subtitlesTrack.current) {
      const element = subtitlesTrack.current.getElements()[
        index
      ] as CaptionElement;
      element.setText(subtitle.t);
      editor.updateElement(element);
    }
  };

  return {
    subtitles,
    addSubtitle,
    splitSubtitle,
    deleteSubtitle,
    updateSubtitle,
  };
};
