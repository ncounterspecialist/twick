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
    objectFit: "cover",
    timelineId,
    id,
    s: s,
    e: e ?? s + 1,
    props: {
      src: props.src,
      mediaFilter: props.mediaFilter,
    },
    frame: {
      size: [
        fullSize.width,
        fullSize.height,
      ] as [number, number],
      x: 0,
      y: 0,
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
    objectFit: "cover",
    videoDuration: videoMeta.duration,
    timelineId,
    id,
    s: s,
    e: e ?? s + videoMeta.duration,
    props: {
      src: props.src,
      play: props.play ?? true,
      playbackRate: props.playbackRate ?? 1,
      time: props.time ?? 0,
      mediaFilter: props.mediaFilter,
      volume: props.volume ?? 1,
    },
    frame: {
      size: [
        fullSize.width,
        fullSize.height,
      ] as [number, number],
      x: 0,
      y: 0,
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
      volume: props.volume ?? 1,
      loop: props.loop ?? false,
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
      fill: props.fill,
      rotation: props.rotation ?? 0,
      fontSize: props.fontSize,
      fontFamily: props.fontFamily,
      fontWeight: props.fontWeight,
      fontStyle: props.fontStyle,
      textAlign: props.textAlign,
    },
    frame: {
      x: 0,
      y: 0,
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