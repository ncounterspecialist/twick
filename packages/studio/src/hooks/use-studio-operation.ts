import {
  PLAYER_STATE,
  ProjectJSON,
  exportChaptersAsJSON,
  exportChaptersAsYouTube,
  exportCaptionsAsSRT,
  exportCaptionsAsVTT,
  getCaptionLanguages,
  useTimelineContext,
  VideoElement,
} from "@twick/timeline";
import { ICaptionGenerationPollingResponse, StudioConfig, CaptionEntry } from "../types";
import { loadFile, saveAsFile } from "@twick/media-utils";
import { useState } from "react";
import { useLivePlayerContext } from "@twick/live-player";

const useStudioOperation = (studioConfig?: StudioConfig) => {
  const { editor, present, videoResolution } = useTimelineContext();
  const { setSeekTime, setPlayerState } = useLivePlayerContext();
  const [projectName, setProjectName] = useState("");

  const onNewProject = () => {
    setPlayerState(PLAYER_STATE.PAUSED);
    editor.loadProject({
      tracks: [],
      version: 0,
    });
    setSeekTime(0);
  }

  const onLoadProject = async () => {
    let project: ProjectJSON;
    setPlayerState(PLAYER_STATE.PAUSED);
    if (studioConfig?.loadProject) {
      project = await studioConfig.loadProject();
    } else {
      const file = await loadFile("application/json");
      const text = await file.text();
      setProjectName(file.name);
      project = JSON.parse(text);
    }
    editor.loadProject(project);
    setSeekTime(0.01);
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
          width: videoResolution.width,
          height: videoResolution.height,
        },
      });
    } else {
        alert("Export video not supported in demo mode");
    }
  };

  const onExportCaptions = async (format: "srt" | "vtt") => {
    if (!present) return;
    const baseName = (projectName || "captions").replace(/\.json$/i, "");
    const languages = getCaptionLanguages(present);

    if (languages.length <= 1) {
      const content =
        format === "srt"
          ? exportCaptionsAsSRT(present, languages[0])
          : exportCaptionsAsVTT(present, languages[0]);
      await saveAsFile(content, "text/plain", `${baseName}.${format}`);
      return;
    }

    for (const language of languages) {
      const content =
        format === "srt"
          ? exportCaptionsAsSRT(present, language)
          : exportCaptionsAsVTT(present, language);
      await saveAsFile(content, "text/plain", `${baseName}.${language}.${format}`);
    }
  };

  const onExportChapters = async (format: "youtube" | "json") => {
    if (!present) return;
    const content =
      format === "youtube"
        ? exportChaptersAsYouTube(present)
        : exportChaptersAsJSON(present);
    const fileName = `${(projectName || "chapters").replace(/\.json$/i, "")}.${
      format === "youtube" ? "txt" : "json"
    }`;
    await saveAsFile(content, "text/plain", fileName);
  };



  /**
   * Generates captions using the new polling-based service
   * Returns a function that can be called to start the generation process
   */
  const onGenerateCaptions = async (videoElement: VideoElement) => {
    // Use new polling-based service if available
    if (studioConfig?.captionGenerationService) {
      const service = studioConfig.captionGenerationService;
      const reqId = await service.generateCaptions(videoElement, present as ProjectJSON);
      return reqId;
    }
    alert("Generate captions not supported in demo mode");
    return null;
  };

  const addCaptionsToTimeline = (captions: CaptionEntry[]) => {
    const updatedProjectJSON = studioConfig?.captionGenerationService?.updateProjectWithCaptions(captions);
    if (updatedProjectJSON) {
      editor.loadProject(updatedProjectJSON);
    }
  }

  const getCaptionstatus = async (reqId: string) => {
    if (studioConfig?.captionGenerationService) {
      const service = studioConfig.captionGenerationService;
      return await service.getRequestStatus(reqId);
    }
    return {
      status: "failed",
      error: "Caption generation service not found",
    } as ICaptionGenerationPollingResponse;
  }

  return { 
    onLoadProject, 
    onSaveProject, 
    onExportVideo, 
    onNewProject,
    onExportCaptions,
    onExportChapters,
    onGenerateCaptions,
    addCaptionsToTimeline,
    getCaptionstatus,
  };
};

export default useStudioOperation;
