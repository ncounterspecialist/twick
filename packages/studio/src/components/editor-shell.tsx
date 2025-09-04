import { StageCanvas } from "./stage-canvas";
import { Toolbar } from "./toolbar";
import { PropertiesPanel } from "./properties-panel";
import { Timeline } from "./timeline";
import ElementPanel from "./element-panel";
import StudioHeader from "./header";

export function EditorShell() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-900 text-gray-100">
      {/* Header */}
      <StudioHeader />
      {/* Main Content */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Left Toolbar */}
        <Toolbar />

        {/* Left Panel - Media Library */}
        <aside className="border-r border-gray-600/50 backdrop-blur-md shadow-lg">
          <ElementPanel />
        </aside>

        {/* Center - Canvas and Transport */}
        <main className="flex-1 flex flex-col bg-neutral-700 main-container">
          <StageCanvas />
        </main>

        {/* Right Panel - Properties */}
        <PropertiesPanel />
      </div>

      {/* Bottom Timeline */}
      <Timeline />
    </div>
  );
}
