import { ProjectJSON, useTimelineContext } from "@twick/timeline";
import { StudioConfig } from "../types";
import { loadFile, saveAsFile } from "@twick/media-utils";
import { useState } from "react";

const useStudioOperation = (studioConfig?: StudioConfig) => {
  const { editor, present } = useTimelineContext();
  const [projectName, setProjectName] = useState("");
  const onLoadProject = async () => {
    let project: ProjectJSON;
    if (studioConfig?.loadProject) {
      project = await studioConfig.loadProject();
    } else {
      const file = await loadFile("application/json");
      const text = await file.text();
      setProjectName(file.name);
      project = JSON.parse(text);
    }
    console.log("Editor", editor);
    editor.loadProject(project);
  };

  const onSaveProject = async () => {
    let fileName;
    if (projectName) {
      fileName = projectName;
    } else {
      fileName = prompt("Enter the name of the project") || "untitled-project";
      fileName = fileName + ".json";
      setProjectName(fileName);
    }
    if (studioConfig?.saveProject && present) {
      await studioConfig.saveProject(present, fileName);
    } else {
      const file = await saveAsFile(
        JSON.stringify(present),
        "application/json",
        fileName
      );
      if (file) {
        console.log("File saved", file);
      }
    }
  };

  const onExportVideo = async () => {
    if (studioConfig?.exportVideo && present) {
      await studioConfig.exportVideo(present, {
        outFile: "output.mp4",
        fps: 30,
        resolution: {
          width: studioConfig.videoProps?.width,
          height: studioConfig.videoProps?.height,
        },
      });
    } else {
        alert("Export video not supported in demo mode");
    }
  };

  return { onLoadProject, onSaveProject, onExportVideo };
};

export default useStudioOperation;
