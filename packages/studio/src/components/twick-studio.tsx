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
 * <TimelineProvider initialData={initialData} videoResolution={resolution}>
 *   <TwickStudio />
 * </TimelineProvider>
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
  const { onLoadProject, onSaveProject, onExportVideo } =
    useStudioOperation(studioConfig);

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
      <div className="h-screen w-screen overflow-hidden bg-neutral-900 text-gray-100">
        {/* Header */}
        <StudioHeader
          setVideoResolution={setVideoResolution}
          onLoadProject={onLoadProject}
          onSaveProject={onSaveProject}
          onExportVideo={onExportVideo}
        />
        {/* Main Content */}
        <div className="flex h-[calc(100vh-56px)]">
          {/* Left Toolbar */}
          <Toolbar
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
          />

          {/* Left Panel */}
          <aside className="border-r border-gray-600/50 backdrop-blur-md shadow-lg">
            <ElementPanelContainer
              videoResolution={videoResolution}
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
              selectedElement={selectedElement}
              addElement={addElement}
              updateElement={updateElement}
            />
          </aside>

          {/* Center - Canvas and Transport */}
          <main className="flex-1 flex flex-col bg-neutral-700 main-container">
            <div className="flex-1 overflow-y-auto p-1">
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
          <aside className="border-r border-gray-600/50 backdrop-blur-md shadow-lg">
            <PropertiesPanelContainer
              selectedProp={selectedProp}
              selectedElement={selectedElement}
              updateElement={updateElement}
            />
          </aside>

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
