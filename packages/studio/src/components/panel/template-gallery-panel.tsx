import React from "react";
import { useTimelineContext, type ProjectJSON } from "@twick/timeline";
import { DEFAULT_PROJECT_TEMPLATES } from "../../templates/default-templates";
import type { ProjectTemplate, StudioConfig } from "../../types";

interface TemplateGalleryPanelProps {
  studioConfig?: StudioConfig;
}

export const TemplateGalleryPanel = ({
  studioConfig,
}: TemplateGalleryPanelProps): React.ReactElement => {
  const { editor } = useTimelineContext();
  const templates: ProjectTemplate[] =
    studioConfig?.templates?.length
      ? studioConfig.templates
      : DEFAULT_PROJECT_TEMPLATES;

  const loadTemplate = (project: ProjectJSON): void => {
    editor.loadProject(project);
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h3>Templates</h3>
      </div>
      <div className="panel-content" style={{ display: "grid", gap: "12px" }}>
        {templates.map((template) => (
          <button
            key={template.id}
            className="toolbar-btn"
            onClick={() => loadTemplate(template.project)}
            style={{
              width: "100%",
              justifyContent: "flex-start",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "12px",
              height: "auto",
            }}
          >
            <span style={{ fontWeight: 600 }}>{template.name}</span>
            <span style={{ opacity: 0.8, fontSize: "12px" }}>
              {template.description}
            </span>
            <span style={{ opacity: 0.6, fontSize: "11px", marginTop: "2px" }}>
              {template.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
