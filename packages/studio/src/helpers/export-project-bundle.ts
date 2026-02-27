import type { ProjectJSON } from "@twick/timeline";
import {
  exportCaptionsAsSRT,
  exportCaptionsAsVTT,
  exportChaptersAsJSON,
  getCaptionLanguages,
} from "@twick/timeline";

export interface ProjectBundleExport {
  project: ProjectJSON;
  metadata: ProjectJSON["metadata"];
  chaptersJson: string;
  captions: Array<{
    language: string;
    srt: string;
    vtt: string;
  }>;
  video?: {
    url?: string;
    fileName?: string;
  };
}

export interface ExportProjectBundleOptions {
  videoUrl?: string;
  outFile?: string;
}

/**
 * Creates a portable export bundle with project JSON, chapters, and captions.
 * This intentionally avoids zip dependencies; callers can zip externally.
 */
export function exportProjectBundle(
  project: ProjectJSON,
  options?: ExportProjectBundleOptions
): ProjectBundleExport {
  const languages = getCaptionLanguages(project);
  const captions = (languages.length ? languages : ["default"]).map((language) => ({
    language,
    srt: exportCaptionsAsSRT(project, language),
    vtt: exportCaptionsAsVTT(project, language),
  }));

  return {
    project,
    metadata: project.metadata,
    chaptersJson: exportChaptersAsJSON(project),
    captions,
    video: {
      url: options?.videoUrl,
      fileName: options?.outFile,
    },
  };
}
