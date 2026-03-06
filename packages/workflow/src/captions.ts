import {
  CAPTION_STYLE,
  CaptionElement,
  TRACK_TYPES,
  TimelineEditor,
  Track,
  type ProjectJSON,
  type TrackJSON,
  generateShortUuid,
} from "@twick/timeline";
import type {
  ApplyCaptionToEditorInput,
  CaptionProjectApplyInput,
  CaptionProjectBuildInput,
  CaptionSegmentMs,
  CaptionTrackBuildInput,
  CaptionTrackStyle,
  WorkflowProjectJSON,
} from "./types";

const DEFAULT_VIDEO_SIZE = { width: 720, height: 1280 };

const DEFAULT_CAPTION_STYLE: CaptionTrackStyle = {
  capStyle: CAPTION_STYLE.WORD_BG_HIGHLIGHT,
  font: {
    size: 46,
    weight: 700,
    family: "Bangers",
  },
  colors: {
    text: "#ffffff",
    highlight: "#ff4081",
    bgColor: "#444444",
  },
  lineWidth: 0.35,
  stroke: "#000000",
  fontWeight: 700,
  shadowOffset: [-3, 3],
  shadowColor: "#000000",
  x: 0,
  y: 200,
  applyToAll: true,
};

function createId(prefix: "t" | "e", idFactory?: () => string): string {
  const seed = idFactory ? idFactory() : generateShortUuid();
  return `${prefix}-${seed}`;
}

function toSec(ms: number): number {
  return Math.max(0, ms) / 1000;
}

function normalizeCaptionSegment(segment: CaptionSegmentMs): CaptionSegmentMs {
  const start = Math.max(0, segment.s);
  const end = Math.max(start, segment.e);
  return {
    ...segment,
    s: start,
    e: end,
    t: segment.t ?? "",
  };
}

export function buildCaptionTrack(input: CaptionTrackBuildInput): TrackJSON {
  const {
    captions,
    trackId = createId("t", input.idFactory),
    trackName = "Caption",
    language,
    style = DEFAULT_CAPTION_STYLE,
    idFactory,
  } = input;

  const elements = captions.map((segment) => {
    const normalized = normalizeCaptionSegment(segment);
    return {
      id: createId("e", idFactory),
      trackId,
      type: "caption",
      s: toSec(normalized.s),
      e: toSec(normalized.e),
      t: normalized.t,
      ...(normalized.w ? { props: { wordsMs: normalized.w } } : {}),
      ...(normalized.metadata ? { metadata: normalized.metadata } : {}),
    };
  });

  return {
    id: trackId,
    name: trackName,
    type: TRACK_TYPES.CAPTION,
    ...(language ? { language } : {}),
    props: {
      ...DEFAULT_CAPTION_STYLE,
      ...style,
    },
    elements,
  };
}

export function buildCaptionProject(
  input: CaptionProjectBuildInput
): WorkflowProjectJSON {
  const videoSize = input.videoSize ?? DEFAULT_VIDEO_SIZE;
  const videoTrackId = createId("t");
  const captionTrackId = input.captionTrack?.id ?? createId("t");

  const captionTrack = buildCaptionTrack({
    captions: input.captions,
    trackId: captionTrackId,
    trackName: input.captionTrack?.name ?? "Caption",
    language: input.captionTrack?.language,
    style: input.captionTrack?.style,
  });

  return {
    properties: {
      width: videoSize.width,
      height: videoSize.height,
    },
    tracks: [
      {
        id: videoTrackId,
        name: "Video",
        type: TRACK_TYPES.VIDEO,
        elements: [
          {
            id: createId("e"),
            trackId: videoTrackId,
            type: "video",
            s: 0,
            e: Math.max(0, input.durationSec),
            props: {
              src: input.videoUrl,
            },
            frame: {
              size: [videoSize.width, videoSize.height],
            },
          },
        ],
      },
      captionTrack,
    ],
    version: 1,
    ...(input.metadata ? { metadata: input.metadata } : {}),
  };
}

function removeOverlappingCaptionElements(
  elements: TrackJSON["elements"],
  rangeStartSec: number,
  rangeEndSec: number
): TrackJSON["elements"] {
  return elements.filter((element) => {
    if (element.type !== "caption") {
      return true;
    }
    return element.e <= rangeStartSec || element.s >= rangeEndSec;
  });
}

