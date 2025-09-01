

import { SimpleVideoEditor } from './components/SimpleVideoEditor'
import type { Project } from './types'

// Simple sample project
const sampleProject: Project = {
  id: 'simple-project',
  name: 'Simple Video Project',
  timeline: {
    id: 'main-timeline',
    name: 'Main Timeline',
    tracks: [
      {
        id: 'video-track-1',
        name: 'Video Track',
        type: 'video',
        elements: [],
        locked: false,
        visible: true,
        volume: 1,
        muted: false
      }
    ],
    duration: 30,
    fps: 30,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  mediaLibrary: [
    {
      id: 'sample-video-1',
      name: 'Sample Video.mp4',
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=Video',
      duration: 10,
      size: 1024000,
      width: 1280,
      height: 720,
      createdAt: new Date()
    }
  ],
  settings: {
    autoSave: true,
    autoSaveInterval: 30000,
    defaultDuration: 30,
    defaultFps: 30,
    defaultResolution: {
      width: 1280,
      height: 720
    }
  },
  createdAt: new Date(),
  updatedAt: new Date()
}

function App() {
  const handleSave = (project: Project) => {
    console.log('Saving project:', project)
    localStorage.setItem('simple-video-editor-project', JSON.stringify(project))
  }

  const handleExport = (settings: any) => {
    console.log('Exporting video with settings:', settings)
    // Simple export logic here
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900">
      <SimpleVideoEditor
        project={sampleProject}
        onSave={handleSave}
        onExport={handleExport}
      />
    </div>
  )
}

export default App
