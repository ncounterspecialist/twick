import React, { createContext, useContext, useMemo, useReducer } from 'react'
import type { Project, EditorState, TimelineElement, Track } from '../types'

interface EditorContextValue {
  project: Project
  setProject: (next: Project) => void
  state: EditorState
  dispatch: React.Dispatch<EditorAction>
  // derived
  duration: number
}

type EditorAction =
  | { type: 'play_toggle' }
  | { type: 'seek'; time: number }
  | { type: 'zoom'; value: number }
  | { type: 'set_project'; project: Project }
  | { type: 'add_element'; trackId: string; element: TimelineElement }
  | { type: 'select_tool'; tool: string }

function reducer(state: { project: Project; editor: EditorState }, action: EditorAction) {
  switch (action.type) {
    case 'play_toggle':
      return { ...state, editor: { ...state.editor, isPlaying: !state.editor.isPlaying } }
    case 'seek':
      return { ...state, editor: { ...state.editor, currentTime: Math.max(0, action.time) } }
    case 'zoom':
      return { ...state, editor: { ...state.editor, zoom: action.value } }
    case 'set_project':
      return { ...state, project: action.project }
    case 'select_tool':
      return { ...state, editor: { ...state.editor, selectedTool: action.tool as any } }
    case 'add_element': {
      const { trackId, element } = action
      const updatedTracks: Track[] = state.project.timeline.tracks.map(t =>
        t.id === trackId ? { ...t, elements: [...t.elements, element] } : t
      )
      return {
        ...state,
        project: { ...state.project, timeline: { ...state.project.timeline, tracks: updatedTracks } },
      }
    }
    default:
      return state
  }
}

const EditorContext = createContext<EditorContextValue | undefined>(undefined)

export function EditorProvider({ project, children }: { project: Project; children: React.ReactNode }) {
  const initial = useMemo(
    () => ({
      project,
      editor: {
        currentTime: 0,
        isPlaying: false,
        selectedElements: [],
        zoom: 1,
        showGrid: true,
        showRulers: false,
        snapToGrid: false,
        snapToElements: false,
        selectedTool: 'select',
        viewMode: 'grid',
      } as EditorState,
    }),
    [project]
  )

  const [{ project: currentProject, editor }, dispatch] = useReducer(reducer, initial)

  const value: EditorContextValue = {
    project: currentProject,
    setProject: (next) => dispatch({ type: 'set_project', project: next }),
    state: editor,
    dispatch,
    duration: currentProject.timeline.duration,
  }

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditorContext() {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('useEditorContext must be used within EditorProvider')
  return ctx
}
