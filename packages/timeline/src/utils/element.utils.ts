import {
  getAudioDuration,
  getImageDimensions,
  getObjectFitSize,
  getVideoMeta,
} from "@twick/media-utils";
import { AudioProps, ImageProps, TextProps, TimelineElement, VideoProps } from "../types";
import { TIMELINE_ELEMENT_TYPE } from "./constants";

export const createImageElement = async ({
  props,
  s,
  e,
  videoSize,
  timelineId,
  id,
}: {
  props: ImageProps;
  s: number;
  e?: number;
  videoSize: { width: number; height: number };
  timelineId: string;
  id: string;
}) => {
  const imageMeta = await getImageDimensions(props.src);
  const fullSize = getObjectFitSize(
    "contain",
    { width: imageMeta.width, height: imageMeta.height },
    videoSize
  );

  return {
    type: TIMELINE_ELEMENT_TYPE.IMAGE,
    objectFit: props.objectFit ?? "cover",
    timelineId,
    id,
    s: s,
    e: e ?? s + 1,
    props: {
      src: props.src,
    },
    frame: {
      size: [
        props.width ?? fullSize.width,
        props.height ?? fullSize.height,
      ] as [number, number],
      x: props.x,
      y: props.y,
    },
  };
};

export const createVideoElement = async ({
  props,
  s,
  e,
  videoSize,
  timelineId,
  id,
}: {
  props: VideoProps;
  s: number;
  e?: number;
  videoSize: { width: number; height: number };
  timelineId: string;
  id: string;
}) => {
  const videoMeta = await getVideoMeta(props.src);
  const fullSize = getObjectFitSize(
    "contain",
    { width: videoMeta.width, height: videoMeta.height },
    videoSize
  );

  return {
    type: TIMELINE_ELEMENT_TYPE.VIDEO,
    objectFit: props.objectFit ?? "cover",
    videoDuration: videoMeta.duration,
    timelineId,
    id,
    s: s,
    e: e ?? s + videoMeta.duration,
    props: {
      src: props.src,
      play: true,
      playbackRate: props.playbackRate ?? 1,
      volume: props.volume ?? 1,
    },
    frame: {
      size: [
        props.width ?? fullSize.width,
        props.height ?? fullSize.height,
      ] as [number, number],
      x: props.x,
      y: props.y,
    },
  };
};

export const createAudioElement = async ({
  props,
  s,
  e,
  timelineId,
  id,
}: {
  props: AudioProps;
  s: number;
  e?: number;
  timelineId: string;
  id: string;
}) => {
  const audioDuration = await getAudioDuration(props.src);
  return {
    type: TIMELINE_ELEMENT_TYPE.AUDIO,
    timelineId,
    id,
    s: s,
    e: e ?? s + audioDuration,
    props: {
      src: props.src,
      play: true,
      volume: props.volume ?? 1,
      loop: props.loop ?? false,
      playbackRate: props.playbackRate ?? 1,
    },
  };
};

export const createTextElement = async ({
  props,
  s,
  e,
  timelineId,
  id,
}: {
  props: TextProps;
  s: number;
  e?: number;
  timelineId: string;
  id: string;
}) => {
  return {
    type: TIMELINE_ELEMENT_TYPE.TEXT,
    timelineId,
    id,
    s: s,
    e: e ?? s + 1,
    props: {
      text: props.text,
      fontFamily: props.fontFamily ?? "Poppins",
      fontSize: props.fontSize ?? 40,
      fontWeight: props.fontWeight ?? 400,
      fontStyle: props.fontStyle ?? "normal",
      x: props.x ?? 0,
      y: props.y ?? 0,
      rotation: props.rotation ?? 0,
      fill: props.fill ?? "#000000",
      textAlign: props.textAlign ?? "center",
      textWrap: props.textWrap ?? false,
    },
  };
}; 

export const isTimelineElementId = (id: string) => id.startsWith("e-");

export const isVideoElement = (selectedItem: TimelineElement) => isTimelineElementId(selectedItem?.id) && selectedItem?.type === "video";

export const isAudioElement = (selectedItem: TimelineElement) => isTimelineElementId(selectedItem?.id) && selectedItem?.type === "audio";

export const isImageElement = (selectedItem: TimelineElement) => isTimelineElementId(selectedItem?.id) && selectedItem?.type === "image";

export const isTextElement = (selectedItem: TimelineElement) => isTimelineElementId(selectedItem?.id) && selectedItem?.type === "text";

export const isRectElement = (selectedItem: TimelineElement) => isTimelineElementId(selectedItem?.id) && selectedItem?.type === "rect";

export const isIconElement = (selectedItem: TimelineElement) => isTimelineElementId(selectedItem?.id) && selectedItem?.type === "icon";

export const isCircleElement = (selectedItem: TimelineElement) => isTimelineElementId(selectedItem?.id) && selectedItem?.type === "circle";

export const isCaptionElement = (selectedItem: TimelineElement) => isTimelineElementId(selectedItem?.id) && selectedItem?.type === "caption";

export const canSplitElement = (selectedItem: TimelineElement) => isVideoElement(selectedItem) || isAudioElement(selectedItem) || isCaptionElement(selectedItem);