/**
 * TwickStudio Component
 *
 * The main studio component that provides a complete video editing interface.
 * Integrates all major components including canvas, toolbar, media library,
 * and properties panel into a cohesive editing environment.
 *
 * @component
 * @example
 * ```tsx
 * <LivePlayerProvider>
 *   <TimelineProvider initialData={initialData} contextId="studio-demo">
 *     <TwickStudio />
 *   </TimelineProvider>
 * </LivePlayerProvider>
 * ```
 */

import { Toolbar } from "./toolbar";
import StudioHeader from "./header";
import { useStudioManager } from "../hooks/use-studio-manager";
import ElementPanelContainer from "./container/element-panel-container";
import { useTimelineContext } from "@twick/timeline";
import { MediaProvider } from "../context/media-context";
import { PropsToolbar } from "./props-toolbar";
import { PropertiesPanelContainer } from "./container/properties-panel-container";
import VideoEditor from "@twick/video-editor";
import { useMemo } from "react";
import { StudioConfig } from "../types";
import useStudioOperation from "../hooks/use-studio-operation";
import useGenerateCaptions from "../hooks/use-generate-captions";

export function TwickStudio({ studioConfig }: { studioConfig?: StudioConfig }) {
  const {
    selectedTool,
    setSelectedTool,
    selectedProp,
    setSelectedProp,
    selectedElement,
    addElement,
    updateElement,
  } = useStudioManager();
  const { videoResolution, setVideoResolution } = useTimelineContext();
  const {
    onNewProject,
    onLoadProject,
    onSaveProject,
    onExportVideo,
  } = useStudioOperation(studioConfig);

  const { onGenerateCaptions, addCaptionsToTimeline, getCaptionstatus } =
    useGenerateCaptions(studioConfig);

  const twickStudiConfig: StudioConfig = useMemo(
    () => ({
      canvasMode: true,
      ...(studioConfig || {}),
      videoProps: {
        ...(studioConfig?.videoProps || {}),
        width: videoResolution.width,
        height: videoResolution.height,
      },
    }),
    [videoResolution, studioConfig]
  );

  return (
    <MediaProvider>
      <div className="studio-container">
        {/* Header */}
        <StudioHeader
          setVideoResolution={setVideoResolution}
          onNewProject={onNewProject}
          onLoadProject={onLoadProject}
          onSaveProject={onSaveProject}
          onExportVideo={onExportVideo}
        />
        {/* Main Content */}
        <div className="studio-content">
          {/* Left Toolbar */}
          <Toolbar
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
          />

          {/* Left Panel */}
          <ElementPanelContainer
            videoResolution={videoResolution}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            selectedElement={selectedElement}
            addElement={addElement}
            updateElement={updateElement}
          />

          {/* Center - Canvas and Transport */}
          <main className="main-container">
            <div className="canvas-wrapper">
              <div
                className="canvas-container"
                style={{
                  maxWidth: twickStudiConfig.playerProps?.maxWidth ?? 960,
                }}
              >
                <VideoEditor editorConfig={twickStudiConfig} />
              </div>
            </div>
          </main>

          {/* Left Panel */}
          <PropertiesPanelContainer
            selectedProp={selectedProp}
            selectedElement={selectedElement}
            updateElement={updateElement}
            addCaptionsToTimeline={addCaptionsToTimeline}
            onGenerateCaptions={onGenerateCaptions}
            getCaptionstatus={getCaptionstatus}
          />

          {/* Right Toolbar */}
          <PropsToolbar
            selectedElement={selectedElement}
            selectedProp={selectedProp}
            setSelectedProp={setSelectedProp}
          />
        </div>
      </div>
    </MediaProvider>
  );
}
