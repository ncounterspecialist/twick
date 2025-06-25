import { getAudioDuration, getImageDimensions, getObjectFitSize, getVideoMeta } from "@twick/media-utils";
import { AudioProps, ImageProps, TextProps, VideoProps } from "../types";
import { TIMELINE_ELEMENT_TYPE } from "./constants";

export const createImageElement = async ({props, timing, videoSize, timelineId, id}: {
    props: ImageProps,
    timing: {s: number, e?: number},
    videoSize: { width: number, height: number },
    timelineId: string,
    id: string,
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
        s: timing.s,
        e: timing.e ?? timing.s + 1,
        props: {
            src: props.src,
        },
        frame: {
            size: [props.width ?? fullSize.width, props.height ?? fullSize.height] as [number, number],
            x: props.x,
            y: props.y,
        }
    };
};


export const createVideoElement = async ({props, timing, videoSize, timelineId, id}: {
    props: VideoProps,
    timing: {s: number, e?: number},
    videoSize: { width: number, height: number },
    timelineId: string,
    id: string,
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
        s: timing.s,
        e: timing.e ?? timing.s + videoMeta.duration,
        props: {
            src: props.src,
            play: true,
            playbackRate: props.playbackRate ?? 1,
            volume: props.volume ?? 1,
        },
        frame: {
            size: [props.width ?? fullSize.width, props.height ?? fullSize.height] as [number, number],
            x: props.x,
            y: props.y,
        }
    };
};

export const createAudioElement = async ({props, timing, timelineId, id}: { 
    props: AudioProps,
    timing: {s: number, e?: number},
    timelineId: string,
    id: string,
}) => {
    const audioDuration = await getAudioDuration(props.src);
    return {
        type: TIMELINE_ELEMENT_TYPE.AUDIO,      
        timelineId,
        id,
        s: timing.s,
        e: timing.e ?? timing.s + audioDuration,
        props: {
            src: props.src, 
            play: true,
            volume: props.volume ?? 1,
            loop: props.loop ?? false,
            playbackRate: props.playbackRate ?? 1,
        },
    };
};

export const createTextElement = async ({props, timing, timelineId, id}: {
    props: TextProps,
    timing: {s: number, e?: number},
    timelineId: string,
    id: string,
}) => {
    return {
        type: TIMELINE_ELEMENT_TYPE.TEXT,
        timelineId,
        id,
        s: timing.s,
        e: timing.e ?? timing.s + 1,
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