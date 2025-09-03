import { Save, Download } from 'lucide-react'
import { MediaLibrary } from './media-library'
import { StageCanvas } from './stage-canvas'
// import { Transport } from './transport'
import { Toolbar } from './toolbar'
import { PropertiesPanel } from './properties-panel'
import { Timeline } from './timeline'
import { useEditor } from '../hooks/useEditor'
import { useMediaLibrary } from '../hooks/useMediaLibrary'
import { useTimeline } from '../hooks/useTimeline'

export function EditorShell() {
  const { project } = useEditor()
  const { items } = useMediaLibrary()
  const { addElement, tracks } = useTimeline()

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900 text-white">
      {/* Header */}
      <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-300">Twick Studio</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost text-gray-300" title="Save">
            <Save className="w-4 h-4" />
          </button>
          <button className="btn btn-primary" title="Export">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Left Toolbar */}
        <Toolbar />
        
        {/* Left Panel - Media Library */}
        <aside className="w-72 bg-gray-850 border-r border-gray-700">
          <div className="h-full">
            <MediaLibrary
              mediaItems={items}
              onAddToTimeline={(item) => {
                const firstVideoTrack = tracks.find(t => t.type === 'video') || tracks[0]
                if (!firstVideoTrack) return
                addElement(firstVideoTrack.id, {
                  id: `el-${Date.now()}`,
                  type: item.type === 'audio' ? 'audio' : 'video',
                  startTime: 0,
                  endTime: Math.min(5, project.timeline.duration),
                  mediaId: item.id,
                  volume: 1,
                  muted: false,
                  position: { x: 0, y: 0 },
                  size: { width: 0, height: 0 },
                  rotation: 0,
                  opacity: 1,
                  effects: []
                })
              }}
            />
          </div>
        </aside>

        {/* Center - Canvas and Transport */}
        <main className="flex-1 flex flex-col">
          <StageCanvas />
          {/* <Transport /> */}
        </main>

        {/* Right Panel - Properties */}
        <PropertiesPanel />
      </div>

      {/* Bottom Timeline */}
      <Timeline />
    </div>
  )
}
