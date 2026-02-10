/**
 * StudioHeader Component
 *
 * The top header bar of the studio interface. Contains the studio logo,
 * orientation controls, and action divs for saving and exporting.
 *
 * @component
 * @param {Object} props
 * @param {(resolution: Size) => void} props.setVideoResolution - Callback to update canvas resolution
 *
 * @example
 * ```tsx
 * <StudioHeader
 *   setVideoResolution={(size) => console.log(`New size: ${size.width}x${size.height}`)}
 * />
 * ```
 */

import type { Size } from "@twick/timeline";
import { Save, Download, Clapperboard, File, Plus, RectangleVertical, RectangleHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

interface StudioHeaderProps {
  setVideoResolution: (resolution: Size) => void;
  onNewProject: () => void;
  onLoadProject: () => void;
  onSaveProject: () => void;
  onExportVideo: () => void;
}
export const StudioHeader = ({
  setVideoResolution,
  onNewProject,
  onLoadProject,
  onSaveProject,
  onExportVideo,
}: StudioHeaderProps) => {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "vertical"
  );

  useEffect(() => {
    const orientation = localStorage.getItem("orientation");
    if (orientation) {
      setOrientation(orientation as "horizontal" | "vertical");
    }
  }, []);

  const handleOrientationChange = (nextOrientation: "horizontal" | "vertical") => {
    if (nextOrientation === orientation) return;

    const confirmMessage =
      "Changing orientation will create a new project with the new resolution. Do you want to continue?";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    // Create a fresh project for the new resolution
    onNewProject();
    setOrientation(nextOrientation);
  };

  useEffect(() => {
    if (orientation === "horizontal") {
      localStorage.setItem("orientation", "horizontal");
      setVideoResolution({ width: 1280, height: 720 });
    } else {
      localStorage.setItem("orientation", "vertical");
      setVideoResolution({ width: 720, height: 1280 });
    }
  }, [orientation]);

  return (
    <header className="header">
      <div className="flex-container">
        <Clapperboard className="icon-lg accent-purple" />
        <h1 className="text-gradient">
          Twick Studio
        </h1>
        <div className="header-separator"></div>
        <div className="flex-container" style={{ gap: "0.5rem" }}>
          <span className="text-sm opacity-80">Orientation</span>
          <button
            className={`btn-ghost ${orientation === "vertical" ? "btn-primary" : ""}`}
            title="Portrait (720×1280)"
            onClick={() => handleOrientationChange("vertical")}
          >
            <RectangleVertical className="icon-sm" />

          </button>
          <button
            className={`btn-ghost ${orientation === "horizontal" ? "btn-primary" : ""}`}
            title="Landscape (1280×720)"
            onClick={() => handleOrientationChange("horizontal")}
          >
            <RectangleHorizontal className="icon-sm" />

          </button>
        </div>
      </div>
      <div className="flex-container">
        <button
          className="btn-ghost"
          title="New Project"
          onClick={onNewProject}
        >
          <Plus className="icon-sm" />
          New Project
        </button>
        <button
          className="btn-ghost"
          title="Load Project"
          onClick={onLoadProject}
        >
          <File className="icon-sm" />
          Load Project
        </button>
        <button
          className="btn-ghost"
          title="Save Draft"
          onClick={onSaveProject}
        >
          <Save className="icon-sm" />
          Save Draft
        </button>
        <button
          className="btn-primary"
          title="Export"
          onClick={onExportVideo}
        >
          <Download className="icon-sm" />
          Export
        </button>
      </div>
    </header>
  );
};

export default StudioHeader;
