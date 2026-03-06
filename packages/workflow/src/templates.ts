import { TRACK_TYPES, generateShortUuid, type ProjectJSON, type TrackJSON } from "@twick/timeline";
import type { TemplateSpec, WorkflowProjectJSON } from "./types";

function buildTrackId(trackId?: string): string {
  return trackId ?? `t-${generateShortUuid()}`;
}

function normalizeTrack(track: TemplateSpec["tracks"][number]): TrackJSON {
  const id = buildTrackId(track.id);
  return {
    id,
    name: track.name ?? "Track",
    type: track.type ?? TRACK_TYPES.ELEMENT,
    ...(track.language ? { language: track.language } : {}),
    ...(track.props ? { props: track.props as Record<string, any> } : {}),
    elements: (track.elements ?? []).map((element) => ({
      ...element,
      trackId: element.trackId ?? id,
    })),
  };
}

export function buildProjectFromTemplateSpec(spec: TemplateSpec): WorkflowProjectJSON {
  return {
    properties: {
      width: spec.width ?? 720,
      height: spec.height ?? 1280,
    },
    tracks: spec.tracks.map(normalizeTrack),
    version: spec.version ?? 1,
    ...(spec.backgroundColor ? { backgroundColor: spec.backgroundColor } : {}),
    ...(spec.metadata ? { metadata: spec.metadata } : {}),
  };
}

export function buildProjectVariantFromTemplate(
  baseProject: ProjectJSON,
  spec: TemplateSpec
): WorkflowProjectJSON {
  const variant = buildProjectFromTemplateSpec(spec);
  return {
    ...baseProject,
    ...variant,
    version: Math.max(baseProject.version ?? 0, variant.version ?? 0) + 1,
    metadata: {
      ...(baseProject.metadata ?? {}),
      ...(variant.metadata ?? {}),
      custom: {
        ...((baseProject.metadata?.custom as Record<string, unknown>) ?? {}),
        variantSource: "template",
      },
    },
  };
}

export function applyTemplateToExistingProject(
  project: ProjectJSON,
  spec: TemplateSpec
): WorkflowProjectJSON {
  const built = buildProjectFromTemplateSpec(spec);
  return {
    ...project,
    ...built,
    version: (project.version ?? 0) + 1,
  };
}