export function applyCaptionsToProject(
  project: ProjectJSON,
  input: CaptionProjectApplyInput
): ProjectJSON {
  const insertionStartSec = Math.max(0, input.insertionStartSec ?? 0);
  const inferredEndFromCaptions = input.captions.length
    ? insertionStartSec +
      toSec(
        Math.max(
          0,
          ...input.captions.map((segment) =>
            Math.max(normalizeCaptionSegment(segment).e, 0)
          )
        )
      )
    : insertionStartSec;
  const insertionEndSec = Math.max(
    insertionStartSec,
    input.insertionEndSec ?? inferredEndFromCaptions
  );

  const captionTrackId = input.captionTrackId;
  const existingCaptionTrack = project.tracks.find((track) =>
    captionTrackId
      ? track.id === captionTrackId
      : track.type === TRACK_TYPES.CAPTION
  );

  const appendedElements = input.captions.map((segment) => {
    const normalized = normalizeCaptionSegment(segment);
    return {
      id: createId("e"),
      trackId: existingCaptionTrack?.id,
      type: "caption",
      s: insertionStartSec + toSec(normalized.s),
      e: insertionStartSec + toSec(normalized.e),
      t: normalized.t,
      ...(normalized.w ? { props: { wordsMs: normalized.w } } : {}),
      ...(normalized.metadata ? { metadata: normalized.metadata } : {}),
    };
  });

  if (existingCaptionTrack) {
    existingCaptionTrack.elements = removeOverlappingCaptionElements(
      existingCaptionTrack.elements,
      insertionStartSec,
      insertionEndSec
    );
    existingCaptionTrack.elements.push(
      ...appendedElements.map((element) => ({
        ...element,
        trackId: existingCaptionTrack.id,
      }))
    );
    existingCaptionTrack.elements.sort((a, b) => a.s - b.s);
    existingCaptionTrack.props = {
      ...DEFAULT_CAPTION_STYLE,
      ...(existingCaptionTrack.props ?? {}),
      ...(input.captionTrackStyle ?? {}),
    };
    if (input.captionTrackLanguage) {
      existingCaptionTrack.language = input.captionTrackLanguage;
    }
  } else {
    const createdTrack = buildCaptionTrack({
      captions: input.captions,
      trackId: createId("t"),
      trackName: input.captionTrackName ?? "Caption",
      language: input.captionTrackLanguage,
      style: input.captionTrackStyle,
    });
    createdTrack.elements = createdTrack.elements.map((element) => ({
      ...element,
      s: insertionStartSec + element.s,
      e: insertionStartSec + element.e,
    }));
    project.tracks.push(createdTrack);
  }

  return {
    ...project,
    version: (project.version ?? 0) + 1,
  };
}

function ensureCaptionTrack(editor: TimelineEditor, input: ApplyCaptionToEditorInput): Track {
  const existingTrack = input.captionTrackId
    ? editor.getTrackById(input.captionTrackId)
    : editor.getCaptionsTrack();
  if (existingTrack) {
    return existingTrack;
  }
  const newTrack = editor.addTrack(
    input.captionTrackName ?? "Caption",
    TRACK_TYPES.CAPTION
  );
  if (input.captionTrackLanguage) {
    newTrack.setLanguage(input.captionTrackLanguage);
    editor.refresh();
  }
  if (input.captionTrackStyle) {
    newTrack.setProps({
      ...DEFAULT_CAPTION_STYLE,
      ...input.captionTrackStyle,
    });
    editor.refresh();
  }
  return newTrack;
}

export async function applyCaptionsToEditor(
  editor: TimelineEditor,
  input: ApplyCaptionToEditorInput
): Promise<void> {
  const track = ensureCaptionTrack(editor, input);
  const rangeEnd = Math.max(
    input.insertionStartSec,
    input.insertionEndSec ?? input.insertionStartSec
  );

  const existingElements = track.getElements().filter((element) => {
    if (element.getType() !== "caption") {
      return false;
    }
    return !(
      element.getEnd() <= input.insertionStartSec || element.getStart() >= rangeEnd
    );
  });
  if (existingElements.length > 0) {
    editor.removeElements(existingElements.map((element) => element.getId()));
  }

  for (const segment of input.captions) {
    const normalized = normalizeCaptionSegment(segment);
    const start = input.insertionStartSec + toSec(normalized.s);
    const end = input.insertionStartSec + toSec(normalized.e);
    const caption = new CaptionElement(normalized.t, start, Math.max(start, end));
    if (normalized.w || normalized.metadata) {
      caption.setMetadata({
        ...(normalized.w ? { wordsMs: normalized.w } : {}),
        ...(normalized.metadata ? normalized.metadata : {}),
      });
    }
    await editor.addElementToTrack(track, caption);
  }
}
