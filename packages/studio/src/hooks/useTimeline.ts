import { useCallback } from 'react'
import { useStudioContext } from '../context/studio-context'
import type { TimelineElement } from '../types'

export function useTimeline() {
  const { project, dispatch } = useStudioContext()

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
