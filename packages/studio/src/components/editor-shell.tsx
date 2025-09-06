import { Track, TrackElement, useTimelineContext } from "@twick/timeline";

import { StageCanvas } from "./stage-canvas";
import { Toolbar } from "./toolbar";
import { PropertiesPanel } from "./properties-panel";
import ElementPanel from "./element-panel";
import StudioHeader from "./header";
import {  useState } from "react";

export function EditorShell() {
  const { editor, selectedItem } = useTimelineContext();
  const [ selectedTool, setSelectedTool ] = useState<string>("video");
  const addElement = (element: TrackElement) => {
    if (selectedItem instanceof Track) {
      editor.addElementToTrack(selectedItem, element);
    } else {
      const newTrack = editor.addTrack("Track");
      editor.addElementToTrack(newTrack, element);
    }
  };

  // const addSubtitlesToTimeline = (elements: TrackElement[]) => {
  //   if (selectedItem instanceof Track && selectedItem.getType() == "caption") {
  //     elements.forEach((element) => {
  //       editor.addElementToTrack(selectedItem, element);
  //     });
  //   } else {
  //     const newTrack = editor.addTrack("Track", "caption");
  //     elements.forEach((element) => {
  //       editor.addElementToTrack(newTrack, element);
  //     });
  //   }
  // };

  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-900 text-gray-100">
      {/* Header */}
      <StudioHeader />
      {/* Main Content */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Left Toolbar */}
        <Toolbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

        {/* Left Panel - Media Library */}
        <aside className="border-r border-gray-600/50 backdrop-blur-md shadow-lg">
          <ElementPanel selectedTool={selectedTool} addElement={addElement} />
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
