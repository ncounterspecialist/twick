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

import { StageCanvas } from "./stage-canvas";
import { Toolbar } from "./toolbar";
import StudioHeader from "./header";
import { useStudioManager } from "../hooks/use-studio-manager";
import ElementPanelContainer from "./container/element-panel-container";
import { useTimelineContext } from "@twick/timeline";
import { MediaProvider } from "../context/media-context";
import { PropsToolbar } from "./props-toolbar";
import { PropertiesPanelContainer } from "./container/properties-panel-container";

export function TwickStudio() {
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

  return (
    <MediaProvider>
      <div className="h-screen w-screen overflow-hidden bg-neutral-900 text-gray-100">
        {/* Header */}
        <StudioHeader setVideoResolution={setVideoResolution} />
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
            <StageCanvas resolution={videoResolution} />
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
