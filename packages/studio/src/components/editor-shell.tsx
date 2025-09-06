import { StageCanvas } from "./stage-canvas";
import { Toolbar } from "./toolbar";
import { PropertiesPanel } from "./properties-panel";
import ElementPanel from "./element-panel";
import StudioHeader from "./header";
import useStudioManager from "../hook/use-studio-manager";

export function EditorShell() {
  const {
    selectedTool,
    setSelectedTool,
    selectedElement,
    addElement,
    updateElement,
  } = useStudioManager();
  
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-900 text-gray-100">
      {/* Header */}
      <StudioHeader />
      {/* Main Content */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Left Toolbar */}
        <Toolbar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />

        {/* Left Panel - Media Library */}
        <aside className="border-r border-gray-600/50 backdrop-blur-md shadow-lg">
          <ElementPanel
            selectedTool={selectedTool}
            selectedElement={selectedElement}
            addElement={addElement}
            updateElement={updateElement}
          />
        </aside>

        {/* Center - Canvas and Transport */}
        <main className="flex-1 flex flex-col bg-neutral-700 main-container">
          <StageCanvas resolution={{ width: 1280, height: 720 }} />
        </main>

        {/* Right Panel - Properties */}
        <PropertiesPanel />
      </div>
    </div>
  );
}
