import { getImageDimensions, getObjectFitSize, getVideoMeta } from "@twick/media-utils";
import { ImageProps, VideoProps } from "../types";
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
        },
        frame: {
            size: [props.width ?? fullSize.width, props.height ?? fullSize.height] as [number, number],
            x: props.x,
            y: props.y,
        }
    };
};