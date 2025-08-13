import { extractAudio, stitchAudio } from "@twick/media-utils";
import { TrackElement } from "../core/elements/base.element";
import { VideoElement } from "../core/elements/video.element";
import { Track } from "../core/track/track";
import { TrackJSON } from "../types";

export const getDecimalNumber = (num: number, precision = 3) => {
  return Number(num.toFixed(precision));
};

export const getTotalDuration = (tracks: TrackJSON[]) => {
  return (tracks || []).reduce(
    (maxDuration, timeline) =>
      Math.max(
        maxDuration,
        (timeline?.elements || []).reduce(
          (timelineDuration, element) => Math.max(timelineDuration, element.e),
          0
        )
      ),
    0
  );
};

export const generateShortUuid = (): string => {
  return "xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getCurrentElements = (
  currentTime: number,
  tracks: Track[]
): Array<Readonly<TrackElement>> => {
  const currentElements: Array<Readonly<TrackElement>> = [];
  if (tracks?.length) {
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i]) {
        const elements = tracks[i].getElements();
        for (let j = 0; j < elements.length; j++) {
          const element = elements[j];
          if (
            element.getStart() <= currentTime &&
            element.getEnd() >= currentTime
          ) {
            currentElements.push(element);
          }
        }
      }
    }
  }
  return currentElements;
};

export const canSplitElement = (element: TrackElement, currentTime: number) => {
  return element.getStart() <= currentTime && element.getEnd() >= currentTime;
};

export const isElementId = (id: string) => id.startsWith("e-");
export const isTrackId = (id: string) => id.startsWith("t-");

export const extractVideoAudio = async (tracks: Track[], duration: number) => {
  const videoSegments: {
    src: string;
    startAt: number;
    endAt: number;
    s: number;
    e: number;
    volume: number;
    playbackRate: number;
  }[] = [];
  tracks.forEach((track) =>
    track.getElements().forEach((element) => {
      if (element instanceof VideoElement) {
        videoSegments.push({
          src: element.getSrc(),
          startAt: element.getStartAt(),
          endAt: element.getEndAt(),
          s: element.getStart(),
          e: element.getEnd(),
          volume: element.getVolume(),
          playbackRate: element.getPlaybackRate(),
        });
      }
    })
  );

  const videoAudioPromises = videoSegments.map((segment) => {
    return extractAudio({
      src: segment.src,
      startAt: segment.startAt,
      endAt: segment.endAt,
      volume: segment.volume,
      playbackRate: segment.playbackRate,
    });
  });

  const audioUrls = await Promise.all(videoAudioPromises);
  const extractedAudio = await stitchAudio(
    audioUrls.map((url: string, index: number) => ({
      src: url,
      s: videoSegments[index].s,
      e: videoSegments[index].e,
      volume: videoSegments[index].volume,
    })),
    duration
  );

  return extractedAudio;
};
