import { useCallback } from 'react'
import { useEditor } from './useEditor'
import type { TimelineElement } from '../types'

export function useTimeline() {
  const { project, dispatch } = useEditor()

  const addElement = useCallback(
    (trackId: string, element: TimelineElement) =>
      dispatch({ type: 'add_element', trackId, element }),
    [dispatch]
  )

  return {
    timeline: project.timeline,
    tracks: project.timeline.tracks,
    addElement,
  }
}
