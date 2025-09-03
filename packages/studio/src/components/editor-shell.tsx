import { Save, Download, Clapperboard } from "lucide-react";
import { StageCanvas } from "./stage-canvas";
import { Toolbar } from "./toolbar";
import { PropertiesPanel } from "./properties-panel";
import { Timeline } from "./timeline";
import ElementPanel from "./element-panel";

export function EditorShell() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-900 text-gray-100">
      {/* Header */}
      <header className="h-14 bg-neutral-800/90 border-b border-gray-600/50 flex items-center justify-between px-4 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Clapperboard className="w-8 h-8 text-purple-400" />
            <h1 className="text-lg font-bold text-gradient-purple">
              Twick Studio
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-ghost text-gray-300 hover:text-white"
            title="Save Draft"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          <button className="btn btn-primary" title="Export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </header>

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
