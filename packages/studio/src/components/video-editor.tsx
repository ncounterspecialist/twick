import React, { useState, useCallback } from 'react'
import { 
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Download,
  Save,
  Plus,
  Trash2
} from 'lucide-react'
import TwickVideoEditor from '@twick/video-editor'
import { TimelineProvider } from '@twick/timeline'
import { LivePlayerProvider } from '@twick/live-player'
import '@twick/video-editor/dist/video-editor.css'
import type { Project, EditorState, TimelineElement } from '../types'

interface VideoEditorProps {
  project: Project
  onSave?: (project: Project) => void
  onExport?: (settings: any) => void
}

export const VideoEditor: React.FC<VideoEditorProps> = ({ 
  project, 
  onSave, 
  onExport 
}) => {
  const [currentProject, setCurrentProject] = useState<Project>(project)
  const [editorState, setEditorState] = useState<EditorState>({
    currentTime: 0,
    isPlaying: false,
    selectedElements: [],
    zoom: 1,
    showGrid: true,
    showRulers: false,
    snapToGrid: false,
    snapToElements: false
  })
  
  const [duration] = useState(30) // Fixed duration for now
  const [volume, setVolume] = useState(1)

  // Playback controls
  const handlePlayPause = useCallback(() => {
    setEditorState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
  }, [])

  const handleSeek = useCallback((time: number) => {
    setEditorState(prev => ({ ...prev, currentTime: time }))
  }, [])

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume)
  }, [])

  // Timeline controls
  const handleAddMedia = useCallback(() => {
    // Simple media addition - just add to the first track
    const newElement: TimelineElement = {
      id: `element-${Date.now()}`,
      type: 'video',
      startTime: editorState.currentTime,
      endTime: editorState.currentTime + 5,
      mediaId: 'sample-video-1',
      volume: 1,
      muted: false
    }

    setCurrentProject(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        tracks: prev.timeline.tracks.map(track => 
          track.id === 'video-track-1' 
            ? { ...track, elements: [...(track.elements || []), newElement] }
            : track
        )
      }
    }))
  }, [editorState.currentTime])

  const handleSave = useCallback(() => {
    onSave?.(currentProject)
  }, [currentProject, onSave])

  const handleExport = useCallback(() => {
    onExport?.({
      project: currentProject,
      settings: {
        format: 'mp4',
        quality: 'medium',
        resolution: currentProject.timeline,
        fps: currentProject.timeline.fps
      }
    })
  }, [currentProject, onExport])

  const progress = duration > 0 ? (editorState.currentTime / duration) * 100 : 0

  return (
    <TimelineProvider contextId="simple-video-editor">
      <LivePlayerProvider>
        <div className="h-full flex flex-col bg-gray-900 text-white">
          {/* Header */}
          <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
            <h1 className="text-xl font-bold text-blue-400">Simple Video Editor with Twick</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="btn btn-ghost text-gray-300 hover:text-white"
                title="Save Project"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={handleExport}
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                title="Export Video"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Panel - Media Library */}
            <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Media Library</h3>
                <button
                  onClick={handleAddMedia}
                  className="btn btn-ghost text-blue-400 hover:text-blue-300"
                  title="Add Media"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {currentProject.mediaLibrary.map((media) => (
                  <div
                    key={media.id}
                    className="bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors"
                  >
                    <div className="w-full h-20 bg-gray-600 rounded mb-2 flex items-center justify-center">
                      {media.type === 'video' && <span className="text-xs">🎥</span>}
                      {media.type === 'image' && <span className="text-xs">🖼️</span>}
                      {media.type === 'audio' && <span className="text-xs">🎵</span>}
                    </div>
                    <p className="text-sm font-medium truncate">{media.name}</p>
                    <p className="text-xs text-gray-400">{media.duration}s</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Center - Twick Video Editor */}
            <div className="flex-1 flex flex-col">
              {/* Twick Video Editor Canvas */}
              <div className="flex-1 bg-black">
                <TwickVideoEditor
                  editorConfig={{
                    canvasMode: true,
                    videoProps: {
                      width: currentProject.timeline.width,
                      height: currentProject.timeline.height,
                    },
                  }}
                />
              </div>

              {/* Playback Controls */}
              <div className="h-20 bg-gray-800 border-t border-gray-700 p-4">
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={handlePlayPause}
                    className="btn btn-ghost text-white hover:text-blue-400"
                  >
                    {editorState.isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  {/* Skip Back/Forward */}
                  <button
                    onClick={() => handleSeek(Math.max(0, editorState.currentTime - 5))}
                    className="btn btn-ghost text-gray-400 hover:text-white"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleSeek(Math.min(duration, editorState.currentTime + 5))}
                    className="btn btn-ghost text-gray-400 hover:text-white"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  {/* Progress Bar */}
                  <div className="flex-1 mx-4">
                    <div className="relative">
                      <div className="w-full h-2 bg-gray-600 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={editorState.currentTime}
                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{Math.floor(editorState.currentTime)}s</span>
                      <span>{Math.floor(duration)}s</span>
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-20 h-2 bg-gray-600 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Timeline */}
            <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
              <h3 className="text-lg font-semibold mb-4">Timeline</h3>
              
              <div className="space-y-3">
                {currentProject.timeline.tracks.map((track) => (
                  <div key={track.id} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{track.name}</span>
                      <button className="text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="h-16 bg-gray-600 rounded border-2 border-dashed border-gray-500 flex items-center justify-center">
                      {track.elements.length === 0 ? (
                        <span className="text-xs text-gray-400">Drop media here</span>
                      ) : (
                        <div className="flex gap-1">
                          {track.elements.map((element) => (
                            <div
                              key={element.id}
                              className="h-12 bg-blue-500 rounded text-xs text-white flex items-center justify-center px-2"
                              style={{
                                width: `${((element.endTime - element.startTime) / duration) * 100}%`
                              }}
                            >
                              {element.type}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LivePlayerProvider>
    </TimelineProvider>
  )
}
