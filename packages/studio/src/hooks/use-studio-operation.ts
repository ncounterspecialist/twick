import { ProjectJSON, useTimelineContext, VideoElement, CaptionElement, Track } from "@twick/timeline";
import { StudioConfig, SubtitleEntry } from "../types";
import { loadFile, saveAsFile } from "@twick/media-utils";
import { useState } from "react";
import { CAPTION_STYLE } from "@twick/timeline";
import { CAPTION_PROPS } from "../helpers/constant";

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

  /**
   * Adds subtitles to the timeline from subtitle entries
   */
  const addSubtitlesToTimeline = (subtitles: SubtitleEntry[]) => {
    let subtitlesTrack = editor.getSubtiltesTrack();
    
    // Create subtitles track if it doesn't exist
    if (!subtitlesTrack) {
      subtitlesTrack = editor.addTrack("Subtitles", "caption");
      const props: Record<string, any> = {
        capStyle: CAPTION_STYLE.WORD_BG_HIGHLIGHT,
        ...CAPTION_PROPS[CAPTION_STYLE.WORD_BG_HIGHLIGHT],
        x: 0,
        y: 200,
        applyToAll: true,
      };
      subtitlesTrack.setProps(props);
    }

    // Add each subtitle as a CaptionElement
    subtitles.forEach((subtitle) => {
      const captionElement = new CaptionElement(
        subtitle.t,
        subtitle.s,
        subtitle.e
      );
      editor.addElementToTrack(subtitlesTrack as Track, captionElement);
    });
  };

  /**
   * Generates subtitles using the new polling-based service
   * Returns a function that can be called to start the generation process
   */
  const onGenerateSubtitles = async (videoElement: VideoElement) => {
    // Use new polling-based service if available
    if (studioConfig?.subtitleGenerationService) {
      const service = studioConfig.subtitleGenerationService;
      const videoUrl = videoElement.getSrc();
      
      if (!videoUrl) {
        throw new Error("Video element has no source URL");
      }

      // Start generation and get request ID
      const { reqId } = await service.generateSubtitles(videoUrl);
      
      // Return the request ID for polling
      return reqId;
    }
        
    alert("Generate subtitles not supported in demo mode");
    return null;
  };

  return { 
    onLoadProject, 
    onSaveProject, 
    onExportVideo, 
    onGenerateSubtitles,
    addSubtitlesToTimeline 
  };
};

export default useStudioOperation;
