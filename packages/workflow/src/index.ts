/**
 * @twick/workflow
 * Workflow builders and appliers for Twick AI/project integration.
 */
export type {
  CaptionSegmentMs,
  CaptionTrackStyle,
  CaptionTrackBuildInput,
  CaptionProjectBuildInput,
  CaptionProjectApplyInput,
  ApplyCaptionToEditorInput,
  TemplateTrackSpec,
  TemplateSpec,
  WorkflowProjectJSON,
} from "./types";

export {
  buildCaptionTrack,
  buildCaptionProject,
  applyCaptionsToProject,
  applyCaptionsToEditor,
} from "./captions";

export { applyProjectPatch, type WorkflowProjectPatch } from "./projects";

export {
  buildProjectFromTemplateSpec,
  buildProjectVariantFromTemplate,
  applyTemplateToExistingProject,
} from "./templates";
