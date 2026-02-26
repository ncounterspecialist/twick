import type { StudioConfig } from "../types";
import { DEFAULT_PROJECT_TEMPLATES } from "../templates/default-templates";

const sharedVideoProps = {
  width: 720,
  height: 1280,
};

export const DEFAULT_STUDIO_CONFIG: StudioConfig = {
  videoProps: sharedVideoProps,
  templates: DEFAULT_PROJECT_TEMPLATES,
};

export const EDU_STUDIO_CONFIG: StudioConfig = {
  ...DEFAULT_STUDIO_CONFIG,
  hiddenTools: ["circle", "rect", "generate-media"],
  templates: DEFAULT_PROJECT_TEMPLATES.filter(
    (template) => template.category === "edu" || template.category === "blank"
  ),
};

export const DEMO_STUDIO_CONFIG: StudioConfig = {
  ...DEFAULT_STUDIO_CONFIG,
  hiddenTools: ["circle", "rect"],
  templates: DEFAULT_PROJECT_TEMPLATES.filter(
    (template) => template.category === "demo" || template.category === "blank"
  ),
};

export const MARKETING_STUDIO_CONFIG: StudioConfig = {
  ...DEFAULT_STUDIO_CONFIG,
  hiddenTools: [],
  templates: DEFAULT_PROJECT_TEMPLATES,
};
