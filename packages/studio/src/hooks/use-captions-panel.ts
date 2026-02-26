import { useState, useEffect, useRef } from "react";
import {
  CAPTION_STYLE,
  CaptionElement,
  Track,
  useTimelineContext,
} from "@twick/timeline";
import { CAPTION_PROPS } from "../helpers/constant";

interface CaptionEntry {
  s: number;
  e: number;
  t: string;
}

export const useCaptionsPanel = () => {
  const [captions, setCaptions] = useState<CaptionEntry[]>([]);
  const captionsTrack = useRef<Track | null>(null);
  const { editor } = useTimelineContext();

  const resolveCaptionTracks = (): Track[] => {
    return (editor.getTimelineData()?.tracks || []).filter(
      (track) => track.getType() === "caption"
    );
  };

  const fetchCaptions = async () => {
    const captionTracks = resolveCaptionTracks();
    const editorCaptionsTrack = captionTracks[0];

    if (!editorCaptionsTrack) {
      captionsTrack.current = null;
      setCaptions([]);
      return;
    }

    captionsTrack.current = editorCaptionsTrack;
    setCaptions(
      editorCaptionsTrack.getElements().map((element) => ({
        s: element.getStart(),
        e: element.getEnd(),
        t: (element as CaptionElement).getText(),
      }))
    );
  };

  useEffect(() => {
    fetchCaptions();
  }, []);

  const checkCaptionsTrack = () => {
    if (!captionsTrack.current) {
      captionsTrack.current = editor.addTrack("Caption", "caption");
      const props: Record<string, any> = {
        capStyle: CAPTION_STYLE.WORD_BG_HIGHLIGHT,
        ...CAPTION_PROPS[CAPTION_STYLE.WORD_BG_HIGHLIGHT],
        x: 0,
        y: 200,
        applyToAll: true,
      };
      captionsTrack.current?.setProps(props);
    }
  };

  const addCaption = () => {
    const newCaption: CaptionEntry = { s: 0, e: 0, t: "New Caption" };
    if (captions.length > 0) {
      newCaption.s = captions[captions.length - 1].e;
    }
    newCaption.e = newCaption.s + 1;
    setCaptions([...captions, newCaption]);
    checkCaptionsTrack();
    const captionElement = new CaptionElement(
      newCaption.t,
      newCaption.s,
      newCaption.e
    );
    editor.addElementToTrack(captionsTrack.current as Track, captionElement);
  };

  const splitCaption = async (index: number) => {
    if (captionsTrack.current) {
      const element = captionsTrack.current.getElements()[
        index
      ] as CaptionElement;
      const splitResult = await editor.splitElement(
        element,
        element.getStart() + element.getDuration() / 2
      );
      if (splitResult.success) {
        fetchCaptions();
      }
    }
  };

  const deleteCaption = (index: number) => {
    setCaptions(captions.filter((_, i) => i !== index));
    if (captionsTrack.current) {
      editor.removeElement(captionsTrack.current.getElements()[index]);
    }
  };

  const updateCaption = (index: number, caption: CaptionEntry) => {
    setCaptions(captions.map((sub, i) => (i === index ? caption : sub)));
    if (captionsTrack.current) {
      const element = captionsTrack.current.getElements()[
        index
      ] as CaptionElement;
      element.setText(caption.t);
      editor.updateElement(element);
    }
  };

  return {
    captions,
    addCaption,
    splitCaption,
    deleteCaption,
    updateCaption,
  };
};
