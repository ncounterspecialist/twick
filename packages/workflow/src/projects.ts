import type { ProjectJSON } from "@twick/timeline";
import type { CaptionProjectApplyInput } from "./types";
import { applyCaptionsToProject } from "./captions";

export type WorkflowProjectPatch =
  | {
      type: "captions";
      payload: CaptionProjectApplyInput;
    };

export function applyProjectPatch(
  project: ProjectJSON,
  patch: WorkflowProjectPatch
): ProjectJSON {
  if (patch.type === "captions") {
    return applyCaptionsToProject(project, patch.payload);
  }
  return project;
}
