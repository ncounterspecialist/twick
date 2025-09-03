

import { EditorShell } from './components/editor-shell'
import { EditorProvider } from './context/studio-context'
import type { Project } from './types'

// Simple sample project
const sampleProject: Project = {
  id: 'simple-project',
  name: 'Untitled project',
  timeline: {
    id: 'main-timeline',
    name: 'Main Timeline',
    tracks: [
      {
        id: 'text-track-1',
        name: 'Text Track',
        type: 'text',
        elements: [
          {
            id: 'text-element-1',
            type: 'text',
            startTime: 0,
            endTime: 26,
            volume: 1,
            muted: false,
            position: { x: 35, y: 30 },
            size: { width: 135, height: 20 },
            rotation: 0,
            opacity: 1,
            effects: [],
            textElement: {
              id: 'text-1',
              text: 'Pasta Picasso',
              font: 'Mitr',
              fontSize: 20,
              fontWeight: 'normal',
              fontStyle: 'normal',
              textDecoration: 'none',
              color: '#FFFFFF',
              backgroundColor: undefined,
              alignment: 'left',
              verticalAlignment: 'top',
              position: { x: 35, y: 30 },
              size: { width: 135, height: 20 },
              rotation: 0,
              borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }
            }
          },
          {
            id: 'text-element-2',
            type: 'text',
            startTime: 0,
            endTime: 26,
            volume: 1,
            muted: false,
            position: { x: 50, y: 400 },
            size: { width: 300, height: 20 },
            rotation: 0,
            opacity: 1,
            effects: [],
            textElement: {
              id: 'text-2',
              text: 'a dash of deliciousness and a whole lot of fun.',
              font: 'Mitr',
              fontSize: 16,
              fontWeight: 'normal',
              fontStyle: 'normal',
              textDecoration: 'none',
              color: '#FFFFFF',
              backgroundColor: undefined,
              alignment: 'left',
              verticalAlignment: 'top',
              position: { x: 50, y: 400 },
              size: { width: 300, height: 20 },
              rotation: 0,
              borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }
            }
          }
        ],
        locked: false,
        visible: true,
        volume: 1,
        muted: false,
        height: 16,
        color: '#8b5cf6'
      },
      {
        id: 'video-track-1',
        name: 'Video Track',
        type: 'video',
        elements: [
          {
            id: 'video-element-1',
            type: 'video',
            startTime: 0,
            endTime: 26,
            mediaId: 'sample-video-1',
            volume: 1,
            muted: false,
            position: { x: 0, y: 0 },
            size: { width: 1280, height: 720 },
            rotation: 0,
            opacity: 1,
            effects: []
          }
        ],
        locked: false,
        visible: true,
        volume: 1,
        muted: false,
        height: 16,
        color: '#3b82f6'
      },
      {
        id: 'audio-track-1',
        name: 'Voice accommodation.mp3',
        type: 'audio',
        elements: [
          {
            id: 'audio-element-1',
            type: 'audio',
            startTime: 0,
            endTime: 26,
            mediaId: 'audio-1',
            volume: 1,
            muted: false,
            position: { x: 0, y: 0 },
            size: { width: 0, height: 0 },
            rotation: 0,
            opacity: 1,
            effects: []
          }
        ],
        locked: false,
        visible: true,
        volume: 1,
        muted: false,
        height: 16,
        color: '#10b981'
      },
      {
        id: 'audio-track-2',
        name: 'Dean Martin - Volare.mp3',
        type: 'audio',
        elements: [
          {
            id: 'audio-element-2',
            type: 'audio',
            startTime: 0,
            endTime: 26,
            mediaId: 'audio-2',
            volume: 0.8,
            muted: false,
            position: { x: 0, y: 0 },
            size: { width: 0, height: 0 },
            rotation: 0,
            opacity: 1,
            effects: []
          }
        ],
        locked: false,
        visible: true,
        volume: 0.8,
        muted: false,
        height: 16,
        color: '#10b981'
      },
      {
        id: 'subtitle-track-1',
        name: 'Subtitles',
        type: 'subtitle',
        elements: [],
        locked: false,
        visible: true,
        volume: 1,
        muted: false,
        height: 16,
        color: '#3b82f6'
      }
    ],
    duration: 26,
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
      duration: 26,
      size: 1024000,
      width: 1280,
      height: 720,
      createdAt: new Date()
    },
    {
      id: 'audio-1',
      name: 'Voice accommodation.mp3',
      type: 'audio',
      url: '/audio/voice.mp3',
      thumbnail: undefined,
      duration: 26,
      size: 512000,
      width: undefined,
      height: undefined,
      createdAt: new Date()
    },
    {
      id: 'audio-2',
      name: 'Dean Martin - Volare.mp3',
      type: 'audio',
      url: '/audio/volare.mp3',
      thumbnail: undefined,
      duration: 26,
      size: 768000,
      width: undefined,
      height: undefined,
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
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-900">
      <EditorProvider project={sampleProject}>
        <EditorShell />
      </EditorProvider>
    </div>
  )
}

export default App
